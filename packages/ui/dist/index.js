import * as React$1 from "react";
import React, { Fragment, createContext, forwardRef, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Tooltip as Tooltip$1 } from "@plane/propel/tooltip";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Fragment as Fragment$1, jsx, jsxs } from "react/jsx-runtime";
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, ChevronUpIcon, DropdownIcon } from "@plane/propel/icons";
import { Activity, Airplay, AlertCircle, AlertOctagon, AlertTriangle, AlignCenter, AlignJustify, AlignLeft, AlignRight, Anchor, Aperture, Archive, ArrowDown, ArrowLeft, ArrowRight, ArrowUp, AtSign, Award, BarChart, BarChart2, Battery, BatteryCharging, Bell, BellOff, Book, BookOpen, Bookmark, Box, Briefcase, Calendar, Camera, CameraOff, Cast, Check, CheckCircle, CheckIcon, CheckSquare, CircleCheck, CircleChevronDown, Clipboard, Clock, Cloud, CloudDrizzle, CloudLightning, CloudOff, CloudRain, CloudSnow, Code, Codepen, Codesandbox, Coffee, Columns, Command, Compass, Copy, CornerDownLeft, CornerDownRight, CornerLeftDown, CornerLeftUp, CornerRightDown, CornerRightUp, CornerUpLeft, CornerUpRight, Cpu, CreditCard, Crop, Crosshair, Database, Delete, Disc, Divide, DivideCircle, DivideSquare, DollarSign, Download, DownloadCloud, Dribbble, Droplet, Edit, Edit2, Edit3, EllipsisVertical, ExternalLink, Eye, EyeClosed, EyeOff, Facebook, FastForward, Feather, Figma, File, FileMinus, FilePlus, FileText, Film, Filter, Flag, Folder, FolderMinus, FolderPlus, Framer, Frown, Gift, GitBranch, GitCommit, GitMerge, GitPullRequest, Github, Gitlab, Globe, Grid, HardDrive, Hash, Headphones, Heart, HelpCircle, Hexagon, Home, Image, Inbox, Info, Instagram, Italic, Key, Layers, Layout, LifeBuoy, Link, Link2, Linkedin, List, Loader as Loader$1, Lock, LogIn, LogOut, Mail, Map, MapPin, Maximize, Maximize2, Meh, Menu, MessageCircle, MessageSquare, Mic, MicOff, Minimize, Minimize2, Minus, MinusCircle, MinusSquare, MoreHorizontal, MoreVertical, Search, Star, ToggleLeft, User, UsersRound } from "lucide-react";
import { usePopper } from "react-popper";
import ReactDOM, { createPortal } from "react-dom";
import { Combobox, Dialog, Disclosure, Menu as Menu$1, Popover as Popover$1, Switch, Tab, Transition } from "@headlessui/react";
import { useLocalStorage, useOutsideClickDetector } from "@plane/hooks";
import { isEqual, range, sortBy } from "lodash-es";
import * as ColorPicker$1 from "react-color";
import { calculateTimeAgo, cn as cn$1, getIconForLink, getPasswordCriteria, getPasswordStrength } from "@plane/utils";
import { E_PASSWORD_STRENGTH } from "@plane/constants";
import * as RadixScrollArea from "@radix-ui/react-scroll-area";
import { draggable, dropTargetForElements, monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/dist/cjs/entry-point/element/adapter.js";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/dist/cjs/entry-point/combine.js";
import { attachClosestEdge, extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/dist/cjs/closest-edge.js";
import { Tooltip2 } from "@blueprintjs/popover2";
import { EProductSubscriptionEnum } from "@plane/types";

//#region src/utils/classname.tsx
const cn = (...inputs) => twMerge(clsx(inputs));

//#endregion
//#region src/utils/icons.ts
/**
* Returns a random icon name from the LUCIDE_ICONS_LIST array
*/
const getRandomIconName = () => LUCIDE_ICONS_LIST[Math.floor(Math.random() * LUCIDE_ICONS_LIST.length)].name;

//#endregion
//#region src/avatar/avatar.tsx
/**
* Get the size details based on the size prop
* @param size The size of the avatar
* @returns The size details
*/
const getSizeInfo = (size) => {
	switch (size) {
		case "sm": return {
			avatarSize: "h-4 w-4",
			fontSize: "text-xs",
			spacing: "-space-x-1"
		};
		case "md": return {
			avatarSize: "h-5 w-5",
			fontSize: "text-xs",
			spacing: "-space-x-1"
		};
		case "base": return {
			avatarSize: "h-6 w-6",
			fontSize: "text-sm",
			spacing: "-space-x-1.5"
		};
		case "lg": return {
			avatarSize: "h-7 w-7",
			fontSize: "text-sm",
			spacing: "-space-x-1.5"
		};
		default: return {
			avatarSize: "h-5 w-5",
			fontSize: "text-xs",
			spacing: "-space-x-1"
		};
	}
};
/**
* Get the border radius based on the shape prop
* @param shape The shape of the avatar
* @returns The border radius
*/
const getBorderRadius = (shape) => {
	switch (shape) {
		case "circle": return "rounded-full";
		case "square": return "rounded";
		default: return "rounded-full";
	}
};
/**
* Check if the value is a valid number
* @param value The value to check
* @returns Whether the value is a valid number or not
*/
const isAValidNumber = (value) => typeof value === "number" && !isNaN(value);
function Avatar(props) {
	const { name, fallbackBackgroundColor, fallbackText, fallbackTextColor, showTooltip = true, size = "md", shape = "circle", src, className = "" } = props;
	const sizeInfo = getSizeInfo(size);
	return /* @__PURE__ */ jsx(Tooltip$1, {
		tooltipContent: fallbackText ?? name ?? "?",
		disabled: !showTooltip,
		children: /* @__PURE__ */ jsx("div", {
			className: cn("grid place-items-center overflow-hidden", getBorderRadius(shape), { [sizeInfo.avatarSize]: !isAValidNumber(size) }),
			style: isAValidNumber(size) ? {
				height: `${size}px`,
				width: `${size}px`
			} : {},
			tabIndex: -1,
			children: src ? /* @__PURE__ */ jsx("img", {
				src,
				className: cn("h-full w-full", getBorderRadius(shape), className),
				alt: name
			}) : /* @__PURE__ */ jsx("div", {
				className: cn(sizeInfo.fontSize, "grid h-full w-full place-items-center", getBorderRadius(shape), className),
				style: {
					backgroundColor: fallbackBackgroundColor ?? "#028375",
					color: fallbackTextColor ?? "#ffffff"
				},
				children: name?.[0]?.toUpperCase() ?? fallbackText ?? "?"
			})
		})
	});
}

//#endregion
//#region src/avatar/avatar-group.tsx
function AvatarGroup(props) {
	const { children, max = 2, showTooltip = true, size = "md" } = props;
	const totalAvatars = React.Children.toArray(children).length;
	const maxAvatarsToRender = totalAvatars <= max + 1 ? max + 1 : max;
	const avatarsWithUpdatedProps = React.Children.toArray(children).slice(0, maxAvatarsToRender).map((avatar) => {
		const updatedProps = {
			showTooltip,
			size
		};
		return React.cloneElement(avatar, updatedProps);
	});
	const sizeInfo = getSizeInfo(size);
	return /* @__PURE__ */ jsxs("div", {
		className: cn("flex", sizeInfo.spacing),
		children: [avatarsWithUpdatedProps.map((avatar, index) => /* @__PURE__ */ jsx("div", {
			className: "rounded-full ring-1 ring-custom-background-100",
			children: avatar
		}, index)), maxAvatarsToRender < totalAvatars && /* @__PURE__ */ jsx(Tooltip$1, {
			tooltipContent: `${totalAvatars} total`,
			disabled: !showTooltip,
			children: /* @__PURE__ */ jsxs("div", {
				className: cn("grid place-items-center rounded-full bg-custom-primary-10 text-[9px] text-custom-primary-100 ring-1 ring-custom-background-100", { [sizeInfo.avatarSize]: !isAValidNumber(size) }),
				style: isAValidNumber(size) ? {
					width: `${size}px`,
					height: `${size}px`
				} : {},
				children: ["+", totalAvatars - max]
			})
		})]
	});
}

//#endregion
//#region src/badge/helper.tsx
var badgeSizeStyling = /* @__PURE__ */ function(badgeSizeStyling$1) {
	badgeSizeStyling$1["sm"] = "px-2.5 py-1 font-medium text-xs rounded flex items-center gap-1.5 whitespace-nowrap transition-all justify-center inline";
	badgeSizeStyling$1["md"] = "px-4 py-1.5 font-medium text-sm rounded flex items-center gap-1.5 whitespace-nowrap transition-all justify-center inline";
	badgeSizeStyling$1["lg"] = "px-4 py-2 font-medium text-sm rounded flex items-center gap-1.5 whitespace-nowrap transition-all justify-center inline";
	badgeSizeStyling$1["xl"] = "px-5 py-3 font-medium text-sm rounded flex items-center gap-1.5 whitespace-nowrap transition-all justify-center inline";
	return badgeSizeStyling$1;
}(badgeSizeStyling || {});
var badgeIconStyling = /* @__PURE__ */ function(badgeIconStyling$1) {
	badgeIconStyling$1["sm"] = "h-3 w-3 flex justify-center items-center overflow-hidden flex-shrink-0";
	badgeIconStyling$1["md"] = "h-3.5 w-3.5 flex justify-center items-center overflow-hidden flex-shrink-0";
	badgeIconStyling$1["lg"] = "h-4 w-4 flex justify-center items-center overflow-hidden flex-shrink-0";
	badgeIconStyling$1["xl"] = "h-4 w-4 flex justify-center items-center overflow-hidden flex-shrink-0";
	return badgeIconStyling$1;
}(badgeIconStyling || {});
const badgeStyling = {
	primary: {
		default: `text-white bg-custom-primary-100`,
		hover: `hover:bg-custom-primary-200`,
		disabled: `cursor-not-allowed !bg-custom-primary-60 hover:bg-custom-primary-60`
	},
	"accent-primary": {
		default: `bg-custom-primary-10 text-custom-primary-100`,
		hover: `hover:bg-custom-primary-20 hover:text-custom-primary-200`,
		disabled: `cursor-not-allowed !text-custom-primary-60`
	},
	"outline-primary": {
		default: `text-custom-primary-100 bg-custom-background-100 border border-custom-primary-100`,
		hover: `hover:border-custom-primary-80 hover:bg-custom-primary-10`,
		disabled: `cursor-not-allowed !text-custom-primary-60 !border-custom-primary-60 `
	},
	neutral: {
		default: `text-custom-background-100 bg-custom-text-100 border border-custom-border-200`,
		hover: `hover:bg-custom-text-200`,
		disabled: `cursor-not-allowed bg-custom-border-200 !text-custom-text-400`
	},
	"accent-neutral": {
		default: `text-custom-text-200 bg-custom-background-80`,
		hover: `hover:bg-custom-border-200 hover:text-custom-text-100`,
		disabled: `cursor-not-allowed !text-custom-text-400`
	},
	"outline-neutral": {
		default: `text-custom-text-200 bg-custom-background-100 border border-custom-border-200`,
		hover: `hover:text-custom-text-100 hover:bg-custom-border-200`,
		disabled: `cursor-not-allowed !text-custom-text-400`
	},
	success: {
		default: `text-white bg-green-500`,
		hover: `hover:bg-green-600`,
		disabled: `cursor-not-allowed !bg-green-300`
	},
	"accent-success": {
		default: `text-green-500 bg-green-50`,
		hover: `hover:bg-green-100 hover:text-green-600`,
		disabled: `cursor-not-allowed !text-green-300`
	},
	"outline-success": {
		default: `text-green-500 bg-custom-background-100 border border-green-500`,
		hover: `hover:text-green-600 hover:bg-green-50`,
		disabled: `cursor-not-allowed !text-green-300 border-green-300`
	},
	warning: {
		default: `text-white bg-amber-500`,
		hover: `hover:bg-amber-600`,
		disabled: `cursor-not-allowed !bg-amber-300`
	},
	"accent-warning": {
		default: `text-amber-500 bg-amber-50`,
		hover: `hover:bg-amber-100 hover:text-amber-600`,
		disabled: `cursor-not-allowed !text-amber-300`
	},
	"outline-warning": {
		default: `text-amber-500 bg-custom-background-100 border border-amber-500`,
		hover: `hover:text-amber-600 hover:bg-amber-50`,
		disabled: `cursor-not-allowed !text-amber-300 border-amber-300`
	},
	destructive: {
		default: `text-white bg-red-500`,
		hover: `hover:bg-red-600`,
		disabled: `cursor-not-allowed !bg-red-300`
	},
	"accent-destructive": {
		default: `text-red-500 bg-red-50`,
		hover: `hover:bg-red-100 hover:text-red-600`,
		disabled: `cursor-not-allowed !text-red-300`
	},
	"outline-destructive": {
		default: `text-red-500 bg-custom-background-100 border border-red-500`,
		hover: `hover:text-red-600 hover:bg-red-50`,
		disabled: `cursor-not-allowed !text-red-300 border-red-300`
	}
};
const getBadgeStyling = (variant, size, disabled = false) => {
	let tempVariant = ``;
	const currentVariant = badgeStyling[variant];
	tempVariant = `${currentVariant.default} ${disabled ? currentVariant.disabled : currentVariant.hover}`;
	let tempSize = ``;
	if (size) tempSize = badgeSizeStyling[size];
	return `${tempVariant} ${tempSize}`;
};
const getIconStyling$1 = (size) => {
	let icon = ``;
	if (size) icon = badgeIconStyling[size];
	return icon;
};

//#endregion
//#region src/badge/badge.tsx
const Badge = React$1.forwardRef(function Badge$1(props, ref) {
	const { variant = "primary", size = "md", className = "", type = "button", loading = false, disabled = false, prependIcon = null, appendIcon = null, children,...rest } = props;
	const buttonStyle = getBadgeStyling(variant, size, disabled || loading);
	const buttonIconStyle = getIconStyling$1(size);
	return /* @__PURE__ */ jsxs("button", {
		ref,
		type,
		className: cn(buttonStyle, className),
		disabled: disabled || loading,
		...rest,
		children: [
			prependIcon && /* @__PURE__ */ jsx("div", {
				className: buttonIconStyle,
				children: React$1.cloneElement(prependIcon, { strokeWidth: 2 })
			}),
			children,
			appendIcon && /* @__PURE__ */ jsx("div", {
				className: buttonIconStyle,
				children: React$1.cloneElement(appendIcon, { strokeWidth: 2 })
			})
		]
	});
});
Badge.displayName = "plane-ui-badge";

//#endregion
//#region src/breadcrumbs/breadcrumbs.tsx
function BreadcrumbItemLoader() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex items-center gap-2 h-7 animate-pulse",
		children: /* @__PURE__ */ jsxs("div", {
			className: "group h-full flex items-center gap-2 rounded px-2 py-1 text-sm font-medium",
			children: [/* @__PURE__ */ jsx("span", { className: "h-full w-5 bg-custom-background-80 rounded" }), /* @__PURE__ */ jsx("span", { className: "h-full w-16 bg-custom-background-80 rounded" })]
		})
	});
}
function Breadcrumbs({ className, children, onBack, isLoading = false }) {
	const [isSmallScreen, setIsSmallScreen] = React$1.useState(false);
	React$1.useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth <= 640);
		};
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	const childrenArray = React$1.Children.toArray(children);
	return /* @__PURE__ */ jsxs("div", {
		className: cn("flex items-center overflow-hidden gap-0.5 flex-grow", className),
		children: [
			!isSmallScreen && /* @__PURE__ */ jsx(Fragment$1, { children: childrenArray.map((child, index) => {
				if (isLoading) return /* @__PURE__ */ jsx(Fragment$1, { children: /* @__PURE__ */ jsx(BreadcrumbItemLoader, {}) });
				if (React$1.isValidElement(child)) return React$1.cloneElement(child, { isLast: index === childrenArray.length - 1 });
				return child;
			}) }),
			isSmallScreen && childrenArray.length > 1 && /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2.5 p-1",
				children: [onBack && /* @__PURE__ */ jsx("span", {
					onClick: onBack,
					className: "text-custom-text-200",
					children: "..."
				}), /* @__PURE__ */ jsx(ChevronRightIcon, {
					className: "h-3.5 w-3.5 flex-shrink-0 text-custom-text-400",
					"aria-hidden": "true"
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "flex items-center gap-2.5 p-1",
				children: isLoading ? /* @__PURE__ */ jsx(BreadcrumbItemLoader, {}) : React$1.isValidElement(childrenArray[childrenArray.length - 1]) ? React$1.cloneElement(childrenArray[childrenArray.length - 1], { isLast: true }) : childrenArray[childrenArray.length - 1]
			})] }),
			isSmallScreen && childrenArray.length === 1 && childrenArray
		]
	});
}
function BreadcrumbItem(props) {
	const { component, showSeparator = true, isLast = false } = props;
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-0.5 h-6",
		children: [component, showSeparator && !isLast && /* @__PURE__ */ jsx(BreadcrumbSeparator, {})]
	});
}
function BreadcrumbIcon(props) {
	const { children, className } = props;
	return /* @__PURE__ */ jsx("div", {
		className: cn("flex size-4 items-center justify-start overflow-hidden", className),
		children
	});
}
function BreadcrumbLabel(props) {
	const { children, className } = props;
	return /* @__PURE__ */ jsx("div", {
		className: cn("relative line-clamp-1 block max-w-[150px] overflow-hidden truncate", className),
		children
	});
}
function BreadcrumbSeparator(props) {
	const { className, containerClassName, iconClassName, showDivider = false } = props;
	return /* @__PURE__ */ jsxs("div", {
		className: cn("relative flex items-center justify-center h-full px-1.5 py-1", className),
		children: [showDivider && /* @__PURE__ */ jsx("span", { className: "absolute -left-0.5 top-0 h-full w-[1.8px] bg-custom-background-100" }), /* @__PURE__ */ jsx("div", {
			className: cn("flex items-center justify-center flex-shrink-0 rounded text-custom-text-400 transition-all", containerClassName),
			children: /* @__PURE__ */ jsx(ChevronRightIcon, { className: cn("h-3.5 w-3.5 flex-shrink-0", iconClassName) })
		})]
	});
}
function BreadcrumbItemWrapper(props) {
	const { label, disableTooltip = false, children, className, type = "link", isLast = false } = props;
	return /* @__PURE__ */ jsx(Tooltip$1, {
		tooltipContent: label,
		position: "bottom",
		disabled: !label || label === "" || disableTooltip,
		children: /* @__PURE__ */ jsx("div", {
			className: cn("group h-full flex items-center gap-2 rounded px-1.5 py-1 text-sm font-medium text-custom-text-300 cursor-default", { "hover:text-custom-text-100 hover:bg-custom-background-90 cursor-pointer": type === "link" && !isLast }, className),
			children
		})
	});
}
Breadcrumbs.Item = BreadcrumbItem;
Breadcrumbs.Icon = BreadcrumbIcon;
Breadcrumbs.Label = BreadcrumbLabel;
Breadcrumbs.Separator = BreadcrumbSeparator;
Breadcrumbs.ItemWrapper = BreadcrumbItemWrapper;

//#endregion
//#region src/hooks/use-platform-os.ts
const usePlatformOS = () => {
	const userAgent = window.navigator.userAgent;
	return { isMobile: /iPhone|iPad|iPod|Android/i.test(userAgent) };
};

