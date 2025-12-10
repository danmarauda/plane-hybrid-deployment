import { t as cn } from "../classname-iNHf9Pb8.js";
import "../placement-Db9Qu3XD.js";
import "../utils-MPqvUdqq.js";
import React from "react";
import { jsx, jsxs } from "react/jsx-runtime";

//#region src/banner/helper.tsx
const bannerSizeStyling = {
	container: "py-3 px-6 h-12",
	icon: "w-5 h-5",
	title: "text-sm",
	action: "gap-2"
};
const bannerStyling = {
	success: "bg-green-500/10",
	error: "bg-red-500/10",
	warning: "bg-yellow-500/10",
	info: "bg-blue-500/10"
};
const bannerBaseStyles = "flex items-center justify-between w-full transition-all duration-200";
const getBannerStyling = (variant) => {
	return `${bannerBaseStyles} ${bannerStyling[variant]} ${bannerSizeStyling.container}`;
};
const getBannerTitleStyling = () => `font-medium text-custom-text-200 flex-1 min-w-0 ${bannerSizeStyling.title}`;
const getBannerActionStyling = () => `flex items-center flex-shrink-0 ${bannerSizeStyling.action}`;
const getBannerDismissStyling = () => "rounded p-1 hover:bg-custom-background-90 transition-colors flex-shrink-0";
const getBannerDismissIconStyling = () => "text-custom-text-200";

//#endregion
//#region src/banner/banner.tsx
const Banner = React.forwardRef(function Banner$1({ icon, title, action, variant = "info", dismissible = false, onDismiss, visible = true, animationDuration = 200, className, children,...props }, ref) {
	const handleDismiss = () => {
		if (onDismiss) onDismiss();
	};
	if (!visible) return null;
	const containerStyling = getBannerStyling(variant);
	const iconStyling = "flex items-center justify-center flex-shrink-0 size-5";
	const titleStyling = getBannerTitleStyling();
	const actionStyling = getBannerActionStyling();
	const dismissStyling = getBannerDismissStyling();
	const dismissIconStyling = getBannerDismissIconStyling();
	const renderIcon = () => {
		if (icon) return /* @__PURE__ */ jsx("div", {
			className: cn(iconStyling),
			children: icon
		});
		return null;
	};
	const renderDismissButton = () => {
		if (!dismissible) return null;
		return /* @__PURE__ */ jsx("button", {
			onClick: handleDismiss,
			className: cn(dismissStyling),
			"aria-label": "Dismiss banner",
			children: /* @__PURE__ */ jsxs("svg", {
				width: "16",
				height: "16",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				className: cn(dismissIconStyling),
				children: [/* @__PURE__ */ jsx("line", {
					x1: "18",
					y1: "6",
					x2: "6",
					y2: "18"
				}), /* @__PURE__ */ jsx("line", {
					x1: "6",
					y1: "6",
					x2: "18",
					y2: "18"
				})]
			})
		});
	};
	return /* @__PURE__ */ jsxs("div", {
		ref,
		className: cn(containerStyling, className),
		style: { transitionDuration: `${animationDuration}ms` },
		...props,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-3 flex-1 min-w-0",
			children: [
				renderIcon(),
				title && /* @__PURE__ */ jsx("div", {
					className: cn(titleStyling),
					children: title
				}),
				children
			]
		}), (action || dismissible) && /* @__PURE__ */ jsxs("div", {
			className: cn(actionStyling),
			children: [action, renderDismissButton()]
		})]
	});
});
Banner.displayName = "Banner";

//#endregion
export { Banner };
//# sourceMappingURL=index.js.map