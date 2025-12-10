import { compact, get, isEmpty, isEqual, isNil, isNumber, orderBy, set, sortBy, uniqBy } from "lodash-es";
import { API_BASE_URL, COMPLETED_STATE_GROUPS, DATE_OPERATOR_LABELS_MAP, DEFAULT_WORK_ITEM_FORM_VALUES, EAuthErrorCodes, EErrorAlertType, EEstimateSystem, EMPTY_OPERATOR_LABEL, EPastDurationFilters, EUserPermissions, E_PASSWORD_STRENGTH, ISSUE_DISPLAY_FILTERS_BY_PAGE, ISSUE_PRIORITIES, ISSUE_PRIORITY_FILTERS, OPERATOR_LABELS_MAP, RANDOM_EMOJI_CODES, SPACE_BASE_PATH, SPACE_BASE_URL, STATE_DISTRIBUTION, STATE_GROUPS, TAB_INDEX_MAP } from "@plane/constants";
import { COLLECTION_OPERATOR, COMPARISON_OPERATOR, EIssueLayoutTypes, EProductSubscriptionEnum, EQUALITY_OPERATOR, EStartOfTheWeek, FILTER_FIELD_TYPE, FILTER_NODE_TYPE, LOGICAL_OPERATOR } from "@plane/types";
import { differenceInDays, format, formatDistanceToNow, isAfter, isEqual as isEqual$1, isValid, parseISO, startOfToday, subDays } from "date-fns";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { differenceInCalendarDays } from "date-fns/differenceInCalendarDays";
import rehypeParse from "rehype-parse";
import rehypeRemark from "rehype-remark";
import remarkGfm from "remark-gfm";
import remarkStringify from "remark-stringify";
import { unified } from "unified";
import { Chrome, Dribbble, Facebook, Figma, FileArchive, FileAudio, FileCode, FileImage, FileSpreadsheet, FileText, FileVideo, Github, Instagram, Link2, Linkedin, Mail, Twitter, Youtube } from "lucide-react";
import DOMPurify from "dompurify";
import { v4 } from "uuid";

//#region src/array.ts
/**
* @description Groups an array of objects by a specified key
* @param {any[]} array Array to group
* @param {string} key Key to group by (supports dot notation for nested objects)
* @returns {Object} Grouped object with keys being the grouped values
* @example
* const array = [{type: 'A', value: 1}, {type: 'B', value: 2}, {type: 'A', value: 3}];
* groupBy(array, 'type') // returns { A: [{type: 'A', value: 1}, {type: 'A', value: 3}], B: [{type: 'B', value: 2}] }
*/
const groupBy = (array, key) => {
	const innerKey = key.split(".");
	return array.reduce((result, currentValue) => {
		const key$1 = innerKey.reduce((obj, i) => obj?.[i], currentValue) ?? "None";
		(result[key$1] = result[key$1] || []).push(currentValue);
		return result;
	}, {});
};
/**
* @description Orders an array by a specified key in ascending or descending order
* @param {any[]} orgArray Original array to order
* @param {string} key Key to order by (supports dot notation for nested objects)
* @param {"ascending" | "descending"} ordering Sort order
* @returns {any[]} Ordered array
* @example
* const array = [{value: 2}, {value: 1}, {value: 3}];
* orderArrayBy(array, 'value', 'ascending') // returns [{value: 1}, {value: 2}, {value: 3}]
*/
const orderArrayBy = (orgArray, key, ordering = "ascending") => {
	if (!orgArray || !Array.isArray(orgArray) || orgArray.length === 0) return [];
	const array = [...orgArray];
	if (key[0] === "-") {
		ordering = "descending";
		key = key.slice(1);
	}
	const innerKey = key.split(".");
	return array.sort((a, b) => {
		const keyA = innerKey.reduce((obj, i) => obj[i], a);
		const keyB = innerKey.reduce((obj, i) => obj[i], b);
		if (keyA < keyB) return ordering === "ascending" ? -1 : 1;
		if (keyA > keyB) return ordering === "ascending" ? 1 : -1;
		return 0;
	});
};
/**
* @description Checks if an array contains duplicate values
* @param {any[]} array Array to check for duplicates
* @returns {boolean} True if duplicates exist, false otherwise
* @example
* checkDuplicates([1, 2, 2, 3]) // returns true
* checkDuplicates([1, 2, 3]) // returns false
*/
const checkDuplicates = (array) => new Set(array).size !== array.length;
/**
* @description Finds the string with the most characters in an array of strings
* @param {string[]} strings Array of strings to check
* @returns {string} String with the most characters
* @example
* findStringWithMostCharacters(['a', 'bb', 'ccc']) // returns 'ccc'
*/
const findStringWithMostCharacters = (strings) => {
	if (!strings || strings.length === 0) return "";
	return strings.reduce((longestString, currentString) => currentString.length > longestString.length ? currentString : longestString);
};
/**
* @description Checks if two arrays have the same elements regardless of order
* @param {any[] | null} arr1 First array
* @param {any[] | null} arr2 Second array
* @returns {boolean} True if arrays have same elements, false otherwise
* @example
* checkIfArraysHaveSameElements([1, 2], [2, 1]) // returns true
* checkIfArraysHaveSameElements([1, 2], [1, 3]) // returns false
*/
const checkIfArraysHaveSameElements = (arr1, arr2) => {
	if (!arr1 || !arr2) return false;
	if (!Array.isArray(arr1) || !Array.isArray(arr2)) return false;
	if (arr1.length === 0 && arr2.length === 0) return true;
	return arr1.length === arr2.length && arr1.every((e) => arr2.includes(e));
};
/**
* @description Groups an array of objects by a specified field
* @param {T[]} array Array to group
* @param {keyof T} field Field to group by
* @returns {GroupedItems<T>} Grouped object
* @example
* const array = [{type: 'A', value: 1}, {type: 'B', value: 2}];
* groupByField(array, 'type') // returns { A: [{type: 'A', value: 1}], B: [{type: 'B', value: 2}] }
*/
const groupByField = (array, field) => array.reduce((grouped, item) => {
	const key = String(item[field]);
	grouped[key] = (grouped[key] || []).concat(item);
	return grouped;
}, {});
/**
* @description Sorts an array of objects by a specified field
* @param {any[]} array Array to sort
* @param {string} field Field to sort by
* @returns {any[]} Sorted array
* @example
* const array = [{value: 2}, {value: 1}];
* sortByField(array, 'value') // returns [{value: 1}, {value: 2}]
*/
const sortByField = (array, field) => array.sort((a, b) => a[field] < b[field] ? -1 : a[field] > b[field] ? 1 : 0);
/**
* @description Orders grouped data by a specified field
* @param {GroupedItems<T>} groupedData Grouped data object
* @param {keyof T} orderBy Field to order by
* @returns {GroupedItems<T>} Ordered grouped data
*/
const orderGroupedDataByField = (groupedData, orderBy$1) => {
	for (const key in groupedData) if (groupedData.hasOwnProperty(key)) groupedData[key] = groupedData[key].sort((a, b) => {
		if (a[orderBy$1] < b[orderBy$1]) return -1;
		if (a[orderBy$1] > b[orderBy$1]) return 1;
		return 0;
	});
	return groupedData;
};
/**
* @description Builds a tree structure from an array of labels
* @param {IIssueLabel[]} array Array of labels
* @param {any} parent Parent ID
* @returns {IIssueLabelTree[]} Tree structure
*/
const buildTree = (array, parent = null) => {
	const tree = [];
	array.forEach((item) => {
		if (item.parent === parent) {
			item.children = buildTree(array, item.id);
			tree.push(item);
		}
	});
	return tree;
};
/**
* @description Returns valid keys from object whose value is not falsy
* @param {any} obj Object to check
* @returns {string[]} Array of valid keys
* @example
* getValidKeysFromObject({a: 1, b: 0, c: null}) // returns ['a']
*/
const getValidKeysFromObject = (obj) => {
	if (!obj || isEmpty(obj) || typeof obj !== "object" || Array.isArray(obj)) return [];
	return Object.keys(obj).filter((key) => !!obj[key]);
};
/**
* @description Converts an array of strings into an object with boolean true values
* @param {string[]} arrayStrings Array of strings
* @returns {Object} Object with string keys and boolean values
* @example
* convertStringArrayToBooleanObject(['a', 'b']) // returns {a: true, b: true}
*/
const convertStringArrayToBooleanObject = (arrayStrings) => {
	const obj = {};
	for (const arrayString of arrayStrings) obj[arrayString] = true;
	return obj;
};

//#endregion
//#region src/attachment.ts
const generateFileName = (fileName) => {
	const timestamp = (/* @__PURE__ */ new Date()).getTime();
	const _fileName = getFileName(fileName);
	return `${_fileName.length > 80 ? _fileName.substring(0, 80) : _fileName}-${timestamp}.${getFileExtension(fileName)}`;
};
const getFileExtension = (filename) => filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
const getFileName = (fileName) => {
	const dotIndex = fileName.lastIndexOf(".");
	return fileName.substring(0, dotIndex);
};
const convertBytesToSize = (bytes) => {
	let size;
	if (bytes < 1024 * 1024) size = Math.round(bytes / 1024) + " KB";
	else size = Math.round(bytes / (1024 * 1024)) + " MB";
	return size;
};

