import { CORE_COLLECTION_OPERATOR, CORE_COMPARISON_OPERATOR, CORE_EQUALITY_OPERATOR, ChartXAxisProperty, ChartYAxisMetric, EInboxIssueStatus, EIssueLayoutTypes, EIssuesStoreType, EProductSubscriptionEnum, EStartOfTheWeek, EUserWorkspaceRoles, EViewAccess } from "@plane/types";

//#region src/ai.ts
let AI_EDITOR_TASKS = /* @__PURE__ */ function(AI_EDITOR_TASKS$1) {
	AI_EDITOR_TASKS$1["ASK_ANYTHING"] = "ASK_ANYTHING";
	return AI_EDITOR_TASKS$1;
}({});

//#endregion
//#region src/analytics/common.ts
const ANALYTICS_INSIGHTS_FIELDS = {
	overview: [
		{
			key: "total_users",
			i18nKey: "workspace_analytics.total",
			i18nProps: { entity: "common.users" }
		},
		{
			key: "total_admins",
			i18nKey: "workspace_analytics.total",
			i18nProps: { entity: "common.admins" }
		},
		{
			key: "total_members",
			i18nKey: "workspace_analytics.total",
			i18nProps: { entity: "common.members" }
		},
		{
			key: "total_guests",
			i18nKey: "workspace_analytics.total",
			i18nProps: { entity: "common.guests" }
		},
		{
			key: "total_projects",
			i18nKey: "workspace_analytics.total",
			i18nProps: { entity: "common.projects" }
		},
		{
			key: "total_work_items",
			i18nKey: "workspace_analytics.total",
			i18nProps: { entity: "common.work_items" }
		},
		{
			key: "total_cycles",
			i18nKey: "workspace_analytics.total",
			i18nProps: { entity: "common.cycles" }
		},
		{
			key: "total_intake",
			i18nKey: "workspace_analytics.total",
			i18nProps: { entity: "sidebar.intake" }
		}
	],
	"work-items": [
		{
			key: "total_work_items",
			i18nKey: "workspace_analytics.total"
		},
		{
			key: "started_work_items",
			i18nKey: "workspace_analytics.started_work_items"
		},
		{
			key: "backlog_work_items",
			i18nKey: "workspace_analytics.backlog_work_items"
		},
		{
			key: "un_started_work_items",
			i18nKey: "workspace_analytics.un_started_work_items"
		},
		{
			key: "completed_work_items",
			i18nKey: "workspace_analytics.completed_work_items"
		}
	]
};
const ANALYTICS_DURATION_FILTER_OPTIONS = [
	{
		name: "Yesterday",
		value: "yesterday"
	},
	{
		name: "Last 7 days",
		value: "last_7_days"
	},
	{
		name: "Last 30 days",
		value: "last_30_days"
	},
	{
		name: "Last 3 months",
		value: "last_3_months"
	}
];
const ANALYTICS_X_AXIS_VALUES = [
	{
		value: ChartXAxisProperty.STATES,
		label: "State name"
	},
	{
		value: ChartXAxisProperty.STATE_GROUPS,
		label: "State group"
	},
	{
		value: ChartXAxisProperty.PRIORITY,
		label: "Priority"
	},
	{
		value: ChartXAxisProperty.LABELS,
		label: "Label"
	},
	{
		value: ChartXAxisProperty.ASSIGNEES,
		label: "Assignee"
	},
	{
		value: ChartXAxisProperty.ESTIMATE_POINTS,
		label: "Estimate point"
	},
	{
		value: ChartXAxisProperty.CYCLES,
		label: "Cycle"
	},
	{
		value: ChartXAxisProperty.MODULES,
		label: "Module"
	},
	{
		value: ChartXAxisProperty.COMPLETED_AT,
		label: "Completed date"
	},
	{
		value: ChartXAxisProperty.TARGET_DATE,
		label: "Due date"
	},
	{
		value: ChartXAxisProperty.START_DATE,
		label: "Start date"
	},
	{
		value: ChartXAxisProperty.CREATED_AT,
		label: "Created date"
	}
];
const ANALYTICS_Y_AXIS_VALUES = [
	{
		value: ChartYAxisMetric.WORK_ITEM_COUNT,
		label: "Work item"
	},
	{
		value: ChartYAxisMetric.ESTIMATE_POINT_COUNT,
		label: "Estimate"
	},
	{
		value: ChartYAxisMetric.EPIC_WORK_ITEM_COUNT,
		label: "Epic"
	}
];
const ANALYTICS_V2_DATE_KEYS = [
	"completed_at",
	"target_date",
	"start_date",
	"created_at"
];

//#endregion
//#region src/auth/core.ts
const CORE_LOGIN_MEDIUM_LABELS = {
	email: "Email",
	"magic-code": "Magic code",
	github: "GitHub",
	gitlab: "GitLab",
	google: "Google",
	gitea: "Gitea"
};

//#endregion
//#region src/auth/extended.ts
const EXTENDED_LOGIN_MEDIUM_LABELS = {};

//#endregion
//#region src/auth/index.ts
let E_PASSWORD_STRENGTH = /* @__PURE__ */ function(E_PASSWORD_STRENGTH$1) {
	E_PASSWORD_STRENGTH$1["EMPTY"] = "empty";
	E_PASSWORD_STRENGTH$1["LENGTH_NOT_VALID"] = "length_not_valid";
	E_PASSWORD_STRENGTH$1["STRENGTH_NOT_VALID"] = "strength_not_valid";
	E_PASSWORD_STRENGTH$1["STRENGTH_VALID"] = "strength_valid";
	return E_PASSWORD_STRENGTH$1;
}({});
const PASSWORD_MIN_LENGTH = 8;
const SPACE_PASSWORD_CRITERIA = [{
	key: "min_8_char",
	label: "Min 8 characters",
	isCriteriaValid: (password) => password.length >= PASSWORD_MIN_LENGTH
}];
let EAuthPageTypes = /* @__PURE__ */ function(EAuthPageTypes$1) {
	EAuthPageTypes$1["PUBLIC"] = "PUBLIC";
	EAuthPageTypes$1["NON_AUTHENTICATED"] = "NON_AUTHENTICATED";
	EAuthPageTypes$1["SET_PASSWORD"] = "SET_PASSWORD";
	EAuthPageTypes$1["ONBOARDING"] = "ONBOARDING";
	EAuthPageTypes$1["AUTHENTICATED"] = "AUTHENTICATED";
	return EAuthPageTypes$1;
}({});
let EPageTypes = /* @__PURE__ */ function(EPageTypes$1) {
	EPageTypes$1["INIT"] = "INIT";
	EPageTypes$1["PUBLIC"] = "PUBLIC";
	EPageTypes$1["NON_AUTHENTICATED"] = "NON_AUTHENTICATED";
	EPageTypes$1["ONBOARDING"] = "ONBOARDING";
	EPageTypes$1["AUTHENTICATED"] = "AUTHENTICATED";
	return EPageTypes$1;
}({});
let EAuthModes = /* @__PURE__ */ function(EAuthModes$1) {
	EAuthModes$1["SIGN_IN"] = "SIGN_IN";
	EAuthModes$1["SIGN_UP"] = "SIGN_UP";
	return EAuthModes$1;
}({});
let EAuthSteps = /* @__PURE__ */ function(EAuthSteps$1) {
	EAuthSteps$1["EMAIL"] = "EMAIL";
	EAuthSteps$1["PASSWORD"] = "PASSWORD";
	EAuthSteps$1["UNIQUE_CODE"] = "UNIQUE_CODE";
	return EAuthSteps$1;
}({});
let EErrorAlertType = /* @__PURE__ */ function(EErrorAlertType$1) {
	EErrorAlertType$1["BANNER_ALERT"] = "BANNER_ALERT";
	EErrorAlertType$1["TOAST_ALERT"] = "TOAST_ALERT";
	EErrorAlertType$1["INLINE_FIRST_NAME"] = "INLINE_FIRST_NAME";
	EErrorAlertType$1["INLINE_EMAIL"] = "INLINE_EMAIL";
	EErrorAlertType$1["INLINE_PASSWORD"] = "INLINE_PASSWORD";
	EErrorAlertType$1["INLINE_EMAIL_CODE"] = "INLINE_EMAIL_CODE";
	return EErrorAlertType$1;
}({});
let EAdminAuthErrorCodes = /* @__PURE__ */ function(EAdminAuthErrorCodes$1) {
	EAdminAuthErrorCodes$1["ADMIN_ALREADY_EXIST"] = "5150";
	EAdminAuthErrorCodes$1["REQUIRED_ADMIN_EMAIL_PASSWORD_FIRST_NAME"] = "5155";
	EAdminAuthErrorCodes$1["INVALID_ADMIN_EMAIL"] = "5160";
	EAdminAuthErrorCodes$1["INVALID_ADMIN_PASSWORD"] = "5165";
	EAdminAuthErrorCodes$1["REQUIRED_ADMIN_EMAIL_PASSWORD"] = "5170";
	EAdminAuthErrorCodes$1["ADMIN_AUTHENTICATION_FAILED"] = "5175";
	EAdminAuthErrorCodes$1["ADMIN_USER_ALREADY_EXIST"] = "5180";
	EAdminAuthErrorCodes$1["ADMIN_USER_DOES_NOT_EXIST"] = "5185";
	EAdminAuthErrorCodes$1["ADMIN_USER_DEACTIVATED"] = "5190";
	return EAdminAuthErrorCodes$1;
}({});
let EAuthErrorCodes = /* @__PURE__ */ function(EAuthErrorCodes$1) {
	EAuthErrorCodes$1["INSTANCE_NOT_CONFIGURED"] = "5000";
	EAuthErrorCodes$1["INVALID_EMAIL"] = "5005";
	EAuthErrorCodes$1["EMAIL_REQUIRED"] = "5010";
	EAuthErrorCodes$1["SIGNUP_DISABLED"] = "5015";
	EAuthErrorCodes$1["MAGIC_LINK_LOGIN_DISABLED"] = "5016";
	EAuthErrorCodes$1["PASSWORD_LOGIN_DISABLED"] = "5018";
	EAuthErrorCodes$1["USER_ACCOUNT_DEACTIVATED"] = "5019";
	EAuthErrorCodes$1["INVALID_PASSWORD"] = "5020";
	EAuthErrorCodes$1["SMTP_NOT_CONFIGURED"] = "5025";
	EAuthErrorCodes$1["USER_ALREADY_EXIST"] = "5030";
	EAuthErrorCodes$1["AUTHENTICATION_FAILED_SIGN_UP"] = "5035";
	EAuthErrorCodes$1["REQUIRED_EMAIL_PASSWORD_SIGN_UP"] = "5040";
	EAuthErrorCodes$1["INVALID_EMAIL_SIGN_UP"] = "5045";
	EAuthErrorCodes$1["INVALID_EMAIL_MAGIC_SIGN_UP"] = "5050";
	EAuthErrorCodes$1["MAGIC_SIGN_UP_EMAIL_CODE_REQUIRED"] = "5055";
	EAuthErrorCodes$1["USER_DOES_NOT_EXIST"] = "5060";
	EAuthErrorCodes$1["AUTHENTICATION_FAILED_SIGN_IN"] = "5065";
	EAuthErrorCodes$1["REQUIRED_EMAIL_PASSWORD_SIGN_IN"] = "5070";
	EAuthErrorCodes$1["INVALID_EMAIL_SIGN_IN"] = "5075";
	EAuthErrorCodes$1["INVALID_EMAIL_MAGIC_SIGN_IN"] = "5080";
	EAuthErrorCodes$1["MAGIC_SIGN_IN_EMAIL_CODE_REQUIRED"] = "5085";
	EAuthErrorCodes$1["INVALID_MAGIC_CODE_SIGN_IN"] = "5090";
	EAuthErrorCodes$1["INVALID_MAGIC_CODE_SIGN_UP"] = "5092";
	EAuthErrorCodes$1["EXPIRED_MAGIC_CODE_SIGN_IN"] = "5095";
	EAuthErrorCodes$1["EXPIRED_MAGIC_CODE_SIGN_UP"] = "5097";
	EAuthErrorCodes$1["EMAIL_CODE_ATTEMPT_EXHAUSTED_SIGN_IN"] = "5100";
	EAuthErrorCodes$1["EMAIL_CODE_ATTEMPT_EXHAUSTED_SIGN_UP"] = "5102";
	EAuthErrorCodes$1["OAUTH_NOT_CONFIGURED"] = "5104";
	EAuthErrorCodes$1["GOOGLE_NOT_CONFIGURED"] = "5105";
	EAuthErrorCodes$1["GITHUB_NOT_CONFIGURED"] = "5110";
	EAuthErrorCodes$1["GITLAB_NOT_CONFIGURED"] = "5111";
	EAuthErrorCodes$1["GOOGLE_OAUTH_PROVIDER_ERROR"] = "5115";
	EAuthErrorCodes$1["GITHUB_OAUTH_PROVIDER_ERROR"] = "5120";
	EAuthErrorCodes$1["GITLAB_OAUTH_PROVIDER_ERROR"] = "5121";
	EAuthErrorCodes$1["INVALID_PASSWORD_TOKEN"] = "5125";
	EAuthErrorCodes$1["EXPIRED_PASSWORD_TOKEN"] = "5130";
	EAuthErrorCodes$1["INCORRECT_OLD_PASSWORD"] = "5135";
	EAuthErrorCodes$1["MISSING_PASSWORD"] = "5138";
	EAuthErrorCodes$1["INVALID_NEW_PASSWORD"] = "5140";
	EAuthErrorCodes$1["PASSWORD_ALREADY_SET"] = "5145";
	EAuthErrorCodes$1["ADMIN_ALREADY_EXIST"] = "5150";
	EAuthErrorCodes$1["REQUIRED_ADMIN_EMAIL_PASSWORD_FIRST_NAME"] = "5155";
	EAuthErrorCodes$1["INVALID_ADMIN_EMAIL"] = "5160";
	EAuthErrorCodes$1["INVALID_ADMIN_PASSWORD"] = "5165";
	EAuthErrorCodes$1["REQUIRED_ADMIN_EMAIL_PASSWORD"] = "5170";
	EAuthErrorCodes$1["ADMIN_AUTHENTICATION_FAILED"] = "5175";
	EAuthErrorCodes$1["ADMIN_USER_ALREADY_EXIST"] = "5180";
	EAuthErrorCodes$1["ADMIN_USER_DOES_NOT_EXIST"] = "5185";
	EAuthErrorCodes$1["ADMIN_USER_DEACTIVATED"] = "5190";
	EAuthErrorCodes$1["RATE_LIMIT_EXCEEDED"] = "5900";
	return EAuthErrorCodes$1;
}({});
const LOGIN_MEDIUM_LABELS = {
	...CORE_LOGIN_MEDIUM_LABELS,
	...EXTENDED_LOGIN_MEDIUM_LABELS
};

//#endregion
//#region src/chart.ts
const LABEL_CLASSNAME = "uppercase text-custom-text-300/60 text-sm tracking-wide";
const AXIS_LABEL_CLASSNAME = "uppercase text-custom-text-300/60 text-sm tracking-wide";
let ChartXAxisDateGrouping = /* @__PURE__ */ function(ChartXAxisDateGrouping$1) {
	ChartXAxisDateGrouping$1["DAY"] = "DAY";
	ChartXAxisDateGrouping$1["WEEK"] = "WEEK";
	ChartXAxisDateGrouping$1["MONTH"] = "MONTH";
	ChartXAxisDateGrouping$1["YEAR"] = "YEAR";
	return ChartXAxisDateGrouping$1;
}({});
const TO_CAPITALIZE_PROPERTIES = [ChartXAxisProperty.PRIORITY, ChartXAxisProperty.STATE_GROUPS];
const CHART_X_AXIS_DATE_PROPERTIES = [
	ChartXAxisProperty.START_DATE,
	ChartXAxisProperty.TARGET_DATE,
	ChartXAxisProperty.CREATED_AT,
	ChartXAxisProperty.COMPLETED_AT
];
let EChartModels = /* @__PURE__ */ function(EChartModels$1) {
	EChartModels$1["BASIC"] = "BASIC";
	EChartModels$1["STACKED"] = "STACKED";
	EChartModels$1["GROUPED"] = "GROUPED";
	EChartModels$1["MULTI_LINE"] = "MULTI_LINE";
	EChartModels$1["COMPARISON"] = "COMPARISON";
	EChartModels$1["PROGRESS"] = "PROGRESS";
	return EChartModels$1;
}({});
const CHART_COLOR_PALETTES = [
	{
		key: "modern",
		i18n_label: "dashboards.widget.color_palettes.modern",
		light: [
			"#6172E8",
			"#8B6EDB",
			"#E05F99",
			"#29A383",
			"#CB8A37",
			"#3AA7C1",
			"#F1B24A",
			"#E84855",
			"#50C799",
			"#B35F9E"
		],
		dark: [
			"#6B7CDE",
			"#8E9DE6",
			"#D45D9E",
			"#2EAF85",
			"#D4A246",
			"#29A7C1",
			"#B89F6A",
			"#D15D64",
			"#4ED079",
			"#A169A4"
		]
	},
	{
		key: "horizon",
		i18n_label: "dashboards.widget.color_palettes.horizon",
		light: [
			"#E76E50",
			"#289D90",
			"#F3A362",
			"#E9C368",
			"#264753",
			"#8A6FA0",
			"#5B9EE5",
			"#7CC474",
			"#BA7DB5",
			"#CF8640"
		],
		dark: [
			"#E05A3A",
			"#1D8A7E",
			"#D98B4D",
			"#D1AC50",
			"#3A6B7C",
			"#7D6297",
			"#4D8ACD",
			"#569C64",
			"#C16A8C",
			"#B77436"
		]
	},
	{
		key: "earthen",
		i18n_label: "dashboards.widget.color_palettes.earthen",
		light: [
			"#386641",
			"#6A994E",
			"#A7C957",
			"#E97F4E",
			"#BC4749",
			"#9E2A2B",
			"#80CED1",
			"#5C3E79",
			"#526EAB",
			"#6B5B95"
		],
		dark: [
			"#497752",
			"#7BAA5F",
			"#B8DA68",
			"#FA905F",
			"#CD585A",
			"#AF3B3C",
			"#91DFE2",
			"#6D4F8A",
			"#637FBC",
			"#7C6CA6"
		]
	}
];