//#endregion
//#region src/dropdowns/context-menu/root.tsx
function Portal({ children, container }) {
	const [mounted, setMounted] = React.useState(false);
	React.useEffect(() => {
		setMounted(true);
		return () => setMounted(false);
	}, []);
	if (!mounted) return null;
	const targetContainer = container || document.body;
	return ReactDOM.createPortal(children, targetContainer);
}
const ContextMenuContext = React.createContext(null);
function ContextMenuWithoutPortal(props) {
	const { parentRef, items, portalContainer } = props;
	const [isOpen, setIsOpen] = useState(false);
	const [position, setPosition] = useState({
		x: 0,
		y: 0
	});
	const [activeItemIndex, setActiveItemIndex] = useState(0);
	const contextMenuRef = useRef(null);
	const submenuClosersRef = useRef(/* @__PURE__ */ new Set());
	const renderedItems = items.filter((item) => item.shouldRender !== false);
	const { isMobile } = usePlatformOS();
	const closeAllSubmenus = React.useCallback(() => {
		submenuClosersRef.current.forEach((closeSubmenu) => closeSubmenu());
	}, []);
	const registerSubmenu = React.useCallback((closeSubmenu) => {
		submenuClosersRef.current.add(closeSubmenu);
		return () => {
			submenuClosersRef.current.delete(closeSubmenu);
		};
	}, []);
	const handleClose = () => {
		closeAllSubmenus();
		setIsOpen(false);
		setActiveItemIndex(0);
	};
	useEffect(() => {
		const parentElement = parentRef.current;
		const contextMenu = contextMenuRef.current;
		if (!parentElement || !contextMenu) return;
		const handleContextMenu = (e) => {
			if (isMobile) return;
			e.preventDefault();
			e.stopPropagation();
			const contextMenuWidth = contextMenu.clientWidth;
			const contextMenuHeight = contextMenu.clientHeight;
			const clickX = e?.pageX || 0;
			const clickY = e?.pageY || 0;
			let top = clickY;
			if (clickY + contextMenuHeight > window.innerHeight) top = clickY - contextMenuHeight;
			let left = clickX;
			if (clickX + contextMenuWidth > window.innerWidth) left = clickX - contextMenuWidth;
			setPosition({
				x: left,
				y: top
			});
			setIsOpen(true);
		};
		const hideContextMenu = (e) => {
			if (isOpen && e.key === "Escape") handleClose();
		};
		parentElement.addEventListener("contextmenu", handleContextMenu);
		window.addEventListener("keydown", hideContextMenu);
		return () => {
			parentElement.removeEventListener("contextmenu", handleContextMenu);
			window.removeEventListener("keydown", hideContextMenu);
		};
	}, [
		contextMenuRef,
		isMobile,
		isOpen,
		parentRef,
		setIsOpen,
		setPosition
	]);
	useEffect(() => {
		const handleKeyDown = (e) => {
			if (!isOpen) return;
			if (e.key === "ArrowDown") {
				e.preventDefault();
				setActiveItemIndex((prev) => (prev + 1) % renderedItems.length);
			}
			if (e.key === "ArrowUp") {
				e.preventDefault();
				setActiveItemIndex((prev) => (prev - 1 + renderedItems.length) % renderedItems.length);
			}
			if (e.key === "Enter") {
				e.preventDefault();
				const item = renderedItems[activeItemIndex];
				if (!item.disabled) {
					renderedItems[activeItemIndex].action();
					if (item.closeOnClick !== false) handleClose();
				}
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [
		activeItemIndex,
		isOpen,
		renderedItems,
		setIsOpen
	]);
	React.useEffect(() => {
		const handleDocumentClick = (event) => {
			const target = event.target;
			const isNestedMenuClick = target.closest("[data-context-submenu=\"true\"]");
			const isMainMenuClick = contextMenuRef.current?.contains(target);
			const isNestedMenuElement = target.hasAttribute("data-context-submenu");
			if (isNestedMenuClick || isMainMenuClick || isNestedMenuElement) return;
			if (isOpen) handleClose();
		};
		if (isOpen) {
			document.addEventListener("mousedown", handleDocumentClick, true);
			return () => {
				document.removeEventListener("mousedown", handleDocumentClick, true);
			};
		}
	}, [isOpen, handleClose]);
	return /* @__PURE__ */ jsx("div", {
		className: cn("fixed h-screen w-screen top-0 left-0 cursor-default z-30 opacity-0 pointer-events-none transition-opacity", { "opacity-100 pointer-events-auto": isOpen }),
		children: /* @__PURE__ */ jsx("div", {
			ref: contextMenuRef,
			className: "fixed border-[0.5px] border-custom-border-300 bg-custom-background-100 shadow-custom-shadow-rg rounded-md px-2 py-2.5 max-h-72 min-w-[12rem] overflow-y-scroll vertical-scrollbar scrollbar-sm",
			style: {
				top: position.y,
				left: position.x
			},
			"data-context-menu": "true",
			children: /* @__PURE__ */ jsx(ContextMenuContext.Provider, {
				value: {
					closeAllSubmenus,
					registerSubmenu,
					portalContainer
				},
				children: renderedItems.map((item, index) => /* @__PURE__ */ jsx(ContextMenuItem, {
					handleActiveItem: () => setActiveItemIndex(index),
					handleClose,
					isActive: index === activeItemIndex,
					item
				}, item.key))
			})
		})
	});
}
function ContextMenu(props) {
	let contextMenu = /* @__PURE__ */ jsx(ContextMenuWithoutPortal, { ...props });
	const portal = document.querySelector("#context-menu-portal");
	if (portal) contextMenu = ReactDOM.createPortal(contextMenu, portal);
	return contextMenu;
}

//#endregion
//#region src/dropdowns/context-menu/item.tsx
function ContextMenuItem(props) {
	const { handleActiveItem, handleClose, isActive, item } = props;
	const [isNestedOpen, setIsNestedOpen] = useState(false);
	const [referenceElement, setReferenceElement] = useState(null);
	const [popperElement, setPopperElement] = useState(null);
	const [activeNestedIndex, setActiveNestedIndex] = useState(0);
	const nestedMenuRef = useRef(null);
	const contextMenuContext = useContext(ContextMenuContext);
	const hasNestedItems = item.nestedMenuItems && item.nestedMenuItems.length > 0;
	const renderedNestedItems = item.nestedMenuItems?.filter((nestedItem) => nestedItem.shouldRender !== false) || [];
	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		placement: "right-start",
		strategy: "fixed",
		modifiers: [
			{
				name: "offset",
				options: { offset: [0, 4] }
			},
			{
				name: "flip",
				options: { fallbackPlacements: [
					"left-start",
					"right-end",
					"left-end",
					"top-start",
					"bottom-start"
				] }
			},
			{
				name: "preventOverflow",
				options: { padding: 8 }
			}
		]
	});
	const closeNestedMenu = React.useCallback(() => {
		setIsNestedOpen(false);
		setActiveNestedIndex(0);
	}, []);
	React.useEffect(() => {
		if (contextMenuContext && hasNestedItems) return contextMenuContext.registerSubmenu(closeNestedMenu);
	}, [
		contextMenuContext,
		hasNestedItems,
		closeNestedMenu
	]);
	const handleItemClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		if (hasNestedItems) {
			if (!isNestedOpen && contextMenuContext) contextMenuContext.closeAllSubmenus();
			setIsNestedOpen(!isNestedOpen);
		} else {
			item.action();
			if (item.closeOnClick !== false) handleClose();
		}
	};
	const handleMouseEnter = () => {
		handleActiveItem();
		if (hasNestedItems) {
			if (contextMenuContext) contextMenuContext.closeAllSubmenus();
			setIsNestedOpen(true);
		}
	};
	const handleNestedItemClick = (nestedItem, e) => {
		if (e) {
			e.preventDefault();
			e.stopPropagation();
		}
		nestedItem.action();
		if (nestedItem.closeOnClick !== false) handleClose();
	};
	React.useEffect(() => {
		const handleKeyDown = (e) => {
			if (!isNestedOpen || !hasNestedItems) return;
			if (e.key === "ArrowDown") {
				e.preventDefault();
				setActiveNestedIndex((prev) => (prev + 1) % renderedNestedItems.length);
			}
			if (e.key === "ArrowUp") {
				e.preventDefault();
				setActiveNestedIndex((prev) => (prev - 1 + renderedNestedItems.length) % renderedNestedItems.length);
			}
			if (e.key === "Enter") {
				e.preventDefault();
				const nestedItem = renderedNestedItems[activeNestedIndex];
				if (!nestedItem.disabled) handleNestedItemClick(nestedItem);
			}
			if (e.key === "ArrowLeft") {
				e.preventDefault();
				closeNestedMenu();
			}
		};
		if (isNestedOpen && nestedMenuRef.current) {
			const menuElement = nestedMenuRef.current;
			menuElement.addEventListener("keydown", handleKeyDown);
			menuElement.setAttribute("tabindex", "-1");
			menuElement.focus();
			return () => {
				menuElement.removeEventListener("keydown", handleKeyDown);
			};
		}
	}, [
		isNestedOpen,
		activeNestedIndex,
		renderedNestedItems,
		hasNestedItems,
		closeNestedMenu
	]);
	if (item.shouldRender === false) return null;
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("button", {
		ref: setReferenceElement,
		type: "button",
		className: cn("w-full flex items-center gap-2 px-1 py-1.5 text-left text-custom-text-200 rounded text-xs select-none", {
			"bg-custom-background-90": isActive,
			"text-custom-text-400": item.disabled
		}, item.className),
		onClick: handleItemClick,
		onMouseEnter: handleMouseEnter,
		disabled: item.disabled,
		children: item.customContent ?? /* @__PURE__ */ jsxs(Fragment$1, { children: [
			item.icon && /* @__PURE__ */ jsx(item.icon, { className: cn("h-3 w-3", item.iconClassName) }),
			/* @__PURE__ */ jsxs("div", {
				className: "flex-1",
				children: [/* @__PURE__ */ jsx("h5", { children: item.title }), item.description && /* @__PURE__ */ jsx("p", {
					className: cn("text-custom-text-300 whitespace-pre-line", { "text-custom-text-400": item.disabled }),
					children: item.description
				})]
			}),
			hasNestedItems && /* @__PURE__ */ jsx(ChevronRightIcon, { className: "h-3 w-3 flex-shrink-0" })
		] })
	}), hasNestedItems && isNestedOpen && /* @__PURE__ */ jsx(Portal, {
		container: contextMenuContext?.portalContainer,
		children: /* @__PURE__ */ jsx("div", {
			ref: setPopperElement,
			style: styles.popper,
			...attributes.popper,
			className: cn("fixed z-[35] min-w-[12rem] overflow-hidden rounded-md border-[0.5px] border-custom-border-300 bg-custom-background-100 px-2 py-2.5 text-xs shadow-custom-shadow-lg", "ring-1 ring-black ring-opacity-5"),
			"data-context-submenu": "true",
			children: /* @__PURE__ */ jsx("div", {
				ref: nestedMenuRef,
				className: "max-h-72 overflow-y-scroll vertical-scrollbar scrollbar-sm",
				children: renderedNestedItems.map((nestedItem, index) => /* @__PURE__ */ jsx("button", {
					type: "button",
					className: cn("w-full flex items-center gap-2 px-1 py-1.5 text-left text-custom-text-200 rounded text-xs select-none", {
						"bg-custom-background-90": index === activeNestedIndex,
						"text-custom-text-400": nestedItem.disabled
					}, nestedItem.className),
					onClick: (e) => {
						e.preventDefault();
						e.stopPropagation();
						handleNestedItemClick(nestedItem, e);
					},
					onMouseEnter: () => setActiveNestedIndex(index),
					disabled: nestedItem.disabled,
					"data-context-submenu": "true",
					children: nestedItem.customContent ?? /* @__PURE__ */ jsxs(Fragment$1, { children: [nestedItem.icon && /* @__PURE__ */ jsx(nestedItem.icon, { className: cn("h-3 w-3", nestedItem.iconClassName) }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h5", { children: nestedItem.title }), nestedItem.description && /* @__PURE__ */ jsx("p", {
						className: cn("text-custom-text-300 whitespace-pre-line", { "text-custom-text-400": nestedItem.disabled }),
						children: nestedItem.description
					})] })] })
				}, nestedItem.key))
			})
		})
	})] });
}

//#endregion
//#region src/hooks/use-dropdown-key-down.tsx
const useDropdownKeyDown = (onOpen, onClose, isOpen, selectActiveItem) => {
	return useCallback((event) => {
		if (event.key === "Enter" && !event.nativeEvent.isComposing) if (!isOpen) {
			event.stopPropagation();
			onOpen();
		} else selectActiveItem && selectActiveItem();
		else if (event.key === "Escape" && isOpen) {
			event.stopPropagation();
			onClose();
		}
	}, [
		isOpen,
		onOpen,
		onClose
	]);
};

