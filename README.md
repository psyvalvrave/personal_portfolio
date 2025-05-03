### Personal Portfolio Website

This repository contains the **source code** for my personal portfolio website, live at:  
https://zhechengli.vercel.app/

## 🛠️ Tech Stack

- **Framework:** Next.js (React)  
- **Styling:** Tailwind CSS  
- **Animations:** GSAP  
- **Forms & Email:** Nodemailer (via Next.js API routes)  
- **Bot Protection:** Google reCAPTCHA v2/v3  

## 🔐 Environment Variables

This project relies on a few external services and **does not** include a `.env` file in the repo. To run locally, create a file named `.env.local` at the project root with the following variables:

```env
# reCAPTCHA (robot verification)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here
RECAPTCHA_SECRET_KEY=your_secret_key_here

# Email service (Nodemailer / SendGrid / SMTP)
SENDGRID_API_KEY=your_sendgrid_api_key_here
SENDER_EMAIL=your_email@example.com      # Address messages are sent from
TO_EMAIL=recipient_email@example.com    # Address messages are sent to
```

### reCAPTCHA

You can obtain your own keys at:  
https://developers.google.com/recaptcha

> **Test keys** (Google-provided) for local development:  
> Site key: `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI`  
> Secret key: `6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe`

### Email Sender

This site uses Nodemailer to send contact-form messages. You can sign up for a free account at SendGrid (https://sendgrid.com/en-us) or any SMTP provider.  
If you don’t supply these values, the contact form will be disabled locally, but all other features will work normally.

## 🚀 Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

First, install dependencies and start the dev server:

```bash
npm install
npm run dev
# or
yarn install && yarn dev
# or
pnpm install && pnpm dev
# or
bun install && bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the site.

## 🔤 Font Optimization

We use Next.js’s [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load the **Geist** font.

---

Feel free to clone, customize, and explore! If you have any questions, just open an issue. 😊
