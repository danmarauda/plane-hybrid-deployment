import { t as core_default } from "./core-B8RCSsIQ.js";
import { t as translations_default } from "./translations-l3KgGcEA.js";
import { t as accessibility_default } from "./accessibility-CuP_jweW.js";
import { t as editor_default } from "./editor-DpnaoUnU.js";
import { t as empty_state_default } from "./empty-state-De98ycgO.js";
import { observer } from "mobx-react";
import React, { createContext, useContext } from "react";
import IntlMessageFormat from "intl-messageformat";
import { get, merge } from "lodash-es";
import { makeAutoObservable, runInAction } from "mobx";
import { jsx } from "react/jsx-runtime";

//#region src/constants/language.ts
const FALLBACK_LANGUAGE = "en";
const SUPPORTED_LANGUAGES = [
	{
		label: "English",
		value: "en"
	},
	{
		label: "Français",
		value: "fr"
	},
	{
		label: "Español",
		value: "es"
	},
	{
		label: "日本語",
		value: "ja"
	},
	{
		label: "简体中文",
		value: "zh-CN"
	},
	{
		label: "繁體中文",
		value: "zh-TW"
	},
	{
		label: "Русский",
		value: "ru"
	},
	{
		label: "Italian",
		value: "it"
	},
	{
		label: "Čeština",
		value: "cs"
	},
	{
		label: "Slovenčina",
		value: "sk"
	},
	{
		label: "Deutsch",
		value: "de"
	},
	{
		label: "Українська",
		value: "ua"
	},
	{
		label: "Polski",
		value: "pl"
	},
	{
		label: "한국어",
		value: "ko"
	},
	{
		label: "Português Brasil",
		value: "pt-BR"
	},
	{
		label: "Indonesian",
		value: "id"
	},
	{
		label: "Română",
		value: "ro"
	},
	{
		label: "Tiếng việt",
		value: "vi-VN"
	},
	{
		label: "Türkçe",
		value: "tr-TR"
	}
];
/**
* Enum for translation file names
* These are the JSON files that contain translations each category
*/
let ETranslationFiles = /* @__PURE__ */ function(ETranslationFiles$1) {
	ETranslationFiles$1["TRANSLATIONS"] = "translations";
	ETranslationFiles$1["ACCESSIBILITY"] = "accessibility";
	ETranslationFiles$1["EDITOR"] = "editor";
	ETranslationFiles$1["EMPTY_STATE"] = "empty-state";
	return ETranslationFiles$1;
}({});
const LANGUAGE_STORAGE_KEY = "userLanguage";