//#endregion
//#region src/dropdowns/custom-menu.tsx
function Portal$1({ children, container, asChild = false }) {
	const [mounted, setMounted] = React$1.useState(false);
	React$1.useEffect(() => {
		setMounted(true);
		return () => setMounted(false);
	}, []);
	if (!mounted) return null;
	const targetContainer = container || document.body;
	if (asChild) return ReactDOM.createPortal(children, targetContainer);
	return ReactDOM.createPortal(/* @__PURE__ */ jsx("div", {
		"data-radix-portal": "",
		children
	}), targetContainer);
}
const MenuContext = React$1.createContext(null);
function CustomMenu(props) {
	const { ariaLabel, buttonClassName = "", customButtonClassName = "", customButtonTabIndex = 0, placement, children, className = "", customButton, disabled = false, ellipsis = false, label, maxHeight = "md", noBorder = false, noChevron = false, optionsClassName = "", menuItemsClassName = "", verticalEllipsis = false, portalElement, menuButtonOnClick, onMenuClose, tabIndex, closeOnSelect, openOnHover = false, useCaptureForOutsideClick = false } = props;
	const [referenceElement, setReferenceElement] = React$1.useState(null);
	const [popperElement, setPopperElement] = React$1.useState(null);
	const [isOpen, setIsOpen] = React$1.useState(false);
	const dropdownRef = React$1.useRef(null);
	const submenuClosersRef = React$1.useRef(/* @__PURE__ */ new Set());
	const { styles, attributes } = usePopper(referenceElement, popperElement, { placement: placement ?? "auto" });
	const closeAllSubmenus = React$1.useCallback(() => {
		submenuClosersRef.current.forEach((closeSubmenu) => closeSubmenu());
	}, []);
	const registerSubmenu = React$1.useCallback((closeSubmenu) => {
		submenuClosersRef.current.add(closeSubmenu);
		return () => {
			submenuClosersRef.current.delete(closeSubmenu);
		};
	}, []);
	const openDropdown = () => {
		setIsOpen(true);
		if (referenceElement) referenceElement.focus();
	};
	const closeDropdown = React$1.useCallback(() => {
		if (isOpen) {
			closeAllSubmenus();
			onMenuClose?.();
		}
		setIsOpen(false);
	}, [
		isOpen,
		closeAllSubmenus,
		onMenuClose
	]);
	const selectActiveItem = () => {
		(dropdownRef.current?.querySelector(`[data-headlessui-state="active"] button`))?.click();
	};
	const handleKeyDown = useDropdownKeyDown(openDropdown, closeDropdown, isOpen, selectActiveItem);
	const handleOnClick = () => {
		if (closeOnSelect) closeDropdown();
	};
	const handleMenuButtonClick = (e) => {
		e.stopPropagation();
		e.preventDefault();
		if (isOpen) closeDropdown();
		else openDropdown();
		if (menuButtonOnClick) menuButtonOnClick();
	};
	const handleMouseEnter = () => {
		if (openOnHover) openDropdown();
	};
	const handleMouseLeave = () => {
		if (openOnHover && isOpen) setTimeout(() => {
			if (isOpen) closeDropdown();
		}, 150);
	};
	useOutsideClickDetector(dropdownRef, closeDropdown, useCaptureForOutsideClick);
	React$1.useEffect(() => {
		const handleDocumentClick = (event) => {
			const target = event.target;
			const isSubmenuClick = target.closest("[data-prevent-outside-click=\"true\"]");
			const isMainMenuClick = dropdownRef.current?.contains(target);
			if (isSubmenuClick || isMainMenuClick) return;
			if (isOpen) closeDropdown();
		};
		if (isOpen) {
			document.addEventListener("mousedown", handleDocumentClick, useCaptureForOutsideClick);
			return () => {
				document.removeEventListener("mousedown", handleDocumentClick, useCaptureForOutsideClick);
			};
		}
	}, [
		isOpen,
		closeDropdown,
		useCaptureForOutsideClick
	]);
	let menuItems = /* @__PURE__ */ jsx(Menu$1.Items, {
		"data-prevent-outside-click": !!portalElement,
		className: cn("fixed z-30 translate-y-0", menuItemsClassName),
		static: true,
		children: /* @__PURE__ */ jsx("div", {
			className: cn("my-1 overflow-y-scroll rounded-md border-[0.5px] border-custom-border-300 bg-custom-background-100 px-2 py-2.5 text-xs shadow-custom-shadow-rg focus:outline-none min-w-[12rem] whitespace-nowrap", {
				"max-h-60": maxHeight === "lg",
				"max-h-48": maxHeight === "md",
				"max-h-36": maxHeight === "rg",
				"max-h-28": maxHeight === "sm"
			}, optionsClassName),
			ref: setPopperElement,
			style: styles.popper,
			...attributes.popper,
			children: /* @__PURE__ */ jsx(MenuContext.Provider, {
				value: {
					closeAllSubmenus,
					registerSubmenu
				},
				children
			})
		})
	});
	if (portalElement) menuItems = ReactDOM.createPortal(menuItems, portalElement);
	return /* @__PURE__ */ jsx(Menu$1, {
		as: "div",
		ref: dropdownRef,
		tabIndex,
		className: cn("relative w-min text-left", className),
		onKeyDownCapture: handleKeyDown,
		onClick: (e) => {
			e.stopPropagation();
			e.preventDefault();
			handleOnClick();
		},
		onMouseEnter: handleMouseEnter,
		onMouseLeave: handleMouseLeave,
		"data-main-menu": "true",
		children: ({ open }) => /* @__PURE__ */ jsxs(Fragment$1, { children: [customButton ? /* @__PURE__ */ jsx(Menu$1.Button, {
			as: React$1.Fragment,
			children: /* @__PURE__ */ jsx("button", {
				ref: setReferenceElement,
				type: "button",
				onClick: handleMenuButtonClick,
				className: customButtonClassName,
				tabIndex: customButtonTabIndex,
				disabled,
				"aria-label": ariaLabel,
				children: customButton
			})
		}) : /* @__PURE__ */ jsx(Fragment$1, { children: ellipsis || verticalEllipsis ? /* @__PURE__ */ jsx(Menu$1.Button, {
			as: React$1.Fragment,
			children: /* @__PURE__ */ jsx("button", {
				ref: setReferenceElement,
				type: "button",
				onClick: handleMenuButtonClick,
				disabled,
				className: `relative grid place-items-center rounded p-1 text-custom-text-200 outline-none hover:text-custom-text-100 ${disabled ? "cursor-not-allowed" : "cursor-pointer hover:bg-custom-background-80"} ${buttonClassName}`,
				tabIndex: customButtonTabIndex,
				"aria-label": ariaLabel,
				children: /* @__PURE__ */ jsx(MoreHorizontal, { className: `h-3.5 w-3.5 ${verticalEllipsis ? "rotate-90" : ""}` })
			})
		}) : /* @__PURE__ */ jsx(Menu$1.Button, {
			as: React$1.Fragment,
			children: /* @__PURE__ */ jsxs("button", {
				ref: setReferenceElement,
				type: "button",
				className: `flex items-center justify-between gap-1 whitespace-nowrap rounded-md px-2.5 py-1 text-xs duration-300 ${open ? "bg-custom-background-90 text-custom-text-100" : "text-custom-text-200"} ${noBorder ? "" : "border border-custom-border-300 shadow-sm focus:outline-none"} ${disabled ? "cursor-not-allowed text-custom-text-200" : "cursor-pointer hover:bg-custom-background-80"} ${buttonClassName}`,
				onClick: handleMenuButtonClick,
				tabIndex: customButtonTabIndex,
				disabled,
				"aria-label": ariaLabel,
				children: [label, !noChevron && /* @__PURE__ */ jsx(ChevronDownIcon, { className: "h-3.5 w-3.5" })]
			})
		}) }), isOpen && menuItems] })
	});
}
const SubMenuContext = React$1.createContext(null);
const useSubMenu = () => React$1.useContext(SubMenuContext);
function SubMenu(props) {
	const { children, trigger, disabled = false, className = "", contentClassName = "", placement = "right-start" } = props;
	const [isOpen, setIsOpen] = React$1.useState(false);
	const [referenceElement, setReferenceElement] = React$1.useState(null);
	const [popperElement, setPopperElement] = React$1.useState(null);
	const submenuRef = React$1.useRef(null);
	const menuContext = React$1.useContext(MenuContext);
	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		placement,
		strategy: "fixed",
		modifiers: [
			{
				name: "offset",
				options: { offset: [0, 4] }
			},
			{
				name: "flip",
				options: { fallbackPlacements: [
					"left-start",
					"right-end",
					"left-end",
					"top-start",
					"bottom-start"
				] }
			},
			{
				name: "preventOverflow",
				options: { padding: 8 }
			}
		]
	});
	const closeSubmenu = React$1.useCallback(() => {
		setIsOpen(false);
	}, []);
	React$1.useEffect(() => {
		if (menuContext) return menuContext.registerSubmenu(closeSubmenu);
	}, [menuContext, closeSubmenu]);
	const toggleSubmenu = () => {
		if (!disabled) {
			if (!isOpen && menuContext) menuContext.closeAllSubmenus();
			setIsOpen(!isOpen);
		}
	};
	const handleClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		toggleSubmenu();
	};
	React$1.useEffect(() => {
		const handleMenuItemClick = (e) => {
			const target = e.target;
			if (target.closest("[role=\"menuitem\"]") && !submenuRef.current?.contains(target)) closeSubmenu();
		};
		document.addEventListener("click", handleMenuItemClick);
		return () => {
			document.removeEventListener("click", handleMenuItemClick);
		};
	}, [closeSubmenu]);
	return /* @__PURE__ */ jsxs("div", {
		ref: submenuRef,
		className: cn("relative", className),
		children: [/* @__PURE__ */ jsx("span", {
			ref: setReferenceElement,
			className: "w-full",
			children: /* @__PURE__ */ jsx(Menu$1.Item, {
				as: "div",
				disabled,
				children: ({ active }) => /* @__PURE__ */ jsxs("div", {
					className: cn("w-full select-none rounded px-1 py-1.5 text-left text-custom-text-200 flex items-center justify-between cursor-pointer", {
						"bg-custom-background-80": active && !disabled,
						"text-custom-text-400": disabled,
						"cursor-not-allowed": disabled
					}),
					onClick: handleClick,
					children: [/* @__PURE__ */ jsx("span", {
						className: "flex-1",
						children: trigger
					}), /* @__PURE__ */ jsx(ChevronRightIcon, { className: "h-3.5 w-3.5 flex-shrink-0" })]
				})
			})
		}), isOpen && /* @__PURE__ */ jsx(Portal$1, { children: /* @__PURE__ */ jsx("div", {
			ref: setPopperElement,
			style: styles.popper,
			...attributes.popper,
			className: cn("fixed z-30 min-w-[12rem] overflow-hidden rounded-md border-[0.5px] border-custom-border-300 bg-custom-background-100 p-1 text-xs shadow-custom-shadow-lg", "ring-1 ring-black ring-opacity-5", contentClassName),
			"data-prevent-outside-click": "true",
			onMouseEnter: () => {
				const mainMenuElement = document.querySelector("[data-main-menu=\"true\"]");
				if (mainMenuElement) {
					const mouseEnterEvent = new MouseEvent("mouseenter", { bubbles: true });
					mainMenuElement.dispatchEvent(mouseEnterEvent);
				}
			},
			onMouseLeave: () => {
				const mainMenuElement = document.querySelector("[data-main-menu=\"true\"]");
				if (mainMenuElement) {
					const mouseLeaveEvent = new MouseEvent("mouseleave", { bubbles: true });
					mainMenuElement.dispatchEvent(mouseLeaveEvent);
				}
			},
			children: /* @__PURE__ */ jsx(SubMenuContext.Provider, {
				value: { closeSubmenu },
				children
			})
		}) })]
	});
}
function MenuItem(props) {
	const { children, disabled = false, onClick, className } = props;
	const submenuContext = useSubMenu();
	return /* @__PURE__ */ jsx(Menu$1.Item, {
		as: "div",
		disabled,
		children: ({ active, close }) => /* @__PURE__ */ jsx("button", {
			type: "button",
			className: cn("w-full select-none truncate rounded px-1 py-1.5 text-left text-custom-text-200", {
				"bg-custom-background-80": active && !disabled,
				"text-custom-text-400": disabled
			}, className),
			onClick: (e) => {
				close();
				onClick?.(e);
				submenuContext?.closeSubmenu();
			},
			disabled,
			children
		})
	});
}
function SubMenuTrigger(props) {
	const { children, disabled = false, className } = props;
	return /* @__PURE__ */ jsx(Menu$1.Item, {
		as: "div",
		disabled,
		children: ({ active }) => /* @__PURE__ */ jsxs("div", {
			className: cn("w-full select-none rounded px-1 py-1.5 text-left text-custom-text-200 flex items-center justify-between", {
				"bg-custom-background-80": active && !disabled,
				"text-custom-text-400": disabled,
				"cursor-pointer": !disabled,
				"cursor-not-allowed": disabled
			}, className),
			children: [/* @__PURE__ */ jsx("span", {
				className: "flex-1",
				children
			}), /* @__PURE__ */ jsx(ChevronRightIcon, { className: "h-3.5 w-3.5 flex-shrink-0" })]
		})
	});
}
function SubMenuContent(props) {
	const { children, className } = props;
	return /* @__PURE__ */ jsx("div", {
		className: cn("z-[15] min-w-[12rem] overflow-hidden rounded-md border border-custom-border-300 bg-custom-background-100 p-1 text-xs shadow-custom-shadow-rg", className),
		children
	});
}
CustomMenu.Portal = Portal$1;
CustomMenu.MenuItem = MenuItem;
CustomMenu.SubMenu = SubMenu;
CustomMenu.SubMenuTrigger = SubMenuTrigger;
CustomMenu.SubMenuContent = SubMenuContent;

//#endregion
//#region src/dropdowns/custom-select.tsx
const DropdownContext = createContext(() => {});
function CustomSelect(props) {
	const { customButtonClassName = "", buttonClassName = "", placement, children, className = "", customButton, disabled = false, input = false, label, maxHeight = "md", noChevron = false, onChange, optionsClassName = "", value, tabIndex } = props;
	const [referenceElement, setReferenceElement] = useState(null);
	const [popperElement, setPopperElement] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);
	const { styles, attributes } = usePopper(referenceElement, popperElement, { placement: placement ?? "bottom-start" });
	const openDropdown = useCallback(() => {
		setIsOpen(true);
		if (referenceElement) referenceElement.focus();
	}, [referenceElement]);
	const closeDropdown = useCallback(() => setIsOpen(false), []);
	const handleKeyDown = useDropdownKeyDown(openDropdown, closeDropdown, isOpen);
	useOutsideClickDetector(dropdownRef, closeDropdown);
	const toggleDropdown = useCallback(() => {
		if (isOpen) closeDropdown();
		else openDropdown();
	}, [
		closeDropdown,
		isOpen,
		openDropdown
	]);
	return /* @__PURE__ */ jsx(DropdownContext.Provider, {
		value: closeDropdown,
		children: /* @__PURE__ */ jsxs(Combobox, {
			as: "div",
			ref: dropdownRef,
			tabIndex,
			value,
			onChange: (val) => {
				onChange?.(val);
				closeDropdown();
			},
			className: cn("relative flex-shrink-0 text-left", className),
			onKeyDown: handleKeyDown,
			disabled,
			children: [/* @__PURE__ */ jsx(Fragment$1, { children: customButton ? /* @__PURE__ */ jsx(Combobox.Button, {
				as: React.Fragment,
				children: /* @__PURE__ */ jsx("button", {
					ref: setReferenceElement,
					type: "button",
					className: `flex items-center justify-between gap-1 text-xs rounded ${disabled ? "cursor-not-allowed text-custom-text-200" : "cursor-pointer hover:bg-custom-background-80"} ${customButtonClassName}`,
					onClick: toggleDropdown,
					children: customButton
				})
			}) : /* @__PURE__ */ jsx(Combobox.Button, {
				as: React.Fragment,
				children: /* @__PURE__ */ jsxs("button", {
					ref: setReferenceElement,
					type: "button",
					className: cn("flex w-full items-center justify-between gap-1 rounded border-[0.5px] border-custom-border-300", {
						"px-3 py-2 text-sm": input,
						"px-2 py-1 text-xs": !input,
						"cursor-not-allowed text-custom-text-200": disabled,
						"cursor-pointer hover:bg-custom-background-80": !disabled
					}, buttonClassName),
					onClick: toggleDropdown,
					children: [label, !noChevron && !disabled && /* @__PURE__ */ jsx(ChevronDownIcon, {
						className: "h-3 w-3",
						"aria-hidden": "true"
					})]
				})
			}) }), isOpen && createPortal(/* @__PURE__ */ jsx(Combobox.Options, {
				"data-prevent-outside-click": true,
				children: /* @__PURE__ */ jsx("div", {
					className: cn("my-1 overflow-y-scroll rounded-md border-[0.5px] border-custom-border-300 bg-custom-background-100 px-2 py-2.5 text-xs shadow-custom-shadow-rg focus:outline-none min-w-48 whitespace-nowrap z-30", optionsClassName),
					ref: setPopperElement,
					style: styles.popper,
					...attributes.popper,
					children: /* @__PURE__ */ jsx("div", {
						className: cn("space-y-1 overflow-y-scroll", {
							"max-h-60": maxHeight === "lg",
							"max-h-48": maxHeight === "md",
							"max-h-36": maxHeight === "rg",
							"max-h-28": maxHeight === "sm"
						}),
						children
					})
				})
			}), document.body)]
		})
	});
}
function Option(props) {
	const { children, value, className } = props;
	const closeDropdown = useContext(DropdownContext);
	const handleMouseDown = useCallback(() => {
		requestAnimationFrame(() => closeDropdown());
	}, [closeDropdown]);
	return /* @__PURE__ */ jsx(Combobox.Option, {
		value,
		className: ({ active }) => cn("cursor-pointer select-none truncate rounded px-1 py-1.5 text-custom-text-200 flex items-center justify-between gap-2", { "bg-custom-background-80": active }, className),
		children: ({ selected }) => /* @__PURE__ */ jsxs("div", {
			onMouseDown: handleMouseDown,
			className: "flex items-center justify-between gap-2 w-full",
			children: [children, selected && /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5 flex-shrink-0" })]
		})
	});
}
CustomSelect.Option = Option;

//#endregion
//#region src/dropdowns/custom-search-select.tsx
function CustomSearchSelect(props) {
	const { customButtonClassName = "", buttonClassName = "", className = "", chevronClassName = "", customButton, placement, disabled = false, footerOption, input = false, label, maxHeight = "md", multiple = false, noChevron = false, onChange, options, onOpen, onClose, optionsClassName = "", value, tabIndex, noResultsMessage = "No matches found", defaultOpen = false } = props;
	const [query, setQuery] = useState("");
	const [referenceElement, setReferenceElement] = useState(null);
	const [popperElement, setPopperElement] = useState(null);
	const [isOpen, setIsOpen] = useState(defaultOpen);
	const dropdownRef = useRef(null);
	const { styles, attributes } = usePopper(referenceElement, popperElement, { placement: placement ?? "bottom-start" });
	const filteredOptions = query === "" ? options : options?.filter((option) => option.query.toLowerCase().includes(query.toLowerCase()));
	const comboboxProps = {
		value,
		onChange,
		disabled
	};
	if (multiple) comboboxProps.multiple = true;
	const openDropdown = () => {
		setIsOpen(true);
		if (referenceElement) referenceElement.focus();
		if (onOpen) onOpen();
	};
	const closeDropdown = () => {
		setIsOpen(false);
		onClose && onClose();
	};
	const handleKeyDown = useDropdownKeyDown(openDropdown, closeDropdown, isOpen);
	useOutsideClickDetector(dropdownRef, closeDropdown);
	const toggleDropdown = () => {
		if (isOpen) closeDropdown();
		else openDropdown();
	};
	return /* @__PURE__ */ jsx(Combobox, {
		as: "div",
		ref: dropdownRef,
		tabIndex,
		className: cn("relative flex-shrink-0 text-left", className),
		onKeyDown: handleKeyDown,
		...comboboxProps,
		children: ({ open }) => {
			if (open && onOpen) onOpen();
			return /* @__PURE__ */ jsxs(Fragment$1, { children: [customButton ? /* @__PURE__ */ jsx(Combobox.Button, {
				as: React.Fragment,
				children: /* @__PURE__ */ jsx("button", {
					ref: setReferenceElement,
					type: "button",
					className: cn("flex w-full items-center justify-between gap-1 text-xs", {
						"cursor-not-allowed text-custom-text-200": disabled,
						"cursor-pointer hover:bg-custom-background-80": !disabled
					}, customButtonClassName),
					onClick: toggleDropdown,
					children: customButton
				})
			}) : /* @__PURE__ */ jsx(Combobox.Button, {
				as: React.Fragment,
				children: /* @__PURE__ */ jsxs("button", {
					ref: setReferenceElement,
					type: "button",
					className: cn("flex w-full items-center justify-between gap-1 rounded border-[0.5px] border-custom-border-300", {
						"px-3 py-2 text-sm": input,
						"px-2 py-1 text-xs": !input,
						"cursor-not-allowed text-custom-text-200": disabled,
						"cursor-pointer hover:bg-custom-background-80": !disabled
					}, buttonClassName),
					onClick: toggleDropdown,
					children: [label, !noChevron && !disabled && /* @__PURE__ */ jsx(ChevronDownIcon, {
						className: cn("h-3 w-3 flex-shrink-0", chevronClassName),
						"aria-hidden": "true"
					})]
				})
			}), isOpen && createPortal(/* @__PURE__ */ jsx(Combobox.Options, {
				"data-prevent-outside-click": true,
				static: true,
				children: /* @__PURE__ */ jsxs("div", {
					className: cn("my-1 overflow-y-scroll rounded-md border-[0.5px] border-custom-border-300 bg-custom-background-100 py-2.5 text-xs shadow-custom-shadow-rg focus:outline-none min-w-48 whitespace-nowrap z-30", optionsClassName),
					ref: setPopperElement,
					style: styles.popper,
					...attributes.popper,
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-1.5 rounded border border-custom-border-100 bg-custom-background-90 px-2 mx-2",
							children: [/* @__PURE__ */ jsx(Search, {
								className: "h-3.5 w-3.5 text-custom-text-400",
								strokeWidth: 1.5
							}), /* @__PURE__ */ jsx(Combobox.Input, {
								className: "w-full bg-transparent py-1 text-xs text-custom-text-200 placeholder:text-custom-text-400 focus:outline-none",
								value: query,
								onChange: (e) => setQuery(e.target.value),
								placeholder: "Search",
								displayValue: (assigned) => assigned?.name
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: cn("mt-2 px-2 space-y-1 overflow-y-scroll vertical-scrollbar scrollbar-xs", {
								"max-h-96": maxHeight === "2xl",
								"max-h-80": maxHeight === "xl",
								"max-h-60": maxHeight === "lg",
								"max-h-48": maxHeight === "md",
								"max-h-36": maxHeight === "rg",
								"max-h-28": maxHeight === "sm"
							}),
							children: filteredOptions ? filteredOptions.length > 0 ? filteredOptions.map((option) => /* @__PURE__ */ jsx(Combobox.Option, {
								value: option.value,
								className: ({ active }) => cn("w-full truncate flex items-center justify-between gap-2 rounded px-1 py-1.5 cursor-pointer select-none", {
									"bg-custom-background-80": active,
									"text-custom-text-400 opacity-60 cursor-not-allowed": option.disabled
								}),
								onClick: () => {
									if (!multiple) closeDropdown();
								},
								disabled: option.disabled,
								children: ({ selected }) => /* @__PURE__ */ jsxs(Fragment$1, { children: [
									/* @__PURE__ */ jsx("span", {
										className: "flex-grow truncate",
										children: option.content
									}),
									selected && /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5 flex-shrink-0" }),
									option.tooltip && /* @__PURE__ */ jsx(Fragment$1, { children: typeof option.tooltip === "string" ? /* @__PURE__ */ jsx(Tooltip$1, {
										tooltipContent: option.tooltip,
										children: /* @__PURE__ */ jsx(Info, { className: "h-3.5 w-3.5 flex-shrink-0 cursor-pointer text-custom-text-200" })
									}) : option.tooltip })
								] })
							}, option.value)) : /* @__PURE__ */ jsx("p", {
								className: "text-custom-text-400 italic py-1 px-1.5",
								children: noResultsMessage
							}) : /* @__PURE__ */ jsx("p", {
								className: "text-custom-text-400 italic py-1 px-1.5",
								children: "Loading..."
							})
						}),
						footerOption
					]
				})
			}), document.body)] });
		}
	});
}

//#endregion
//#region src/dropdowns/combo-box.tsx
const ComboDropDown = forwardRef(function ComboDropDown$1(props, ref) {
	const { button, renderByDefault = true, children,...rest } = props;
	const dropDownButtonRef = useRef(null);
	const [shouldRender, setShouldRender] = useState(renderByDefault);
	const onHover = () => {
		setShouldRender(true);
	};
	useEffect(() => {
		const element = dropDownButtonRef.current;
		if (!element) return;
		element.addEventListener("mouseenter", onHover);
		return () => {
			element?.removeEventListener("mouseenter", onHover);
		};
	}, [dropDownButtonRef, shouldRender]);
	if (!shouldRender) return /* @__PURE__ */ jsx("div", {
		ref: dropDownButtonRef,
		className: "h-full flex items-center",
		children: button
	});
	return /* @__PURE__ */ jsxs(Combobox, {
		...rest,
		ref,
		children: [/* @__PURE__ */ jsx(Combobox.Button, {
			as: Fragment,
			children: button
		}), children]
	});
});
const ComboOptions = Combobox.Options;
const ComboOption = Combobox.Option;
const ComboInput = Combobox.Input;
ComboDropDown.displayName = "ComboDropDown";

//#endregion
//#region src/breadcrumbs/navigation-dropdown.tsx
function BreadcrumbNavigationDropdown(props) {
	const { selectedItemKey, navigationItems, navigationDisabled = false, handleOnClick, isLast = false } = props;
	const [isOpen, setIsOpen] = React$1.useState(false);
	const selectedItem = navigationItems.find((item) => item.key === selectedItemKey);
	const selectedItemIcon = selectedItem?.icon ? /* @__PURE__ */ jsx(selectedItem.icon, { className: cn("size-4", selectedItem.iconClassName) }) : void 0;
	if (!selectedItem) return null;
	function NavigationButton() {
		return /* @__PURE__ */ jsx(Tooltip$1, {
			tooltipContent: selectedItem?.title,
			position: "bottom",
			disabled: isOpen,
			children: /* @__PURE__ */ jsxs("button", {
				onClick: (e) => {
					if (!isLast) {
						e.preventDefault();
						e.stopPropagation();
						handleOnClick?.();
					}
				},
				className: cn("group h-full flex items-center gap-2 px-1.5 py-1 text-sm font-medium text-custom-text-300 cursor-pointer rounded rounded-r-none", { "hover:bg-custom-background-80 hover:text-custom-text-100": !isLast }),
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex @4xl:hidden text-custom-text-300",
					children: "..."
				}), /* @__PURE__ */ jsxs("div", {
					className: "hidden @4xl:flex gap-2",
					children: [selectedItemIcon && /* @__PURE__ */ jsx(Breadcrumbs.Icon, { children: selectedItemIcon }), /* @__PURE__ */ jsx(Breadcrumbs.Label, { children: selectedItem?.title })]
				})]
			})
		});
	}
	if (navigationDisabled) return /* @__PURE__ */ jsx(NavigationButton, {});
	return /* @__PURE__ */ jsx(CustomMenu, {
		customButton: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(NavigationButton, {}), /* @__PURE__ */ jsx(Breadcrumbs.Separator, {
			className: cn("rounded-r", {
				"bg-custom-background-80": isOpen && !isLast,
				"hover:bg-custom-background-80": !isLast
			}),
			containerClassName: "p-0",
			iconClassName: cn("group-hover:rotate-90 hover:text-custom-text-100", {
				"text-custom-text-100": isOpen,
				"rotate-90": isOpen || isLast
			}),
			showDivider: !isLast
		})] }),
		placement: "bottom-start",
		className: "h-full rounded",
		customButtonClassName: cn("group flex items-center gap-0.5 rounded hover:bg-custom-background-90 outline-none cursor-pointer h-full rounded", { "bg-custom-background-90": isOpen }),
		closeOnSelect: true,
		menuButtonOnClick: () => {
			setIsOpen(!isOpen);
		},
		onMenuClose: () => {
			setIsOpen(false);
		},
		children: navigationItems.map((item) => {
			if (item.shouldRender === false) return null;
			return /* @__PURE__ */ jsxs(CustomMenu.MenuItem, {
				onClick: (e) => {
					e.preventDefault();
					e.stopPropagation();
					if (item.key === selectedItemKey) return;
					item.action();
				},
				className: cn("flex items-center gap-2", { "text-custom-text-400": item.disabled }, item.className),
				disabled: item.disabled,
				children: [
					item.icon && /* @__PURE__ */ jsx(item.icon, { className: cn("size-4 flex-shrink-0", item.iconClassName) }),
					/* @__PURE__ */ jsxs("div", {
						className: "w-full",
						children: [/* @__PURE__ */ jsx("h5", { children: item.title }), item.description && /* @__PURE__ */ jsx("p", {
							className: cn("text-custom-text-300 whitespace-pre-line", { "text-custom-text-400": item.disabled }),
							children: item.description
						})]
					}),
					item.key === selectedItemKey && /* @__PURE__ */ jsx(CheckIcon, { className: "flex-shrink-0 size-3.5" })
				]
			}, item.key);
		})
	});
}