//#endregion
//#region src/cycle.ts
const CYCLE_STATUS = [
	{
		i18n_label: "project_cycles.status.days_left",
		value: "current",
		i18n_title: "project_cycles.status.in_progress",
		color: "#F59E0B",
		textColor: "text-amber-500",
		bgColor: "bg-amber-50"
	},
	{
		i18n_label: "project_cycles.status.yet_to_start",
		value: "upcoming",
		i18n_title: "project_cycles.status.yet_to_start",
		color: "#3F76FF",
		textColor: "text-blue-500",
		bgColor: "bg-indigo-50"
	},
	{
		i18n_label: "project_cycles.status.completed",
		value: "completed",
		i18n_title: "project_cycles.status.completed",
		color: "#16A34A",
		textColor: "text-green-600",
		bgColor: "bg-green-50"
	},
	{
		i18n_label: "project_cycles.status.draft",
		value: "draft",
		i18n_title: "project_cycles.status.draft",
		color: "#525252",
		textColor: "text-custom-text-300",
		bgColor: "bg-custom-background-90"
	}
];

//#endregion
//#region src/dashboard.ts
let EDurationFilters = /* @__PURE__ */ function(EDurationFilters$1) {
	EDurationFilters$1["NONE"] = "none";
	EDurationFilters$1["TODAY"] = "today";
	EDurationFilters$1["THIS_WEEK"] = "this_week";
	EDurationFilters$1["THIS_MONTH"] = "this_month";
	EDurationFilters$1["THIS_YEAR"] = "this_year";
	EDurationFilters$1["CUSTOM"] = "custom";
	return EDurationFilters$1;
}({});
const DURATION_FILTER_OPTIONS = [
	{
		key: EDurationFilters.NONE,
		label: "All time"
	},
	{
		key: EDurationFilters.TODAY,
		label: "Due today"
	},
	{
		key: EDurationFilters.THIS_WEEK,
		label: "Due this week"
	},
	{
		key: EDurationFilters.THIS_MONTH,
		label: "Due this month"
	},
	{
		key: EDurationFilters.THIS_YEAR,
		label: "Due this year"
	},
	{
		key: EDurationFilters.CUSTOM,
		label: "Custom"
	}
];
const PROJECT_BACKGROUND_COLORS = [
	"bg-gray-500/20",
	"bg-green-500/20",
	"bg-red-500/20",
	"bg-orange-500/20",
	"bg-blue-500/20",
	"bg-yellow-500/20",
	"bg-pink-500/20",
	"bg-purple-500/20"
];
const FILTERED_ISSUES_TABS_LIST = [
	{
		key: "upcoming",
		label: "Upcoming"
	},
	{
		key: "overdue",
		label: "Overdue"
	},
	{
		key: "completed",
		label: "Marked completed"
	}
];
const UNFILTERED_ISSUES_TABS_LIST = [{
	key: "pending",
	label: "Pending"
}, {
	key: "completed",
	label: "Marked completed"
}];

//#endregion
//#region src/emoji.ts
const ISSUE_REACTION_EMOJI_CODES = [
	"128077",
	"128078",
	"128516",
	"128165",
	"128533",
	"129505",
	"9992",
	"128064"
];
const RANDOM_EMOJI_CODES = [
	"8986",
	"9200",
	"128204",
	"127773",
	"127891",
	"128076",
	"128077",
	"128187",
	"128188",
	"128512",
	"128522",
	"128578"
];

//#endregion
//#region src/endpoints.ts
const API_BASE_URL = process.env.VITE_API_BASE_URL || "";
const API_BASE_PATH = process.env.VITE_API_BASE_PATH || "";
const API_URL = encodeURI(`${API_BASE_URL}${API_BASE_PATH}`);
const ADMIN_BASE_URL = process.env.VITE_ADMIN_BASE_URL || "";
const ADMIN_BASE_PATH = process.env.VITE_ADMIN_BASE_PATH || "";
const GOD_MODE_URL = encodeURI(`${ADMIN_BASE_URL}${ADMIN_BASE_PATH}`);
const SPACE_BASE_URL = process.env.VITE_SPACE_BASE_URL || "";
const SPACE_BASE_PATH = process.env.VITE_SPACE_BASE_PATH || "";
const SITES_URL = encodeURI(`${SPACE_BASE_URL}${SPACE_BASE_PATH}`);
const LIVE_BASE_URL = process.env.VITE_LIVE_BASE_URL || "";
const LIVE_BASE_PATH = process.env.VITE_LIVE_BASE_PATH || "";
const LIVE_URL = encodeURI(`${LIVE_BASE_URL}${LIVE_BASE_PATH}`);
const WEB_BASE_URL = process.env.VITE_WEB_BASE_URL || "";
const WEB_BASE_PATH = process.env.VITE_WEB_BASE_PATH || "";
const WEB_URL = encodeURI(`${WEB_BASE_URL}${WEB_BASE_PATH}`);
const WEBSITE_URL = process.env.VITE_WEBSITE_URL || "https://plane.so";
const SUPPORT_EMAIL = process.env.VITE_SUPPORT_EMAIL || "support@plane.so";
const MARKETING_PRICING_PAGE_LINK = "https://plane.so/pricing";
const MARKETING_CONTACT_US_PAGE_LINK = "https://plane.so/contact";
const MARKETING_PLANE_ONE_PAGE_LINK = "https://plane.so/one";

//#endregion
//#region src/estimates.ts
const MAX_ESTIMATE_POINT_INPUT_LENGTH = 20;
let EEstimateSystem = /* @__PURE__ */ function(EEstimateSystem$1) {
	EEstimateSystem$1["POINTS"] = "points";
	EEstimateSystem$1["CATEGORIES"] = "categories";
	EEstimateSystem$1["TIME"] = "time";
	return EEstimateSystem$1;
}({});
let EEstimateUpdateStages = /* @__PURE__ */ function(EEstimateUpdateStages$1) {
	EEstimateUpdateStages$1["CREATE"] = "create";
	EEstimateUpdateStages$1["EDIT"] = "edit";
	EEstimateUpdateStages$1["SWITCH"] = "switch";
	return EEstimateUpdateStages$1;
}({});
const estimateCount = {
	min: 2,
	max: 6
};
const ESTIMATE_SYSTEMS = {
	points: {
		name: "Points",
		i18n_name: "project_settings.estimates.systems.points.label",
		templates: {
			fibonacci: {
				title: "Fibonacci",
				i18n_title: "project_settings.estimates.systems.points.fibonacci",
				values: [
					{
						id: void 0,
						key: 1,
						value: "1"
					},
					{
						id: void 0,
						key: 2,
						value: "2"
					},
					{
						id: void 0,
						key: 3,
						value: "3"
					},
					{
						id: void 0,
						key: 4,
						value: "5"
					},
					{
						id: void 0,
						key: 5,
						value: "8"
					},
					{
						id: void 0,
						key: 6,
						value: "13"
					}
				]
			},
			linear: {
				title: "Linear",
				i18n_title: "project_settings.estimates.systems.points.linear",
				values: [
					{
						id: void 0,
						key: 1,
						value: "1"
					},
					{
						id: void 0,
						key: 2,
						value: "2"
					},
					{
						id: void 0,
						key: 3,
						value: "3"
					},
					{
						id: void 0,
						key: 4,
						value: "4"
					},
					{
						id: void 0,
						key: 5,
						value: "5"
					},
					{
						id: void 0,
						key: 6,
						value: "6"
					}
				]
			},
			squares: {
				title: "Squares",
				i18n_title: "project_settings.estimates.systems.points.squares",
				values: [
					{
						id: void 0,
						key: 1,
						value: "1"
					},
					{
						id: void 0,
						key: 2,
						value: "4"
					},
					{
						id: void 0,
						key: 3,
						value: "9"
					},
					{
						id: void 0,
						key: 4,
						value: "16"
					},
					{
						id: void 0,
						key: 5,
						value: "25"
					},
					{
						id: void 0,
						key: 6,
						value: "36"
					}
				]
			},
			custom: {
				title: "Custom",
				i18n_title: "project_settings.estimates.systems.points.custom",
				values: [{
					id: void 0,
					key: 1,
					value: "1"
				}, {
					id: void 0,
					key: 2,
					value: "2"
				}],
				hide: true
			}
		},
		is_available: true,
		is_ee: false
	},
	categories: {
		name: "Categories",
		i18n_name: "project_settings.estimates.systems.categories.label",
		templates: {
			t_shirt_sizes: {
				title: "T-Shirt Sizes",
				i18n_title: "project_settings.estimates.systems.categories.t_shirt_sizes",
				values: [
					{
						id: void 0,
						key: 1,
						value: "XS"
					},
					{
						id: void 0,
						key: 2,
						value: "S"
					},
					{
						id: void 0,
						key: 3,
						value: "M"
					},
					{
						id: void 0,
						key: 4,
						value: "L"
					},
					{
						id: void 0,
						key: 5,
						value: "XL"
					},
					{
						id: void 0,
						key: 6,
						value: "XXL"
					}
				]
			},
			easy_to_hard: {
				title: "Easy to hard",
				i18n_title: "project_settings.estimates.systems.categories.easy_to_hard",
				values: [
					{
						id: void 0,
						key: 1,
						value: "Easy"
					},
					{
						id: void 0,
						key: 2,
						value: "Medium"
					},
					{
						id: void 0,
						key: 3,
						value: "Hard"
					},
					{
						id: void 0,
						key: 4,
						value: "Very Hard"
					}
				]
			},
			custom: {
				title: "Custom",
				i18n_title: "project_settings.estimates.systems.categories.custom",
				values: [{
					id: void 0,
					key: 1,
					value: "Easy"
				}, {
					id: void 0,
					key: 2,
					value: "Hard"
				}],
				hide: true
			}
		},
		is_available: true,
		is_ee: false
	},
	time: {
		name: "Time",
		i18n_name: "project_settings.estimates.systems.time.label",
		templates: { hours: {
			title: "Hours",
			i18n_title: "project_settings.estimates.systems.time.hours",
			values: [
				{
					id: void 0,
					key: 1,
					value: "1"
				},
				{
					id: void 0,
					key: 2,
					value: "2"
				},
				{
					id: void 0,
					key: 3,
					value: "3"
				},
				{
					id: void 0,
					key: 4,
					value: "4"
				},
				{
					id: void 0,
					key: 5,
					value: "5"
				},
				{
					id: void 0,
					key: 6,
					value: "6"
				}
			]
		} },
		is_available: true,
		is_ee: true
	}
};

