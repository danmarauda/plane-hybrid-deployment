import { t as cn } from "../classname-iNHf9Pb8.js";
import "../placement-Db9Qu3XD.js";
import "../utils-MPqvUdqq.js";
import { t as Tooltip } from "../tooltip-B1dEWWz7.js";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";

//#region src/toolbar/toolbar.tsx
const ToolbarRoot = React$1.forwardRef(function ToolbarRoot$1({ className, children,...props }, ref) {
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn("flex h-9 w-full items-stretch gap-1.5 bg-custom-background-90 overflow-x-scroll", className),
		...props,
		children
	});
});
const ToolbarGroup = React$1.forwardRef(function ToolbarGroup$1({ className, children, isFirst = false,...props }, ref) {
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn("flex items-stretch gap-0.5 border-r border-custom-border-200 px-2.5", { "pl-0": isFirst }, className),
		...props,
		children
	});
});
const ToolbarItem = React$1.forwardRef(function ToolbarItem$1({ icon: Icon, isActive = false, tooltip, shortcut, className, children,...props }, ref) {
	const button = /* @__PURE__ */ jsxs("button", {
		ref,
		type: "button",
		className: cn("grid place-items-center aspect-square rounded-sm p-0.5 text-custom-text-400 hover:bg-custom-background-80 transition-colors", { "bg-custom-background-80 text-custom-text-100": isActive }, className),
		...props,
		children: [/* @__PURE__ */ jsx(Icon, {
			className: cn("h-3.5 w-3.5", { "text-custom-text-100": isActive }),
			strokeWidth: 2.5
		}), children]
	});
	if (tooltip) return /* @__PURE__ */ jsx(Tooltip, {
		tooltipContent: /* @__PURE__ */ jsxs("div", {
			className: "flex flex-col gap-1 text-center text-xs",
			children: [/* @__PURE__ */ jsx("span", {
				className: "font-medium",
				children: tooltip
			}), shortcut && /* @__PURE__ */ jsx("kbd", {
				className: "text-custom-text-400",
				children: shortcut.join(" + ")
			})]
		}),
		children: button
	});
	return button;
});
const ToolbarSeparator = React$1.forwardRef(function ToolbarSeparator$1({ className,...props }, ref) {
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn("h-full w-px bg-custom-border-200 mx-1", className),
		...props
	});
});
const buttonVariants = {
	primary: "bg-custom-primary-100 text-white hover:bg-custom-primary-200 focus:bg-custom-primary-200",
	secondary: "bg-custom-background-100 text-custom-text-200 border border-custom-border-200 hover:bg-custom-background-90 focus:bg-custom-background-90",
	outline: "border border-custom-primary-100 text-custom-primary-100 bg-transparent hover:bg-custom-primary-100/10 focus:bg-custom-primary-100/20",
	ghost: "text-custom-text-200 hover:bg-custom-background-90 focus:bg-custom-background-90",
	destructive: "bg-red-500 text-white hover:bg-red-600 focus:bg-red-600"
};
const ToolbarSubmitButton = React$1.forwardRef(function ToolbarSubmitButton$1({ loading = false, variant = "primary", className, children, disabled,...props }, ref) {
	return /* @__PURE__ */ jsx("div", {
		className: "sticky right-1",
		children: /* @__PURE__ */ jsxs("button", {
			ref,
			className: cn("inline-flex items-center justify-center gap-2 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors duration-200", "focus:outline-none focus:ring-2 focus:ring-custom-primary-100/20 focus:ring-offset-2", "disabled:opacity-50 disabled:pointer-events-none", buttonVariants[variant], className),
			disabled: disabled || loading,
			...props,
			children: [loading && /* @__PURE__ */ jsx("div", { className: "h-3 w-3 animate-spin rounded-full border border-current border-t-transparent" }), children]
		})
	});
});
ToolbarRoot.displayName = "ToolbarRoot";
ToolbarGroup.displayName = "ToolbarGroup";
ToolbarItem.displayName = "ToolbarItem";
ToolbarSeparator.displayName = "ToolbarSeparator";
ToolbarSubmitButton.displayName = "ToolbarSubmitButton";
const Toolbar = Object.assign(ToolbarRoot, {
	Group: ToolbarGroup,
	Item: ToolbarItem,
	Separator: ToolbarSeparator,
	SubmitButton: ToolbarSubmitButton
});

//#endregion
export { Toolbar };
//# sourceMappingURL=index.js.map