//#endregion
//#region src/breadcrumbs/navigation-search-dropdown.tsx
function BreadcrumbNavigationSearchDropdown(props) {
	const { icon, title, selectedItem, navigationItems, onChange, navigationDisabled = false, isLast = false, handleOnClick, shouldTruncate = false } = props;
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	return /* @__PURE__ */ jsx(CustomSearchSelect, {
		onOpen: () => {
			setIsDropdownOpen(true);
		},
		onClose: () => {
			setIsDropdownOpen(false);
		},
		options: navigationItems,
		value: selectedItem,
		onChange: (value) => {
			if (value !== selectedItem) onChange?.(value);
		},
		customButton: /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Tooltip$1, {
			tooltipContent: title,
			position: "bottom",
			children: /* @__PURE__ */ jsxs("button", {
				onClick: (e) => {
					if (!isLast) {
						e.preventDefault();
						e.stopPropagation();
						handleOnClick?.();
					}
				},
				className: cn("group h-full flex items-center gap-2 px-1.5 py-1 text-sm font-medium text-custom-text-300 cursor-pointer rounded rounded-r-none", { "hover:bg-custom-background-80 hover:text-custom-text-100": !isLast }),
				children: [shouldTruncate && /* @__PURE__ */ jsx("div", {
					className: "flex @4xl:hidden text-custom-text-300",
					children: "..."
				}), /* @__PURE__ */ jsxs("div", {
					className: cn("flex gap-2", { "hidden @4xl:flex gap-2": shouldTruncate }),
					children: [icon && /* @__PURE__ */ jsx(Breadcrumbs.Icon, { children: icon }), /* @__PURE__ */ jsx(Breadcrumbs.Label, { children: title })]
				})]
			})
		}), /* @__PURE__ */ jsx(Breadcrumbs.Separator, {
			className: cn("rounded-r", {
				"bg-custom-background-80": isDropdownOpen && !isLast,
				"hover:bg-custom-background-80": !isLast
			}),
			containerClassName: "p-0",
			iconClassName: cn("group-hover:rotate-90 hover:text-custom-text-100", {
				"text-custom-text-100": isDropdownOpen,
				"rotate-90": isDropdownOpen || isLast
			}),
			showDivider: !isLast
		})] }),
		disabled: navigationDisabled,
		className: "h-full rounded",
		customButtonClassName: cn("group flex items-center gap-0.5 rounded hover:bg-custom-background-90 outline-none cursor-pointer h-full rounded", { "bg-custom-background-90": isDropdownOpen })
	});
}

//#endregion
//#region src/button/helper.tsx
var buttonSizeStyling = /* @__PURE__ */ function(buttonSizeStyling$1) {
	buttonSizeStyling$1["sm"] = "px-3 py-1.5 font-medium text-xs rounded flex items-center gap-1.5 whitespace-nowrap transition-all justify-center";
	buttonSizeStyling$1["md"] = "px-4 py-1.5 font-medium text-sm rounded flex items-center gap-1.5 whitespace-nowrap transition-all justify-center";
	buttonSizeStyling$1["lg"] = "px-5 py-2 font-medium text-sm rounded flex items-center gap-1.5 whitespace-nowrap transition-all justify-center";
	buttonSizeStyling$1["xl"] = "px-5 py-3.5 font-medium text-sm rounded flex items-center gap-1.5 whitespace-nowrap transition-all justify-center";
	return buttonSizeStyling$1;
}(buttonSizeStyling || {});
var buttonIconStyling = /* @__PURE__ */ function(buttonIconStyling$1) {
	buttonIconStyling$1["sm"] = "h-3 w-3 flex justify-center items-center overflow-hidden my-0.5 flex-shrink-0";
	buttonIconStyling$1["md"] = "h-3.5 w-3.5 flex justify-center items-center overflow-hidden my-0.5 flex-shrink-0";
	buttonIconStyling$1["lg"] = "h-4 w-4 flex justify-center items-center overflow-hidden my-0.5 flex-shrink-0";
	buttonIconStyling$1["xl"] = "h-4 w-4 flex justify-center items-center overflow-hidden my-0.5 flex-shrink-0 ";
	return buttonIconStyling$1;
}(buttonIconStyling || {});
const buttonStyling = {
	primary: {
		default: `text-white bg-custom-primary-100`,
		hover: `hover:bg-custom-primary-200`,
		pressed: `focus:text-custom-brand-40 focus:bg-custom-primary-200`,
		disabled: `cursor-not-allowed !bg-custom-primary-60 hover:bg-custom-primary-60`
	},
	"accent-primary": {
		default: `bg-custom-primary-100/20 text-custom-primary-100`,
		hover: `hover:bg-custom-primary-100/10 hover:text-custom-primary-200`,
		pressed: `focus:bg-custom-primary-100/10`,
		disabled: `cursor-not-allowed !text-custom-primary-60`
	},
	"outline-primary": {
		default: `text-custom-primary-100 bg-transparent border border-custom-primary-100`,
		hover: `hover:bg-custom-primary-100/20`,
		pressed: `focus:text-custom-primary-100 focus:bg-custom-primary-100/30`,
		disabled: `cursor-not-allowed !text-custom-primary-60 !border-custom-primary-60 `
	},
	"neutral-primary": {
		default: `text-custom-text-200 bg-custom-background-100 border border-custom-border-200`,
		hover: `hover:bg-custom-background-90`,
		pressed: `focus:text-custom-text-300 focus:bg-custom-background-90`,
		disabled: `cursor-not-allowed !text-custom-text-400`
	},
	"link-primary": {
		default: `text-custom-primary-100 bg-custom-background-100`,
		hover: `hover:text-custom-primary-200`,
		pressed: `focus:text-custom-primary-80 `,
		disabled: `cursor-not-allowed !text-custom-primary-60`
	},
	danger: {
		default: `text-white bg-red-500`,
		hover: ` hover:bg-red-600`,
		pressed: `focus:text-red-200 focus:bg-red-600`,
		disabled: `cursor-not-allowed !bg-red-300`
	},
	"accent-danger": {
		default: `text-red-500 bg-red-50`,
		hover: `hover:text-red-600 hover:bg-red-100`,
		pressed: `focus:text-red-500 focus:bg-red-100`,
		disabled: `cursor-not-allowed !text-red-300`
	},
	"outline-danger": {
		default: `text-red-500 bg-transparent border border-red-500`,
		hover: `hover:text-red-400 hover:border-red-400`,
		pressed: `focus:text-red-400 focus:border-red-400`,
		disabled: `cursor-not-allowed !text-red-300 !border-red-300`
	},
	"link-danger": {
		default: `text-red-500 bg-custom-background-100`,
		hover: `hover:text-red-400`,
		pressed: `focus:text-red-400`,
		disabled: `cursor-not-allowed !text-red-300`
	},
	"tertiary-danger": {
		default: `text-red-500 bg-custom-background-100 border border-red-200`,
		hover: `hover:bg-red-50 hover:border-red-300`,
		pressed: `focus:text-red-400`,
		disabled: `cursor-not-allowed !text-red-300`
	},
	"link-neutral": {
		default: `text-custom-text-300`,
		hover: `hover:text-custom-text-200`,
		pressed: `focus:text-custom-text-100`,
		disabled: `cursor-not-allowed !text-custom-text-400`
	}
};
const getButtonStyling = (variant, size, disabled = false) => {
	let tempVariant = ``;
	const currentVariant = buttonStyling[variant];
	tempVariant = `${currentVariant.default} ${disabled ? currentVariant.disabled : currentVariant.hover} ${currentVariant.pressed}`;
	let tempSize = ``;
	if (size) tempSize = buttonSizeStyling[size];
	return `${tempVariant} ${tempSize}`;
};
const getIconStyling = (size) => {
	let icon = ``;
	if (size) icon = buttonIconStyling[size];
	return icon;
};

//#endregion
//#region src/button/button.tsx
const Button = React$1.forwardRef(function Button$1(props, ref) {
	const { variant = "primary", size = "md", className = "", type = "button", loading = false, disabled = false, prependIcon = null, appendIcon = null, children,...rest } = props;
	const buttonStyle = getButtonStyling(variant, size, disabled || loading);
	const buttonIconStyle = getIconStyling(size);
	return /* @__PURE__ */ jsxs("button", {
		ref,
		type,
		className: cn(buttonStyle, className),
		disabled: disabled || loading,
		...rest,
		children: [
			prependIcon && /* @__PURE__ */ jsx("div", {
				className: buttonIconStyle,
				children: React$1.cloneElement(prependIcon, { strokeWidth: 2 })
			}),
			children,
			appendIcon && /* @__PURE__ */ jsx("div", {
				className: buttonIconStyle,
				children: React$1.cloneElement(appendIcon, { strokeWidth: 2 })
			})
		]
	});
});
Button.displayName = "plane-ui-button";

//#endregion
//#region src/button/toggle-switch.tsx
function ToggleSwitch(props) {
	const { value, onChange, label, size = "sm", disabled, className } = props;
	return /* @__PURE__ */ jsxs(Switch, {
		checked: value,
		disabled,
		onChange,
		className: cn("relative inline-flex flex-shrink-0 h-6 w-10 cursor-pointer rounded-full border border-custom-border-200 transition-colors duration-200 ease-in-out focus:outline-none bg-gray-700", {
			"h-4 w-6": size === "sm",
			"h-5 w-8": size === "md",
			"bg-custom-primary-100": value,
			"cursor-not-allowed bg-custom-background-80": disabled
		}, className),
		children: [/* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: label
		}), /* @__PURE__ */ jsx("span", {
			"aria-hidden": "true",
			className: cn("inline-block self-center h-4 w-4 transform rounded-full shadow ring-0 transition duration-200 ease-in-out", {
				"translate-x-5 bg-white": value,
				"h-2 w-2": size === "sm",
				"h-3 w-3": size === "md",
				"translate-x-3": value && size === "sm",
				"translate-x-4": value && size === "md",
				"translate-x-0.5 bg-custom-background-90": !value,
				"cursor-not-allowed bg-custom-background-90": disabled
			})
		})]
	});
}
ToggleSwitch.displayName = "plane-ui-toggle-switch";

//#endregion
//#region src/card/helper.tsx
let ECardVariant = /* @__PURE__ */ function(ECardVariant$1) {
	ECardVariant$1["WITHOUT_SHADOW"] = "without-shadow";
	ECardVariant$1["WITH_SHADOW"] = "with-shadow";
	return ECardVariant$1;
}({});
let ECardDirection = /* @__PURE__ */ function(ECardDirection$1) {
	ECardDirection$1["ROW"] = "row";
	ECardDirection$1["COLUMN"] = "column";
	return ECardDirection$1;
}({});
let ECardSpacing = /* @__PURE__ */ function(ECardSpacing$1) {
	ECardSpacing$1["SM"] = "sm";
	ECardSpacing$1["LG"] = "lg";
	return ECardSpacing$1;
}({});
const DEFAULT_STYLE$1 = "bg-custom-background-100 rounded-lg border-[0.5px] border-custom-border-200 w-full flex flex-col";
const containerStyle$1 = {
	[ECardVariant.WITHOUT_SHADOW]: "",
	[ECardVariant.WITH_SHADOW]: "hover:shadow-custom-shadow-4xl duration-300"
};
const spacings = {
	[ECardSpacing.SM]: "p-4",
	[ECardSpacing.LG]: "p-6"
};
const directions = {
	[ECardDirection.ROW]: "flex-row space-x-3",
	[ECardDirection.COLUMN]: "flex-col space-y-3"
};
const getCardStyle = (variant, spacing, direction) => DEFAULT_STYLE$1 + " " + directions[direction] + " " + containerStyle$1[variant] + " " + spacings[spacing];

//#endregion
//#region src/card/card.tsx
const Card = React$1.forwardRef(function Card$1(props, ref) {
	const { variant = ECardVariant.WITH_SHADOW, direction = ECardDirection.COLUMN, className = "", spacing = ECardSpacing.LG, children,...rest } = props;
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn(getCardStyle(variant, spacing, direction), className),
		...rest,
		children
	});
});
Card.displayName = "plane-ui-card";

//#endregion
//#region src/collapsible/collapsible.tsx
function Collapsible(props) {
	const { title, children, buttonRef, className, buttonClassName, isOpen, onToggle, defaultOpen } = props;
	const [localIsOpen, setLocalIsOpen] = useState(isOpen || defaultOpen ? true : false);
	useEffect(() => {
		if (isOpen !== void 0) setLocalIsOpen(isOpen);
	}, [isOpen]);
	const handleOnClick = useCallback(() => {
		if (isOpen !== void 0) {
			if (onToggle) onToggle();
		} else setLocalIsOpen((prev) => !prev);
	}, [isOpen, onToggle]);
	return /* @__PURE__ */ jsxs(Disclosure, {
		as: "div",
		className,
		children: [/* @__PURE__ */ jsx(Disclosure.Button, {
			ref: buttonRef,
			className: buttonClassName,
			onClick: handleOnClick,
			children: title
		}), /* @__PURE__ */ jsx(Transition, {
			show: localIsOpen,
			enter: "transition-max-height duration-400 ease-in-out",
			enterFrom: "max-h-0",
			enterTo: "max-h-screen",
			leave: "transition-max-height duration-400 ease-in-out",
			leaveFrom: "max-h-screen",
			leaveTo: "max-h-0",
			children: /* @__PURE__ */ jsx(Disclosure.Panel, {
				static: true,
				children
			})
		})]
	});
}

//#endregion
//#region src/collapsible/collapsible-button.tsx
function CollapsibleButton(props) {
	const { isOpen, title, hideChevron = false, indicatorElement, actionItemElement, className = "", titleClassName = "", ChevronIcon = DropdownIcon } = props;
	return /* @__PURE__ */ jsxs("div", {
		className: cn("flex items-center justify-between gap-3 h-12 px-2.5 py-3 border-b border-custom-border-200", className),
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-3.5",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-3",
				children: [!hideChevron && /* @__PURE__ */ jsx(ChevronIcon, { className: cn("size-2 text-custom-text-300 hover:text-custom-text-200 duration-300", { "-rotate-90": !isOpen }) }), /* @__PURE__ */ jsx("span", {
					className: cn("text-base text-custom-text-100 font-medium", titleClassName),
					children: title
				})]
			}), indicatorElement && indicatorElement]
		}), actionItemElement && isOpen && actionItemElement]
	});
}

//#endregion
//#region src/color-picker/color-picker.tsx
function ColorPicker(props) {
	const { value, onChange, className = "" } = props;
	const inputRef = React$1.useRef(null);
	const handleOnClick = (e) => {
		e.stopPropagation();
		e.preventDefault();
		inputRef.current?.click();
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center justify-center relative",
		children: [/* @__PURE__ */ jsx("button", {
			className: `size-4 rounded-full cursor-pointer conical-gradient ${className}`,
			onClick: handleOnClick,
			"aria-label": "Open color picker"
		}), /* @__PURE__ */ jsx("input", {
			ref: inputRef,
			type: "color",
			value,
			onChange: (e) => onChange(e.target.value),
			className: "absolute inset-0 size-4 invisible",
			"aria-hidden": "true"
		})]
	});
}

//#endregion
//#region src/constants/icons.ts
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
	{ name: "download" },
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
		element: Loader$1
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
//#region src/row/helper.tsx
let ERowVariant = /* @__PURE__ */ function(ERowVariant$1) {
	ERowVariant$1["REGULAR"] = "regular";
	ERowVariant$1["HUGGING"] = "hugging";
	return ERowVariant$1;
}({});
const rowStyle = {
	[ERowVariant.REGULAR]: "px-page-x",
	[ERowVariant.HUGGING]: "px-0"
};

//#endregion
//#region src/row/row.tsx
const Row = React$1.forwardRef(function Row$1(props, ref) {
	const { variant = ERowVariant.REGULAR, className = "", children,...rest } = props;
	const style = rowStyle[variant];
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn(style, className),
		...rest,
		children
	});
});
Row.displayName = "plane-ui-row";