//#endregion
//#region src/event-tracker/core.ts
/**
* ===========================================================================
* Event Groups
* ===========================================================================
*/
const GROUP_WORKSPACE_TRACKER_EVENT = "workspace_metrics";
const GITHUB_REDIRECTED_TRACKER_EVENT = "github_redirected";
const HEADER_GITHUB_ICON = "header_github_icon";
/**
* ===========================================================================
* Command palette tracker
* ===========================================================================
*/
const COMMAND_PALETTE_TRACKER_ELEMENTS = { COMMAND_PALETTE_SHORTCUT_KEY: "command_palette_shortcut_key" };
/**
* ===========================================================================
* Workspace Events and Elements
* ===========================================================================
*/
const WORKSPACE_TRACKER_EVENTS = {
	create: "workspace_created",
	update: "workspace_updated",
	delete: "workspace_deleted"
};
const WORKSPACE_TRACKER_ELEMENTS = {
	DELETE_WORKSPACE_BUTTON: "delete_workspace_button",
	ONBOARDING_CREATE_WORKSPACE_BUTTON: "onboarding_create_workspace_button",
	CREATE_WORKSPACE_BUTTON: "create_workspace_button",
	UPDATE_WORKSPACE_BUTTON: "update_workspace_button"
};
/**
* ===========================================================================
* Project Events and Elements
* ===========================================================================
*/
const PROJECT_TRACKER_EVENTS = {
	create: "project_created",
	update: "project_updated",
	delete: "project_deleted",
	feature_toggled: "feature_toggled"
};
const PROJECT_TRACKER_ELEMENTS = {
	EXTENDED_SIDEBAR_ADD_BUTTON: "extended_sidebar_add_project_button",
	SIDEBAR_CREATE_PROJECT_BUTTON: "sidebar_create_project_button",
	SIDEBAR_CREATE_PROJECT_TOOLTIP: "sidebar_create_project_tooltip",
	COMMAND_PALETTE_CREATE_BUTTON: "command_palette_create_project_button",
	COMMAND_PALETTE_SHORTCUT_CREATE_BUTTON: "command_palette_shortcut_create_project_button",
	EMPTY_STATE_CREATE_PROJECT_BUTTON: "empty_state_create_project_button",
	CREATE_HEADER_BUTTON: "create_project_header_button",
	CREATE_FIRST_PROJECT_BUTTON: "create_first_project_button",
	DELETE_PROJECT_BUTTON: "delete_project_button",
	UPDATE_PROJECT_BUTTON: "update_project_button",
	CREATE_PROJECT_JIRA_IMPORT_DETAIL_PAGE: "create_project_jira_import_detail_page",
	TOGGLE_FEATURE: "toggle_project_feature"
};
/**
* ===========================================================================
* Cycle Events and Elements
* ===========================================================================
*/
const CYCLE_TRACKER_EVENTS = {
	create: "cycle_created",
	update: "cycle_updated",
	delete: "cycle_deleted",
	favorite: "cycle_favorited",
	unfavorite: "cycle_unfavorited",
	archive: "cycle_archived",
	restore: "cycle_restored"
};
const CYCLE_TRACKER_ELEMENTS = {
	RIGHT_HEADER_ADD_BUTTON: "right_header_add_cycle_button",
	EMPTY_STATE_ADD_BUTTON: "empty_state_add_cycle_button",
	COMMAND_PALETTE_ADD_ITEM: "command_palette_add_cycle_item",
	RIGHT_SIDEBAR: "cycle_right_sidebar",
	QUICK_ACTIONS: "cycle_quick_actions",
	CONTEXT_MENU: "cycle_context_menu",
	LIST_ITEM: "cycle_list_item"
};
/**
* ===========================================================================
* Module Events and Elements
* ===========================================================================
*/
const MODULE_TRACKER_EVENTS = {
	create: "module_created",
	update: "module_updated",
	delete: "module_deleted",
	favorite: "module_favorited",
	unfavorite: "module_unfavorited",
	archive: "module_archived",
	restore: "module_restored",
	link: {
		create: "module_link_created",
		update: "module_link_updated",
		delete: "module_link_deleted"
	}
};
const MODULE_TRACKER_ELEMENTS = {
	RIGHT_HEADER_ADD_BUTTON: "right_header_add_module_button",
	EMPTY_STATE_ADD_BUTTON: "empty_state_add_module_button",
	COMMAND_PALETTE_ADD_ITEM: "command_palette_add_module_item",
	RIGHT_SIDEBAR: "module_right_sidebar",
	QUICK_ACTIONS: "module_quick_actions",
	CONTEXT_MENU: "module_context_menu",
	LIST_ITEM: "module_list_item",
	CARD_ITEM: "module_card_item"
};
/**
* ===========================================================================
* Work Item Events and Elements
* ===========================================================================
*/
const WORK_ITEM_TRACKER_EVENTS = {
	create: "work_item_created",
	add_existing: "work_item_add_existing",
	update: "work_item_updated",
	delete: "work_item_deleted",
	archive: "work_item_archived",
	restore: "work_item_restored",
	attachment: {
		add: "work_item_attachment_added",
		remove: "work_item_attachment_removed"
	},
	sub_issue: {
		update: "sub_issue_updated",
		remove: "sub_issue_removed",
		delete: "sub_issue_deleted",
		create: "sub_issue_created",
		add_existing: "sub_issue_add_existing"
	},
	draft: { create: "draft_work_item_created" }
};
const WORK_ITEM_TRACKER_ELEMENTS = {
	HEADER_ADD_BUTTON: {
		WORK_ITEMS: "work_items_header_add_work_item_button",
		PROJECT_VIEW: "project_view_header_add_work_item_button",
		CYCLE: "cycle_header_add_work_item_button",
		MODULE: "module_header_add_work_item_button"
	},
	COMMAND_PALETTE_ADD_BUTTON: "command_palette_add_work_item_button",
	EMPTY_STATE_ADD_BUTTON: {
		WORK_ITEMS: "work_items_empty_state_add_work_item_button",
		PROJECT_VIEW: "project_view_empty_state_add_work_item_button",
		CYCLE: "cycle_empty_state_add_work_item_button",
		MODULE: "module_empty_state_add_work_item_button",
		GLOBAL_VIEW: "global_view_empty_state_add_work_item_button"
	},
	QUICK_ACTIONS: {
		WORK_ITEMS: "work_items_quick_actions",
		PROJECT_VIEW: "project_view_work_items_quick_actions",
		CYCLE: "cycle_work_items_quick_actions",
		MODULE: "module_work_items_quick_actions",
		GLOBAL_VIEW: "global_view_work_items_quick_actions",
		ARCHIVED: "archived_work_items_quick_actions",
		DRAFT: "draft_work_items_quick_actions"
	},
	CONTEXT_MENU: {
		WORK_ITEMS: "work_items_context_menu",
		PROJECT_VIEW: "project_view_context_menu",
		CYCLE: "cycle_context_menu",
		MODULE: "module_context_menu",
		GLOBAL_VIEW: "global_view_context_menu",
		ARCHIVED: "archived_context_menu",
		DRAFT: "draft_context_menu"
	}
};
/**
* ===========================================================================
* State Events and Elements
* ===========================================================================
*/
const STATE_TRACKER_EVENTS = {
	create: "state_created",
	update: "state_updated",
	delete: "state_deleted"
};
const STATE_TRACKER_ELEMENTS = {
	STATE_GROUP_ADD_BUTTON: "state_group_add_button",
	STATE_LIST_DELETE_BUTTON: "state_list_delete_button",
	STATE_LIST_EDIT_BUTTON: "state_list_edit_button"
};
/**
* ===========================================================================
* Project Page Events and Elements
* ===========================================================================
*/
const PROJECT_PAGE_TRACKER_EVENTS = {
	create: "project_page_created",
	update: "project_page_updated",
	delete: "project_page_deleted",
	archive: "project_page_archived",
	restore: "project_page_restored",
	lock: "project_page_locked",
	unlock: "project_page_unlocked",
	access_update: "project_page_access_updated",
	duplicate: "project_page_duplicated",
	favorite: "project_page_favorited",
	unfavorite: "project_page_unfavorited",
	move: "project_page_moved"
};
const PROJECT_PAGE_TRACKER_ELEMENTS = {
	COMMAND_PALETTE_SHORTCUT_CREATE_BUTTON: "command_palette_shortcut_create_page_button",
	EMPTY_STATE_CREATE_BUTTON: "empty_state_create_page_button",
	COMMAND_PALETTE_CREATE_BUTTON: "command_palette_create_page_button",
	CONTEXT_MENU: "page_context_menu",
	QUICK_ACTIONS: "page_quick_actions",
	LIST_ITEM: "page_list_item",
	FAVORITE_BUTTON: "page_favorite_button",
	ARCHIVE_BUTTON: "page_archive_button",
	LOCK_BUTTON: "page_lock_button",
	ACCESS_TOGGLE: "page_access_toggle",
	DUPLICATE_BUTTON: "page_duplicate_button"
};
/**
* ===========================================================================
* Member Events and Elements
* ===========================================================================
*/
const MEMBER_TRACKER_EVENTS = {
	invite: "member_invited",
	accept: "member_accepted",
	project: {
		add: "project_member_added",
		leave: "project_member_left"
	},
	workspace: { leave: "workspace_member_left" }
};
const MEMBER_TRACKER_ELEMENTS = {
	HEADER_ADD_BUTTON: "header_add_member_button",
	ACCEPT_INVITATION_BUTTON: "accept_invitation_button",
	ONBOARDING_JOIN_WORKSPACE: "workspace_join_continue_to_workspace_button",
	ONBOARDING_INVITE_MEMBER: "invite_member_continue_button",
	SIDEBAR_PROJECT_QUICK_ACTIONS: "sidebar_project_quick_actions",
	PROJECT_MEMBER_TABLE_CONTEXT_MENU: "project_member_table_context_menu",
	WORKSPACE_MEMBER_TABLE_CONTEXT_MENU: "workspace_member_table_context_menu",
	WORKSPACE_INVITATIONS_LIST_CONTEXT_MENU: "workspace_invitations_list_context_menu"
};
/**
* ===========================================================================
* Auth Events and Elements
* ===========================================================================
*/
const AUTH_TRACKER_EVENTS = {
	code_verify: "code_verified",
	sign_up_with_password: "sign_up_with_password",
	sign_in_with_password: "sign_in_with_password",
	forgot_password: "forgot_password_clicked",
	new_code_requested: "new_code_requested",
	password_created: "password_created"
};
const AUTH_TRACKER_ELEMENTS = {
	NAVIGATE_TO_SIGN_UP: "navigate_to_sign_up",
	FORGOT_PASSWORD_FROM_SIGNIN: "forgot_password_from_signin",
	SIGNUP_FROM_FORGOT_PASSWORD: "signup_from_forgot_password",
	SIGN_IN_FROM_SIGNUP: "sign_in_from_signup",
	SIGN_IN_WITH_UNIQUE_CODE: "sign_in_with_unique_code",
	REQUEST_NEW_CODE: "request_new_code",
	VERIFY_CODE: "verify_code",
	SET_PASSWORD_FORM: "set_password_form"
};
/**
* ===========================================================================
* Global View Events and Elements
* ===========================================================================
*/
const GLOBAL_VIEW_TRACKER_EVENTS = {
	create: "global_view_created",
	update: "global_view_updated",
	delete: "global_view_deleted",
	open: "global_view_opened"
};
const GLOBAL_VIEW_TRACKER_ELEMENTS = {
	RIGHT_HEADER_ADD_BUTTON: "global_view_right_header_add_button",
	HEADER_SAVE_VIEW_BUTTON: "global_view_header_save_view_button",
	QUICK_ACTIONS: "global_view_quick_actions",
	LIST_ITEM: "global_view_list_item"
};
/**
* ===========================================================================
* Project View Events and Elements
* ===========================================================================
*/
const PROJECT_VIEW_TRACKER_EVENTS = {
	create: "project_view_created",
	update: "project_view_updated",
	delete: "project_view_deleted"
};
const PROJECT_VIEW_TRACKER_ELEMENTS = {
	RIGHT_HEADER_ADD_BUTTON: "project_view_right_header_add_button",
	COMMAND_PALETTE_ADD_ITEM: "command_palette_add_project_view_item",
	EMPTY_STATE_CREATE_BUTTON: "project_view_empty_state_create_button",
	HEADER_SAVE_VIEW_BUTTON: "project_view_header_save_view_button",
	PROJECT_HEADER_SAVE_AS_VIEW_BUTTON: "project_view_header_save_as_view_button",
	CYCLE_HEADER_SAVE_AS_VIEW_BUTTON: "cycle_header_save_as_view_button",
	MODULE_HEADER_SAVE_AS_VIEW_BUTTON: "module_header_save_as_view_button",
	QUICK_ACTIONS: "project_view_quick_actions",
	LIST_ITEM_CONTEXT_MENU: "project_view_list_item_context_menu"
};
/**
* ===========================================================================
* Product Tour Events and Elements
* ===========================================================================
*/
const PRODUCT_TOUR_TRACKER_EVENTS = { complete: "product_tour_completed" };
const PRODUCT_TOUR_TRACKER_ELEMENTS = {
	START_BUTTON: "product_tour_start_button",
	SKIP_BUTTON: "product_tour_skip_button",
	CREATE_PROJECT_BUTTON: "product_tour_create_project_button"
};
/**
* ===========================================================================
* Notification Events and Elements
* ===========================================================================
*/
const NOTIFICATION_TRACKER_EVENTS = {
	archive: "notification_archived",
	unarchive: "notification_unarchived",
	mark_read: "notification_marked_read",
	mark_unread: "notification_marked_unread",
	all_marked_read: "all_notifications_marked_read"
};
const NOTIFICATION_TRACKER_ELEMENTS = {
	MARK_ALL_AS_READ_BUTTON: "mark_all_as_read_button",
	ARCHIVE_UNARCHIVE_BUTTON: "archive_unarchive_button",
	MARK_READ_UNREAD_BUTTON: "mark_read_unread_button"
};
/**
* ===========================================================================
* User Events
* ===========================================================================
*/
const USER_TRACKER_EVENTS = {
	add_details: "user_details_added",
	onboarding_complete: "user_onboarding_completed"
};
const USER_TRACKER_ELEMENTS = {
	PRODUCT_CHANGELOG_MODAL: "product_changelog_modal",
	CHANGELOG_REDIRECTED: "changelog_redirected"
};
/**
* ===========================================================================
* Onboarding Events and Elements
* ===========================================================================
*/
const ONBOARDING_TRACKER_ELEMENTS = {
	PROFILE_SETUP_FORM: "onboarding_profile_setup_form",
	PASSWORD_CREATION_SELECTED: "onboarding_password_creation_selected",
	PASSWORD_CREATION_SKIPPED: "onboarding_password_creation_skipped"
};
/**
* ===========================================================================
* Sidebar Events
* ===========================================================================
*/
const SIDEBAR_TRACKER_ELEMENTS = {
	USER_MENU_ITEM: "sidenav_user_menu_item",
	CREATE_WORK_ITEM_BUTTON: "sidebar_create_work_item_button"
};
/**
* ===========================================================================
* Project Settings Events and Elements
* ===========================================================================
*/
const PROJECT_SETTINGS_TRACKER_ELEMENTS = {
	LABELS_EMPTY_STATE_CREATE_BUTTON: "labels_empty_state_create_button",
	LABELS_HEADER_CREATE_BUTTON: "labels_header_create_button",
	LABELS_CONTEXT_MENU: "labels_context_menu",
	LABELS_DELETE_BUTTON: "labels_delete_button",
	ESTIMATES_TOGGLE_BUTTON: "estimates_toggle_button",
	ESTIMATES_EMPTY_STATE_CREATE_BUTTON: "estimates_empty_state_create_button",
	ESTIMATES_LIST_ITEM: "estimates_list_item",
	AUTOMATIONS_ARCHIVE_TOGGLE_BUTTON: "automations_archive_toggle_button",
	AUTOMATIONS_CLOSE_TOGGLE_BUTTON: "automations_close_toggle_button"
};
const PROJECT_SETTINGS_TRACKER_EVENTS = {
	label_created: "label_created",
	label_updated: "label_updated",
	label_deleted: "label_deleted",
	estimate_created: "estimate_created",
	estimate_updated: "estimate_updated",
	estimate_deleted: "estimate_deleted",
	estimates_toggle: "estimates_toggled",
	auto_close_workitems: "auto_close_workitems",
	auto_archive_workitems: "auto_archive_workitems"
};
/**
* ===========================================================================
* Profile Settings Events and Elements
* ===========================================================================
*/
const PROFILE_SETTINGS_TRACKER_EVENTS = {
	deactivate_account: "deactivate_account",
	update_profile: "update_profile",
	first_day_updated: "first_day_updated",
	language_updated: "language_updated",
	timezone_updated: "timezone_updated",
	theme_updated: "theme_updated",
	notifications_updated: "notifications_updated",
	pat_created: "pat_created",
	pat_deleted: "pat_deleted"
};
const PROFILE_SETTINGS_TRACKER_ELEMENTS = {
	SAVE_CHANGES_BUTTON: "save_changes_button",
	DEACTIVATE_ACCOUNT_BUTTON: "deactivate_account_button",
	THEME_DROPDOWN: "preferences_theme_dropdown",
	FIRST_DAY_OF_WEEK_DROPDOWN: "preferences_first_day_of_week_dropdown",
	LANGUAGE_DROPDOWN: "preferences_language_dropdown",
	TIMEZONE_DROPDOWN: "preferences_timezone_dropdown",
	PROPERTY_CHANGES_TOGGLE: "notifications_property_changes_toggle",
	STATE_CHANGES_TOGGLE: "notifications_state_changes_toggle",
	COMMENTS_TOGGLE: "notifications_comments_toggle",
	MENTIONS_TOGGLE: "notifications_mentions_toggle",
	HEADER_ADD_PAT_BUTTON: "header_add_pat_button",
	EMPTY_STATE_ADD_PAT_BUTTON: "empty_state_add_pat_button",
	LIST_ITEM_DELETE_ICON: "list_item_delete_icon"
};
/**
* ===========================================================================
* Workspace Settings Events and Elements
* ===========================================================================
*/
const WORKSPACE_SETTINGS_TRACKER_EVENTS = {
	upgrade_plan_redirected: "upgrade_plan_redirected",
	csv_exported: "csv_exported",
	webhook_created: "webhook_created",
	webhook_deleted: "webhook_deleted",
	webhook_toggled: "webhook_toggled",
	webhook_details_page_toggled: "webhook_details_page_toggled",
	webhook_updated: "webhook_updated"
};
const WORKSPACE_SETTINGS_TRACKER_ELEMENTS = {
	BILLING_UPGRADE_BUTTON: (subscriptionType) => `billing_upgrade_${subscriptionType}_button`,
	BILLING_TALK_TO_SALES_BUTTON: "billing_talk_to_sales_button",
	EXPORT_BUTTON: "export_button",
	HEADER_ADD_WEBHOOK_BUTTON: "header_add_webhook_button",
	EMPTY_STATE_ADD_WEBHOOK_BUTTON: "empty_state_add_webhook_button",
	LIST_ITEM_DELETE_BUTTON: "list_item_delete_button",
	WEBHOOK_LIST_ITEM_TOGGLE_SWITCH: "webhook_list_item_toggle_switch",
	WEBHOOK_DETAILS_PAGE_TOGGLE_SWITCH: "webhook_details_page_toggle_switch",
	WEBHOOK_DELETE_BUTTON: "webhook_delete_button",
	WEBHOOK_UPDATE_BUTTON: "webhook_update_button"
};

//#endregion
//#region src/file.ts
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_AVATAR_IMAGE_MIME_TYPES_FOR_REACT_DROPZONE = {
	"image/jpeg": [],
	"image/jpg": [],
	"image/png": [],
	"image/webp": []
};
const ACCEPTED_COVER_IMAGE_MIME_TYPES_FOR_REACT_DROPZONE = {
	"image/jpeg": [],
	"image/jpg": [],
	"image/png": [],
	"image/webp": []
};

//#endregion
//#region src/filter.ts
let E_SORT_ORDER = /* @__PURE__ */ function(E_SORT_ORDER$1) {
	E_SORT_ORDER$1["ASC"] = "asc";
	E_SORT_ORDER$1["DESC"] = "desc";
	return E_SORT_ORDER$1;
}({});
const DATE_AFTER_FILTER_OPTIONS = [
	{
		name: "1 week from now",
		value: "1_weeks;after;fromnow"
	},
	{
		name: "2 weeks from now",
		value: "2_weeks;after;fromnow"
	},
	{
		name: "1 month from now",
		value: "1_months;after;fromnow"
	},
	{
		name: "2 months from now",
		value: "2_months;after;fromnow"
	}
];
const DATE_BEFORE_FILTER_OPTIONS = [
	{
		name: "1 week ago",
		value: "1_weeks;before;fromnow"
	},
	{
		name: "2 weeks ago",
		value: "2_weeks;before;fromnow"
	},
	{
		name: "1 month ago",
		i18n_name: "date_filters.1_month_ago",
		value: "1_months;before;fromnow"
	}
];
const PROJECT_CREATED_AT_FILTER_OPTIONS = [
	{
		name: "Today",
		value: "today;custom;custom"
	},
	{
		name: "Yesterday",
		value: "yesterday;custom;custom"
	},
	{
		name: "Last 7 days",
		value: "last_7_days;custom;custom"
	},
	{
		name: "Last 30 days",
		value: "last_30_days;custom;custom"
	}
];

//#endregion
//#region src/graph.ts
const CHARTS_THEME = {
	background: "transparent",
	text: { color: "rgb(var(--color-text-200))" },
	axis: { domain: { line: {
		stroke: "rgb(var(--color-background-80))",
		strokeWidth: .5
	} } },
	tooltip: { container: {
		background: "rgb(var(--color-background-80))",
		color: "rgb(var(--color-text-200))",
		fontSize: "0.8rem",
		border: "1px solid rgb(var(--color-border-300))"
	} },
	grid: { line: { stroke: "rgb(var(--color-border-100))" } }
};
const CHART_DEFAULT_MARGIN = {
	top: 50,
	right: 50,
	bottom: 50,
	left: 50
};

//#endregion
//#region src/icon.ts
let EIconSize = /* @__PURE__ */ function(EIconSize$1) {
	EIconSize$1["XS"] = "xs";
	EIconSize$1["SM"] = "sm";
	EIconSize$1["MD"] = "md";
	EIconSize$1["LG"] = "lg";
	EIconSize$1["XL"] = "xl";
	return EIconSize$1;
}({});

//#endregion
//#region src/instance.ts
let EInstanceStatus = /* @__PURE__ */ function(EInstanceStatus$1) {
	EInstanceStatus$1["ERROR"] = "ERROR";
	EInstanceStatus$1["NOT_YET_READY"] = "NOT_YET_READY";
	return EInstanceStatus$1;
}({});

//#endregion
//#region src/intake.ts
const INBOX_STATUS = [
	{
		key: "pending",
		i18n_title: "inbox_issue.status.pending.title",
		status: EInboxIssueStatus.PENDING,
		i18n_description: () => `inbox_issue.status.pending.description`
	},
	{
		key: "declined",
		i18n_title: "inbox_issue.status.declined.title",
		status: EInboxIssueStatus.DECLINED,
		i18n_description: () => `inbox_issue.status.declined.description`
	},
	{
		key: "snoozed",
		i18n_title: "inbox_issue.status.snoozed.title",
		status: EInboxIssueStatus.SNOOZED,
		i18n_description: () => `inbox_issue.status.snoozed.description`
	},
	{
		key: "accepted",
		i18n_title: "inbox_issue.status.accepted.title",
		status: EInboxIssueStatus.ACCEPTED,
		i18n_description: () => `inbox_issue.status.accepted.description`
	},
	{
		key: "duplicate",
		i18n_title: "inbox_issue.status.duplicate.title",
		status: EInboxIssueStatus.DUPLICATE,
		i18n_description: () => `inbox_issue.status.duplicate.description`
	}
];
const INBOX_ISSUE_ORDER_BY_OPTIONS = [
	{
		key: "issue__created_at",
		i18n_label: "inbox_issue.order_by.created_at"
	},
	{
		key: "issue__updated_at",
		i18n_label: "inbox_issue.order_by.updated_at"
	},
	{
		key: "issue__sequence_id",
		i18n_label: "inbox_issue.order_by.id"
	}
];
const INBOX_ISSUE_SORT_BY_OPTIONS = [{
	key: "asc",
	i18n_label: "common.sort.asc"
}, {
	key: "desc",
	i18n_label: "common.sort.desc"
}];
let EPastDurationFilters = /* @__PURE__ */ function(EPastDurationFilters$1) {
	EPastDurationFilters$1["TODAY"] = "today";
	EPastDurationFilters$1["YESTERDAY"] = "yesterday";
	EPastDurationFilters$1["LAST_7_DAYS"] = "last_7_days";
	EPastDurationFilters$1["LAST_30_DAYS"] = "last_30_days";
	return EPastDurationFilters$1;
}({});
const PAST_DURATION_FILTER_OPTIONS = [
	{
		name: "Today",
		value: EPastDurationFilters.TODAY
	},
	{
		name: "Yesterday",
		value: EPastDurationFilters.YESTERDAY
	},
	{
		name: "Last 7 days",
		value: EPastDurationFilters.LAST_7_DAYS
	},
	{
		name: "Last 30 days",
		value: EPastDurationFilters.LAST_30_DAYS
	}
];

