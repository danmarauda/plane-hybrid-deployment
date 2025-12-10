import { t as cn } from "./classname-iNHf9Pb8.js";
import { t as convertPlacementToSideAndAlign } from "./placement-Db9Qu3XD.js";
import { An as ChevronDownIcon, Dn as ChevronUpIcon, On as ChevronRightIcon, kn as ChevronLeftIcon } from "./icons-BueZeOyQ.js";
import { t as Popover } from "./popover-C2bLVK6Y.js";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Tabs } from "@base-ui-components/react";
import { Activity, Airplay, AlertCircle, AlertOctagon, AlertTriangle, AlignCenter, AlignJustify, AlignLeft, AlignRight, Anchor, Aperture, Archive, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, AtSign, Award, BarChart, BarChart2, Battery, BatteryCharging, Bell, BellOff, Book, BookOpen, Bookmark, Box, Briefcase, Calendar, Camera, CameraOff, Cast, Check, CheckCircle, CheckSquare, CircleChevronDown, Clipboard, Clock, Cloud, CloudDrizzle, CloudLightning, CloudOff, CloudRain, CloudSnow, Code, Codepen, Codesandbox, Coffee, Columns, Command, Compass, Copy, CornerDownLeft, CornerDownRight, CornerLeftDown, CornerLeftUp, CornerRightDown, CornerRightUp, CornerUpLeft, CornerUpRight, Cpu, CreditCard, Crop, Crosshair, Database, Delete, Disc, Divide, DivideCircle, DivideSquare, DollarSign, Download, DownloadCloud, Dribbble, Droplet, Edit, Edit2, Edit3, ExternalLink, Eye, EyeOff, Facebook, FastForward, Feather, Figma, File, FileMinus, FilePlus, FileText, Film, Filter, Flag, Folder, FolderMinus, FolderPlus, Framer, Frown, Gift, GitBranch, GitCommit, GitMerge, GitPullRequest, Github, Gitlab, Globe, Grid, HardDrive, Hash, Headphones, Heart, HelpCircle, Hexagon, Home, Image, Inbox, Info, InfoIcon, Instagram, Italic, Key, Layers, Layout, LifeBuoy, Link, Link2, Linkedin, List, Loader, Lock, LogIn, LogOut, Mail, Map, MapPin, Maximize, Maximize2, Meh, Menu, MessageCircle, MessageSquare, Mic, MicOff, Minimize, Minimize2, Minus, MinusCircle, MinusSquare, Search, ToggleLeft, User, UsersRound } from "lucide-react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { EmojiPicker } from "frimousse";
import useFontFaceObserver from "use-font-face-observer";

//#region src/emoji-icon-picker/emoji/emoji.tsx
function EmojiRoot(props) {
	const { onChange, searchPlaceholder = "Search", searchDisabled = false } = props;
	const searchWrapperRef = useRef(null);
	useEffect(() => {
		const focusInput = () => {
			const searchWrapper = searchWrapperRef.current;
			if (searchWrapper) {
				const inputElement = searchWrapper.querySelector("input");
				if (inputElement) {
					inputElement.removeAttribute("disabled");
					inputElement.focus();
				}
			}
		};
		focusInput();
	}, []);
	return /* @__PURE__ */ jsxs(EmojiPicker.Root, {
		"data-slot": "emoji-picker",
		className: "isolate flex flex-col rounded-md h-full w-full border-none p-2",
		onEmojiSelect: (val) => onChange(val.emoji),
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2 justify-between [&>[data-slot='emoji-picker-search-wrapper']]:flex-grow [&>[data-slot='emoji-picker-search-wrapper']]:p-0 px-1.5 py-2 sticky top-0 z-10 bg-custom-background-100",
			children: [/* @__PURE__ */ jsx("div", {
				ref: searchWrapperRef,
				"data-slot": "emoji-picker-search-wrapper",
				className: "p-2",
				children: /* @__PURE__ */ jsx(EmojiPicker.Search, {
					placeholder: searchPlaceholder,
					disabled: searchDisabled,
					className: "block rounded-md bg-transparent placeholder-custom-text-400 focus:outline-none px-3 py-2 border-[0.5px] border-custom-border-200 text-[1rem] p-0 h-full w-full flex-grow-0 focus:border-custom-primary-100"
				})
			}), /* @__PURE__ */ jsx(EmojiPicker.SkinToneSelector, {
				"data-slot": "emoji-picker-skin-tone-selector",
				className: "bg-custom-background-100 hover:bg-accent mx-2 mb-1.5 size-8 rounded-md text-lg flex-shrink-0"
			})]
		}), /* @__PURE__ */ jsx(EmojiPicker.Viewport, {
			"data-slot": "emoji-picker-content",
			className: cn("relative flex-1 outline-none"),
			children: /* @__PURE__ */ jsx(EmojiPicker.List, {
				"data-slot": "emoji-picker-list",
				className: cn("pb-2 select-none"),
				components: {
					CategoryHeader: ({ category,...props$1 }) => /* @__PURE__ */ jsx("div", {
						"data-slot": "emoji-picker-list-category-header",
						className: "bg-custom-background-100 text-custom-text-300 px-3 pb-1.5 text-xs font-medium",
						...props$1,
						children: category.label
					}),
					Row: ({ children,...props$1 }) => /* @__PURE__ */ jsx("div", {
						"data-slot": "emoji-picker-list-row",
						className: "scroll-my-1.5 px-1.5",
						...props$1,
						children
					}),
					Emoji: ({ emoji,...props$1 }) => /* @__PURE__ */ jsx("button", {
						type: "button",
						"aria-label": emoji?.label ?? emoji?.emoji,
						"data-slot": "emoji-picker-list-emoji",
						className: "data-active:bg-accent flex size-8 items-center justify-center rounded-md text-lg",
						...props$1,
						children: emoji.emoji
					})
				}
			})
		})]
	});
}

