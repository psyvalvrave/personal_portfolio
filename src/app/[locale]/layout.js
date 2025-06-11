//src/app/[locale]/layout.js
import { NextIntlClientProvider } from "next-intl";

// so Next builds /en & /fr
export const dynamicParams      = false;
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }];
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  const messages = (await import(`../../../locales/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