//#endregion
//#region src/issue/common.ts
const ALL_ISSUES = "All Issues";
let EIssueGroupByToServerOptions = /* @__PURE__ */ function(EIssueGroupByToServerOptions$1) {
	EIssueGroupByToServerOptions$1["state"] = "state_id";
	EIssueGroupByToServerOptions$1["priority"] = "priority";
	EIssueGroupByToServerOptions$1["labels"] = "labels__id";
	EIssueGroupByToServerOptions$1["state_detail.group"] = "state__group";
	EIssueGroupByToServerOptions$1["assignees"] = "assignees__id";
	EIssueGroupByToServerOptions$1["cycle"] = "cycle_id";
	EIssueGroupByToServerOptions$1["module"] = "issue_module__module_id";
	EIssueGroupByToServerOptions$1["target_date"] = "target_date";
	EIssueGroupByToServerOptions$1["project"] = "project_id";
	EIssueGroupByToServerOptions$1["created_by"] = "created_by";
	EIssueGroupByToServerOptions$1["team_project"] = "project_id";
	return EIssueGroupByToServerOptions$1;
}({});
let EIssueGroupBYServerToProperty = /* @__PURE__ */ function(EIssueGroupBYServerToProperty$1) {
	EIssueGroupBYServerToProperty$1["state_id"] = "state_id";
	EIssueGroupBYServerToProperty$1["priority"] = "priority";
	EIssueGroupBYServerToProperty$1["labels__id"] = "label_ids";
	EIssueGroupBYServerToProperty$1["state__group"] = "state__group";
	EIssueGroupBYServerToProperty$1["assignees__id"] = "assignee_ids";
	EIssueGroupBYServerToProperty$1["cycle_id"] = "cycle_id";
	EIssueGroupBYServerToProperty$1["issue_module__module_id"] = "module_ids";
	EIssueGroupBYServerToProperty$1["target_date"] = "target_date";
	EIssueGroupBYServerToProperty$1["project_id"] = "project_id";
	EIssueGroupBYServerToProperty$1["created_by"] = "created_by";
	return EIssueGroupBYServerToProperty$1;
}({});
let EIssueCommentAccessSpecifier = /* @__PURE__ */ function(EIssueCommentAccessSpecifier$1) {
	EIssueCommentAccessSpecifier$1["EXTERNAL"] = "EXTERNAL";
	EIssueCommentAccessSpecifier$1["INTERNAL"] = "INTERNAL";
	return EIssueCommentAccessSpecifier$1;
}({});
let EIssueListRow = /* @__PURE__ */ function(EIssueListRow$1) {
	EIssueListRow$1["HEADER"] = "HEADER";
	EIssueListRow$1["ISSUE"] = "ISSUE";
	EIssueListRow$1["NO_ISSUES"] = "NO_ISSUES";
	EIssueListRow$1["QUICK_ADD"] = "QUICK_ADD";
	return EIssueListRow$1;
}({});
const ISSUE_PRIORITIES = [
	{
		key: "urgent",
		title: "Urgent"
	},
	{
		key: "high",
		title: "High"
	},
	{
		key: "medium",
		title: "Medium"
	},
	{
		key: "low",
		title: "Low"
	},
	{
		key: "none",
		title: "None"
	}
];
const DRAG_ALLOWED_GROUPS = [
	"state",
	"priority",
	"assignees",
	"labels",
	"module",
	"cycle"
];
const ISSUE_GROUP_BY_OPTIONS = [
	{
		key: "state",
		titleTranslationKey: "common.states"
	},
	{
		key: "state_detail.group",
		titleTranslationKey: "common.state_groups"
	},
	{
		key: "priority",
		titleTranslationKey: "common.priority"
	},
	{
		key: "team_project",
		titleTranslationKey: "common.team_project"
	},
	{
		key: "project",
		titleTranslationKey: "common.project"
	},
	{
		key: "cycle",
		titleTranslationKey: "common.cycle"
	},
	{
		key: "module",
		titleTranslationKey: "common.module"
	},
	{
		key: "labels",
		titleTranslationKey: "common.labels"
	},
	{
		key: "assignees",
		titleTranslationKey: "common.assignees"
	},
	{
		key: "created_by",
		titleTranslationKey: "common.created_by"
	},
	{
		key: null,
		titleTranslationKey: "common.none"
	}
];
const ISSUE_ORDER_BY_OPTIONS = [
	{
		key: "sort_order",
		titleTranslationKey: "common.order_by.manual"
	},
	{
		key: "-created_at",
		titleTranslationKey: "common.order_by.last_created"
	},
	{
		key: "-updated_at",
		titleTranslationKey: "common.order_by.last_updated"
	},
	{
		key: "start_date",
		titleTranslationKey: "common.order_by.start_date"
	},
	{
		key: "target_date",
		titleTranslationKey: "common.order_by.due_date"
	},
	{
		key: "-priority",
		titleTranslationKey: "common.priority"
	}
];
const ISSUE_DISPLAY_PROPERTIES_KEYS = [
	"assignee",
	"start_date",
	"due_date",
	"labels",
	"key",
	"priority",
	"state",
	"sub_issue_count",
	"link",
	"attachment_count",
	"estimate",
	"created_on",
	"updated_on",
	"modules",
	"cycle",
	"issue_type"
];
const SUB_ISSUES_DISPLAY_PROPERTIES_KEYS = [
	"key",
	"assignee",
	"start_date",
	"due_date",
	"priority",
	"state"
];
const ISSUE_DISPLAY_PROPERTIES = [
	{
		key: "key",
		titleTranslationKey: "issue.display.properties.id"
	},
	{
		key: "issue_type",
		titleTranslationKey: "issue.display.properties.issue_type"
	},
	{
		key: "assignee",
		titleTranslationKey: "common.assignee"
	},
	{
		key: "start_date",
		titleTranslationKey: "common.order_by.start_date"
	},
	{
		key: "due_date",
		titleTranslationKey: "common.order_by.due_date"
	},
	{
		key: "labels",
		titleTranslationKey: "common.labels"
	},
	{
		key: "priority",
		titleTranslationKey: "common.priority"
	},
	{
		key: "state",
		titleTranslationKey: "common.state"
	},
	{
		key: "sub_issue_count",
		titleTranslationKey: "issue.display.properties.sub_issue_count"
	},
	{
		key: "attachment_count",
		titleTranslationKey: "issue.display.properties.attachment_count"
	},
	{
		key: "link",
		titleTranslationKey: "common.link"
	},
	{
		key: "estimate",
		titleTranslationKey: "common.estimate"
	},
	{
		key: "modules",
		titleTranslationKey: "common.module"
	},
	{
		key: "cycle",
		titleTranslationKey: "common.cycle"
	}
];
const SPREADSHEET_PROPERTY_LIST = [
	"state",
	"priority",
	"assignee",
	"labels",
	"modules",
	"cycle",
	"start_date",
	"due_date",
	"estimate",
	"created_on",
	"updated_on",
	"link",
	"attachment_count",
	"sub_issue_count"
];
const SPREADSHEET_PROPERTY_DETAILS = {
	assignee: {
		i18n_title: "common.assignees",
		ascendingOrderKey: "assignees__first_name",
		ascendingOrderTitle: "A",
		descendingOrderKey: "-assignees__first_name",
		descendingOrderTitle: "Z",
		icon: "MembersPropertyIcon"
	},
	created_on: {
		i18n_title: "common.sort.created_on",
		ascendingOrderKey: "-created_at",
		ascendingOrderTitle: "New",
		descendingOrderKey: "created_at",
		descendingOrderTitle: "Old",
		icon: "CalendarDays"
	},
	due_date: {
		i18n_title: "common.order_by.due_date",
		ascendingOrderKey: "-target_date",
		ascendingOrderTitle: "New",
		descendingOrderKey: "target_date",
		descendingOrderTitle: "Old",
		icon: "DueDatePropertyIcon"
	},
	estimate: {
		i18n_title: "common.estimate",
		ascendingOrderKey: "estimate_point__key",
		ascendingOrderTitle: "Low",
		descendingOrderKey: "-estimate_point__key",
		descendingOrderTitle: "High",
		icon: "EstimatePropertyIcon"
	},
	labels: {
		i18n_title: "common.labels",
		ascendingOrderKey: "labels__name",
		ascendingOrderTitle: "A",
		descendingOrderKey: "-labels__name",
		descendingOrderTitle: "Z",
		icon: "LabelPropertyIcon"
	},
	modules: {
		i18n_title: "common.modules",
		ascendingOrderKey: "issue_module__module__name",
		ascendingOrderTitle: "A",
		descendingOrderKey: "-issue_module__module__name",
		descendingOrderTitle: "Z",
		icon: "DiceIcon"
	},
	cycle: {
		i18n_title: "common.cycle",
		ascendingOrderKey: "issue_cycle__cycle__name",
		ascendingOrderTitle: "A",
		descendingOrderKey: "-issue_cycle__cycle__name",
		descendingOrderTitle: "Z",
		icon: "ContrastIcon"
	},
	priority: {
		i18n_title: "common.priority",
		ascendingOrderKey: "priority",
		ascendingOrderTitle: "None",
		descendingOrderKey: "-priority",
		descendingOrderTitle: "Urgent",
		icon: "PriorityPropertyIcon"
	},
	start_date: {
		i18n_title: "common.order_by.start_date",
		ascendingOrderKey: "-start_date",
		ascendingOrderTitle: "New",
		descendingOrderKey: "start_date",
		descendingOrderTitle: "Old",
		icon: "StartDatePropertyIcon"
	},
	state: {
		i18n_title: "common.state",
		ascendingOrderKey: "state__name",
		ascendingOrderTitle: "A",
		descendingOrderKey: "-state__name",
		descendingOrderTitle: "Z",
		icon: "StatePropertyIcon"
	},
	updated_on: {
		i18n_title: "common.sort.updated_on",
		ascendingOrderKey: "-updated_at",
		ascendingOrderTitle: "New",
		descendingOrderKey: "updated_at",
		descendingOrderTitle: "Old",
		icon: "CalendarDays"
	},
	link: {
		i18n_title: "common.link",
		ascendingOrderKey: "-link_count",
		ascendingOrderTitle: "Most",
		descendingOrderKey: "link_count",
		descendingOrderTitle: "Least",
		icon: "Link2"
	},
	attachment_count: {
		i18n_title: "common.attachment",
		ascendingOrderKey: "-attachment_count",
		ascendingOrderTitle: "Most",
		descendingOrderKey: "attachment_count",
		descendingOrderTitle: "Least",
		icon: "Paperclip"
	},
	sub_issue_count: {
		i18n_title: "issue.display.properties.sub_issue",
		ascendingOrderKey: "-sub_issues_count",
		ascendingOrderTitle: "Most",
		descendingOrderKey: "sub_issues_count",
		descendingOrderTitle: "Least",
		icon: "LayersIcon"
	}
};
const FILTER_TO_ISSUE_MAP = {
	assignees: "assignee_ids",
	created_by: "created_by",
	labels: "label_ids",
	priority: "priority",
	cycle: "cycle_id",
	module: "module_ids",
	project: "project_id",
	state: "state_id",
	issue_type: "type_id",
	state_group: "state__group"
};

//#endregion
//#region src/issue/filter.ts
let EServerGroupByToFilterOptions = /* @__PURE__ */ function(EServerGroupByToFilterOptions$1) {
	EServerGroupByToFilterOptions$1["state_id"] = "state";
	EServerGroupByToFilterOptions$1["priority"] = "priority";
	EServerGroupByToFilterOptions$1["labels__id"] = "labels";
	EServerGroupByToFilterOptions$1["state__group"] = "state_group";
	EServerGroupByToFilterOptions$1["assignees__id"] = "assignees";
	EServerGroupByToFilterOptions$1["cycle_id"] = "cycle";
	EServerGroupByToFilterOptions$1["issue_module__module_id"] = "module";
	EServerGroupByToFilterOptions$1["target_date"] = "target_date";
	EServerGroupByToFilterOptions$1["project_id"] = "project";
	EServerGroupByToFilterOptions$1["created_by"] = "created_by";
	return EServerGroupByToFilterOptions$1;
}({});
let EIssueFilterType = /* @__PURE__ */ function(EIssueFilterType$1) {
	EIssueFilterType$1["FILTERS"] = "rich_filters";
	EIssueFilterType$1["DISPLAY_FILTERS"] = "display_filters";
	EIssueFilterType$1["DISPLAY_PROPERTIES"] = "display_properties";
	EIssueFilterType$1["KANBAN_FILTERS"] = "kanban_filters";
	return EIssueFilterType$1;
}({});
const ISSUE_DISPLAY_FILTERS_BY_LAYOUT = {
	list: { filters: [
		"priority",
		"state",
		"labels"
	] },
	kanban: { filters: [
		"priority",
		"state",
		"labels"
	] },
	calendar: { filters: [
		"priority",
		"state",
		"labels"
	] },
	spreadsheet: { filters: [
		"priority",
		"state",
		"labels"
	] },
	gantt: { filters: [
		"priority",
		"state",
		"labels"
	] }
};
const ISSUE_PRIORITY_FILTERS = [
	{
		key: "urgent",
		titleTranslationKey: "issue.priority.urgent",
		className: "bg-red-500 border-red-500 text-white",
		icon: "error"
	},
	{
		key: "high",
		titleTranslationKey: "issue.priority.high",
		className: "text-orange-500 border-custom-border-300",
		icon: "signal_cellular_alt"
	},
	{
		key: "medium",
		titleTranslationKey: "issue.priority.medium",
		className: "text-yellow-500 border-custom-border-300",
		icon: "signal_cellular_alt_2_bar"
	},
	{
		key: "low",
		titleTranslationKey: "issue.priority.low",
		className: "text-green-500 border-custom-border-300",
		icon: "signal_cellular_alt_1_bar"
	},
	{
		key: "none",
		titleTranslationKey: "common.none",
		className: "text-gray-500 border-custom-border-300",
		icon: "block"
	}
];
const ISSUE_DISPLAY_FILTERS_BY_PAGE = {
	profile_issues: {
		filters: [
			"priority",
			"state_group",
			"label_id",
			"start_date",
			"target_date"
		],
		layoutOptions: {
			list: {
				display_properties: ISSUE_DISPLAY_PROPERTIES_KEYS,
				display_filters: {
					group_by: [
						"state_detail.group",
						"priority",
						"project",
						"labels",
						null
					],
					order_by: [
						"sort_order",
						"-created_at",
						"-updated_at",
						"start_date",
						"-priority"
					],
					type: ["active", "backlog"]
				},
				extra_options: {
					access: true,
					values: ["show_empty_groups", "sub_issue"]
				}
			},
			kanban: {
				display_properties: ISSUE_DISPLAY_PROPERTIES_KEYS,
				display_filters: {
					group_by: [
						"state_detail.group",
						"priority",
						"project",
						"labels"
					],
					order_by: [
						"sort_order",
						"-created_at",
						"-updated_at",
						"start_date",
						"-priority"
					],
					type: ["active", "backlog"]
				},
				extra_options: {
					access: true,
					values: ["show_empty_groups"]
				}
			}
		}
	},
	archived_issues: {
		filters: [
			"priority",
			"state_group",
			"state_id",
			"cycle_id",
			"module_id",
			"assignee_id",
			"created_by_id",
			"label_id",
			"start_date",
			"target_date"
		],
		layoutOptions: { list: {
			display_properties: ISSUE_DISPLAY_PROPERTIES_KEYS,
			display_filters: {
				group_by: [
					"state",
					"cycle",
					"module",
					"priority",
					"labels",
					"assignees",
					"created_by",
					null
				],
				order_by: [
					"sort_order",
					"-created_at",
					"-updated_at",
					"start_date",
					"-priority"
				],
				type: ["active", "backlog"]
			},
			extra_options: {
				access: true,
				values: ["show_empty_groups"]
			}
		} }
	},
	my_issues: {
		filters: [
			"priority",
			"state_group",
			"label_id",
			"assignee_id",
			"created_by_id",
			"subscriber_id",
			"project_id",
			"start_date",
			"target_date"
		],
		layoutOptions: {
			spreadsheet: {
				display_properties: ISSUE_DISPLAY_PROPERTIES_KEYS,
				display_filters: {
					order_by: [],
					type: ["active", "backlog"]
				},
				extra_options: {
					access: true,
					values: ["sub_issue"]
				}
			},
			list: {
				display_properties: ISSUE_DISPLAY_PROPERTIES_KEYS,
				display_filters: { type: ["active", "backlog"] },
				extra_options: {
					access: false,
					values: []
				}
			}
		}
	},
	issues: {
		filters: [
			"priority",
			"state_group",
			"state_id",
			"cycle_id",
			"module_id",
			"assignee_id",
			"mention_id",
			"created_by_id",
			"label_id",
			"start_date",
			"target_date"
		],
		layoutOptions: {
			list: {
				display_properties: ISSUE_DISPLAY_PROPERTIES_KEYS,
				display_filters: {
					group_by: [
						"state",
						"priority",
						"cycle",
						"module",
						"labels",
						"assignees",
						"created_by",
						null
					],
					order_by: [
						"sort_order",
						"-created_at",
						"-updated_at",
						"start_date",
						"-priority",
						"target_date"
					],
					type: ["active", "backlog"]
				},
				extra_options: {
					access: true,
					values: ["show_empty_groups", "sub_issue"]
				}
			},
			kanban: {
				display_properties: ISSUE_DISPLAY_PROPERTIES_KEYS,
				display_filters: {
					group_by: [
						"state",
						"priority",
						"cycle",
						"module",
						"labels",
						"assignees",
						"created_by"
					],
					sub_group_by: [
						"state",
						"priority",
						"cycle",
						"module",
						"labels",
						"assignees",
						"created_by",
						null
					],
					order_by: [
						"sort_order",
						"-created_at",
						"-updated_at",
						"start_date",
						"-priority",
						"target_date"
					],
					type: ["active", "backlog"]
				},
				extra_options: {
					access: true,
					values: ["show_empty_groups", "sub_issue"]
				}
			},
			calendar: {
				display_properties: ["key", "issue_type"],
				display_filters: { type: ["active", "backlog"] },
				extra_options: {
					access: true,
					values: ["sub_issue"]
				}
			},
			spreadsheet: {
				display_properties: ISSUE_DISPLAY_PROPERTIES_KEYS,
				display_filters: {
					order_by: [
						"sort_order",
						"-created_at",
						"-updated_at",
						"start_date",
						"-priority"
					],
					type: ["active", "backlog"]
				},
				extra_options: {
					access: true,
					values: ["sub_issue"]
				}
			},
			gantt_chart: {
				display_properties: ["key", "issue_type"],
				display_filters: {
					order_by: [
						"sort_order",
						"-created_at",
						"-updated_at",
						"start_date",
						"-priority"
					],
					type: ["active", "backlog"]
				},
				extra_options: {
					access: true,
					values: ["sub_issue"]
				}
			}
		}
	},
	sub_work_items: {
		filters: [
			"priority",
			"state_id",
			"assignee_id",
			"start_date",
			"target_date"
		],
		layoutOptions: { list: {
			display_properties: SUB_ISSUES_DISPLAY_PROPERTIES_KEYS,
			display_filters: {
				order_by: [
					"-created_at",
					"-updated_at",
					"start_date",
					"-priority"
				],
				group_by: [
					"state",
					"priority",
					"assignees",
					null
				]
			},
			extra_options: {
				access: true,
				values: ["sub_issue"]
			}
		} }
	}
};
const ISSUE_STORE_TO_FILTERS_MAP = { [EIssuesStoreType.PROJECT]: ISSUE_DISPLAY_FILTERS_BY_PAGE.issues };
const SUB_WORK_ITEM_AVAILABLE_FILTERS_FOR_WORK_ITEM_PAGE = [
	"priority",
	"state",
	"issue_type",
	"assignees",
	"start_date",
	"target_date"
];
let EActivityFilterType = /* @__PURE__ */ function(EActivityFilterType$1) {
	EActivityFilterType$1["ACTIVITY"] = "ACTIVITY";
	EActivityFilterType$1["COMMENT"] = "COMMENT";
	EActivityFilterType$1["STATE"] = "STATE";
	EActivityFilterType$1["ASSIGNEE"] = "ASSIGNEE";
	EActivityFilterType$1["DEFAULT"] = "DEFAULT";
	return EActivityFilterType$1;
}({});
const ACTIVITY_FILTER_TYPE_OPTIONS = {
	[EActivityFilterType.ACTIVITY]: { labelTranslationKey: "common.updates" },
	[EActivityFilterType.COMMENT]: { labelTranslationKey: "common.comments" },
	[EActivityFilterType.STATE]: { labelTranslationKey: "common.state" },
	[EActivityFilterType.ASSIGNEE]: { labelTranslationKey: "common.assignee" }
};
const defaultActivityFilters = [
	EActivityFilterType.ACTIVITY,
	EActivityFilterType.COMMENT,
	EActivityFilterType.STATE,
	EActivityFilterType.ASSIGNEE
];
const filterActivityOnSelectedFilters = (activity, filters) => activity.filter((activity$1) => {
	if (activity$1.activity_type === EActivityFilterType.DEFAULT) return true;
	return filters.includes(activity$1.activity_type);
});
const ENABLE_ISSUE_DEPENDENCIES = false;