//#endregion
//#region src/auth.ts
/**
* @description Password strength levels
*/
let PasswordStrength = /* @__PURE__ */ function(PasswordStrength$1) {
	PasswordStrength$1["EMPTY"] = "empty";
	PasswordStrength$1["WEAK"] = "weak";
	PasswordStrength$1["FAIR"] = "fair";
	PasswordStrength$1["GOOD"] = "good";
	PasswordStrength$1["STRONG"] = "strong";
	return PasswordStrength$1;
}({});
/**
* Calculate password strength based on various criteria
*/
const getPasswordStrength = (password) => {
	if (!password || password === "" || password.length <= 0) return E_PASSWORD_STRENGTH.EMPTY;
	if (password.length < 8) return E_PASSWORD_STRENGTH.LENGTH_NOT_VALID;
	const hasUpperCase = /[A-Z]/.test(password);
	const hasLowerCase = /[a-z]/.test(password);
	const hasDigit = /[0-9]/.test(password);
	const hasSpecialChar = /[!@#$%^&*()\-_+=\[\]{}|;:'",.<>?/]/.test(password);
	if (hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar) return E_PASSWORD_STRENGTH.STRENGTH_VALID;
	return E_PASSWORD_STRENGTH.STRENGTH_NOT_VALID;
};
/**
* Get password criteria for validation display
*/
const getPasswordCriteria = (password) => [
	{
		key: "length",
		label: "Min 8 characters",
		isValid: password.length >= 8
	},
	{
		key: "uppercase",
		label: "Min 1 upper-case letter",
		isValid: /[A-Z]/.test(password)
	},
	{
		key: "lowercase",
		label: "Min 1 lower-case letter",
		isValid: /[a-z]/.test(password)
	},
	{
		key: "number",
		label: "Min 1 number",
		isValid: /[0-9]/.test(password)
	},
	{
		key: "special",
		label: "Min 1 special character",
		isValid: /[!@#$%^&*()\-_+=\[\]{}|;:'",.<>?/]/.test(password)
	}
];
const errorCodeMessages = {
	[EAuthErrorCodes.INSTANCE_NOT_CONFIGURED]: {
		title: `Instance not configured`,
		message: () => `Instance not configured. Please contact your administrator.`
	},
	[EAuthErrorCodes.SIGNUP_DISABLED]: {
		title: `Sign up disabled`,
		message: () => `Sign up disabled. Please contact your administrator.`
	},
	[EAuthErrorCodes.INVALID_PASSWORD]: {
		title: `Invalid password`,
		message: () => `Invalid password. Please try again.`
	},
	[EAuthErrorCodes.SMTP_NOT_CONFIGURED]: {
		title: `SMTP not configured`,
		message: () => `SMTP not configured. Please contact your administrator.`
	},
	[EAuthErrorCodes.INVALID_EMAIL]: {
		title: `Invalid email`,
		message: () => `Invalid email. Please try again.`
	},
	[EAuthErrorCodes.EMAIL_REQUIRED]: {
		title: `Email required`,
		message: () => `Email required. Please try again.`
	},
	[EAuthErrorCodes.USER_ALREADY_EXIST]: {
		title: `User already exists`,
		message: () => `Your account is already registered. Sign in now.`
	},
	[EAuthErrorCodes.REQUIRED_EMAIL_PASSWORD_SIGN_UP]: {
		title: `Email and password required`,
		message: () => `Email and password required. Please try again.`
	},
	[EAuthErrorCodes.AUTHENTICATION_FAILED_SIGN_UP]: {
		title: `Authentication failed`,
		message: () => `Authentication failed. Please try again.`
	},
	[EAuthErrorCodes.INVALID_EMAIL_SIGN_UP]: {
		title: `Invalid email`,
		message: () => `Invalid email. Please try again.`
	},
	[EAuthErrorCodes.MAGIC_SIGN_UP_EMAIL_CODE_REQUIRED]: {
		title: `Email and code required`,
		message: () => `Email and code required. Please try again.`
	},
	[EAuthErrorCodes.INVALID_EMAIL_MAGIC_SIGN_UP]: {
		title: `Invalid email`,
		message: () => `Invalid email. Please try again.`
	},
	[EAuthErrorCodes.USER_ACCOUNT_DEACTIVATED]: {
		title: `User account deactivated`,
		message: () => `User account deactivated. Please contact administrator.`
	},
	[EAuthErrorCodes.USER_DOES_NOT_EXIST]: {
		title: `User does not exist`,
		message: () => `No account found. Create one to get started.`
	},
	[EAuthErrorCodes.REQUIRED_EMAIL_PASSWORD_SIGN_IN]: {
		title: `Email and password required`,
		message: () => `Email and password required. Please try again.`
	},
	[EAuthErrorCodes.AUTHENTICATION_FAILED_SIGN_IN]: {
		title: `Authentication failed`,
		message: () => `Authentication failed. Please try again.`
	},
	[EAuthErrorCodes.INVALID_EMAIL_SIGN_IN]: {
		title: `Invalid email`,
		message: () => `Invalid email. Please try again.`
	},
	[EAuthErrorCodes.MAGIC_SIGN_IN_EMAIL_CODE_REQUIRED]: {
		title: `Email and code required`,
		message: () => `Email and code required. Please try again.`
	},
	[EAuthErrorCodes.INVALID_EMAIL_MAGIC_SIGN_IN]: {
		title: `Invalid email`,
		message: () => `Invalid email. Please try again.`
	},
	[EAuthErrorCodes.INVALID_MAGIC_CODE_SIGN_IN]: {
		title: `Authentication failed`,
		message: () => `Invalid magic code. Please try again.`
	},
	[EAuthErrorCodes.INVALID_MAGIC_CODE_SIGN_UP]: {
		title: `Authentication failed`,
		message: () => `Invalid magic code. Please try again.`
	},
	[EAuthErrorCodes.EXPIRED_MAGIC_CODE_SIGN_IN]: {
		title: `Expired magic code`,
		message: () => `Expired magic code. Please try again.`
	},
	[EAuthErrorCodes.EXPIRED_MAGIC_CODE_SIGN_UP]: {
		title: `Expired magic code`,
		message: () => `Expired magic code. Please try again.`
	},
	[EAuthErrorCodes.EMAIL_CODE_ATTEMPT_EXHAUSTED_SIGN_IN]: {
		title: `Expired magic code`,
		message: () => `Expired magic code. Please try again.`
	},
	[EAuthErrorCodes.EMAIL_CODE_ATTEMPT_EXHAUSTED_SIGN_UP]: {
		title: `Expired magic code`,
		message: () => `Expired magic code. Please try again.`
	},
	[EAuthErrorCodes.OAUTH_NOT_CONFIGURED]: {
		title: `OAuth not configured`,
		message: () => `OAuth not configured. Please contact your administrator.`
	},
	[EAuthErrorCodes.GOOGLE_NOT_CONFIGURED]: {
		title: `Google not configured`,
		message: () => `Google not configured. Please contact your administrator.`
	},
	[EAuthErrorCodes.GITHUB_NOT_CONFIGURED]: {
		title: `GitHub not configured`,
		message: () => `GitHub not configured. Please contact your administrator.`
	},
	[EAuthErrorCodes.GITLAB_NOT_CONFIGURED]: {
		title: `GitLab not configured`,
		message: () => `GitLab not configured. Please contact your administrator.`
	},
	[EAuthErrorCodes.GOOGLE_OAUTH_PROVIDER_ERROR]: {
		title: `Google OAuth provider error`,
		message: () => `Google OAuth provider error. Please try again.`
	},
	[EAuthErrorCodes.GITHUB_OAUTH_PROVIDER_ERROR]: {
		title: `GitHub OAuth provider error`,
		message: () => `GitHub OAuth provider error. Please try again.`
	},
	[EAuthErrorCodes.GITLAB_OAUTH_PROVIDER_ERROR]: {
		title: `GitLab OAuth provider error`,
		message: () => `GitLab OAuth provider error. Please try again.`
	},
	[EAuthErrorCodes.INVALID_PASSWORD_TOKEN]: {
		title: `Invalid password token`,
		message: () => `Invalid password token. Please try again.`
	},
	[EAuthErrorCodes.EXPIRED_PASSWORD_TOKEN]: {
		title: `Expired password token`,
		message: () => `Expired password token. Please try again.`
	},
	[EAuthErrorCodes.MISSING_PASSWORD]: {
		title: `Password required`,
		message: () => `Password required. Please try again.`
	},
	[EAuthErrorCodes.INCORRECT_OLD_PASSWORD]: {
		title: `Incorrect old password`,
		message: () => `Incorrect old password. Please try again.`
	},
	[EAuthErrorCodes.INVALID_NEW_PASSWORD]: {
		title: `Invalid new password`,
		message: () => `Invalid new password. Please try again.`
	},
	[EAuthErrorCodes.PASSWORD_ALREADY_SET]: {
		title: `Password already set`,
		message: () => `Password already set. Please try again.`
	},
	[EAuthErrorCodes.ADMIN_ALREADY_EXIST]: {
		title: `Admin already exists`,
		message: () => `Admin already exists. Please try again.`
	},
	[EAuthErrorCodes.REQUIRED_ADMIN_EMAIL_PASSWORD_FIRST_NAME]: {
		title: `Email, password and first name required`,
		message: () => `Email, password and first name required. Please try again.`
	},
	[EAuthErrorCodes.INVALID_ADMIN_EMAIL]: {
		title: `Invalid admin email`,
		message: () => `Invalid admin email. Please try again.`
	},
	[EAuthErrorCodes.INVALID_ADMIN_PASSWORD]: {
		title: `Invalid admin password`,
		message: () => `Invalid admin password. Please try again.`
	},
	[EAuthErrorCodes.REQUIRED_ADMIN_EMAIL_PASSWORD]: {
		title: `Email and password required`,
		message: () => `Email and password required. Please try again.`
	},
	[EAuthErrorCodes.ADMIN_AUTHENTICATION_FAILED]: {
		title: `Authentication failed`,
		message: () => `Authentication failed. Please try again.`
	},
	[EAuthErrorCodes.ADMIN_USER_ALREADY_EXIST]: {
		title: `Admin user already exists`,
		message: () => `Admin user already exists. Sign in now.`
	},
	[EAuthErrorCodes.ADMIN_USER_DOES_NOT_EXIST]: {
		title: `Admin user does not exist`,
		message: () => `Admin user does not exist. Sign in now.`
	},
	[EAuthErrorCodes.MAGIC_LINK_LOGIN_DISABLED]: {
		title: `Magic link login disabled`,
		message: () => `Magic link login is disabled. Please use password to login.`
	},
	[EAuthErrorCodes.PASSWORD_LOGIN_DISABLED]: {
		title: `Password login disabled`,
		message: () => `Password login is disabled. Please use magic link to login.`
	},
	[EAuthErrorCodes.ADMIN_USER_DEACTIVATED]: {
		title: `Admin user deactivated`,
		message: () => `Admin user account has been deactivated. Please contact administrator.`
	},
	[EAuthErrorCodes.RATE_LIMIT_EXCEEDED]: {
		title: `Rate limit exceeded`,
		message: () => `Too many requests. Please try again later.`
	}
};
const authErrorHandler = (errorCode, email) => {
	if ([
		EAuthErrorCodes.INSTANCE_NOT_CONFIGURED,
		EAuthErrorCodes.INVALID_EMAIL,
		EAuthErrorCodes.EMAIL_REQUIRED,
		EAuthErrorCodes.SIGNUP_DISABLED,
		EAuthErrorCodes.INVALID_PASSWORD,
		EAuthErrorCodes.SMTP_NOT_CONFIGURED,
		EAuthErrorCodes.USER_ALREADY_EXIST,
		EAuthErrorCodes.AUTHENTICATION_FAILED_SIGN_UP,
		EAuthErrorCodes.REQUIRED_EMAIL_PASSWORD_SIGN_UP,
		EAuthErrorCodes.INVALID_EMAIL_SIGN_UP,
		EAuthErrorCodes.INVALID_EMAIL_MAGIC_SIGN_UP,
		EAuthErrorCodes.MAGIC_SIGN_UP_EMAIL_CODE_REQUIRED,
		EAuthErrorCodes.USER_DOES_NOT_EXIST,
		EAuthErrorCodes.AUTHENTICATION_FAILED_SIGN_IN,
		EAuthErrorCodes.REQUIRED_EMAIL_PASSWORD_SIGN_IN,
		EAuthErrorCodes.INVALID_EMAIL_SIGN_IN,
		EAuthErrorCodes.INVALID_EMAIL_MAGIC_SIGN_IN,
		EAuthErrorCodes.MAGIC_SIGN_IN_EMAIL_CODE_REQUIRED,
		EAuthErrorCodes.INVALID_MAGIC_CODE_SIGN_IN,
		EAuthErrorCodes.INVALID_MAGIC_CODE_SIGN_UP,
		EAuthErrorCodes.EXPIRED_MAGIC_CODE_SIGN_IN,
		EAuthErrorCodes.EXPIRED_MAGIC_CODE_SIGN_UP,
		EAuthErrorCodes.EMAIL_CODE_ATTEMPT_EXHAUSTED_SIGN_IN,
		EAuthErrorCodes.EMAIL_CODE_ATTEMPT_EXHAUSTED_SIGN_UP,
		EAuthErrorCodes.OAUTH_NOT_CONFIGURED,
		EAuthErrorCodes.GOOGLE_NOT_CONFIGURED,
		EAuthErrorCodes.GITHUB_NOT_CONFIGURED,
		EAuthErrorCodes.GITLAB_NOT_CONFIGURED,
		EAuthErrorCodes.GOOGLE_OAUTH_PROVIDER_ERROR,
		EAuthErrorCodes.GITHUB_OAUTH_PROVIDER_ERROR,
		EAuthErrorCodes.GITLAB_OAUTH_PROVIDER_ERROR,
		EAuthErrorCodes.INVALID_PASSWORD_TOKEN,
		EAuthErrorCodes.EXPIRED_PASSWORD_TOKEN,
		EAuthErrorCodes.INCORRECT_OLD_PASSWORD,
		EAuthErrorCodes.INVALID_NEW_PASSWORD,
		EAuthErrorCodes.PASSWORD_ALREADY_SET,
		EAuthErrorCodes.ADMIN_ALREADY_EXIST,
		EAuthErrorCodes.REQUIRED_ADMIN_EMAIL_PASSWORD_FIRST_NAME,
		EAuthErrorCodes.INVALID_ADMIN_EMAIL,
		EAuthErrorCodes.INVALID_ADMIN_PASSWORD,
		EAuthErrorCodes.REQUIRED_ADMIN_EMAIL_PASSWORD,
		EAuthErrorCodes.ADMIN_AUTHENTICATION_FAILED,
		EAuthErrorCodes.ADMIN_USER_ALREADY_EXIST,
		EAuthErrorCodes.ADMIN_USER_DOES_NOT_EXIST,
		EAuthErrorCodes.USER_ACCOUNT_DEACTIVATED
	].includes(errorCode)) return {
		type: EErrorAlertType.BANNER_ALERT,
		code: errorCode,
		title: errorCodeMessages[errorCode]?.title || "Error",
		message: errorCodeMessages[errorCode]?.message(email) || "Something went wrong. Please try again."
	};
};

//#endregion
//#region src/datetime.ts
/**
* @returns {string | null} formatted date in the desired format or platform default format (MMM dd, yyyy)
* @description Returns date in the formatted format
* @param {Date | string} date
* @param {string} formatToken (optional) // default MMM dd, yyyy
* @example renderFormattedDate("2024-01-01", "MM-DD-YYYY") // Jan 01, 2024
* @example renderFormattedDate("2024-01-01") // Jan 01, 2024
*/
const renderFormattedDate = (date, formatToken = "MMM dd, yyyy") => {
	const parsedDate = getDate(date);
	if (!parsedDate) return;
	if (!isValid(parsedDate)) return;
	let formattedDate;
	try {
		formattedDate = format(parsedDate, formatToken);
	} catch (_e) {
		formattedDate = format(parsedDate, "MMM dd, yyyy");
	}
	return formattedDate;
};
/**
* @returns {string} formatted date in the format of MMM dd
* @description Returns date in the formatted format
* @param {string | Date} date
* @example renderShortDateFormat("2024-01-01") // Jan 01
*/
const renderFormattedDateWithoutYear = (date) => {
	const parsedDate = getDate(date);
	if (!parsedDate) return "";
	if (!isValid(parsedDate)) return "";
	return format(parsedDate, "MMM dd");
};
/**
* @returns {string | null} formatted date in the format of yyyy-mm-dd to be used in payload
* @description Returns date in the formatted format to be used in payload
* @param {Date | string} date
* @example renderFormattedPayloadDate("Jan 01, 20224") // "2024-01-01"
*/
const renderFormattedPayloadDate = (date) => {
	const parsedDate = getDate(date);
	if (!parsedDate) return;
	if (!isValid(parsedDate)) return;
	return format(parsedDate, "yyyy-MM-dd");
};
/**
* @returns {string} formatted date in the format of hh:mm a or HH:mm
* @description Returns date in 12 hour format if in12HourFormat is true else 24 hour format
* @param {string | Date} date
* @param {boolean} timeFormat (optional) // default 24 hour
* @example renderFormattedTime("2024-01-01 13:00:00") // 13:00
* @example renderFormattedTime("2024-01-01 13:00:00", "12-hour") // 01:00 PM
*/
const renderFormattedTime = (date, timeFormat = "24-hour") => {
	const parsedDate = new Date(date);
	if (!parsedDate) return "";
	if (!isValid(parsedDate)) return "";
	if (timeFormat === "12-hour") return format(parsedDate, "hh:mm a");
	return format(parsedDate, "HH:mm");
};
/**
* @returns {number} total number of days in range
* @description Returns total number of days in range
* @param {string} startDate
* @param {string} endDate
* @param {boolean} inclusive
* @example checkIfStringIsDate("2021-01-01", "2021-01-08") // 8
*/
const findTotalDaysInRange = (startDate, endDate, inclusive = true) => {
	const parsedStartDate = getDate(startDate);
	const parsedEndDate = getDate(endDate);
	if (!parsedStartDate || !parsedEndDate) return;
	if (!isValid(parsedStartDate) || !isValid(parsedEndDate)) return 0;
	const diffInDays = differenceInDays(parsedEndDate, parsedStartDate);
	return inclusive ? diffInDays + 1 : diffInDays;
};
/**
* Add number of days to the provided date and return a resulting new date
* @param startDate
* @param numberOfDays
* @returns
*/
const addDaysToDate = (startDate, numberOfDays) => {
	const parsedStartDate = getDate(startDate);
	if (!parsedStartDate) return;
	const newDate = new Date(parsedStartDate);
	newDate.setDate(newDate.getDate() + numberOfDays);
	return newDate;
};
/**
* @returns {number} number of days left from today
* @description Returns number of days left from today
* @param {string | Date} date
* @param {boolean} inclusive (optional) // default true
* @example findHowManyDaysLeft("2024-01-01") // 3
*/
const findHowManyDaysLeft = (date, inclusive = true) => {
	if (!date) return void 0;
	return findTotalDaysInRange(/* @__PURE__ */ new Date(), date, inclusive);
};
/**
* @returns {string} formatted date in the form of amount of time passed since the event happened
* @description Returns time passed since the event happened
* @param {string | Date} time
* @example calculateTimeAgo("2023-01-01") // 1 year ago
*/
const calculateTimeAgo = (time) => {
	if (!time) return "";
	const parsedTime = typeof time === "string" || typeof time === "number" ? parseISO(String(time)) : time;
	if (!parsedTime) return "";
	return formatDistanceToNow(parsedTime, { addSuffix: true });
};
function calculateTimeAgoShort(date) {
	if (!date) return "";
	const parsedDate = typeof date === "string" ? parseISO(date) : new Date(date);
	const diffInSeconds = ((/* @__PURE__ */ new Date()).getTime() - parsedDate.getTime()) / 1e3;
	if (diffInSeconds < 60) return `${Math.floor(diffInSeconds)}s`;
	const diffInMinutes = diffInSeconds / 60;
	if (diffInMinutes < 60) return `${Math.floor(diffInMinutes)}m`;
	const diffInHours = diffInMinutes / 60;
	if (diffInHours < 24) return `${Math.floor(diffInHours)}h`;
	const diffInDays = diffInHours / 24;
	if (diffInDays < 30) return `${Math.floor(diffInDays)}d`;
	const diffInMonths = diffInDays / 30;
	if (diffInMonths < 12) return `${Math.floor(diffInMonths)}mo`;
	const diffInYears = diffInMonths / 12;
	return `${Math.floor(diffInYears)}y`;
}
/**
* @returns {string} boolean value depending on whether the date is greater than today
* @description Returns boolean value depending on whether the date is greater than today
* @param {string} dateStr
* @example isDateGreaterThanToday("2024-01-01") // true
*/
const isDateGreaterThanToday = (dateStr) => {
	if (!dateStr) return false;
	const date = parseISO(dateStr);
	const today = /* @__PURE__ */ new Date();
	if (!isValid(date)) return false;
	return isAfter(date, today);
};
/**
* @returns {number} week number of date
* @description Returns week number of date
* @param {Date} date
* @example getWeekNumber(new Date("2023-09-01")) // 35
*/
const getWeekNumberOfDate = (date) => {
	const currentDate = date;
	const startDate = new Date(currentDate.getFullYear(), 0, 1);
	const days = Math.floor((currentDate.getTime() - startDate.getTime()) / (1440 * 60 * 1e3));
	return Math.ceil((days + 1) / 7);
};
/**
* @returns {boolean} boolean value depending on whether the dates are equal
* @description Returns boolean value depending on whether the dates are equal
* @param date1
* @param date2
* @example checkIfDatesAreEqual("2024-01-01", "2024-01-01") // true
* @example checkIfDatesAreEqual("2024-01-01", "2024-01-02") // false
*/
const checkIfDatesAreEqual = (date1, date2) => {
	const parsedDate1 = getDate(date1);
	const parsedDate2 = getDate(date2);
	if (!parsedDate1 && !parsedDate2) return true;
	if (!parsedDate1 || !parsedDate2) return false;
	return isEqual$1(parsedDate1, parsedDate2);
};
/**
* This method returns a date from string of type yyyy-mm-dd
* This method is recommended to use instead of new Date() as this does not introduce any timezone offsets
* @param date
* @returns date or undefined
*/
const getDate = (date) => {
	try {
		if (!date || date === "") return;
		if (typeof date !== "string" && !(date instanceof String)) return date;
		const [yearString, monthString, dayString] = date.substring(0, 10).split("-");
		const year = parseInt(yearString);
		const month = parseInt(monthString);
		const day = parseInt(dayString);
		if (!isNumber(year) || !isNumber(month) || !isNumber(day)) return;
		return new Date(year, month - 1, day);
	} catch (_e) {
		return;
	}
};
const isInDateFormat = (date) => {
	return /^\d{4}-\d{2}-\d{2}$/.test(date);
};
/**
* returns the date string in ISO format regardless of the timezone in input date string
* @param dateString
* @returns
*/
const convertToISODateString = (dateString) => {
	if (!dateString) return dateString;
	return new Date(dateString).toISOString();
};
/**
* returns the date string in Epoch regardless of the timezone in input date string
* @param dateString
* @returns
*/
const convertToEpoch = (dateString) => {
	if (!dateString) return dateString;
	return new Date(dateString).getTime();
};
/**
* get current Date time in UTC ISO format
* @returns
*/
const getCurrentDateTimeInISO = () => {
	return (/* @__PURE__ */ new Date()).toISOString();
};
/**
* @description converts hours and minutes to minutes
* @param { number } hours
* @param { number } minutes
* @returns { number } minutes
* @example convertHoursMinutesToMinutes(2, 30) // Output: 150
*/
const convertHoursMinutesToMinutes = (hours, minutes) => hours * 60 + minutes;
/**
* @description converts minutes to hours and minutes
* @param { number } mins
* @returns { number, number } hours and minutes
* @example convertMinutesToHoursAndMinutes(150) // Output: { hours: 2, minutes: 30 }
*/
const convertMinutesToHoursAndMinutes = (mins) => {
	return {
		hours: Math.floor(mins / 60),
		minutes: Math.floor(mins % 60)
	};
};
/**
* @description converts minutes to hours and minutes string
* @param { number } totalMinutes
* @returns { string } 0h 0m
* @example convertMinutesToHoursAndMinutes(150) // Output: 2h 10m
*/
const convertMinutesToHoursMinutesString = (totalMinutes) => {
	const { hours, minutes } = convertMinutesToHoursAndMinutes(totalMinutes);
	return `${hours ? `${hours}h ` : ``}${minutes ? `${minutes}m ` : ``}`;
};
/**
* @description calculates the read time for a document using the words count
* @param {number} wordsCount
* @returns {number} total number of seconds
* @example getReadTimeFromWordsCount(400) // Output: 120
* @example getReadTimeFromWordsCount(100) // Output: 30s
*/
const getReadTimeFromWordsCount = (wordsCount) => {
	return wordsCount / 200 * 60;
};
/**
* @description generates an array of dates between the start and end dates
* @param startDate
* @param endDate
* @returns
*/
const generateDateArray = (startDate, endDate) => {
	const start = new Date(startDate);
	const end = new Date(endDate);
	end.setDate(end.getDate() + 2);
	const dateArray = [];
	while (start <= end) {
		dateArray.push({ date: new Date(start).toISOString().split("T")[0] });
		start.setDate(start.getDate() + 1);
	}
	return dateArray;
};
/**
* Processes relative date strings like "1_weeks", "2_months" etc and returns a Date
* @param value The relative date string (e.g., "1_weeks", "2_months")
* @returns Date object representing the calculated date
*/
const processRelativeDate = (value) => {
	const [amountStr, unit] = value.split("_");
	const amount = parseInt(amountStr, 10);
	if (isNaN(amount)) throw new Error(`Invalid relative amount: ${amountStr}`);
	const date = /* @__PURE__ */ new Date();
	switch (unit) {
		case "days":
			date.setDate(date.getDate() + amount);
			break;
		case "weeks":
			date.setDate(date.getDate() + amount * 7);
			break;
		case "months":
			date.setMonth(date.getMonth() + amount);
			break;
		default: throw new Error(`Unsupported time unit: ${unit}`);
	}
	return date;
};
/**
* Parses a date filter string and returns the comparison type and date
* @param filterValue The date filter string (e.g., "1_weeks;after;fromnow" or "2024-12-01;after")
* @returns Object containing the comparison type and target date
*/
const parseDateFilter = (filterValue) => {
	const parts = filterValue.split(";");
	const dateStr = parts[0];
	const type = parts[1];
	let date;
	if (dateStr.includes("_")) date = processRelativeDate(dateStr);
	else date = new Date(dateStr);
	return {
		type,
		date
	};
};
/**
* Checks if a date meets the filter criteria
* @param dateToCheck The date to check
* @param filterDate The filter date to compare against
* @param type The type of comparison ('after' or 'before')
* @returns boolean indicating if the date meets the criteria
*/
const checkDateCriteria = (dateToCheck, filterDate, type) => {
	if (!dateToCheck) return false;
	const checkDate = new Date(dateToCheck);
	const normalizedCheck = new Date(checkDate.setHours(0, 0, 0, 0));
	const normalizedFilter = new Date(filterDate.getTime());
	normalizedFilter.setHours(0, 0, 0, 0);
	return type === "after" ? normalizedCheck >= normalizedFilter : normalizedCheck <= normalizedFilter;
};
/**
* Formats merged date range display with smart formatting
* - Single date: "Jan 24, 2025"
* - Same year, same month: "Jan 24 - 28, 2025"
* - Same year, different month: "Jan 24 - Feb 6, 2025"
* - Different year: "Dec 28, 2024 - Jan 4, 2025"
*/
const formatDateRange = (parsedStartDate, parsedEndDate) => {
	if (!parsedStartDate && !parsedEndDate) return "";
	if (parsedStartDate && !parsedEndDate) return format(parsedStartDate, "MMM dd, yyyy");
	if (!parsedStartDate && parsedEndDate) return format(parsedEndDate, "MMM dd, yyyy");
	if (parsedStartDate && parsedEndDate) {
		const startYear = parsedStartDate.getFullYear();
		const startMonth = parsedStartDate.getMonth();
		const endYear = parsedEndDate.getFullYear();
		const endMonth = parsedEndDate.getMonth();
		if (startYear === endYear && startMonth === endMonth) {
			const startDay = format(parsedStartDate, "dd");
			const endDay = format(parsedEndDate, "dd");
			return `${format(parsedStartDate, "MMM")} ${startDay} - ${endDay}, ${startYear}`;
		}
		if (startYear === endYear) return `${format(parsedStartDate, "MMM dd")} - ${format(parsedEndDate, "MMM dd")}, ${startYear}`;
		return `${format(parsedStartDate, "MMM dd, yyyy")} - ${format(parsedEndDate, "MMM dd, yyyy")}`;
	}
	return "";
};
/**
* @returns {string} formatted duration in human readable format
* @description Converts seconds to human readable duration format (e.g., "1 hr 20 min 5 sec" or "122.30 ms")
* @param {number} seconds - The duration in seconds
* @example formatDuration(3665) // "1 hr 1 min 5 sec"
* @example formatDuration(125) // "2 min 5 sec"
* @example formatDuration(45) // "45 sec"
* @example formatDuration(0.1223094) // "122.31 ms"
*/
const formatDuration = (seconds) => {
	if (seconds == null || typeof seconds !== "number" || !Number.isFinite(seconds) || seconds < 0) return "N/A";
	if (seconds > 0 && seconds < 1) return `${(seconds * 1e3).toFixed(2)} ms`;
	const totalSeconds = Math.round(seconds);
	const hours = Math.floor(totalSeconds / 3600);
	const minutes = Math.floor(totalSeconds % 3600 / 60);
	const remainingSeconds = totalSeconds % 60;
	const parts = [];
	if (hours > 0) parts.push(`${hours} hr`);
	if (minutes > 0) parts.push(`${minutes} min`);
	if (remainingSeconds > 0 || parts.length === 0) parts.push(`${remainingSeconds} sec`);
	return parts.join(" ");
};
/**
* Checks if a date is valid
* @param date The date to check
* @returns Whether the date is valid or not
*/
const isValidDate = (date) => (typeof date === "string" || typeof date === "object") && date !== null && !isNaN(Date.parse(date));

//#endregion
//#region src/calendar.ts
/**
* @returns {ICalendarPayload} calendar payload to render the calendar
* @param {ICalendarPayload | null} currentStructure current calendar payload
* @param {Date} startDate date of the month to render
* @param {EStartOfTheWeek} startOfWeek the day to start the week on
* @description Returns calendar payload to render the calendar, if currentStructure is null, it will generate the payload for the month of startDate, else it will construct the payload for the month of startDate and append it to the currentStructure
*/
const generateCalendarData = (currentStructure, startDate, startOfWeek = EStartOfTheWeek.SUNDAY) => {
	const calendarData = currentStructure ?? {};
	const startMonth = startDate.getMonth();
	const startYear = startDate.getFullYear();
	const currentDate = new Date(startYear, startMonth, 1);
	const year = currentDate.getFullYear();
	const month = currentDate.getMonth();
	const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
	const firstDayOfMonth = (new Date(year, month, 1).getDay() - startOfWeek + 7) % 7;
	calendarData[`y-${year}`] ||= {};
	calendarData[`y-${year}`][`m-${month}`] = {};
	const numWeeks = Math.ceil((totalDaysInMonth + firstDayOfMonth) / 7);
	for (let week = 0; week < numWeeks; week++) {
		const currentWeekObject = {};
		const weekNumber = getWeekNumberOfDate(new Date(year, month, week * 7 - firstDayOfMonth + 1));
		for (let i = 0; i < 7; i++) {
			const dayNumber = week * 7 + i - firstDayOfMonth;
			const date = new Date(year, month, dayNumber + 1);
			const formattedDatePayload = renderFormattedPayloadDate(date);
			if (formattedDatePayload) currentWeekObject[formattedDatePayload] = {
				date,
				year,
				month,
				day: dayNumber + 1,
				week: weekNumber,
				is_current_month: date.getMonth() === month,
				is_current_week: getWeekNumberOfDate(date) === getWeekNumberOfDate(/* @__PURE__ */ new Date()),
				is_today: date.toDateString() === (/* @__PURE__ */ new Date()).toDateString()
			};
		}
		calendarData[`y-${year}`][`m-${month}`][`w-${week}`] = currentWeekObject;
	}
	return calendarData;
};
/**
* Returns a new array sorted by the startOfWeek.
* @param items Array of items to sort.
* @param getDayIndex Function to get the day index (0-6) from an item.
* @param startOfWeek The day to start the week on.
*/
const getOrderedDays = (items, getDayIndex, startOfWeek = EStartOfTheWeek.SUNDAY) => [...items].sort((a, b) => {
	return (7 + getDayIndex(a) - startOfWeek) % 7 - (7 + getDayIndex(b) - startOfWeek) % 7;
});

//#endregion
//#region src/color.ts
/**
* @description Validates and clamps color values to RGB range (0-255)
* @param {number} value - The color value to validate
* @returns {number} Clamped and floored value between 0-255
* @example
* validateColor(-10) // returns 0
* validateColor(300) // returns 255
* validateColor(128) // returns 128
*/
const validateColor = (value) => {
	if (value < 0) return 0;
	if (value > 255) return 255;
	return Math.floor(value);
};
/**
* Converts a decimal color value to two-character hex
* @param {number} value - Decimal color value (0-255)
* @returns {string} Two-character hex value with leading zero if needed
*/
const toHex = (value) => validateColor(value).toString(16).padStart(2, "0");
/**
* Converts a hexadecimal color code to RGB values
* @param {string} hex - The hexadecimal color code (e.g., "#ff0000" for red)
* @returns {RGB} An object containing the RGB values
* @example
* hexToRgb("#ff0000") // returns { r: 255, g: 0, b: 0 }
* hexToRgb("#00ff00") // returns { r: 0, g: 255, b: 0 }
* hexToRgb("#0000ff") // returns { r: 0, g: 0, b: 255 }
*/
const hexToRgb = (hex) => {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : {
		r: 0,
		g: 0,
		b: 0
	};
};
/**
* Converts RGB values to a hexadecimal color code
* @param {RGB} rgb - An object containing RGB values
* @param {number} rgb.r - Red component (0-255)
* @param {number} rgb.g - Green component (0-255)
* @param {number} rgb.b - Blue component (0-255)
* @returns {string} The hexadecimal color code (e.g., "#ff0000" for red)
* @example
* rgbToHex({ r: 255, g: 0, b: 0 }) // returns "#ff0000"
* rgbToHex({ r: 0, g: 255, b: 0 }) // returns "#00ff00"
* rgbToHex({ r: 0, g: 0, b: 255 }) // returns "#0000ff"
*/
const rgbToHex = ({ r, g, b }) => `#${toHex(r)}${toHex(g)}${toHex(b)}`;
/**
* Converts Hex values to HSL values
* @param {string} hex - The hexadecimal color code (e.g., "#ff0000" for red)
* @returns {HSL} An object containing the HSL values
* @example
* hexToHsl("#ff0000") // returns { h: 0, s: 100, l: 50 }
* hexToHsl("#00ff00") // returns { h: 120, s: 100, l: 50 }
* hexToHsl("#0000ff") // returns { h: 240, s: 100, l: 50 }
*/
const hexToHsl = (hex) => {
	if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) return {
		h: 0,
		s: 0,
		l: 0
	};
	const r = parseInt(hex.slice(1, 3), 16) / 255;
	const g = parseInt(hex.slice(3, 5), 16) / 255;
	const b = parseInt(hex.slice(5, 7), 16) / 255;
	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = 0;
	let s = 0;
	const l = (max + min) / 2;
	if (max !== min) {
		const d = max - min;
		s = l > .5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g:
				h = (b - r) / d + 2;
				break;
			case b:
				h = (r - g) / d + 4;
				break;
		}
		h /= 6;
	}
	return {
		h: h * 360,
		s: s * 100,
		l: l * 100
	};
};
/**
* Converts HSL values to a hexadecimal color code
* @param {HSL} hsl - An object containing HSL values
* @param {number} hsl.h - Hue component (0-360)
* @param {number} hsl.s - Saturation component (0-100)
* @param {number} hsl.l - Lightness component (0-100)
* @returns {string} The hexadecimal color code (e.g., "#ff0000" for red)
* @example
* hslToHex({ h: 0, s: 100, l: 50 }) // returns "#ff0000"
* hslToHex({ h: 120, s: 100, l: 50 }) // returns "#00ff00"
* hslToHex({ h: 240, s: 100, l: 50 }) // returns "#0000ff"
*/
const hslToHex = ({ h, s, l }) => {
	if (h < 0 || h > 360) return "#000000";
	if (s < 0 || s > 100) return "#000000";
	if (l < 0 || l > 100) return "#000000";
	l /= 100;
	const a = s * Math.min(l, 1 - l) / 100;
	const f = (n) => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color).toString(16).padStart(2, "0");
	};
	return `#${f(0)}${f(8)}${f(4)}`;
};
/**
* Calculate relative luminance of a color according to WCAG
* @param {Object} rgb - RGB color object with r, g, b properties
* @returns {number} Relative luminance value
*/
const getLuminance = ({ r, g, b }) => {
	const sR = r / 255;
	const sG = g / 255;
	const sB = b / 255;
	const R = sR <= .03928 ? sR / 12.92 : Math.pow((sR + .055) / 1.055, 2.4);
	const G = sG <= .03928 ? sG / 12.92 : Math.pow((sG + .055) / 1.055, 2.4);
	const B = sB <= .03928 ? sB / 12.92 : Math.pow((sB + .055) / 1.055, 2.4);
	return .2126 * R + .7152 * G + .0722 * B;
};
/**
* Calculate contrast ratio between two colors
* @param {Object} rgb1 - First RGB color object
* @param {Object} rgb2 - Second RGB color object
* @returns {number} Contrast ratio between the colors
*/
function getContrastRatio(rgb1, rgb2) {
	const luminance1 = getLuminance(rgb1);
	const luminance2 = getLuminance(rgb2);
	const lighter = Math.max(luminance1, luminance2);
	const darker = Math.min(luminance1, luminance2);
	return (lighter + .05) / (darker + .05);
}
/**
* Lighten a color by a specified amount
* @param {Object} rgb - RGB color object
* @param {number} amount - Amount to lighten (0-1)
* @returns {Object} Lightened RGB color
*/
function lightenColor(rgb, amount) {
	return {
		r: rgb.r + (255 - rgb.r) * amount,
		g: rgb.g + (255 - rgb.g) * amount,
		b: rgb.b + (255 - rgb.b) * amount
	};
}
/**
* Darken a color by a specified amount
* @param {Object} rgb - RGB color object
* @param {number} amount - Amount to darken (0-1)
* @returns {Object} Darkened RGB color
*/
function darkenColor(rgb, amount) {
	return {
		r: rgb.r * (1 - amount),
		g: rgb.g * (1 - amount),
		b: rgb.b * (1 - amount)
	};
}
/**
* Generate appropriate foreground and background colors based on input color
* @param {string} color - Input color in hex format
* @returns {Object} Object containing foreground and background colors in hex format
*/
function generateIconColors(color) {
	const rgbColor = hexToRgb(color);
	const luminance = getLuminance(rgbColor);
	let foregroundColor = rgbColor;
	const MIN_CONTRAST_RATIO = 3;
	if (luminance > .5) {
		let adjustedForeground = foregroundColor;
		if (getContrastRatio(foregroundColor, {
			r: 255,
			g: 255,
			b: 255
		}) < MIN_CONTRAST_RATIO) {
			let darkenAmount = .1;
			while (darkenAmount <= .9) {
				adjustedForeground = darkenColor(foregroundColor, darkenAmount);
				if (getContrastRatio(adjustedForeground, {
					r: 255,
					g: 255,
					b: 255
				}) >= MIN_CONTRAST_RATIO) break;
				darkenAmount += .1;
			}
			foregroundColor = adjustedForeground;
		}
	} else {
		let adjustedForeground = foregroundColor;
		if (getContrastRatio(foregroundColor, {
			r: 0,
			g: 0,
			b: 0
		}) < MIN_CONTRAST_RATIO) {
			let lightenAmount = .1;
			while (lightenAmount <= .9) {
				adjustedForeground = lightenColor(foregroundColor, lightenAmount);
				if (getContrastRatio(adjustedForeground, {
					r: 0,
					g: 0,
					b: 0
				}) >= MIN_CONTRAST_RATIO) break;
				lightenAmount += .1;
			}
			foregroundColor = adjustedForeground;
		}
	}
	return {
		foreground: rgbToHex({
			r: foregroundColor.r,
			g: foregroundColor.g,
			b: foregroundColor.b
		}),
		background: `rgba(${foregroundColor.r}, ${foregroundColor.g}, ${foregroundColor.b}, 0.25)`
	};
}
/**
* @description Generates a deterministic HSL color based on input string
* @param {string} input - Input string to generate color from
* @returns {THsl} An object containing the HSL values
* @example
* generateRandomColor("hello") // returns consistent HSL color for "hello"
* generateRandomColor("") // returns { h: 0, s: 0, l: 0 }
*/
const generateRandomColor = (input) => {
	const seed = input || Math.random().toString(36).substring(2, 8);
	const combinedString = seed.length.toString() + seed + seed;
	const hash = Array.from(combinedString).reduce((acc, char) => {
		const charCode = char.charCodeAt(0);
		return (acc << 5) - acc + charCode;
	}, 0);
	return {
		h: Math.abs(hash % 360),
		s: 70,
		l: 70
	};
};