//#endregion
//#region src/content-wrapper/content-wrapper.tsx
const DEFAULT_STYLE = "flex flex-col vertical-scrollbar scrollbar-lg h-full w-full overflow-y-auto";
const ContentWrapper = React$1.forwardRef(function ContentWrapper$1(props, ref) {
	const { variant = ERowVariant.REGULAR, className = "", children,...rest } = props;
	return /* @__PURE__ */ jsx(Row, {
		ref,
		variant,
		className: cn(DEFAULT_STYLE, { "py-page-y": variant === ERowVariant.REGULAR }, className),
		...rest,
		children
	});
});
ContentWrapper.displayName = "plane-ui-wrapper";

//#endregion
//#region src/control-link/control-link.tsx
const ControlLink = React$1.forwardRef(function ControlLink$1(props, ref) {
	const { href, onClick, children, target = "_blank", disabled = false, className, draggable: draggable$1 = false,...rest } = props;
	const LEFT_CLICK_EVENT_CODE = 0;
	const handleOnClick = (event) => {
		if (!((event.metaKey || event.ctrlKey) && event.button === LEFT_CLICK_EVENT_CODE)) {
			event.preventDefault();
			onClick(event);
		}
	};
	if (disabled && (ref || className)) return /* @__PURE__ */ jsx("a", {
		ref,
		className,
		children
	});
	if (disabled) return /* @__PURE__ */ jsx(Fragment$1, { children });
	return /* @__PURE__ */ jsx("a", {
		href,
		target,
		onClick: handleOnClick,
		...rest,
		ref,
		className,
		draggable: draggable$1,
		children
	});
});
ControlLink.displayName = "ControlLink";

//#endregion
//#region src/drag-handle.tsx
const DragHandle = forwardRef(function DragHandle$1(props, ref) {
	const { className, disabled = false } = props;
	if (disabled) return /* @__PURE__ */ jsx("div", { className: "w-[14px] h-[18px]" });
	return /* @__PURE__ */ jsxs("button", {
		type: "button",
		className: cn("p-0.5 flex flex-shrink-0 rounded bg-custom-background-90 text-custom-sidebar-text-200 cursor-grab", className),
		onContextMenu: (e) => {
			e.preventDefault();
			e.stopPropagation();
		},
		ref,
		children: [/* @__PURE__ */ jsx(MoreVertical, { className: "h-3.5 w-3.5 stroke-custom-text-400" }), /* @__PURE__ */ jsx(MoreVertical, { className: "-ml-5 h-3.5 w-3.5 stroke-custom-text-400" })]
	});
});
DragHandle.displayName = "DragHandle";

//#endregion
//#region src/drop-indicator.tsx
function DropIndicator(props) {
	const { isVisible, classNames = "" } = props;
	return /* @__PURE__ */ jsx("div", { className: cn(`block relative h-[2px] w-full
    before:left-0 before:relative before:block before:top-[-2px] before:h-[6px] before:w-[6px] before:rounded
    after:left-[calc(100%-6px)] after:relative after:block after:top-[-8px] after:h-[6px] after:w-[6px] after:rounded`, { "bg-custom-primary-100 before:bg-custom-primary-100 after:bg-custom-primary-100": isVisible }, classNames) });
}

//#endregion
//#region src/dropdown/common/input-search.tsx
function InputSearch(props) {
	const { isOpen, query, updateQuery, inputIcon, inputContainerClassName, inputClassName, inputPlaceholder, isMobile } = props;
	const inputRef = useRef(null);
	const searchInputKeyDown = (e) => {
		if (query !== "" && e.key === "Escape") {
			e.stopPropagation();
			updateQuery("");
		}
	};
	useEffect(() => {
		if (isOpen && !isMobile) inputRef.current && inputRef.current.focus();
	}, [isOpen, isMobile]);
	return /* @__PURE__ */ jsxs("div", {
		className: cn("flex items-center gap-1.5 rounded border border-custom-border-100 bg-custom-background-90 px-2", inputContainerClassName),
		children: [inputIcon ? /* @__PURE__ */ jsx(Fragment$1, { children: inputIcon }) : /* @__PURE__ */ jsx(Search, {
			className: "h-4 w-4 text-custom-text-300",
			"aria-hidden": "true"
		}), /* @__PURE__ */ jsx(Combobox.Input, {
			as: "input",
			ref: inputRef,
			className: cn("w-full bg-transparent py-1 text-xs text-custom-text-200 placeholder:text-custom-text-400 focus:outline-none", inputClassName),
			value: query,
			onChange: (e) => updateQuery(e.target.value),
			placeholder: inputPlaceholder ?? "Search",
			onKeyDown: searchInputKeyDown
		})]
	});
}

//#endregion
//#region src/dropdown/common/button.tsx
function DropdownButton(props) {
	const { isOpen, buttonContent, buttonClassName, buttonContainerClassName, handleOnClick, value, setReferenceElement, disabled } = props;
	return /* @__PURE__ */ jsx(Combobox.Button, {
		as: Fragment,
		children: /* @__PURE__ */ jsx("button", {
			ref: setReferenceElement,
			type: "button",
			className: cn("clickable block h-full max-w-full outline-none", {
				"cursor-not-allowed text-custom-text-200": disabled,
				"cursor-pointer": !disabled
			}, buttonContainerClassName),
			onClick: handleOnClick,
			children: buttonContent ? /* @__PURE__ */ jsx(Fragment$1, { children: buttonContent(isOpen, value) }) : /* @__PURE__ */ jsx("span", {
				className: cn("", buttonClassName),
				children: value
			})
		})
	});
}

//#endregion
//#region src/dropdown/common/options.tsx
function DropdownOptions(props) {
	const { isOpen, query, setQuery, inputIcon, inputPlaceholder, inputClassName, inputContainerClassName, disableSearch, keyExtractor, options, handleClose, value, renderItem, loader, isMobile = false } = props;
	return /* @__PURE__ */ jsxs(Fragment$1, { children: [!disableSearch && /* @__PURE__ */ jsx(InputSearch, {
		isOpen,
		query,
		updateQuery: (query$1) => setQuery(query$1),
		inputIcon,
		inputPlaceholder,
		inputClassName,
		inputContainerClassName,
		isMobile
	}), /* @__PURE__ */ jsx("div", {
		className: cn("max-h-48 space-y-1 overflow-y-scroll", !disableSearch && "mt-2"),
		children: /* @__PURE__ */ jsx(Fragment$1, { children: options ? options.length > 0 ? options?.map((option) => /* @__PURE__ */ jsx(Combobox.Option, {
			value: keyExtractor(option),
			disabled: option.disabled,
			className: ({ active, selected }) => cn("flex w-full cursor-pointer select-none items-center justify-between gap-2 truncate rounded px-1 py-1.5", {
				"bg-custom-background-80": active,
				"text-custom-text-100": selected,
				"text-custom-text-200": !selected
			}, option.className && option.className({
				active,
				selected
			})),
			onClick: handleClose,
			children: ({ selected }) => /* @__PURE__ */ jsx(Fragment$1, { children: renderItem ? /* @__PURE__ */ jsx(Fragment$1, { children: renderItem({
				value: keyExtractor(option),
				selected,
				disabled: option.disabled
			}) }) : /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx("span", {
				className: "flex-grow truncate",
				children: option.value
			}), selected && /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5 flex-shrink-0" })] }) })
		}, keyExtractor(option))) : /* @__PURE__ */ jsx("p", {
			className: "px-1.5 py-1 italic text-custom-text-400",
			children: "No matching results"
		}) : loader ? /* @__PURE__ */ jsxs(Fragment$1, { children: [
			" ",
			loader,
			" "
		] }) : /* @__PURE__ */ jsx(DropdownOptionsLoader, {}) })
	})] });
}

//#endregion
//#region src/dropdown/common/loader.tsx
function DropdownOptionsLoader() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex flex-col gap-1 animate-pulse",
		children: range(6).map((index) => /* @__PURE__ */ jsx("div", { className: "flex h-[1.925rem] w-full rounded px-1 py-1.5 bg-custom-background-90" }, index))
	});
}

//#endregion
//#region src/hooks/use-dropdown-key-pressed.ts
const useDropdownKeyPressed = (onEnterKeyDown, onEscKeyDown, stopPropagation = true) => {
	const stopEventPropagation = useCallback((event) => {
		if (stopPropagation) {
			event.stopPropagation();
			event.preventDefault();
		}
	}, [stopPropagation]);
	return useCallback((event) => {
		if (event.key === "Enter") {
			stopEventPropagation(event);
			onEnterKeyDown();
		} else if (event.key === "Escape") {
			stopEventPropagation(event);
			onEscKeyDown();
		} else if (event.key === "Tab") onEscKeyDown();
	}, [
		onEnterKeyDown,
		onEscKeyDown,
		stopEventPropagation
	]);
};

//#endregion
//#region src/dropdown/multi-select.tsx
function MultiSelectDropdown(props) {
	const { value, onChange, options, onOpen, onClose, containerClassName, tabIndex, placement, disabled, buttonContent, buttonContainerClassName, buttonClassName, disableSearch, inputPlaceholder, inputClassName, inputIcon, inputContainerClassName, keyExtractor, optionsContainerClassName, queryArray, sortByKey, firstItem, renderItem, loader = false, disableSorting } = props;
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [popperElement, setPopperElement] = useState(null);
	const dropdownRef = useRef(null);
	const [referenceElement, setReferenceElement] = useState(null);
	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		placement: placement ?? "bottom-start",
		modifiers: [{
			name: "preventOverflow",
			options: { padding: 12 }
		}]
	});
	const toggleDropdown = () => {
		if (!isOpen) onOpen?.();
		setIsOpen((prevIsOpen) => !prevIsOpen);
		if (isOpen) onClose?.();
	};
	const handleOnClick = (e) => {
		e.stopPropagation();
		e.preventDefault();
		toggleDropdown();
	};
	const handleClose = () => {
		if (!isOpen) return;
		setIsOpen(false);
		onClose?.();
		setQuery?.("");
	};
	const sortedOptions = useMemo(() => {
		if (!options) return void 0;
		const filteredOptions = queryArray ? (options || []).filter((options$1) => {
			return queryArray.map((query$1) => options$1.data[query$1]).join(" ").toLowerCase().includes(query.toLowerCase());
		}) : options;
		if (disableSorting) return filteredOptions;
		return sortBy(filteredOptions, [
			(option) => firstItem && firstItem(option.data[option.value]),
			(option) => !(value ?? []).includes(option.data[option.value]),
			() => sortByKey && sortByKey.toLowerCase()
		]);
	}, [query, options]);
	const handleKeyDown = useDropdownKeyPressed(toggleDropdown, handleClose);
	useOutsideClickDetector(dropdownRef, handleClose);
	return /* @__PURE__ */ jsxs(Combobox, {
		as: "div",
		ref: dropdownRef,
		value,
		onChange,
		className: cn("h-full", typeof containerClassName === "function" ? containerClassName(isOpen) : containerClassName),
		tabIndex,
		multiple: true,
		onKeyDown: handleKeyDown,
		disabled,
		children: [/* @__PURE__ */ jsx(DropdownButton, {
			value,
			isOpen,
			setReferenceElement,
			handleOnClick,
			buttonContent,
			buttonClassName,
			buttonContainerClassName,
			disabled
		}), isOpen && /* @__PURE__ */ jsx(Combobox.Options, {
			className: "fixed z-10",
			static: true,
			children: /* @__PURE__ */ jsx("div", {
				className: cn("my-1 w-48 rounded border-[0.5px] border-custom-border-300 bg-custom-background-100 px-2 py-2.5 text-xs shadow-custom-shadow-rg focus:outline-none", optionsContainerClassName),
				ref: setPopperElement,
				style: styles.popper,
				...attributes.popper,
				children: /* @__PURE__ */ jsx(DropdownOptions, {
					isOpen,
					query,
					setQuery,
					inputIcon,
					inputPlaceholder,
					inputClassName,
					inputContainerClassName,
					disableSearch,
					keyExtractor,
					options: sortedOptions,
					value,
					renderItem,
					loader
				})
			})
		})]
	});
}

//#endregion
//#region src/dropdown/single-select.tsx
function Dropdown(props) {
	const { value, onChange, options, onOpen, onClose, containerClassName, tabIndex, placement, disabled, buttonContent, buttonContainerClassName, buttonClassName, disableSearch, inputPlaceholder, inputClassName, inputIcon, inputContainerClassName, keyExtractor, optionsContainerClassName, queryArray, sortByKey, firstItem, renderItem, loader = false, disableSorting } = props;
	const [isOpen, setIsOpen] = useState(false);
	const [query, setQuery] = useState("");
	const [popperElement, setPopperElement] = useState(null);
	const dropdownRef = useRef(null);
	const [referenceElement, setReferenceElement] = useState(null);
	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		placement: placement ?? "bottom-start",
		modifiers: [{
			name: "preventOverflow",
			options: { padding: 12 }
		}]
	});
	const toggleDropdown = () => {
		if (!isOpen) onOpen?.();
		setIsOpen((prevIsOpen) => !prevIsOpen);
		if (isOpen) onClose?.();
	};
	const handleOnClick = (e) => {
		e.stopPropagation();
		e.preventDefault();
		toggleDropdown();
	};
	const handleClose = () => {
		if (!isOpen) return;
		setIsOpen(false);
		onClose?.();
		setQuery?.("");
	};
	const sortedOptions = useMemo(() => {
		if (!options) return void 0;
		const filteredOptions = queryArray ? (options || []).filter((options$1) => {
			return queryArray.map((query$1) => options$1.data[query$1]).join(" ").toLowerCase().includes(query.toLowerCase());
		}) : options;
		if (disableSorting || !sortByKey) return filteredOptions;
		return sortBy(filteredOptions, [
			(option) => firstItem && firstItem(option.data[option.value]),
			(option) => !(value ?? []).includes(option.data[option.value]),
			() => sortByKey && sortByKey.toLowerCase()
		]);
	}, [query, options]);
	const handleKeyDown = useDropdownKeyPressed(toggleDropdown, handleClose);
	useOutsideClickDetector(dropdownRef, handleClose, true);
	return /* @__PURE__ */ jsxs(Combobox, {
		as: "div",
		ref: dropdownRef,
		value,
		onChange,
		className: cn("h-full", typeof containerClassName === "function" ? containerClassName(isOpen) : containerClassName),
		tabIndex,
		onKeyDown: handleKeyDown,
		disabled,
		children: [/* @__PURE__ */ jsx(DropdownButton, {
			value,
			isOpen,
			setReferenceElement,
			handleOnClick,
			buttonContent,
			buttonClassName,
			buttonContainerClassName,
			disabled
		}), isOpen && /* @__PURE__ */ jsx(Combobox.Options, {
			className: "fixed z-10",
			static: true,
			children: /* @__PURE__ */ jsx("div", {
				className: cn("my-1 w-48 rounded border-[0.5px] border-custom-border-300 bg-custom-background-100 px-2 py-2 text-xs shadow-custom-shadow-rg focus:outline-none", optionsContainerClassName),
				ref: setPopperElement,
				style: styles.popper,
				...attributes.popper,
				children: /* @__PURE__ */ jsx(DropdownOptions, {
					isOpen,
					query,
					setQuery,
					inputIcon,
					inputPlaceholder,
					inputClassName,
					inputContainerClassName,
					disableSearch,
					keyExtractor,
					options: sortedOptions,
					value,
					renderItem,
					loader,
					handleClose
				})
			})
		})]
	});
}

//#endregion
//#region src/favorite-star.tsx
function FavoriteStar(props) {
	const { buttonClassName, iconClassName, onClick, selected } = props;
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		className: cn("h-4 w-4 grid place-items-center", buttonClassName),
		onClick,
		children: /* @__PURE__ */ jsx(Star, { className: cn("h-4 w-4 text-custom-text-300 transition-all", { "fill-yellow-500 stroke-yellow-500": selected }, iconClassName) })
	});
}

//#endregion
//#region src/form-fields/input.tsx
const Input = React$1.forwardRef(function Input$1(props, ref) {
	const { id, type, name, mode = "primary", inputSize = "sm", hasError = false, className = "", autoComplete = "off",...rest } = props;
	return /* @__PURE__ */ jsx("input", {
		id,
		ref,
		type,
		name,
		className: cn("block rounded-md bg-transparent text-sm placeholder-custom-text-400 focus:outline-none", {
			"rounded-md border-[0.5px] border-custom-border-200": mode === "primary",
			"rounded border-none bg-transparent ring-0 transition-all focus:ring-1 focus:ring-custom-primary": mode === "transparent",
			"rounded border-none bg-transparent ring-0": mode === "true-transparent",
			"border-red-500": hasError,
			"px-1.5 py-1": inputSize === "xs",
			"px-3 py-2": inputSize === "sm",
			"p-3": inputSize === "md"
		}, className),
		autoComplete,
		...rest
	});
});
Input.displayName = "form-input-field";

//#endregion
//#region src/hooks/use-auto-resize-textarea.ts
const useAutoResizeTextArea = (textAreaRef, value) => {
	useLayoutEffect(() => {
		const textArea = textAreaRef.current;
		if (!textArea) return;
		textArea.style.height = "0px";
		const scrollHeight = textArea.scrollHeight;
		textArea.style.height = scrollHeight + "px";
	}, [textAreaRef, value]);
};

//#endregion
//#region src/form-fields/textarea.tsx
const TextArea = React.forwardRef(function TextArea$1(props, ref) {
	const { id, name, value = "", mode = "primary", textAreaSize = "sm", hasError = false, className = "",...rest } = props;
	const textAreaRef = useRef(ref);
	useAutoResizeTextArea(textAreaRef, value);
	return /* @__PURE__ */ jsx("textarea", {
		id,
		name,
		ref: textAreaRef,
		value,
		className: cn("no-scrollbar w-full bg-transparent placeholder-custom-text-400 outline-none", {
			"rounded-md border-[0.5px] border-custom-border-200": mode === "primary",
			"focus:ring-theme rounded border-none bg-transparent ring-0 transition-all focus:ring-1": mode === "transparent",
			"rounded border-none bg-transparent ring-0": mode === "true-transparent",
			"px-1.5 py-1": textAreaSize === "xs",
			"px-3 py-2": textAreaSize === "sm",
			"p-3": textAreaSize === "md",
			"border-red-500": hasError,
			"bg-red-100": hasError && mode === "primary"
		}, className),
		...rest
	});
});
TextArea.displayName = "TextArea";