//#endregion
//#region src/locales/index.ts
const locales = {
	en: {
		core: () => import("./core-CMX6jCKA.js"),
		translations: () => import("./translations-BjNwpHLh.js"),
		accessibility: () => import("./accessibility-By0XUGmH.js"),
		editor: () => import("./editor-BJXop2Ep.js"),
		"empty-state": () => import("./empty-state-CSU-eNXa.js")
	},
	fr: {
		translations: () => import("./translations-UUNIktJQ.js"),
		accessibility: () => import("./accessibility-Cyu1fvpk.js"),
		editor: () => import("./editor-p0a5vmrS.js"),
		"empty-state": () => import("./empty-state-CX_bqipC.js")
	},
	es: {
		translations: () => import("./translations-B1PCm7rE.js"),
		accessibility: () => import("./accessibility-DFby1Pqa.js"),
		editor: () => import("./editor-RKmm77Av.js"),
		"empty-state": () => import("./empty-state-DwKYSi5P.js")
	},
	ja: {
		translations: () => import("./translations-CmNDbBAf.js"),
		accessibility: () => import("./accessibility-Bbk7VAT_.js"),
		editor: () => import("./editor-NFKGp0gG.js"),
		"empty-state": () => import("./empty-state-Bz380OY7.js")
	},
	"zh-CN": {
		translations: () => import("./translations-B_G1dQwd.js"),
		accessibility: () => import("./accessibility-CBQcMygp.js"),
		editor: () => import("./editor-yIqSq-5W.js"),
		"empty-state": () => import("./empty-state--QA87_hZ.js")
	},
	"zh-TW": {
		translations: () => import("./translations-CcNuvddF.js"),
		accessibility: () => import("./accessibility-BCbmVAXx.js"),
		editor: () => import("./editor-BuFA5f_e.js"),
		"empty-state": () => import("./empty-state-Bx1I4r32.js")
	},
	ru: {
		translations: () => import("./translations-Bhb-zHF8.js"),
		accessibility: () => import("./accessibility-BH9ethwp.js"),
		editor: () => import("./editor-CIAgCMO5.js"),
		"empty-state": () => import("./empty-state-DExnsw0Z.js")
	},
	it: {
		translations: () => import("./translations-B2TWFRVx.js"),
		accessibility: () => import("./accessibility-WfdVFTQC.js"),
		editor: () => import("./editor-CGid2EJ6.js"),
		"empty-state": () => import("./empty-state-zRY-HB-Z.js")
	},
	cs: {
		translations: () => import("./translations-DEDisMsY.js"),
		accessibility: () => import("./accessibility-DYMFDi-z.js"),
		editor: () => import("./editor-CxcKeB-j.js"),
		"empty-state": () => import("./empty-state-CrcBeIbI.js")
	},
	sk: {
		translations: () => import("./translations-DPDCnerQ.js"),
		accessibility: () => import("./accessibility-D5GcsGLG.js"),
		editor: () => import("./editor-BIzBTq4Z.js"),
		"empty-state": () => import("./empty-state-DuDTi8Pa.js")
	},
	de: {
		translations: () => import("./translations-QmzuNDJK.js"),
		accessibility: () => import("./accessibility-CjmM2Xm3.js"),
		editor: () => import("./editor-BDzA1Ojw.js"),
		"empty-state": () => import("./empty-state-B9peiBhq.js")
	},
	ua: {
		translations: () => import("./translations-BDoRpFv7.js"),
		accessibility: () => import("./accessibility-Dmls8bAw.js"),
		editor: () => import("./editor-C3WspIm-.js"),
		"empty-state": () => import("./empty-state-CmGnpdzi.js")
	},
	pl: {
		translations: () => import("./translations-CesXN161.js"),
		accessibility: () => import("./accessibility-DgEQXtKu.js"),
		editor: () => import("./editor-B-9PHzaF.js"),
		"empty-state": () => import("./empty-state-C_lwFNRg.js")
	},
	ko: {
		translations: () => import("./translations-DNozZaU2.js"),
		accessibility: () => import("./accessibility-BNvQjWe3.js"),
		editor: () => import("./editor-mFn0qowv.js"),
		"empty-state": () => import("./empty-state-BbmJMue4.js")
	},
	"pt-BR": {
		translations: () => import("./translations-DW_K5yIF.js"),
		accessibility: () => import("./accessibility-W6Mmdylb.js"),
		editor: () => import("./editor-BUhZo_Cu.js"),
		"empty-state": () => import("./empty-state-D5qcQX_G.js")
	},
	id: {
		translations: () => import("./translations-DL6tY_OO.js"),
		accessibility: () => import("./accessibility-CbnOSAaA.js"),
		editor: () => import("./editor-Hezb2J3S.js"),
		"empty-state": () => import("./empty-state-2HXwXn3J.js")
	},
	ro: {
		translations: () => import("./translations-Pvu3yt-a.js"),
		accessibility: () => import("./accessibility-Dz-PtOqE.js"),
		editor: () => import("./editor-9zLZkE41.js"),
		"empty-state": () => import("./empty-state-Dku1Pk_I.js")
	},
	"vi-VN": {
		translations: () => import("./translations-B62tteMh.js"),
		accessibility: () => import("./accessibility-DF7cOy8e.js"),
		editor: () => import("./editor-Ckcw_rVs.js"),
		"empty-state": () => import("./empty-state-BZXh-NJB.js")
	},
	"tr-TR": {
		translations: () => import("./translations-EBMywXIF.js"),
		accessibility: () => import("./accessibility-DQrDKEXq.js"),
		editor: () => import("./editor-j_r67XNG.js"),
		"empty-state": () => import("./empty-state-C-hIr8ir.js")
	}
};

