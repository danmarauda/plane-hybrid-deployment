import { t as convertPlacementToSideAndAlign } from "./placement-Db9Qu3XD.js";
import { memo, useMemo } from "react";
import { jsx } from "react/jsx-runtime";
import { Popover } from "@base-ui-components/react/popover";

//#region src/popover/root.tsx
const PopoverContent = memo(function PopoverContent$1({ children, className, placement, side = "bottom", align = "center", sideOffset = 8, containerRef, positionerClassName,...props }) {
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
	return /* @__PURE__ */ jsx(PopoverPortal, {
		container: containerRef?.current,
		children: /* @__PURE__ */ jsx(PopoverPositioner, {
			side: finalSide,
			sideOffset,
			align: finalAlign,
			className: positionerClassName,
			children: /* @__PURE__ */ jsx(Popover.Popup, {
				"data-slot": "popover-content",
				className,
				...props,
				children
			})
		})
	});
});
const PopoverTrigger = memo(function PopoverTrigger$1(props) {
	return /* @__PURE__ */ jsx(Popover.Trigger, {
		"data-slot": "popover-trigger",
		...props
	});
});
const PopoverPortal = memo(function PopoverPortal$1(props) {
	return /* @__PURE__ */ jsx(Popover.Portal, {
		"data-slot": "popover-portal",
		...props
	});
});
const PopoverPositioner = memo(function PopoverPositioner$1(props) {
	return /* @__PURE__ */ jsx(Popover.Positioner, {
		"data-slot": "popover-positioner",
		...props
	});
});
const Popover$1 = Object.assign(memo(function Popover$2(props) {
	return /* @__PURE__ */ jsx(Popover.Root, {
		"data-slot": "popover",
		...props
	});
}), {
	Button: PopoverTrigger,
	Panel: PopoverContent
});
PopoverContent.displayName = "PopoverContent";
Popover$1.displayName = "Popover";
PopoverPortal.displayName = "PopoverPortal";
PopoverTrigger.displayName = "PopoverTrigger";
PopoverPositioner.displayName = "PopoverPositioner";

//#endregion
export { Popover$1 as t };
//# sourceMappingURL=popover-C2bLVK6Y.js.map