//#endregion
//#region src/issue/layout.ts
const SITES_ISSUE_LAYOUTS = [{
	key: "list",
	icon: "List",
	titleTranslationKey: "issue.layouts.list"
}, {
	key: "kanban",
	icon: "Kanban",
	titleTranslationKey: "issue.layouts.kanban"
}];
const ISSUE_LAYOUT_MAP = {
	[EIssueLayoutTypes.LIST]: {
		key: EIssueLayoutTypes.LIST,
		i18n_title: "issue.layouts.title.list",
		i18n_label: "issue.layouts.list"
	},
	[EIssueLayoutTypes.KANBAN]: {
		key: EIssueLayoutTypes.KANBAN,
		i18n_title: "issue.layouts.title.kanban",
		i18n_label: "issue.layouts.kanban"
	},
	[EIssueLayoutTypes.CALENDAR]: {
		key: EIssueLayoutTypes.CALENDAR,
		i18n_title: "issue.layouts.title.calendar",
		i18n_label: "issue.layouts.calendar"
	},
	[EIssueLayoutTypes.SPREADSHEET]: {
		key: EIssueLayoutTypes.SPREADSHEET,
		i18n_title: "issue.layouts.title.spreadsheet",
		i18n_label: "issue.layouts.spreadsheet"
	},
	[EIssueLayoutTypes.GANTT]: {
		key: EIssueLayoutTypes.GANTT,
		i18n_title: "issue.layouts.title.gantt",
		i18n_label: "issue.layouts.gantt"
	}
};
const ISSUE_LAYOUTS = Object.values(ISSUE_LAYOUT_MAP);

//#endregion
//#region src/issue/modal.ts
const DEFAULT_WORK_ITEM_FORM_VALUES = {
	project_id: "",
	type_id: null,
	name: "",
	description_html: "",
	estimate_point: null,
	state_id: "",
	parent_id: null,
	priority: "none",
	assignee_ids: [],
	label_ids: [],
	cycle_id: null,
	module_ids: null,
	start_date: null,
	target_date: null
};

//#endregion
//#region src/members.ts
const MEMBER_PROPERTY_DETAILS = {
	full_name: {
		i18n_title: "project_members.full_name",
		ascendingOrderKey: "full_name",
		ascendingOrderTitle: "A",
		descendingOrderKey: "-full_name",
		descendingOrderTitle: "Z",
		iconName: "User",
		isSortingAllowed: true
	},
	display_name: {
		i18n_title: "project_members.display_name",
		ascendingOrderKey: "display_name",
		ascendingOrderTitle: "A",
		descendingOrderKey: "-display_name",
		descendingOrderTitle: "Z",
		iconName: "User",
		isSortingAllowed: true
	},
	email: {
		i18n_title: "project_members.email",
		ascendingOrderKey: "email",
		ascendingOrderTitle: "A",
		descendingOrderKey: "-email",
		descendingOrderTitle: "Z",
		iconName: "Mail",
		isSortingAllowed: true
	},
	joining_date: {
		i18n_title: "project_members.joining_date",
		ascendingOrderKey: "joining_date",
		ascendingOrderTitle: "Old",
		descendingOrderKey: "-joining_date",
		descendingOrderTitle: "New",
		iconName: "Calendar",
		isSortingAllowed: true
	},
	role: {
		i18n_title: "project_members.role",
		ascendingOrderKey: "role",
		ascendingOrderTitle: "Guest",
		descendingOrderKey: "-role",
		descendingOrderTitle: "Admin",
		iconName: "Shield",
		isSortingAllowed: true
	}
};

//#endregion
//#region src/label.ts
const LABEL_COLOR_OPTIONS = [
	"#FF6900",
	"#FCB900",
	"#7BDCB5",
	"#00D084",
	"#8ED1FC",
	"#0693E3",
	"#ABB8C3",
	"#EB144C",
	"#F78DA7",
	"#9900EF"
];
const getRandomLabelColor = () => {
	return LABEL_COLOR_OPTIONS[Math.floor(Math.random() * LABEL_COLOR_OPTIONS.length)];
};

//#endregion
//#region src/metadata.ts
const SITE_NAME = "Plane | Simple, extensible, open-source project management tool.";
const SITE_TITLE = "Plane | Simple, extensible, open-source project management tool.";
const SITE_DESCRIPTION = "Open-source project management tool to manage work items, cycles, and product roadmaps easily";
const SITE_KEYWORDS = "software development, plan, ship, software, accelerate, code management, release management, project management, work items tracking, agile, scrum, kanban, collaboration";
const SITE_URL = "https://app.plane.so/";
const TWITTER_USER_NAME = "Plane | Simple, extensible, open-source project management tool.";
const SPACE_SITE_NAME = "Plane Publish | Make your Plane boards and roadmaps pubic with just one-click. ";
const SPACE_SITE_TITLE = "Plane Publish | Make your Plane boards public with one-click";
const SPACE_SITE_DESCRIPTION = "Plane Publish is a customer feedback management tool built on top of plane.so";
const SPACE_SITE_KEYWORDS = "software development, customer feedback, software, accelerate, code management, release management, project management, work items tracking, agile, scrum, kanban, collaboration";
const SPACE_SITE_URL = "https://app.plane.so/";
const SPACE_TWITTER_USER_NAME = "planepowers";

//#endregion
//#region src/module.ts
const MODULE_STATUS_COLORS = {
	backlog: "#a3a3a2",
	planned: "#3f76ff",
	paused: "#525252",
	completed: "#16a34a",
	cancelled: "#ef4444",
	"in-progress": "#f39e1f"
};
const MODULE_STATUS = [
	{
		i18n_label: "project_modules.status.backlog",
		value: "backlog",
		color: MODULE_STATUS_COLORS.backlog,
		textColor: "text-custom-text-400",
		bgColor: "bg-custom-background-80"
	},
	{
		i18n_label: "project_modules.status.planned",
		value: "planned",
		color: MODULE_STATUS_COLORS.planned,
		textColor: "text-blue-500",
		bgColor: "bg-indigo-50"
	},
	{
		i18n_label: "project_modules.status.in_progress",
		value: "in-progress",
		color: MODULE_STATUS_COLORS["in-progress"],
		textColor: "text-amber-500",
		bgColor: "bg-amber-50"
	},
	{
		i18n_label: "project_modules.status.paused",
		value: "paused",
		color: MODULE_STATUS_COLORS.paused,
		textColor: "text-custom-text-300",
		bgColor: "bg-custom-background-90"
	},
	{
		i18n_label: "project_modules.status.completed",
		value: "completed",
		color: MODULE_STATUS_COLORS.completed,
		textColor: "text-green-600",
		bgColor: "bg-green-100"
	},
	{
		i18n_label: "project_modules.status.cancelled",
		value: "cancelled",
		color: MODULE_STATUS_COLORS.cancelled,
		textColor: "text-red-500",
		bgColor: "bg-red-50"
	}
];
const MODULE_VIEW_LAYOUTS = [
	{
		key: "list",
		i18n_title: "project_modules.layout.list"
	},
	{
		key: "board",
		i18n_title: "project_modules.layout.board"
	},
	{
		key: "gantt",
		i18n_title: "project_modules.layout.timeline"
	}
];
const MODULE_ORDER_BY_OPTIONS = [
	{
		key: "name",
		i18n_label: "project_modules.order_by.name"
	},
	{
		key: "progress",
		i18n_label: "project_modules.order_by.progress"
	},
	{
		key: "issues_length",
		i18n_label: "project_modules.order_by.issues"
	},
	{
		key: "target_date",
		i18n_label: "project_modules.order_by.due_date"
	},
	{
		key: "created_at",
		i18n_label: "project_modules.order_by.created_at"
	},
	{
		key: "sort_order",
		i18n_label: "project_modules.order_by.manual"
	}
];

//#endregion
//#region src/notification.ts
let ENotificationTab = /* @__PURE__ */ function(ENotificationTab$1) {
	ENotificationTab$1["ALL"] = "all";
	ENotificationTab$1["MENTIONS"] = "mentions";
	return ENotificationTab$1;
}({});
let ENotificationFilterType = /* @__PURE__ */ function(ENotificationFilterType$1) {
	ENotificationFilterType$1["CREATED"] = "created";
	ENotificationFilterType$1["ASSIGNED"] = "assigned";
	ENotificationFilterType$1["SUBSCRIBED"] = "subscribed";
	return ENotificationFilterType$1;
}({});
let ENotificationLoader = /* @__PURE__ */ function(ENotificationLoader$1) {
	ENotificationLoader$1["INIT_LOADER"] = "init-loader";
	ENotificationLoader$1["MUTATION_LOADER"] = "mutation-loader";
	ENotificationLoader$1["PAGINATION_LOADER"] = "pagination-loader";
	ENotificationLoader$1["REFRESH"] = "refresh";
	ENotificationLoader$1["MARK_ALL_AS_READY"] = "mark-all-as-read";
	return ENotificationLoader$1;
}({});
let ENotificationQueryParamType = /* @__PURE__ */ function(ENotificationQueryParamType$1) {
	ENotificationQueryParamType$1["INIT"] = "init";
	ENotificationQueryParamType$1["CURRENT"] = "current";
	ENotificationQueryParamType$1["NEXT"] = "next";
	return ENotificationQueryParamType$1;
}({});
const NOTIFICATION_TABS = [{
	i18n_label: "notification.tabs.all",
	value: ENotificationTab.ALL,
	count: (unReadNotification) => unReadNotification?.total_unread_notifications_count || 0
}, {
	i18n_label: "notification.tabs.mentions",
	value: ENotificationTab.MENTIONS,
	count: (unReadNotification) => unReadNotification?.mention_unread_notifications_count || 0
}];
const FILTER_TYPE_OPTIONS = [
	{
		i18n_label: "notification.filter.assigned",
		value: ENotificationFilterType.ASSIGNED
	},
	{
		i18n_label: "notification.filter.created",
		value: ENotificationFilterType.CREATED
	},
	{
		i18n_label: "notification.filter.subscribed",
		value: ENotificationFilterType.SUBSCRIBED
	}
];
const NOTIFICATION_SNOOZE_OPTIONS = [
	{
		key: "1_day",
		i18n_label: "notification.snooze.1_day",
		value: () => {
			const date = /* @__PURE__ */ new Date();
			return new Date(date.getTime() + 1440 * 60 * 1e3);
		}
	},
	{
		key: "3_days",
		i18n_label: "notification.snooze.3_days",
		value: () => {
			const date = /* @__PURE__ */ new Date();
			return new Date(date.getTime() + 4320 * 60 * 1e3);
		}
	},
	{
		key: "5_days",
		i18n_label: "notification.snooze.5_days",
		value: () => {
			const date = /* @__PURE__ */ new Date();
			return new Date(date.getTime() + 7200 * 60 * 1e3);
		}
	},
	{
		key: "1_week",
		i18n_label: "notification.snooze.1_week",
		value: () => {
			const date = /* @__PURE__ */ new Date();
			return new Date(date.getTime() + 10080 * 60 * 1e3);
		}
	},
	{
		key: "2_weeks",
		i18n_label: "notification.snooze.2_weeks",
		value: () => {
			const date = /* @__PURE__ */ new Date();
			return new Date(date.getTime() + 336 * 60 * 60 * 1e3);
		}
	},
	{
		key: "custom",
		i18n_label: "notification.snooze.custom",
		value: void 0
	}
];
const allTimeIn30MinutesInterval12HoursFormat = [
	{
		label: "12:00",
		value: "12:00"
	},
	{
		label: "12:30",
		value: "12:30"
	},
	{
		label: "01:00",
		value: "01:00"
	},
	{
		label: "01:30",
		value: "01:30"
	},
	{
		label: "02:00",
		value: "02:00"
	},
	{
		label: "02:30",
		value: "02:30"
	},
	{
		label: "03:00",
		value: "03:00"
	},
	{
		label: "03:30",
		value: "03:30"
	},
	{
		label: "04:00",
		value: "04:00"
	},
	{
		label: "04:30",
		value: "04:30"
	},
	{
		label: "05:00",
		value: "05:00"
	},
	{
		label: "05:30",
		value: "05:30"
	},
	{
		label: "06:00",
		value: "06:00"
	},
	{
		label: "06:30",
		value: "06:30"
	},
	{
		label: "07:00",
		value: "07:00"
	},
	{
		label: "07:30",
		value: "07:30"
	},
	{
		label: "08:00",
		value: "08:00"
	},
	{
		label: "08:30",
		value: "08:30"
	},
	{
		label: "09:00",
		value: "09:00"
	},
	{
		label: "09:30",
		value: "09:30"
	},
	{
		label: "10:00",
		value: "10:00"
	},
	{
		label: "10:30",
		value: "10:30"
	},
	{
		label: "11:00",
		value: "11:00"
	},
	{
		label: "11:30",
		value: "11:30"
	}
];

//#endregion
//#region src/page.ts
let EPageAccess = /* @__PURE__ */ function(EPageAccess$1) {
	EPageAccess$1[EPageAccess$1["PUBLIC"] = 0] = "PUBLIC";
	EPageAccess$1[EPageAccess$1["PRIVATE"] = 1] = "PRIVATE";
	return EPageAccess$1;
}({});
const DEFAULT_CREATE_PAGE_MODAL_DATA = {
	isOpen: false,
	pageAccess: EPageAccess.PUBLIC
};