//#endregion
//#region src/store/index.ts
/**
* Mobx store class for handling translations and language changes in the application
* Provides methods to translate keys with params and change the language
* Uses IntlMessageFormat to format the translations
*/
var TranslationStore = class {
	coreTranslations = { en: core_default };
	translations = {};
	messageCache = /* @__PURE__ */ new Map();
	currentLocale = FALLBACK_LANGUAGE;
	isLoading = true;
	isInitialized = false;
	loadedLanguages = /* @__PURE__ */ new Set();
	/**
	* Constructor for the TranslationStore class
	*/
	constructor() {
		makeAutoObservable(this);
		this.translations = this.coreTranslations;
		this.initializeLanguage();
		this.loadTranslations();
	}
	/** Initializes the language based on the local storage or browser language */
	initializeLanguage() {
		if (typeof window === "undefined") return;
		const savedLocale = localStorage.getItem(LANGUAGE_STORAGE_KEY);
		if (this.isValidLanguage(savedLocale)) {
			this.setLanguage(savedLocale);
			return;
		}
		this.setLanguage(FALLBACK_LANGUAGE);
	}
	/** Loads the translations for the current language */
	async loadTranslations() {
		try {
			runInAction(() => {
				this.isInitialized = true;
			});
			await this.loadPrimaryLanguages();
			this.loadRemainingLanguages();
		} catch (error) {
			console.error("Failed in translation initialization:", error);
			runInAction(() => {
				this.isLoading = false;
			});
		}
	}
	async loadPrimaryLanguages() {
		try {
			const languagesToLoad = new Set([this.currentLocale]);
			if (this.currentLocale !== FALLBACK_LANGUAGE) languagesToLoad.add(FALLBACK_LANGUAGE);
			const loadPromises = Array.from(languagesToLoad).map((lang) => this.loadLanguageTranslations(lang));
			await Promise.all(loadPromises);
			runInAction(() => {
				this.isLoading = false;
			});
		} catch (error) {
			console.error("Failed to load primary languages:", error);
			runInAction(() => {
				this.isLoading = false;
			});
		}
	}
	loadRemainingLanguages() {
		const remainingLanguages = SUPPORTED_LANGUAGES.map((lang) => lang.value).filter((lang) => !this.loadedLanguages.has(lang) && lang !== this.currentLocale && lang !== FALLBACK_LANGUAGE);
		Promise.all(remainingLanguages.map((lang) => this.loadLanguageTranslations(lang))).catch((error) => {
			console.error("Failed to load some remaining languages:", error);
		});
	}
	async loadLanguageTranslations(language) {
		if (this.loadedLanguages.has(language)) return;
		try {
			const translations = await this.importLanguageFile(language);
			runInAction(() => {
				this.translations[language] = merge({}, this.coreTranslations[language] || {}, translations.default);
				this.loadedLanguages.add(language);
				this.messageCache.clear();
			});
		} catch (error) {
			console.error(`Failed to load translations for ${language}:`, error);
		}
	}
	/**
	* Helper function to import and merge multiple translation files for a language
	* @param language - The language code
	* @param files - Array of file names to import (without .json extension)
	* @returns Promise that resolves to merged translations
	*/
	async importAndMergeFiles(language, files) {
		try {
			const localeData = locales[language];
			if (!localeData) throw new Error(`Locale data not found for language: ${language}`);
			const importPromises = files.filter((file) => {
				return file in localeData;
			}).map((file) => {
				return localeData[file]();
			});
			return { default: (await Promise.all(importPromises)).reduce((acc, module) => merge(acc, module.default), {}) };
		} catch (error) {
			throw new Error(`Failed to import and merge files for ${language}: ${error}`);
		}
	}
	/**
	* Imports the translations for the given language
	* @param language - The language to import the translations for
	* @returns {Promise<any>}
	*/
	async importLanguageFile(language) {
		const files = Object.values(ETranslationFiles);
		return this.importAndMergeFiles(language, files);
	}
	/** Checks if the language is valid based on the supported languages */
	isValidLanguage(lang) {
		return lang !== null && this.availableLanguages.some((l) => l.value === lang);
	}
	/**
	* Gets the cache key for the given key and locale
	* @param key - the key to get the cache key for
	* @param locale - the locale to get the cache key for
	* @returns the cache key for the given key and locale
	*/
	getCacheKey(key, locale) {
		return `${locale}:${key}`;
	}
	/**
	* Gets the IntlMessageFormat instance for the given key and locale
	* Returns cached instance if available
	*/
	getMessageInstance(key, locale) {
		const cacheKey = this.getCacheKey(key, locale);
		if (this.messageCache.has(cacheKey)) return this.messageCache.get(cacheKey) || null;
		const message = get(this.translations[locale], key);
		if (typeof message !== "string") return null;
		try {
			const formatter = new IntlMessageFormat(message, locale);
			this.messageCache.set(cacheKey, formatter);
			return formatter;
		} catch (error) {
			console.error(`Failed to create message formatter for key "${key}":`, error);
			return null;
		}
	}
	/**
	* Translates a key with params using the current locale
	* Falls back to the default language if the translation is not found
	* Returns the key itself if the translation is not found
	* @param key - The key to translate
	* @param params - The params to format the translation with
	* @returns The translated string
	*/
	t(key, params) {
		try {
			let formatter = this.getMessageInstance(key, this.currentLocale);
			if (!formatter && this.currentLocale !== FALLBACK_LANGUAGE) formatter = this.getMessageInstance(key, FALLBACK_LANGUAGE);
			if (formatter) return formatter.format(params || {});
			return key;
		} catch (error) {
			console.error(`Translation error for key "${key}":`, error);
			return key;
		}
	}
	/**
	* Sets the current language and updates the translations
	* @param lng - The new language
	*/
	async setLanguage(lng) {
		try {
			if (!this.isValidLanguage(lng)) throw new Error(`Invalid language: ${lng}`);
			if (!this.loadedLanguages.has(lng)) await this.loadLanguageTranslations(lng);
			if (typeof window !== "undefined") {
				localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
				document.documentElement.lang = lng;
			}
			runInAction(() => {
				this.currentLocale = lng;
				this.messageCache.clear();
			});
		} catch (error) {
			console.error("Failed to set language:", error);
		}
	}
	/**
	* Gets the available language options for the dropdown
	* @returns An array of language options
	*/
	get availableLanguages() {
		return SUPPORTED_LANGUAGES;
	}
};

