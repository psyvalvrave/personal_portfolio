// src/i18n/request.js
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale is a Promise<string|undefined>
  const requested = await requestLocale;
  const locale = routing.locales.includes(requested) 
    ? requested 
    : routing.defaultLocale;

  // dynamically import your JSON messages
  const messages = (await import(`../../locales/${locale}.json`)).default;

  return { locale, messages };
});