//#endregion
//#region src/payment.ts
/**
* Default billing frequency for each product subscription type
*/
const DEFAULT_PRODUCT_BILLING_FREQUENCY = {
	[EProductSubscriptionEnum.FREE]: void 0,
	[EProductSubscriptionEnum.ONE]: void 0,
	[EProductSubscriptionEnum.PRO]: "month",
	[EProductSubscriptionEnum.BUSINESS]: "month",
	[EProductSubscriptionEnum.ENTERPRISE]: "month"
};
/**
* Subscription types that support billing frequency toggle (monthly/yearly)
*/
const SUBSCRIPTION_WITH_BILLING_FREQUENCY = [
	EProductSubscriptionEnum.PRO,
	EProductSubscriptionEnum.BUSINESS,
	EProductSubscriptionEnum.ENTERPRISE
];
/**
* Mapping of product subscription types to their respective payment product details
* Used to provide information about each product's pricing and features
*/
const PLANE_COMMUNITY_PRODUCTS = {
	[EProductSubscriptionEnum.PRO]: {
		id: EProductSubscriptionEnum.PRO,
		name: "Plane Pro",
		description: "More views, more cycles powers, more pages features, new reports, and better dashboards are waiting to be unlocked.",
		type: "PRO",
		prices: [{
			id: `price_monthly_${EProductSubscriptionEnum.PRO}`,
			unit_amount: 800,
			recurring: "month",
			currency: "usd",
			workspace_amount: 800,
			product: EProductSubscriptionEnum.PRO
		}, {
			id: `price_yearly_${EProductSubscriptionEnum.PRO}`,
			unit_amount: 7200,
			recurring: "year",
			currency: "usd",
			workspace_amount: 7200,
			product: EProductSubscriptionEnum.PRO
		}],
		payment_quantity: 1,
		is_active: true
	},
	[EProductSubscriptionEnum.BUSINESS]: {
		id: EProductSubscriptionEnum.BUSINESS,
		name: "Plane Business",
		description: "The earliest packaging of Business at $10 a seat a month billed annually, $12 a seat a month billed monthly for Plane Cloud",
		type: "BUSINESS",
		prices: [{
			id: `price_yearly_${EProductSubscriptionEnum.BUSINESS}`,
			unit_amount: 15600,
			recurring: "year",
			currency: "usd",
			workspace_amount: 15600,
			product: EProductSubscriptionEnum.BUSINESS
		}, {
			id: `price_monthly_${EProductSubscriptionEnum.BUSINESS}`,
			unit_amount: 1500,
			recurring: "month",
			currency: "usd",
			workspace_amount: 1500,
			product: EProductSubscriptionEnum.BUSINESS
		}],
		payment_quantity: 1,
		is_active: true
	},
	[EProductSubscriptionEnum.ENTERPRISE]: {
		id: EProductSubscriptionEnum.ENTERPRISE,
		name: "Plane Enterprise",
		description: "",
		type: "ENTERPRISE",
		prices: [{
			id: `price_yearly_${EProductSubscriptionEnum.ENTERPRISE}`,
			unit_amount: 0,
			recurring: "year",
			currency: "usd",
			workspace_amount: 0,
			product: EProductSubscriptionEnum.ENTERPRISE
		}, {
			id: `price_monthly_${EProductSubscriptionEnum.ENTERPRISE}`,
			unit_amount: 0,
			recurring: "month",
			currency: "usd",
			workspace_amount: 0,
			product: EProductSubscriptionEnum.ENTERPRISE
		}],
		payment_quantity: 1,
		is_active: false
	}
};
/**
* URL for the "Talk to Sales" page where users can contact sales team
*/
const TALK_TO_SALES_URL = "https://plane.so/talk-to-sales";
/**
* Mapping of subscription types to their respective upgrade/redirection URLs based on billing frequency
* Used for self-hosted installations to redirect users to appropriate upgrade pages
*/
const SUBSCRIPTION_REDIRECTION_URLS = {
	[EProductSubscriptionEnum.FREE]: {
		month: TALK_TO_SALES_URL,
		year: TALK_TO_SALES_URL
	},
	[EProductSubscriptionEnum.ONE]: {
		month: TALK_TO_SALES_URL,
		year: TALK_TO_SALES_URL
	},
	[EProductSubscriptionEnum.PRO]: {
		month: "https://app.plane.so/upgrade/pro/self-hosted?plan=month",
		year: "https://app.plane.so/upgrade/pro/self-hosted?plan=year"
	},
	[EProductSubscriptionEnum.BUSINESS]: {
		month: "https://app.plane.so/upgrade/business/self-hosted?plan=month",
		year: "https://app.plane.so/upgrade/business/self-hosted?plan=year"
	},
	[EProductSubscriptionEnum.ENTERPRISE]: {
		month: TALK_TO_SALES_URL,
		year: TALK_TO_SALES_URL
	}
};
/**
* Mapping of subscription types to their respective marketing webpage URLs
* Used to direct users to learn more about each plan's features and pricing
*/
const SUBSCRIPTION_WEBPAGE_URLS = {
	[EProductSubscriptionEnum.FREE]: TALK_TO_SALES_URL,
	[EProductSubscriptionEnum.ONE]: TALK_TO_SALES_URL,
	[EProductSubscriptionEnum.PRO]: "https://plane.so/pro",
	[EProductSubscriptionEnum.BUSINESS]: "https://plane.so/business",
	[EProductSubscriptionEnum.ENTERPRISE]: "https://plane.so/business"
};

//#endregion
//#region src/profile.ts
const PROFILE_SETTINGS = {
	profile: {
		key: "profile",
		i18n_label: "profile.actions.profile",
		href: `/settings/account`,
		highlight: (pathname) => pathname === "/settings/account/"
	},
	security: {
		key: "security",
		i18n_label: "profile.actions.security",
		href: `/settings/account/security`,
		highlight: (pathname) => pathname === "/settings/account/security/"
	},
	activity: {
		key: "activity",
		i18n_label: "profile.actions.activity",
		href: `/settings/account/activity`,
		highlight: (pathname) => pathname === "/settings/account/activity/"
	},
	preferences: {
		key: "preferences",
		i18n_label: "profile.actions.preferences",
		href: `/settings/account/preferences`,
		highlight: (pathname) => pathname === "/settings/account/preferences"
	},
	notifications: {
		key: "notifications",
		i18n_label: "profile.actions.notifications",
		href: `/settings/account/notifications`,
		highlight: (pathname) => pathname === "/settings/account/notifications/"
	},
	"api-tokens": {
		key: "api-tokens",
		i18n_label: "profile.actions.api-tokens",
		href: `/settings/account/api-tokens`,
		highlight: (pathname) => pathname === "/settings/account/api-tokens/"
	}
};
const PROFILE_ACTION_LINKS = [
	PROFILE_SETTINGS["profile"],
	PROFILE_SETTINGS["security"],
	PROFILE_SETTINGS["activity"],
	PROFILE_SETTINGS["preferences"],
	PROFILE_SETTINGS["notifications"],
	PROFILE_SETTINGS["api-tokens"]
];
const PROFILE_VIEWER_TAB = [{
	key: "summary",
	route: "",
	i18n_label: "profile.tabs.summary",
	selected: "/"
}];
const PROFILE_ADMINS_TAB = [
	{
		key: "assigned",
		route: "assigned",
		i18n_label: "profile.tabs.assigned",
		selected: "/assigned/"
	},
	{
		key: "created",
		route: "created",
		i18n_label: "profile.tabs.created",
		selected: "/created/"
	},
	{
		key: "subscribed",
		route: "subscribed",
		i18n_label: "profile.tabs.subscribed",
		selected: "/subscribed/"
	},
	{
		key: "activity",
		route: "activity",
		i18n_label: "profile.tabs.activity",
		selected: "/activity/"
	}
];
const PREFERENCE_OPTIONS = [{
	id: "theme",
	title: "theme",
	description: "select_or_customize_your_interface_color_scheme"
}, {
	id: "start_of_week",
	title: "First day of the week",
	description: "This will change how all calendars in your app look."
}];
/**
* @description The options for the start of the week
* @type {Array<{value: EStartOfTheWeek, label: string}>}
* @constant
*/
const START_OF_THE_WEEK_OPTIONS = [
	{
		value: EStartOfTheWeek.SUNDAY,
		label: "Sunday"
	},
	{
		value: EStartOfTheWeek.MONDAY,
		label: "Monday"
	},
	{
		value: EStartOfTheWeek.TUESDAY,
		label: "Tuesday"
	},
	{
		value: EStartOfTheWeek.WEDNESDAY,
		label: "Wednesday"
	},
	{
		value: EStartOfTheWeek.THURSDAY,
		label: "Thursday"
	},
	{
		value: EStartOfTheWeek.FRIDAY,
		label: "Friday"
	},
	{
		value: EStartOfTheWeek.SATURDAY,
		label: "Saturday"
	}
];

//#endregion
//#region src/project.ts
const NETWORK_CHOICES = [{
	key: 0,
	labelKey: "Private",
	i18n_label: "workspace_projects.network.private.title",
	description: "workspace_projects.network.private.description",
	iconKey: "Lock"
}, {
	key: 2,
	labelKey: "Public",
	i18n_label: "workspace_projects.network.public.title",
	description: "workspace_projects.network.public.description",
	iconKey: "Globe2"
}];
const GROUP_CHOICES = {
	backlog: {
		key: "backlog",
		i18n_label: "workspace_projects.state.backlog"
	},
	unstarted: {
		key: "unstarted",
		i18n_label: "workspace_projects.state.unstarted"
	},
	started: {
		key: "started",
		i18n_label: "workspace_projects.state.started"
	},
	completed: {
		key: "completed",
		i18n_label: "workspace_projects.state.completed"
	},
	cancelled: {
		key: "cancelled",
		i18n_label: "workspace_projects.state.cancelled"
	}
};
const PROJECT_AUTOMATION_MONTHS = [
	{
		i18n_label: "workspace_projects.common.months_count",
		value: 1
	},
	{
		i18n_label: "workspace_projects.common.months_count",
		value: 3
	},
	{
		i18n_label: "workspace_projects.common.months_count",
		value: 6
	},
	{
		i18n_label: "workspace_projects.common.months_count",
		value: 9
	},
	{
		i18n_label: "workspace_projects.common.months_count",
		value: 12
	}
];
const PROJECT_ORDER_BY_OPTIONS = [
	{
		key: "sort_order",
		i18n_label: "workspace_projects.sort.manual"
	},
	{
		key: "name",
		i18n_label: "workspace_projects.sort.name"
	},
	{
		key: "created_at",
		i18n_label: "workspace_projects.sort.created_at"
	},
	{
		key: "members_length",
		i18n_label: "workspace_projects.sort.members_length"
	}
];
const PROJECT_DISPLAY_FILTER_OPTIONS = [{
	key: "my_projects",
	i18n_label: "workspace_projects.scope.my_projects"
}, {
	key: "archived_projects",
	i18n_label: "workspace_projects.scope.archived_projects"
}];
const PROJECT_ERROR_MESSAGES = {
	permissionError: {
		i18n_title: "workspace_projects.error.permission",
		i18n_message: void 0
	},
	cycleDeleteError: {
		i18n_title: "error",
		i18n_message: "workspace_projects.error.cycle_delete"
	},
	moduleDeleteError: {
		i18n_title: "error",
		i18n_message: "workspace_projects.error.module_delete"
	},
	issueDeleteError: {
		i18n_title: "error",
		i18n_message: "workspace_projects.error.issue_delete"
	}
};
let EProjectFeatureKey = /* @__PURE__ */ function(EProjectFeatureKey$1) {
	EProjectFeatureKey$1["WORK_ITEMS"] = "work_items";
	EProjectFeatureKey$1["CYCLES"] = "cycles";
	EProjectFeatureKey$1["MODULES"] = "modules";
	EProjectFeatureKey$1["VIEWS"] = "views";
	EProjectFeatureKey$1["PAGES"] = "pages";
	EProjectFeatureKey$1["INTAKE"] = "intake";
	return EProjectFeatureKey$1;
}({});

//#endregion
//#region src/rich-filters/operator-labels/core.ts
/**
* Core operator labels
*/
const CORE_OPERATOR_LABELS_MAP = {
	[CORE_EQUALITY_OPERATOR.EXACT]: "is",
	[CORE_COLLECTION_OPERATOR.IN]: "is any of",
	[CORE_COMPARISON_OPERATOR.RANGE]: "between"
};
/**
* Core date-specific operator labels
*/
const CORE_DATE_OPERATOR_LABELS_MAP = {
	[CORE_EQUALITY_OPERATOR.EXACT]: "is",
	[CORE_COMPARISON_OPERATOR.RANGE]: "between"
};

//#endregion
//#region src/rich-filters/operator-labels/extended.ts
/**
* Extended operator labels
*/
const EXTENDED_OPERATOR_LABELS_MAP = {};
/**
* Extended date-specific operator labels
*/
const EXTENDED_DATE_OPERATOR_LABELS_MAP = {};
/**
* Negated operator labels for all operators
*/
const NEGATED_OPERATOR_LABELS_MAP = {};
/**
* Negated date operator labels for all date operators
*/
const NEGATED_DATE_OPERATOR_LABELS_MAP = {};

//#endregion
//#region src/rich-filters/operator-labels/index.ts
/**
* Empty operator label for unselected state
*/
const EMPTY_OPERATOR_LABEL = "--";
/**
* Complete operator labels mapping - combines core, extended, and negated labels
*/
const OPERATOR_LABELS_MAP = {
	...CORE_OPERATOR_LABELS_MAP,
	...EXTENDED_OPERATOR_LABELS_MAP,
	...NEGATED_OPERATOR_LABELS_MAP
};
/**
* Complete date operator labels mapping - combines core, extended, and negated labels
*/
const DATE_OPERATOR_LABELS_MAP = {
	...CORE_DATE_OPERATOR_LABELS_MAP,
	...EXTENDED_DATE_OPERATOR_LABELS_MAP,
	...NEGATED_DATE_OPERATOR_LABELS_MAP
};

//#endregion
//#region src/rich-filters/option.ts
/**
* Default filter config options.
*/
const DEFAULT_FILTER_CONFIG_OPTIONS = {};
/**
* Default filter expression options.
*/
const DEFAULT_FILTER_EXPRESSION_OPTIONS = {};
/**
* Default filter visibility options.
*/
const DEFAULT_FILTER_VISIBILITY_OPTIONS = { autoSetVisibility: true };

