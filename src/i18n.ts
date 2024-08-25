import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import HttpBackend from "i18next-http-backend"
import LanguageDetector from "i18next-browser-languagedetector"

i18n.use(HttpBackend) // Charge les traductions depuis un backend
    .use(LanguageDetector) // Détecte la langue de l'utilisateur
    .use(initReactI18next) // Liaison avec React
    .init({
        fallbackLng: "en",
        debug: true,
        interpolation: {
            escapeValue: false, // React échappe automatiquement par défaut
        },
        backend: {
            loadPath: "/locales/{{lng}}/{{ns}}.json",
        },
    })

export default i18n
