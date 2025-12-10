import { t as cn } from "./classname-iNHf9Pb8.js";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";

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
export { getIconStyling as i, buttonStyling as n, getButtonStyling as r, Button as t };
//# sourceMappingURL=button-CJES52DI.js.map