//#endregion
//#region src/context/index.tsx
const TranslationContext = createContext(null);
/**
* Provides the translation store to the application
*/
const TranslationProvider = observer(function TranslationProvider$1({ children }) {
	const [store] = React.useState(() => new TranslationStore());
	return /* @__PURE__ */ jsx(TranslationContext.Provider, {
		value: store,
		children
	});
});

//#endregion
//#region src/hooks/use-translation.ts
/**
* Provides the translation store to the application
* @returns {TTranslationStore}
* @returns {(key: string, params?: Record<string, any>) => string} t: method to translate the key with params
* @returns {TLanguage} currentLocale - current locale language
* @returns {(lng: TLanguage) => void} changeLanguage - method to change the language
* @returns {ILanguageOption[]} languages - available languages
* @throws {Error} if the TranslationProvider is not used
*/
function useTranslation() {
	const store = useContext(TranslationContext);
	if (!store) throw new Error("useTranslation must be used within a TranslationProvider");
	return {
		t: store.t.bind(store),
		currentLocale: store.currentLocale,
		changeLanguage: (lng) => store.setLanguage(lng),
		languages: store.availableLanguages
	};
}

//#endregion
export { ETranslationFiles, FALLBACK_LANGUAGE, LANGUAGE_STORAGE_KEY, SUPPORTED_LANGUAGES, TranslationContext, TranslationProvider, TranslationStore, accessibility_default as enAccessibility, core_default as enCore, editor_default as enEditor, empty_state_default as enEmptyState, translations_default as enTranslations, locales, useTranslation };
//# sourceMappingURL=index.js.map