//#endregion
//#region src/common.ts
const getSupportEmail = (defaultEmail = "") => defaultEmail;
const cn = (...inputs) => twMerge(clsx(inputs));
/**
* Extracts IDs from an array of objects with ID property
*/
const extractIds = (items) => items.map((item) => item.id);
/**
* Checks if an ID exists and is valid within the provided list
*/
const isValidId = (id, validIds) => !!id && validIds.includes(id);
/**
* Filters an array to only include valid IDs
*/
const filterValidIds = (ids, validIds) => ids.filter((id) => validIds.includes(id));
/**
* Filters an array to include only valid IDs, returning both valid and invalid IDs
*/
const partitionValidIds = (ids, validIds) => {
	const valid = [];
	const invalid = [];
	ids.forEach((id) => {
		if (validIds.includes(id)) valid.push(id);
		else invalid.push(id);
	});
	return {
		valid,
		invalid
	};
};
/**
* Checks if an object is complete (has properties) rather than empty.
* This helps TypeScript narrow the type from CompleteOrEmpty<T> to T.
*
* @param obj The object to check, typed as CompleteOrEmpty<T>
* @returns A boolean indicating if the object is complete (true) or empty (false)
*/
const isComplete = (obj) => {
	if (obj == null) return false;
	if (typeof obj !== "object") return false;
	return Object.keys(obj).length > 0;
};
const convertRemToPixel = (rem) => rem * .9 * 16;

//#endregion
//#region src/filter.ts
/**
* @description calculates the total number of filters applied
* @param {T} filters
* @returns {number}
*/
const calculateTotalFilters = (filters) => filters && Object.keys(filters).length > 0 ? Object.keys(filters).map((key) => {
	const value = filters[key];
	if (value === null) return 0;
	if (Array.isArray(value)) return value.length;
	if (typeof value === "boolean") return value ? 1 : 0;
	return 0;
}).reduce((curr, prev) => curr + prev, 0) : 0;
/**
* @description checks if the date satisfies the filter
* @param {Date} date
* @param {string} filter
* @returns {boolean}
*/
const satisfiesDateFilter = (date, filter) => {
	const [value, operator, from] = filter.split(";");
	const dateValue = getDate(value);
	const differenceInDays$1 = differenceInCalendarDays(date, /* @__PURE__ */ new Date());
	if (operator === "custom" && from === "custom") {
		if (value === "today") return differenceInDays$1 === 0;
		if (value === "yesterday") return differenceInDays$1 === -1;
		if (value === "last_7_days") return differenceInDays$1 >= -7;
		if (value === "last_30_days") return differenceInDays$1 >= -30;
	}
	if (!from && dateValue) {
		if (operator === "after") return date >= dateValue;
		if (operator === "before") return date <= dateValue;
	}
	if (from === "fromnow") {
		if (operator === "before") {
			if (value === "1_weeks") return differenceInDays$1 <= -7;
			if (value === "2_weeks") return differenceInDays$1 <= -14;
			if (value === "1_months") return differenceInDays$1 <= -30;
		}
		if (operator === "after") {
			if (value === "1_weeks") return differenceInDays$1 >= 7;
			if (value === "2_weeks") return differenceInDays$1 >= 14;
			if (value === "1_months") return differenceInDays$1 >= 30;
			if (value === "2_months") return differenceInDays$1 >= 60;
		}
	}
	return false;
};

//#endregion
//#region src/cycle.ts
/**
* Orders cycles based on their status
* @param {ICycle[]} cycles - Array of cycles to be ordered
* @param {boolean} sortByManual - Whether to sort by manual order
* @returns {ICycle[]} Ordered array of cycles
*/
const orderCycles = (cycles, sortByManual) => {
	if (cycles.length === 0) return [];
	const acceptedStatuses = [
		"current",
		"upcoming",
		"draft"
	];
	const STATUS_ORDER = {
		current: 1,
		upcoming: 2,
		draft: 3
	};
	let filteredCycles = cycles.filter((c) => acceptedStatuses.includes(c.status?.toLowerCase() ?? ""));
	if (sortByManual) filteredCycles = sortBy(filteredCycles, [(c) => c.sort_order]);
	else filteredCycles = sortBy(filteredCycles, [(c) => STATUS_ORDER[c.status?.toLowerCase() ?? ""], (c) => c.status?.toLowerCase() === "upcoming" ? c.start_date : c.name.toLowerCase()]);
	return filteredCycles;
};
/**
* Filters cycles based on provided filter criteria
* @param {ICycle} cycle - The cycle to be filtered
* @param {TCycleFilters} filter - Filter criteria to apply
* @returns {boolean} Whether the cycle passes the filter
*/
const shouldFilterCycle = (cycle, filter) => {
	let fallsInFilters = true;
	Object.keys(filter).forEach((key) => {
		const filterKey = key;
		if (filterKey === "status" && filter.status && filter.status.length > 0) fallsInFilters = fallsInFilters && filter.status.includes(cycle.status?.toLowerCase() ?? "");
		if (filterKey === "start_date" && filter.start_date && filter.start_date.length > 0) {
			const startDate = getDate(cycle.start_date);
			filter.start_date.forEach((dateFilter) => {
				fallsInFilters = fallsInFilters && !!startDate && satisfiesDateFilter(startDate, dateFilter);
			});
		}
		if (filterKey === "end_date" && filter.end_date && filter.end_date.length > 0) {
			const endDate = getDate(cycle.end_date);
			filter.end_date.forEach((dateFilter) => {
				fallsInFilters = fallsInFilters && !!endDate && satisfiesDateFilter(endDate, dateFilter);
			});
		}
	});
	return fallsInFilters;
};
/**
* Calculates the scope based on whether it's an issue or estimate points
* @param {any} p - Progress data
* @param {boolean} isTypeIssue - Whether the type is an issue
* @returns {number} Calculated scope
*/
const scope = (p, isTypeIssue) => isTypeIssue ? p.total_issues : p.total_estimate_points;
/**
* Calculates the ideal progress value
* @param {string} date - Current date
* @param {number} scope - Total scope
* @param {ICycle} cycle - Cycle data
* @returns {number} Ideal progress value
*/
const ideal = (date, scope$1, cycle) => Math.floor((findTotalDaysInRange(date, cycle.end_date) || 0) / (findTotalDaysInRange(cycle.start_date, cycle.end_date) || 0) * scope$1);
/**
* Formats cycle data for version 1
* @param {boolean} isTypeIssue - Whether the type is an issue
* @param {ICycle} cycle - Cycle data
* @param {boolean} isBurnDown - Whether it's a burn down chart
* @param {Date|string} endDate - End date
* @returns {TProgressChartData} Formatted progress data
*/
const formatV1Data = (isTypeIssue, cycle, isBurnDown, endDate) => {
	const today = format(startOfToday(), "yyyy-MM-dd");
	const data = isTypeIssue ? cycle.distribution : cycle.estimate_distribution;
	const extendedArray = generateDateArray(endDate, endDate).map((d) => d.date);
	if (isEmpty(data)) return [];
	return [...Object.keys(data.completion_chart), ...extendedArray].map((p) => {
		const pending = data.completion_chart[p] || 0;
		const total = isTypeIssue ? cycle.total_issues : cycle.total_estimate_points;
		const completed = scope(cycle, isTypeIssue) - pending;
		return {
			date: p,
			scope: p < today ? scope(cycle, isTypeIssue) : null,
			completed,
			backlog: isTypeIssue ? cycle.backlog_issues : cycle.backlog_estimate_points,
			started: p === today ? cycle[isTypeIssue ? "started_issues" : "started_estimate_points"] : void 0,
			unstarted: p === today ? cycle[isTypeIssue ? "unstarted_issues" : "unstarted_estimate_points"] : void 0,
			cancelled: p === today ? cycle[isTypeIssue ? "cancelled_issues" : "cancelled_estimate_points"] : void 0,
			pending: Math.abs(pending || 0),
			ideal: p < today ? ideal(p, total || 0, cycle) : p <= cycle.end_date ? ideal(today, total || 0, cycle) : null,
			actual: p <= today ? isBurnDown ? Math.abs(pending) : completed : void 0
		};
	});
};
/**
* Formats cycle data for version 2
* @param {boolean} isTypeIssue - Whether the type is an issue
* @param {ICycle} cycle - Cycle data
* @param {boolean} isBurnDown - Whether it's a burn down chart
* @param {Date|string} endDate - End date
* @returns {TProgressChartData} Formatted progress data
*/
const formatV2Data = (isTypeIssue, cycle, isBurnDown, endDate) => {
	if (!cycle.progress) return [];
	let today = startOfToday();
	const extendedArray = endDate > today ? generateDateArray(today, endDate) : [];
	if (isEmpty(cycle.progress)) return extendedArray;
	today = format(startOfToday(), "yyyy-MM-dd");
	const todaysData = cycle?.progress[cycle?.progress.length - 1];
	const scopeToday = scope(todaysData, isTypeIssue);
	const idealToday = ideal(todaysData.date, scopeToday, cycle);
	let progress = [...orderBy(cycle?.progress, "date"), ...extendedArray].map((p) => {
		const pending = isTypeIssue ? p.total_issues - p.completed_issues - p.cancelled_issues : p.total_estimate_points - p.completed_estimate_points - p.cancelled_estimate_points;
		const completed = isTypeIssue ? p.completed_issues : p.completed_estimate_points;
		const dataDate = p.progress_date ? format(new Date(p.progress_date), "yyyy-MM-dd") : p.date;
		return {
			date: dataDate,
			scope: dataDate < today ? scope(p, isTypeIssue) : dataDate <= cycle.end_date ? scopeToday : null,
			completed,
			backlog: isTypeIssue ? p.backlog_issues : p.backlog_estimate_points,
			started: isTypeIssue ? p.started_issues : p.started_estimate_points,
			unstarted: isTypeIssue ? p.unstarted_issues : p.unstarted_estimate_points,
			cancelled: isTypeIssue ? p.cancelled_issues : p.cancelled_estimate_points,
			pending: Math.abs(pending),
			ideal: dataDate < today ? ideal(dataDate, scope(p, isTypeIssue), cycle) : dataDate < cycle.end_date ? idealToday : null,
			actual: dataDate <= today ? isBurnDown ? Math.abs(pending) : completed : void 0
		};
	});
	progress = uniqBy(progress, "date");
	return progress;
};
const formatActiveCycle = (args) => {
	const { cycle, isBurnDown, isTypeIssue } = args;
	const endDate = new Date(cycle.end_date);
	return cycle.version === 1 ? formatV1Data(isTypeIssue, cycle, isBurnDown, endDate) : formatV2Data(isTypeIssue, cycle, isBurnDown, endDate);
};
/**
* Calculates cycle progress percentage excluding cancelled issues from total count
* Formula: completed / (total - cancelled) * 100
* This gives accurate progress based on: pendingIssues = totalIssues - completedIssues - cancelledIssues
* @param cycle - Cycle data object
* @param estimateType - Whether to calculate based on "issues" or "points"
* @param includeInProgress - Whether to include started/in-progress items in completion calculation
* @returns Progress percentage (0-100)
*/
const calculateCycleProgress = (cycle, estimateType = "issues", includeInProgress = false) => {
	if (!cycle) return 0;
	const progressSnapshot = cycle.progress_snapshot;
	const cycleDetails = progressSnapshot && !isEmpty(progressSnapshot) ? progressSnapshot : cycle;
	let completed;
	let cancelled;
	let total;
	if (estimateType === "points") {
		completed = cycleDetails.completed_estimate_points || 0;
		cancelled = cycleDetails.cancelled_estimate_points || 0;
		total = cycleDetails.total_estimate_points || 0;
		if (includeInProgress) completed += cycleDetails.started_estimate_points || 0;
	} else {
		completed = cycleDetails.completed_issues || 0;
		cancelled = cycleDetails.cancelled_issues || 0;
		total = cycleDetails.total_issues || 0;
		if (includeInProgress) completed += cycleDetails.started_issues || 0;
	}
	const adjustedTotal = total - cancelled;
	if (adjustedTotal === 0) return 0;
	if (completed < 0 || adjustedTotal < 0) return 0;
	if (completed > adjustedTotal) return 100;
	const percentage = completed / adjustedTotal * 100;
	return Math.round(percentage);
};

//#endregion
//#region src/distribution-update.ts
/**
* Get Distribution updates with the help of previous and next issue states
* @param prevIssueState
* @param nextIssueState
* @param stateMap
* @param estimatePointById
* @returns
*/
const getDistributionPathsPostUpdate = (prevIssueState, nextIssueState, stateMap, estimatePointById) => {
	const prevIssueDistribution = getDistributionDataOfIssue(prevIssueState, -1, stateMap, estimatePointById);
	const nextIssueDistribution = getDistributionDataOfIssue(nextIssueState, 1, stateMap, estimatePointById);
	const prevChartDistribution = prevIssueDistribution.chartUpdates;
	const nextChartDistribution = nextIssueDistribution.chartUpdates;
	let chartUpdates;
	if (prevChartDistribution.isCompleted === nextChartDistribution.isCompleted) chartUpdates = [...prevChartDistribution.updates, ...nextChartDistribution.updates];
	else chartUpdates = [...nextChartDistribution.updates];
	return {
		pathUpdates: [
			...prevIssueDistribution.pathUpdates,
			...nextIssueDistribution.pathUpdates,
			...chartUpdates
		],
		assigneeUpdates: [...prevIssueDistribution.assigneeUpdates, ...nextIssueDistribution.assigneeUpdates],
		labelUpdates: [...prevIssueDistribution.labelUpdates, ...nextIssueDistribution.labelUpdates]
	};
};
/**
* Get Distribution update for a single issue state
* @param issue
* @param multiplier
* @param stateMap
* @param estimatePointById
* @returns
*/
const getDistributionDataOfIssue = (issue, multiplier, stateMap, estimatePointById) => {
	const pathUpdates = [];
	if (!issue) return {
		pathUpdates,
		assigneeUpdates: [],
		labelUpdates: [],
		chartUpdates: { updates: [] }
	};
	const stateGroup = stateMap[issue.state_id ?? ""].group;
	const isCompleted = COMPLETED_STATE_GROUPS.indexOf(stateGroup) > -1;
	const estimatePoint = parseFloat(estimatePointById?.(issue.estimate_point ?? "")?.value ?? "0");
	pathUpdates.push({
		path: ["total_issues"],
		value: multiplier
	});
	pathUpdates.push({
		path: ["total_estimate_points"],
		value: multiplier * estimatePoint
	});
	const stateDistribution = STATE_DISTRIBUTION[stateGroup];
	pathUpdates.push({
		path: [stateDistribution.issues],
		value: multiplier
	});
	pathUpdates.push({
		path: [stateDistribution.points],
		value: multiplier * estimatePoint
	});
	return {
		pathUpdates,
		assigneeUpdates: getObjectDistributionArray(issue.assignee_ids, isCompleted, estimatePoint, multiplier),
		labelUpdates: getObjectDistributionArray(issue.label_ids, isCompleted, estimatePoint, multiplier),
		chartUpdates: getChartUpdates(isCompleted, issue.completed_at, estimatePoint, multiplier)
	};
};
/**
* This is to get distribution update array for either assignees and labels object
* @param ids the assignee or label ids of issue
* @param isCompleted
* @param estimatePoint
* @param multiplier
* @returns
*/
const getObjectDistributionArray = (ids, isCompleted, estimatePoint, multiplier) => {
	const objectDistributionArray = [];
	for (const id of ids) {
		const objectDistribution = {
			id,
			total_issues: multiplier,
			total_estimates: estimatePoint * multiplier
		};
		if (isCompleted) {
			objectDistribution["completed_issues"] = multiplier;
			objectDistribution["completed_estimates"] = estimatePoint * multiplier;
		} else {
			objectDistribution["pending_issues"] = multiplier;
			objectDistribution["pending_estimates"] = estimatePoint * multiplier;
		}
		objectDistributionArray.push(objectDistribution);
	}
	return objectDistributionArray;
};
/**
* get chart distribution based of completed or not completed states
* @param isCompleted
* @param completedAt
* @param estimatePoint
* @param multiplier
* @returns
*/
const getChartUpdates = (isCompleted, completedAt, estimatePoint, multiplier) => {
	let dateToUpdate = format(/* @__PURE__ */ new Date(), "yyyy-MM-dd");
	const completedAtDate = getDate(completedAt);
	if (completedAt && completedAtDate) dateToUpdate = format(completedAtDate, "yyyy-MM-dd");
	const completedAtMultiplier = isCompleted ? -1 : 1;
	return {
		updates: [{
			path: [
				"distribution",
				"completion_chart",
				dateToUpdate
			],
			value: multiplier * completedAtMultiplier
		}, {
			path: [
				"estimate_distribution",
				"completion_chart",
				dateToUpdate
			],
			value: multiplier * completedAtMultiplier * estimatePoint
		}],
		isCompleted
	};
};
/**
* Method to update distribution of either cycle or module object
* @param distributionObject
* @param distributionUpdates
*/
const updateDistribution = (distributionObject, distributionUpdates) => {
	const { pathUpdates, assigneeUpdates, labelUpdates } = distributionUpdates;
	for (const update of pathUpdates) {
		const { path, value } = update;
		const currentValue = get(distributionObject, path);
		if (currentValue !== void 0) set(distributionObject, path, (currentValue ?? 0) + value);
	}
	for (const assigneeUpdate of assigneeUpdates) {
		const { id } = assigneeUpdate;
		if (Array.isArray(distributionObject.distribution?.assignees)) {
			const issuesAssignee = distributionObject.distribution?.assignees?.find((assignee) => assignee.assignee_id === id);
			if (issuesAssignee) {
				issuesAssignee.completed_issues += assigneeUpdate.completed_issues ?? 0;
				issuesAssignee.pending_issues += assigneeUpdate.pending_issues ?? 0;
				issuesAssignee.total_issues += assigneeUpdate.total_issues;
			}
		}
		if (Array.isArray(distributionObject.estimate_distribution?.assignees)) {
			const pointsAssignee = distributionObject.estimate_distribution?.assignees?.find((assignee) => assignee.assignee_id === id);
			if (pointsAssignee) {
				pointsAssignee.completed_estimates += assigneeUpdate.completed_estimates ?? 0;
				pointsAssignee.pending_estimates += assigneeUpdate.pending_estimates ?? 0;
				pointsAssignee.total_estimates += assigneeUpdate.total_estimates;
			}
		}
	}
	for (const labelUpdate of labelUpdates) {
		const { id } = labelUpdate;
		if (Array.isArray(distributionObject.distribution?.labels)) {
			const issuesLabel = distributionObject.distribution?.labels?.find((label) => label.label_id === id);
			if (issuesLabel) {
				issuesLabel.completed_issues += labelUpdate.completed_issues ?? 0;
				issuesLabel.pending_issues += labelUpdate.pending_issues ?? 0;
				issuesLabel.total_issues += labelUpdate.total_issues;
			}
		}
		if (Array.isArray(distributionObject.estimate_distribution?.labels)) {
			const pointsLabel = distributionObject.estimate_distribution?.labels?.find((label) => label.label_id === id);
			if (pointsLabel) {
				pointsLabel.completed_estimates += labelUpdate.completed_estimates ?? 0;
				pointsLabel.pending_estimates += labelUpdate.pending_estimates ?? 0;
				pointsLabel.total_estimates += labelUpdate.total_estimates;
			}
		}
	}
};

//#endregion
//#region src/file.ts
/**
* @description combine the file path with the base URL
* @param {string} path
* @returns {string} final URL with the base URL
*/
const getFileURL = (path) => {
	if (!path) return void 0;
	if (path.startsWith("http")) return path;
	return `${API_BASE_URL}${path}`;
};
/**
* @description this function returns the assetId from the asset source
* @param {string} src
* @returns {string} assetId
*/
const getAssetIdFromUrl = (src) => {
	if (src.charAt(src.length - 1) === "/") src = src.slice(0, -1);
	const sourcePaths = src.split("/");
	return sourcePaths[sourcePaths.length - 1];
};
/**
* @description encode image via URL to base64
* @param {string} url
* @returns
*/
const getBase64Image = async (url) => {
	if (!url || typeof url !== "string") throw new Error("Invalid URL provided");
	try {
		new URL(url);
	} catch {
		throw new Error("Invalid URL format");
	}
	const response = await fetch(url);
	if (!response.ok) throw new Error(`Failed to fetch image: ${response.statusText}`);
	const blob = await response.blob();
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			if (reader.result) resolve(reader.result);
			else reject(/* @__PURE__ */ new Error("Failed to convert image to base64."));
		};
		reader.onerror = () => {
			reject(/* @__PURE__ */ new Error("Failed to read the image file."));
		};
		reader.readAsDataURL(blob);
	});
};
/**
* @description downloads a CSV file
* @param {Array<Array<string>> | { [key: string]: string }} data - The data to be exported to CSV
* @param {string} name - The name of the file to be downloaded
*/
const csvDownload = (data, name) => {
	const csvContent = "data:text/csv;charset=utf-8," + (Array.isArray(data) ? [...data] : [Object.keys(data), Object.values(data)]).map((e) => e.join(",")).join("\n");
	const encodedUri = encodeURI(csvContent);
	const link = document.createElement("a");
	link.href = encodedUri;
	link.download = `${name}.csv`;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};

//#endregion
//#region src/editor/common.ts
/**
* @description generate the file source using assetId
* @param {TEditorSrcArgs} args
*/
const getEditorAssetSrc = (args) => {
	const { assetId, projectId, workspaceSlug } = args;
	let url = "";
	if (projectId) url = getFileURL(`/api/assets/v2/workspaces/${workspaceSlug}/projects/${projectId}/${assetId}/`);
	else url = getFileURL(`/api/assets/v2/workspaces/${workspaceSlug}/${assetId}/`);
	return url;
};
/**
* @description generate the file source using assetId
* @param {TEditorSrcArgs} args
*/
const getEditorAssetDownloadSrc = (args) => {
	const { assetId, projectId, workspaceSlug } = args;
	let url = "";
	if (projectId) url = getFileURL(`/api/assets/v2/workspaces/${workspaceSlug}/projects/${projectId}/download/${assetId}/`);
	else url = getFileURL(`/api/assets/v2/workspaces/${workspaceSlug}/download/${assetId}/`);
	return url;
};
const getTextContent = (jsx) => {
	if (!jsx) return "";
	const div = document.createElement("div");
	div.innerHTML = jsx.toString();
	return div.textContent?.trim() ?? "";
};
const isEditorEmpty = (description) => !description || description === "<p></p>" || description === `<p class="editor-paragraph-block"></p>` || description.trim() === "";
let CORE_EXTENSIONS = /* @__PURE__ */ function(CORE_EXTENSIONS$1) {
	CORE_EXTENSIONS$1["BLOCKQUOTE"] = "blockquote";
	CORE_EXTENSIONS$1["BOLD"] = "bold";
	CORE_EXTENSIONS$1["BULLET_LIST"] = "bulletList";
	CORE_EXTENSIONS$1["CALLOUT"] = "calloutComponent";
	CORE_EXTENSIONS$1["CHARACTER_COUNT"] = "characterCount";
	CORE_EXTENSIONS$1["CODE_BLOCK"] = "codeBlock";
	CORE_EXTENSIONS$1["CODE_INLINE"] = "code";
	CORE_EXTENSIONS$1["CUSTOM_COLOR"] = "customColor";
	CORE_EXTENSIONS$1["CUSTOM_IMAGE"] = "imageComponent";
	CORE_EXTENSIONS$1["CUSTOM_LINK"] = "link";
	CORE_EXTENSIONS$1["DOCUMENT"] = "doc";
	CORE_EXTENSIONS$1["DROP_CURSOR"] = "dropCursor";
	CORE_EXTENSIONS$1["ENTER_KEY"] = "enterKey";
	CORE_EXTENSIONS$1["GAP_CURSOR"] = "gapCursor";
	CORE_EXTENSIONS$1["HARD_BREAK"] = "hardBreak";
	CORE_EXTENSIONS$1["HEADING"] = "heading";
	CORE_EXTENSIONS$1["HEADINGS_LIST"] = "headingsList";
	CORE_EXTENSIONS$1["HISTORY"] = "history";
	CORE_EXTENSIONS$1["HORIZONTAL_RULE"] = "horizontalRule";
	CORE_EXTENSIONS$1["IMAGE"] = "image";
	CORE_EXTENSIONS$1["ITALIC"] = "italic";
	CORE_EXTENSIONS$1["LIST_ITEM"] = "listItem";
	CORE_EXTENSIONS$1["MARKDOWN_CLIPBOARD"] = "markdownClipboard";
	CORE_EXTENSIONS$1["MENTION"] = "mention";
	CORE_EXTENSIONS$1["ORDERED_LIST"] = "orderedList";
	CORE_EXTENSIONS$1["PARAGRAPH"] = "paragraph";
	CORE_EXTENSIONS$1["PLACEHOLDER"] = "placeholder";
	CORE_EXTENSIONS$1["SIDE_MENU"] = "editorSideMenu";
	CORE_EXTENSIONS$1["SLASH_COMMANDS"] = "slash-command";
	CORE_EXTENSIONS$1["STRIKETHROUGH"] = "strike";
	CORE_EXTENSIONS$1["TABLE"] = "table";
	CORE_EXTENSIONS$1["TABLE_CELL"] = "tableCell";
	CORE_EXTENSIONS$1["TABLE_HEADER"] = "tableHeader";
	CORE_EXTENSIONS$1["TABLE_ROW"] = "tableRow";
	CORE_EXTENSIONS$1["TASK_ITEM"] = "taskItem";
	CORE_EXTENSIONS$1["TASK_LIST"] = "taskList";
	CORE_EXTENSIONS$1["TEXT_ALIGN"] = "textAlign";
	CORE_EXTENSIONS$1["TEXT_STYLE"] = "textStyle";
	CORE_EXTENSIONS$1["TYPOGRAPHY"] = "typography";
	CORE_EXTENSIONS$1["UNDERLINE"] = "underline";
	CORE_EXTENSIONS$1["UTILITY"] = "utility";
	CORE_EXTENSIONS$1["WORK_ITEM_EMBED"] = "issue-embed-component";
	CORE_EXTENSIONS$1["EMOJI"] = "emoji";
	return CORE_EXTENSIONS$1;
}({});
let ADDITIONAL_EXTENSIONS = /* @__PURE__ */ function(ADDITIONAL_EXTENSIONS$1) {
	return ADDITIONAL_EXTENSIONS$1;
}({});