//#endregion
//#region src/emoji-icon-picker/helper.tsx
const EmojiIconPickerTypes = {
	EMOJI: "emoji",
	ICON: "icon"
};
/**
* Adjusts the given hex color to ensure it has enough contrast.
* @param {string} hex - The hex color code input by the user.
* @returns {string} - The adjusted hex color code.
*/
const adjustColorForContrast = (hex) => {
	if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex)) throw new Error("Invalid hex color code");
	let r = 0, g = 0, b = 0;
	if (hex.length === 4) {
		r = parseInt(hex[1] + hex[1], 16);
		g = parseInt(hex[2] + hex[2], 16);
		b = parseInt(hex[3] + hex[3], 16);
	} else if (hex.length === 7) {
		r = parseInt(hex[1] + hex[2], 16);
		g = parseInt(hex[3] + hex[4], 16);
		b = parseInt(hex[5] + hex[6], 16);
	}
	if ((.299 * r + .587 * g + .114 * b) / 255 > .5) {
		r = Math.max(0, r - 50);
		g = Math.max(0, g - 50);
		b = Math.max(0, b - 50);
	}
	const toHex = (value) => {
		const hex$1 = value.toString(16);
		return hex$1.length === 1 ? "0" + hex$1 : hex$1;
	};
	return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
const DEFAULT_COLORS = [
	"#95999f",
	"#6d7b8a",
	"#5e6ad2",
	"#02b5ed",
	"#02b55c",
	"#f2be02",
	"#e57a00",
	"#f38e82"
];
/**
* Enhanced emoji to decimal conversion that preserves emoji sequences
* This function handles complex emoji sequences including skin tone modifiers
* @param emoji - The emoji string to convert
* @returns Array of decimal Unicode code points
*/
function emojiToDecimalEnhanced(emoji) {
	const codePoints = [];
	const characters = Array.from(emoji);
	for (const char of characters) {
		const codePoint = char.codePointAt(0);
		if (codePoint !== void 0) codePoints.push(codePoint);
	}
	return codePoints;
}
/**
* Enhanced decimal to emoji conversion that handles emoji sequences
* @param decimals - Array of decimal Unicode code points
* @returns The reconstructed emoji string
*/
function decimalToEmojiEnhanced(decimals) {
	return decimals.map((decimal) => String.fromCodePoint(decimal)).join("");
}
/**
* Converts emoji to a string representation for storage
* This creates a comma-separated string of decimal values
* @param emoji - The emoji string to convert
* @returns String representation of decimal values
*/
function emojiToString(emoji) {
	return emojiToDecimalEnhanced(emoji).join("-");
}
/**
* Converts string representation back to emoji
* @param emojiString - Comma-separated string of decimal values
* @returns The reconstructed emoji string
*/
function stringToEmoji(emojiString) {
	if (!emojiString) return "";
	const decimals = emojiString.split("-").map((s) => Number(s.trim())).filter((n) => Number.isFinite(n) && n >= 0 && n <= 1114111);
	try {
		return decimalToEmojiEnhanced(decimals);
	} catch {
		return "";
	}
}
const getEmojiSize = (size) => size * .9 * .0625;

