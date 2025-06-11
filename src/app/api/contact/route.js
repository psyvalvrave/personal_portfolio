//src/app/api/contact/route.js
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    secure: false,                  
    auth: {
        user: 'apikey',               
        pass: process.env.SENDGRID_API_KEY,
    },
    });

async function verifyRecaptcha(token) {
    const res = await fetch(
        'https://www.google.com/recaptcha/api/siteverify',
        {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            secret: process.env.RECAPTCHA_SECRET_KEY,
            response: token,
        }),
        }
    );
    const data = await res.json();
    return data.success; 
    }    

export async function POST(request) {
    let body;
    try {
        body = await request.json();
            } catch {
            return NextResponse.json(
                { error: 'Invalid JSON body' },
                { status: 400 }
            );
        }
        const { name, email, message, recaptchaToken } = body;
        if (!name || !email || !message || !recaptchaToken) {
        return NextResponse.json(
            { error: 'Missing fields or reCAPTCHA token.' },
            { status: 400 }
        );
        }

        const human = await verifyRecaptcha(recaptchaToken);
        if (!human) {
            return NextResponse.json(
            { error: 'reCAPTCHA verification failed.' },
            { status: 401 }
            );
        }
    
        try {
        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.SENDER_EMAIL}>`,
            to: process.env.TO_EMAIL,
            subject: `📬 New message from ${name} via Personal Portfolio Website`,
            text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
            html: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
            `,
            replyTo: email,
        });
    
        return NextResponse.json({ ok: true }, { status: 200 });
        } catch (error) {
        console.error('SendGrid error:', error);
    
        if (error.responseCode === 429) {
            return NextResponse.json(
            { error: 'Rate limit exceeded. Please try again later.' },
            { status: 429 }
            );
        }
    
        return NextResponse.json(
            { error: 'Failed to send email.' },
            { status: 500 }
        );
        }
    }