//#endregion
//#region src/editor/markdown-parser/common.ts
const createTextNode = (value) => ({
	type: "text",
	value
});

//#endregion
//#region src/editor/markdown-parser/custom-components-handler.ts
const parseCustomComponents = (args) => {
	const { metaData } = args;
	const getFileAssetDetails = (id) => metaData.file_assets.find((asset) => asset.id === id);
	return {
		"image-component": (_state, node) => {
			const properties = node.properties || {};
			const src = String(properties.src);
			const fileAssetDetails = getFileAssetDetails(src);
			if (!src || !fileAssetDetails) return createTextNode("");
			return createTextNode(`![${fileAssetDetails.name}](${fileAssetDetails.url})`);
		},
		img: (_state, node) => {
			const properties = node.properties || {};
			const src = String(properties.src);
			const alt = String(properties.alt);
			if (!src || !alt) return createTextNode("");
			return createTextNode(`![${alt || "Image"}](${src})`);
		},
		"mention-component": (_state, node) => {
			const properties = node.properties || {};
			const userId = String(properties.entity_identifier);
			const userDetails = metaData.user_mentions.find((user) => user.id === userId);
			if (!userDetails) return createTextNode("");
			return createTextNode(`[@${userDetails.display_name || "Unknown user"}](${userDetails.url || ""}) `);
		},
		...parseExtendedCustomComponents({ metaData })
	};
};
const parseExtendedCustomComponents = (_args) => ({});

//#endregion
//#region src/editor/markdown-parser/marks-handler.ts
const processMarkElement = (state, node, wrapper) => {
	if (node.children && node.children.length > 0) {
		const processedChildren = [];
		for (const child of node.children) if (child.type === "text") processedChildren.push(child);
		else if (child.type === "element") {
			const processed = state.one(child, node);
			if (processed) if (Array.isArray(processed)) processedChildren.push(...processed);
			else processedChildren.push(processed);
		}
		return createTextNode(`${wrapper}${processedChildren.map((child) => child.type === "text" ? child.value : "").join("")}${wrapper}`);
	}
	return createTextNode("");
};
const parseMarks = {
	u: (state, node) => processMarkElement(state, node, ""),
	i: (state, node) => processMarkElement(state, node, "_"),
	em: (state, node) => processMarkElement(state, node, "_")
};

//#endregion
//#region src/editor/markdown-parser/root.ts
function addSpacesToCheckboxes() {
	return (tree) => {
		const helper = (node) => {
			if (!Array.isArray(node.children) || node.children.length === 0) return;
			for (let i = 0; i < node.children.length; i++) {
				const child = node.children[i];
				if (child && child.type === "element" && child.tagName === "li" && child.properties && child.properties["data-type"] === "taskItem") {
					const liElement = child;
					const label = liElement.children?.find((c) => c.type === "element" && c.tagName === "label");
					const contentDiv = liElement.children?.find((c) => c.type === "element" && c.tagName === "div");
					if (label && contentDiv) {
						const checkbox = label.children?.find((c) => c.type === "element" && c.tagName === "input" && c.properties?.type === "checkbox");
						if (checkbox) {
							const textContent = [];
							if (contentDiv.children) for (const child$1 of contentDiv.children) if (child$1.type === "element" && child$1.tagName === "p") {
								const pElement = child$1;
								if (pElement.children) textContent.push(...pElement.children);
							} else textContent.push(child$1);
							liElement.children = [
								checkbox,
								{
									type: "text",
									value: " "
								},
								...textContent
							];
						}
					}
				} else if (child && child.type === "element") helper(child);
			}
		};
		helper(tree);
	};
}
/**
* Sanitizes a string by escaping HTML entities to prevent XSS attacks
* @param str - The string to sanitize
* @returns The sanitized string with escaped HTML entities
*/
function sanitizeHTML$1(str) {
	return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;");
}
function convertHTMLToMarkdown(args) {
	const { description_html, metaData, name } = args;
	let updatedDescriptionHtml = description_html;
	if (name) updatedDescriptionHtml = `<h1>${sanitizeHTML$1(name)}</h1>\n\n${description_html}`;
	const result = unified().use(rehypeParse, { fragment: true }).use(addSpacesToCheckboxes).use(rehypeRemark, { handlers: {
		...parseCustomComponents({ metaData }),
		...parseMarks
	} }).use(remarkGfm).use(remarkStringify, { handlers: { text: (node) => node.value } }).processSync(updatedDescriptionHtml);
	return String(result.value ?? result);
}

//#endregion
//#region src/emoji.ts
/**
* Converts a hyphen-separated hexadecimal emoji code to its decimal representation
* @param {string} emojiUnified - The unified emoji code in hexadecimal format (e.g., "1f600" or "1f1e6-1f1e8")
* @returns {string} The decimal representation of the emoji code (e.g., "128512" or "127462-127464")
* @example
* convertHexEmojiToDecimal("1f600") // returns "128512"
* convertHexEmojiToDecimal("1f1e6-1f1e8") // returns "127462-127464"
* convertHexEmojiToDecimal("") // returns ""
*/
const convertHexEmojiToDecimal = (emojiUnified) => {
	if (!emojiUnified) return "";
	return emojiUnified.toString().split("-").map((e) => parseInt(e, 16)).join("-");
};
/**
* Converts a hyphen-separated decimal emoji code back to its hexadecimal representation
* @param {string} emoji - The emoji code in decimal format (e.g., "128512" or "127462-127464")
* @returns {string} The hexadecimal representation of the emoji code (e.g., "1f600" or "1f1e6-1f1e8")
* @example
* emojiCodeToUnicode("128512") // returns "1f600"
* emojiCodeToUnicode("127462-127464") // returns "1f1e6-1f1e8"
* emojiCodeToUnicode("") // returns ""
*/
const emojiCodeToUnicode = (emoji) => {
	if (!emoji) return "";
	return emoji.toString().split("-").map((emoji$1) => parseInt(emoji$1, 10).toString(16)).join("-");
};
/**
* Groups reactions by a specified key
* @param {any[]} reactions - Array of reaction objects
* @param {string} key - Key to group reactions by
* @returns {Object} Object with reactions grouped by the specified key
*/
const groupReactions = (reactions, key) => {
	if (!Array.isArray(reactions)) {
		console.error("Expected an array of reactions, but got:", reactions);
		return {};
	}
	return reactions.reduce((acc, reaction) => {
		if (!reaction || typeof reaction !== "object" || !Object.prototype.hasOwnProperty.call(reaction, key)) {
			console.warn("Skipping undefined reaction or missing key:", reaction);
			return acc;
		}
		if (!acc[reaction[key]]) acc[reaction[key]] = [];
		acc[reaction[key]].push(reaction);
		return acc;
	}, {});
};
/**
* Returns a random emoji code from the RANDOM_EMOJI_CODES array
* @returns {string} A random emoji code
*/
const getRandomEmoji = () => RANDOM_EMOJI_CODES[Math.floor(Math.random() * RANDOM_EMOJI_CODES.length)];

//#endregion
//#region src/estimates.ts
const isEstimatePointValuesRepeated = (estimatePoints, estimateType, newEstimatePoint) => {
	const currentEstimatePoints = estimatePoints.map((estimatePoint) => estimatePoint.trim());
	let isRepeated = false;
	if (newEstimatePoint === void 0) {
		if (estimateType === EEstimateSystem.CATEGORIES) {
			if (new Set(currentEstimatePoints).size != currentEstimatePoints.length) isRepeated = true;
		} else if ([EEstimateSystem.POINTS, EEstimateSystem.TIME].includes(estimateType)) currentEstimatePoints.map((point) => {
			if (Number(point) === Number(newEstimatePoint)) isRepeated = true;
		});
	} else if (estimateType === EEstimateSystem.CATEGORIES) currentEstimatePoints.map((point) => {
		if (point === newEstimatePoint.trim()) isRepeated = true;
	});
	else if ([EEstimateSystem.POINTS, EEstimateSystem.TIME].includes(estimateType)) currentEstimatePoints.map((point) => {
		if (Number(point) === Number(newEstimatePoint.trim())) isRepeated = true;
	});
	return isRepeated;
};

//#endregion
//#region src/get-icon-for-link.ts
const SOCIAL_MEDIA_MATCHERS = [
	{
		pattern: /github\.com/,
		icon: Github
	},
	{
		pattern: /linkedin\.com/,
		icon: Linkedin
	},
	{
		pattern: /(twitter\.com|x\.com)/,
		icon: Twitter
	},
	{
		pattern: /facebook\.com/,
		icon: Facebook
	},
	{
		pattern: /instagram\.com/,
		icon: Instagram
	},
	{
		pattern: /youtube\.com/,
		icon: Youtube
	},
	{
		pattern: /dribbble\.com/,
		icon: Dribbble
	}
];
const PRODUCTIVITY_MATCHERS = [{
	pattern: /figma\.com/,
	icon: Figma
}, {
	pattern: /(google\.com|docs\.|doc\.)/,
	icon: FileText
}];
const FILE_TYPE_MATCHERS = [
	{
		pattern: /\.(jpg|jpeg|png|gif|bmp|svg|webp)$/,
		icon: FileImage
	},
	{
		pattern: /\.(mp4|mov|avi|wmv|flv|mkv)$/,
		icon: FileVideo
	},
	{
		pattern: /\.(mp3|wav|ogg)$/,
		icon: FileAudio
	},
	{
		pattern: /\.(zip|rar|7z|tar|gz)$/,
		icon: FileArchive
	},
	{
		pattern: /\.(xls|xlsx|csv)$/,
		icon: FileSpreadsheet
	},
	{
		pattern: /\.(pdf|doc|docx|txt)$/,
		icon: FileText
	},
	{
		pattern: /\.(html|js|ts|jsx|tsx|css|scss)$/,
		icon: FileCode
	}
];
const OTHER_MATCHERS = [{
	pattern: /^mailto:/,
	icon: Mail
}, {
	pattern: /^http/,
	icon: Chrome
}];
const getIconForLink = (url) => {
	const lowerUrl = url.toLowerCase();
	return [
		...SOCIAL_MEDIA_MATCHERS,
		...PRODUCTIVITY_MATCHERS,
		...FILE_TYPE_MATCHERS,
		...OTHER_MATCHERS
	].find(({ pattern }) => pattern.test(lowerUrl))?.icon ?? Link2;
};

//#endregion
//#region src/intake.ts
const getCustomDates = (duration) => {
	const today = /* @__PURE__ */ new Date();
	let firstDay, lastDay;
	switch (duration) {
		case EPastDurationFilters.TODAY:
			firstDay = renderFormattedPayloadDate(today);
			lastDay = renderFormattedPayloadDate(today);
			return `${firstDay};after,${lastDay};before`;
		case EPastDurationFilters.YESTERDAY: {
			const yesterday = subDays(today, 1);
			firstDay = renderFormattedPayloadDate(yesterday);
			lastDay = renderFormattedPayloadDate(yesterday);
			return `${firstDay};after,${lastDay};before`;
		}
		case EPastDurationFilters.LAST_7_DAYS:
			firstDay = renderFormattedPayloadDate(subDays(today, 7));
			lastDay = renderFormattedPayloadDate(today);
			return `${firstDay};after,${lastDay};before`;
		case EPastDurationFilters.LAST_30_DAYS:
			firstDay = renderFormattedPayloadDate(subDays(today, 30));
			lastDay = renderFormattedPayloadDate(today);
			return `${firstDay};after,${lastDay};before`;
	}
};

//#endregion
//#region src/loader.ts
const isLoaderReady = (loader) => loader !== "init-loader";

//#endregion
//#region src/math.ts
const getProgress = (completed, total) => total && total > 0 ? Math.round((completed ?? 0) / total * 100) : 0;

//#endregion
//#region src/module.ts
const collator = new Intl.Collator("en-US", {
	numeric: true,
	sensitivity: "base"
});
/**
* @description performs natural sorting of strings (handles numbers within strings correctly)
* @param {string} a - first string to compare
* @param {string} b - second string to compare
* @returns {number} - comparison result (-1, 0, or 1)
*/
const naturalSort = (a, b) => collator.compare(a, b);
/**
* @description orders modules based on their status
* @param {IModule[]} modules
* @param {TModuleOrderByOptions | undefined} orderByKey
* @returns {IModule[]}
*/
const orderModules = (modules, orderByKey) => {
	let orderedModules = [];
	if (modules.length === 0 || !orderByKey) return [];
	if (orderByKey === "name") orderedModules = [...modules].sort((a, b) => naturalSort(a.name, b.name));
	if (orderByKey === "-name") orderedModules = [...modules].sort((a, b) => naturalSort(b.name, a.name));
	if (["progress", "-progress"].includes(orderByKey)) orderedModules = sortBy(modules, [(m) => {
		let progress = (m.completed_issues + m.cancelled_issues) / m.total_issues;
		if (isNaN(progress)) progress = 0;
		return orderByKey === "progress" ? progress : -progress;
	}]);
	if (["issues_length", "-issues_length"].includes(orderByKey)) orderedModules = sortBy(modules, [(m) => orderByKey === "issues_length" ? m.total_issues : !m.total_issues]);
	if (orderByKey === "target_date") orderedModules = sortBy(modules, [(m) => m.target_date]);
	if (orderByKey === "-target_date") orderedModules = sortBy(modules, [(m) => !m.target_date]);
	if (orderByKey === "created_at") orderedModules = sortBy(modules, [(m) => m.created_at]);
	if (orderByKey === "-created_at") orderedModules = sortBy(modules, [(m) => !m.created_at]);
	if (orderByKey === "sort_order") orderedModules = sortBy(modules, [(m) => m.sort_order]);
	return orderedModules;
};
/**
* @description filters modules based on the filters
* @param {IModule} module
* @param {TModuleDisplayFilters} displayFilters
* @param {TModuleFilters} filters
* @returns {boolean}
*/
const shouldFilterModule = (module, displayFilters, filters) => {
	let fallsInFilters = true;
	Object.keys(filters).forEach((key) => {
		const filterKey = key;
		if (filterKey === "status" && filters.status && filters.status.length > 0) fallsInFilters = fallsInFilters && filters.status.includes(module.status?.toLowerCase() ?? "");
		if (filterKey === "lead" && filters.lead && filters.lead.length > 0) fallsInFilters = fallsInFilters && filters.lead.includes(`${module.lead_id}`);
		if (filterKey === "members" && filters.members && filters.members.length > 0) {
			const memberIds = module.member_ids;
			fallsInFilters = fallsInFilters && filters.members.some((memberId) => memberIds.includes(memberId));
		}
		if (filterKey === "start_date" && filters.start_date && filters.start_date.length > 0) {
			const startDate = getDate(module.start_date);
			filters.start_date.forEach((dateFilter) => {
				fallsInFilters = fallsInFilters && !!startDate && satisfiesDateFilter(startDate, dateFilter);
			});
		}
		if (filterKey === "target_date" && filters.target_date && filters.target_date.length > 0) {
			const endDate = getDate(module.target_date);
			filters.target_date.forEach((dateFilter) => {
				fallsInFilters = fallsInFilters && !!endDate && satisfiesDateFilter(endDate, dateFilter);
			});
		}
	});
	if (displayFilters.favorites && !module.is_favorite) fallsInFilters = false;
	return fallsInFilters;
};

//#endregion
//#region src/string.ts
/**
* @description Adds space between camelCase words
* @param {string} str - String to add spaces to
* @returns {string} String with spaces between camelCase words
* @example
* addSpaceIfCamelCase("camelCase") // returns "camel Case"
* addSpaceIfCamelCase("thisIsATest") // returns "this Is A Test"
*/
const addSpaceIfCamelCase = (str) => {
	if (str === void 0 || str === null) return "";
	if (typeof str !== "string") str = `${str}`;
	return str.replace(/([a-z])([A-Z])/g, "$1 $2");
};
/**
* @description Replaces underscores with spaces in snake_case strings
* @param {string} str - String to replace underscores in
* @returns {string} String with underscores replaced by spaces
* @example
* replaceUnderscoreIfSnakeCase("snake_case") // returns "snake case"
*/
const replaceUnderscoreIfSnakeCase = (str) => str.replace(/_/g, " ");
/**
* @description Truncates text to specified length and adds ellipsis
* @param {string} str - String to truncate
* @param {number} length - Maximum length before truncation
* @returns {string} Truncated string with ellipsis if needed
* @example
* truncateText("This is a long text", 7) // returns "This is..."
*/
const truncateText = (str, length) => {
	if (!str || str === "") return "";
	return str.length > length ? `${str.substring(0, length)}...` : str;
};
/**
* @description Creates a similar string by randomly shuffling characters
* @param {string} str - String to shuffle
* @returns {string} Shuffled string with same characters
* @example
* createSimilarString("hello") // might return "olleh" or "lehol"
*/
const createSimilarString = (str) => {
	return str.split("").sort(() => Math.random() - .5).join("");
};
/**
* @description Copies full URL (origin + path) to clipboard
* @param {string} path - URL path to copy
* @returns {Promise<void>} Promise that resolves when copying is complete
* @example
* await copyUrlToClipboard("issues/123") // copies "https://example.com/issues/123"
*/
const copyUrlToClipboard = async (path) => {
	const originUrl = typeof window !== "undefined" ? window.location.origin : "";
	await copyTextToClipboard(new URL(path, originUrl).toString());
};
/**
* @description Gets first character of first word or first characters of first two words
* @param {string} str - Input string
* @returns {string} First character(s)
* @example
* getFirstCharacters("John") // returns "J"
* getFirstCharacters("John Doe") // returns "JD"
*/
const getFirstCharacters = (str) => {
	const words = str.trim().split(" ");
	if (words.length === 1) return words[0].charAt(0);
	else return words[0].charAt(0) + words[1].charAt(0);
};
/**
* @description Formats number count, showing "99+" for numbers over 99
* @param {number} number - Number to format
* @returns {string} Formatted number string
* @example
* getNumberCount(50) // returns "50"
* getNumberCount(100) // returns "99+"
*/
const getNumberCount = (number) => {
	if (number > 99) return "99+";
	return number.toString();
};
/**
* @description: This function will capitalize the first letter of a string
* @param str String
* @returns String
*/
const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
/**
* @description : This function will remove all the HTML tags from the string
* @param {string} htmlString
* @return {string}
* @example :
* const html = "<p>Some text</p>";
const text = stripHTML(html);
console.log(text); // Some text
*/
const sanitizeHTML = (htmlString) => {
	return DOMPurify.sanitize(htmlString, { ALLOWED_TAGS: [] }).trim();
};
/**
* @description: This function will remove all the HTML tags from the string and truncate the string to the specified length
* @param {string} html
* @param {number} length
* @return {string}
* @example:
* const html = "<p>Some text</p>";
* const text = stripAndTruncateHTML(html);
* console.log(text); // Some text
*/
const stripAndTruncateHTML = (html, length = 55) => truncateText(sanitizeHTML(html), length);
/**
* @returns {boolean} true if email is valid, false otherwise
* @description Returns true if email is valid, false otherwise
* @param {string} email string to check if it is a valid email
* @example checkEmailValidity("hello world") => false
* @example checkEmailValidity("example@plane.so") => true
*/
const checkEmailValidity = (email) => {
	if (!email) return false;
	return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
};
const isEmptyHtmlString = (htmlString, allowedHTMLTags = []) => {
	return DOMPurify.sanitize(htmlString, { ALLOWED_TAGS: allowedHTMLTags }).trim() === "";
};
/**
* @description
* Check if a JSONContent object is empty
* @param {JSONContent} content
* @returns {boolean}
*/
const isJSONContentEmpty = (content) => {
	if (!content) return true;
	if (content.text !== void 0) return !content.text || content.text.trim() === "";
	if (!content.content || content.content.length === 0) {
		if (content.type === "paragraph" || content.type === "doc") return true;
		return content.type !== "hardBreak" && content.type !== "image" && content.type !== "mention-component" && content.type !== "image-component";
	}
	return content.content.every(isJSONContentEmpty);
};
/**
* @description
* This function will check if the comment is empty or not.
* It returns true if comment is empty.
* Now supports TipTap Content types (HTMLContent, JSONContent, JSONContent[], null)
*
* For HTML content:
* 1. If comment is undefined/null
* 2. If comment is an empty string
* 3. If comment is "<p></p>"
* 4. If comment contains only empty HTML tags
*
* For JSON content:
* 1. If content is null/undefined
* 2. If content has no meaningful text or nested content
* 3. If all nested content is empty
*
* @param {Content} comment - TipTap Content type
* @returns {boolean}
*/
const isCommentEmpty = (comment) => {
	if (!comment) return true;
	if (typeof comment === "string") return comment.trim() === "" || comment === "<p></p>" || isEmptyHtmlString(comment, [
		"img",
		"mention-component",
		"image-component"
	]);
	if (Array.isArray(comment)) return comment.length === 0 || comment.every(isJSONContentEmpty);
	return isJSONContentEmpty(comment);
};
/**
* @description
* Legacy function for backward compatibility with string comments
* @param {string | undefined} comment
* @returns {boolean}
* @deprecated Use isCommentEmpty with Content type instead
*/
const isStringCommentEmpty = (comment) => {
	if (!comment) return true;
	return comment?.trim() === "" || comment === "<p></p>" || isEmptyHtmlString(comment ?? "", [
		"img",
		"mention-component",
		"image-component",
		"embed-component"
	]);
};
/**
* @description
* This function test whether a URL is valid or not.
*
* It accepts URLs with or without the protocol.
* @param {string} url
* @returns {boolean}
* @example
* checkURLValidity("https://example.com") => true
* checkURLValidity("example.com") => true
* checkURLValidity("example") => false
*/
const checkURLValidity = (url) => {
	if (!url) return false;
	return /^(https?:\/\/)?((([a-z\d-]+\.)*[a-z\d-]+\.[a-z]{2,6})|(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}))(:\d+)?(\/[\w.-]*)*(\?[^#\s]*)?(#[\w-]*)?$/i.test(url);
};
/**
* Combines array elements with a separator and adds a conjunction before the last element
* @param array Array of strings to combine
* @param separator Separator to use between elements (default: ", ")
* @param conjunction Conjunction to use before last element (default: "and")
* @returns Combined string with conjunction before the last element
*/
const joinWithConjunction = (array, separator = ", ", conjunction = "and") => {
	if (!array || array.length === 0) return "";
	if (array.length === 1) return array[0];
	if (array.length === 2) return `${array[0]} ${conjunction} ${array[1]}`;
	const lastElement = array[array.length - 1];
	return `${array.slice(0, -1).join(separator)}${separator}${conjunction} ${lastElement}`;
};
/**
* @description Ensures a URL has a protocol
* @param {string} url
* @returns {string}
* @example
* ensureUrlHasProtocol("example.com") => "http://example.com"
*/
const ensureUrlHasProtocol = (url) => url.startsWith("http") ? url : `http://${url}`;
/**
* @returns {boolean} true if searchQuery is substring of text in the same order, false otherwise
* @description Returns true if searchQuery is substring of text in the same order, false otherwise
* @param {string} text string to compare from
* @param {string} searchQuery
* @example substringMatch("hello world", "hlo") => true
* @example substringMatch("hello world", "hoe") => false
*/
const substringMatch = (text, searchQuery) => {
	try {
		let searchIndex = 0;
		for (let i = 0; i < text.length; i++) {
			if (text[i].toLowerCase() === searchQuery[searchIndex]?.toLowerCase()) searchIndex++;
			if (searchIndex === searchQuery.length) return true;
		}
		return false;
	} catch (_err) {
		return false;
	}
};
/**
* @description Copies text to clipboard
* @param {string} text - Text to copy
* @returns {Promise<void>} Promise that resolves when copying is complete
* @example
* await copyTextToClipboard("Hello, World!") // copies "Hello, World!" to clipboard
*/
const fallbackCopyTextToClipboard = (text) => {
	const textArea = document.createElement("textarea");
	textArea.value = text;
	textArea.style.top = "0";
	textArea.style.left = "0";
	textArea.style.position = "fixed";
	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();
	try {
		document.execCommand("copy");
	} catch (_err) {}
	document.body.removeChild(textArea);
};
/**
* @description Copies text to clipboard
* @param {string} text - Text to copy
* @returns {Promise<void>} Promise that resolves when copying is complete
* @example
* await copyTextToClipboard("Hello, World!") // copies "Hello, World!" to clipboard
*/
const copyTextToClipboard = async (text) => {
	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(text);
		return;
	}
	await navigator.clipboard.writeText(text);
};
/**
* @description Joins URL path segments properly, removing duplicate slashes using URL encoding
* @param {...string} segments - URL path segments to join
* @returns {string} Properly joined URL path
* @example
* joinUrlPath("/workspace", "/projects") => "/workspace/projects"
* joinUrlPath("/workspace", "projects") => "/workspace/projects"
* joinUrlPath("workspace", "projects") => "/workspace/projects"
* joinUrlPath("/workspace/", "/projects/") => "/workspace/projects/"
*/
const joinUrlPath = (...segments) => {
	if (segments.length === 0) return "";
	const validSegments = segments.filter((segment) => segment !== "");
	if (validSegments.length === 0) return "";
	const joined = validSegments.map((segment, index) => {
		let processed = segment;
		while (processed.startsWith("/")) processed = processed.substring(1);
		if (index < validSegments.length - 1) while (processed.endsWith("/")) processed = processed.substring(0, processed.length - 1);
		return processed;
	}).join("/");
	try {
		return new URL(`http://example.com/${joined}`).pathname;
	} catch {
		const pathParts = joined.split("/").filter((part) => part !== "");
		return pathParts.length > 0 ? `/${pathParts.join("/")}` : "";
	}
};

