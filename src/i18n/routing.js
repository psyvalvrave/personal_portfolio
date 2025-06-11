//src/i18n/routing.js
import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["en", "fr"],
    defaultLocale: "en",
    localePrefix: "always",
});
