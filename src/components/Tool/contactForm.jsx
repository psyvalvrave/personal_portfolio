import React, { useState, useRef, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { HoverGradientButton } from './hoverGradientButton';
import { HoverHighlightInput } from './hoverHighlightInput';


export default function ContactForm({ onClose }) {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); 
    const [recaptchaToken, setRecaptchaToken] = useState(null);
    const recaptchaRef = useRef(null);
        useEffect(() => {
            let timer;
            if (status === 'success') {
            timer = setTimeout(() => {
                onClose(); 
            }, 2000);
            } else if (status === 'rate-limit' || status === 'error') {
            timer = setTimeout(() => {
                setStatus('idle'); 
            }, 5000);
            }
            return () => clearTimeout(timer);
        }, [status, onClose]);

    const handleChange = e => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async e => {
        e.preventDefault();

        if (!recaptchaToken) {
            alert('Please verify you’re not a robot.');
            return;
        }

        setStatus('sending');
    
        try {
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                ...form, 
                recaptchaToken 
            }),
        });
    
        if (res.status === 429) {
            setStatus('rate-limit');
            return;
        }
        if (!res.ok) {
            throw new Error('Network error');
        }
    
        setStatus('success');
        recaptchaRef.current.reset();
        setRecaptchaToken(null);
        } catch {
        setStatus('error');
        }
    };

    return (
        <div className="relative max-w-md mx-auto">
        <div className="bg-black text-white border-none shadow-lg p-6">
            
            <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white cursor-pointer hover:text-gray-300"
            >
            ✕
            </button>
            
            <h2 className="text-2xl font-semibold mb-4">Leave me a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <HoverHighlightInput
                    as="input"
                    name="name"
                    placeholder="Your Name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    />
                <HoverHighlightInput
                    as="input"
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    value={form.email}
                    onChange={handleChange}
                />
                <HoverHighlightInput
                    as="textarea"
                    name="message"
                    rows={4}
                    placeholder="Your Message"
                    required
                    value={form.message}
                    onChange={handleChange}
                />
                <div className="flex justify-center">
                    <ReCAPTCHA
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                    onChange={token => setRecaptchaToken(token)}
                    ref={recaptchaRef}
                    />
                </div>
                <div className="flex justify-center">
                    <HoverGradientButton
                        as="button"
                        type="submit"
                        disabled={status === 'sending'}
                        className={`
                            cursor-pointer bg-gray-700
                            ${status === 'sending' ? 'opacity-50 pointer-events-none' : ''}
                        `}
                        >
                        {status === 'sending'
                            ? 'Sending…'
                            : status === 'success'
                            ? 'Sent!'
                            : status === 'rate-limit'
                            ? 'Rate Limit'
                            : status === 'error'
                            ? 'Try again'
                            : 'Send Message'}
                        </HoverGradientButton>
                    </div>
            </form>
            
        </div>
        </div>
    );
}