//#endregion
//#region src/form-fields/input-color-picker.tsx
function InputColorPicker(props) {
	const { value, hasError, onChange, name, className, style, placeholder } = props;
	const [referenceElement, setReferenceElement] = React$1.useState(null);
	const [popperElement, setPopperElement] = React$1.useState(null);
	const { styles, attributes } = usePopper(referenceElement, popperElement, { placement: "auto" });
	const handleColorChange = (newColor) => {
		const { hex } = newColor;
		onChange(hex);
	};
	const handleInputChange = (e) => {
		onChange(e.target.value);
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "relative",
		children: [/* @__PURE__ */ jsx(Input, {
			id: name,
			name,
			type: "text",
			value,
			onChange: handleInputChange,
			hasError,
			placeholder,
			className: cn("border-[0.5px] border-custom-border-200", className),
			style
		}), /* @__PURE__ */ jsx(Popover$1, {
			as: "div",
			className: "absolute right-1 top-1/2 z-10 -translate-y-1/2",
			children: ({ open }) => {
				if (open) {}
				return /* @__PURE__ */ jsxs(Fragment$1, { children: [/* @__PURE__ */ jsx(Popover$1.Button, {
					as: React$1.Fragment,
					children: /* @__PURE__ */ jsx(Button, {
						ref: setReferenceElement,
						variant: "neutral-primary",
						size: "sm",
						className: "border-none !bg-transparent",
						children: /* @__PURE__ */ jsxs("svg", {
							xmlns: "http://www.w3.org/2000/svg",
							width: "14",
							height: "14",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round",
							className: "lucide lucide-palette",
							children: [
								/* @__PURE__ */ jsx("circle", {
									cx: "13.5",
									cy: "6.5",
									r: ".5"
								}),
								/* @__PURE__ */ jsx("circle", {
									cx: "17.5",
									cy: "10.5",
									r: ".5"
								}),
								/* @__PURE__ */ jsx("circle", {
									cx: "8.5",
									cy: "7.5",
									r: ".5"
								}),
								/* @__PURE__ */ jsx("circle", {
									cx: "6.5",
									cy: "12.5",
									r: ".5"
								}),
								/* @__PURE__ */ jsx("path", { d: "M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" })
							]
						})
					})
				}), /* @__PURE__ */ jsx(Transition, {
					as: React$1.Fragment,
					enter: "transition ease-out duration-200",
					enterFrom: "opacity-0 translate-y-1",
					enterTo: "opacity-100 translate-y-0",
					leave: "transition ease-in duration-150",
					leaveFrom: "opacity-100 translate-y-0",
					leaveTo: "opacity-0 translate-y-1",
					children: /* @__PURE__ */ jsx(Popover$1.Panel, { children: /* @__PURE__ */ jsx("div", {
						className: "z-10 overflow-hidden rounded border border-custom-border-200 bg-custom-background-100 shadow-custom-shadow-rg",
						ref: setPopperElement,
						style: styles.popper,
						...attributes.popper,
						children: /* @__PURE__ */ jsx(ColorPicker$1.SketchPicker, {
							color: value,
							onChange: handleColorChange
						})
					}) })
				})] });
			}
		})]
	});
}

//#endregion
//#region src/form-fields/checkbox.tsx
const Checkbox = React$1.forwardRef(function Checkbox$1(props, ref) {
	const { id, name, checked, indeterminate = false, disabled, containerClassName, iconClassName, className,...rest } = props;
	return /* @__PURE__ */ jsxs("div", {
		className: cn("relative flex-shrink-0 flex gap-2", containerClassName),
		children: [
			/* @__PURE__ */ jsx("input", {
				id,
				ref,
				type: "checkbox",
				name,
				checked,
				className: cn("appearance-none shrink-0 size-4 border rounded-[3px] focus:outline-1 focus:outline-offset-4 focus:outline-custom-primary-50 cursor-pointer", {
					"border-custom-border-200 bg-custom-background-80 cursor-not-allowed": disabled,
					"border-custom-border-300 hover:border-custom-border-400 bg-transparent": !disabled,
					"border-custom-primary-40 hover:border-custom-primary-40 bg-custom-primary-100 hover:bg-custom-primary-200": !disabled && (checked || indeterminate)
				}, className),
				disabled,
				...rest
			}),
			/* @__PURE__ */ jsx("svg", {
				className: cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4 p-0.5 pointer-events-none outline-none hidden stroke-white", {
					block: checked,
					"stroke-custom-text-400 opacity-40": disabled
				}, iconClassName),
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "3",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" })
			}),
			/* @__PURE__ */ jsx("svg", {
				className: cn("absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-4 p-0.5 pointer-events-none outline-none stroke-white hidden", {
					"stroke-custom-text-400 opacity-40": disabled,
					block: indeterminate && !checked
				}, iconClassName),
				xmlns: "http://www.w3.org/2000/svg",
				viewBox: "0 0 8 8",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "3",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: /* @__PURE__ */ jsx("path", {
					d: "M5.75 4H2.25",
					strokeWidth: "1.5",
					strokeLinecap: "round",
					strokeLinejoin: "round"
				})
			})
		]
	});
});
Checkbox.displayName = "form-checkbox-field";

//#endregion
//#region src/form-fields/root.tsx
function Label({ htmlFor, children, className }) {
	return /* @__PURE__ */ jsx("label", {
		htmlFor,
		className: cn$1("block text-sm font-medium text-custom-text-100", className),
		children
	});
}
function FormField({ label, htmlFor, children, className, optional = false }) {
	return /* @__PURE__ */ jsxs("div", {
		className: cn$1("flex flex-col gap-1.5", className),
		children: [/* @__PURE__ */ jsxs(Label, {
			htmlFor,
			children: [label, optional && /* @__PURE__ */ jsx("span", {
				className: "text-custom-text-400 text-sm",
				children: " (optional)"
			})]
		}), children]
	});
}
function ValidationMessage({ type, message, className }) {
	return /* @__PURE__ */ jsx("p", {
		className: cn$1("text-sm", {
			"text-red-500": type === "error",
			"text-green-500": type === "success"
		}, className),
		children: message
	});
}

//#endregion
//#region src/form-fields/password/helper.tsx
/**
* Get strength information including message, color, and active fragments
*/
const getStrengthInfo = (strength) => {
	switch (strength) {
		case E_PASSWORD_STRENGTH.EMPTY: return {
			message: "Please enter your password",
			textColor: "text-custom-text-100",
			activeFragments: 0
		};
		case E_PASSWORD_STRENGTH.LENGTH_NOT_VALID: return {
			message: "Password is too short",
			textColor: "text-red-500",
			activeFragments: 1
		};
		case E_PASSWORD_STRENGTH.STRENGTH_NOT_VALID: return {
			message: "Password is weak",
			textColor: "text-orange-500",
			activeFragments: 2
		};
		case E_PASSWORD_STRENGTH.STRENGTH_VALID: return {
			message: "Password is strong",
			textColor: "text-green-500",
			activeFragments: 3
		};
		default: return {
			message: "Please enter your password",
			textColor: "text-custom-text-100",
			activeFragments: 0
		};
	}
};
/**
* Get fragment color based on position and active state
*/
const getFragmentColor = (fragmentIndex, activeFragments) => {
	if (fragmentIndex >= activeFragments) return "bg-custom-background-80";
	switch (activeFragments) {
		case 1: return "bg-red-500";
		case 2: return "bg-orange-500";
		case 3: return "bg-green-500";
		default: return "bg-custom-background-80";
	}
};

//#endregion
//#region src/form-fields/password/indicator.tsx
function PasswordStrengthIndicator({ password, showCriteria = true, isFocused = false }) {
	const strength = getPasswordStrength(password);
	const criteria = getPasswordCriteria(password);
	const strengthInfo = getStrengthInfo(strength);
	const isPasswordMeterVisible = isFocused ? true : strength === E_PASSWORD_STRENGTH.STRENGTH_VALID ? false : true;
	if (!password && !showCriteria || !isPasswordMeterVisible) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: cn$1("space-y-3"),
		children: [/* @__PURE__ */ jsxs("div", {
			className: "space-y-2",
			children: [/* @__PURE__ */ jsx("div", {
				className: "flex gap-1 w-full transition-all duration-300 ease-linear",
				children: [
					0,
					1,
					2
				].map((fragmentIndex) => /* @__PURE__ */ jsx("div", { className: cn$1("h-1 flex-1 rounded-sm transition-all duration-300 ease-in-out", getFragmentColor(fragmentIndex, strengthInfo.activeFragments)) }, fragmentIndex))
			}), password && /* @__PURE__ */ jsx("p", {
				className: cn$1("text-sm font-medium", strengthInfo.textColor),
				children: strengthInfo.message
			})]
		}), showCriteria && /* @__PURE__ */ jsx("div", {
			className: "flex flex-wrap gap-2",
			children: criteria.map((criterion) => /* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-1.5",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex items-center justify-center p-0.5",
					children: /* @__PURE__ */ jsx(CircleCheck, { className: cn$1("h-3 w-3 flex-shrink-0", {
						"text-green-500": criterion.isValid,
						"text-custom-text-100": !criterion.isValid
					}) })
				}), /* @__PURE__ */ jsx("span", {
					className: cn$1("text-xs", {
						"text-green-500": criterion.isValid,
						"text-custom-text-100": !criterion.isValid
					}),
					children: criterion.label
				})]
			}, criterion.key))
		})]
	});
}

//#endregion
//#region src/form-fields/password/password-input.tsx
function PasswordInput({ id, value, onChange, placeholder = "Enter your password", className, showToggle = true, error = false }) {
	const [showPassword, setShowPassword] = useState(false);
	return /* @__PURE__ */ jsxs("div", {
		className: "relative",
		children: [/* @__PURE__ */ jsx("input", {
			id,
			type: showPassword ? "text" : "password",
			value,
			onChange: (e) => onChange(e.target.value),
			className: cn$1("w-full px-3 py-2 pr-10 text-custom-text-200 border rounded-md bg-custom-background-100 focus:outline-none focus:ring-2 focus:ring-custom-primary-100 placeholder:text-custom-text-400 focus:border-transparent transition-all duration-200", {
				"border-custom-border-300": !error,
				"border-red-500": error
			}, className),
			placeholder
		}), showToggle && /* @__PURE__ */ jsx(Tooltip$1, {
			tooltipContent: showPassword ? "Hide password" : "Show password",
			position: "top",
			children: /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => setShowPassword(!showPassword),
				className: "absolute inset-y-0 right-0 pr-3 flex items-center text-custom-text-200 hover:text-custom-text-100 transition-colors duration-200",
				children: /* @__PURE__ */ jsxs("div", {
					className: "relative w-4 h-4",
					children: [/* @__PURE__ */ jsx(Eye, { className: cn$1("absolute inset-0 h-4 w-4 transition-all duration-300 ease-in-out", showPassword ? "opacity-0 scale-75 rotate-12" : "opacity-100 scale-100 rotate-0") }), /* @__PURE__ */ jsx(EyeClosed, { className: cn$1("absolute inset-0 h-4 w-4 transition-all duration-300 ease-in-out", showPassword ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-75 -rotate-12") })]
				})
			})
		})]
	});
}

//#endregion
//#region src/header/helper.tsx
let EHeaderVariant = /* @__PURE__ */ function(EHeaderVariant$1) {
	EHeaderVariant$1["PRIMARY"] = "primary";
	EHeaderVariant$1["SECONDARY"] = "secondary";
	EHeaderVariant$1["TERNARY"] = "ternary";
	return EHeaderVariant$1;
}({});
const headerStyle = {
	[EHeaderVariant.PRIMARY]: "relative flex w-full flex-shrink-0 flex-row items-center justify-between gap-x-2 gap-y-4 bg-custom-sidebar-background-100 bg-custom-sidebar-background-100 z-[18]",
	[EHeaderVariant.SECONDARY]: "!py-0  overflow-y-hidden border-b border-custom-border-200 justify-between bg-custom-background-100 z-[15]",
	[EHeaderVariant.TERNARY]: "flex flex-wrap justify-between py-2  border-b border-custom-border-200 gap-2 bg-custom-background-100 z-[12]"
};
const minHeights = {
	[EHeaderVariant.PRIMARY]: "",
	[EHeaderVariant.SECONDARY]: "min-h-[52px]",
	[EHeaderVariant.TERNARY]: ""
};
const getHeaderStyle = (variant, setMinHeight, showOnMobile) => {
	const height = setMinHeight ? minHeights[variant] : "";
	const display = variant === EHeaderVariant.SECONDARY ? showOnMobile ? "flex" : "hidden md:flex" : "";
	return " @container " + headerStyle[variant] + " " + height + " " + display;
};

//#endregion
//#region src/header/header.tsx
const HeaderContext = React$1.createContext(null);
function Header(props) {
	const { variant = EHeaderVariant.PRIMARY, className = "", showOnMobile = true, setHeight = true, children,...rest } = props;
	const style = getHeaderStyle(variant, setHeight, showOnMobile);
	return /* @__PURE__ */ jsx(HeaderContext.Provider, {
		value: variant,
		children: /* @__PURE__ */ jsx(Row, {
			variant: variant === EHeaderVariant.PRIMARY ? ERowVariant.HUGGING : ERowVariant.REGULAR,
			className: cn(style, className),
			...rest,
			children
		})
	});
}
function LeftItem(props) {
	return /* @__PURE__ */ jsx("div", {
		className: cn("flex flex-wrap items-center gap-2 overflow-ellipsis whitespace-nowrap max-w-[80%] flex-grow", props.className),
		children: props.children
	});
}
function RightItem(props) {
	const variant = React$1.useContext(HeaderContext);
	if (variant === void 0) throw new Error("RightItem must be used within Header");
	return /* @__PURE__ */ jsx("div", {
		className: cn("flex justify-end gap-3 w-auto items-center", { "items-baseline": variant === EHeaderVariant.TERNARY }, props.className),
		children: props.children
	});
}
Header.LeftItem = LeftItem;
Header.RightItem = RightItem;
Header.displayName = "plane-ui-header";

//#endregion
//#region src/link/block.tsx
function LinkItemBlock(props) {
	const { title, url, createdAt, menuItems, onClick } = props;
	return /* @__PURE__ */ jsxs("div", {
		onClick,
		className: "cursor-pointer group flex items-center bg-custom-background-100 px-4 w-[230px] h-[56px] border-[0.5px] border-custom-border-200 rounded-md gap-4",
		children: [
			/* @__PURE__ */ jsx("div", {
				className: "flex-shrink-0 size-8 rounded p-2 bg-custom-background-90 grid place-items-center",
				children: /* @__PURE__ */ jsx(getIconForLink(url), { className: "size-4 stroke-2 text-custom-text-350 group-hover:text-custom-text-100" })
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex-1 truncate",
				children: [/* @__PURE__ */ jsx("div", {
					className: "text-sm font-medium truncate",
					children: title
				}), createdAt && /* @__PURE__ */ jsx("div", {
					className: "text-xs font-medium text-custom-text-400",
					children: calculateTimeAgo(createdAt)
				})]
			}),
			menuItems && /* @__PURE__ */ jsx("div", {
				className: "hidden group-hover:block",
				children: /* @__PURE__ */ jsx(CustomMenu, {
					placement: "bottom-end",
					menuItemsClassName: "z-20",
					closeOnSelect: true,
					verticalEllipsis: true,
					children: menuItems.map((item) => /* @__PURE__ */ jsxs(CustomMenu.MenuItem, {
						onClick: (e) => {
							e.preventDefault();
							e.stopPropagation();
							item.action();
						},
						className: cn$1("flex items-center gap-2 w-full ", { "text-custom-text-400": item.disabled }),
						disabled: item.disabled,
						children: [item.icon && /* @__PURE__ */ jsx(item.icon, { className: cn$1("h-3 w-3", item.iconClassName) }), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h5", { children: item.title }), item.description && /* @__PURE__ */ jsx("p", {
							className: cn$1("text-custom-text-300 whitespace-pre-line", { "text-custom-text-400": item.disabled }),
							children: item.description
						})] })]
					}, item.key))
				})
			})
		]
	});
}

//#endregion
//#region src/loader.tsx
function Loader({ children, className = "" }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn("animate-pulse", className),
		role: "status",
		children
	});
}
function Item({ height = "auto", width = "auto", className = "" }) {
	return /* @__PURE__ */ jsx("div", {
		className: cn("rounded-md bg-custom-background-80", className),
		style: {
			height,
			width
		}
	});
}
Loader.Item = Item;
Loader.displayName = "plane-ui-loader";

//#endregion
//#region src/modals/constants.ts
let EModalPosition = /* @__PURE__ */ function(EModalPosition$1) {
	EModalPosition$1["TOP"] = "flex items-center justify-center text-center mx-4 my-10 md:my-20";
	EModalPosition$1["CENTER"] = "flex items-end sm:items-center justify-center p-4 min-h-full";
	return EModalPosition$1;
}({});
let EModalWidth = /* @__PURE__ */ function(EModalWidth$1) {
	EModalWidth$1["SM"] = "sm:max-w-sm";
	EModalWidth$1["MD"] = "sm:max-w-md";
	EModalWidth$1["LG"] = "sm:max-w-lg";
	EModalWidth$1["XL"] = "sm:max-w-xl";
	EModalWidth$1["XXL"] = "sm:max-w-2xl";
	EModalWidth$1["XXXL"] = "sm:max-w-3xl";
	EModalWidth$1["XXXXL"] = "sm:max-w-4xl";
	EModalWidth$1["VXL"] = "sm:max-w-5xl";
	EModalWidth$1["VIXL"] = "sm:max-w-6xl";
	EModalWidth$1["VIIXL"] = "sm:max-w-7xl";
	return EModalWidth$1;
}({});

//#endregion
//#region src/modals/modal-core.tsx
function ModalCore(props) {
	const { children, handleClose, isOpen, position = EModalPosition.CENTER, width = EModalWidth.XXL, className = "" } = props;
	return /* @__PURE__ */ jsx(Transition.Root, {
		show: isOpen,
		as: Fragment,
		children: /* @__PURE__ */ jsxs(Dialog, {
			as: "div",
			className: "relative z-30",
			onClose: () => handleClose && handleClose(),
			children: [/* @__PURE__ */ jsx(Transition.Child, {
				as: Fragment,
				enter: "ease-out duration-300",
				enterFrom: "opacity-0",
				enterTo: "opacity-100",
				leave: "ease-in duration-200",
				leaveFrom: "opacity-100",
				leaveTo: "opacity-0",
				children: /* @__PURE__ */ jsx("div", { className: "fixed inset-0 bg-custom-backdrop transition-opacity" })
			}), /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-30 overflow-y-auto",
				children: /* @__PURE__ */ jsx("div", {
					className: position,
					children: /* @__PURE__ */ jsx(Transition.Child, {
						as: Fragment,
						enter: "ease-out duration-300",
						enterFrom: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
						enterTo: "opacity-100 translate-y-0 sm:scale-100",
						leave: "ease-in duration-200",
						leaveFrom: "opacity-100 translate-y-0 sm:scale-100",
						leaveTo: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",
						children: /* @__PURE__ */ jsx(Dialog.Panel, {
							className: cn("relative transform rounded-lg bg-custom-background-100 text-left shadow-custom-shadow-md transition-all w-full", width, className),
							children
						})
					})
				})
			})]
		})
	});
}

//#endregion
//#region src/modals/alert-modal.tsx
const VARIANT_ICONS = {
	danger: AlertTriangle,
	primary: Info
};
const BUTTON_VARIANTS = {
	danger: "danger",
	primary: "primary"
};
const VARIANT_CLASSES = {
	danger: "bg-red-500/20 text-red-500",
	primary: "bg-custom-primary-100/20 text-custom-primary-100"
};
function AlertModalCore(props) {
	const { content, handleClose, handleSubmit, hideIcon = false, isSubmitting, isOpen, position = EModalPosition.CENTER, primaryButtonText = {
		loading: "Deleting",
		default: "Delete"
	}, secondaryButtonText = "Cancel", title, variant = "danger", width = EModalWidth.XL } = props;
	const Icon = VARIANT_ICONS[variant];
	return /* @__PURE__ */ jsxs(ModalCore, {
		isOpen,
		handleClose,
		position,
		width,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4",
			children: [!hideIcon && /* @__PURE__ */ jsx("span", {
				className: cn("flex-shrink-0 grid place-items-center rounded-full size-12 sm:size-10", VARIANT_CLASSES[variant]),
				children: /* @__PURE__ */ jsx(Icon, {
					className: "size-5",
					"aria-hidden": "true"
				})
			}), /* @__PURE__ */ jsxs("div", {
				className: "text-center sm:text-left",
				children: [/* @__PURE__ */ jsx("h3", {
					className: "text-lg font-medium",
					children: title
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-sm text-custom-text-200",
					children: content
				})]
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "px-5 py-4 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 border-t-[0.5px] border-custom-border-200",
			children: [/* @__PURE__ */ jsx(Button, {
				variant: "neutral-primary",
				size: "sm",
				onClick: handleClose,
				children: secondaryButtonText
			}), /* @__PURE__ */ jsx(Button, {
				variant: BUTTON_VARIANTS[variant],
				size: "sm",
				tabIndex: 1,
				onClick: handleSubmit,
				loading: isSubmitting,
				children: isSubmitting ? primaryButtonText.loading : primaryButtonText.default
			})]
		})]
	});
}

