import { t as cn } from "./classname-iNHf9Pb8.js";
import * as React$1 from "react";
import { jsx } from "react/jsx-runtime";

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
const DEFAULT_STYLE = "bg-custom-background-100 rounded-lg border-[0.5px] border-custom-border-200 w-full flex flex-col";
const containerStyle = {
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
const getCardStyle = (variant, spacing, direction) => DEFAULT_STYLE + " " + directions[direction] + " " + containerStyle[variant] + " " + spacings[spacing];

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
export { ECardVariant as i, ECardDirection as n, ECardSpacing as r, Card as t };
//# sourceMappingURL=card-DKs_swY2.js.map