//#endregion
//#region src/notification.ts
const sanitizeCommentForNotification = (mentionContent) => mentionContent ? stripAndTruncateHTML(mentionContent.replace(/<mention-component\b[^>]*\blabel="([^"]*)"[^>]*><\/mention-component>/g, "$1")) : mentionContent;

//#endregion
//#region src/page.ts
/**
* @description filters pages based on the page type
* @param {TPageNavigationTabs} pageType
* @param {TPage[]} pages
* @returns {TPage[]}
*/
const filterPagesByPageType = (pageType, pages) => pages.filter((page) => {
	if (pageType === "public") return page.access === 0 && !page.archived_at;
	if (pageType === "private") return page.access === 1 && !page.archived_at;
	if (pageType === "archived") return page.archived_at;
	return true;
});
/**
* @description orders pages based on their status
* @param {TPage[]} pages
* @param {TPageFiltersSortKey | undefined} sortByKey
* @param {TPageFiltersSortBy} sortByOrder
* @returns {TPage[]}
*/
const orderPages = (pages, sortByKey, sortByOrder) => {
	let orderedPages = [];
	if (pages.length === 0 || !sortByKey) return [];
	if (sortByKey === "name") {
		orderedPages = sortBy(pages, [(m) => m.name?.toLowerCase()]);
		if (sortByOrder === "desc") orderedPages = orderedPages.reverse();
	}
	if (sortByKey === "created_at") {
		orderedPages = sortBy(pages, [(m) => m.created_at]);
		if (sortByOrder === "desc") orderedPages = orderedPages.reverse();
	}
	if (sortByKey === "updated_at") {
		orderedPages = sortBy(pages, [(m) => m.updated_at]);
		if (sortByOrder === "desc") orderedPages = orderedPages.reverse();
	}
	return orderedPages;
};
/**
* @description filters pages based on the filters
* @param {TPage} page
* @param {TPageFilterProps | undefined} filters
* @returns {boolean}
*/
const shouldFilterPage = (page, filters) => {
	let fallsInFilters = true;
	Object.keys(filters ?? {}).forEach((key) => {
		const filterKey = key;
		if (filterKey === "created_by" && filters?.created_by && filters.created_by.length > 0) fallsInFilters = fallsInFilters && filters.created_by.includes(`${page.owned_by}`);
		if (filterKey === "created_at" && filters?.created_at && filters.created_at.length > 0) {
			const createdDate = getDate(page.created_at);
			filters?.created_at.forEach((dateFilter) => {
				fallsInFilters = fallsInFilters && !!createdDate && satisfiesDateFilter(createdDate, dateFilter);
			});
		}
	});
	if (filters?.favorites && !page.is_favorite) fallsInFilters = false;
	return fallsInFilters;
};
/**
* @description returns the name of the project after checking for untitled page
* @param {string | undefined} name
* @returns {string}
*/
const getPageName = (name) => {
	if (name === void 0) return "";
	if (!name || name.trim() === "") return "Untitled";
	return name;
};

//#endregion
//#region src/permission/role.ts
const getUserRole = (role) => {
	switch (role) {
		case EUserPermissions.GUEST: return "GUEST";
		case EUserPermissions.MEMBER: return "MEMBER";
		case EUserPermissions.ADMIN: return "ADMIN";
	}
};
/**
* @description Returns the highest role from an array of supported roles
* @param { TSupportedRole[] } roles
* @returns { TSupportedRole | undefined }
*/
const getHighestRole = (roles) => {
	if (!roles || roles.length === 0) return void 0;
	return roles.reduce((highest, current) => current > highest ? current : highest);
};

//#endregion
//#region src/project-views.ts
/**
* order views base on TViewFiltersSortKey
* @param views
* @param sortByKey
* @param sortByOrder
* @returns
*/
const orderViews = (views, sortByKey, sortByOrder) => {
	if (views.length === 0 || !sortByKey) return [];
	let iterableFunction;
	if (sortByKey === "name") iterableFunction = (view) => view.name?.toLowerCase();
	if (sortByKey === "created_at") iterableFunction = (view) => view.created_at;
	if (sortByKey === "updated_at") iterableFunction = (view) => view.updated_at;
	if (!iterableFunction) return [];
	return orderBy(views, [iterableFunction], [sortByOrder]);
};
/**
* Checks if the passed down view should be filtered or not
* @param view
* @param filters
* @returns
*/
const shouldFilterView = (view, filters) => {
	let fallsInFilters = true;
	Object.keys(filters ?? {}).forEach((key) => {
		const filterKey = key;
		if (filterKey === "owned_by" && filters?.owned_by && filters.owned_by.length > 0) fallsInFilters = fallsInFilters && filters.owned_by.includes(`${view.created_by}`);
		if (filterKey === "created_at" && filters?.created_at && filters.created_at.length > 0) {
			const createdDate = getDate(view.created_at);
			filters?.created_at.forEach((dateFilter) => {
				fallsInFilters = fallsInFilters && !!createdDate && satisfiesDateFilter(createdDate, dateFilter);
			});
		}
		if (filterKey === "view_type" && filters?.view_type && filters?.view_type?.length > 0) fallsInFilters = filters.view_type.includes(view.access);
	});
	if (filters?.favorites && !view.is_favorite) fallsInFilters = false;
	return fallsInFilters;
};
/**
* @description returns the name of the project after checking for untitled view
* @param {string | undefined} name
* @returns {string}
*/
const getViewName = (name) => {
	if (name === void 0) return "";
	if (!name || name.trim() === "") return "Untitled";
	return name;
};
/**
* Adds validation for the view creation filters
* @param data
* @returns
*/
const getValidatedViewFilters = (data) => {
	if (data?.display_filters && data?.display_filters?.layout === "kanban" && isNil(data.display_filters.group_by)) data.display_filters.group_by = "state";
	return data;
};
/**
* returns published view link
* @param anchor
* @returns
*/
const getPublishViewLink = (anchor) => {
	if (!anchor) return;
	return `${(SPACE_BASE_URL.trim() === "" ? window.location.origin : SPACE_BASE_URL) + SPACE_BASE_PATH}/views/${anchor}`;
};

//#endregion
//#region src/project.ts
/**
* Updates the sort order of the project.
* @param sortIndex
* @param destinationIndex
* @param projectId
* @returns number | undefined
*/
const orderJoinedProjects = (sourceIndex, destinationIndex, currentProjectId, joinedProjects) => {
	if (!currentProjectId || sourceIndex < 0 || destinationIndex < 0 || joinedProjects.length <= 0) return void 0;
	let updatedSortOrder = void 0;
	const sortOrderDefaultValue = 1e4;
	if (destinationIndex === 0) updatedSortOrder = (joinedProjects[destinationIndex].sort_order || 0) - sortOrderDefaultValue;
	else if (destinationIndex === joinedProjects.length) updatedSortOrder = (joinedProjects[destinationIndex - 1].sort_order || 0) + sortOrderDefaultValue;
	else updatedSortOrder = ((joinedProjects[destinationIndex - 1].sort_order || 0) + (joinedProjects[destinationIndex].sort_order || 0)) / 2;
	return updatedSortOrder;
};
const projectIdentifierSanitizer = (identifier) => identifier.replace(/[^ÇŞĞIİÖÜA-Za-z0-9]/g, "");
/**
* @description filters projects based on the filter
* @param {TProject} project
* @param {TProjectFilters} filters
* @param {TProjectDisplayFilters} displayFilters
* @returns {boolean}
*/
const shouldFilterProject = (project, displayFilters, filters) => {
	let fallsInFilters = true;
	Object.keys(filters).forEach((key) => {
		const filterKey = key;
		if (filterKey === "access" && filters.access && filters.access.length > 0) fallsInFilters = fallsInFilters && filters.access.includes(`${project.network}`);
		if (filterKey === "lead" && filters.lead && filters.lead.length > 0) fallsInFilters = fallsInFilters && filters.lead.includes(`${project.project_lead}`);
		if (filterKey === "members" && filters.members && filters.members.length > 0) {
			const memberIds = project.members;
			fallsInFilters = fallsInFilters && filters.members.some((memberId) => memberIds?.includes(memberId));
		}
		if (filterKey === "created_at" && filters.created_at && filters.created_at.length > 0) {
			const createdDate = getDate(project.created_at);
			filters.created_at.forEach((dateFilter) => {
				fallsInFilters = fallsInFilters && !!createdDate && satisfiesDateFilter(createdDate, dateFilter);
			});
		}
	});
	if (displayFilters.my_projects && !project.member_role) fallsInFilters = false;
	if (displayFilters.archived_projects && !project.archived_at) fallsInFilters = false;
	if (project.archived_at) fallsInFilters = displayFilters.archived_projects ? fallsInFilters : false;
	return fallsInFilters;
};
/**
* @description orders projects based on the orderByKey
* @param {TProject[]} projects
* @param {TProjectOrderByOptions | undefined} orderByKey
* @returns {TProject[]}
*/
const orderProjects = (projects, orderByKey) => {
	let orderedProjects = [];
	if (projects.length === 0) return orderedProjects;
	if (orderByKey === "sort_order") orderedProjects = sortBy(projects, [(p) => p.sort_order]);
	if (orderByKey === "name") orderedProjects = sortBy(projects, [(p) => p.name.toLowerCase()]);
	if (orderByKey === "-name") orderedProjects = sortBy(projects, [(p) => p.name.toLowerCase()]).reverse();
	if (orderByKey === "created_at") orderedProjects = sortBy(projects, [(p) => p.created_at]);
	if (orderByKey === "-created_at") orderedProjects = sortBy(projects, [(p) => !p.created_at]);
	if (orderByKey === "members_length") orderedProjects = sortBy(projects, [(p) => p.members?.length]);
	if (orderByKey === "-members_length") orderedProjects = sortBy(projects, [(p) => p.members?.length]).reverse();
	return orderedProjects;
};

//#endregion
//#region src/rich-filters/factories/configs/shared.ts
/**
* Helper to create a type-safe filter config
* @param config - The filter config to create
* @returns The created filter config
*/
const createFilterConfig = (config) => config;
/**
* Helper to create an operator entry for the supported operators map.
* This ensures consistency between the operator key and the operator passed to the config function.
* @param operator - The operator to use as both key and parameter
* @param createParams - The base filter configuration parameters
* @param configFn - Function that creates the operator config using base configuration
* @returns A tuple of operator and its config
*/
const createOperatorConfigEntry = (operator, createParams, configFn) => [operator, configFn({
	isOperatorEnabled: createParams.allowedOperators.has(operator),
	...createParams
})];
/**
* Helper to create a type-safe filter field config
* @param config - The filter field config to create
* @returns The created filter field config
*/
const createFilterFieldConfig = (config) => config;

//#endregion
//#region src/rich-filters/factories/configs/core.ts
/**
* Helper to get the single select config
* @param transforms - How to transform items into options
* @param config - Single-select specific configuration
* @param iconConfig - Icon configuration for options
* @returns The single select config
*/
const getSingleSelectConfig = (transforms, config, iconConfig) => createFilterFieldConfig({
	type: FILTER_FIELD_TYPE.SINGLE_SELECT,
	...config,
	getOptions: () => transforms.items.map((item) => ({
		id: transforms.getId(item),
		label: transforms.getLabel(item),
		value: transforms.getValue(item),
		icon: iconConfig?.getOptionIcon?.(transforms.getIconData?.(item))
	}))
});
/**
* Helper to get the multi select config
* @param transforms - How to transform items into options
* @param config - Multi-select specific configuration
* @param iconConfig - Icon configuration for options
* @returns The multi select config
*/
const getMultiSelectConfig = (transforms, config, iconConfig) => createFilterFieldConfig({
	type: FILTER_FIELD_TYPE.MULTI_SELECT,
	...config,
	operatorLabel: config?.operatorLabel,
	getOptions: () => transforms.items.map((item) => ({
		id: transforms.getId(item),
		label: transforms.getLabel(item),
		value: transforms.getValue(item),
		icon: iconConfig?.getOptionIcon?.(transforms.getIconData?.(item))
	}))
});
/**
* Helper to get the date picker config
* @param config - Date-specific configuration
* @returns The date picker config
*/
const getDatePickerConfig = (config) => createFilterFieldConfig({
	type: FILTER_FIELD_TYPE.DATE,
	...config
});
/**
* Helper to get the date range picker config
* @param config - Date range-specific configuration
* @returns The date range picker config
*/
const getDateRangePickerConfig = (config) => createFilterFieldConfig({
	type: FILTER_FIELD_TYPE.DATE_RANGE,
	...config
});

//#endregion
//#region src/rich-filters/factories/configs/properties/shared.ts
/**
* Helper to get the member multi select config
* @param params - The filter params
* @returns The member multi select config
*/
const getMemberMultiSelectConfig = (params, singleValueOperator) => getMultiSelectConfig({
	items: params.members,
	getId: (member) => member.id,
	getLabel: (member) => member.display_name,
	getValue: (member) => member.id,
	getIconData: (member) => member
}, {
	singleValueOperator,
	...params
}, { ...params });
const getSupportedDateOperators = (params) => new Map([createOperatorConfigEntry(EQUALITY_OPERATOR.EXACT, params, (updatedParams) => getDatePickerConfig(updatedParams)), createOperatorConfigEntry(COMPARISON_OPERATOR.RANGE, params, (updatedParams) => getDateRangePickerConfig(updatedParams))]);
/**
* Helper to get the project multi select config
* @param params - The filter params
* @returns The member multi select config
*/
const getProjectMultiSelectConfig = (params, singleValueOperator) => getMultiSelectConfig({
	items: params.projects,
	getId: (project) => project.id,
	getLabel: (project) => project.name,
	getValue: (project) => project.id,
	getIconData: (project) => project
}, {
	singleValueOperator,
	...params
}, { ...params });

//#endregion
//#region src/rich-filters/factories/configs/properties/date.ts
/**
* Get the date property filter config
* @param params - The filter params
* @returns The date property filter config
*/
const getDatePropertyFilterConfig = (key) => (params) => createFilterConfig({
	id: key,
	...params,
	label: params.propertyDisplayName,
	icon: params.filterIcon,
	allowMultipleFilters: true,
	supportedOperatorConfigsMap: getSupportedDateOperators(params)
});

//#endregion
//#region src/rich-filters/factories/configs/properties/member-picker.ts
/**
* Get the member picker property filter config
* @param params - The filter params
* @returns The member picker property filter config
*/
const getMemberPickerPropertyFilterConfig = (key) => (params) => createFilterConfig({
	id: key,
	...params,
	label: params.propertyDisplayName,
	icon: params.filterIcon,
	supportedOperatorConfigsMap: new Map([createOperatorConfigEntry(EQUALITY_OPERATOR.EXACT, params, (updatedParams) => getMemberMultiSelectConfig(updatedParams, EQUALITY_OPERATOR.EXACT))])
});

//#endregion
//#region src/rich-filters/factories/nodes/core.ts
/**
* Creates a condition node with a unique ID.
* @param condition - The condition to create
* @returns The created condition node
*/
const createConditionNode = (condition) => ({
	id: v4(),
	type: FILTER_NODE_TYPE.CONDITION,
	...condition
});
/**
* Creates an AND group node with a unique ID.
* @param nodes - The nodes to add to the group
* @returns The created AND group node
*/
const createAndGroupNode = (nodes) => ({
	id: v4(),
	type: FILTER_NODE_TYPE.GROUP,
	logicalOperator: LOGICAL_OPERATOR.AND,
	children: nodes
});

//#endregion
//#region src/rich-filters/types/core.ts
/**
* Type guard to check if a node is a condition node.
* @param node - The node to check
* @returns True if the node is a condition node
*/
const isConditionNode = (node) => node.type === FILTER_NODE_TYPE.CONDITION;
/**
* Type guard to check if a node is a group node.
* @param node - The node to check
* @returns True if the node is a group node
*/
const isGroupNode = (node) => node.type === FILTER_NODE_TYPE.GROUP;
/**
* Type guard to check if a group node is an AND group.
* @param group - The group node to check
* @returns True if the group is an AND group
*/
const isAndGroupNode = (group) => group.logicalOperator === LOGICAL_OPERATOR.AND;
/**
* Type guard to check if a group node has children property
* @param group - The group node to check
* @returns True if the group has children property
*/
const hasChildrenProperty = (group) => {
	const groupWithChildren = group;
	return "children" in group && Array.isArray(groupWithChildren.children);
};
/**
* Safely gets the children array from an AND group node.
* @param group - The AND group node
* @returns The children array
*/
const getAndGroupChildren = (group) => group.children;
/**
* Type guard to check if a filter type is a date filter type.
* @param type - The filter type to check
* @returns True if the filter type is a date filter type
*/
const isDateFilterType = (type) => type === FILTER_FIELD_TYPE.DATE || type === FILTER_FIELD_TYPE.DATE_RANGE;

//#endregion
//#region src/rich-filters/types/shared.ts
/**
* Generic helper to process group nodes with type-safe handlers.
* @param group - The group node to process
* @param handlers - Object with handlers for each group type
* @returns Result of the appropriate handler
*/
const processGroupNode = (group, handlers) => {
	if (isAndGroupNode(group)) return handlers.onAndGroup(group);
	throw new Error(`Invalid group node: unknown logical operator ${group}`);
};
/**
* Gets the children of a group node, handling AND/OR groups (children array) and NOT groups (single child).
* Uses processGroupNode for consistent group type handling.
* @param group - The group node to get children from
* @returns Array of child expressions
*/
const getGroupChildren = (group) => processGroupNode(group, { onAndGroup: (andGroup) => getAndGroupChildren(andGroup) });

//#endregion
//#region src/rich-filters/validators/core.ts
/**
* Determines whether to notify about a change based on the filter value.
* @param value - The filter value to check
* @returns True if we should notify, false otherwise
*/
const hasValidValue = (value) => {
	if (value === null || value === void 0) return false;
	if (Array.isArray(value)) {
		if (value.length === 0) return false;
		return value.some((v) => v !== null && v !== void 0);
	}
	return true;
};
/**
* Determines whether to notify about a change based on the entire filter expression.
* @param expression - The filter expression to check
* @returns True if we should notify, false otherwise
*/
const shouldNotifyChangeForExpression = (expression) => {
	if (!expression) return false;
	if (isConditionNode(expression)) return hasValidValue(expression.value);
	if (isGroupNode(expression)) return getGroupChildren(expression).some((child) => shouldNotifyChangeForExpression(child));
	return false;
};

//#endregion
//#region src/rich-filters/validators/shared.ts
/**
* Determines if a group should be unwrapped based on the number of children and group type.
* @param group - The group node to check
* @param preserveNotGroups - Whether to preserve NOT groups even with single children
* @returns True if the group should be unwrapped, false otherwise
*/
const shouldUnwrapGroup = (group, _preserveNotGroups = true) => {
	if (getGroupChildren(group).length !== 1) return false;
	return true;
};

//#endregion
//#region src/rich-filters/operations/manipulation/core.ts
/**
* Adds an AND condition to the filter expression.
* @param expression - The current filter expression
* @param condition - The condition to add
* @returns The updated filter expression
*/
const addAndCondition = (expression, condition) => {
	if (!expression) return condition;
	if (isConditionNode(expression)) return createAndGroupNode([expression, condition]);
	if (isGroupNode(expression) && isAndGroupNode(expression)) {
		expression.children.push(condition);
		return expression;
	}
	if (isGroupNode(expression) && !isAndGroupNode(expression)) return createAndGroupNode([expression, condition]);
	console.error("Invalid expression type", expression);
	return expression;
};
/**
* Replaces a node in the expression tree with another node.
* Uses transformExpressionTree for consistent tree processing and better maintainability.
* @param expression - The expression tree to search in
* @param targetId - The ID of the node to replace
* @param replacement - The node to replace with
* @returns The updated expression tree
*/
const replaceNodeInExpression = (expression, targetId, replacement) => {
	return transformExpressionTree(expression, (node) => {
		if (node.id === targetId) return {
			expression: replacement,
			shouldNotify: false
		};
		return {
			expression: node,
			shouldNotify: false
		};
	}).expression || expression;
};
/**
* Updates a node in the filter expression.
* Uses recursive tree traversal with proper type handling.
* @param expression - The filter expression to update
* @param targetId - The id of the node to update
* @param updates - The updates to apply to the node
*/
const updateNodeInExpression = (expression, targetId, updates) => {
	const updateNode = (node) => {
		if (node.id === targetId) {
			if (!isConditionNode(node)) {
				console.warn("updateNodeInExpression: targetId matched a group; ignoring updates");
				return;
			}
			Object.assign(node, updates);
			return;
		}
		if (isGroupNode(node)) getGroupChildren(node).forEach((child) => updateNode(child));
	};
	updateNode(expression);
};
/**
* Unwraps a group if it meets the unwrapping criteria, otherwise returns the group.
* @param group - The group node to potentially unwrap
* @param preserveNotGroups - Whether to preserve NOT groups even with single children
* @returns The unwrapped child or the original group
*/
const unwrapGroupIfNeeded = (group, preserveNotGroups = true) => {
	if (shouldUnwrapGroup(group, preserveNotGroups)) return getGroupChildren(group)[0];
	return group;
};

//#endregion
//#region src/rich-filters/operations/transformation/shared.ts
/**
* Transforms groups by processing children.
* Handles AND/OR groups with children and NOT groups with single child.
* @param group - The group to transform
* @param transformFn - The transformation function
* @returns The transformation result
*/
const transformGroup = (group, transformFn) => processGroupNode(group, { onAndGroup: (andGroup) => transformGroupWithChildren(andGroup, transformFn) });

//#endregion
//#region src/rich-filters/operations/transformation/core.ts
/**
* Generic recursive tree transformer that handles common tree manipulation logic.
* This function provides a reusable way to transform expression trees while maintaining
* tree integrity, handling group restructuring, and applying stabilization.
*
* @param expression - The expression to transform
* @param transformFn - Function that defines the transformation logic for each node
* @returns The transformation result with expression and metadata
*/
/**
* Helper function to create a consistent transformation result for group nodes.
* Centralizes the logic for wrapping group expressions and tracking notifications.
*/
const createGroupTransformResult = (groupExpression, shouldNotify) => ({
	expression: groupExpression ? unwrapGroupIfNeeded(groupExpression, true) : null,
	shouldNotify
});
/**
* Transforms groups with children by processing all children.
* Handles child collection, null filtering, and empty group removal.
*/
const transformGroupWithChildren = (group, transformFn) => {
	const children = getGroupChildren(group);
	const transformedChildren = [];
	let shouldNotify = false;
	for (const child of children) {
		const childResult = transformExpressionTree(child, transformFn);
		if (childResult.shouldNotify) shouldNotify = true;
		if (childResult.expression !== null) transformedChildren.push(childResult.expression);
	}
	if (transformedChildren.length === 0) return {
		expression: null,
		shouldNotify
	};
	return createGroupTransformResult({
		...group,
		children: transformedChildren
	}, shouldNotify);
};
/**
* Generic recursive tree transformer that handles common tree manipulation logic.
* This function provides a reusable way to transform expression trees while maintaining
* tree integrity, handling group restructuring, and applying stabilization.
*
* @param expression - The expression to transform
* @param transformFn - Function that defines the transformation logic for each node
* @returns The transformation result with expression and metadata
*/
const transformExpressionTree = (expression, transformFn) => {
	if (!expression) return {
		expression: null,
		shouldNotify: false
	};
	const transformResult = transformFn(expression);
	if (transformResult.expression === null || transformResult.expression !== expression) return transformResult;
	if (isConditionNode(expression)) return {
		expression,
		shouldNotify: false
	};
	if (isGroupNode(expression)) return transformGroup(expression, transformFn);
	throw new Error("Unknown expression type in transformExpressionTree");
};
/**
* Removes a node from the filter expression.
* @param expression - The filter expression to remove the node from
* @param targetId - The id of the node to remove
* @returns An object containing the updated filter expression and whether to notify about the change
*/
const removeNodeFromExpression = (expression, targetId) => {
	const result = transformExpressionTree(expression, (node) => {
		if (node.id === targetId) return {
			expression: null,
			shouldNotify: isConditionNode(node) ? hasValidValue(node.value) : true
		};
		return {
			expression: node,
			shouldNotify: false
		};
	});
	return {
		expression: result.expression,
		shouldNotify: result.shouldNotify || false
	};
};
/**
* Sanitizes and stabilizes a filter expression by removing invalid conditions and unnecessary groups.
* This function performs deep sanitization of the entire expression tree:
* 1. Removes condition nodes that don't have valid values
* 2. Removes empty groups (groups with no children after sanitization)
* 3. Unwraps single-child groups that don't need to be wrapped
* 4. Preserves tree integrity and logical operators
*
* @param expression - The filter expression to sanitize
* @returns The sanitized expression or null if no valid conditions remain
*/
const sanitizeAndStabilizeExpression = (expression) => {
	return transformExpressionTree(expression, (node) => {
		if (isConditionNode(node)) return {
			expression: hasValidValue(node.value) ? node : null,
			shouldNotify: false
		};
		return {
			expression: node,
			shouldNotify: false
		};
	}).expression;
};