//#endregion
//#region src/popovers/popover.tsx
function Popover(props) {
	const { popperPosition = "bottom-end", popperPadding = 0, buttonClassName = "", popoverClassName = "", button, disabled = false, panelClassName = "", children, popoverButtonRef, buttonRefClassName = "" } = props;
	const [referenceElement, setReferenceElement] = useState(null);
	const [popperElement, setPopperElement] = useState(null);
	const { styles, attributes } = usePopper(referenceElement, popperElement, {
		placement: popperPosition,
		modifiers: [{
			name: "preventOverflow",
			options: { padding: popperPadding }
		}]
	});
	return /* @__PURE__ */ jsxs(Popover$1, {
		className: cn("relative flex h-full w-full items-center justify-center", popoverClassName),
		children: [/* @__PURE__ */ jsx("div", {
			ref: setReferenceElement,
			className: cn("w-full", buttonRefClassName),
			children: /* @__PURE__ */ jsx(Popover$1.Button, {
				ref: popoverButtonRef,
				className: cn({ "flex justify-center items-center text-base h-6 w-6 rounded transition-all bg-custom-background-90 hover:bg-custom-background-80": !button }, buttonClassName),
				disabled,
				children: button ? button : /* @__PURE__ */ jsx(EllipsisVertical, { className: "h-3 w-3" })
			})
		}), /* @__PURE__ */ jsx(Transition, {
			as: Fragment,
			enter: "transition ease-out duration-200",
			enterFrom: "opacity-0 translate-y-1",
			enterTo: "opacity-100 translate-y-0",
			leave: "transition ease-in duration-150",
			leaveFrom: "opacity-100 translate-y-0",
			leaveTo: "opacity-0 translate-y-1",
			children: /* @__PURE__ */ jsx(Popover$1.Panel, {
				ref: setPopperElement,
				style: styles.popper,
				...attributes.popper,
				className: cn("absolute left-0 top-full z-20 w-screen max-w-xs mt-2", panelClassName),
				children
			})
		})]
	});
}

//#endregion
//#region src/popovers/popover-menu.tsx
function PopoverMenu(props) {
	const { popperPosition = "bottom-end", popperPadding = 0, buttonClassName = "", button, disabled, panelClassName = "", data, popoverClassName = "", keyExtractor, render, popoverButtonRef } = props;
	return /* @__PURE__ */ jsx(Popover, {
		popperPosition,
		popperPadding,
		buttonClassName,
		button,
		disabled,
		panelClassName: cn("my-1 w-48 rounded border-[0.5px] border-custom-border-300 bg-custom-background-100 px-2 py-2 text-xs shadow-custom-shadow-rg focus:outline-none", panelClassName),
		popoverClassName,
		popoverButtonRef,
		children: /* @__PURE__ */ jsx(Fragment, { children: data.map((item, index) => /* @__PURE__ */ jsx(Fragment, { children: render(item, index) }, keyExtractor(item, index))) })
	});
}

//#endregion
//#region src/progress/radial-progress.tsx
function RadialProgressBar(props) {
	const { progress } = props;
	const [circumference, setCircumference] = useState(0);
	useEffect(() => {
		setCircumference(2 * Math.PI * 40);
	}, []);
	const progressOffset = (100 - progress) / 100 * circumference;
	return /* @__PURE__ */ jsx("div", {
		className: "relative h-4 w-4",
		children: /* @__PURE__ */ jsxs("svg", {
			className: "absolute left-0 top-0",
			viewBox: "0 0 100 100",
			children: [/* @__PURE__ */ jsx("circle", {
				className: "stroke-current opacity-10",
				cx: "50",
				cy: "50",
				r: "40",
				strokeWidth: "12",
				fill: "none",
				strokeDasharray: `${circumference} ${circumference}`
			}), /* @__PURE__ */ jsx("circle", {
				className: `stroke-current`,
				cx: "50",
				cy: "50",
				r: "40",
				strokeWidth: "12",
				fill: "none",
				strokeDasharray: `${circumference} ${circumference}`,
				strokeDashoffset: progressOffset,
				transform: "rotate(-90 50 50)"
			})]
		})
	});
}

//#endregion
//#region src/progress/progress-bar.tsx
function ProgressBar({ maxValue = 0, value = 0, radius = 8, strokeWidth = 2, activeStrokeColor = "#3e98c7", inactiveStrokeColor = "#ddd" }) {
	const generatePie = (value$1) => {
		const x = radius - Math.cos(2 * Math.PI / (100 / value$1)) * radius;
		const y = radius + Math.sin(2 * Math.PI / (100 / value$1)) * radius;
		return `M${radius} ${radius} L${radius} 0 A${radius} ${radius} 0 ${value$1 <= 50 ? 0 : 1} 1 ${y} ${x} Z`;
	};
	const calculatePieValue = (numberOfBars) => {
		const angle = 360 / numberOfBars;
		return Math.floor(angle / 4) < 1 ? 1 : Math.floor(angle / 4);
	};
	const renderPie = (i) => {
		const DIRECTION = -1;
		const primaryRotationAngle = (maxValue - 1) * (360 / maxValue);
		const rotationTransformation = `rotate(${-1 * DIRECTION * primaryRotationAngle + i * DIRECTION * primaryRotationAngle}, ${radius}, ${radius})`;
		const dValue = generatePie(calculatePieValue(maxValue));
		return /* @__PURE__ */ jsx("path", {
			style: { opacity: i === 0 ? 0 : 1 },
			d: dValue,
			fill: value > 0 && i <= value ? activeStrokeColor : inactiveStrokeColor,
			transform: rotationTransformation
		}, i);
	};
	const renderOuterCircle = () => [...Array(maxValue + 1)].map((e, i) => renderPie(i));
	return /* @__PURE__ */ jsxs("svg", {
		width: radius * 2,
		height: radius * 2,
		children: [renderOuterCircle(), /* @__PURE__ */ jsx("circle", {
			r: radius - strokeWidth,
			cx: radius,
			cy: radius,
			className: "progress-bar"
		})]
	});
}

//#endregion
//#region src/progress/linear-progress-indicator.tsx
function LinearProgressIndicator({ data, noTooltip = false, inPercentage = false, size = "sm", className = "", barClassName = "" }) {
	const total = data.reduce((acc, cur) => acc + cur.value, 0);
	let progress = 0;
	const bars = data.map((item) => {
		const width = `${item.value / total * 100}%`;
		if (width === "0%") return /* @__PURE__ */ jsx(Fragment$1, {});
		const style = {
			width,
			backgroundColor: item.color
		};
		progress += item.value;
		if (noTooltip) return /* @__PURE__ */ jsx("div", { style }, item.id);
		else return /* @__PURE__ */ jsx(Tooltip$1, {
			tooltipContent: `${item.name} ${Math.round(item.value)}${inPercentage ? "%" : ""}`,
			children: /* @__PURE__ */ jsx("div", {
				style,
				className: cn("first:rounded-l-sm last:rounded-r-sm", barClassName)
			})
		}, item.id);
	});
	return /* @__PURE__ */ jsx("div", {
		className: cn("flex w-full items-center justify-between gap-[1px] rounded-sm", {
			"h-2": size === "sm",
			"h-3": size === "md",
			"h-3.5": size === "lg",
			"h-[14px]": size === "xl"
		}),
		children: /* @__PURE__ */ jsx("div", {
			className: cn("flex h-full w-full gap-[1.5px] p-[2px] bg-custom-background-90 rounded-sm", className),
			children: bars
		})
	});
}

//#endregion
//#region src/progress/circular-progress-indicator.tsx
function CircularProgressIndicator(props) {
	const { size = 40, percentage = 25, strokeWidth = 6, strokeColor = "stroke-custom-primary-100", children } = props;
	const sqSize = size;
	const radius = (size - strokeWidth) / 2;
	const viewBox = `0 0 ${sqSize} ${sqSize}`;
	const dashArray = radius * Math.PI * 2;
	const dashOffset = dashArray - dashArray * percentage / 100;
	return /* @__PURE__ */ jsxs("div", {
		className: "relative",
		children: [/* @__PURE__ */ jsxs("svg", {
			width: size,
			height: size,
			viewBox,
			fill: "none",
			children: [/* @__PURE__ */ jsx("circle", {
				className: "fill-none stroke-custom-background-80",
				cx: size / 2,
				cy: size / 2,
				r: radius,
				strokeWidth: `${strokeWidth}px`,
				style: { filter: "url(#filter0_bi_377_19141)" }
			}), /* @__PURE__ */ jsx("circle", {
				className: `fill-none ${strokeColor}`,
				cx: size / 2,
				cy: size / 2,
				r: radius,
				strokeWidth: `${strokeWidth}px`,
				transform: `rotate(-90 ${size / 2} ${size / 2})`,
				style: {
					strokeDasharray: dashArray,
					strokeDashoffset: dashOffset
				},
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "absolute",
			style: {
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)"
			},
			children
		})]
	});
}

//#endregion
//#region src/scroll-area.tsx
const sizeStyles = {
	sm: "p-[0.112rem] data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:h-2.5",
	md: "p-[0.152rem] data-[orientation=vertical]:w-3 data-[orientation=horizontal]:h-3",
	lg: "p-[0.225rem] data-[orientation=vertical]:w-4 data-[orientation=horizontal]:h-4"
};
const thumbSizeStyles = {
	sm: "before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2",
	md: "before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-14 before:min-w-14 before:-translate-x-1/2 before:-translate-y-1/2",
	lg: "before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-17 before:min-w-17 before:-translate-x-1/2 before:-translate-y-1/2"
};
function ScrollArea(props) {
	const { type = "always", className = "", scrollHideDelay = 600, size = "md", children } = props;
	return /* @__PURE__ */ jsxs(RadixScrollArea.Root, {
		type,
		className: cn("group overflow-hidden", className),
		scrollHideDelay,
		children: [
			/* @__PURE__ */ jsx(RadixScrollArea.Viewport, {
				className: "size-full",
				children
			}),
			/* @__PURE__ */ jsx(RadixScrollArea.Scrollbar, {
				className: cn("group/track flex touch-none select-none bg-transparent transition-colors duration-150 ease-out", sizeStyles[size]),
				orientation: "vertical",
				children: /* @__PURE__ */ jsx(RadixScrollArea.Thumb, { className: cn("relative flex-1 rounded-[10px]  bg-custom-scrollbar-neutral group-hover:bg-custom-scrollbar-hover group-active/track:bg-custom-scrollbar-active", thumbSizeStyles[size]) })
			}),
			/* @__PURE__ */ jsx(RadixScrollArea.Scrollbar, {
				className: cn("group/track flex touch-none select-none bg-transparent transition-colors duration-150 ease-out", sizeStyles[size]),
				orientation: "horizontal",
				children: /* @__PURE__ */ jsx(RadixScrollArea.Thumb, { className: cn("relative flex-1 rounded-[10px] bg-custom-scrollbar-neutral group-hover:bg-custom-scrollbar-hover group-active/track:bg-custom-scrollbar-active", thumbSizeStyles[size]) })
			})
		]
	});
}

//#endregion
//#region src/sortable/draggable.tsx
function Draggable({ children, data, className }) {
	const ref = useRef(null);
	const [dragging, setDragging] = useState(false);
	const [isDraggedOver, setIsDraggedOver] = useState(false);
	const [closestEdge, setClosestEdge] = useState(null);
	useEffect(() => {
		const el = ref.current;
		if (el) combine(draggable({
			element: el,
			onDragStart: () => setDragging(true),
			onDrop: () => setDragging(false),
			getInitialData: () => data
		}), dropTargetForElements({
			element: el,
			onDragEnter: (args) => {
				setIsDraggedOver(true);
				setClosestEdge(extractClosestEdge(args.self.data));
			},
			onDragLeave: () => setIsDraggedOver(false),
			onDrop: () => {
				setIsDraggedOver(false);
			},
			canDrop: ({ source }) => !isEqual(source.data, data) && source.data.__uuid__ === data.__uuid__,
			getData: ({ input, element }) => attachClosestEdge(data, {
				input,
				element,
				allowedEdges: ["top", "bottom"]
			})
		}));
	}, [data]);
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(dragging && "opacity-25", className),
		children: [
			/* @__PURE__ */ jsx(DropIndicator, { isVisible: isDraggedOver && closestEdge === "top" }),
			children,
			/* @__PURE__ */ jsx(DropIndicator, { isVisible: isDraggedOver && closestEdge === "bottom" })
		]
	});
}

//#endregion
//#region src/sortable/sortable.tsx
const moveItem = (data, source, destination, keyExtractor) => {
	const sourceIndex = data.findIndex((item, index) => keyExtractor(item, index) === keyExtractor(source, 0));
	if (sourceIndex === -1) return {
		newData: data,
		movedItem: void 0
	};
	const destinationIndex = data.findIndex((item, index) => keyExtractor(item, index) === keyExtractor(destination, 0));
	if (destinationIndex === -1) return {
		newData: data,
		movedItem: void 0
	};
	const symbolKey = Reflect.ownKeys(destination).find((key) => key.toString() === "Symbol(closestEdge)");
	const finalIndex = (symbolKey ? destination[symbolKey] : "bottom") === "bottom" ? destinationIndex + 1 : destinationIndex;
	const adjustedDestinationIndex = finalIndex > sourceIndex ? finalIndex - 1 : finalIndex;
	const newData = [...data];
	const [movedItem] = newData.splice(sourceIndex, 1);
	newData.splice(adjustedDestinationIndex, 0, movedItem);
	const { __uuid__: movedItemId,...movedItemData } = movedItem;
	return {
		newData: newData.map((item) => {
			const { __uuid__: uuid,...rest } = item;
			return rest;
		}),
		movedItem: movedItemData
	};
};
function Sortable({ data, render, onChange, keyExtractor, containerClassName, id }) {
	useEffect(() => {
		const unsubscribe = monitorForElements({ onDrop({ source, location }) {
			const destination = location?.current?.dropTargets[0];
			if (!destination) return;
			const { newData, movedItem } = moveItem(data, source.data, destination.data, keyExtractor);
			onChange(newData, movedItem);
		} });
		return () => {
			if (unsubscribe) unsubscribe();
		};
	}, [
		data,
		keyExtractor,
		onChange
	]);
	const enhancedData = useMemo(() => {
		const uuid = id ? id : Math.random().toString(36).substring(7);
		return data.map((item) => ({
			...item,
			__uuid__: uuid
		}));
	}, [data, id]);
	return /* @__PURE__ */ jsx(Fragment$1, { children: data.map((item, index) => /* @__PURE__ */ jsx(Draggable, {
		data: enhancedData[index],
		className: containerClassName,
		children: /* @__PURE__ */ jsx(Fragment, { children: render(item, index) })
	}, keyExtractor(enhancedData[index], index))) });
}

//#endregion
//#region src/spinners/circular-spinner.tsx
function Spinner({ height = "32px", width = "32px", className = "" }) {
	return /* @__PURE__ */ jsxs("div", {
		role: "status",
		children: [/* @__PURE__ */ jsxs("svg", {
			"aria-hidden": "true",
			height,
			width,
			className: cn("animate-spin fill-custom-primary-100 text-custom-text-200", className),
			viewBox: "0 0 100 101",
			fill: "none",
			xmlns: "http://www.w3.org/2000/svg",
			children: [/* @__PURE__ */ jsx("path", {
				d: "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z",
				fill: "currentColor"
			}), /* @__PURE__ */ jsx("path", {
				d: "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z",
				fill: "currentFill"
			})]
		}), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Loading..."
		})]
	});
}

//#endregion
//#region src/spinners/circular-bar-spinner.tsx
function CircularBarSpinner({ height = "16px", width = "16px", className = "" }) {
	return /* @__PURE__ */ jsx("div", {
		role: "status",
		children: /* @__PURE__ */ jsx("svg", {
			xmlns: "http://www.w3.org/2000/svg",
			width,
			height,
			viewBox: "0 0 24 24",
			className,
			children: /* @__PURE__ */ jsxs("g", { children: [
				/* @__PURE__ */ jsx("rect", {
					width: 2,
					height: 5,
					x: 11,
					y: 1,
					fill: "currentColor",
					opacity: .14
				}),
				/* @__PURE__ */ jsx("rect", {
					width: 2,
					height: 5,
					x: 11,
					y: 1,
					fill: "currentColor",
					opacity: .29,
					transform: "rotate(30 12 12)"
				}),
				/* @__PURE__ */ jsx("rect", {
					width: 2,
					height: 5,
					x: 11,
					y: 1,
					fill: "currentColor",
					opacity: .43,
					transform: "rotate(60 12 12)"
				}),
				/* @__PURE__ */ jsx("rect", {
					width: 2,
					height: 5,
					x: 11,
					y: 1,
					fill: "currentColor",
					opacity: .57,
					transform: "rotate(90 12 12)"
				}),
				/* @__PURE__ */ jsx("rect", {
					width: 2,
					height: 5,
					x: 11,
					y: 1,
					fill: "currentColor",
					opacity: .71,
					transform: "rotate(120 12 12)"
				}),
				/* @__PURE__ */ jsx("rect", {
					width: 2,
					height: 5,
					x: 11,
					y: 1,
					fill: "currentColor",
					opacity: .86,
					transform: "rotate(150 12 12)"
				}),
				/* @__PURE__ */ jsx("rect", {
					width: 2,
					height: 5,
					x: 11,
					y: 1,
					fill: "currentColor",
					transform: "rotate(180 12 12)"
				}),
				/* @__PURE__ */ jsx("animateTransform", {
					attributeName: "transform",
					calcMode: "discrete",
					dur: "0.75s",
					repeatCount: "indefinite",
					type: "rotate",
					values: "0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12"
				})
			] })
		})
	});
}

//#endregion
//#region src/tables/table.tsx
function Table(props) {
	const { data, columns, keyExtractor, tableClassName = "", tHeadClassName = "", tHeadTrClassName = "", thClassName = "", tBodyClassName = "", tBodyTrClassName = "", tdClassName = "" } = props;
	return /* @__PURE__ */ jsxs("table", {
		className: cn("table-auto w-full overflow-hidden whitespace-nowrap", tableClassName),
		children: [/* @__PURE__ */ jsx("thead", {
			className: cn("divide-y divide-custom-border-200", tHeadClassName),
			children: /* @__PURE__ */ jsx("tr", {
				className: cn("divide-x divide-custom-border-200 text-sm text-custom-text-100", tHeadTrClassName),
				children: columns.map((column) => /* @__PURE__ */ jsx("th", {
					className: cn("px-2.5 py-2", thClassName),
					children: column?.thRender && column?.thRender() || column.content
				}, column.key))
			})
		}), /* @__PURE__ */ jsx("tbody", {
			className: cn("divide-y divide-custom-border-200", tBodyClassName),
			children: data.map((item) => /* @__PURE__ */ jsx("tr", {
				className: cn("divide-x divide-custom-border-200 text-sm text-custom-text-200", tBodyTrClassName),
				children: columns.map((column) => /* @__PURE__ */ jsx("td", {
					className: cn("px-2.5 py-2", tdClassName),
					children: column.tdRender(item)
				}, `${column.key}-${keyExtractor(item)}`))
			}, keyExtractor(item)))
		})]
	});
}

