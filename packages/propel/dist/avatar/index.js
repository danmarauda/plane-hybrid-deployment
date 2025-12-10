import { t as cn } from "../classname-iNHf9Pb8.js";
import React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Avatar as Avatar$1 } from "@base-ui-components/react/avatar";

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
const isAValidNumber = (value) => typeof value === "number" && !Number.isNaN(value);
function Avatar(props) {
	const { name, fallbackBackgroundColor, fallbackText, fallbackTextColor, size = "md", shape = "circle", src, className = "" } = props;
	const sizeInfo = getSizeInfo(size);
	const fallbackLetter = name?.[0]?.toUpperCase() ?? fallbackText ?? "?";
	return /* @__PURE__ */ jsx("div", {
		className: cn("grid place-items-center overflow-hidden", getBorderRadius(shape), { [sizeInfo.avatarSize]: !isAValidNumber(size) }),
		tabIndex: -1,
		children: /* @__PURE__ */ jsxs(Avatar$1.Root, {
			className: cn("h-full w-full", getBorderRadius(shape), className),
			children: [/* @__PURE__ */ jsx(Avatar$1.Image, {
				src,
				width: "48",
				height: "48"
			}), /* @__PURE__ */ jsx(Avatar$1.Fallback, {
				className: cn(sizeInfo.fontSize, "grid h-full w-full place-items-center", getBorderRadius(shape), className),
				style: {
					backgroundColor: fallbackBackgroundColor ?? "rgba(var(--color-primary-500))",
					color: fallbackTextColor ?? "#ffffff"
				},
				children: fallbackLetter
			})]
		})
	});
}

//#endregion
export { Avatar, getBorderRadius, getSizeInfo, isAValidNumber };
//# sourceMappingURL=index.js.map