//#endregion
//#region src/emoji-icon-picker/lucide-icons.tsx
const LUCIDE_ICONS_LIST = [
	{
		name: "Activity",
		element: Activity
	},
	{
		name: "Airplay",
		element: Airplay
	},
	{
		name: "AlertCircle",
		element: AlertCircle
	},
	{
		name: "AlertOctagon",
		element: AlertOctagon
	},
	{
		name: "AlertTriangle",
		element: AlertTriangle
	},
	{
		name: "AlignCenter",
		element: AlignCenter
	},
	{
		name: "AlignJustify",
		element: AlignJustify
	},
	{
		name: "AlignLeft",
		element: AlignLeft
	},
	{
		name: "AlignRight",
		element: AlignRight
	},
	{
		name: "Anchor",
		element: Anchor
	},
	{
		name: "Aperture",
		element: Aperture
	},
	{
		name: "Archive",
		element: Archive
	},
	{
		name: "ArrowDown",
		element: ArrowDown
	},
	{
		name: "ArrowLeft",
		element: ArrowLeft
	},
	{
		name: "ArrowRight",
		element: ArrowRight
	},
	{
		name: "ArrowUp",
		element: ArrowUp
	},
	{
		name: "AtSign",
		element: AtSign
	},
	{
		name: "Award",
		element: Award
	},
	{
		name: "BarChart",
		element: BarChart
	},
	{
		name: "BarChart2",
		element: BarChart2
	},
	{
		name: "Battery",
		element: Battery
	},
	{
		name: "BatteryCharging",
		element: BatteryCharging
	},
	{
		name: "Bell",
		element: Bell
	},
	{
		name: "BellOff",
		element: BellOff
	},
	{
		name: "Book",
		element: Book
	},
	{
		name: "Bookmark",
		element: Bookmark
	},
	{
		name: "BookOpen",
		element: BookOpen
	},
	{
		name: "Box",
		element: Box
	},
	{
		name: "Briefcase",
		element: Briefcase
	},
	{
		name: "Calendar",
		element: Calendar
	},
	{
		name: "Camera",
		element: Camera
	},
	{
		name: "CameraOff",
		element: CameraOff
	},
	{
		name: "Cast",
		element: Cast
	},
	{
		name: "CircleChevronDown",
		element: CircleChevronDown
	},
	{
		name: "Check",
		element: Check
	},
	{
		name: "CheckCircle",
		element: CheckCircle
	},
	{
		name: "CheckSquare",
		element: CheckSquare
	},
	{
		name: "ChevronDown",
		element: ChevronDownIcon
	},
	{
		name: "ChevronLeft",
		element: ChevronLeftIcon
	},
	{
		name: "ChevronRight",
		element: ChevronRightIcon
	},
	{
		name: "ChevronUp",
		element: ChevronUpIcon
	},
	{
		name: "Clipboard",
		element: Clipboard
	},
	{
		name: "Clock",
		element: Clock
	},
	{
		name: "Cloud",
		element: Cloud
	},
	{
		name: "CloudDrizzle",
		element: CloudDrizzle
	},
	{
		name: "CloudLightning",
		element: CloudLightning
	},
	{
		name: "CloudOff",
		element: CloudOff
	},
	{
		name: "CloudRain",
		element: CloudRain
	},
	{
		name: "CloudSnow",
		element: CloudSnow
	},
	{
		name: "Code",
		element: Code
	},
	{
		name: "Codepen",
		element: Codepen
	},
	{
		name: "Codesandbox",
		element: Codesandbox
	},
	{
		name: "Coffee",
		element: Coffee
	},
	{
		name: "Columns",
		element: Columns
	},
	{
		name: "Command",
		element: Command
	},
	{
		name: "Compass",
		element: Compass
	},
	{
		name: "Copy",
		element: Copy
	},
	{
		name: "CornerDownLeft",
		element: CornerDownLeft
	},
	{
		name: "CornerDownRight",
		element: CornerDownRight
	},
	{
		name: "CornerLeftDown",
		element: CornerLeftDown
	},
	{
		name: "CornerLeftUp",
		element: CornerLeftUp
	},
	{
		name: "CornerRightDown",
		element: CornerRightDown
	},
	{
		name: "CornerRightUp",
		element: CornerRightUp
	},
	{
		name: "CornerUpLeft",
		element: CornerUpLeft
	},
	{
		name: "CornerUpRight",
		element: CornerUpRight
	},
	{
		name: "Cpu",
		element: Cpu
	},
	{
		name: "CreditCard",
		element: CreditCard
	},
	{
		name: "Crop",
		element: Crop
	},
	{
		name: "Crosshair",
		element: Crosshair
	},
	{
		name: "Database",
		element: Database
	},
	{
		name: "Delete",
		element: Delete
	},
	{
		name: "Disc",
		element: Disc
	},
	{
		name: "Divide",
		element: Divide
	},
	{
		name: "DivideCircle",
		element: DivideCircle
	},
	{
		name: "DivideSquare",
		element: DivideSquare
	},
	{
		name: "DollarSign",
		element: DollarSign
	},
	{
		name: "Download",
		element: Download
	},
	{
		name: "DownloadCloud",
		element: DownloadCloud
	},
	{
		name: "Dribbble",
		element: Dribbble
	},
	{
		name: "Droplet",
		element: Droplet
	},
	{
		name: "Edit",
		element: Edit
	},
	{
		name: "Edit2",
		element: Edit2
	},
	{
		name: "Edit3",
		element: Edit3
	},
	{
		name: "ExternalLink",
		element: ExternalLink
	},
	{
		name: "Eye",
		element: Eye
	},
	{
		name: "EyeOff",
		element: EyeOff
	},
	{
		name: "Facebook",
		element: Facebook
	},
	{
		name: "FastForward",
		element: FastForward
	},
	{
		name: "Feather",
		element: Feather
	},
	{
		name: "Figma",
		element: Figma
	},
	{
		name: "File",
		element: File
	},
	{
		name: "FileMinus",
		element: FileMinus
	},
	{
		name: "FilePlus",
		element: FilePlus
	},
	{
		name: "FileText",
		element: FileText
	},
	{
		name: "Film",
		element: Film
	},
	{
		name: "Filter",
		element: Filter
	},
	{
		name: "Flag",
		element: Flag
	},
	{
		name: "Folder",
		element: Folder
	},
	{
		name: "FolderMinus",
		element: FolderMinus
	},
	{
		name: "FolderPlus",
		element: FolderPlus
	},
	{
		name: "Framer",
		element: Framer
	},
	{
		name: "Frown",
		element: Frown
	},
	{
		name: "Gift",
		element: Gift
	},
	{
		name: "GitBranch",
		element: GitBranch
	},
	{
		name: "GitCommit",
		element: GitCommit
	},
	{
		name: "GitMerge",
		element: GitMerge
	},
	{
		name: "GitPullRequest",
		element: GitPullRequest
	},
	{
		name: "Github",
		element: Github
	},
	{
		name: "Gitlab",
		element: Gitlab
	},
	{
		name: "Globe",
		element: Globe
	},
	{
		name: "Grid",
		element: Grid
	},
	{
		name: "HardDrive",
		element: HardDrive
	},
	{
		name: "Hash",
		element: Hash
	},
	{
		name: "Headphones",
		element: Headphones
	},
	{
		name: "Heart",
		element: Heart
	},
	{
		name: "HelpCircle",
		element: HelpCircle
	},
	{
		name: "Hexagon",
		element: Hexagon
	},
	{
		name: "Home",
		element: Home
	},
	{
		name: "Image",
		element: Image
	},
	{
		name: "Inbox",
		element: Inbox
	},
	{
		name: "Info",
		element: Info
	},
	{
		name: "Instagram",
		element: Instagram
	},
	{
		name: "Italic",
		element: Italic
	},
	{
		name: "Key",
		element: Key
	},
	{
		name: "Layers",
		element: Layers
	},
	{
		name: "Layout",
		element: Layout
	},
	{
		name: "LifeBuoy",
		element: LifeBuoy
	},
	{
		name: "Link",
		element: Link
	},
	{
		name: "Link2",
		element: Link2
	},
	{
		name: "Linkedin",
		element: Linkedin
	},
	{
		name: "List",
		element: List
	},
	{
		name: "Loader",
		element: Loader
	},
	{
		name: "Lock",
		element: Lock
	},
	{
		name: "LogIn",
		element: LogIn
	},
	{
		name: "LogOut",
		element: LogOut
	},
	{
		name: "Mail",
		element: Mail
	},
	{
		name: "Map",
		element: Map
	},
	{
		name: "MapPin",
		element: MapPin
	},
	{
		name: "Maximize",
		element: Maximize
	},
	{
		name: "Maximize2",
		element: Maximize2
	},
	{
		name: "Meh",
		element: Meh
	},
	{
		name: "Menu",
		element: Menu
	},
	{
		name: "MessageCircle",
		element: MessageCircle
	},
	{
		name: "MessageSquare",
		element: MessageSquare
	},
	{
		name: "Mic",
		element: Mic
	},
	{
		name: "MicOff",
		element: MicOff
	},
	{
		name: "Minimize",
		element: Minimize
	},
	{
		name: "Minimize2",
		element: Minimize2
	},
	{
		name: "Minus",
		element: Minus
	},
	{
		name: "MinusCircle",
		element: MinusCircle
	},
	{
		name: "MinusSquare",
		element: MinusSquare
	},
	{
		name: "Search",
		element: Search
	},
	{
		name: "ToggleLeft",
		element: ToggleLeft
	},
	{
		name: "User",
		element: User
	},
	{
		name: "UsersRound",
		element: UsersRound
	}
];

