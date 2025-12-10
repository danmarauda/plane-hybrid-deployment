import { t as cn } from "../classname-iNHf9Pb8.js";
import "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Switch as Switch$1 } from "@base-ui-components/react/switch";

//#region src/switch/root.tsx
function Switch({ value, onChange, label, size = "sm", disabled, className }) {
	return /* @__PURE__ */ jsxs(Switch$1.Root, {
		checked: value,
		disabled,
		onCheckedChange: onChange,
		"aria-label": label,
		className: cn("relative inline-flex flex-shrink-0 cursor-pointer rounded-full border border-custom-border-200 transition-colors duration-200 ease-in-out focus:outline-none", size === "sm" ? "h-4 w-6" : size === "md" ? "h-5 w-8" : "h-6 w-10", disabled ? "cursor-not-allowed bg-custom-background-80" : value ? "cursor-pointer bg-custom-primary-100" : "cursor-pointer bg-custom-background-90", className),
		children: [label && /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: label
		}), /* @__PURE__ */ jsx(Switch$1.Thumb, {
			"aria-hidden": "true",
			className: cn("inline-block self-center rounded-full shadow ring-0 transition-transform duration-200 ease-in-out", size === "sm" ? "h-3 w-3" : size === "md" ? "h-4 w-4" : "h-5 w-5", value ? size === "sm" ? "translate-x-3 bg-white" : size === "md" ? "translate-x-4 bg-white" : "translate-x-5 bg-white" : "translate-x-0.5 bg-custom-background-90", disabled && "cursor-not-allowed bg-custom-background-90")
		})]
	});
}
Switch.displayName = "plane-ui-switch";

//#endregion
export { Switch };
//# sourceMappingURL=index.js.map