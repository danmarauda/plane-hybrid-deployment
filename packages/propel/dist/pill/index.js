import { t as cn } from "../classname-iNHf9Pb8.js";
import "../placement-Db9Qu3XD.js";
import "../utils-MPqvUdqq.js";
import * as React$1 from "react";
import { jsx } from "react/jsx-runtime";

//#region src/pill/pill.tsx
let EPillVariant = /* @__PURE__ */ function(EPillVariant$1) {
	EPillVariant$1["DEFAULT"] = "default";
	EPillVariant$1["PRIMARY"] = "primary";
	EPillVariant$1["SUCCESS"] = "success";
	EPillVariant$1["WARNING"] = "warning";
	EPillVariant$1["ERROR"] = "error";
	EPillVariant$1["INFO"] = "info";
	return EPillVariant$1;
}({});
let EPillSize = /* @__PURE__ */ function(EPillSize$1) {
	EPillSize$1["SM"] = "sm";
	EPillSize$1["MD"] = "md";
	EPillSize$1["LG"] = "lg";
	EPillSize$1["XS"] = "xs";
	return EPillSize$1;
}({});
const pillVariants = {
	[EPillVariant.DEFAULT]: "bg-custom-background-90 text-custom-text-200 border border-custom-border-200",
	[EPillVariant.PRIMARY]: "bg-custom-primary-100/10 text-custom-primary-100 border border-custom-primary-100/20",
	[EPillVariant.SUCCESS]: "bg-green-50 text-green-700 border border-green-200",
	[EPillVariant.WARNING]: "bg-amber-50 text-amber-700 border border-amber-200",
	[EPillVariant.ERROR]: "bg-red-50 text-red-700 border border-red-200",
	[EPillVariant.INFO]: "bg-blue-50 text-blue-700 border border-blue-200"
};
const pillSizes = {
	[EPillSize.XS]: "px-1.5 py-0.5 text-xs",
	[EPillSize.SM]: "px-2 py-0.5 text-xs",
	[EPillSize.MD]: "px-2.5 py-1 text-sm",
	[EPillSize.LG]: "px-3 py-1.5 text-base"
};
const Pill = React$1.forwardRef(function Pill$1({ variant = EPillVariant.DEFAULT, size = EPillSize.MD, className, children,...props }, ref) {
	return /* @__PURE__ */ jsx("span", {
		ref,
		className: cn("inline-flex items-center justify-center rounded-full font-medium whitespace-nowrap", pillVariants[variant], pillSizes[size], className),
		...props,
		children
	});
});
Pill.displayName = "Pill";

//#endregion
export { EPillSize, EPillVariant, Pill };
//# sourceMappingURL=index.js.map