//#endregion
//#region src/workspace.ts
const ORGANIZATION_SIZE = [
	"Just myself",
	"2-10",
	"11-50",
	"51-200",
	"201-500",
	"500+"
];
const RESTRICTED_URLS = [
	"404",
	"accounts",
	"api",
	"create-workspace",
	"god-mode",
	"installations",
	"invitations",
	"onboarding",
	"profile",
	"spaces",
	"workspace-invitations",
	"password",
	"flags",
	"monitor",
	"monitoring",
	"ingest",
	"plane-pro",
	"plane-ultimate",
	"enterprise",
	"plane-enterprise",
	"disco",
	"silo",
	"chat",
	"calendar",
	"drive",
	"channels",
	"upgrade",
	"billing",
	"sign-in",
	"sign-up",
	"signin",
	"signup",
	"config",
	"live",
	"admin",
	"m",
	"import",
	"importers",
	"integrations",
	"integration",
	"configuration",
	"initiatives",
	"initiative",
	"config",
	"workflow",
	"workflows",
	"epics",
	"epic",
	"story",
	"mobile",
	"dashboard",
	"desktop",
	"onload",
	"real-time",
	"one",
	"pages",
	"mobile",
	"business",
	"pro",
	"settings",
	"monitor",
	"license",
	"licenses",
	"instances",
	"instance"
];
const WORKSPACE_SETTINGS = {
	general: {
		key: "general",
		i18n_label: "workspace_settings.settings.general.title",
		href: `/settings`,
		access: [EUserWorkspaceRoles.ADMIN, EUserWorkspaceRoles.MEMBER],
		highlight: (pathname, baseUrl) => pathname === `${baseUrl}/settings/`
	},
	members: {
		key: "members",
		i18n_label: "workspace_settings.settings.members.title",
		href: `/settings/members`,
		access: [EUserWorkspaceRoles.ADMIN, EUserWorkspaceRoles.MEMBER],
		highlight: (pathname, baseUrl) => pathname === `${baseUrl}/settings/members/`
	},
	"billing-and-plans": {
		key: "billing-and-plans",
		i18n_label: "workspace_settings.settings.billing_and_plans.title",
		href: `/settings/billing`,
		access: [EUserWorkspaceRoles.ADMIN],
		highlight: (pathname, baseUrl) => pathname === `${baseUrl}/settings/billing/`
	},
	export: {
		key: "export",
		i18n_label: "workspace_settings.settings.exports.title",
		href: `/settings/exports`,
		access: [EUserWorkspaceRoles.ADMIN, EUserWorkspaceRoles.MEMBER],
		highlight: (pathname, baseUrl) => pathname === `${baseUrl}/settings/exports/`
	},
	webhooks: {
		key: "webhooks",
		i18n_label: "workspace_settings.settings.webhooks.title",
		href: `/settings/webhooks`,
		access: [EUserWorkspaceRoles.ADMIN],
		highlight: (pathname, baseUrl) => pathname === `${baseUrl}/settings/webhooks/`
	}
};
const WORKSPACE_SETTINGS_ACCESS = Object.fromEntries(Object.entries(WORKSPACE_SETTINGS).map(([_, { href, access }]) => [href, access]));
const WORKSPACE_SETTINGS_LINKS = [
	WORKSPACE_SETTINGS["general"],
	WORKSPACE_SETTINGS["members"],
	WORKSPACE_SETTINGS["billing-and-plans"],
	WORKSPACE_SETTINGS["export"],
	WORKSPACE_SETTINGS["webhooks"]
];
const ROLE = {
	[EUserWorkspaceRoles.GUEST]: "Guest",
	[EUserWorkspaceRoles.MEMBER]: "Member",
	[EUserWorkspaceRoles.ADMIN]: "Admin"
};
const ROLE_DETAILS = {
	[EUserWorkspaceRoles.GUEST]: {
		i18n_title: "role_details.guest.title",
		i18n_description: "role_details.guest.description"
	},
	[EUserWorkspaceRoles.MEMBER]: {
		i18n_title: "role_details.member.title",
		i18n_description: "role_details.member.description"
	},
	[EUserWorkspaceRoles.ADMIN]: {
		i18n_title: "role_details.admin.title",
		i18n_description: "role_details.admin.description"
	}
};
const USER_ROLES = [
	{
		value: "Product / Project Manager",
		i18n_label: "user_roles.product_or_project_manager"
	},
	{
		value: "Development / Engineering",
		i18n_label: "user_roles.development_or_engineering"
	},
	{
		value: "Founder / Executive",
		i18n_label: "user_roles.founder_or_executive"
	},
	{
		value: "Freelancer / Consultant",
		i18n_label: "user_roles.freelancer_or_consultant"
	},
	{
		value: "Marketing / Growth",
		i18n_label: "user_roles.marketing_or_growth"
	},
	{
		value: "Sales / Business Development",
		i18n_label: "user_roles.sales_or_business_development"
	},
	{
		value: "Support / Operations",
		i18n_label: "user_roles.support_or_operations"
	},
	{
		value: "Student / Professor",
		i18n_label: "user_roles.student_or_professor"
	},
	{
		value: "Human Resources",
		i18n_label: "user_roles.human_resources"
	},
	{
		value: "Other",
		i18n_label: "user_roles.other"
	}
];
const IMPORTERS_LIST = [{
	provider: "github",
	type: "import",
	i18n_title: "importer.github.title",
	i18n_description: "importer.github.description"
}, {
	provider: "jira",
	type: "import",
	i18n_title: "importer.jira.title",
	i18n_description: "importer.jira.description"
}];
const EXPORTERS_LIST = [
	{
		provider: "csv",
		type: "export",
		i18n_title: "exporter.csv.title",
		i18n_description: "exporter.csv.description"
	},
	{
		provider: "xlsx",
		type: "export",
		i18n_title: "exporter.excel.title",
		i18n_description: "exporter.csv.description"
	},
	{
		provider: "json",
		type: "export",
		i18n_title: "exporter.json.title",
		i18n_description: "exporter.csv.description"
	}
];
const DEFAULT_GLOBAL_VIEWS_LIST = [
	{
		key: "all-issues",
		i18n_label: "default_global_view.all_issues"
	},
	{
		key: "assigned",
		i18n_label: "default_global_view.assigned"
	},
	{
		key: "created",
		i18n_label: "default_global_view.created"
	},
	{
		key: "subscribed",
		i18n_label: "default_global_view.subscribed"
	}
];
const WORKSPACE_SIDEBAR_DYNAMIC_NAVIGATION_ITEMS = {
	views: {
		key: "views",
		labelTranslationKey: "views",
		href: `/workspace-views/all-issues/`,
		access: [
			EUserWorkspaceRoles.ADMIN,
			EUserWorkspaceRoles.MEMBER,
			EUserWorkspaceRoles.GUEST
		],
		highlight: (pathname, url) => pathname.includes(url)
	},
	analytics: {
		key: "analytics",
		labelTranslationKey: "analytics",
		href: `/analytics/`,
		access: [EUserWorkspaceRoles.ADMIN, EUserWorkspaceRoles.MEMBER],
		highlight: (pathname, url) => pathname.includes(url)
	},
	archives: {
		key: "archives",
		labelTranslationKey: "archives",
		href: `/projects/archives/`,
		access: [EUserWorkspaceRoles.ADMIN, EUserWorkspaceRoles.MEMBER],
		highlight: (pathname, url) => pathname.includes(url)
	}
};
const WORKSPACE_SIDEBAR_DYNAMIC_NAVIGATION_ITEMS_LINKS = [
	WORKSPACE_SIDEBAR_DYNAMIC_NAVIGATION_ITEMS["views"],
	WORKSPACE_SIDEBAR_DYNAMIC_NAVIGATION_ITEMS["analytics"],
	WORKSPACE_SIDEBAR_DYNAMIC_NAVIGATION_ITEMS["archives"]
];
const WORKSPACE_SIDEBAR_STATIC_NAVIGATION_ITEMS = {
	home: {
		key: "home",
		labelTranslationKey: "home.title",
		href: `/`,
		access: [
			EUserWorkspaceRoles.ADMIN,
			EUserWorkspaceRoles.MEMBER,
			EUserWorkspaceRoles.GUEST
		],
		highlight: (pathname, url) => pathname === url
	},
	inbox: {
		key: "inbox",
		labelTranslationKey: "notification.label",
		href: `/notifications/`,
		access: [
			EUserWorkspaceRoles.ADMIN,
			EUserWorkspaceRoles.MEMBER,
			EUserWorkspaceRoles.GUEST
		],
		highlight: (pathname, url) => pathname.includes(url)
	},
	"your-work": {
		key: "your_work",
		labelTranslationKey: "your_work",
		href: `/profile/`,
		access: [EUserWorkspaceRoles.ADMIN, EUserWorkspaceRoles.MEMBER],
		highlight: (pathname, url) => pathname.includes(url)
	},
	stickies: {
		key: "stickies",
		labelTranslationKey: "sidebar.stickies",
		href: `/stickies/`,
		access: [
			EUserWorkspaceRoles.ADMIN,
			EUserWorkspaceRoles.MEMBER,
			EUserWorkspaceRoles.GUEST
		],
		highlight: (pathname, url) => pathname.includes(url)
	},
	drafts: {
		key: "drafts",
		labelTranslationKey: "drafts",
		href: `/drafts/`,
		access: [EUserWorkspaceRoles.ADMIN, EUserWorkspaceRoles.MEMBER],
		highlight: (pathname, url) => pathname.includes(url)
	},
	projects: {
		key: "projects",
		labelTranslationKey: "projects",
		href: `/projects/`,
		access: [
			EUserWorkspaceRoles.ADMIN,
			EUserWorkspaceRoles.MEMBER,
			EUserWorkspaceRoles.GUEST
		],
		highlight: (pathname, url) => pathname === url
	}
};
const WORKSPACE_SIDEBAR_STATIC_NAVIGATION_ITEMS_LINKS = [WORKSPACE_SIDEBAR_STATIC_NAVIGATION_ITEMS["home"]];
const WORKSPACE_SIDEBAR_STATIC_PINNED_NAVIGATION_ITEMS_LINKS = [WORKSPACE_SIDEBAR_STATIC_NAVIGATION_ITEMS["projects"]];
const IS_FAVORITE_MENU_OPEN = "is_favorite_menu_open";
const WORKSPACE_DEFAULT_SEARCH_RESULT = { results: {
	workspace: [],
	project: [],
	issue: [],
	cycle: [],
	module: [],
	issue_view: [],
	page: []
} };
const USE_CASES = [
	"Plan and track product roadmaps",
	"Manage engineering sprints",
	"Coordinate cross-functional projects",
	"Replace our current tool",
	"Just exploring"
];

//#endregion
//#region src/settings.ts
let WORKSPACE_SETTINGS_CATEGORY = /* @__PURE__ */ function(WORKSPACE_SETTINGS_CATEGORY$1) {
	WORKSPACE_SETTINGS_CATEGORY$1["ADMINISTRATION"] = "administration";
	WORKSPACE_SETTINGS_CATEGORY$1["FEATURES"] = "features";
	WORKSPACE_SETTINGS_CATEGORY$1["DEVELOPER"] = "developer";
	return WORKSPACE_SETTINGS_CATEGORY$1;
}({});
let PROFILE_SETTINGS_CATEGORY = /* @__PURE__ */ function(PROFILE_SETTINGS_CATEGORY$1) {
	PROFILE_SETTINGS_CATEGORY$1["YOUR_PROFILE"] = "your profile";
	PROFILE_SETTINGS_CATEGORY$1["DEVELOPER"] = "developer";
	return PROFILE_SETTINGS_CATEGORY$1;
}({});
let PROJECT_SETTINGS_CATEGORY = /* @__PURE__ */ function(PROJECT_SETTINGS_CATEGORY$1) {
	PROJECT_SETTINGS_CATEGORY$1["PROJECTS"] = "projects";
	return PROJECT_SETTINGS_CATEGORY$1;
}({});
const WORKSPACE_SETTINGS_CATEGORIES = [
	WORKSPACE_SETTINGS_CATEGORY.ADMINISTRATION,
	WORKSPACE_SETTINGS_CATEGORY.FEATURES,
	WORKSPACE_SETTINGS_CATEGORY.DEVELOPER
];
const PROFILE_SETTINGS_CATEGORIES = [PROFILE_SETTINGS_CATEGORY.YOUR_PROFILE, PROFILE_SETTINGS_CATEGORY.DEVELOPER];
const PROJECT_SETTINGS_CATEGORIES = [PROJECT_SETTINGS_CATEGORY.PROJECTS];
const GROUPED_WORKSPACE_SETTINGS = {
	[WORKSPACE_SETTINGS_CATEGORY.ADMINISTRATION]: [
		WORKSPACE_SETTINGS["general"],
		WORKSPACE_SETTINGS["members"],
		WORKSPACE_SETTINGS["billing-and-plans"],
		WORKSPACE_SETTINGS["export"]
	],
	[WORKSPACE_SETTINGS_CATEGORY.FEATURES]: [],
	[WORKSPACE_SETTINGS_CATEGORY.DEVELOPER]: [WORKSPACE_SETTINGS["webhooks"]]
};
const GROUPED_PROFILE_SETTINGS = {
	[PROFILE_SETTINGS_CATEGORY.YOUR_PROFILE]: [
		PROFILE_SETTINGS["profile"],
		PROFILE_SETTINGS["preferences"],
		PROFILE_SETTINGS["notifications"],
		PROFILE_SETTINGS["security"],
		PROFILE_SETTINGS["activity"]
	],
	[PROFILE_SETTINGS_CATEGORY.DEVELOPER]: [PROFILE_SETTINGS["api-tokens"]]
};

//#endregion
//#region src/sidebar.ts
const SIDEBAR_WIDTH = 250;
const EXTENDED_SIDEBAR_WIDTH = 300;

//#endregion
//#region src/spreadsheet.ts
const SPREADSHEET_SELECT_GROUP = "spreadsheet-issues";

//#endregion
//#region src/state.ts
const STATE_GROUPS = {
	backlog: {
		key: "backlog",
		label: "Backlog",
		defaultStateName: "Backlog",
		color: "#d9d9d9"
	},
	unstarted: {
		key: "unstarted",
		label: "Unstarted",
		defaultStateName: "Todo",
		color: "#3f76ff"
	},
	started: {
		key: "started",
		label: "Started",
		defaultStateName: "In Progress",
		color: "#f59e0b"
	},
	completed: {
		key: "completed",
		label: "Completed",
		defaultStateName: "Done",
		color: "#16a34a"
	},
	cancelled: {
		key: "cancelled",
		label: "Canceled",
		defaultStateName: "Cancelled",
		color: "#dc2626"
	}
};
const ARCHIVABLE_STATE_GROUPS = [STATE_GROUPS.completed.key, STATE_GROUPS.cancelled.key];
const COMPLETED_STATE_GROUPS = [STATE_GROUPS.completed.key];
const PENDING_STATE_GROUPS = [
	STATE_GROUPS.backlog.key,
	STATE_GROUPS.unstarted.key,
	STATE_GROUPS.started.key,
	STATE_GROUPS.cancelled.key
];
const STATE_DISTRIBUTION = {
	[STATE_GROUPS.backlog.key]: {
		key: STATE_GROUPS.backlog.key,
		issues: "backlog_issues",
		points: "backlog_estimate_points"
	},
	[STATE_GROUPS.unstarted.key]: {
		key: STATE_GROUPS.unstarted.key,
		issues: "unstarted_issues",
		points: "unstarted_estimate_points"
	},
	[STATE_GROUPS.started.key]: {
		key: STATE_GROUPS.started.key,
		issues: "started_issues",
		points: "started_estimate_points"
	},
	[STATE_GROUPS.completed.key]: {
		key: STATE_GROUPS.completed.key,
		issues: "completed_issues",
		points: "completed_estimate_points"
	},
	[STATE_GROUPS.cancelled.key]: {
		key: STATE_GROUPS.cancelled.key,
		issues: "cancelled_issues",
		points: "cancelled_estimate_points"
	}
};
const PROGRESS_STATE_GROUPS_DETAILS = [
	{
		key: "completed_issues",
		title: "Completed",
		color: "#16A34A"
	},
	{
		key: "started_issues",
		title: "Started",
		color: "#F59E0B"
	},
	{
		key: "unstarted_issues",
		title: "Unstarted",
		color: "#3A3A3A"
	},
	{
		key: "backlog_issues",
		title: "Backlog",
		color: "#A3A3A3"
	}
];
const DISPLAY_WORKFLOW_PRO_CTA = false;

//#endregion
//#region src/stickies.ts
const STICKIES_PER_PAGE = 30;

//#endregion
//#region src/subscription.ts
const ENTERPRISE_PLAN_FEATURES = [
	"Private + managed deployments",
	"GAC",
	"LDAP support",
	"Databases + Formulas",
	"Unlimited and full Automation Flows",
	"Full-suite professional services"
];
const BUSINESS_PLAN_FEATURES = [
	"Project Templates",
	"Workflows + Approvals",
	"Decision + Loops Automation",
	"Custom Reports",
	"Nested Pages",
	"Intake Forms"
];
const PRO_PLAN_FEATURES = [
	"Dashboards + Reports",
	"Full Time Tracking + Bulk Ops",
	"Teamspaces",
	"Trigger And Action",
	"Wikis",
	"Popular integrations"
];
const ONE_PLAN_FEATURES = [
	"OIDC + SAML for SSO",
	"Active Cycles",
	"Real-time collab + public views and page",
	"Link pages in issues and vice-versa",
	"Time-tracking + limited bulk ops",
	"Docker, Kubernetes and more"
];
const FREE_PLAN_UPGRADE_FEATURES = [
	"OIDC + SAML for SSO",
	"Time Tracking and Bulk Ops",
	"Integrations",
	"Public Views and Pages"
];

//#endregion
//#region src/swr.ts
const DEFAULT_SWR_CONFIG = {
	refreshWhenHidden: false,
	revalidateIfStale: false,
	revalidateOnFocus: false,
	revalidateOnMount: true,
	refreshInterval: 6e5,
	errorRetryCount: 3
};
const WEB_SWR_CONFIG = {
	refreshWhenHidden: false,
	revalidateIfStale: true,
	revalidateOnFocus: true,
	revalidateOnMount: true,
	errorRetryCount: 3
};

//#endregion
//#region src/tab-indices.ts
const ISSUE_FORM_TAB_INDICES = [
	"name",
	"description_html",
	"feeling_lucky",
	"state_id",
	"priority",
	"assignee_ids",
	"label_ids",
	"start_date",
	"target_date",
	"cycle_id",
	"module_ids",
	"estimate_point",
	"parent_id",
	"create_more",
	"discard_button",
	"draft_button",
	"submit_button",
	"project_id",
	"remove_parent"
];
const INTAKE_ISSUE_CREATE_FORM_TAB_INDICES = [
	"name",
	"description_html",
	"state_id",
	"priority",
	"assignee_ids",
	"label_ids",
	"start_date",
	"target_date",
	"cycle_id",
	"module_ids",
	"estimate_point",
	"parent_id",
	"create_more",
	"discard_button",
	"submit_button"
];
const CREATE_LABEL_TAB_INDICES = [
	"name",
	"color",
	"cancel",
	"submit"
];
const PROJECT_CREATE_TAB_INDICES = [
	"name",
	"identifier",
	"description",
	"network",
	"lead",
	"cancel",
	"submit",
	"close",
	"cover_image",
	"logo_props"
];
const PROJECT_CYCLE_TAB_INDICES = [
	"name",
	"description",
	"date_range",
	"cancel",
	"submit",
	"project_id"
];
const PROJECT_MODULE_TAB_INDICES = [
	"name",
	"description",
	"date_range",
	"status",
	"lead",
	"member_ids",
	"cancel",
	"submit"
];
const PROJECT_VIEW_TAB_INDICES = [
	"name",
	"description",
	"filters",
	"cancel",
	"submit"
];
const PROJECT_PAGE_TAB_INDICES = [
	"name",
	"public",
	"private",
	"cancel",
	"submit"
];
let ETabIndices = /* @__PURE__ */ function(ETabIndices$1) {
	ETabIndices$1["ISSUE_FORM"] = "issue-form";
	ETabIndices$1["INTAKE_ISSUE_FORM"] = "intake-issue-form";
	ETabIndices$1["CREATE_LABEL"] = "create-label";
	ETabIndices$1["PROJECT_CREATE"] = "project-create";
	ETabIndices$1["PROJECT_CYCLE"] = "project-cycle";
	ETabIndices$1["PROJECT_MODULE"] = "project-module";
	ETabIndices$1["PROJECT_VIEW"] = "project-view";
	ETabIndices$1["PROJECT_PAGE"] = "project-page";
	return ETabIndices$1;
}({});
const TAB_INDEX_MAP = {
	[ETabIndices.ISSUE_FORM]: ISSUE_FORM_TAB_INDICES,
	[ETabIndices.INTAKE_ISSUE_FORM]: INTAKE_ISSUE_CREATE_FORM_TAB_INDICES,
	[ETabIndices.CREATE_LABEL]: CREATE_LABEL_TAB_INDICES,
	[ETabIndices.PROJECT_CREATE]: PROJECT_CREATE_TAB_INDICES,
	[ETabIndices.PROJECT_CYCLE]: PROJECT_CYCLE_TAB_INDICES,
	[ETabIndices.PROJECT_MODULE]: PROJECT_MODULE_TAB_INDICES,
	[ETabIndices.PROJECT_VIEW]: PROJECT_VIEW_TAB_INDICES,
	[ETabIndices.PROJECT_PAGE]: PROJECT_PAGE_TAB_INDICES
};

