import { t as cn } from "./classname-iNHf9Pb8.js";
import { t as convertPlacementToSideAndAlign } from "./placement-Db9Qu3XD.js";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Tooltip } from "@base-ui-components/react/tooltip";

//#region src/tooltip/root.tsx
function Tooltip$1(props) {
	const { tooltipHeading, tooltipContent, position = "top", children, disabled = false, className = "", openDelay = 200, side = "bottom", align = "center", sideOffset = 10, closeDelay, isMobile = false } = props;
	const { finalSide, finalAlign } = React$1.useMemo(() => {
		if (position) {
			const converted = convertPlacementToSideAndAlign(position);
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
		position,
		side,
		align
	]);
	return /* @__PURE__ */ jsx(Tooltip.Provider, { children: /* @__PURE__ */ jsxs(Tooltip.Root, {
		delay: openDelay,
		closeDelay,
		disabled,
		children: [/* @__PURE__ */ jsx(Tooltip.Trigger, { render: children }), /* @__PURE__ */ jsx(Tooltip.Portal, { children: /* @__PURE__ */ jsx(Tooltip.Positioner, {
			className: cn("z-tooltip max-w-xs gap-1 overflow-hidden break-words rounded-md bg-custom-background-100 p-2 text-xs text-custom-text-200 shadow-custom-shadow-xs", { hidden: isMobile }, className),
			side: finalSide,
			sideOffset,
			align: finalAlign,
			render: /* @__PURE__ */ jsxs(Tooltip.Popup, { children: [tooltipHeading && /* @__PURE__ */ jsx("h5", {
				className: "font-medium text-custom-text-100",
				children: tooltipHeading
			}), tooltipContent && tooltipContent] })
		}) })]
	}) });
}

//#endregion
export { Tooltip$1 as t };
//# sourceMappingURL=tooltip-B1dEWWz7.js.map