//#endregion
//#region src/rich-filters/operations/comparison.ts
/**
* Creates a comparable representation of a condition for deep comparison.
* This uses property, operator, and value instead of ID for comparison.
* IDs are completely excluded to avoid UUID comparison issues.
* @param condition - The condition to create a comparable representation for
* @returns A comparable object without ID
*/
const createConditionComparable = (condition) => ({
	type: condition.type,
	property: condition.property,
	operator: condition.operator,
	value: Array.isArray(condition.value) ? condition.value : [condition.value]
});
/**
* Helper function to create comparable children for AND/OR groups.
* This eliminates code duplication between AND and OR group processing.
*/
const createComparableChildren = (children, baseComparable) => {
	const sortedChildren = sortBy(compact(children.map((child) => createExpressionComparable(child))), (child) => {
		if (child?.type === FILTER_NODE_TYPE.CONDITION) return `condition_${child.property}_${child.operator}_${JSON.stringify(child.value)}`;
		if (child?.type === FILTER_NODE_TYPE.GROUP) {
			const childrenCount = child.child ? 1 : Array.isArray(child.children) ? child.children.length : 0;
			return `group_${child.logicalOperator}_${childrenCount}_${JSON.stringify(child)}`;
		}
		return "unknown";
	});
	return {
		...baseComparable,
		children: sortedChildren
	};
};
/**
* Creates a comparable representation of a group for deep comparison.
* This recursively creates comparable representations for all children.
* IDs are completely excluded to avoid UUID comparison issues.
* Uses processGroupNode for consistent group type handling.
* @param group - The group to create a comparable representation for
* @returns A comparable object without ID
*/
const createGroupComparable = (group) => {
	const baseComparable = {
		type: group.type,
		logicalOperator: group.logicalOperator
	};
	return processGroupNode(group, { onAndGroup: (andGroup) => createComparableChildren(andGroup.children, baseComparable) });
};
/**
* Creates a comparable representation of any filter expression.
* Recursively handles deep nesting of groups within groups.
* Completely excludes IDs from comparison to avoid UUID issues.
* @param expression - The expression to create a comparable representation for
* @returns A comparable object without IDs or null if the expression is empty
*/
const createExpressionComparable = (expression) => {
	if (!expression) return null;
	if (isConditionNode(expression)) return createConditionComparable(expression);
	if (isGroupNode(expression)) return createGroupComparable(expression);
	return null;
};
/**
* Normalizes a filter expression by removing empty conditions and groups.
* This helps compare expressions by focusing only on meaningful content.
* Uses the transformExpressionTree utility for consistent tree processing.
* @param expression - The filter expression to normalize
* @returns The normalized expression or null if the entire expression is empty
*/
const normalizeFilterExpression = (expression) => {
	return transformExpressionTree(expression, (node) => {
		if (isConditionNode(node)) return {
			expression: hasValidValue(node.value) ? node : null,
			shouldNotify: false
		};
		return {
			expression: node,
			shouldNotify: false
		};
	}).expression;
};
/**
* Performs a deep comparison of two filter expressions based on their meaningful content.
* This comparison completely ignores IDs (UUIDs) and focuses on property, operator, value, and tree structure.
* Empty conditions and groups are normalized before comparison.
* Supports deep nesting of groups within groups recursively.
* @param expression1 - The first expression to compare
* @param expression2 - The second expression to compare
* @returns True if the expressions are meaningfully equal, false otherwise
*/
const deepCompareFilterExpressions = (expression1, expression2) => {
	const normalized1 = normalizeFilterExpression(expression1);
	const normalized2 = normalizeFilterExpression(expression2);
	if (!normalized1 && !normalized2) return true;
	if (!normalized1 || !normalized2) return false;
	return isEqual(createExpressionComparable(normalized1), createExpressionComparable(normalized2));
};

//#endregion
//#region src/rich-filters/operations/traversal/shared.ts
/**
* Helper function to get the display operator for a condition.
* This checks for NOT group context and applies negation if needed.
* @param operator - The original operator
* @param expression - The filter expression
* @param conditionId - The ID of the condition
* @returns The display operator (possibly negated)
*/
const getDisplayOperator = (operator, _expression, _conditionId) => operator;

//#endregion
//#region src/rich-filters/operations/traversal/core.ts
/**
* Tree traversal modes
*/
let TreeTraversalMode = /* @__PURE__ */ function(TreeTraversalMode$1) {
	/** Visit all nodes depth-first */
	TreeTraversalMode$1["ALL"] = "ALL";
	/** Visit only condition nodes */
	TreeTraversalMode$1["CONDITIONS"] = "CONDITIONS";
	/** Visit only group nodes */
	TreeTraversalMode$1["GROUPS"] = "GROUPS";
	return TreeTraversalMode$1;
}({});
/**
* Generic tree traversal utility that visits nodes based on the specified mode.
* This eliminates code duplication in tree walking functions.
*
* @param expression - The expression to traverse
* @param visitor - Function to call for each visited node
* @param mode - Traversal mode to determine which nodes to visit
* @param parent - Parent node (used internally for recursion)
* @param depth - Current depth (used internally for recursion)
* @returns Array of results from the visitor function (nulls are filtered out)
*/
const traverseExpressionTree = (expression, visitor, mode = TreeTraversalMode.ALL, parent, depth = 0) => {
	if (!expression) return [];
	const results = [];
	if (mode === TreeTraversalMode.ALL || mode === TreeTraversalMode.CONDITIONS && isConditionNode(expression) || mode === TreeTraversalMode.GROUPS && isGroupNode(expression)) {
		const result = visitor(expression, parent, depth);
		if (result !== null) results.push(result);
	}
	if (isGroupNode(expression)) {
		const children = getGroupChildren(expression);
		for (const child of children) {
			const childResults = traverseExpressionTree(child, visitor, mode, expression, depth + 1);
			results.push(...childResults);
		}
	}
	return results;
};
/**
* Finds a node by its ID in the filter expression tree.
* Uses the generic tree traversal utility for better maintainability.
* @param expression - The filter expression to search in
* @param targetId - The ID of the node to find
* @returns The found node or null if not found
*/
const findNodeById = (expression, targetId) => {
	const results = traverseExpressionTree(expression, (node) => node.id === targetId ? node : null, TreeTraversalMode.ALL);
	return results.length > 0 ? results[0] : null;
};
/**
* Finds the parent chain of a given node ID in the filter expression tree.
* @param expression - The filter expression to search in
* @param targetId - The ID of the node whose parent chain to find
* @param currentPath - Current path of parent nodes (used internally for recursion)
* @returns Array of parent nodes from immediate parent to root, or null if not found
*/
const findParentChain = (expression, targetId, currentPath = []) => {
	if (isGroupNode(expression)) {
		const children = getGroupChildren(expression);
		for (const child of children) if (child.id === targetId) return [expression, ...currentPath];
		for (const child of children) if (isGroupNode(child)) {
			const chain = findParentChain(child, targetId, [expression, ...currentPath]);
			if (chain) return chain;
		}
	}
	return null;
};
/**
* Finds the immediate parent node of a given node ID.
* @param expression - The filter expression to find parent in
* @param targetId - The ID of the node whose parent to find
* @returns The immediate parent node or null if not found or if the target is the root
*/
const findImmediateParent = (expression, targetId) => {
	if (!expression) return null;
	const parentChain = findParentChain(expression, targetId);
	return parentChain && parentChain.length > 0 ? parentChain[0] : null;
};
/**
* Extracts all conditions from a filter expression.
* Uses the generic tree traversal utility for better maintainability and consistency.
* @param expression - The filter expression to extract conditions from
* @returns An array of filter conditions
*/
const extractConditions = (expression) => traverseExpressionTree(expression, (node) => isConditionNode(node) ? node : null, TreeTraversalMode.CONDITIONS);
/**
* Extracts all conditions from a filter expression, including their display operators.
* @param expression - The filter expression to extract conditions from
* @returns An array of filter conditions with their display operators
*/
const extractConditionsWithDisplayOperators = (expression) => {
	return extractConditions(expression).map((condition) => {
		const displayOperator = getDisplayOperator(condition.operator, expression, condition.id);
		return {
			...condition,
			operator: displayOperator
		};
	});
};
/**
* Finds all conditions by property and operator.
* @param expression - The filter expression to search in
* @param property - The property to find the conditions by
* @param operator - The operator to find the conditions by
* @returns An array of conditions that match the property and operator
*/
const findConditionsByPropertyAndOperator = (expression, property, operator) => {
	return extractConditionsWithDisplayOperators(expression).filter((condition) => condition.property === property && condition.operator === operator);
};

//#endregion
//#region src/rich-filters/operators/core.ts
/**
* Get the label for a filter operator
* @param operator - The operator to get the label for
* @returns The label for the operator
*/
const getOperatorLabel = (operator) => {
	if (!operator) return EMPTY_OPERATOR_LABEL;
	return get(OPERATOR_LABELS_MAP, operator, EMPTY_OPERATOR_LABEL);
};
/**
* Get the label for a date filter operator
* @param operator - The operator to get the label for
* @returns The label for the operator
*/
const getDateOperatorLabel = (operator) => {
	if (!operator) return EMPTY_OPERATOR_LABEL;
	return get(DATE_OPERATOR_LABELS_MAP, operator, EMPTY_OPERATOR_LABEL);
};
/**
* Type guard to check if an operator supports date filter types.
* @param operator - The operator to check
* @returns True if the operator supports date filters
*/
const isDateFilterOperator = (operator) => Object.keys(DATE_OPERATOR_LABELS_MAP).includes(operator);

//#endregion
//#region src/rich-filters/operators/shared.ts
/**
* Converts a display operator to the format needed for supported by filter expression condition.
* @param displayOperator - The operator from the UI
* @returns Object with supported operator and negation flag
*/
const getOperatorForPayload = (displayOperator) => {
	return {
		operator: displayOperator,
		isNegation: false
	};
};

//#endregion
//#region src/rich-filters/values/core.ts
/**
* Converts any value to a non-null array for UI components that expect arrays
* Returns empty array for null/undefined values
*/
const toFilterArray = (value) => {
	if (value === null || value === void 0) return [];
	return Array.isArray(value) ? value : [value];
};
/**
* Gets the length of a filter value
*/
const getFilterValueLength = (value) => {
	if (value === null || value === void 0) return 0;
	return Array.isArray(value) ? value.length : 1;
};

//#endregion
//#region src/router.ts
const generateQueryParams = (searchParams, excludedParamKeys) => {
	const params = new URLSearchParams(searchParams);
	excludedParamKeys && excludedParamKeys.forEach((key) => {
		params.delete(key);
	});
	return params.toString();
};

//#endregion
//#region src/subscription.ts
/**
* Calculates the yearly discount percentage when switching from monthly to yearly billing
* @param monthlyPrice - The monthly subscription price
* @param yearlyPricePerMonth - The monthly equivalent price when billed yearly
* @returns The discount percentage as a whole number (floored)
*/
const calculateYearlyDiscount = (monthlyPrice, yearlyPricePerMonth) => {
	const monthlyCost = monthlyPrice * 12;
	const discountPercentage = (monthlyCost - yearlyPricePerMonth * 12) / monthlyCost * 100;
	return Math.floor(discountPercentage);
};
/**
* Gets the display name for a subscription plan variant
* @param planVariant - The subscription plan variant enum
* @returns The human-readable name of the plan
*/
const getSubscriptionName = (planVariant) => {
	switch (planVariant) {
		case EProductSubscriptionEnum.FREE: return "Free";
		case EProductSubscriptionEnum.ONE: return "One";
		case EProductSubscriptionEnum.PRO: return "Pro";
		case EProductSubscriptionEnum.BUSINESS: return "Business";
		case EProductSubscriptionEnum.ENTERPRISE: return "Enterprise";
		default: return "--";
	}
};
/**
* Gets the base subscription name for upgrade/downgrade paths
* @param planVariant - The current subscription plan variant
* @returns The name of the base subscription plan
*/
const getBaseSubscriptionName = (planVariant) => {
	switch (planVariant) {
		case EProductSubscriptionEnum.ONE: return getSubscriptionName(EProductSubscriptionEnum.FREE);
		case EProductSubscriptionEnum.PRO: return getSubscriptionName(EProductSubscriptionEnum.FREE);
		case EProductSubscriptionEnum.BUSINESS: return getSubscriptionName(EProductSubscriptionEnum.PRO);
		case EProductSubscriptionEnum.ENTERPRISE: return getSubscriptionName(EProductSubscriptionEnum.BUSINESS);
		default: return "--";
	}
};
/**
* Gets the price details for a subscription product
* @param product - The payment product to get price details for
* @returns Array of price details for monthly and yearly plans
*/
const getSubscriptionPriceDetails = (product) => {
	const productPrices = product?.prices || [];
	const monthlyPriceDetails = orderBy(productPrices, ["recurring"], ["desc"])?.find((price) => price.recurring === "month");
	const monthlyPriceAmount = Number(((monthlyPriceDetails?.unit_amount || 0) / 100).toFixed(2));
	const yearlyPriceDetails = orderBy(productPrices, ["recurring"], ["desc"])?.find((price) => price.recurring === "year");
	const yearlyPriceAmount = Number(((yearlyPriceDetails?.unit_amount || 0) / 1200).toFixed(2));
	return {
		monthlyPriceDetails: {
			key: "monthly",
			id: monthlyPriceDetails?.id,
			currency: "$",
			price: monthlyPriceAmount,
			recurring: "month"
		},
		yearlyPriceDetails: {
			key: "yearly",
			id: yearlyPriceDetails?.id,
			currency: "$",
			price: yearlyPriceAmount,
			recurring: "year"
		}
	};
};

//#endregion
//#region src/tab-indices.ts
const getTabIndex = (type, isMobile = false) => {
	const getIndex = (key) => isMobile ? void 0 : type && TAB_INDEX_MAP[type].findIndex((tabIndex) => tabIndex === key) + 1;
	return {
		getIndex,
		baseTabIndex: isMobile ? -1 : 1
	};
};

//#endregion
//#region src/theme.ts
const calculateShades = (hexValue) => {
	const shades = {};
	const { r, g, b } = hexToRgb(hexValue);
	const convertHexToSpecificShade = (shade) => {
		if (shade <= 100) {
			const decimalValue = (100 - shade) / 100;
			return {
				r: Math.floor(r + (255 - r) * decimalValue),
				g: Math.floor(g + (255 - g) * decimalValue),
				b: Math.floor(b + (255 - b) * decimalValue)
			};
		} else {
			const decimalValue = 1 - Math.ceil((shade - 100) / 100) / 10;
			return {
				r: Math.ceil(r * decimalValue),
				g: Math.ceil(g * decimalValue),
				b: Math.ceil(b * decimalValue)
			};
		}
	};
	for (let i = 10; i <= 900; i >= 100 ? i += 100 : i += 10) shades[i] = convertHexToSpecificShade(i);
	return shades;
};
const applyTheme = (palette, isDarkPalette) => {
	if (!palette) return;
	const themeElement = document?.querySelector("html");
	const values = palette.split(",");
	values.push(isDarkPalette ? "dark" : "light");
	const bgShades = calculateShades(values[0]);
	const textShades = calculateShades(values[1]);
	const primaryShades = calculateShades(values[2]);
	const sidebarBackgroundShades = calculateShades(values[3]);
	const sidebarTextShades = calculateShades(values[4]);
	for (let i = 10; i <= 900; i >= 100 ? i += 100 : i += 10) {
		const shade = i;
		const bgRgbValues = `${bgShades[shade].r}, ${bgShades[shade].g}, ${bgShades[shade].b}`;
		const textRgbValues = `${textShades[shade].r}, ${textShades[shade].g}, ${textShades[shade].b}`;
		const primaryRgbValues = `${primaryShades[shade].r}, ${primaryShades[shade].g}, ${primaryShades[shade].b}`;
		const sidebarBackgroundRgbValues = `${sidebarBackgroundShades[shade].r}, ${sidebarBackgroundShades[shade].g}, ${sidebarBackgroundShades[shade].b}`;
		const sidebarTextRgbValues = `${sidebarTextShades[shade].r}, ${sidebarTextShades[shade].g}, ${sidebarTextShades[shade].b}`;
		themeElement?.style.setProperty(`--color-background-${shade}`, bgRgbValues);
		themeElement?.style.setProperty(`--color-text-${shade}`, textRgbValues);
		themeElement?.style.setProperty(`--color-primary-${shade}`, primaryRgbValues);
		themeElement?.style.setProperty(`--color-sidebar-background-${shade}`, sidebarBackgroundRgbValues);
		themeElement?.style.setProperty(`--color-sidebar-text-${shade}`, sidebarTextRgbValues);
		if (i >= 100 && i <= 400) {
			const borderShade = i === 100 ? 70 : i === 200 ? 80 : i === 300 ? 90 : 100;
			themeElement?.style.setProperty(`--color-border-${shade}`, `${bgShades[borderShade].r}, ${bgShades[borderShade].g}, ${bgShades[borderShade].b}`);
			themeElement?.style.setProperty(`--color-sidebar-border-${shade}`, `${sidebarBackgroundShades[borderShade].r}, ${sidebarBackgroundShades[borderShade].g}, ${sidebarBackgroundShades[borderShade].b}`);
		}
	}
	themeElement?.style.setProperty("--color-scheme", values[5]);
};
const unsetCustomCssVariables = () => {
	for (let i = 10; i <= 900; i >= 100 ? i += 100 : i += 10) {
		const dom = document.querySelector("[data-theme='custom']");
		dom?.style.removeProperty(`--color-background-${i}`);
		dom?.style.removeProperty(`--color-text-${i}`);
		dom?.style.removeProperty(`--color-border-${i}`);
		dom?.style.removeProperty(`--color-primary-${i}`);
		dom?.style.removeProperty(`--color-sidebar-background-${i}`);
		dom?.style.removeProperty(`--color-sidebar-text-${i}`);
		dom?.style.removeProperty(`--color-sidebar-border-${i}`);
		dom?.style.removeProperty("--color-scheme");
	}
};
const resolveGeneralTheme = (resolvedTheme) => resolvedTheme?.includes("light") ? "light" : resolvedTheme?.includes("dark") ? "dark" : "system";

