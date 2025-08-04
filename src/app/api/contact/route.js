// src/app/api/contact/route.js
import { NextResponse } from 'next/server';

const GOOGLE_FORM_ACTION =
    'https://docs.google.com/forms/d/e/1FAIpQLScfBefwq6b5Y7h9GvxOaTooU0lMJrrRVvnSbbr9ReScVlkaaQ/formResponse';

    const ENTRY_NAME = 'entry.1330993208';
    const ENTRY_EMAIL = 'entry.888200835';
    const ENTRY_MESSAGE = 'entry.396729595';

    async function verifyRecaptcha(token) {
    const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: token,
        }),
    });
    const data = await res.json();
    return data.success;
    }

    export async function POST(request) {
    let body;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
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

    // Build the form payload for Google Forms
    const formData = new URLSearchParams();
    formData.append(ENTRY_NAME, name);
    formData.append(ENTRY_EMAIL, email);
    formData.append(ENTRY_MESSAGE, message);

    try {
        const res = await fetch(GOOGLE_FORM_ACTION, {
        method: 'POST',
        body: formData,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        });

        if (!res.ok) {
        const text = await res.text();
        console.error('Google Form submission failed, status:', res.status, 'body:', text);
        return NextResponse.json(
            { error: 'Failed to submit message to backend form.' },
            { status: 502 }
        );
        }

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (err) {
        console.error('Error submitting to Google Form:', err);
        return NextResponse.json({ error: 'Internal error.' }, { status: 500 });
    }
}