//#endregion
//#region src/themes.ts
const THEMES = [
	"light",
	"dark",
	"light-contrast",
	"dark-contrast",
	"custom"
];
const THEME_OPTIONS = [
	{
		key: "system_preference",
		value: "system",
		i18n_label: "System preference",
		type: "light",
		icon: {
			border: "#DEE2E6",
			color1: "#FAFAFA",
			color2: "#3F76FF"
		}
	},
	{
		key: "light",
		value: "light",
		i18n_label: "Light",
		type: "light",
		icon: {
			border: "#DEE2E6",
			color1: "#FAFAFA",
			color2: "#3F76FF"
		}
	},
	{
		key: "dark",
		value: "dark",
		i18n_label: "Dark",
		type: "dark",
		icon: {
			border: "#2E3234",
			color1: "#191B1B",
			color2: "#3C85D9"
		}
	},
	{
		key: "light_contrast",
		value: "light-contrast",
		i18n_label: "Light high contrast",
		type: "light",
		icon: {
			border: "#000000",
			color1: "#FFFFFF",
			color2: "#3F76FF"
		}
	},
	{
		key: "dark_contrast",
		value: "dark-contrast",
		i18n_label: "Dark high contrast",
		type: "dark",
		icon: {
			border: "#FFFFFF",
			color1: "#030303",
			color2: "#3A8BE9"
		}
	},
	{
		key: "custom",
		value: "custom",
		i18n_label: "Custom theme",
		type: "light",
		icon: {
			border: "#FFC9C9",
			color1: "#FFF7F7",
			color2: "#FF5151"
		}
	}
];

//#endregion
//#region src/user.ts
let EAuthenticationPageType = /* @__PURE__ */ function(EAuthenticationPageType$1) {
	EAuthenticationPageType$1["STATIC"] = "STATIC";
	EAuthenticationPageType$1["NOT_AUTHENTICATED"] = "NOT_AUTHENTICATED";
	EAuthenticationPageType$1["AUTHENTICATED"] = "AUTHENTICATED";
	return EAuthenticationPageType$1;
}({});
let EInstancePageType = /* @__PURE__ */ function(EInstancePageType$1) {
	EInstancePageType$1["PRE_SETUP"] = "PRE_SETUP";
	EInstancePageType$1["POST_SETUP"] = "POST_SETUP";
	return EInstancePageType$1;
}({});
let EUserStatus = /* @__PURE__ */ function(EUserStatus$1) {
	EUserStatus$1["ERROR"] = "ERROR";
	EUserStatus$1["AUTHENTICATION_NOT_DONE"] = "AUTHENTICATION_NOT_DONE";
	EUserStatus$1["NOT_YET_READY"] = "NOT_YET_READY";
	return EUserStatus$1;
}({});
let EUserPermissionsLevel = /* @__PURE__ */ function(EUserPermissionsLevel$1) {
	EUserPermissionsLevel$1["WORKSPACE"] = "WORKSPACE";
	EUserPermissionsLevel$1["PROJECT"] = "PROJECT";
	return EUserPermissionsLevel$1;
}({});
let EUserPermissions = /* @__PURE__ */ function(EUserPermissions$1) {
	EUserPermissions$1[EUserPermissions$1["ADMIN"] = 20] = "ADMIN";
	EUserPermissions$1[EUserPermissions$1["MEMBER"] = 15] = "MEMBER";
	EUserPermissions$1[EUserPermissions$1["GUEST"] = 5] = "GUEST";
	return EUserPermissions$1;
}({});
const USER_ALLOWED_PERMISSIONS = {
	workspace: { dashboard: { read: [
		EUserPermissions.ADMIN,
		EUserPermissions.MEMBER,
		EUserPermissions.GUEST
	] } },
	project: {}
};

//#endregion
//#region src/views.ts
const VIEW_ACCESS_SPECIFIERS = [{
	key: EViewAccess.PUBLIC,
	i18n_label: "common.access.public"
}, {
	key: EViewAccess.PRIVATE,
	i18n_label: "common.access.private"
}];
const VIEW_SORTING_KEY_OPTIONS = [
	{
		key: "name",
		i18n_label: "project_view.sort_by.name"
	},
	{
		key: "created_at",
		i18n_label: "project_view.sort_by.created_at"
	},
	{
		key: "updated_at",
		i18n_label: "project_view.sort_by.updated_at"
	}
];
const VIEW_SORT_BY_OPTIONS = [{
	key: "asc",
	i18n_label: "common.order_by.asc"
}, {
	key: "desc",
	i18n_label: "common.order_by.desc"
}];

//#endregion
//#region src/workspace-drafts.ts
let EDraftIssuePaginationType = /* @__PURE__ */ function(EDraftIssuePaginationType$1) {
	EDraftIssuePaginationType$1["INIT"] = "INIT";
	EDraftIssuePaginationType$1["NEXT"] = "NEXT";
	EDraftIssuePaginationType$1["PREV"] = "PREV";
	EDraftIssuePaginationType$1["CURRENT"] = "CURRENT";
	return EDraftIssuePaginationType$1;
}({});

//#endregion
export { ACCEPTED_AVATAR_IMAGE_MIME_TYPES_FOR_REACT_DROPZONE, ACCEPTED_COVER_IMAGE_MIME_TYPES_FOR_REACT_DROPZONE, ACTIVITY_FILTER_TYPE_OPTIONS, ADMIN_BASE_PATH, ADMIN_BASE_URL, AI_EDITOR_TASKS, ALL_ISSUES, ANALYTICS_DURATION_FILTER_OPTIONS, ANALYTICS_INSIGHTS_FIELDS, ANALYTICS_V2_DATE_KEYS, ANALYTICS_X_AXIS_VALUES, ANALYTICS_Y_AXIS_VALUES, API_BASE_PATH, API_BASE_URL, API_URL, ARCHIVABLE_STATE_GROUPS, AUTH_TRACKER_ELEMENTS, AUTH_TRACKER_EVENTS, AXIS_LABEL_CLASSNAME, BUSINESS_PLAN_FEATURES, CHARTS_THEME, CHART_COLOR_PALETTES, CHART_DEFAULT_MARGIN, CHART_X_AXIS_DATE_PROPERTIES, COMMAND_PALETTE_TRACKER_ELEMENTS, COMPLETED_STATE_GROUPS, CORE_DATE_OPERATOR_LABELS_MAP, CORE_OPERATOR_LABELS_MAP, CREATE_LABEL_TAB_INDICES, CYCLE_STATUS, CYCLE_TRACKER_ELEMENTS, CYCLE_TRACKER_EVENTS, ChartXAxisDateGrouping, DATE_AFTER_FILTER_OPTIONS, DATE_BEFORE_FILTER_OPTIONS, DATE_OPERATOR_LABELS_MAP, DEFAULT_CREATE_PAGE_MODAL_DATA, DEFAULT_FILTER_CONFIG_OPTIONS, DEFAULT_FILTER_EXPRESSION_OPTIONS, DEFAULT_FILTER_VISIBILITY_OPTIONS, DEFAULT_GLOBAL_VIEWS_LIST, DEFAULT_PRODUCT_BILLING_FREQUENCY, DEFAULT_SWR_CONFIG, DEFAULT_WORK_ITEM_FORM_VALUES, DISPLAY_WORKFLOW_PRO_CTA, DRAG_ALLOWED_GROUPS, DURATION_FILTER_OPTIONS, EActivityFilterType, EAdminAuthErrorCodes, EAuthErrorCodes, EAuthModes, EAuthPageTypes, EAuthSteps, EAuthenticationPageType, EChartModels, EDraftIssuePaginationType, EDurationFilters, EErrorAlertType, EEstimateSystem, EEstimateUpdateStages, EIconSize, EInstancePageType, EInstanceStatus, EIssueCommentAccessSpecifier, EIssueFilterType, EIssueGroupBYServerToProperty, EIssueGroupByToServerOptions, EIssueListRow, EMPTY_OPERATOR_LABEL, ENABLE_ISSUE_DEPENDENCIES, ENTERPRISE_PLAN_FEATURES, ENotificationFilterType, ENotificationLoader, ENotificationQueryParamType, ENotificationTab, EPageAccess, EPageTypes, EPastDurationFilters, EProjectFeatureKey, ESTIMATE_SYSTEMS, EServerGroupByToFilterOptions, ETabIndices, EUserPermissions, EUserPermissionsLevel, EUserStatus, EXPORTERS_LIST, EXTENDED_DATE_OPERATOR_LABELS_MAP, EXTENDED_OPERATOR_LABELS_MAP, EXTENDED_SIDEBAR_WIDTH, E_PASSWORD_STRENGTH, E_SORT_ORDER, FILTERED_ISSUES_TABS_LIST, FILTER_TO_ISSUE_MAP, FILTER_TYPE_OPTIONS, FREE_PLAN_UPGRADE_FEATURES, GITHUB_REDIRECTED_TRACKER_EVENT, GLOBAL_VIEW_TRACKER_ELEMENTS, GLOBAL_VIEW_TRACKER_EVENTS, GOD_MODE_URL, GROUPED_PROFILE_SETTINGS, GROUPED_WORKSPACE_SETTINGS, GROUP_CHOICES, GROUP_WORKSPACE_TRACKER_EVENT, HEADER_GITHUB_ICON, IMPORTERS_LIST, INBOX_ISSUE_ORDER_BY_OPTIONS, INBOX_ISSUE_SORT_BY_OPTIONS, INBOX_STATUS, INTAKE_ISSUE_CREATE_FORM_TAB_INDICES, ISSUE_DISPLAY_FILTERS_BY_LAYOUT, ISSUE_DISPLAY_FILTERS_BY_PAGE, ISSUE_DISPLAY_PROPERTIES, ISSUE_DISPLAY_PROPERTIES_KEYS, ISSUE_FORM_TAB_INDICES, ISSUE_GROUP_BY_OPTIONS, ISSUE_LAYOUTS, ISSUE_LAYOUT_MAP, ISSUE_ORDER_BY_OPTIONS, ISSUE_PRIORITIES, ISSUE_PRIORITY_FILTERS, ISSUE_REACTION_EMOJI_CODES, ISSUE_STORE_TO_FILTERS_MAP, IS_FAVORITE_MENU_OPEN, LABEL_CLASSNAME, LABEL_COLOR_OPTIONS, LIVE_BASE_PATH, LIVE_BASE_URL, LIVE_URL, LOGIN_MEDIUM_LABELS, MARKETING_CONTACT_US_PAGE_LINK, MARKETING_PLANE_ONE_PAGE_LINK, MARKETING_PRICING_PAGE_LINK, MAX_ESTIMATE_POINT_INPUT_LENGTH, MAX_FILE_SIZE, MEMBER_PROPERTY_DETAILS, MEMBER_TRACKER_ELEMENTS, MEMBER_TRACKER_EVENTS, MODULE_ORDER_BY_OPTIONS, MODULE_STATUS, MODULE_STATUS_COLORS, MODULE_TRACKER_ELEMENTS, MODULE_TRACKER_EVENTS, MODULE_VIEW_LAYOUTS, NEGATED_DATE_OPERATOR_LABELS_MAP, NEGATED_OPERATOR_LABELS_MAP, NETWORK_CHOICES, NOTIFICATION_SNOOZE_OPTIONS, NOTIFICATION_TABS, NOTIFICATION_TRACKER_ELEMENTS, NOTIFICATION_TRACKER_EVENTS, ONBOARDING_TRACKER_ELEMENTS, ONE_PLAN_FEATURES, OPERATOR_LABELS_MAP, ORGANIZATION_SIZE, PASSWORD_MIN_LENGTH, PAST_DURATION_FILTER_OPTIONS, PENDING_STATE_GROUPS, PLANE_COMMUNITY_PRODUCTS, PREFERENCE_OPTIONS, PRODUCT_TOUR_TRACKER_ELEMENTS, PRODUCT_TOUR_TRACKER_EVENTS, PROFILE_ACTION_LINKS, PROFILE_ADMINS_TAB, PROFILE_SETTINGS, PROFILE_SETTINGS_CATEGORIES, PROFILE_SETTINGS_CATEGORY, PROFILE_SETTINGS_TRACKER_ELEMENTS, PROFILE_SETTINGS_TRACKER_EVENTS, PROFILE_VIEWER_TAB, PROGRESS_STATE_GROUPS_DETAILS, PROJECT_AUTOMATION_MONTHS, PROJECT_BACKGROUND_COLORS, PROJECT_CREATED_AT_FILTER_OPTIONS, PROJECT_CREATE_TAB_INDICES, PROJECT_CYCLE_TAB_INDICES, PROJECT_DISPLAY_FILTER_OPTIONS, PROJECT_ERROR_MESSAGES, PROJECT_MODULE_TAB_INDICES, PROJECT_ORDER_BY_OPTIONS, PROJECT_PAGE_TAB_INDICES, PROJECT_PAGE_TRACKER_ELEMENTS, PROJECT_PAGE_TRACKER_EVENTS, PROJECT_SETTINGS_CATEGORIES, PROJECT_SETTINGS_CATEGORY, PROJECT_SETTINGS_TRACKER_ELEMENTS, PROJECT_SETTINGS_TRACKER_EVENTS, PROJECT_TRACKER_ELEMENTS, PROJECT_TRACKER_EVENTS, PROJECT_VIEW_TAB_INDICES, PROJECT_VIEW_TRACKER_ELEMENTS, PROJECT_VIEW_TRACKER_EVENTS, PRO_PLAN_FEATURES, RANDOM_EMOJI_CODES, RESTRICTED_URLS, ROLE, ROLE_DETAILS, SIDEBAR_TRACKER_ELEMENTS, SIDEBAR_WIDTH, SITES_ISSUE_LAYOUTS, SITES_URL, SITE_DESCRIPTION, SITE_KEYWORDS, SITE_NAME, SITE_TITLE, SITE_URL, SPACE_BASE_PATH, SPACE_BASE_URL, SPACE_PASSWORD_CRITERIA, SPACE_SITE_DESCRIPTION, SPACE_SITE_KEYWORDS, SPACE_SITE_NAME, SPACE_SITE_TITLE, SPACE_SITE_URL, SPACE_TWITTER_USER_NAME, SPREADSHEET_PROPERTY_DETAILS, SPREADSHEET_PROPERTY_LIST, SPREADSHEET_SELECT_GROUP, START_OF_THE_WEEK_OPTIONS, STATE_DISTRIBUTION, STATE_GROUPS, STATE_TRACKER_ELEMENTS, STATE_TRACKER_EVENTS, STICKIES_PER_PAGE, SUBSCRIPTION_REDIRECTION_URLS, SUBSCRIPTION_WEBPAGE_URLS, SUBSCRIPTION_WITH_BILLING_FREQUENCY, SUB_ISSUES_DISPLAY_PROPERTIES_KEYS, SUB_WORK_ITEM_AVAILABLE_FILTERS_FOR_WORK_ITEM_PAGE, SUPPORT_EMAIL, TAB_INDEX_MAP, TALK_TO_SALES_URL, THEMES, THEME_OPTIONS, TO_CAPITALIZE_PROPERTIES, TWITTER_USER_NAME, UNFILTERED_ISSUES_TABS_LIST, USER_ALLOWED_PERMISSIONS, USER_ROLES, USER_TRACKER_ELEMENTS, USER_TRACKER_EVENTS, USE_CASES, VIEW_ACCESS_SPECIFIERS, VIEW_SORTING_KEY_OPTIONS, VIEW_SORT_BY_OPTIONS, WEBSITE_URL, WEB_BASE_PATH, WEB_BASE_URL, WEB_SWR_CONFIG, WEB_URL, WORKSPACE_DEFAULT_SEARCH_RESULT, WORKSPACE_SETTINGS, WORKSPACE_SETTINGS_ACCESS, WORKSPACE_SETTINGS_CATEGORIES, WORKSPACE_SETTINGS_CATEGORY, WORKSPACE_SETTINGS_LINKS, WORKSPACE_SETTINGS_TRACKER_ELEMENTS, WORKSPACE_SETTINGS_TRACKER_EVENTS, WORKSPACE_SIDEBAR_DYNAMIC_NAVIGATION_ITEMS, WORKSPACE_SIDEBAR_DYNAMIC_NAVIGATION_ITEMS_LINKS, WORKSPACE_SIDEBAR_STATIC_NAVIGATION_ITEMS, WORKSPACE_SIDEBAR_STATIC_NAVIGATION_ITEMS_LINKS, WORKSPACE_SIDEBAR_STATIC_PINNED_NAVIGATION_ITEMS_LINKS, WORKSPACE_TRACKER_ELEMENTS, WORKSPACE_TRACKER_EVENTS, WORK_ITEM_TRACKER_ELEMENTS, WORK_ITEM_TRACKER_EVENTS, allTimeIn30MinutesInterval12HoursFormat, defaultActivityFilters, estimateCount, filterActivityOnSelectedFilters, getRandomLabelColor };
//# sourceMappingURL=index.mjs.map