//#endregion
//#region src/emoji-icon-picker/icon/lucide-root.tsx
function LucideIconsList(props) {
	const { query, onChange, activeColor } = props;
	return /* @__PURE__ */ jsx(Fragment, { children: LUCIDE_ICONS_LIST.filter((icon) => icon.name.toLowerCase().includes(query.toLowerCase())).map((icon) => /* @__PURE__ */ jsx("button", {
		type: "button",
		className: "h-9 w-9 select-none text-lg grid place-items-center rounded hover:bg-custom-background-80",
		onClick: () => {
			onChange({
				name: icon.name,
				color: activeColor
			});
		},
		children: /* @__PURE__ */ jsx(icon.element, {
			style: { color: activeColor },
			className: "size-4"
		})
	}, icon.name)) });
}

//#endregion
//#region src/emoji-icon-picker/material-icons.tsx
const MATERIAL_ICONS_LIST = [
	{ name: "search" },
	{ name: "home" },
	{ name: "menu" },
	{ name: "close" },
	{ name: "settings" },
	{ name: "done" },
	{ name: "check_circle" },
	{ name: "favorite" },
	{ name: "add" },
	{ name: "delete" },
	{ name: "arrow_back" },
	{ name: "star" },
	{ name: "logout" },
	{ name: "add_circle" },
	{ name: "cancel" },
	{ name: "arrow_drop_down" },
	{ name: "more_vert" },
	{ name: "check" },
	{ name: "check_box" },
	{ name: "toggle_on" },
	{ name: "open_in_new" },
	{ name: "refresh" },
	{ name: "login" },
	{ name: "radio_button_unchecked" },
	{ name: "more_horiz" },
	{ name: "apps" },
	{ name: "radio_button_checked" },
	{ name: "download" },
	{ name: "remove" },
	{ name: "toggle_off" },
	{ name: "bolt" },
	{ name: "arrow_upward" },
	{ name: "filter_list" },
	{ name: "delete_forever" },
	{ name: "autorenew" },
	{ name: "key" },
	{ name: "sort" },
	{ name: "sync" },
	{ name: "add_box" },
	{ name: "block" },
	{ name: "restart_alt" },
	{ name: "menu_open" },
	{ name: "shopping_cart_checkout" },
	{ name: "expand_circle_down" },
	{ name: "backspace" },
	{ name: "undo" },
	{ name: "done_all" },
	{ name: "do_not_disturb_on" },
	{ name: "open_in_full" },
	{ name: "double_arrow" },
	{ name: "sync_alt" },
	{ name: "zoom_in" },
	{ name: "done_outline" },
	{ name: "drag_indicator" },
	{ name: "fullscreen" },
	{ name: "star_half" },
	{ name: "settings_accessibility" },
	{ name: "reply" },
	{ name: "exit_to_app" },
	{ name: "unfold_more" },
	{ name: "library_add" },
	{ name: "cached" },
	{ name: "select_check_box" },
	{ name: "terminal" },
	{ name: "change_circle" },
	{ name: "disabled_by_default" },
	{ name: "swap_horiz" },
	{ name: "swap_vert" },
	{ name: "app_registration" },
	{ name: "download_for_offline" },
	{ name: "close_fullscreen" },
	{ name: "file_open" },
	{ name: "minimize" },
	{ name: "open_with" },
	{ name: "dataset" },
	{ name: "add_task" },
	{ name: "start" },
	{ name: "keyboard_voice" },
	{ name: "create_new_folder" },
	{ name: "forward" },
	{ name: "settings_applications" },
	{ name: "compare_arrows" },
	{ name: "redo" },
	{ name: "zoom_out" },
	{ name: "publish" },
	{ name: "html" },
	{ name: "token" },
	{ name: "switch_access_shortcut" },
	{ name: "fullscreen_exit" },
	{ name: "sort_by_alpha" },
	{ name: "delete_sweep" },
	{ name: "indeterminate_check_box" },
	{ name: "view_timeline" },
	{ name: "settings_backup_restore" },
	{ name: "arrow_drop_down_circle" },
	{ name: "assistant_navigation" },
	{ name: "sync_problem" },
	{ name: "clear_all" },
	{ name: "density_medium" },
	{ name: "heart_plus" },
	{ name: "filter_alt_off" },
	{ name: "expand" },
	{ name: "subdirectory_arrow_right" },
	{ name: "download_done" },
	{ name: "arrow_outward" },
	{ name: "123" },
	{ name: "swipe_left" },
	{ name: "auto_mode" },
	{ name: "saved_search" },
	{ name: "place_item" },
	{ name: "system_update_alt" },
	{ name: "javascript" },
	{ name: "search_off" },
	{ name: "output" },
	{ name: "select_all" },
	{ name: "fit_screen" },
	{ name: "swipe_up" },
	{ name: "dynamic_form" },
	{ name: "hide_source" },
	{ name: "swipe_right" },
	{ name: "switch_access_shortcut_add" },
	{ name: "browse_gallery" },
	{ name: "css" },
	{ name: "density_small" },
	{ name: "assistant_direction" },
	{ name: "check_small" },
	{ name: "youtube_searched_for" },
	{ name: "move_up" },
	{ name: "swap_horizontal_circle" },
	{ name: "data_thresholding" },
	{ name: "install_mobile" },
	{ name: "move_down" },
	{ name: "dataset_linked" },
	{ name: "keyboard_command_key" },
	{ name: "view_kanban" },
	{ name: "swipe_down" },
	{ name: "key_off" },
	{ name: "transcribe" },
	{ name: "send_time_extension" },
	{ name: "swipe_down_alt" },
	{ name: "swipe_left_alt" },
	{ name: "swipe_right_alt" },
	{ name: "swipe_up_alt" },
	{ name: "keyboard_option_key" },
	{ name: "cycle" },
	{ name: "rebase" },
	{ name: "rebase_edit" },
	{ name: "empty_dashboard" },
	{ name: "magic_exchange" },
	{ name: "acute" },
	{ name: "point_scan" },
	{ name: "step_into" },
	{ name: "cheer" },
	{ name: "emoticon" },
	{ name: "explosion" },
	{ name: "water_bottle" },
	{ name: "weather_hail" },
	{ name: "syringe" },
	{ name: "pill" },
	{ name: "genetics" },
	{ name: "allergy" },
	{ name: "medical_mask" },
	{ name: "body_fat" },
	{ name: "barefoot" },
	{ name: "infrared" },
	{ name: "wrist" },
	{ name: "metabolism" },
	{ name: "conditions" },
	{ name: "taunt" },
	{ name: "altitude" },
	{ name: "tibia" },
	{ name: "footprint" },
	{ name: "eyeglasses" },
	{ name: "man_3" },
	{ name: "woman_2" },
	{ name: "rheumatology" },
	{ name: "tornado" },
	{ name: "landslide" },
	{ name: "foggy" },
	{ name: "severe_cold" },
	{ name: "tsunami" },
	{ name: "vape_free" },
	{ name: "sign_language" },
	{ name: "emoji_symbols" },
	{ name: "clear_night" },
	{ name: "emoji_food_beverage" },
	{ name: "hive" },
	{ name: "thunderstorm" },
	{ name: "communication" },
	{ name: "rocket" },
	{ name: "pets" },
	{ name: "public" },
	{ name: "quiz" },
	{ name: "mood" },
	{ name: "gavel" },
	{ name: "eco" },
	{ name: "diamond" },
	{ name: "forest" },
	{ name: "rainy" },
	{ name: "skull" }
];

