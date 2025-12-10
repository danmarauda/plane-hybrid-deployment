import { EAuthErrorCodes, EEstimateSystem, EPastDurationFilters, ETabIndices, EUserPermissions, E_PASSWORD_STRENGTH, TAuthErrorInfo, TDraggableData, TIssueFilterPriorityObject, TIssuePriorities } from "@plane/constants";
import * as _plane_types7 from "@plane/types";
import { CompleteOrEmpty, Content, EIssueLayoutTypes, EProductSubscriptionEnum, EStartOfTheWeek, EUserProjectRoles, EUserWorkspaceRoles, FILTER_FIELD_TYPE, ICalendarPayload, ICycle, IEstimatePoint, IGanttBlock, IIssueDisplayFilterOptions, IIssueDisplayProperties, IIssueLabel, IIssueLabelTree, IModule, IPartialProject, IPaymentProduct, IProject, IProjectView, ISearchIssueResponse, IState, IStateResponse, IUserLite, IWorkspace, JSONContent, SingleOrArray, TAllAvailableDateFilterOperatorsForDisplay, TAllAvailableOperatorsForDisplay, TBaseFilterFieldConfig, TCycleFilters, TCycleGroups, TDateFilterFieldConfig, TDateRangeFilterFieldConfig, TFilterAndGroupNode, TFilterConditionNode, TFilterConditionNodeForDisplay, TFilterConditionPayload, TFilterConfig, TFilterExpression, TFilterFieldType, TFilterGroupNode, TFilterProperty, TFilterValue, TGroupedIssues, TIssue, TIssueGroupByOptions, TIssueOrderByOptions, TIssueParams, TLoader, TModuleDisplayFilters, TModuleFilters, TModuleOrderByOptions, TMultiSelectFilterFieldConfig, TOperatorConfigMap, TPage, TPageFilterProps, TPageFiltersSortBy, TPageFiltersSortKey, TPageNavigationTabs, TProductSubscriptionType, TProject, TProjectDisplayFilters, TProjectFilters, TProjectOrderByOptions, TSingleSelectFilterFieldConfig, TStateGroups, TSubGroupedIssues, TSubscriptionPrice, TSupportedFilterFieldConfigs, TSupportedOperators, TUnGroupedIssues, TViewFilterProps, TViewFiltersSortBy, TViewFiltersSortKey } from "@plane/types";
import { ClassValue } from "clsx";
import * as lucide_react0 from "lucide-react";
import * as react0 from "react";

//#region src/array.d.ts

/**
 * @description Groups an array of objects by a specified key
 * @param {any[]} array Array to group
 * @param {string} key Key to group by (supports dot notation for nested objects)
 * @returns {Object} Grouped object with keys being the grouped values
 * @example
 * const array = [{type: 'A', value: 1}, {type: 'B', value: 2}, {type: 'A', value: 3}];
 * groupBy(array, 'type') // returns { A: [{type: 'A', value: 1}, {type: 'A', value: 3}], B: [{type: 'B', value: 2}] }
 */
declare const groupBy: (array: any[], key: string) => any;
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
declare const orderArrayBy: (orgArray: any[], key: string, ordering?: "ascending" | "descending") => any[];
/**
 * @description Checks if an array contains duplicate values
 * @param {any[]} array Array to check for duplicates
 * @returns {boolean} True if duplicates exist, false otherwise
 * @example
 * checkDuplicates([1, 2, 2, 3]) // returns true
 * checkDuplicates([1, 2, 3]) // returns false
 */
declare const checkDuplicates: (array: any[]) => boolean;
/**
 * @description Finds the string with the most characters in an array of strings
 * @param {string[]} strings Array of strings to check
 * @returns {string} String with the most characters
 * @example
 * findStringWithMostCharacters(['a', 'bb', 'ccc']) // returns 'ccc'
 */
declare const findStringWithMostCharacters: (strings: string[]) => string;
/**
 * @description Checks if two arrays have the same elements regardless of order
 * @param {any[] | null} arr1 First array
 * @param {any[] | null} arr2 Second array
 * @returns {boolean} True if arrays have same elements, false otherwise
 * @example
 * checkIfArraysHaveSameElements([1, 2], [2, 1]) // returns true
 * checkIfArraysHaveSameElements([1, 2], [1, 3]) // returns false
 */