//#endregion
//#region src/tabs/tab-list.tsx
function TabList({ tabs, tabListClassName, tabClassName, size = "md", selectedTab, onTabChange }) {
	return /* @__PURE__ */ jsx(Tab.List, {
		as: "div",
		className: cn("flex w-full min-w-fit items-center justify-between gap-1.5 rounded-md text-sm p-0.5 bg-custom-background-80/60", tabListClassName),
		children: tabs.map((tab) => /* @__PURE__ */ jsxs(Tab, {
			className: ({ selected }) => cn("flex items-center justify-center p-1 min-w-fit w-full font-medium text-custom-text-100 outline-none focus:outline-none cursor-pointer transition-all rounded", (selectedTab ? selectedTab === tab.key : selected) ? "bg-custom-background-100 text-custom-text-100 shadow-sm" : tab.disabled ? "text-custom-text-400 cursor-not-allowed" : "text-custom-text-400 hover:text-custom-text-300 hover:bg-custom-background-80/60", {
				"text-xs": size === "sm",
				"text-sm": size === "md",
				"text-base": size === "lg"
			}, tabClassName),
			onClick: () => {
				if (!tab.disabled) {
					onTabChange?.(tab.key);
					tab.onClick?.();
				}
			},
			disabled: tab.disabled,
			children: [tab.icon && /* @__PURE__ */ jsx(tab.icon, { className: "size-4" }), tab.label]
		}, tab.key))
	});
}

//#endregion
//#region src/tabs/tabs.tsx
function Tabs(props) {
	const { tabs, storageKey, actions, defaultTab = tabs[0]?.key, containerClassName = "", tabListContainerClassName = "", tabListClassName = "", tabClassName = "", tabPanelClassName = "", size = "md", storeInLocalStorage = true } = props;
	const { storedValue, setValue } = useLocalStorage(storeInLocalStorage && storageKey ? `tab-${storageKey}` : `tab-${tabs[0]?.key}`, defaultTab);
	const [selectedTab, setSelectedTab] = useState(storedValue ?? defaultTab);
	useEffect(() => {
		if (storeInLocalStorage) setValue(selectedTab);
	}, [
		selectedTab,
		setValue,
		storeInLocalStorage,
		storageKey
	]);
	const currentTabIndex = (tabKey) => tabs.findIndex((tab) => tab.key === tabKey);
	const handleTabChange = (key) => {
		setSelectedTab(key);
	};
	return /* @__PURE__ */ jsx("div", {
		className: "flex flex-col w-full h-full",
		children: /* @__PURE__ */ jsx(Tab.Group, {
			defaultIndex: currentTabIndex(selectedTab),
			children: /* @__PURE__ */ jsxs("div", {
				className: cn("flex flex-col w-full h-full gap-2", containerClassName),
				children: [/* @__PURE__ */ jsxs("div", {
					className: cn("flex w-full items-center gap-4", tabListContainerClassName),
					children: [/* @__PURE__ */ jsx(TabList, {
						tabs,
						tabListClassName,
						tabClassName,
						size,
						onTabChange: handleTabChange
					}), actions && /* @__PURE__ */ jsx("div", {
						className: "flex-grow",
						children: actions
					})]
				}), /* @__PURE__ */ jsx(Tab.Panels, {
					as: Fragment,
					children: tabs.map((tab) => /* @__PURE__ */ jsx(Tab.Panel, {
						as: "div",
						className: cn("relative outline-none", tabPanelClassName),
						children: tab.content
					}, tab.key))
				})]
			})
		})
	});
}

//#endregion
//#region src/tag/helper.tsx
let ETagVariant = /* @__PURE__ */ function(ETagVariant$1) {
	ETagVariant$1["OUTLINED"] = "outlined";
	return ETagVariant$1;
}({});
let ETagSize = /* @__PURE__ */ function(ETagSize$1) {
	ETagSize$1["SM"] = "sm";
	ETagSize$1["LG"] = "lg";
	return ETagSize$1;
}({});
const containerStyle = { [ETagVariant.OUTLINED]: "flex items-center rounded-md border border-custom-border-200 text-xs text-custom-text-300 hover:text-custom-text-200 min-h-[36px] my-auto capitalize flex-wrap cursor-pointer gap-1.5" };
const sizes = {
	[ETagSize.SM]: "p-1.5",
	[ETagSize.LG]: "p-6"
};
const getTagStyle = (variant, size) => containerStyle[variant] + " " + sizes[size];

//#endregion
//#region src/tag/tag.tsx
const Tag = React$1.forwardRef(function Tag$1(props, ref) {
	const { variant = ETagVariant.OUTLINED, className = "", size = ETagSize.SM, children,...rest } = props;
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn(getTagStyle(variant, size), className),
		...rest,
		children
	});
});
Tag.displayName = "plane-ui-container";

//#endregion
//#region src/tooltip/tooltip.tsx
function Tooltip({ tooltipHeading, tooltipContent, position = "top", children, disabled = false, className = "", openDelay = 200, closeDelay, isMobile = false, renderByDefault = true }) {
	const toolTipRef = useRef(null);
	const [shouldRender, setShouldRender] = useState(renderByDefault);
	const onHover = () => {
		setShouldRender(true);
	};
	useEffect(() => {
		const element = toolTipRef.current;
		if (!element) return;
		element.addEventListener("mouseenter", onHover);
		return () => {
			element?.removeEventListener("mouseenter", onHover);
		};
	}, [toolTipRef, shouldRender]);
	if (!shouldRender) return /* @__PURE__ */ jsx("div", {
		ref: toolTipRef,
		className: "h-full flex items-center",
		children
	});
	return /* @__PURE__ */ jsx(Tooltip2, {
		disabled,
		hoverOpenDelay: openDelay,
		hoverCloseDelay: closeDelay,
		content: /* @__PURE__ */ jsxs("div", {
			className: cn("relative block z-50 max-w-xs gap-1 overflow-hidden break-words rounded-md bg-custom-background-100 p-2 text-xs text-custom-text-200 shadow-md", { hidden: isMobile }, className),
			children: [tooltipHeading && /* @__PURE__ */ jsx("h5", {
				className: "font-medium text-custom-text-100",
				children: tooltipHeading
			}), tooltipContent]
		}),
		position,
		renderTarget: ({ isOpen: isTooltipOpen, ref: eleReference,...tooltipProps }) => React.cloneElement(children, {
			ref: eleReference,
			...tooltipProps,
			...children.props
		})
	});
}

//#endregion
//#region src/typography/sub-heading.tsx
function SubHeading({ children, className, noMargin }) {
	return /* @__PURE__ */ jsx("h3", {
		className: cn("text-xl font-medium text-custom-text-200 block leading-7", !noMargin && "mb-2", className),
		children
	});
}

//#endregion
//#region src/billing/subscription.ts
const getSubscriptionTextColor = (planVariant, shade = "200") => {
	const subscriptionColors = {
		[EProductSubscriptionEnum.ONE]: {
			"200": "text-custom-subscription-one-200",
			"400": "text-custom-subscription-one-400"
		},
		[EProductSubscriptionEnum.PRO]: {
			"200": "text-custom-subscription-pro-200",
			"400": "text-custom-subscription-pro-400"
		},
		[EProductSubscriptionEnum.BUSINESS]: {
			"200": "text-custom-subscription-business-200",
			"400": "text-custom-subscription-business-400"
		},
		[EProductSubscriptionEnum.ENTERPRISE]: {
			"200": "text-custom-subscription-enterprise-200",
			"400": "text-custom-subscription-enterprise-400"
		},
		[EProductSubscriptionEnum.FREE]: {
			"200": "text-custom-subscription-free-200",
			"400": "text-custom-subscription-free-400"
		}
	};
	return subscriptionColors[planVariant]?.[shade] ?? subscriptionColors[EProductSubscriptionEnum.FREE][shade];
};
const getSubscriptionBackgroundColor = (planVariant, shade = "100") => {
	const subscriptionColors = {
		[EProductSubscriptionEnum.ONE]: {
			"50": "bg-custom-subscription-one-200/10",
			"100": "bg-custom-subscription-one-200/20",
			"200": "bg-custom-subscription-one-200",
			"400": "bg-custom-subscription-one-400"
		},
		[EProductSubscriptionEnum.PRO]: {
			"50": "bg-custom-subscription-pro-200/10",
			"100": "bg-custom-subscription-pro-200/20",
			"200": "bg-custom-subscription-pro-200",
			"400": "bg-custom-subscription-pro-400"
		},
		[EProductSubscriptionEnum.BUSINESS]: {
			"50": "bg-custom-subscription-business-200/10",
			"100": "bg-custom-subscription-business-200/20",
			"200": "bg-custom-subscription-business-200",
			"400": "bg-custom-subscription-business-400"
		},
		[EProductSubscriptionEnum.ENTERPRISE]: {
			"50": "bg-custom-subscription-enterprise-200/10",
			"100": "bg-custom-subscription-enterprise-200/20",
			"200": "bg-custom-subscription-enterprise-200",
			"400": "bg-custom-subscription-enterprise-400"
		},
		[EProductSubscriptionEnum.FREE]: {
			"50": "bg-custom-subscription-free-200/10",
			"100": "bg-custom-subscription-free-200/20",
			"200": "bg-custom-subscription-free-200",
			"400": "bg-custom-subscription-free-400"
		}
	};
	return subscriptionColors[planVariant]?.[shade] ?? subscriptionColors[EProductSubscriptionEnum.FREE][shade];
};
const getSubscriptionBorderColor = (planVariant, shade = "200") => {
	const subscriptionColors = {
		[EProductSubscriptionEnum.ONE]: {
			"200": "border-custom-subscription-one-200",
			"400": "border-custom-subscription-one-400"
		},
		[EProductSubscriptionEnum.PRO]: {
			"200": "border-custom-subscription-pro-200",
			"400": "border-custom-subscription-pro-400"
		},
		[EProductSubscriptionEnum.BUSINESS]: {
			"200": "border-custom-subscription-business-200",
			"400": "border-custom-subscription-business-400"
		},
		[EProductSubscriptionEnum.ENTERPRISE]: {
			"200": "border-custom-subscription-enterprise-200",
			"400": "border-custom-subscription-enterprise-400"
		},
		[EProductSubscriptionEnum.FREE]: {
			"200": "border-custom-subscription-free-200",
			"400": "border-custom-subscription-free-400"
		},
		default: "border-custom-subscription-free-400"
	};
	return subscriptionColors[planVariant]?.[shade] ?? subscriptionColors.default;
};
const getUpgradeButtonStyle = (planVariant, isDisabled) => {
	const COMMON_CLASSNAME = cn$1("border bg-custom-background-100", !isDisabled ? "hover:text-white hover:bg-gradient-to-br" : "", isDisabled ? "opacity-70 cursor-not-allowed" : "");
	switch (planVariant) {
		case EProductSubscriptionEnum.ENTERPRISE: return cn$1("text-custom-subscription-enterprise-200 from-custom-subscription-enterprise-200 to-custom-subscription-enterprise-400", getSubscriptionBorderColor(planVariant, "200"), COMMON_CLASSNAME);
		case EProductSubscriptionEnum.BUSINESS: return cn$1("text-custom-subscription-business-200 from-custom-subscription-business-200 to-custom-subscription-business-400", getSubscriptionBorderColor(planVariant, "200"), COMMON_CLASSNAME);
		case EProductSubscriptionEnum.PRO: return cn$1("text-custom-subscription-pro-200 from-custom-subscription-pro-200 to-custom-subscription-pro-400", getSubscriptionBorderColor(planVariant, "200"), COMMON_CLASSNAME);
		case EProductSubscriptionEnum.ONE: return cn$1("text-custom-subscription-one-200 from-custom-subscription-one-200 to-custom-subscription-one-400", getSubscriptionBorderColor(planVariant, "200"), COMMON_CLASSNAME);
		case EProductSubscriptionEnum.FREE:
		default: return cn$1("text-custom-subscription-free-200 from-custom-subscription-free-200 to-custom-subscription-free-400", getSubscriptionBorderColor(planVariant, "200"), COMMON_CLASSNAME);
	}
};
const getUpgradeCardVariantStyle = (planVariant) => {
	const COMMON_CLASSNAME = cn$1("bg-gradient-to-b from-0% to-40% border border-custom-border-200 rounded-xl");
	switch (planVariant) {
		case EProductSubscriptionEnum.ENTERPRISE: return cn$1("from-custom-subscription-enterprise-200/[0.14] to-transparent", COMMON_CLASSNAME);
		case EProductSubscriptionEnum.BUSINESS: return cn$1("from-custom-subscription-business-200/[0.14] to-transparent", COMMON_CLASSNAME);
		case EProductSubscriptionEnum.PRO: return cn$1("from-custom-subscription-pro-200/[0.14] to-transparent", COMMON_CLASSNAME);
		case EProductSubscriptionEnum.ONE: return cn$1("from-custom-subscription-one-200/[0.14] to-transparent", COMMON_CLASSNAME);
		case EProductSubscriptionEnum.FREE:
		default: return cn$1("from-custom-subscription-free-200/[0.14] to-transparent", COMMON_CLASSNAME);
	}
};
const getSuccessModalVariantStyle = (planVariant) => {
	const COMMON_CLASSNAME = cn$1("bg-gradient-to-b from-0% to-30% rounded-2xl");
	switch (planVariant) {
		case EProductSubscriptionEnum.ENTERPRISE: return cn$1("from-custom-subscription-enterprise-200/[0.14] to-transparent", COMMON_CLASSNAME);
		case EProductSubscriptionEnum.BUSINESS: return cn$1("from-custom-subscription-business-200/[0.14] to-transparent", COMMON_CLASSNAME);
		case EProductSubscriptionEnum.PRO: return cn$1("from-custom-subscription-pro-200/[0.14] to-transparent", COMMON_CLASSNAME);
		case EProductSubscriptionEnum.ONE: return cn$1("from-custom-subscription-one-200/[0.14] to-transparent", COMMON_CLASSNAME);
		case EProductSubscriptionEnum.FREE:
		default: return cn$1("from-custom-subscription-free-200/[0.14] to-transparent", COMMON_CLASSNAME);
	}
};
const getBillingAndPlansCardVariantStyle = (planVariant) => {
	const COMMON_CLASSNAME = cn$1("bg-gradient-to-b from-0% to-50%");
	switch (planVariant) {
		case EProductSubscriptionEnum.ENTERPRISE: return cn$1("from-custom-subscription-enterprise-200/[0.14] to-transparent", COMMON_CLASSNAME);
		case EProductSubscriptionEnum.BUSINESS: return cn$1("from-custom-subscription-business-200/[0.14] to-transparent", COMMON_CLASSNAME);
		case EProductSubscriptionEnum.PRO: return cn$1("from-custom-subscription-pro-200/[0.14] to-transparent", COMMON_CLASSNAME);
		case EProductSubscriptionEnum.ONE: return cn$1("from-custom-subscription-one-200/[0.14] to-transparent", COMMON_CLASSNAME);
		case EProductSubscriptionEnum.FREE:
		default: return cn$1("from-custom-subscription-free-200/[0.14] to-transparent", COMMON_CLASSNAME);
	}
};
const getSubscriptionTextAndBackgroundColor = (planVariant) => cn$1(getSubscriptionTextColor(planVariant), getSubscriptionBackgroundColor(planVariant));
const getDiscountPillStyle = (planVariant) => cn$1(getSubscriptionBackgroundColor(planVariant, "200"), "text-white");

//#endregion
//#region src/oauth/oauth-button.tsx
const OAuthButton = React$1.forwardRef(function OAuthButton$1(props, ref) {
	const { text, icon, compact = false, className = "",...rest } = props;
	return /* @__PURE__ */ jsxs("button", {
		ref,
		className: cn("flex h-9 w-full items-center justify-center gap-2 rounded-md border border-custom-border-300 px-4 py-2.5 text-sm font-medium text-custom-text-100 duration-300 bg-onboarding-background-200 hover:bg-onboarding-background-300", className),
		...rest,
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex flex-shrink-0 items-center justify-center",
			children: icon
		}), !compact && /* @__PURE__ */ jsx("div", {
			className: "flex flex-grow items-center justify-center transition-opacity duration-300",
			children: text
		})]
	});
});
OAuthButton.displayName = "plane-ui-oauth-button";

//#endregion
//#region src/oauth/oauth-options.tsx
function OAuthOptions(props) {
	const { options, compact = false, className = "", containerClassName = "" } = props;
	const enabledOptions = options.filter((option) => option.enabled !== false);
	if (enabledOptions.length === 0) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: cn("w-full", containerClassName),
		children: [/* @__PURE__ */ jsx("div", {
			className: cn("flex gap-4 overflow-hidden transition-all duration-500 ease-in-out", compact ? "flex-row" : "flex-col", className),
			children: enabledOptions.map((option) => /* @__PURE__ */ jsx(OAuthButton, {
				text: option.text,
				icon: option.icon,
				onClick: option.onClick,
				compact,
				className: "transition-all duration-300 ease-in-out"
			}, option.id))
		}), /* @__PURE__ */ jsxs("div", {
			className: "mt-4 flex items-center transition-all duration-300",
			children: [
				/* @__PURE__ */ jsx("hr", { className: "w-full border-custom-border-300 transition-colors duration-300" }),
				/* @__PURE__ */ jsx("p", {
					className: "mx-3 flex-shrink-0 text-center text-sm text-custom-text-400 transition-colors duration-300",
					children: "or"
				}),
				/* @__PURE__ */ jsx("hr", { className: "w-full border-custom-border-300 transition-colors duration-300" })
			]
		})]
	});
}

//#endregion
export { AlertModalCore, Avatar, AvatarGroup, Badge, BreadcrumbIcon, BreadcrumbItem, BreadcrumbItemLoader, BreadcrumbItemWrapper, BreadcrumbLabel, BreadcrumbNavigationDropdown, BreadcrumbNavigationSearchDropdown, BreadcrumbSeparator, Breadcrumbs, Button, Card, Checkbox, CircularBarSpinner, CircularProgressIndicator, Collapsible, CollapsibleButton, ColorPicker, ComboDropDown, ComboInput, ComboOption, ComboOptions, ContentWrapper, ContextMenu, ContextMenuContext, ContextMenuItem, ControlLink, CustomMenu, CustomSearchSelect, CustomSelect, DragHandle, Draggable, DropIndicator, Dropdown, DropdownButton, DropdownOptions, DropdownOptionsLoader, ECardDirection, ECardSpacing, ECardVariant, EHeaderVariant, EModalPosition, EModalWidth, ERowVariant, ETagSize, ETagVariant, FavoriteStar, FormField, Header, Input, InputColorPicker, InputSearch, LUCIDE_ICONS_LIST, Label, LinearProgressIndicator, LinkItemBlock, Loader, MATERIAL_ICONS_LIST, ModalCore, MultiSelectDropdown, OAuthOptions, PasswordInput, PasswordStrengthIndicator, Popover, PopoverMenu, Portal, ProgressBar, RadialProgressBar, Row, ScrollArea, Sortable, Spinner, SubHeading, TabList, Table, Tabs, Tag, TextArea, ToggleSwitch, Tooltip, ValidationMessage, buttonStyling, cn, getBillingAndPlansCardVariantStyle, getBorderRadius, getButtonStyling, getDiscountPillStyle, getFragmentColor, getIconStyling, getRandomIconName, getSizeInfo, getStrengthInfo, getSubscriptionBackgroundColor, getSubscriptionBorderColor, getSubscriptionTextAndBackgroundColor, getSubscriptionTextColor, getSuccessModalVariantStyle, getUpgradeButtonStyle, getUpgradeCardVariantStyle, isAValidNumber };
//# sourceMappingURL=index.js.map