//#endregion
//#region src/emoji-icon-picker/icon/material-root.tsx
function MaterialIconList(props) {
	const { query, onChange, activeColor } = props;
	const filteredArray = MATERIAL_ICONS_LIST.filter((icon) => icon.name.toLowerCase().includes(query.toLowerCase()));
	const isMaterialSymbolsFontLoaded = useFontFaceObserver([{
		family: `Material Symbols Rounded`,
		style: `normal`,
		weight: `normal`,
		stretch: `condensed`
	}]);
	return /* @__PURE__ */ jsx(Fragment, { children: filteredArray.map((icon) => /* @__PURE__ */ jsx("button", {
		type: "button",
		className: "h-9 w-9 select-none text-lg grid place-items-center rounded hover:bg-custom-background-80",
		onClick: () => {
			onChange({
				name: icon.name,
				color: activeColor
			});
		},
		children: isMaterialSymbolsFontLoaded ? /* @__PURE__ */ jsx("span", {
			style: { color: activeColor },
			className: "material-symbols-rounded !text-[1.25rem] !leading-[1.25rem]",
			children: icon.name
		}) : /* @__PURE__ */ jsx("span", { className: "size-5 rounded animate-pulse bg-custom-background-80" })
	}, icon.name)) });
}

//#endregion
//#region src/emoji-icon-picker/icon/icon-root.tsx
function IconRoot(props) {
	const { defaultColor, onChange, searchDisabled = false, iconType } = props;
	const [activeColor, setActiveColor] = useState(defaultColor);
	const [showHexInput, setShowHexInput] = useState(false);
	const [hexValue, setHexValue] = useState("");
	const [isInputFocused, setIsInputFocused] = useState(false);
	const [query, setQuery] = useState("");
	useEffect(() => {
		if (DEFAULT_COLORS.includes(defaultColor.toLowerCase() ?? "")) setShowHexInput(false);
		else {
			setHexValue(defaultColor?.slice(1, 7) ?? "");
			setShowHexInput(true);
		}
	}, [defaultColor]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
		className: "flex flex-col sticky top-0 bg-custom-background-100",
		children: [
			!searchDisabled && /* @__PURE__ */ jsx("div", {
				className: "flex items-center px-2 py-[15px] w-full ",
				children: /* @__PURE__ */ jsxs("div", {
					className: cn("relative flex items-center gap-2 bg-custom-background-90 h-10 rounded-lg w-full px-[30px] border", {
						"border-custom-primary-100": isInputFocused,
						"border-transparent": !isInputFocused
					}),
					onFocus: () => setIsInputFocused(true),
					onBlur: () => setIsInputFocused(false),
					children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-2.5 bottom-3 h-3.5 w-3.5 text-custom-text-400" }), /* @__PURE__ */ jsx("input", {
						placeholder: "Search",
						value: query,
						onChange: (e) => setQuery(e.target.value),
						className: "block rounded-md bg-transparent placeholder-custom-text-400 focus:outline-none px-3 py-2 border-[0.5px] border-custom-border-200 text-[1rem] border-none p-0 h-full w-full"
					})]
				})
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid grid-cols-9 gap-2 items-center justify-items-center px-2.5 py-1 h-9",
				children: [showHexInput ? /* @__PURE__ */ jsxs("div", {
					className: "col-span-8 flex items-center gap-1 justify-self-stretch ml-2",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "h-4 w-4 flex-shrink-0 rounded-full mr-1",
							style: { backgroundColor: `#${hexValue}` }
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-xs text-custom-text-300 flex-shrink-0",
							children: "HEX"
						}),
						/* @__PURE__ */ jsx("span", {
							className: "text-xs text-custom-text-200 flex-shrink-0 -mr-1",
							children: "#"
						}),
						/* @__PURE__ */ jsx("input", {
							type: "text",
							value: hexValue,
							onChange: (e) => {
								const value = e.target.value;
								setHexValue(value);
								if (/^[0-9A-Fa-f]{6}$/.test(value)) setActiveColor(adjustColorForContrast(`#${value}`));
							},
							className: "block placeholder-custom-text-400 focus:outline-none px-3 py-2 border-[0.5px] border-custom-border-200 flex-grow pl-0 text-xs text-custom-text-200 rounded border-none bg-transparent ring-0",
							autoFocus: true
						})
					]
				}) : DEFAULT_COLORS.map((curCol) => /* @__PURE__ */ jsx("button", {
					type: "button",
					className: "grid place-items-center size-5",
					onClick: () => {
						setActiveColor(curCol);
						setHexValue(curCol.slice(1, 7));
					},
					children: /* @__PURE__ */ jsx("span", {
						className: "h-4 w-4 cursor-pointer rounded-full",
						style: { backgroundColor: curCol }
					})
				}, curCol)), /* @__PURE__ */ jsx("button", {
					type: "button",
					className: cn("grid place-items-center h-4 w-4 rounded-full border border-transparent", { "border-custom-border-400": !showHexInput }),
					onClick: () => {
						setShowHexInput((prevData) => !prevData);
						setHexValue(activeColor.slice(1, 7));
					},
					children: showHexInput ? /* @__PURE__ */ jsx("span", { className: "conical-gradient h-4 w-4 rounded-full" }) : /* @__PURE__ */ jsx("span", {
						className: "text-custom-text-300 text-[0.6rem] grid place-items-center",
						children: "#"
					})
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2 w-full pl-4 pr-3 py-1 h-6",
				children: [/* @__PURE__ */ jsx(InfoIcon, { className: "h-3 w-3" }), /* @__PURE__ */ jsx("p", {
					className: "text-xs",
					children: " Colors will be adjusted to ensure sufficient contrast."
				})]
			})
		]
	}), /* @__PURE__ */ jsx("div", {
		className: "grid grid-cols-8 gap-1 px-2.5 justify-items-center mt-2",
		children: iconType === "material" ? /* @__PURE__ */ jsx(MaterialIconList, {
			query,
			onChange,
			activeColor
		}) : /* @__PURE__ */ jsx(LucideIconsList, {
			query,
			onChange,
			activeColor
		})
	})] });
}