//#endregion
//#region src/tlds.ts
var tlds_default = [
	"aaa",
	"aarp",
	"abb",
	"abbott",
	"abbvie",
	"abc",
	"able",
	"abogado",
	"abudhabi",
	"ac",
	"academy",
	"accenture",
	"accountant",
	"accountants",
	"aco",
	"actor",
	"ad",
	"ads",
	"adult",
	"ae",
	"aeg",
	"aero",
	"aetna",
	"af",
	"afl",
	"africa",
	"ag",
	"agakhan",
	"agency",
	"ai",
	"aig",
	"airbus",
	"airforce",
	"airtel",
	"akdn",
	"al",
	"alibaba",
	"alipay",
	"allfinanz",
	"allstate",
	"ally",
	"alsace",
	"alstom",
	"am",
	"amazon",
	"americanexpress",
	"americanfamily",
	"amex",
	"amfam",
	"amica",
	"amsterdam",
	"analytics",
	"android",
	"anquan",
	"anz",
	"ao",
	"aol",
	"apartments",
	"app",
	"apple",
	"aq",
	"aquarelle",
	"ar",
	"arab",
	"aramco",
	"archi",
	"army",
	"arpa",
	"art",
	"arte",
	"as",
	"asda",
	"asia",
	"associates",
	"at",
	"athleta",
	"attorney",
	"au",
	"auction",
	"audi",
	"audible",
	"audio",
	"auspost",
	"author",
	"auto",
	"autos",
	"aw",
	"aws",
	"ax",
	"axa",
	"az",
	"azure",
	"ba",
	"baby",
	"baidu",
	"banamex",
	"band",
	"bank",
	"bar",
	"barcelona",
	"barclaycard",
	"barclays",
	"barefoot",
	"bargains",
	"baseball",
	"basketball",
	"bauhaus",
	"bayern",
	"bb",
	"bbc",
	"bbt",
	"bbva",
	"bcg",
	"bcn",
	"bd",
	"be",
	"beats",
	"beauty",
	"beer",
	"berlin",
	"best",
	"bestbuy",
	"bet",
	"bf",
	"bg",
	"bh",
	"bharti",
	"bi",
	"bible",
	"bid",
	"bike",
	"bing",
	"bingo",
	"bio",
	"biz",
	"bj",
	"black",
	"blackfriday",
	"blockbuster",
	"blog",
	"bloomberg",
	"blue",
	"bm",
	"bms",
	"bmw",
	"bn",
	"bnpparibas",
	"bo",
	"boats",
	"boehringer",
	"bofa",
	"bom",
	"bond",
	"boo",
	"book",
	"booking",
	"bosch",
	"bostik",
	"boston",
	"bot",
	"boutique",
	"box",
	"br",
	"bradesco",
	"bridgestone",
	"broadway",
	"broker",
	"brother",
	"brussels",
	"bs",
	"bt",
	"build",
	"builders",
	"business",
	"buy",
	"buzz",
	"bv",
	"bw",
	"by",
	"bz",
	"bzh",
	"ca",
	"cab",
	"cafe",
	"cal",
	"call",
	"calvinklein",
	"cam",
	"camera",
	"camp",
	"canon",
	"capetown",
	"capital",
	"capitalone",
	"car",
	"caravan",
	"cards",
	"care",
	"career",
	"careers",
	"cars",
	"casa",
	"case",
	"cash",
	"casino",
	"cat",
	"catering",
	"catholic",
	"cba",
	"cbn",
	"cbre",
	"cc",
	"cd",
	"center",
	"ceo",
	"cern",
	"cf",
	"cfa",
	"cfd",
	"cg",
	"ch",
	"chanel",
	"channel",
	"charity",
	"chase",
	"chat",
	"cheap",
	"chintai",
	"christmas",
	"chrome",
	"church",
	"ci",
	"cipriani",
	"circle",
	"cisco",
	"citadel",
	"citi",
	"citic",
	"city",
	"ck",
	"cl",
	"claims",
	"cleaning",
	"click",
	"clinic",
	"clinique",
	"clothing",
	"cloud",
	"club",
	"clubmed",
	"cm",
	"cn",
	"co",
	"coach",
	"codes",
	"coffee",
	"college",
	"cologne",
	"com",
	"commbank",
	"community",
	"company",
	"compare",
	"computer",
	"comsec",
	"condos",
	"construction",
	"consulting",
	"contact",
	"contractors",
	"cooking",
	"cool",
	"coop",
	"corsica",
	"country",
	"coupon",
	"coupons",
	"courses",
	"cpa",
	"cr",
	"credit",
	"creditcard",
	"creditunion",
	"cricket",
	"crown",
	"crs",
	"cruise",
	"cruises",
	"cu",
	"cuisinella",
	"cv",
	"cw",
	"cx",
	"cy",
	"cymru",
	"cyou",
	"cz",
	"dad",
	"dance",
	"data",
	"date",
	"dating",
	"datsun",
	"day",
	"dclk",
	"dds",
	"de",
	"deal",
	"dealer",
	"deals",
	"degree",
	"delivery",
	"dell",
	"deloitte",
	"delta",
	"democrat",
	"dental",
	"dentist",
	"desi",
	"design",
	"dev",
	"dhl",
	"diamonds",
	"diet",
	"digital",
	"direct",
	"directory",
	"discount",
	"discover",
	"dish",
	"diy",
	"dj",
	"dk",
	"dm",
	"dnp",
	"do",
	"docs",
	"doctor",
	"dog",
	"domains",
	"dot",
	"download",
	"drive",
	"dtv",
	"dubai",
	"dunlop",
	"dupont",
	"durban",
	"dvag",
	"dvr",
	"dz",
	"earth",
	"eat",
	"ec",
	"eco",
	"edeka",
	"edu",
	"education",
	"ee",
	"eg",
	"email",
	"emerck",
	"energy",
	"engineer",
	"engineering",
	"enterprises",
	"epson",
	"equipment",
	"er",
	"ericsson",
	"erni",
	"es",
	"esq",
	"estate",
	"et",
	"eu",
	"eurovision",
	"eus",
	"events",
	"exchange",
	"expert",
	"exposed",
	"express",
	"extraspace",
	"fage",
	"fail",
	"fairwinds",
	"faith",
	"family",
	"fan",
	"fans",
	"farm",
	"farmers",
	"fashion",
	"fast",
	"fedex",
	"feedback",
	"ferrari",
	"ferrero",
	"fi",
	"fidelity",
	"fido",
	"film",
	"final",
	"finance",
	"financial",
	"fire",
	"firestone",
	"firmdale",
	"fish",
	"fishing",
	"fit",
	"fitness",
	"fj",
	"fk",
	"flickr",
	"flights",
	"flir",
	"florist",
	"flowers",
	"fly",
	"fm",
	"fo",
	"foo",
	"food",
	"football",
	"ford",
	"forex",
	"forsale",
	"forum",
	"foundation",
	"fox",
	"fr",
	"free",
	"fresenius",
	"frl",
	"frogans",
	"frontier",
	"ftr",
	"fujitsu",
	"fun",
	"fund",
	"furniture",
	"futbol",
	"fyi",
	"ga",
	"gal",
	"gallery",
	"gallo",
	"gallup",
	"game",
	"games",
	"gap",
	"garden",
	"gay",
	"gb",
	"gbiz",
	"gd",
	"gdn",
	"ge",
	"gea",
	"gent",
	"genting",
	"george",
	"gf",
	"gg",
	"ggee",
	"gh",
	"gi",
	"gift",
	"gifts",
	"gives",
	"giving",
	"gl",
	"glass",
	"gle",
	"global",
	"globo",
	"gm",
	"gmail",
	"gmbh",
	"gmo",
	"gmx",
	"gn",
	"godaddy",
	"gold",
	"goldpoint",
	"golf",
	"goo",
	"goodyear",
	"goog",
	"google",
	"gop",
	"got",
	"gov",
	"gp",
	"gq",
	"gr",
	"grainger",
	"graphics",
	"gratis",
	"green",
	"gripe",
	"grocery",
	"group",
	"gs",
	"gt",
	"gu",
	"gucci",
	"guge",
	"guide",
	"guitars",
	"guru",
	"gw",
	"gy",
	"hair",
	"hamburg",
	"hangout",
	"haus",
	"hbo",
	"hdfc",
	"hdfcbank",
	"health",
	"healthcare",
	"help",
	"helsinki",
	"here",
	"hermes",
	"hiphop",
	"hisamitsu",
	"hitachi",
	"hiv",
	"hk",
	"hkt",
	"hm",
	"hn",
	"hockey",
	"holdings",
	"holiday",
	"homedepot",
	"homegoods",
	"homes",
	"homesense",
	"honda",
	"horse",
	"hospital",
	"host",
	"hosting",
	"hot",
	"hotels",
	"hotmail",
	"house",
	"how",
	"hr",
	"hsbc",
	"ht",
	"hu",
	"hughes",
	"hyatt",
	"hyundai",
	"ibm",
	"icbc",
	"ice",
	"icu",
	"id",
	"ie",
	"ieee",
	"ifm",
	"ikano",
	"il",
	"im",
	"imamat",
	"imdb",
	"immo",
	"immobilien",
	"in",
	"inc",
	"industries",
	"infiniti",
	"info",
	"ing",
	"ink",
	"institute",
	"insurance",
	"insure",
	"int",
	"international",
	"intuit",
	"investments",
	"io",
	"ipiranga",
	"iq",
	"ir",
	"irish",
	"is",
	"ismaili",
	"ist",
	"istanbul",
	"it",
	"itau",
	"itv",
	"jaguar",
	"java",
	"jcb",
	"je",
	"jeep",
	"jetzt",
	"jewelry",
	"jio",
	"jll",
	"jm",
	"jmp",
	"jnj",
	"jo",
	"jobs",
	"joburg",
	"jot",
	"joy",
	"jp",
	"jpmorgan",
	"jprs",
	"juegos",
	"juniper",
	"kaufen",
	"kddi",
	"ke",
	"kerryhotels",
	"kerryproperties",
	"kfh",
	"kg",
	"kh",
	"ki",
	"kia",
	"kids",
	"kim",
	"kindle",
	"kitchen",
	"kiwi",
	"km",
	"kn",
	"koeln",
	"komatsu",
	"kosher",
	"kp",
	"kpmg",
	"kpn",
	"kr",
	"krd",
	"kred",
	"kuokgroup",
	"kw",
	"ky",
	"kyoto",
	"kz",
	"la",
	"lacaixa",
	"lamborghini",
	"lamer",
	"land",
	"landrover",
	"lanxess",
	"lasalle",
	"lat",
	"latino",
	"latrobe",
	"law",
	"lawyer",
	"lb",
	"lc",
	"lds",
	"lease",
	"leclerc",
	"lefrak",
	"legal",
	"lego",
	"lexus",
	"lgbt",
	"li",
	"lidl",
	"life",
	"lifeinsurance",
	"lifestyle",
	"lighting",
	"like",
	"lilly",
	"limited",
	"limo",
	"lincoln",
	"link",
	"live",
	"living",
	"lk",
	"llc",
	"llp",
	"loan",
	"loans",
	"locker",
	"locus",
	"lol",
	"london",
	"lotte",
	"lotto",
	"love",
	"lpl",
	"lplfinancial",
	"lr",
	"ls",
	"lt",
	"ltd",
	"ltda",
	"lu",
	"lundbeck",
	"luxe",
	"luxury",
	"lv",
	"ly",
	"ma",
	"madrid",
	"maif",
	"maison",
	"makeup",
	"man",
	"management",
	"mango",
	"map",
	"market",
	"marketing",
	"markets",
	"marriott",
	"marshalls",
	"mattel",
	"mba",
	"mc",
	"mckinsey",
	"md",
	"me",
	"med",
	"media",
	"meet",
	"melbourne",
	"meme",
	"memorial",
	"men",
	"menu",
	"merckmsd",
	"mg",
	"mh",
	"miami",
	"microsoft",
	"mil",
	"mini",
	"mint",
	"mit",
	"mitsubishi",
	"mk",
	"ml",
	"mlb",
	"mls",
	"mm",
	"mma",
	"mn",
	"mo",
	"mobi",
	"mobile",
	"moda",
	"moe",
	"moi",
	"mom",
	"monash",
	"money",
	"monster",
	"mormon",
	"mortgage",
	"moscow",
	"moto",
	"motorcycles",
	"mov",
	"movie",
	"mp",
	"mq",
	"mr",
	"ms",
	"msd",
	"mt",
	"mtn",
	"mtr",
	"mu",
	"museum",
	"music",
	"mv",
	"mw",
	"mx",
	"my",
	"mz",
	"na",
	"nab",
	"nagoya",
	"name",
	"navy",
	"nba",
	"nc",
	"ne",
	"nec",
	"net",
	"netbank",
	"netflix",
	"network",
	"neustar",
	"new",
	"news",
	"next",
	"nextdirect",
	"nexus",
	"nf",
	"nfl",
	"ng",
	"ngo",
	"nhk",
	"ni",
	"nico",
	"nike",
	"nikon",
	"ninja",
	"nissan",
	"nissay",
	"nl",
	"no",
	"nokia",
	"norton",
	"now",
	"nowruz",
	"nowtv",
	"np",
	"nr",
	"nra",
	"nrw",
	"ntt",
	"nu",
	"nyc",
	"nz",
	"obi",
	"observer",
	"office",
	"okinawa",
	"olayan",
	"olayangroup",
	"ollo",
	"om",
	"omega",
	"one",
	"ong",
	"onl",
	"online",
	"ooo",
	"open",
	"oracle",
	"orange",
	"org",
	"organic",
	"origins",
	"osaka",
	"otsuka",
	"ott",
	"ovh",
	"pa",
	"page",
	"panasonic",
	"paris",
	"pars",
	"partners",
	"parts",
	"party",
	"pay",
	"pccw",
	"pe",
	"pet",
	"pf",
	"pfizer",
	"pg",
	"ph",
	"pharmacy",
	"phd",
	"philips",
	"phone",
	"photo",
	"photography",
	"photos",
	"physio",
	"pics",
	"pictet",
	"pictures",
	"pid",
	"pin",
	"ping",
	"pink",
	"pioneer",
	"pizza",
	"pk",
	"pl",
	"place",
	"play",
	"playstation",
	"plumbing",
	"plus",
	"pm",
	"pn",
	"pnc",
	"pohl",
	"poker",
	"politie",
	"porn",
	"post",
	"pr",
	"praxi",
	"press",
	"prime",
	"pro",
	"prod",
	"productions",
	"prof",
	"progressive",
	"promo",
	"properties",
	"property",
	"protection",
	"pru",
	"prudential",
	"ps",
	"pt",
	"pub",
	"pw",
	"pwc",
	"py",
	"qa",
	"qpon",
	"quebec",
	"quest",
	"racing",
	"radio",
	"re",
	"read",
	"realestate",
	"realtor",
	"realty",
	"recipes",
	"red",
	"redumbrella",
	"rehab",
	"reise",
	"reisen",
	"reit",
	"reliance",
	"ren",
	"rent",
	"rentals",
	"repair",
	"report",
	"republican",
	"rest",
	"restaurant",
	"review",
	"reviews",
	"rexroth",
	"rich",
	"richardli",
	"ricoh",
	"ril",
	"rio",
	"rip",
	"ro",
	"rocks",
	"rodeo",
	"rogers",
	"room",
	"rs",
	"rsvp",
	"ru",
	"rugby",
	"ruhr",
	"run",
	"rw",
	"rwe",
	"ryukyu",
	"sa",
	"saarland",
	"safe",
	"safety",
	"sakura",
	"sale",
	"salon",
	"samsclub",
	"samsung",
	"sandvik",
	"sandvikcoromant",
	"sanofi",
	"sap",
	"sarl",
	"sas",
	"save",
	"saxo",
	"sb",
	"sbi",
	"sbs",
	"sc",
	"scb",
	"schaeffler",
	"schmidt",
	"scholarships",
	"school",
	"schule",
	"schwarz",
	"science",
	"scot",
	"sd",
	"se",
	"search",
	"seat",
	"secure",
	"security",
	"seek",
	"select",
	"sener",
	"services",
	"seven",
	"sew",
	"sex",
	"sexy",
	"sfr",
	"sg",
	"sh",
	"shangrila",
	"sharp",
	"shell",
	"shia",
	"shiksha",
	"shoes",
	"shop",
	"shopping",
	"shouji",
	"show",
	"si",
	"silk",
	"sina",
	"singles",
	"site",
	"sj",
	"sk",
	"ski",
	"skin",
	"sky",
	"skype",
	"sl",
	"sling",
	"sm",
	"smart",
	"smile",
	"sn",
	"sncf",
	"so",
	"soccer",
	"social",
	"softbank",
	"software",
	"sohu",
	"solar",
	"solutions",
	"song",
	"sony",
	"soy",
	"spa",
	"space",
	"sport",
	"spot",
	"sr",
	"srl",
	"ss",
	"st",
	"stada",
	"staples",
	"star",
	"statebank",
	"statefarm",
	"stc",
	"stcgroup",
	"stockholm",
	"storage",
	"store",
	"stream",
	"studio",
	"study",
	"style",
	"su",
	"sucks",
	"supplies",
	"supply",
	"support",
	"surf",
	"surgery",
	"suzuki",
	"sv",
	"swatch",
	"swiss",
	"sx",
	"sy",
	"sydney",
	"systems",
	"sz",
	"tab",
	"taipei",
	"talk",
	"taobao",
	"target",
	"tatamotors",
	"tatar",
	"tattoo",
	"tax",
	"taxi",
	"tc",
	"tci",
	"td",
	"tdk",
	"team",
	"tech",
	"technology",
	"tel",
	"temasek",
	"tennis",
	"teva",
	"tf",
	"tg",
	"th",
	"thd",
	"theater",
	"theatre",
	"tiaa",
	"tickets",
	"tienda",
	"tips",
	"tires",
	"tirol",
	"tj",
	"tjmaxx",
	"tjx",
	"tk",
	"tkmaxx",
	"tl",
	"tm",
	"tmall",
	"tn",
	"to",
	"today",
	"tokyo",
	"tools",
	"top",
	"toray",
	"toshiba",
	"total",
	"tours",
	"town",
	"toyota",
	"toys",
	"tr",
	"trade",
	"trading",
	"training",
	"travel",
	"travelers",
	"travelersinsurance",
	"trust",
	"trv",
	"tt",
	"tube",
	"tui",
	"tunes",
	"tushu",
	"tv",
	"tvs",
	"tw",
	"tz",
	"ua",
	"ubank",
	"ubs",
	"ug",
	"uk",
	"unicom",
	"university",
	"uno",
	"uol",
	"ups",
	"us",
	"uy",
	"uz",
	"va",
	"vacations",
	"vana",
	"vanguard",
	"vc",
	"ve",
	"vegas",
	"ventures",
	"verisign",
	"vermögensberater",
	"vermögensberatung",
	"versicherung",
	"vet",
	"vg",
	"vi",
	"viajes",
	"video",
	"vig",
	"viking",
	"villas",
	"vin",
	"vip",
	"virgin",
	"visa",
	"vision",
	"viva",
	"vivo",
	"vlaanderen",
	"vn",
	"vodka",
	"volvo",
	"vote",
	"voting",
	"voto",
	"voyage",
	"vu",
	"wales",
	"walmart",
	"walter",
	"wang",
	"wanggou",
	"watch",
	"watches",
	"weather",
	"weatherchannel",
	"webcam",
	"weber",
	"website",
	"wed",
	"wedding",
	"weibo",
	"weir",
	"wf",
	"whoswho",
	"wien",
	"wiki",
	"williamhill",
	"win",
	"windows",
	"wine",
	"winners",
	"wme",
	"wolterskluwer",
	"woodside",
	"work",
	"works",
	"world",
	"wow",
	"ws",
	"wtc",
	"wtf",
	"xbox",
	"xerox",
	"xihuan",
	"xin",
	"xxx",
	"xyz",
	"yachts",
	"yahoo",
	"yamaxun",
	"yandex",
	"ye",
	"yodobashi",
	"yoga",
	"yokohama",
	"you",
	"youtube",
	"yt",
	"yun",
	"za",
	"zappos",
	"zara",
	"zero",
	"zip",
	"zm",
	"zone",
	"zuerich",
	"zw",
	"ελ",
	"ευ",
	"бг",
	"бел",
	"дети",
	"ею",
	"католик",
	"ком",
	"мкд",
	"мон",
	"москва",
	"онлайн",
	"орг",
	"рус",
	"рф",
	"сайт",
	"срб",
	"укр",
	"қаз",
	"հայ",
	"ישראל",
	"קום",
	"ابوظبي",
	"ارامكو",
	"الاردن",
	"البحرين",
	"الجزائر",
	"السعودية",
	"العليان",
	"المغرب",
	"امارات",
	"ایران",
	"بارت",
	"بازار",
	"بيتك",
	"بھارت",
	"تونس",
	"سودان",
	"سورية",
	"شبكة",
	"عراق",
	"عرب",
	"عمان",
	"فلسطين",
	"قطر",
	"كاثوليك",
	"كوم",
	"مصر",
	"مليسيا",
	"موريتانيا",
	"موقع",
	"همراه",
	"پاکستان",
	"ڀارت",
	"कॉम",
	"नेट",
	"भारत",
	"भारतम्",
	"भारोत",
	"संगठन",
	"বাংলা",
	"ভারত",
	"ভাৰত",
	"ਭਾਰਤ",
	"ભારત",
	"ଭାରତ",
	"இந்தியா",
	"இலங்கை",
	"சிங்கப்பூர்",
	"భారత్",
	"ಭಾರತ",
	"ഭാരതം",
	"ලංකා",
	"คอม",
	"ไทย",
	"ລາວ",
	"გე",
	"みんな",
	"アマゾン",
	"クラウド",
	"グーグル",
	"コム",
	"ストア",
	"セール",
	"ファッション",
	"ポイント",
	"世界",
	"中信",
	"中国",
	"中國",
	"中文网",
	"亚马逊",
	"企业",
	"佛山",
	"信息",
	"健康",
	"八卦",
	"公司",
	"公益",
	"台湾",
	"台灣",
	"商城",
	"商店",
	"商标",
	"嘉里",
	"嘉里大酒店",
	"在线",
	"大拿",
	"天主教",
	"娱乐",
	"家電",
	"广东",
	"微博",
	"慈善",
	"我爱你",
	"手机",
	"招聘",
	"政务",
	"政府",
	"新加坡",
	"新闻",
	"时尚",
	"書籍",
	"机构",
	"淡马锡",
	"游戏",
	"澳門",
	"点看",
	"移动",
	"组织机构",
	"网址",
	"网店",
	"网站",
	"网络",
	"联通",
	"谷歌",
	"购物",
	"通販",
	"集团",
	"電訊盈科",
	"飞利浦",
	"食品",
	"餐厅",
	"香格里拉",
	"香港",
	"닷넷",
	"닷컴",
	"삼성",
	"한국"
];