declare const checkIfArraysHaveSameElements: (arr1: any[] | null, arr2: any[] | null) => boolean;
type GroupedItems<T> = {
  [key: string]: T[];
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
declare const groupByField: <T>(array: T[], field: keyof T) => GroupedItems<T>;
/**
 * @description Sorts an array of objects by a specified field
 * @param {any[]} array Array to sort
 * @param {string} field Field to sort by
 * @returns {any[]} Sorted array
 * @example
 * const array = [{value: 2}, {value: 1}];
 * sortByField(array, 'value') // returns [{value: 1}, {value: 2}]
 */
declare const sortByField: (array: any[], field: string) => any[];
/**
 * @description Orders grouped data by a specified field
 * @param {GroupedItems<T>} groupedData Grouped data object
 * @param {keyof T} orderBy Field to order by
 * @returns {GroupedItems<T>} Ordered grouped data
 */
declare const orderGroupedDataByField: <T>(groupedData: GroupedItems<T>, orderBy: keyof T) => GroupedItems<T>;
/**
 * @description Builds a tree structure from an array of labels
 * @param {IIssueLabel[]} array Array of labels
 * @param {any} parent Parent ID
 * @returns {IIssueLabelTree[]} Tree structure
 */
declare const buildTree: (array: IIssueLabel[], parent?: null) => IIssueLabelTree[];
/**
 * @description Returns valid keys from object whose value is not falsy
 * @param {any} obj Object to check
 * @returns {string[]} Array of valid keys
 * @example
 * getValidKeysFromObject({a: 1, b: 0, c: null}) // returns ['a']
 */
declare const getValidKeysFromObject: (obj: any) => string[];
/**
 * @description Converts an array of strings into an object with boolean true values
 * @param {string[]} arrayStrings Array of strings
 * @returns {Object} Object with string keys and boolean values
 * @example
 * convertStringArrayToBooleanObject(['a', 'b']) // returns {a: true, b: true}
 */
declare const convertStringArrayToBooleanObject: (arrayStrings: string[]) => {
  [key: string]: boolean;
};
//#endregion
//#region src/attachment.d.ts
declare const generateFileName: (fileName: string) => string;
declare const getFileExtension: (filename: string) => string;
declare const getFileName: (fileName: string) => string;
declare const convertBytesToSize: (bytes: number) => string;
//#endregion
//#region src/auth.d.ts
/**
 * @description Password strength levels
 */
declare enum PasswordStrength {
  EMPTY = "empty",
  WEAK = "weak",
  FAIR = "fair",
  GOOD = "good",
  STRONG = "strong",
}
/**
 * Calculate password strength based on various criteria
 */
declare const getPasswordStrength: (password: string) => E_PASSWORD_STRENGTH;
type PasswordCriteria = {
  key: string;
  label: string;
  isValid: boolean;
};
/**
 * Get password criteria for validation display
 */
declare const getPasswordCriteria: (password: string) => PasswordCriteria[];
declare const authErrorHandler: (errorCode: EAuthErrorCodes, email?: string) => TAuthErrorInfo | undefined;
//#endregion
//#region src/calendar.d.ts
/**
 * @returns {ICalendarPayload} calendar payload to render the calendar
 * @param {ICalendarPayload | null} currentStructure current calendar payload
 * @param {Date} startDate date of the month to render
 * @param {EStartOfTheWeek} startOfWeek the day to start the week on
 * @description Returns calendar payload to render the calendar, if currentStructure is null, it will generate the payload for the month of startDate, else it will construct the payload for the month of startDate and append it to the currentStructure
 */
declare const generateCalendarData: (currentStructure: ICalendarPayload | null, startDate: Date, startOfWeek?: EStartOfTheWeek) => ICalendarPayload;
/**
 * Returns a new array sorted by the startOfWeek.
 * @param items Array of items to sort.
 * @param getDayIndex Function to get the day index (0-6) from an item.
 * @param startOfWeek The day to start the week on.
 */
declare const getOrderedDays: <T>(items: T[], getDayIndex: (item: T) => number, startOfWeek?: EStartOfTheWeek) => T[];
//#endregion
//#region src/color.d.ts
/**
 * Represents an RGB color with numeric values for red, green, and blue components
 * @typedef {Object} TRgb
 * @property {number} r - Red component (0-255)
 * @property {number} g - Green component (0-255)
 * @property {number} b - Blue component (0-255)
 */
type TRgb = {
  r: number;
  g: number;
  b: number;
};
type THsl = {
  h: number;
  s: number;
  l: number;
};
/**
 * @description Validates and clamps color values to RGB range (0-255)
 * @param {number} value - The color value to validate
 * @returns {number} Clamped and floored value between 0-255
 * @example
 * validateColor(-10) // returns 0
 * validateColor(300) // returns 255
 * validateColor(128) // returns 128
 */
declare const validateColor: (value: number) => number;
/**
 * Converts a decimal color value to two-character hex
 * @param {number} value - Decimal color value (0-255)
 * @returns {string} Two-character hex value with leading zero if needed
 */
declare const toHex: (value: number) => string;
/**
 * Converts a hexadecimal color code to RGB values
 * @param {string} hex - The hexadecimal color code (e.g., "#ff0000" for red)
 * @returns {RGB} An object containing the RGB values
 * @example
 * hexToRgb("#ff0000") // returns { r: 255, g: 0, b: 0 }
 * hexToRgb("#00ff00") // returns { r: 0, g: 255, b: 0 }
 * hexToRgb("#0000ff") // returns { r: 0, g: 0, b: 255 }
 */
declare const hexToRgb: (hex: string) => TRgb;
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
declare const rgbToHex: ({
  r,
  g,
  b
}: TRgb) => string;
/**
 * Converts Hex values to HSL values
 * @param {string} hex - The hexadecimal color code (e.g., "#ff0000" for red)
 * @returns {HSL} An object containing the HSL values
 * @example
 * hexToHsl("#ff0000") // returns { h: 0, s: 100, l: 50 }
 * hexToHsl("#00ff00") // returns { h: 120, s: 100, l: 50 }
 * hexToHsl("#0000ff") // returns { h: 240, s: 100, l: 50 }
 */
declare const hexToHsl: (hex: string) => THsl;
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
declare const hslToHex: ({
  h,
  s,
  l
}: THsl) => string;
/**
 * Calculate relative luminance of a color according to WCAG
 * @param {Object} rgb - RGB color object with r, g, b properties
 * @returns {number} Relative luminance value
 */
declare const getLuminance: ({
  r,
  g,
  b
}: TRgb) => number;
/**
 * Calculate contrast ratio between two colors
 * @param {Object} rgb1 - First RGB color object
 * @param {Object} rgb2 - Second RGB color object
 * @returns {number} Contrast ratio between the colors
 */
declare function getContrastRatio(rgb1: {
  r: number;
  g: number;
  b: number;
}, rgb2: {
  r: number;
  g: number;
  b: number;
}): number;
/**
 * Lighten a color by a specified amount
 * @param {Object} rgb - RGB color object
 * @param {number} amount - Amount to lighten (0-1)
 * @returns {Object} Lightened RGB color
 */
declare function lightenColor(rgb: {
  r: number;
  g: number;
  b: number;
}, amount: number): {
  r: number;
  g: number;
  b: number;
};
/**
 * Darken a color by a specified amount
 * @param {Object} rgb - RGB color object
 * @param {number} amount - Amount to darken (0-1)
 * @returns {Object} Darkened RGB color
 */
declare function darkenColor(rgb: {
  r: number;
  g: number;
  b: number;
}, amount: number): {
  r: number;
  g: number;
  b: number;
};
/**
 * Generate appropriate foreground and background colors based on input color
 * @param {string} color - Input color in hex format
 * @returns {Object} Object containing foreground and background colors in hex format
 */
declare function generateIconColors(color: string): {
  foreground: string;
  background: string;
};
/**
 * @description Generates a deterministic HSL color based on input string
 * @param {string} input - Input string to generate color from
 * @returns {THsl} An object containing the HSL values
 * @example
 * generateRandomColor("hello") // returns consistent HSL color for "hello"
 * generateRandomColor("") // returns { h: 0, s: 0, l: 0 }
 */
declare const generateRandomColor: (input: string) => THsl;
//#endregion
//#region src/common.d.ts
declare const getSupportEmail: (defaultEmail?: string) => string;
declare const cn: (...inputs: ClassValue[]) => string;
/**
 * Extracts IDs from an array of objects with ID property
 */
declare const extractIds: <T extends {
  id: string;
}>(items: T[]) => string[];
/**
 * Checks if an ID exists and is valid within the provided list
 */
declare const isValidId: (id: string | null | undefined, validIds: string[]) => boolean;
/**
 * Filters an array to only include valid IDs
 */
declare const filterValidIds: (ids: string[], validIds: string[]) => string[];
/**
 * Filters an array to include only valid IDs, returning both valid and invalid IDs
 */
declare const partitionValidIds: (ids: string[], validIds: string[]) => {
  valid: string[];
  invalid: string[];
};
/**
 * Checks if an object is complete (has properties) rather than empty.
 * This helps TypeScript narrow the type from CompleteOrEmpty<T> to T.
 *
 * @param obj The object to check, typed as CompleteOrEmpty<T>
 * @returns A boolean indicating if the object is complete (true) or empty (false)
 */
declare const isComplete: <T>(obj: CompleteOrEmpty<T>) => obj is T;
declare const convertRemToPixel: (rem: number) => number;
//#endregion
//#region src/cycle.d.ts
/**
 * Orders cycles based on their status
 * @param {ICycle[]} cycles - Array of cycles to be ordered
 * @param {boolean} sortByManual - Whether to sort by manual order
 * @returns {ICycle[]} Ordered array of cycles
 */
declare const orderCycles: (cycles: ICycle[], sortByManual: boolean) => ICycle[];
/**
 * Filters cycles based on provided filter criteria
 * @param {ICycle} cycle - The cycle to be filtered
 * @param {TCycleFilters} filter - Filter criteria to apply
 * @returns {boolean} Whether the cycle passes the filter
 */
declare const shouldFilterCycle: (cycle: ICycle, filter: TCycleFilters) => boolean;
declare const formatActiveCycle: (args: {
  cycle: ICycle;
  isBurnDown?: boolean | undefined;
  isTypeIssue?: boolean | undefined;
}) => {
  date: string;
}[] | {
  date: any;
  scope: any;
  completed: any;
  backlog: any;
  started: any;
  unstarted: any;
  cancelled: any;
  pending: number;
  ideal: number | null;
  actual: any;
}[];
/**
 * Calculates cycle progress percentage excluding cancelled issues from total count
 * Formula: completed / (total - cancelled) * 100
 * This gives accurate progress based on: pendingIssues = totalIssues - completedIssues - cancelledIssues
 * @param cycle - Cycle data object
 * @param estimateType - Whether to calculate based on "issues" or "points"
 * @param includeInProgress - Whether to include started/in-progress items in completion calculation
 * @returns Progress percentage (0-100)
 */
declare const calculateCycleProgress: (cycle: ICycle | undefined, estimateType?: "issues" | "points", includeInProgress?: boolean) => number;
//#endregion
//#region src/datetime.d.ts
/**
 * @returns {string | null} formatted date in the desired format or platform default format (MMM dd, yyyy)
 * @description Returns date in the formatted format
 * @param {Date | string} date
 * @param {string} formatToken (optional) // default MMM dd, yyyy
 * @example renderFormattedDate("2024-01-01", "MM-DD-YYYY") // Jan 01, 2024
 * @example renderFormattedDate("2024-01-01") // Jan 01, 2024
 */
declare const renderFormattedDate: (date: string | Date | undefined | null, formatToken?: string) => string | undefined;
/**
 * @returns {string} formatted date in the format of MMM dd
 * @description Returns date in the formatted format
 * @param {string | Date} date
 * @example renderShortDateFormat("2024-01-01") // Jan 01
 */
declare const renderFormattedDateWithoutYear: (date: string | Date) => string;
/**
 * @returns {string | null} formatted date in the format of yyyy-mm-dd to be used in payload
 * @description Returns date in the formatted format to be used in payload
 * @param {Date | string} date
 * @example renderFormattedPayloadDate("Jan 01, 20224") // "2024-01-01"
 */
declare const renderFormattedPayloadDate: (date: Date | string | undefined | null) => string | undefined;
/**
 * @returns {string} formatted date in the format of hh:mm a or HH:mm
 * @description Returns date in 12 hour format if in12HourFormat is true else 24 hour format
 * @param {string | Date} date
 * @param {boolean} timeFormat (optional) // default 24 hour
 * @example renderFormattedTime("2024-01-01 13:00:00") // 13:00
 * @example renderFormattedTime("2024-01-01 13:00:00", "12-hour") // 01:00 PM
 */
declare const renderFormattedTime: (date: string | Date, timeFormat?: "12-hour" | "24-hour") => string;
/**
 * @returns {number} total number of days in range
 * @description Returns total number of days in range
 * @param {string} startDate
 * @param {string} endDate
 * @param {boolean} inclusive
 * @example checkIfStringIsDate("2021-01-01", "2021-01-08") // 8
 */
declare const findTotalDaysInRange: (startDate: Date | string | undefined | null, endDate: Date | string | undefined | null, inclusive?: boolean) => number | undefined;
/**
 * Add number of days to the provided date and return a resulting new date
 * @param startDate
 * @param numberOfDays
 * @returns
 */
declare const addDaysToDate: (startDate: Date | string | undefined | null, numberOfDays: number) => Date | undefined;
/**
 * @returns {number} number of days left from today
 * @description Returns number of days left from today
 * @param {string | Date} date
 * @param {boolean} inclusive (optional) // default true
 * @example findHowManyDaysLeft("2024-01-01") // 3
 */
declare const findHowManyDaysLeft: (date: Date | string | undefined | null, inclusive?: boolean) => number | undefined;
/**
 * @returns {string} formatted date in the form of amount of time passed since the event happened
 * @description Returns time passed since the event happened
 * @param {string | Date} time
 * @example calculateTimeAgo("2023-01-01") // 1 year ago
 */
declare const calculateTimeAgo: (time: string | number | Date | null) => string;
declare function calculateTimeAgoShort(date: string | number | Date | null): string;
/**
 * @returns {string} boolean value depending on whether the date is greater than today
 * @description Returns boolean value depending on whether the date is greater than today
 * @param {string} dateStr
 * @example isDateGreaterThanToday("2024-01-01") // true
 */
declare const isDateGreaterThanToday: (dateStr: string) => boolean;
/**
 * @returns {number} week number of date
 * @description Returns week number of date
 * @param {Date} date
 * @example getWeekNumber(new Date("2023-09-01")) // 35
 */
declare const getWeekNumberOfDate: (date: Date) => number;
/**
 * @returns {boolean} boolean value depending on whether the dates are equal
 * @description Returns boolean value depending on whether the dates are equal
 * @param date1
 * @param date2
 * @example checkIfDatesAreEqual("2024-01-01", "2024-01-01") // true
 * @example checkIfDatesAreEqual("2024-01-01", "2024-01-02") // false
 */
declare const checkIfDatesAreEqual: (date1: Date | string | null | undefined, date2: Date | string | null | undefined) => boolean;
/**
 * This method returns a date from string of type yyyy-mm-dd
 * This method is recommended to use instead of new Date() as this does not introduce any timezone offsets
 * @param date
 * @returns date or undefined
 */
declare const getDate: (date: string | Date | undefined | null) => Date | undefined;
declare const isInDateFormat: (date: string) => boolean;
/**
 * returns the date string in ISO format regardless of the timezone in input date string
 * @param dateString
 * @returns
 */
declare const convertToISODateString: (dateString: string | undefined) => string | undefined;
/**
 * returns the date string in Epoch regardless of the timezone in input date string
 * @param dateString
 * @returns
 */
declare const convertToEpoch: (dateString: string | undefined) => string | number | undefined;
/**
 * get current Date time in UTC ISO format
 * @returns
 */
declare const getCurrentDateTimeInISO: () => string;
/**
 * @description converts hours and minutes to minutes
 * @param { number } hours
 * @param { number } minutes
 * @returns { number } minutes
 * @example convertHoursMinutesToMinutes(2, 30) // Output: 150
 */
declare const convertHoursMinutesToMinutes: (hours: number, minutes: number) => number;
/**
 * @description converts minutes to hours and minutes
 * @param { number } mins
 * @returns { number, number } hours and minutes
 * @example convertMinutesToHoursAndMinutes(150) // Output: { hours: 2, minutes: 30 }
 */
declare const convertMinutesToHoursAndMinutes: (mins: number) => {
  hours: number;
  minutes: number;
};
/**
 * @description converts minutes to hours and minutes string
 * @param { number } totalMinutes
 * @returns { string } 0h 0m
 * @example convertMinutesToHoursAndMinutes(150) // Output: 2h 10m
 */
declare const convertMinutesToHoursMinutesString: (totalMinutes: number) => string;
/**
 * @description calculates the read time for a document using the words count
 * @param {number} wordsCount
 * @returns {number} total number of seconds
 * @example getReadTimeFromWordsCount(400) // Output: 120
 * @example getReadTimeFromWordsCount(100) // Output: 30s
 */
declare const getReadTimeFromWordsCount: (wordsCount: number) => number;
/**
 * @description generates an array of dates between the start and end dates
 * @param startDate
 * @param endDate
 * @returns
 */
declare const generateDateArray: (startDate: string | Date, endDate: string | Date) => {
  date: string;
}[];
/**
 * Processes relative date strings like "1_weeks", "2_months" etc and returns a Date
 * @param value The relative date string (e.g., "1_weeks", "2_months")
 * @returns Date object representing the calculated date
 */
declare const processRelativeDate: (value: string) => Date;
/**
 * Parses a date filter string and returns the comparison type and date
 * @param filterValue The date filter string (e.g., "1_weeks;after;fromnow" or "2024-12-01;after")
 * @returns Object containing the comparison type and target date
 */
declare const parseDateFilter: (filterValue: string) => {
  type: "after" | "before";
  date: Date;
};
/**
 * Checks if a date meets the filter criteria
 * @param dateToCheck The date to check
 * @param filterDate The filter date to compare against
 * @param type The type of comparison ('after' or 'before')
 * @returns boolean indicating if the date meets the criteria
 */
declare const checkDateCriteria: (dateToCheck: Date | null, filterDate: Date, type: "after" | "before") => boolean;
/**
 * Formats merged date range display with smart formatting
 * - Single date: "Jan 24, 2025"
 * - Same year, same month: "Jan 24 - 28, 2025"
 * - Same year, different month: "Jan 24 - Feb 6, 2025"
 * - Different year: "Dec 28, 2024 - Jan 4, 2025"
 */
declare const formatDateRange: (parsedStartDate: Date | null | undefined, parsedEndDate: Date | null | undefined) => string;
/**
 * @returns {string} formatted duration in human readable format
 * @description Converts seconds to human readable duration format (e.g., "1 hr 20 min 5 sec" or "122.30 ms")
 * @param {number} seconds - The duration in seconds
 * @example formatDuration(3665) // "1 hr 1 min 5 sec"
 * @example formatDuration(125) // "2 min 5 sec"
 * @example formatDuration(45) // "45 sec"
 * @example formatDuration(0.1223094) // "122.31 ms"
 */
declare const formatDuration: (seconds: number | undefined | null) => string;
/**
 * Checks if a date is valid
 * @param date The date to check
 * @returns Whether the date is valid or not
 */
declare const isValidDate: (date: unknown) => date is string | Date;
//#endregion
//#region src/distribution-update.d.ts
type DistributionObjectUpdate = {
  id: string;
  completed_issues?: number;
  pending_issues?: number;
  total_issues: number;
  completed_estimates?: number;
  pending_estimates?: number;
  total_estimates: number;
};
type DistributionUpdates = {
  pathUpdates: {
    path: string[];
    value: number;
  }[];
  assigneeUpdates: DistributionObjectUpdate[];
  labelUpdates: DistributionObjectUpdate[];
};
/**
 * Get Distribution updates with the help of previous and next issue states
 * @param prevIssueState
 * @param nextIssueState
 * @param stateMap
 * @param estimatePointById
 * @returns
 */
declare const getDistributionPathsPostUpdate: (prevIssueState: TIssue | undefined, nextIssueState: TIssue | undefined, stateMap: Record<string, IState>, estimatePointById?: (estimatePointId: string) => IEstimatePoint | undefined) => DistributionUpdates;
/**
 * Method to update distribution of either cycle or module object
 * @param distributionObject
 * @param distributionUpdates
 */
declare const updateDistribution: (distributionObject: ICycle | IModule, distributionUpdates: DistributionUpdates) => void;
//#endregion
//#region src/editor/common.d.ts
type TEditorSrcArgs = {
  assetId: string;
  projectId?: string;
  workspaceSlug: string;
};
/**
 * @description generate the file source using assetId
 * @param {TEditorSrcArgs} args
 */
declare const getEditorAssetSrc: (args: TEditorSrcArgs) => string | undefined;
/**
 * @description generate the file source using assetId
 * @param {TEditorSrcArgs} args
 */
declare const getEditorAssetDownloadSrc: (args: TEditorSrcArgs) => string | undefined;
declare const getTextContent: (jsx: React.ReactNode | null | undefined) => string;
declare const isEditorEmpty: (description: string | undefined) => boolean;
declare enum CORE_EXTENSIONS {
  BLOCKQUOTE = "blockquote",
  BOLD = "bold",
  BULLET_LIST = "bulletList",
  CALLOUT = "calloutComponent",
  CHARACTER_COUNT = "characterCount",
  CODE_BLOCK = "codeBlock",
  CODE_INLINE = "code",
  CUSTOM_COLOR = "customColor",
  CUSTOM_IMAGE = "imageComponent",
  CUSTOM_LINK = "link",
  DOCUMENT = "doc",
  DROP_CURSOR = "dropCursor",
  ENTER_KEY = "enterKey",
  GAP_CURSOR = "gapCursor",
  HARD_BREAK = "hardBreak",
  HEADING = "heading",
  HEADINGS_LIST = "headingsList",
  HISTORY = "history",
  HORIZONTAL_RULE = "horizontalRule",
  IMAGE = "image",
  ITALIC = "italic",
  LIST_ITEM = "listItem",
  MARKDOWN_CLIPBOARD = "markdownClipboard",
  MENTION = "mention",
  ORDERED_LIST = "orderedList",
  PARAGRAPH = "paragraph",
  PLACEHOLDER = "placeholder",
  SIDE_MENU = "editorSideMenu",
  SLASH_COMMANDS = "slash-command",
  STRIKETHROUGH = "strike",
  TABLE = "table",
  TABLE_CELL = "tableCell",
  TABLE_HEADER = "tableHeader",
  TABLE_ROW = "tableRow",
  TASK_ITEM = "taskItem",
  TASK_LIST = "taskList",
  TEXT_ALIGN = "textAlign",
  TEXT_STYLE = "textStyle",
  TYPOGRAPHY = "typography",
  UNDERLINE = "underline",
  UTILITY = "utility",
  WORK_ITEM_EMBED = "issue-embed-component",
  EMOJI = "emoji",
}
declare enum ADDITIONAL_EXTENSIONS {}
//#endregion
//#region src/editor/markdown-parser/types.d.ts
type TCoreCustomComponentsMetaData = {
  file_assets: {
    id: string;
    name: string;
    url: string;
  }[];
  user_mentions: {
    id: string;
    display_name: string;
    url: string;
  }[];
};
type TExtendedCustomComponentsMetaData = unknown;
type TCustomComponentsMetaData = TCoreCustomComponentsMetaData & TExtendedCustomComponentsMetaData;
//#endregion
//#region src/editor/markdown-parser/root.d.ts
type TArgs = {
  description_html: string;
  metaData: TCustomComponentsMetaData;
  name?: string;
};
declare function convertHTMLToMarkdown(args: TArgs): string;
//#endregion
//#region src/emoji.d.ts
/**
 * Converts a hyphen-separated hexadecimal emoji code to its decimal representation
 * @param {string} emojiUnified - The unified emoji code in hexadecimal format (e.g., "1f600" or "1f1e6-1f1e8")
 * @returns {string} The decimal representation of the emoji code (e.g., "128512" or "127462-127464")
 * @example
 * convertHexEmojiToDecimal("1f600") // returns "128512"
 * convertHexEmojiToDecimal("1f1e6-1f1e8") // returns "127462-127464"
 * convertHexEmojiToDecimal("") // returns ""
 */
declare const convertHexEmojiToDecimal: (emojiUnified: string) => string;
/**
 * Converts a hyphen-separated decimal emoji code back to its hexadecimal representation
 * @param {string} emoji - The emoji code in decimal format (e.g., "128512" or "127462-127464")
 * @returns {string} The hexadecimal representation of the emoji code (e.g., "1f600" or "1f1e6-1f1e8")
 * @example
 * emojiCodeToUnicode("128512") // returns "1f600"
 * emojiCodeToUnicode("127462-127464") // returns "1f1e6-1f1e8"
 * emojiCodeToUnicode("") // returns ""
 */
declare const emojiCodeToUnicode: (emoji: string) => string;
/**
 * Groups reactions by a specified key
 * @param {any[]} reactions - Array of reaction objects
 * @param {string} key - Key to group reactions by
 * @returns {Object} Object with reactions grouped by the specified key
 */
declare const groupReactions: (reactions: any[], key: string) => {
  [key: string]: any[];
};
/**
 * Returns a random emoji code from the RANDOM_EMOJI_CODES array
 * @returns {string} A random emoji code
 */
declare const getRandomEmoji: () => string;
//#endregion
//#region src/estimates.d.ts
declare const isEstimatePointValuesRepeated: (estimatePoints: string[], estimateType: EEstimateSystem, newEstimatePoint?: string) => boolean;
//#endregion
//#region src/file.d.ts
/**
 * @description combine the file path with the base URL
 * @param {string} path
 * @returns {string} final URL with the base URL
 */
declare const getFileURL: (path: string) => string | undefined;
/**
 * @description this function returns the assetId from the asset source
 * @param {string} src
 * @returns {string} assetId
 */
declare const getAssetIdFromUrl: (src: string) => string;
/**
 * @description encode image via URL to base64
 * @param {string} url
 * @returns
 */
declare const getBase64Image: (url: string) => Promise<string>;
/**
 * @description downloads a CSV file
 * @param {Array<Array<string>> | { [key: string]: string }} data - The data to be exported to CSV
 * @param {string} name - The name of the file to be downloaded
 */
declare const csvDownload: (data: Array<Array<string>> | {
  [key: string]: string;
}, name: string) => void;
//#endregion
//#region src/filter.d.ts
/**
 * @description calculates the total number of filters applied
 * @param {T} filters
 * @returns {number}
 */
declare const calculateTotalFilters: <T>(filters: T) => number;
/**
 * @description checks if the date satisfies the filter
 * @param {Date} date
 * @param {string} filter
 * @returns {boolean}
 */
declare const satisfiesDateFilter: (date: Date, filter: string) => boolean;
//#endregion
//#region src/get-icon-for-link.d.ts
declare const getIconForLink: (url: string) => react0.ForwardRefExoticComponent<Omit<lucide_react0.LucideProps, "ref"> & react0.RefAttributes<SVGSVGElement>>;
//#endregion
//#region src/intake.d.ts
declare const getCustomDates: (duration: EPastDurationFilters) => string;
//#endregion
//#region src/loader.d.ts
declare const isLoaderReady: (loader: TLoader | undefined) => loader is "mutation" | "pagination" | "loaded" | undefined;
//#endregion
//#region src/math.d.ts
declare const getProgress: (completed: number | undefined, total: number | undefined) => number;
//#endregion
//#region src/module.d.ts
/**
 * @description orders modules based on their status
 * @param {IModule[]} modules
 * @param {TModuleOrderByOptions | undefined} orderByKey
 * @returns {IModule[]}
 */
declare const orderModules: (modules: IModule[], orderByKey: TModuleOrderByOptions | undefined) => IModule[];
/**
 * @description filters modules based on the filters
 * @param {IModule} module
 * @param {TModuleDisplayFilters} displayFilters
 * @param {TModuleFilters} filters
 * @returns {boolean}
 */
declare const shouldFilterModule: (module: IModule, displayFilters: TModuleDisplayFilters, filters: TModuleFilters) => boolean;
//#endregion
//#region src/notification.d.ts
declare const sanitizeCommentForNotification: (mentionContent: string | undefined) => string | undefined;
//#endregion
//#region src/page.d.ts
/**
 * @description filters pages based on the page type
 * @param {TPageNavigationTabs} pageType
 * @param {TPage[]} pages
 * @returns {TPage[]}
 */
declare const filterPagesByPageType: (pageType: TPageNavigationTabs, pages: TPage[]) => TPage[];
/**
 * @description orders pages based on their status
 * @param {TPage[]} pages
 * @param {TPageFiltersSortKey | undefined} sortByKey
 * @param {TPageFiltersSortBy} sortByOrder
 * @returns {TPage[]}
 */
declare const orderPages: (pages: TPage[], sortByKey: TPageFiltersSortKey | undefined, sortByOrder: TPageFiltersSortBy) => TPage[];
/**
 * @description filters pages based on the filters
 * @param {TPage} page
 * @param {TPageFilterProps | undefined} filters
 * @returns {boolean}
 */
declare const shouldFilterPage: (page: TPage, filters: TPageFilterProps | undefined) => boolean;
/**
 * @description returns the name of the project after checking for untitled page
 * @param {string | undefined} name
 * @returns {string}
 */
declare const getPageName: (name: string | undefined) => string;
//#endregion
//#region src/permission/role.d.ts
declare const getUserRole: (role: EUserPermissions | EUserWorkspaceRoles | EUserProjectRoles) => "GUEST" | "MEMBER" | "ADMIN" | undefined;
type TSupportedRole = EUserPermissions | EUserProjectRoles | EUserWorkspaceRoles;
/**
 * @description Returns the highest role from an array of supported roles
 * @param { TSupportedRole[] } roles
 * @returns { TSupportedRole | undefined }
 */
declare const getHighestRole: <T extends TSupportedRole>(roles: T[]) => T | undefined;
//#endregion
//#region src/project-views.d.ts
/**
 * order views base on TViewFiltersSortKey
 * @param views
 * @param sortByKey
 * @param sortByOrder
 * @returns
 */
declare const orderViews: (views: IProjectView[], sortByKey: TViewFiltersSortKey | undefined, sortByOrder: TViewFiltersSortBy) => IProjectView[];
/**
 * Checks if the passed down view should be filtered or not
 * @param view
 * @param filters
 * @returns
 */
declare const shouldFilterView: (view: IProjectView, filters: TViewFilterProps | undefined) => boolean;
/**
 * @description returns the name of the project after checking for untitled view
 * @param {string | undefined} name
 * @returns {string}
 */
declare const getViewName: (name: string | undefined) => string;
/**
 * Adds validation for the view creation filters
 * @param data
 * @returns
 */
declare const getValidatedViewFilters: (data: Partial<IProjectView>) => Partial<IProjectView>;
/**
 * returns published view link
 * @param anchor
 * @returns
 */
declare const getPublishViewLink: (anchor: string | undefined) => string | undefined;
//#endregion
//#region src/project.d.ts
/**
 * Updates the sort order of the project.
 * @param sortIndex
 * @param destinationIndex
 * @param projectId
 * @returns number | undefined
 */
declare const orderJoinedProjects: (sourceIndex: number, destinationIndex: number, currentProjectId: string, joinedProjects: TProject[]) => number | undefined;
declare const projectIdentifierSanitizer: (identifier: string) => string;
/**
 * @description filters projects based on the filter
 * @param {TProject} project
 * @param {TProjectFilters} filters
 * @param {TProjectDisplayFilters} displayFilters
 * @returns {boolean}
 */
declare const shouldFilterProject: (project: TProject, displayFilters: TProjectDisplayFilters, filters: TProjectFilters) => boolean;
/**
 * @description orders projects based on the orderByKey
 * @param {TProject[]} projects
 * @param {TProjectOrderByOptions | undefined} orderByKey
 * @returns {TProject[]}
 */
declare const orderProjects: (projects: TProject[], orderByKey: TProjectOrderByOptions | undefined) => TProject[];
//#endregion
//#region src/rich-filters/factories/configs/shared.d.ts
/**
 * Helper to create a type-safe filter config
 * @param config - The filter config to create
 * @returns The created filter config
 */
declare const createFilterConfig: <P extends TFilterProperty, V extends TFilterValue>(config: TFilterConfig<P, V>) => TFilterConfig<P, V>;
/**
 * Base parameters for filter type config factory functions.
 * - operator: The operator to use for the filter.
 */
type TCreateFilterConfigParams = Omit<TBaseFilterFieldConfig, "isOperatorEnabled"> & {
  isEnabled: boolean;
  allowedOperators: Set<TSupportedOperators>;
  rightContent?: React.ReactNode;
  tooltipContent?: React.ReactNode;
};
/**
 * Type for filter icon type
 */
type TFilterIconType = string | number | boolean | object | undefined;
/**
 * Icon configuration for filters and their options.
 * - filterIcon: Optional icon for the filter
 * - getOptionIcon: Function to get icon for specific option values
 */
interface IFilterIconConfig<T extends TFilterIconType = undefined> {
  filterIcon?: React.FC<React.SVGAttributes<SVGElement>>;
  getOptionIcon?: (value: T) => React.ReactNode;
}
/**
 * Date filter config params
 */
type TCreateDateFilterParams = TCreateFilterConfigParams & IFilterIconConfig<Date>;
/**
 * Helper to create an operator entry for the supported operators map.
 * This ensures consistency between the operator key and the operator passed to the config function.
 * @param operator - The operator to use as both key and parameter
 * @param createParams - The base filter configuration parameters
 * @param configFn - Function that creates the operator config using base configuration
 * @returns A tuple of operator and its config
 */
declare const createOperatorConfigEntry: <T, P extends TCreateFilterConfigParams>(operator: TSupportedOperators, createParams: P, configFn: (updatedParams: P) => T) => [TSupportedOperators, T];
/**
 * Factory function signature for creating filter configurations.
 */
type TCreateFilterConfig<P extends TFilterProperty, T> = (params: T) => TFilterConfig<P>;
/**
 * Helper to create a type-safe filter field config
 * @param config - The filter field config to create
 * @returns The created filter field config
 */
declare const createFilterFieldConfig: <T extends TFilterFieldType, V extends TFilterValue>(config: T extends typeof FILTER_FIELD_TYPE.SINGLE_SELECT ? TSingleSelectFilterFieldConfig<V> : T extends typeof FILTER_FIELD_TYPE.MULTI_SELECT ? TMultiSelectFilterFieldConfig<V> : T extends typeof FILTER_FIELD_TYPE.DATE ? TDateFilterFieldConfig<V> : T extends typeof FILTER_FIELD_TYPE.DATE_RANGE ? TDateRangeFilterFieldConfig<V> : never) => TSupportedFilterFieldConfigs<V>;
//#endregion
//#region src/rich-filters/factories/configs/core.d.ts
/**
 * Options transformation interface for selection filters
 */
interface TOptionTransforms<TItem, TValue extends TFilterValue = string, TIconData = undefined> {
  items: TItem[];
  getId: (item: TItem) => string;
  getLabel: (item: TItem) => string;
  getValue: (item: TItem) => TValue;
  getIconData?: (item: TItem) => TIconData;
}
/**
 * Single-select filter configuration
 */
type TSingleSelectConfig<TValue extends TFilterValue = string> = TBaseFilterFieldConfig & {
  defaultValue?: TValue;
};
/**
 * Helper to get the single select config
 * @param transforms - How to transform items into options
 * @param config - Single-select specific configuration
 * @param iconConfig - Icon configuration for options
 * @returns The single select config
 */
declare const getSingleSelectConfig: <TItem, TValue extends TFilterValue = string, TIconData extends string | number | boolean | object | undefined = undefined>(transforms: TOptionTransforms<TItem, TValue, TIconData>, config: TSingleSelectConfig<TValue>, iconConfig?: IFilterIconConfig<TIconData>) => _plane_types7.TCoreFilterFieldConfigs<TValue>;
/**
 * Multi-select filter configuration
 */
type TMultiSelectConfig<TValue extends TFilterValue = string> = TBaseFilterFieldConfig & {
  defaultValue?: TValue[];
  singleValueOperator: TSupportedOperators;
};
/**
 * Helper to get the multi select config
 * @param transforms - How to transform items into options
 * @param config - Multi-select specific configuration
 * @param iconConfig - Icon configuration for options
 * @returns The multi select config
 */
declare const getMultiSelectConfig: <TItem, TValue extends TFilterValue = string, TIconData extends string | number | boolean | object | undefined = undefined>(transforms: TOptionTransforms<TItem, TValue, TIconData>, config: TMultiSelectConfig<TValue>, iconConfig?: IFilterIconConfig<TIconData>) => _plane_types7.TCoreFilterFieldConfigs<TValue>;
/**
 * Date filter configuration
 */
type TDateConfig = TBaseFilterFieldConfig & {
  min?: Date;
  max?: Date;
};
/**
 * Date range filter configuration
 */
type TDateRangeConfig = TBaseFilterFieldConfig & {
  min?: Date;
  max?: Date;
};
/**
 * Helper to get the date picker config
 * @param config - Date-specific configuration
 * @returns The date picker config
 */
declare const getDatePickerConfig: (config: TDateConfig) => _plane_types7.TCoreFilterFieldConfigs<Date>;
/**
 * Helper to get the date range picker config
 * @param config - Date range-specific configuration
 * @returns The date range picker config
 */
declare const getDateRangePickerConfig: (config: TDateRangeConfig) => _plane_types7.TCoreFilterFieldConfigs<Date>;
//#endregion
//#region src/rich-filters/factories/configs/properties/shared.d.ts
/**
 * User filter specific params
 */
type TCreateUserFilterParams = TCreateFilterConfigParams & IFilterIconConfig<IUserLite> & {
  members: IUserLite[];
};
/**
 * Helper to get the member multi select config
 * @param params - The filter params
 * @returns The member multi select config
 */
declare const getMemberMultiSelectConfig: (params: TCreateUserFilterParams, singleValueOperator: TSupportedOperators) => _plane_types7.TCoreFilterFieldConfigs<string>;
declare const getSupportedDateOperators: (params: TCreateDateFilterParams) => TOperatorConfigMap<Date>;
/**
 * Project filter specific params
 */
type TCreateProjectFilterParams = TCreateFilterConfigParams & IFilterIconConfig<IProject> & {
  projects: IProject[];
};
/**
 * Helper to get the project multi select config
 * @param params - The filter params
 * @returns The member multi select config
 */
declare const getProjectMultiSelectConfig: (params: TCreateProjectFilterParams, singleValueOperator: TSupportedOperators) => _plane_types7.TCoreFilterFieldConfigs<string>;
/**
 * Custom property filter specific params
 */
type TCustomPropertyFilterParams<T extends TFilterIconType> = TCreateFilterConfigParams & IFilterIconConfig<T> & {
  propertyDisplayName: string;
};
//#endregion
//#region src/rich-filters/factories/configs/properties/date.d.ts
/**
 * Date property filter specific params
 */
type TCreateDatePropertyFilterParams = TCustomPropertyFilterParams<Date> & TCreateDateFilterParams;
/**
 * Get the date property filter config
 * @param params - The filter params
 * @returns The date property filter config
 */
declare const getDatePropertyFilterConfig: <P extends TFilterProperty>(key: P) => TCreateFilterConfig<P, TCreateDatePropertyFilterParams>;
//#endregion
//#region src/rich-filters/factories/configs/properties/member-picker.d.ts
/**
 * Member picker property filter specific params
 */
type TCreateMemberPickerPropertyFilterParams = TCustomPropertyFilterParams<IUserLite> & TCreateUserFilterParams;
/**
 * Get the member picker property filter config
 * @param params - The filter params
 * @returns The member picker property filter config
 */
declare const getMemberPickerPropertyFilterConfig: <P extends TFilterProperty>(key: P) => TCreateFilterConfig<P, TCreateMemberPickerPropertyFilterParams>;
//#endregion
//#region src/rich-filters/factories/nodes/core.d.ts
/**
 * Creates a condition node with a unique ID.
 * @param condition - The condition to create
 * @returns The created condition node
 */
declare const createConditionNode: <P extends TFilterProperty, V extends TFilterValue>(condition: TFilterConditionPayload<P, V>) => TFilterConditionNode<P, V>;
/**
 * Creates an AND group node with a unique ID.
 * @param nodes - The nodes to add to the group
 * @returns The created AND group node
 */
declare const createAndGroupNode: <P extends TFilterProperty>(nodes: TFilterExpression<P>[]) => TFilterAndGroupNode<P>;
//#endregion
//#region src/rich-filters/operations/comparison.d.ts
/**
 * Creates a comparable representation of a group for deep comparison.
 * This recursively creates comparable representations for all children.
 * IDs are completely excluded to avoid UUID comparison issues.
 * Uses processGroupNode for consistent group type handling.
 * @param group - The group to create a comparable representation for
 * @returns A comparable object without ID
 */
declare const createGroupComparable: <P extends TFilterProperty>(group: TFilterGroupNode<P>) => Record<string, unknown>;
/**
 * Creates a comparable representation of any filter expression.
 * Recursively handles deep nesting of groups within groups.
 * Completely excludes IDs from comparison to avoid UUID issues.
 * @param expression - The expression to create a comparable representation for
 * @returns A comparable object without IDs or null if the expression is empty
 */
declare const createExpressionComparable: <P extends TFilterProperty>(expression: TFilterExpression<P> | null) => Record<string, unknown> | null;
/**
 * Normalizes a filter expression by removing empty conditions and groups.
 * This helps compare expressions by focusing only on meaningful content.
 * Uses the transformExpressionTree utility for consistent tree processing.
 * @param expression - The filter expression to normalize
 * @returns The normalized expression or null if the entire expression is empty
 */
declare const normalizeFilterExpression: <P extends TFilterProperty>(expression: TFilterExpression<P> | null) => TFilterExpression<P> | null;
/**
 * Performs a deep comparison of two filter expressions based on their meaningful content.
 * This comparison completely ignores IDs (UUIDs) and focuses on property, operator, value, and tree structure.
 * Empty conditions and groups are normalized before comparison.
 * Supports deep nesting of groups within groups recursively.
 * @param expression1 - The first expression to compare
 * @param expression2 - The second expression to compare
 * @returns True if the expressions are meaningfully equal, false otherwise
 */
declare const deepCompareFilterExpressions: <P extends TFilterProperty>(expression1: TFilterExpression<P> | null, expression2: TFilterExpression<P> | null) => boolean;
//#endregion
//#region src/rich-filters/operations/manipulation/core.d.ts
/**
 * Adds an AND condition to the filter expression.
 * @param expression - The current filter expression
 * @param condition - The condition to add
 * @returns The updated filter expression
 */
declare const addAndCondition: <P extends TFilterProperty>(expression: TFilterExpression<P> | null, condition: TFilterExpression<P>) => TFilterExpression<P>;
/**
 * Replaces a node in the expression tree with another node.
 * Uses transformExpressionTree for consistent tree processing and better maintainability.
 * @param expression - The expression tree to search in
 * @param targetId - The ID of the node to replace
 * @param replacement - The node to replace with
 * @returns The updated expression tree
 */
declare const replaceNodeInExpression: <P extends TFilterProperty>(expression: TFilterExpression<P>, targetId: string, replacement: TFilterExpression<P>) => TFilterExpression<P>;
/**
 * Updates a node in the filter expression.
 * Uses recursive tree traversal with proper type handling.
 * @param expression - The filter expression to update
 * @param targetId - The id of the node to update
 * @param updates - The updates to apply to the node
 */
declare const updateNodeInExpression: <P extends TFilterProperty>(expression: TFilterExpression<P>, targetId: string, updates: Partial<TFilterConditionPayload<P, TFilterValue>>) => void;
/**
 * Unwraps a group if it meets the unwrapping criteria, otherwise returns the group.
 * @param group - The group node to potentially unwrap
 * @param preserveNotGroups - Whether to preserve NOT groups even with single children
 * @returns The unwrapped child or the original group
 */
declare const unwrapGroupIfNeeded: <P extends TFilterProperty>(group: TFilterGroupNode<P>, preserveNotGroups?: boolean) => TFilterExpression<P>;
//#endregion
//#region src/rich-filters/operations/transformation/core.d.ts
/**
 * Generic tree transformation result type
 */
type TTreeTransformResult<P extends TFilterProperty> = {
  expression: TFilterExpression<P> | null;
  shouldNotify?: boolean;
};
/**
 * Transform function type for tree processing
 */
type TTreeTransformFn<P extends TFilterProperty> = (expression: TFilterExpression<P>) => TTreeTransformResult<P>;
/**
 * Transforms groups with children by processing all children.
 * Handles child collection, null filtering, and empty group removal.
 */
declare const transformGroupWithChildren: <P extends TFilterProperty>(group: TFilterGroupNode<P>, transformFn: TTreeTransformFn<P>) => TTreeTransformResult<P>;
/**
 * Generic recursive tree transformer that handles common tree manipulation logic.
 * This function provides a reusable way to transform expression trees while maintaining
 * tree integrity, handling group restructuring, and applying stabilization.
 *
 * @param expression - The expression to transform
 * @param transformFn - Function that defines the transformation logic for each node
 * @returns The transformation result with expression and metadata
 */
declare const transformExpressionTree: <P extends TFilterProperty>(expression: TFilterExpression<P> | null, transformFn: TTreeTransformFn<P>) => TTreeTransformResult<P>;
/**
 * Removes a node from the filter expression.
 * @param expression - The filter expression to remove the node from
 * @param targetId - The id of the node to remove
 * @returns An object containing the updated filter expression and whether to notify about the change
 */
declare const removeNodeFromExpression: <P extends TFilterProperty>(expression: TFilterExpression<P>, targetId: string) => {
  expression: TFilterExpression<P> | null;
  shouldNotify: boolean;
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
declare const sanitizeAndStabilizeExpression: <P extends TFilterProperty>(expression: TFilterExpression<P> | null) => TFilterExpression<P> | null;
//#endregion
//#region src/rich-filters/operations/traversal/core.d.ts
/**
 * Generic tree visitor function type
 */
type TreeVisitorFn<P extends TFilterProperty, T> = (expression: TFilterExpression<P>, parent?: TFilterGroupNode<P>, depth?: number) => T | null;
/**
 * Tree traversal modes
 */
declare enum TreeTraversalMode {
  /** Visit all nodes depth-first */
  ALL = "ALL",
  /** Visit only condition nodes */
  CONDITIONS = "CONDITIONS",
  /** Visit only group nodes */
  GROUPS = "GROUPS",
}
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
declare const traverseExpressionTree: <P extends TFilterProperty, T>(expression: TFilterExpression<P> | null, visitor: TreeVisitorFn<P, T>, mode?: TreeTraversalMode, parent?: TFilterGroupNode<P>, depth?: number) => T[];
/**
 * Finds a node by its ID in the filter expression tree.
 * Uses the generic tree traversal utility for better maintainability.
 * @param expression - The filter expression to search in
 * @param targetId - The ID of the node to find
 * @returns The found node or null if not found
 */
declare const findNodeById: <P extends TFilterProperty>(expression: TFilterExpression<P>, targetId: string) => TFilterExpression<P> | null;
/**
 * Finds the parent chain of a given node ID in the filter expression tree.
 * @param expression - The filter expression to search in
 * @param targetId - The ID of the node whose parent chain to find
 * @param currentPath - Current path of parent nodes (used internally for recursion)
 * @returns Array of parent nodes from immediate parent to root, or null if not found
 */
declare const findParentChain: <P extends TFilterProperty>(expression: TFilterExpression<P>, targetId: string, currentPath?: TFilterGroupNode<P>[]) => TFilterGroupNode<P>[] | null;
/**
 * Finds the immediate parent node of a given node ID.
 * @param expression - The filter expression to find parent in
 * @param targetId - The ID of the node whose parent to find
 * @returns The immediate parent node or null if not found or if the target is the root
 */
declare const findImmediateParent: <P extends TFilterProperty>(expression: TFilterExpression<P>, targetId: string) => TFilterGroupNode<P> | null;
/**
 * Extracts all conditions from a filter expression.
 * Uses the generic tree traversal utility for better maintainability and consistency.
 * @param expression - The filter expression to extract conditions from
 * @returns An array of filter conditions
 */
declare const extractConditions: <P extends TFilterProperty>(expression: TFilterExpression<P>) => TFilterConditionNode<P, TFilterValue>[];
/**
 * Extracts all conditions from a filter expression, including their display operators.
 * @param expression - The filter expression to extract conditions from
 * @returns An array of filter conditions with their display operators
 */
declare const extractConditionsWithDisplayOperators: <P extends TFilterProperty>(expression: TFilterExpression<P>) => TFilterConditionNodeForDisplay<P, TFilterValue>[];
/**
 * Finds all conditions by property and operator.
 * @param expression - The filter expression to search in
 * @param property - The property to find the conditions by
 * @param operator - The operator to find the conditions by
 * @returns An array of conditions that match the property and operator
 */
declare const findConditionsByPropertyAndOperator: <P extends TFilterProperty>(expression: TFilterExpression<P>, property: P, operator: TAllAvailableOperatorsForDisplay) => TFilterConditionNodeForDisplay<P, TFilterValue>[];
//#endregion
//#region src/rich-filters/operators/core.d.ts
/**
 * Get the label for a filter operator
 * @param operator - The operator to get the label for
 * @returns The label for the operator
 */
declare const getOperatorLabel: (operator: TAllAvailableOperatorsForDisplay | undefined) => string;
/**
 * Get the label for a date filter operator
 * @param operator - The operator to get the label for
 * @returns The label for the operator
 */
declare const getDateOperatorLabel: (operator: TAllAvailableDateFilterOperatorsForDisplay | undefined) => string;
/**
 * Type guard to check if an operator supports date filter types.
 * @param operator - The operator to check
 * @returns True if the operator supports date filters
 */
declare const isDateFilterOperator: <V extends TFilterValue = TFilterValue>(operator: TAllAvailableOperatorsForDisplay) => operator is TAllAvailableDateFilterOperatorsForDisplay<V>;
//#endregion
//#region src/rich-filters/operators/shared.d.ts
/**
 * Result type for operator conversion
 */
type TOperatorForPayload = {
  operator: TSupportedOperators;
  isNegation: boolean;
};
/**
 * Converts a display operator to the format needed for supported by filter expression condition.
 * @param displayOperator - The operator from the UI
 * @returns Object with supported operator and negation flag
 */
declare const getOperatorForPayload: (displayOperator: TAllAvailableOperatorsForDisplay) => TOperatorForPayload;
//#endregion
//#region src/rich-filters/types/core.d.ts
/**
 * Type guard to check if a node is a condition node.
 * @param node - The node to check
 * @returns True if the node is a condition node
 */
declare const isConditionNode: <P extends TFilterProperty, V extends TFilterValue>(node: TFilterExpression<P>) => node is TFilterConditionNode<P, V>;
/**
 * Type guard to check if a node is a group node.
 * @param node - The node to check
 * @returns True if the node is a group node
 */
declare const isGroupNode: <P extends TFilterProperty>(node: TFilterExpression<P>) => node is TFilterGroupNode<P>;
/**
 * Type guard to check if a group node is an AND group.
 * @param group - The group node to check
 * @returns True if the group is an AND group
 */
declare const isAndGroupNode: <P extends TFilterProperty>(group: TFilterGroupNode<P>) => group is TFilterAndGroupNode<P>;
/**
 * Type guard to check if a group node has children property
 * @param group - The group node to check
 * @returns True if the group has children property
 */
declare const hasChildrenProperty: <P extends TFilterProperty>(group: TFilterGroupNode<P>) => group is TFilterAndGroupNode<P>;
/**
 * Safely gets the children array from an AND group node.
 * @param group - The AND group node
 * @returns The children array
 */
declare const getAndGroupChildren: <P extends TFilterProperty>(group: TFilterAndGroupNode<P>) => TFilterExpression<P>[];
/**
 * Type guard to check if a filter type is a date filter type.
 * @param type - The filter type to check
 * @returns True if the filter type is a date filter type
 */
declare const isDateFilterType: (type: TFilterFieldType) => type is typeof FILTER_FIELD_TYPE.DATE | typeof FILTER_FIELD_TYPE.DATE_RANGE;
//#endregion
//#region src/rich-filters/types/shared.d.ts
type TProcessGroupNodeHandlers<P extends TFilterProperty, T> = {
  onAndGroup: (group: TFilterAndGroupNode<P>) => T;
};
/**
 * Generic helper to process group nodes with type-safe handlers.
 * @param group - The group node to process
 * @param handlers - Object with handlers for each group type
 * @returns Result of the appropriate handler
 */
declare const processGroupNode: <P extends TFilterProperty, T>(group: TFilterGroupNode<P>, handlers: TProcessGroupNodeHandlers<P, T>) => T;
/**
 * Gets the children of a group node, handling AND/OR groups (children array) and NOT groups (single child).
 * Uses processGroupNode for consistent group type handling.
 * @param group - The group node to get children from
 * @returns Array of child expressions
 */
declare const getGroupChildren: <P extends TFilterProperty>(group: TFilterGroupNode<P>) => TFilterExpression<P>[];
//#endregion
//#region src/rich-filters/validators/core.d.ts
/**
 * Determines whether to notify about a change based on the filter value.
 * @param value - The filter value to check
 * @returns True if we should notify, false otherwise
 */
declare const hasValidValue: (value: SingleOrArray<TFilterValue>) => boolean;
/**
 * Determines whether to notify about a change based on the entire filter expression.
 * @param expression - The filter expression to check
 * @returns True if we should notify, false otherwise
 */
declare const shouldNotifyChangeForExpression: <P extends TFilterProperty>(expression: TFilterExpression<P> | null) => boolean;
//#endregion
//#region src/rich-filters/validators/shared.d.ts
/**
 * Determines if a group should be unwrapped based on the number of children and group type.
 * @param group - The group node to check
 * @param preserveNotGroups - Whether to preserve NOT groups even with single children
 * @returns True if the group should be unwrapped, false otherwise
 */
declare const shouldUnwrapGroup: <P extends TFilterProperty>(group: TFilterGroupNode<P>, _preserveNotGroups?: boolean) => boolean;
//#endregion
//#region src/rich-filters/values/core.d.ts
/**
 * Converts any value to a non-null array for UI components that expect arrays
 * Returns empty array for null/undefined values
 */
declare const toFilterArray: <V extends TFilterValue>(value: SingleOrArray<V>) => NonNullable<V>[];
/**
 * Gets the length of a filter value
 */
declare const getFilterValueLength: <V extends TFilterValue>(value: SingleOrArray<V>) => number;
//#endregion
//#region src/router.d.ts
declare const generateQueryParams: (searchParams: URLSearchParams, excludedParamKeys?: string[]) => string;
//#endregion
//#region src/string.d.ts
/**
 * @description Adds space between camelCase words
 * @param {string} str - String to add spaces to
 * @returns {string} String with spaces between camelCase words
 * @example
 * addSpaceIfCamelCase("camelCase") // returns "camel Case"
 * addSpaceIfCamelCase("thisIsATest") // returns "this Is A Test"
 */
declare const addSpaceIfCamelCase: (str: string) => string;
/**
 * @description Replaces underscores with spaces in snake_case strings
 * @param {string} str - String to replace underscores in
 * @returns {string} String with underscores replaced by spaces
 * @example
 * replaceUnderscoreIfSnakeCase("snake_case") // returns "snake case"
 */
declare const replaceUnderscoreIfSnakeCase: (str: string) => string;
/**
 * @description Truncates text to specified length and adds ellipsis
 * @param {string} str - String to truncate
 * @param {number} length - Maximum length before truncation
 * @returns {string} Truncated string with ellipsis if needed
 * @example
 * truncateText("This is a long text", 7) // returns "This is..."
 */
declare const truncateText: (str: string, length: number) => string;
/**
 * @description Creates a similar string by randomly shuffling characters
 * @param {string} str - String to shuffle
 * @returns {string} Shuffled string with same characters
 * @example
 * createSimilarString("hello") // might return "olleh" or "lehol"
 */
declare const createSimilarString: (str: string) => string;
/**
 * @description Copies full URL (origin + path) to clipboard
 * @param {string} path - URL path to copy
 * @returns {Promise<void>} Promise that resolves when copying is complete
 * @example
 * await copyUrlToClipboard("issues/123") // copies "https://example.com/issues/123"
 */
declare const copyUrlToClipboard: (path: string) => Promise<void>;
/**
 * @description Gets first character of first word or first characters of first two words
 * @param {string} str - Input string
 * @returns {string} First character(s)
 * @example
 * getFirstCharacters("John") // returns "J"
 * getFirstCharacters("John Doe") // returns "JD"
 */
declare const getFirstCharacters: (str: string) => string;
/**
 * @description Formats number count, showing "99+" for numbers over 99
 * @param {number} number - Number to format
 * @returns {string} Formatted number string
 * @example
 * getNumberCount(50) // returns "50"
 * getNumberCount(100) // returns "99+"
 */
declare const getNumberCount: (number: number) => string;
/**
 * @description: This function will capitalize the first letter of a string
 * @param str String
 * @returns String
 */
declare const capitalizeFirstLetter: (str: string) => string;
/**
 * @description : This function will remove all the HTML tags from the string
 * @param {string} htmlString
 * @return {string}
 * @example :
 * const html = "<p>Some text</p>";
const text = stripHTML(html);
console.log(text); // Some text
 */
declare const sanitizeHTML: (htmlString: string) => string;
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
declare const stripAndTruncateHTML: (html: string, length?: number) => string;
/**
 * @returns {boolean} true if email is valid, false otherwise
 * @description Returns true if email is valid, false otherwise
 * @param {string} email string to check if it is a valid email
 * @example checkEmailValidity("hello world") => false
 * @example checkEmailValidity("example@plane.so") => true
 */
declare const checkEmailValidity: (email: string) => boolean;
declare const isEmptyHtmlString: (htmlString: string, allowedHTMLTags?: string[]) => boolean;
/**
 * @description
 * Check if a JSONContent object is empty
 * @param {JSONContent} content
 * @returns {boolean}
 */
declare const isJSONContentEmpty: (content: JSONContent | undefined) => boolean;
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
declare const isCommentEmpty: (comment: Content | undefined) => boolean;
/**
 * @description
 * Legacy function for backward compatibility with string comments
 * @param {string | undefined} comment
 * @returns {boolean}
 * @deprecated Use isCommentEmpty with Content type instead
 */
declare const isStringCommentEmpty: (comment: string | undefined) => boolean;
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
declare const checkURLValidity: (url: string) => boolean;
/**
 * Combines array elements with a separator and adds a conjunction before the last element
 * @param array Array of strings to combine
 * @param separator Separator to use between elements (default: ", ")
 * @param conjunction Conjunction to use before last element (default: "and")
 * @returns Combined string with conjunction before the last element
 */
declare const joinWithConjunction: (array: string[], separator?: string, conjunction?: string) => string;
/**
 * @description Ensures a URL has a protocol
 * @param {string} url
 * @returns {string}
 * @example
 * ensureUrlHasProtocol("example.com") => "http://example.com"
 */
declare const ensureUrlHasProtocol: (url: string) => string;
/**
 * @returns {boolean} true if searchQuery is substring of text in the same order, false otherwise
 * @description Returns true if searchQuery is substring of text in the same order, false otherwise
 * @param {string} text string to compare from
 * @param {string} searchQuery
 * @example substringMatch("hello world", "hlo") => true
 * @example substringMatch("hello world", "hoe") => false
 */
declare const substringMatch: (text: string, searchQuery: string) => boolean;
/**
 * @description Copies text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise<void>} Promise that resolves when copying is complete
 * @example
 * await copyTextToClipboard("Hello, World!") // copies "Hello, World!" to clipboard
 */
declare const copyTextToClipboard: (text: string) => Promise<void>;
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
declare const joinUrlPath: (...segments: string[]) => string;
//#endregion
//#region src/subscription.d.ts
/**
 * Calculates the yearly discount percentage when switching from monthly to yearly billing
 * @param monthlyPrice - The monthly subscription price
 * @param yearlyPricePerMonth - The monthly equivalent price when billed yearly
 * @returns The discount percentage as a whole number (floored)
 */
declare const calculateYearlyDiscount: (monthlyPrice: number, yearlyPricePerMonth: number) => number;
/**
 * Gets the display name for a subscription plan variant
 * @param planVariant - The subscription plan variant enum
 * @returns The human-readable name of the plan
 */
declare const getSubscriptionName: (planVariant: EProductSubscriptionEnum) => string;
/**
 * Gets the base subscription name for upgrade/downgrade paths
 * @param planVariant - The current subscription plan variant
 * @returns The name of the base subscription plan
 */
declare const getBaseSubscriptionName: (planVariant: TProductSubscriptionType) => string;
type TSubscriptionPriceDetail = {
  monthlyPriceDetails: TSubscriptionPrice;
  yearlyPriceDetails: TSubscriptionPrice;
};
/**
 * Gets the price details for a subscription product
 * @param product - The payment product to get price details for
 * @returns Array of price details for monthly and yearly plans
 */
declare const getSubscriptionPriceDetails: (product: IPaymentProduct | undefined) => TSubscriptionPriceDetail;
//#endregion
//#region src/tab-indices.d.ts
declare const getTabIndex: (type?: ETabIndices, isMobile?: boolean) => {
  getIndex: (key: string) => number | undefined;
  baseTabIndex: number;
};
//#endregion
//#region src/theme.d.ts
declare const applyTheme: (palette: string, isDarkPalette: boolean) => void;
declare const unsetCustomCssVariables: () => void;
declare const resolveGeneralTheme: (resolvedTheme: string | undefined) => "light" | "dark" | "system";
//#endregion
//#region src/url.d.ts
/**
 * Checks if a string is a valid IPv4 address
 * @param ip - String to validate as IPv4
 * @returns True if valid IPv4 address
 */
declare function isValidIPv4(ip: string): boolean;
/**
 * Checks if a string is a valid IPv6 address
 * @param ip - String to validate as IPv6
 * @returns True if valid IPv6 address
 */
declare function isValidIPv6(ip: string): boolean;
/**
 * Checks if a string is a valid IP address (IPv4 or IPv6)
 * @param ip - String to validate as IP address
 * @returns Object with validation results
 */
declare function validateIPAddress(ip: string): {
  isValid: boolean;
  type: "ipv4" | "ipv6" | "invalid";
  formatted?: string;
};
/**
 * Checks if a URL string points to a localhost address.
 * @param url - The URL string to check
 * @returns True if the URL points to localhost, false otherwise
 */
declare function isLocalhost(url: string): boolean;
/**
 * Extracts hostname from a URL string by removing protocol, path, query, hash, and port.
 * @param url - The URL string to extract hostname from
 * @returns The cleaned hostname
 */
declare function extractHostname(url: string): string;
/**
 * Returns a readable representation of a URL by stripping the protocol
 * and any trailing slash. For valid URLs, only the host is returned.
 * Invalid URLs are sanitized by removing the protocol and trailing slash.
 *
 * @param url - The URL string to format
 * @returns The formatted domain for display
 */
declare function formatURLForDisplay(url: string): string;
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
declare function extractTLD(urlString: string): string;
/**
 * Interface representing the cleaned components of a URL.
 * @interface IURLComponents
 * @property {string} protocol - The URL protocol (e.g., 'http', 'https'), if protocol is not present, Always contains the actual protocol used.
 * @property {string} subdomain - The subdomain part of the URL (e.g., 'blog' in 'blog.example.com')
 * @property {string} rootDomain - The root domain name (e.g., 'example' in 'blog.example.com')
 * @property {string} tld - The top-level domain (e.g., 'com', 'org')
 * @property {string} pathname - The URL path excluding search params and hash, empty if pathname is '/'
 * @property {URL} full - The original URL object with all native URL properties
 */
interface IURLComponents {
  protocol: string;
  subdomain: string;
  rootDomain: string;
  tld: string;
  pathname: string;
  full: URL;
}
/**
 * Process a URL object to extract its components
 */
declare function processURL(url: URL): IURLComponents;
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
declare function extractURLComponents(url: URL | string): IURLComponents | undefined;
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
declare function isValidNextPath(url: string): boolean;
//#endregion
//#region src/work-item-filters/configs/filters/cycle.d.ts
/**
 * Cycle filter specific params
 */
type TCreateCycleFilterParams = TCreateFilterConfigParams & IFilterIconConfig<TCycleGroups> & {
  cycles: ICycle[];
};
/**
 * Helper to get the cycle multi select config
 * @param params - The filter params
 * @returns The cycle multi select config
 */
declare const getCycleMultiSelectConfig: (params: TCreateCycleFilterParams, singleValueOperator: TSupportedOperators) => _plane_types7.TCoreFilterFieldConfigs<string>;
/**
 * Get the cycle filter config
 * @template K - The filter key
 * @param key - The filter key to use
 * @returns A function that takes parameters and returns the cycle filter config
 */
declare const getCycleFilterConfig: <P extends TFilterProperty>(key: P) => TCreateFilterConfig<P, TCreateCycleFilterParams>;
//#endregion
//#region src/work-item-filters/configs/filters/date.d.ts
/**
 * Get the start date filter config
 * @template K - The filter key
 * @param key - The filter key to use
 * @returns A function that takes parameters and returns the start date filter config
 */
declare const getStartDateFilterConfig: <P extends TFilterProperty>(key: P) => TCreateFilterConfig<P, TCreateDateFilterParams>;
/**
 * Get the target date filter config
 * @template K - The filter key
 * @param key - The filter key to use
 * @returns A function that takes parameters and returns the target date filter config
 */
declare const getTargetDateFilterConfig: <P extends TFilterProperty>(key: P) => TCreateFilterConfig<P, TCreateDateFilterParams>;
/**
 * Get the created at filter config
 * @template K - The filter key
 * @param key - The filter key to use
 * @returns A function that takes parameters and returns the created at filter config
 */
declare const getCreatedAtFilterConfig: <P extends TFilterProperty>(key: P) => TCreateFilterConfig<P, TCreateDateFilterParams>;
/**
 * Get the updated at filter config
 * @template K - The filter key
 * @param key - The filter key to use
 * @returns A function that takes parameters and returns the updated at filter config
 */
declare const getUpdatedAtFilterConfig: <P extends TFilterProperty>(key: P) => TCreateFilterConfig<P, TCreateDateFilterParams>;
//#endregion
//#region src/work-item-filters/configs/filters/label.d.ts
/**
 * Label filter specific params
 */
type TCreateLabelFilterParams = TCreateFilterConfigParams & IFilterIconConfig<string> & {
  labels: IIssueLabel[];
};
/**
 * Helper to get the label multi select config
 * @param params - The filter params
 * @returns The label multi select config
 */
declare const getLabelMultiSelectConfig: (params: TCreateLabelFilterParams, singleValueOperator: TSupportedOperators) => _plane_types7.TCoreFilterFieldConfigs<string>;
/**
 * Get the label filter config
 * @template K - The filter key
 * @param key - The filter key to use
 * @returns A function that takes parameters and returns the label filter config
 */
declare const getLabelFilterConfig: <P extends TFilterProperty>(key: P) => TCreateFilterConfig<P, TCreateLabelFilterParams>;
//#endregion
//#region src/work-item-filters/configs/filters/module.d.ts
/**
 * Module filter specific params
 */
type TCreateModuleFilterParams = TCreateFilterConfigParams & IFilterIconConfig<undefined> & {
  modules: IModule[];
};
/**
 * Helper to get the module multi select config
 * @param params - The filter params
 * @returns The module multi select config
 */
declare const getModuleMultiSelectConfig: (params: TCreateModuleFilterParams) => _plane_types7.TCoreFilterFieldConfigs<string>;
/**
 * Get the module filter config
 * @template K - The filter key
 * @param key - The filter key to use
 * @returns A function that takes parameters and returns the module filter config
 */
declare const getModuleFilterConfig: <P extends TFilterProperty>(key: P) => TCreateFilterConfig<P, TCreateModuleFilterParams>;
//#endregion
//#region src/work-item-filters/configs/filters/priority.d.ts
/**
 * Priority filter specific params
 */
type TCreatePriorityFilterParams = TCreateFilterConfigParams & IFilterIconConfig<TIssuePriorities>;
/**
 * Helper to get the priority multi select config
 * @param params - The filter params
 * @returns The priority multi select config
 */
declare const getPriorityMultiSelectConfig: (params: TCreatePriorityFilterParams, singleValueOperator: TSupportedOperators) => _plane_types7.TCoreFilterFieldConfigs<TIssuePriorities>;
/**
 * Get the priority filter config
 * @template K - The filter key
 * @param key - The filter key to use
 * @returns A function that takes parameters and returns the priority filter config
 */
declare const getPriorityFilterConfig: <P extends TFilterProperty>(key: P) => TCreateFilterConfig<P, TCreatePriorityFilterParams>;
//#endregion
//#region src/work-item-filters/configs/filters/project.d.ts
/**
 * Get the project filter config
 * @template K - The filter key
 * @param key - The filter key to use
 * @returns A function that takes parameters and returns the project filter config
 */
declare const getProjectFilterConfig: <P extends TFilterProperty>(key: P) => TCreateFilterConfig<P, TCreateProjectFilterParams>;
//#endregion
//#region src/work-item-filters/configs/filters/state.d.ts
/**
 * State group filter specific params
 */
type TCreateStateGroupFilterParams = TCreateFilterConfigParams & IFilterIconConfig<TStateGroups>;
/**
 * Helper to get the state group multi select config
 * @param params - The filter params
 * @returns The state group multi select config
 */
declare const getStateGroupMultiSelectConfig: (params: TCreateStateGroupFilterParams, singleValueOperator: TSupportedOperators) => _plane_types7.TCoreFilterFieldConfigs<TStateGroups>;
/**
 * Get the state group filter config
 * @template K - The filter key
 * @param key - The filter key to use
 * @returns A function that takes parameters and returns the state group filter config
 */
declare const getStateGroupFilterConfig: <P extends TFilterProperty>(key: P) => TCreateFilterConfig<P, TCreateStateGroupFilterParams>;
/**
 * State filter specific params
 */
type TCreateStateFilterParams = TCreateFilterConfigParams & IFilterIconConfig<IState> & {
  states: IState[];
};
/**
 * Helper to get the state multi select config
 * @param params - The filter params
 * @returns The state multi select config
 */
declare const getStateMultiSelectConfig: (params: TCreateStateFilterParams, singleValueOperator: TSupportedOperators) => _plane_types7.TCoreFilterFieldConfigs<string>;
/**
 * Get the state filter config
 * @template K - The filter key
 * @param key - The filter key to use
 * @returns A function that takes parameters and returns the state filter config
 */
declare const getStateFilterConfig: <P extends TFilterProperty>(key: P) => TCreateFilterConfig<P, TCreateStateFilterParams>;
//#endregion
//#region src/work-item-filters/configs/filters/user.d.ts
/**
 * Assignee filter specific params
 */
type TCreateAssigneeFilterParams = TCreateUserFilterParams;
/**
 * Get the assignee filter config
 * @template K - The filter key
 * @param key - The filter key to use
 * @returns A function that takes parameters and returns the assignee filter config
 */
declare const getAssigneeFilterConfig: <P extends TFilterProperty>(key: P) => TCreateFilterConfig<P, TCreateAssigneeFilterParams>;
/**
 * Mention filter specific params
 */
type TCreateMentionFilterParams = TCreateUserFilterParams;
/**
 * Get the mention filter config
 * @template K - The filter key
 * @param key - The filter key to use
 * @returns A function that takes parameters and returns the mention filter config
 */
declare const getMentionFilterConfig: <P extends TFilterProperty>(key: P) => TCreateFilterConfig<P, TCreateMentionFilterParams>;
/**
 * Created by filter specific params
 */
type TCreateCreatedByFilterParams = TCreateUserFilterParams;
/**
 * Get the created by filter config
 * @template K - The filter key
 * @param key - The filter key to use
 * @returns A function that takes parameters and returns the created by filter config
 */
declare const getCreatedByFilterConfig: <P extends TFilterProperty>(key: P) => TCreateFilterConfig<P, TCreateCreatedByFilterParams>;
/**
 * Subscriber filter specific params
 */
type TCreateSubscriberFilterParams = TCreateUserFilterParams;
/**
 * Get the subscriber filter config
 * @template K - The filter key
 * @param key - The filter key to use
 * @returns A function that takes parameters and returns the subscriber filter config
 */
declare const getSubscriberFilterConfig: <P extends TFilterProperty>(key: P) => TCreateFilterConfig<P, TCreateSubscriberFilterParams>;
//#endregion
//#region src/work-item/base.d.ts
type THandleIssuesMutation = (formData: Partial<TIssue>, oldGroupTitle: string, selectedGroupBy: TIssueGroupByOptions, issueIndex: number, orderBy: TIssueOrderByOptions, prevData?: {
  [key: string]: TIssue[];
} | TIssue[]) => {
  [key: string]: TIssue[];
} | TIssue[] | undefined;
declare const handleIssuesMutation: THandleIssuesMutation;
declare const handleIssueQueryParamsByLayout: (layout: EIssueLayoutTypes | undefined, viewType: "my_issues" | "issues" | "profile_issues" | "archived_issues" | "draft_issues" | "team_issues" | "team_project_work_items") => TIssueParams[] | null;
/**
 *
 * @description create a full issue payload with some default values. This function also parse the form field
 * like assignees, labels, etc. and add them to the payload
 * @param projectId project id to be added in the issue payload
 * @param formData partial issue data from the form. This will override the default values
 * @returns full issue payload with some default values
 */
declare const createIssuePayload: (projectId: string, formData: Partial<TIssue>) => TIssue;
/**
 * @description check if the issue due date should be highlighted
 * @param date
 * @param stateGroup
 * @returns boolean
 */
declare const shouldHighlightIssueDueDate: (date: string | Date | null, stateGroup: TStateGroups | undefined) => boolean;
declare const getIssueBlocksStructure: (block: TIssue) => IGanttBlock;
declare const formatTextList: (TextArray: string[]) => string;
declare const getDescriptionPlaceholderI18n: (isFocused: boolean, description: string | undefined) => string;
declare const issueCountBasedOnFilters: (issueIds: TGroupedIssues | TUnGroupedIssues | TSubGroupedIssues, layout: EIssueLayoutTypes, groupBy: string | undefined, subGroupBy: string | undefined) => number;
/**
 * @description This method is used to apply the display filters on the issues
 * @param {IIssueDisplayFilterOptions} displayFilters
 * @returns {IIssueDisplayFilterOptions}
 */
declare const getComputedDisplayFilters: (displayFilters?: IIssueDisplayFilterOptions, defaultValues?: IIssueDisplayFilterOptions) => IIssueDisplayFilterOptions;
/**
 * @description This method is used to apply the display properties on the issues
 * @param {IIssueDisplayProperties} displayProperties
 * @returns {IIssueDisplayProperties}
 */
declare const getComputedDisplayProperties: (displayProperties?: IIssueDisplayProperties) => IIssueDisplayProperties;
declare const generateWorkItemLink: ({
  workspaceSlug,
  projectId,
  issueId,
  projectIdentifier,
  sequenceId,
  isArchived,
  isEpic
}: {
  workspaceSlug: string | undefined | null;
  projectId: string | undefined | null;
  issueId: string | undefined | null;
  projectIdentifier: string | undefined | null;
  sequenceId: string | number | undefined | null;
  isArchived?: boolean;
  isEpic?: boolean;
}) => string;
declare const getIssuePriorityFilters: (priorityKey: TIssuePriorities) => TIssueFilterPriorityObject | undefined;
//#endregion
//#region src/work-item/modal.d.ts
declare const getUpdateFormDataForReset: (projectId: string | null | undefined, formData: Partial<TIssue>) => {
  project_id: string | null | undefined;
  name: string | undefined;
  description_html: string | undefined;
  priority: _plane_types7.TIssuePriorities | null | undefined;
  start_date: string | null | undefined;
  target_date: string | null | undefined;
  id?: string | undefined;
  sequence_id?: number | undefined;
  sort_order?: number | undefined;
  state_id?: string | null | undefined;
  label_ids?: string[] | undefined;
  assignee_ids?: string[] | undefined;
  estimate_point?: string | null | undefined;
  sub_issues_count?: number | undefined;
  attachment_count?: number | undefined;
  link_count?: number | undefined;
  parent_id?: string | null | undefined;
  cycle_id?: string | null | undefined;
  module_ids?: string[] | null | undefined;
  type_id?: string | null | undefined;
  created_at?: string | undefined;
  updated_at?: string | undefined;
  completed_at?: string | null | undefined;
  archived_at?: string | null | undefined;
  created_by?: string | undefined;
  updated_by?: string | undefined;
  is_draft?: boolean | undefined;
  is_epic?: boolean | undefined;
  is_intake?: boolean | undefined;
  is_subscribed?: boolean | undefined;
  parent?: Partial<_plane_types7.TBaseIssue> | undefined;
  issue_reactions?: _plane_types7.TIssueReaction[] | undefined;
  issue_attachments?: _plane_types7.TIssueAttachment[] | undefined;
  issue_link?: _plane_types7.TIssueLink[] | undefined;
  issue_relation?: _plane_types7.IssueRelation[] | undefined;
  issue_related?: _plane_types7.IssueRelation[] | undefined;
  tempId?: string | undefined;
  sourceIssueId?: string | undefined;
  state__group?: (_plane_types7.TStateGroups | null) | undefined;
};
declare const convertWorkItemDataToSearchResponse: (workspaceSlug: string, workItem: TIssue, project: IPartialProject | undefined, state: IState | undefined) => ISearchIssueResponse;
declare function getChangedIssuefields(formData: Partial<TIssue>, dirtyFields: {
  [key: string]: boolean | undefined;
}): Partial<TIssue>;
//#endregion
//#region src/work-item/state.d.ts
declare const orderStateGroups: (unorderedStateGroups: IStateResponse | undefined) => IStateResponse | undefined;
declare const sortStates: (states: IState[]) => IState[] | undefined;
declare const getCurrentStateSequence: (groupSates: IState[], destinationData: TDraggableData, edge: string | undefined) => number | undefined;
//#endregion
//#region src/workspace.d.ts
declare const orderWorkspacesList: (workspaces: IWorkspace[]) => IWorkspace[];
//#endregion
export { ADDITIONAL_EXTENSIONS, CORE_EXTENSIONS, DistributionObjectUpdate, DistributionUpdates, IFilterIconConfig, IURLComponents, PasswordCriteria, PasswordStrength, TCoreCustomComponentsMetaData, TCreateAssigneeFilterParams, TCreateCreatedByFilterParams, TCreateCycleFilterParams, TCreateDateFilterParams, TCreateDatePropertyFilterParams, TCreateFilterConfig, TCreateFilterConfigParams, TCreateLabelFilterParams, TCreateMentionFilterParams, TCreateModuleFilterParams, TCreatePriorityFilterParams, TCreateProjectFilterParams, TCreateStateFilterParams, TCreateStateGroupFilterParams, TCreateSubscriberFilterParams, TCreateUserFilterParams, TCustomComponentsMetaData, TCustomPropertyFilterParams, TDateConfig, TDateRangeConfig, TExtendedCustomComponentsMetaData, TFilterIconType, THsl, TMultiSelectConfig, TOperatorForPayload, TOptionTransforms, TRgb, TSingleSelectConfig, TSubscriptionPriceDetail, TTreeTransformFn, TTreeTransformResult, TreeTraversalMode, TreeVisitorFn, addAndCondition, addDaysToDate, addSpaceIfCamelCase, applyTheme, authErrorHandler, buildTree, calculateCycleProgress, calculateTimeAgo, calculateTimeAgoShort, calculateTotalFilters, calculateYearlyDiscount, capitalizeFirstLetter, checkDateCriteria, checkDuplicates, checkEmailValidity, checkIfArraysHaveSameElements, checkIfDatesAreEqual, checkURLValidity, cn, convertBytesToSize, convertHTMLToMarkdown, convertHexEmojiToDecimal, convertHoursMinutesToMinutes, convertMinutesToHoursAndMinutes, convertMinutesToHoursMinutesString, convertRemToPixel, convertStringArrayToBooleanObject, convertToEpoch, convertToISODateString, convertWorkItemDataToSearchResponse, copyTextToClipboard, copyUrlToClipboard, createAndGroupNode, createConditionNode, createExpressionComparable, createFilterConfig, createFilterFieldConfig, createGroupComparable, createIssuePayload, createOperatorConfigEntry, createSimilarString, csvDownload, darkenColor, deepCompareFilterExpressions, emojiCodeToUnicode, ensureUrlHasProtocol, extractConditions, extractConditionsWithDisplayOperators, extractHostname, extractIds, extractTLD, extractURLComponents, filterPagesByPageType, filterValidIds, findConditionsByPropertyAndOperator, findHowManyDaysLeft, findImmediateParent, findNodeById, findParentChain, findStringWithMostCharacters, findTotalDaysInRange, formatActiveCycle, formatDateRange, formatDuration, formatTextList, formatURLForDisplay, generateCalendarData, generateDateArray, generateFileName, generateIconColors, generateQueryParams, generateRandomColor, generateWorkItemLink, getAndGroupChildren, getAssetIdFromUrl, getAssigneeFilterConfig, getBase64Image, getBaseSubscriptionName, getChangedIssuefields, getComputedDisplayFilters, getComputedDisplayProperties, getContrastRatio, getCreatedAtFilterConfig, getCreatedByFilterConfig, getCurrentDateTimeInISO, getCurrentStateSequence, getCustomDates, getCycleFilterConfig, getCycleMultiSelectConfig, getDate, getDateOperatorLabel, getDatePickerConfig, getDatePropertyFilterConfig, getDateRangePickerConfig, getDescriptionPlaceholderI18n, getDistributionPathsPostUpdate, getEditorAssetDownloadSrc, getEditorAssetSrc, getFileExtension, getFileName, getFileURL, getFilterValueLength, getFirstCharacters, getGroupChildren, getHighestRole, getIconForLink, getIssueBlocksStructure, getIssuePriorityFilters, getLabelFilterConfig, getLabelMultiSelectConfig, getLuminance, getMemberMultiSelectConfig, getMemberPickerPropertyFilterConfig, getMentionFilterConfig, getModuleFilterConfig, getModuleMultiSelectConfig, getMultiSelectConfig, getNumberCount, getOperatorForPayload, getOperatorLabel, getOrderedDays, getPageName, getPasswordCriteria, getPasswordStrength, getPriorityFilterConfig, getPriorityMultiSelectConfig, getProgress, getProjectFilterConfig, getProjectMultiSelectConfig, getPublishViewLink, getRandomEmoji, getReadTimeFromWordsCount, getSingleSelectConfig, getStartDateFilterConfig, getStateFilterConfig, getStateGroupFilterConfig, getStateGroupMultiSelectConfig, getStateMultiSelectConfig, getSubscriberFilterConfig, getSubscriptionName, getSubscriptionPriceDetails, getSupportEmail, getSupportedDateOperators, getTabIndex, getTargetDateFilterConfig, getTextContent, getUpdateFormDataForReset, getUpdatedAtFilterConfig, getUserRole, getValidKeysFromObject, getValidatedViewFilters, getViewName, getWeekNumberOfDate, groupBy, groupByField, groupReactions, handleIssueQueryParamsByLayout, handleIssuesMutation, hasChildrenProperty, hasValidValue, hexToHsl, hexToRgb, hslToHex, isAndGroupNode, isCommentEmpty, isComplete, isConditionNode, isDateFilterOperator, isDateFilterType, isDateGreaterThanToday, isEditorEmpty, isEmptyHtmlString, isEstimatePointValuesRepeated, isGroupNode, isInDateFormat, isJSONContentEmpty, isLoaderReady, isLocalhost, isStringCommentEmpty, isValidDate, isValidIPv4, isValidIPv6, isValidId, isValidNextPath, issueCountBasedOnFilters, joinUrlPath, joinWithConjunction, lightenColor, normalizeFilterExpression, orderArrayBy, orderCycles, orderGroupedDataByField, orderJoinedProjects, orderModules, orderPages, orderProjects, orderStateGroups, orderViews, orderWorkspacesList, parseDateFilter, partitionValidIds, processGroupNode, processRelativeDate, processURL, projectIdentifierSanitizer, removeNodeFromExpression, renderFormattedDate, renderFormattedDateWithoutYear, renderFormattedPayloadDate, renderFormattedTime, replaceNodeInExpression, replaceUnderscoreIfSnakeCase, resolveGeneralTheme, rgbToHex, sanitizeAndStabilizeExpression, sanitizeCommentForNotification, sanitizeHTML, satisfiesDateFilter, shouldFilterCycle, shouldFilterModule, shouldFilterPage, shouldFilterProject, shouldFilterView, shouldHighlightIssueDueDate, shouldNotifyChangeForExpression, shouldUnwrapGroup, sortByField, sortStates, stripAndTruncateHTML, substringMatch, toFilterArray, toHex, transformExpressionTree, transformGroupWithChildren, traverseExpressionTree, truncateText, unsetCustomCssVariables, unwrapGroupIfNeeded, updateDistribution, updateNodeInExpression, validateColor, validateIPAddress };
//# sourceMappingURL=index.d.ts.map