//#endregion
//#region src/emoji-icon-picker/emoji-picker.tsx
function EmojiPicker$1(props) {
	const { isOpen, handleToggle, buttonClassName, closeOnSelect = true, defaultIconColor = "#6d7b8a", defaultOpen = EmojiIconPickerTypes.EMOJI, disabled = false, dropdownClassName, label, onChange, placement = "bottom-start", searchDisabled = false, searchPlaceholder = "Search", iconType = "lucide", side = "bottom", align = "start" } = props;
	const { finalSide, finalAlign } = useMemo(() => {
		if (placement) {
			const converted = convertPlacementToSideAndAlign(placement);
			return {
				finalSide: converted.side,
				finalAlign: converted.align
			};
		}
		return {
			finalSide: side,
			finalAlign: align
		};
	}, [
		placement,
		side,
		align
	]);
	const handleEmojiChange = useCallback((value) => {
		onChange({
			type: EmojiIconPickerTypes.EMOJI,
			value: emojiToString(value)
		});
		if (closeOnSelect) handleToggle(false);
	}, [
		onChange,
		closeOnSelect,
		handleToggle
	]);
	const handleIconChange = useCallback((value) => {
		onChange({
			type: EmojiIconPickerTypes.ICON,
			value
		});
		if (closeOnSelect) handleToggle(false);
	}, [
		onChange,
		closeOnSelect,
		handleToggle
	]);
	const tabs = useMemo(() => [{
		key: "emoji",
		label: "Emoji",
		content: /* @__PURE__ */ jsx(EmojiRoot, {
			onChange: handleEmojiChange,
			searchPlaceholder,
			searchDisabled
		})
	}, {
		key: "icon",
		label: "Icon",
		content: /* @__PURE__ */ jsx(IconRoot, {
			defaultColor: defaultIconColor,
			onChange: handleIconChange,
			searchDisabled,
			iconType
		})
	}].map((tab) => ({
		key: tab.key,
		label: tab.label,
		content: tab.content
	})), [
		defaultIconColor,
		searchDisabled,
		searchPlaceholder,
		iconType,
		handleEmojiChange,
		handleIconChange
	]);
	return /* @__PURE__ */ jsxs(Popover, {
		open: isOpen,
		onOpenChange: handleToggle,
		children: [/* @__PURE__ */ jsx(Popover.Button, {
			className: cn("outline-none", buttonClassName),
			disabled,
			children: label
		}), /* @__PURE__ */ jsx(Popover.Panel, {
			positionerClassName: "z-50",
			className: cn("w-80 bg-custom-background-100 rounded-md border-[0.5px] border-custom-border-300 overflow-hidden", dropdownClassName),
			side: finalSide,
			align: finalAlign,
			sideOffset: 8,
			"data-prevent-outside-click": "true",
			onMouseDown: (e) => e.stopPropagation(),
			onClick: (e) => e.stopPropagation(),
			onFocus: (e) => e.stopPropagation(),
			onKeyDown: (e) => {
				if (e.key === "Tab") return;
				if (e.key === "Escape") {
					handleToggle(false);
					return;
				}
				e.stopPropagation();
			},
			children: /* @__PURE__ */ jsxs(Tabs.Root, {
				defaultValue: defaultOpen,
				children: [/* @__PURE__ */ jsx(Tabs.List, {
					className: "grid grid-cols-2 gap-1 px-3.5 pt-3",
					children: tabs.map((tab) => /* @__PURE__ */ jsx(Tabs.Tab, {
						value: tab.key,
						className: ({ selected }) => cn("py-1 text-sm rounded border border-custom-border-200 bg-custom-background-80", {
							"bg-custom-background-100 text-custom-text-100": selected,
							"text-custom-text-400 hover:text-custom-text-300 hover:bg-custom-background-80/60": !selected
						}),
						children: tab.label
					}, tab.key))
				}), tabs.map((tab) => /* @__PURE__ */ jsx(Tabs.Panel, {
					value: tab.key,
					className: "h-80 overflow-hidden overflow-y-auto",
					children: tab.content
				}, tab.key))]
			})
		})]
	});
}