//#endregion
//#region src/url.ts
const PROTOCOL_REGEX = /^[a-zA-Z]+:\/\//;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LOCALHOST_ADDRESSES = [
	"localhost",
	"127.0.0.1",
	"0.0.0.0"
];
const HTTP_PROTOCOL = "http://";
const MAILTO_PROTOCOL = "mailto:";
const DEFAULT_PROTOCOL = HTTP_PROTOCOL;
const IPV4_REGEX = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const IPV6_REGEX = /^(?:(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,7}:|(?:[0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|(?:[0-9a-fA-F]{1,4}:){1,5}(?::[0-9a-fA-F]{1,4}){1,2}|(?:[0-9a-fA-F]{1,4}:){1,4}(?::[0-9a-fA-F]{1,4}){1,3}|(?:[0-9a-fA-F]{1,4}:){1,3}(?::[0-9a-fA-F]{1,4}){1,4}|(?:[0-9a-fA-F]{1,4}:){1,2}(?::[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:(?::[0-9a-fA-F]{1,4}){1,6}|:(?::[0-9a-fA-F]{1,4}){1,7}|::|fe80:(?::[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(?:ffff(?::0{1,4}){0,1}:){0,1}(?:(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9])|(?:[0-9a-fA-F]{1,4}:){1,4}:(?:(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(?:25[0-5]|(?:2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/;
/**
* Checks if a string is a valid IPv4 address
* @param ip - String to validate as IPv4
* @returns True if valid IPv4 address
*/
function isValidIPv4(ip) {
	if (!ip || typeof ip !== "string") return false;
	return IPV4_REGEX.test(ip);
}
/**
* Checks if a string is a valid IPv6 address
* @param ip - String to validate as IPv6
* @returns True if valid IPv6 address
*/
function isValidIPv6(ip) {
	if (!ip || typeof ip !== "string") return false;
	const cleanIP = ip.replace(/^\[|\]$/g, "");
	return IPV6_REGEX.test(cleanIP);
}
/**
* Checks if a string is a valid IP address (IPv4 or IPv6)
* @param ip - String to validate as IP address
* @returns Object with validation results
*/
function validateIPAddress(ip) {
	if (!ip || typeof ip !== "string") return {
		isValid: false,
		type: "invalid"
	};
	if (isValidIPv4(ip)) return {
		isValid: true,
		type: "ipv4",
		formatted: ip
	};
	if (isValidIPv6(ip)) return {
		isValid: true,
		type: "ipv6",
		formatted: ip.replace(/^\[|\]$/g, "")
	};
	return {
		isValid: false,
		type: "invalid"
	};
}
/**
* Checks if a URL string points to a localhost address.
* @param url - The URL string to check
* @returns True if the URL points to localhost, false otherwise
*/
function isLocalhost(url) {
	const hostname = extractHostname(url);
	return LOCALHOST_ADDRESSES.includes(hostname);
}
/**
* Extracts hostname from a URL string by removing protocol, path, query, hash, and port.
* @param url - The URL string to extract hostname from
* @returns The cleaned hostname
*/
function extractHostname(url) {
	let hostname = url;
	if (hostname.includes("://")) hostname = hostname.split("://")[1];
	const atIndex = hostname.indexOf("@");
	if (atIndex !== -1) hostname = hostname.substring(atIndex + 1);
	hostname = hostname.split("/")[0].split("?")[0].split("#")[0].split(":")[0];
	return hostname;
}
/**
* Returns a readable representation of a URL by stripping the protocol
* and any trailing slash. For valid URLs, only the host is returned.
* Invalid URLs are sanitized by removing the protocol and trailing slash.
*
* @param url - The URL string to format
* @returns The formatted domain for display
*/
function formatURLForDisplay(url) {
	if (!url) return "";
	try {
		return new URL(url).host;
	} catch (_error) {
		return extractHostname(url);
	}
}
/**
* Extracts and validates the TLD (Top Level Domain) from a URL string.
*
* @param {string} urlString - The string to extract TLD from
* @returns {string} The valid TLD if found, empty string otherwise
*
* @description
* The function performs the following steps:
* 1. Basic validation (rejects empty strings, strings starting/ending with dots)
* 2. URL component cleaning:
*    - Removes protocol (if present)
*    - Removes auth credentials (if present)
*    - Removes path component (everything after '/')
*    - Removes query parameters (everything after '?')
*    - Removes hash fragments (everything after '#')
*    - Removes port numbers (everything after ':')
* 3. Validates the TLD against a list of known TLDs
*/
function extractTLD(urlString) {
	if (!urlString || urlString.startsWith(".") || urlString.endsWith(".")) return "";
	const hostnameParts = extractHostname(urlString).split(".");
	if (hostnameParts.length >= 2) {
		const potentialTLD = hostnameParts[hostnameParts.length - 1].toLowerCase();
		return tlds_default.includes(potentialTLD) ? potentialTLD : "";
	}
	return "";
}
/**
* Process a URL object to extract its components
*/
function processURL(url) {
	const protocol = url.protocol.slice(0, -1);
	const hostnameParts = url.hostname.split(".");
	let subdomain = "";
	let rootDomain = "";
	let tld = "";
	if (hostnameParts.length === 1) rootDomain = hostnameParts[0];
	else if (hostnameParts.length >= 2) {
		tld = hostnameParts[hostnameParts.length - 1];
		rootDomain = hostnameParts[hostnameParts.length - 2];
		if (hostnameParts.length > 2) subdomain = hostnameParts.slice(0, -2).join(".");
	}
	return {
		protocol,
		subdomain,
		rootDomain,
		tld,
		pathname: url.pathname === "/" ? "" : url.pathname,
		full: url
	};
}
/**
* Extracts components from a URL object or string.
*
* @param {URL | string} url - The URL object or string to extract components from
* @returns {IURLComponents | undefined} URL components or undefined if invalid
*
* @example
* // With URL object
* const url = new URL('https://blog.example.com/posts');
* extractURLComponents(url);
*
* // With string
* extractURLComponents('blog.example.com/posts');
*
* // Example output:
* // {
* //   protocol: 'https',      // empty string if protocol is not present
* //   subdomain: 'blog',
* //   rootDomain: 'example',
* //   tld: 'com',
* //   pathname: 'posts',
* //   full: URL {}           // The parsed URL object
* // }
*/
function extractURLComponents(url) {
	if (typeof url !== "string") return processURL(url);
	if (!url || url.trim() === "") return void 0;
	if (url.length > 2048) return void 0;
	const urlLower = url.toLowerCase();
	try {
		if (PROTOCOL_REGEX.test(urlLower) || urlLower.startsWith(MAILTO_PROTOCOL)) return processURL(new URL(url));
		if (EMAIL_REGEX.test(urlLower)) return processURL(new URL(`${MAILTO_PROTOCOL}${url}`));
		if (isLocalhost(urlLower) || isValidIPv4(urlLower) || isValidIPv6(urlLower) || extractTLD(urlLower)) return processURL(new URL(`${DEFAULT_PROTOCOL}${urlLower}`));
		return;
	} catch (error) {
		return;
	}
}
/**
* Validates that a next_path parameter is safe for redirection.
* Only allows relative paths starting with "/" to prevent open redirect vulnerabilities.
*
* @param url - The next_path URL to validate
* @returns True if the URL is a safe relative path, false otherwise
*
* @example
* isValidNextPath("/dashboard") // true
* isValidNextPath("/workspace/123") // true
* isValidNextPath("https://malicious.com") // false
* isValidNextPath("//malicious.com") // false (protocol-relative)
* isValidNextPath("javascript:alert(1)") // false
* isValidNextPath("") // false
* isValidNextPath("dashboard") // false (must start with /)
* isValidNextPath("\\malicious") // false (backslash)
* isValidNextPath("  /dashboard  ") // true (trimmed)
*/
function isValidNextPath(url) {
	if (!url || typeof url !== "string") return false;
	const trimmedUrl = url.trim();
	if (!trimmedUrl) return false;
	if (!trimmedUrl.startsWith("/")) return false;
	if (trimmedUrl.startsWith("//")) return false;
	if (trimmedUrl.includes("\\")) return false;
	try {
		const normalizedUrl = new URL(trimmedUrl, "http://localhost");
		if (normalizedUrl.hostname !== "localhost" || normalizedUrl.protocol !== "http:") return false;
		const pathname = normalizedUrl.pathname;
		return ![
			/javascript:/i,
			/data:/i,
			/vbscript:/i,
			/<script/i,
			/on\w+=/i
		].some((pattern) => pattern.test(pathname));
	} catch (error) {
		return false;
	}
}

//#endregion
//#region src/work-item-filters/configs/filters/cycle.ts
/**
* Helper to get the cycle multi select config
* @param params - The filter params
* @returns The cycle multi select config
*/
const getCycleMultiSelectConfig = (params, singleValueOperator) => getMultiSelectConfig({
	items: params.cycles,
	getId: (cycle) => cycle.id,
	getLabel: (cycle) => cycle.name,
	getValue: (cycle) => cycle.id,
	getIconData: (cycle) => cycle.status || "draft"
}, {
	singleValueOperator,
	...params
}, { ...params });
/**
* Get the cycle filter config
* @template K - The filter key
* @param key - The filter key to use
* @returns A function that takes parameters and returns the cycle filter config
*/
const getCycleFilterConfig = (key) => (params) => createFilterConfig({
	id: key,
	label: "Cycle",
	...params,
	icon: params.filterIcon,
	supportedOperatorConfigsMap: new Map([createOperatorConfigEntry(COLLECTION_OPERATOR.IN, params, (updatedParams) => getCycleMultiSelectConfig(updatedParams, EQUALITY_OPERATOR.EXACT))])
});

//#endregion
//#region src/work-item-filters/configs/filters/date.ts
/**
* Get the start date filter config
* @template K - The filter key
* @param key - The filter key to use
* @returns A function that takes parameters and returns the start date filter config
*/
const getStartDateFilterConfig = (key) => (params) => createFilterConfig({
	id: key,
	label: "Start date",
	...params,
	icon: params.filterIcon,
	allowMultipleFilters: true,
	supportedOperatorConfigsMap: getSupportedDateOperators(params)
});
/**
* Get the target date filter config
* @template K - The filter key
* @param key - The filter key to use
* @returns A function that takes parameters and returns the target date filter config
*/
const getTargetDateFilterConfig = (key) => (params) => createFilterConfig({
	id: key,
	label: "Target date",
	...params,
	icon: params.filterIcon,
	allowMultipleFilters: true,
	supportedOperatorConfigsMap: getSupportedDateOperators(params)
});
/**
* Get the created at filter config
* @template K - The filter key
* @param key - The filter key to use
* @returns A function that takes parameters and returns the created at filter config
*/
const getCreatedAtFilterConfig = (key) => (params) => createFilterConfig({
	id: key,
	label: "Created at",
	...params,
	icon: params.filterIcon,
	allowMultipleFilters: true,
	supportedOperatorConfigsMap: getSupportedDateOperators(params)
});
/**
* Get the updated at filter config
* @template K - The filter key
* @param key - The filter key to use
* @returns A function that takes parameters and returns the updated at filter config
*/
const getUpdatedAtFilterConfig = (key) => (params) => createFilterConfig({
	id: key,
	label: "Updated at",
	...params,
	icon: params.filterIcon,
	allowMultipleFilters: true,
	supportedOperatorConfigsMap: getSupportedDateOperators(params)
});

//#endregion
//#region src/work-item-filters/configs/filters/label.ts
/**
* Helper to get the label multi select config
* @param params - The filter params
* @returns The label multi select config
*/
const getLabelMultiSelectConfig = (params, singleValueOperator) => getMultiSelectConfig({
	items: params.labels,
	getId: (label) => label.id,
	getLabel: (label) => label.name,
	getValue: (label) => label.id,
	getIconData: (label) => label.color
}, {
	singleValueOperator,
	...params
}, { getOptionIcon: params.getOptionIcon });
/**
* Get the label filter config
* @template K - The filter key
* @param key - The filter key to use
* @returns A function that takes parameters and returns the label filter config
*/
const getLabelFilterConfig = (key) => (params) => createFilterConfig({
	id: key,
	label: "Label",
	...params,
	icon: params.filterIcon,
	supportedOperatorConfigsMap: new Map([createOperatorConfigEntry(COLLECTION_OPERATOR.IN, params, (updatedParams) => getLabelMultiSelectConfig(updatedParams, EQUALITY_OPERATOR.EXACT))])
});

//#endregion
//#region src/work-item-filters/configs/filters/module.ts
/**
* Helper to get the module multi select config
* @param params - The filter params
* @returns The module multi select config
*/
const getModuleMultiSelectConfig = (params) => getMultiSelectConfig({
	items: params.modules,
	getId: (module) => module.id,
	getLabel: (module) => module.name,
	getValue: (module) => module.id,
	getIconData: () => void 0
}, {
	singleValueOperator: EQUALITY_OPERATOR.EXACT,
	...params
}, { ...params });
/**
* Get the module filter config
* @template K - The filter key
* @param key - The filter key to use
* @returns A function that takes parameters and returns the module filter config
*/
const getModuleFilterConfig = (key) => (params) => createFilterConfig({
	id: key,
	label: "Module",
	...params,
	icon: params.filterIcon,
	supportedOperatorConfigsMap: new Map([createOperatorConfigEntry(COLLECTION_OPERATOR.IN, params, (updatedParams) => getModuleMultiSelectConfig(updatedParams))])
});

//#endregion
//#region src/work-item-filters/configs/filters/priority.ts
/**
* Helper to get the priority multi select config
* @param params - The filter params
* @returns The priority multi select config
*/
const getPriorityMultiSelectConfig = (params, singleValueOperator) => getMultiSelectConfig({
	items: ISSUE_PRIORITIES,
	getId: (priority) => priority.key,
	getLabel: (priority) => priority.title,
	getValue: (priority) => priority.key,
	getIconData: (priority) => priority.key
}, {
	singleValueOperator,
	...params
}, { getOptionIcon: params.getOptionIcon });
/**
* Get the priority filter config
* @template K - The filter key
* @param key - The filter key to use
* @returns A function that takes parameters and returns the priority filter config
*/
const getPriorityFilterConfig = (key) => (params) => createFilterConfig({
	id: key,
	label: "Priority",
	...params,
	icon: params.filterIcon,
	supportedOperatorConfigsMap: new Map([createOperatorConfigEntry(COLLECTION_OPERATOR.IN, params, (updatedParams) => getPriorityMultiSelectConfig(updatedParams, EQUALITY_OPERATOR.EXACT))])
});

//#endregion
//#region src/work-item-filters/configs/filters/project.ts
/**
* Get the project filter config
* @template K - The filter key
* @param key - The filter key to use
* @returns A function that takes parameters and returns the project filter config
*/
const getProjectFilterConfig = (key) => (params) => createFilterConfig({
	id: key,
	label: "Projects",
	...params,
	icon: params.filterIcon,
	supportedOperatorConfigsMap: new Map([createOperatorConfigEntry(COLLECTION_OPERATOR.IN, params, (updatedParams) => getProjectMultiSelectConfig(updatedParams, EQUALITY_OPERATOR.EXACT))])
});

//#endregion
//#region src/work-item-filters/configs/filters/state.ts
/**
* Helper to get the state group multi select config
* @param params - The filter params
* @returns The state group multi select config
*/
const getStateGroupMultiSelectConfig = (params, singleValueOperator) => getMultiSelectConfig({
	items: Object.values(STATE_GROUPS),
	getId: (state) => state.key,
	getLabel: (state) => state.label,
	getValue: (state) => state.key,
	getIconData: (state) => state.key
}, {
	singleValueOperator,
	...params
}, { ...params });
/**
* Get the state group filter config
* @template K - The filter key
* @param key - The filter key to use
* @returns A function that takes parameters and returns the state group filter config
*/
const getStateGroupFilterConfig = (key) => (params) => createFilterConfig({
	id: key,
	label: "State Group",
	...params,
	icon: params.filterIcon,
	supportedOperatorConfigsMap: new Map([createOperatorConfigEntry(COLLECTION_OPERATOR.IN, params, (updatedParams) => getStateGroupMultiSelectConfig(updatedParams, EQUALITY_OPERATOR.EXACT))])
});
/**
* Helper to get the state multi select config
* @param params - The filter params
* @returns The state multi select config
*/
const getStateMultiSelectConfig = (params, singleValueOperator) => getMultiSelectConfig({
	items: params.states,
	getId: (state) => state.id,
	getLabel: (state) => state.name,
	getValue: (state) => state.id,
	getIconData: (state) => state
}, {
	singleValueOperator,
	...params
}, { ...params });
/**
* Get the state filter config
* @template K - The filter key
* @param key - The filter key to use
* @returns A function that takes parameters and returns the state filter config
*/
const getStateFilterConfig = (key) => (params) => createFilterConfig({
	id: key,
	label: "State",
	...params,
	icon: params.filterIcon,
	supportedOperatorConfigsMap: new Map([createOperatorConfigEntry(COLLECTION_OPERATOR.IN, params, (updatedParams) => getStateMultiSelectConfig(updatedParams, EQUALITY_OPERATOR.EXACT))])
});

//#endregion
//#region src/work-item-filters/configs/filters/user.ts
/**
* Get the assignee filter config
* @template K - The filter key
* @param key - The filter key to use
* @returns A function that takes parameters and returns the assignee filter config
*/
const getAssigneeFilterConfig = (key) => (params) => createFilterConfig({
	id: key,
	label: "Assignees",
	...params,
	icon: params.filterIcon,
	supportedOperatorConfigsMap: new Map([createOperatorConfigEntry(COLLECTION_OPERATOR.IN, params, (updatedParams) => getMemberMultiSelectConfig(updatedParams, EQUALITY_OPERATOR.EXACT))])
});
/**
* Get the mention filter config
* @template K - The filter key
* @param key - The filter key to use
* @returns A function that takes parameters and returns the mention filter config
*/
const getMentionFilterConfig = (key) => (params) => createFilterConfig({
	id: key,
	label: "Mentions",
	...params,
	icon: params.filterIcon,
	supportedOperatorConfigsMap: new Map([createOperatorConfigEntry(COLLECTION_OPERATOR.IN, params, (updatedParams) => getMemberMultiSelectConfig(updatedParams, EQUALITY_OPERATOR.EXACT))])
});
/**
* Get the created by filter config
* @template K - The filter key
* @param key - The filter key to use
* @returns A function that takes parameters and returns the created by filter config
*/
const getCreatedByFilterConfig = (key) => (params) => createFilterConfig({
	id: key,
	label: "Created by",
	...params,
	icon: params.filterIcon,
	supportedOperatorConfigsMap: new Map([createOperatorConfigEntry(COLLECTION_OPERATOR.IN, params, (updatedParams) => getMemberMultiSelectConfig(updatedParams, EQUALITY_OPERATOR.EXACT))])
});
/**
* Get the subscriber filter config
* @template K - The filter key
* @param key - The filter key to use
* @returns A function that takes parameters and returns the subscriber filter config
*/
const getSubscriberFilterConfig = (key) => (params) => createFilterConfig({
	id: key,
	label: "Subscriber",
	...params,
	icon: params.filterIcon,
	supportedOperatorConfigsMap: new Map([createOperatorConfigEntry(COLLECTION_OPERATOR.IN, params, (updatedParams) => getMemberMultiSelectConfig(updatedParams, EQUALITY_OPERATOR.EXACT))])
});

//#endregion
//#region src/work-item/base.ts
const handleIssuesMutation = (formData, oldGroupTitle, selectedGroupBy, issueIndex, orderBy$1, prevData) => {
	if (!prevData) return prevData;
	if (Array.isArray(prevData)) {
		const updatedIssue = {
			...prevData[issueIndex],
			...formData
		};
		prevData.splice(issueIndex, 1, updatedIssue);
		return [...prevData];
	} else {
		const oldGroup = prevData[oldGroupTitle ?? ""] ?? [];
		let newGroup = [];
		if (selectedGroupBy === "priority") newGroup = prevData[formData.priority ?? ""] ?? [];
		else if (selectedGroupBy === "state") newGroup = prevData[formData.state_id ?? ""] ?? [];
		const updatedIssue = {
			...oldGroup[issueIndex],
			...formData
		};
		if (selectedGroupBy !== Object.keys(formData)[0]) return {
			...prevData,
			[oldGroupTitle ?? ""]: orderArrayBy(oldGroup.map((i) => i.id === updatedIssue.id ? updatedIssue : i), orderBy$1)
		};
		const groupThatIsUpdated = selectedGroupBy === "priority" ? formData.priority : formData.state_id;
		return {
			...prevData,
			[oldGroupTitle ?? ""]: orderArrayBy(oldGroup.filter((i) => i.id !== updatedIssue.id), orderBy$1),
			[groupThatIsUpdated ?? ""]: orderArrayBy([...newGroup, updatedIssue], orderBy$1)
		};
	}
};
const handleIssueQueryParamsByLayout = (layout, viewType) => {
	const queryParams = ["filters"];
	if (!layout) return null;
	const currentViewLayoutOptions = ISSUE_DISPLAY_FILTERS_BY_PAGE[viewType].layoutOptions[layout];
	Object.keys(currentViewLayoutOptions.display_filters).forEach((option) => {
		queryParams.push(option);
	});
	if (currentViewLayoutOptions.extra_options.access) currentViewLayoutOptions.extra_options.values.forEach((option) => {
		queryParams.push(option);
	});
	return queryParams;
};
/**
*
* @description create a full issue payload with some default values. This function also parse the form field
* like assignees, labels, etc. and add them to the payload
* @param projectId project id to be added in the issue payload
* @param formData partial issue data from the form. This will override the default values
* @returns full issue payload with some default values
*/
const createIssuePayload = (projectId, formData) => {
	return {
		id: v4(),
		project_id: projectId,
		priority: "none",
		label_ids: [],
		assignee_ids: [],
		sub_issues_count: 0,
		attachment_count: 0,
		link_count: 0,
		tempId: v4(),
		...formData
	};
};
/**
* @description check if the issue due date should be highlighted
* @param date
* @param stateGroup
* @returns boolean
*/
const shouldHighlightIssueDueDate = (date, stateGroup) => {
	if (!date || !stateGroup) return false;
	if ([STATE_GROUPS.completed.key, STATE_GROUPS.cancelled.key].includes(stateGroup)) return false;
	const parsedDate = getDate(date);
	if (!parsedDate) return false;
	return differenceInCalendarDays(parsedDate, /* @__PURE__ */ new Date()) <= 0;
};
const getIssueBlocksStructure = (block) => ({
	data: block,
	id: block?.id,
	name: block?.name,
	sort_order: block?.sort_order,
	start_date: block?.start_date ?? void 0,
	target_date: block?.target_date ?? void 0,
	meta: { project_id: block?.project_id ?? void 0 }
});
const formatTextList = (TextArray) => {
	const count = TextArray.length;
	switch (count) {
		case 0: return "";
		case 1: return TextArray[0];
		case 2: return `${TextArray[0]} and ${TextArray[1]}`;
		case 3: return `${TextArray.slice(0, 2).join(", ")}, and ${TextArray[2]}`;
		case 4: return `${TextArray.slice(0, 3).join(", ")}, and ${TextArray[3]}`;
		default: return `${TextArray.slice(0, 3).join(", ")}, and +${count - 3} more`;
	}
};
const getDescriptionPlaceholderI18n = (isFocused, description) => {
	if (!isEditorEmpty(description) || isFocused) return "common.press_for_commands";
	else return "common.click_to_add_description";
};
const issueCountBasedOnFilters = (issueIds, layout, groupBy$1, subGroupBy) => {
	let issuesCount = 0;
	if (!layout) return issuesCount;
	if (["spreadsheet", "gantt_chart"].includes(layout)) issuesCount = issueIds?.length;
	else if (layout === "calendar") Object.keys(issueIds || {}).map((groupId) => {
		issuesCount += issueIds?.[groupId]?.length;
	});
	else if (layout === "list") if (groupBy$1) Object.keys(issueIds || {}).map((groupId) => {
		issuesCount += issueIds?.[groupId]?.length;
	});
	else issuesCount = issueIds?.length;
	else if (layout === "kanban") {
		if (groupBy$1 && subGroupBy) Object.keys(issueIds || {}).map((groupId) => {
			Object.keys(issueIds?.[groupId] || {}).map((subGroupId) => {
				issuesCount += issueIds?.[groupId]?.[subGroupId]?.length || 0;
			});
		});
		else if (groupBy$1) Object.keys(issueIds || {}).map((groupId) => {
			issuesCount += issueIds?.[groupId]?.length;
		});
	}
	return issuesCount;
};
/**
* @description This method is used to apply the display filters on the issues
* @param {IIssueDisplayFilterOptions} displayFilters
* @returns {IIssueDisplayFilterOptions}
*/
const getComputedDisplayFilters = (displayFilters = {}, defaultValues) => {
	const filters = !isEmpty(displayFilters) ? displayFilters : defaultValues;
	return {
		calendar: {
			show_weekends: filters?.calendar?.show_weekends || false,
			layout: filters?.calendar?.layout || "month"
		},
		layout: filters?.layout || EIssueLayoutTypes.LIST,
		order_by: filters?.order_by || "sort_order",
		group_by: filters?.group_by || null,
		sub_group_by: filters?.sub_group_by || null,
		sub_issue: filters?.sub_issue || false,
		show_empty_groups: filters?.show_empty_groups || false
	};
};
/**
* @description This method is used to apply the display properties on the issues
* @param {IIssueDisplayProperties} displayProperties
* @returns {IIssueDisplayProperties}
*/
const getComputedDisplayProperties = (displayProperties = {}) => ({
	assignee: displayProperties?.assignee ?? true,
	start_date: displayProperties?.start_date ?? true,
	due_date: displayProperties?.due_date ?? true,
	labels: displayProperties?.labels ?? true,
	priority: displayProperties?.priority ?? true,
	state: displayProperties?.state ?? true,
	sub_issue_count: displayProperties?.sub_issue_count ?? true,
	attachment_count: displayProperties?.attachment_count ?? true,
	link: displayProperties?.link ?? true,
	estimate: displayProperties?.estimate ?? true,
	key: displayProperties?.key ?? true,
	created_on: displayProperties?.created_on ?? true,
	updated_on: displayProperties?.updated_on ?? true,
	modules: displayProperties?.modules ?? true,
	cycle: displayProperties?.cycle ?? true,
	issue_type: displayProperties?.issue_type ?? true
});
const generateWorkItemLink = ({ workspaceSlug, projectId, issueId, projectIdentifier, sequenceId, isArchived = false, isEpic = false }) => {
	const archiveIssueLink = `/${workspaceSlug}/projects/${projectId}/archives/issues/${issueId}`;
	const workItemLink = `/${workspaceSlug}/browse/${projectIdentifier}-${sequenceId}/`;
	return isArchived ? archiveIssueLink : isEpic ? workItemLink : workItemLink;
};
const getIssuePriorityFilters = (priorityKey) => {
	const currentIssuePriority = ISSUE_PRIORITY_FILTERS && ISSUE_PRIORITY_FILTERS.length > 0 ? ISSUE_PRIORITY_FILTERS.find((_priority) => _priority.key === priorityKey) : void 0;
	if (currentIssuePriority) return currentIssuePriority;
};

//#endregion
//#region src/work-item/modal.ts
const getUpdateFormDataForReset = (projectId, formData) => ({
	...DEFAULT_WORK_ITEM_FORM_VALUES,
	project_id: projectId,
	name: formData.name,
	description_html: formData.description_html,
	priority: formData.priority,
	start_date: formData.start_date,
	target_date: formData.target_date
});
const convertWorkItemDataToSearchResponse = (workspaceSlug, workItem, project, state) => ({
	id: workItem.id,
	name: workItem.name,
	project_id: workItem.project_id ?? "",
	project__identifier: project?.identifier ?? "",
	project__name: project?.name ?? "",
	sequence_id: workItem.sequence_id,
	type_id: workItem.type_id ?? "",
	state__color: state?.color ?? "",
	start_date: workItem.start_date,
	state__group: state?.group ?? "backlog",
	state__name: state?.name ?? "",
	workspace__slug: workspaceSlug
});
function getChangedIssuefields(formData, dirtyFields) {
	const changedFields = {};
	const dirtyFieldKeys = Object.keys(dirtyFields);
	for (const dirtyField of dirtyFieldKeys) if (dirtyFields[dirtyField]) set(changedFields, [dirtyField], formData[dirtyField]);
	return changedFields;
}

//#endregion
//#region src/work-item/state.ts
const orderStateGroups = (unorderedStateGroups) => {
	if (!unorderedStateGroups) return void 0;
	return Object.assign({
		backlog: [],
		unstarted: [],
		started: [],
		completed: [],
		cancelled: []
	}, unorderedStateGroups);
};
const sortStates = (states) => {
	if (!states || states.length === 0) return;
	return states.sort((stateA, stateB) => {
		if (stateA.group === stateB.group) return stateA.sequence - stateB.sequence;
		return Object.keys(STATE_GROUPS).indexOf(stateA.group) - Object.keys(STATE_GROUPS).indexOf(stateB.group);
	});
};
const getCurrentStateSequence = (groupSates, destinationData, edge) => {
	const defaultSequence = 65535;
	if (!edge) return defaultSequence;
	const currentStateIndex = groupSates.findIndex((state) => state.id === destinationData.id);
	const currentStateSequence = groupSates[currentStateIndex]?.sequence || void 0;
	if (!currentStateSequence) return defaultSequence;
	if (edge === "top") {
		const prevStateSequence = groupSates[currentStateIndex - 1]?.sequence || void 0;
		if (prevStateSequence === void 0) return currentStateSequence - defaultSequence;
		return (currentStateSequence + prevStateSequence) / 2;
	} else if (edge === "bottom") {
		const nextStateSequence = groupSates[currentStateIndex + 1]?.sequence || void 0;
		if (nextStateSequence === void 0) return currentStateSequence + defaultSequence;
		return (currentStateSequence + nextStateSequence) / 2;
	}
};

//#endregion
//#region src/workspace.ts
const orderWorkspacesList = (workspaces) => workspaces.sort((a, b) => a.name.localeCompare(b.name));

//#endregion
export { ADDITIONAL_EXTENSIONS, CORE_EXTENSIONS, PasswordStrength, TreeTraversalMode, addAndCondition, addDaysToDate, addSpaceIfCamelCase, applyTheme, authErrorHandler, buildTree, calculateCycleProgress, calculateTimeAgo, calculateTimeAgoShort, calculateTotalFilters, calculateYearlyDiscount, capitalizeFirstLetter, checkDateCriteria, checkDuplicates, checkEmailValidity, checkIfArraysHaveSameElements, checkIfDatesAreEqual, checkURLValidity, cn, convertBytesToSize, convertHTMLToMarkdown, convertHexEmojiToDecimal, convertHoursMinutesToMinutes, convertMinutesToHoursAndMinutes, convertMinutesToHoursMinutesString, convertRemToPixel, convertStringArrayToBooleanObject, convertToEpoch, convertToISODateString, convertWorkItemDataToSearchResponse, copyTextToClipboard, copyUrlToClipboard, createAndGroupNode, createConditionNode, createExpressionComparable, createFilterConfig, createFilterFieldConfig, createGroupComparable, createIssuePayload, createOperatorConfigEntry, createSimilarString, csvDownload, darkenColor, deepCompareFilterExpressions, emojiCodeToUnicode, ensureUrlHasProtocol, extractConditions, extractConditionsWithDisplayOperators, extractHostname, extractIds, extractTLD, extractURLComponents, filterPagesByPageType, filterValidIds, findConditionsByPropertyAndOperator, findHowManyDaysLeft, findImmediateParent, findNodeById, findParentChain, findStringWithMostCharacters, findTotalDaysInRange, formatActiveCycle, formatDateRange, formatDuration, formatTextList, formatURLForDisplay, generateCalendarData, generateDateArray, generateFileName, generateIconColors, generateQueryParams, generateRandomColor, generateWorkItemLink, getAndGroupChildren, getAssetIdFromUrl, getAssigneeFilterConfig, getBase64Image, getBaseSubscriptionName, getChangedIssuefields, getComputedDisplayFilters, getComputedDisplayProperties, getContrastRatio, getCreatedAtFilterConfig, getCreatedByFilterConfig, getCurrentDateTimeInISO, getCurrentStateSequence, getCustomDates, getCycleFilterConfig, getCycleMultiSelectConfig, getDate, getDateOperatorLabel, getDatePickerConfig, getDatePropertyFilterConfig, getDateRangePickerConfig, getDescriptionPlaceholderI18n, getDistributionPathsPostUpdate, getEditorAssetDownloadSrc, getEditorAssetSrc, getFileExtension, getFileName, getFileURL, getFilterValueLength, getFirstCharacters, getGroupChildren, getHighestRole, getIconForLink, getIssueBlocksStructure, getIssuePriorityFilters, getLabelFilterConfig, getLabelMultiSelectConfig, getLuminance, getMemberMultiSelectConfig, getMemberPickerPropertyFilterConfig, getMentionFilterConfig, getModuleFilterConfig, getModuleMultiSelectConfig, getMultiSelectConfig, getNumberCount, getOperatorForPayload, getOperatorLabel, getOrderedDays, getPageName, getPasswordCriteria, getPasswordStrength, getPriorityFilterConfig, getPriorityMultiSelectConfig, getProgress, getProjectFilterConfig, getProjectMultiSelectConfig, getPublishViewLink, getRandomEmoji, getReadTimeFromWordsCount, getSingleSelectConfig, getStartDateFilterConfig, getStateFilterConfig, getStateGroupFilterConfig, getStateGroupMultiSelectConfig, getStateMultiSelectConfig, getSubscriberFilterConfig, getSubscriptionName, getSubscriptionPriceDetails, getSupportEmail, getSupportedDateOperators, getTabIndex, getTargetDateFilterConfig, getTextContent, getUpdateFormDataForReset, getUpdatedAtFilterConfig, getUserRole, getValidKeysFromObject, getValidatedViewFilters, getViewName, getWeekNumberOfDate, groupBy, groupByField, groupReactions, handleIssueQueryParamsByLayout, handleIssuesMutation, hasChildrenProperty, hasValidValue, hexToHsl, hexToRgb, hslToHex, isAndGroupNode, isCommentEmpty, isComplete, isConditionNode, isDateFilterOperator, isDateFilterType, isDateGreaterThanToday, isEditorEmpty, isEmptyHtmlString, isEstimatePointValuesRepeated, isGroupNode, isInDateFormat, isJSONContentEmpty, isLoaderReady, isLocalhost, isStringCommentEmpty, isValidDate, isValidIPv4, isValidIPv6, isValidId, isValidNextPath, issueCountBasedOnFilters, joinUrlPath, joinWithConjunction, lightenColor, normalizeFilterExpression, orderArrayBy, orderCycles, orderGroupedDataByField, orderJoinedProjects, orderModules, orderPages, orderProjects, orderStateGroups, orderViews, orderWorkspacesList, parseDateFilter, partitionValidIds, processGroupNode, processRelativeDate, processURL, projectIdentifierSanitizer, removeNodeFromExpression, renderFormattedDate, renderFormattedDateWithoutYear, renderFormattedPayloadDate, renderFormattedTime, replaceNodeInExpression, replaceUnderscoreIfSnakeCase, resolveGeneralTheme, rgbToHex, sanitizeAndStabilizeExpression, sanitizeCommentForNotification, sanitizeHTML, satisfiesDateFilter, shouldFilterCycle, shouldFilterModule, shouldFilterPage, shouldFilterProject, shouldFilterView, shouldHighlightIssueDueDate, shouldNotifyChangeForExpression, shouldUnwrapGroup, sortByField, sortStates, stripAndTruncateHTML, substringMatch, toFilterArray, toHex, transformExpressionTree, transformGroupWithChildren, traverseExpressionTree, truncateText, unsetCustomCssVariables, unwrapGroupIfNeeded, updateDistribution, updateNodeInExpression, validateColor, validateIPAddress };
//# sourceMappingURL=index.js.map