//#endregion
//#region src/emoji-icon-picker/logo.tsx
function Logo(props) {
	const { logo, size = 16, type = "material" } = props;
	const { in_use, emoji, icon } = logo;
	const value = in_use === "emoji" ? emoji?.value : icon?.name;
	const color = icon?.color;
	const lucideIcon = LUCIDE_ICONS_LIST.find((item) => item.name === value);
	const isMaterialSymbolsFontLoaded = useFontFaceObserver([{
		family: `Material Symbols Rounded`,
		style: `normal`,
		weight: `normal`,
		stretch: `condensed`
	}]);
	if (!value) return /* @__PURE__ */ jsx(Fragment, {});
	if (!isMaterialSymbolsFontLoaded) return /* @__PURE__ */ jsx("span", {
		style: {
			height: size,
			width: size
		},
		className: "rounded animate-pulse bg-custom-background-80"
	});
	if (in_use === "emoji") return /* @__PURE__ */ jsx("span", {
		className: "flex items-center justify-center",
		style: {
			fontSize: `${getEmojiSize(size)}rem`,
			lineHeight: `${getEmojiSize(size)}rem`,
			height: size,
			width: size
		},
		children: stringToEmoji(emoji?.value || "")
	});
	if (in_use === "icon") return /* @__PURE__ */ jsx(Fragment, { children: type === "lucide" ? /* @__PURE__ */ jsx(Fragment, { children: lucideIcon && /* @__PURE__ */ jsx(lucideIcon.element, { style: {
		color,
		height: size,
		width: size
	} }) }) : /* @__PURE__ */ jsx("span", {
		className: "material-symbols-rounded",
		style: {
			fontSize: size,
			color,
			scale: "115%"
		},
		children: value
	}) });
	return /* @__PURE__ */ jsx(Fragment, {});
}

//#endregion
export { DEFAULT_COLORS as a, decimalToEmojiEnhanced as c, getEmojiSize as d, stringToEmoji as f, LUCIDE_ICONS_LIST as i, emojiToDecimalEnhanced as l, EmojiPicker$1 as n, EmojiIconPickerTypes as o, EmojiRoot as p, MATERIAL_ICONS_LIST as r, adjustColorForContrast as s, Logo as t, emojiToString as u };
//# sourceMappingURL=emoji-icon-picker-BEd3RBLu.js.map