import { t as cn } from "./classname-iNHf9Pb8.js";
import React from "react";
import { jsx, jsxs } from "react/jsx-runtime";

//#region src/charts/components/legend.tsx
const getLegendProps = (args) => {
	const { align, layout, verticalAlign } = args;
	return {
		layout,
		align,
		verticalAlign,
		wrapperStyle: {
			display: "flex",
			overflow: "hidden",
			...layout === "vertical" ? {
				top: 0,
				alignItems: "center",
				height: "100%"
			} : {
				left: 0,
				bottom: 0,
				width: "100%",
				justifyContent: "center"
			},
			...args.wrapperStyles
		},
		content: /* @__PURE__ */ jsx(CustomLegend, { ...args })
	};
};
const CustomLegend = React.forwardRef(function CustomLegend$1(props, ref) {
	const { formatter, layout, onClick, onMouseEnter, onMouseLeave, payload } = props;
	if (!payload?.length) return null;
	return /* @__PURE__ */ jsx("div", {
		ref,
		className: cn("flex items-center px-4 overflow-scroll vertical-scrollbar scrollbar-sm", { "max-h-full flex-col items-start py-4": layout === "vertical" }),
		children: payload.map((item, index) => /* @__PURE__ */ jsxs("div", {
			className: cn("flex items-center gap-1.5 text-custom-text-300 text-sm font-medium whitespace-nowrap", {
				"px-2": layout === "horizontal",
				"py-2": layout === "vertical",
				"pl-0 pt-0": index === 0,
				"pr-0 pb-0": index === payload.length - 1,
				"cursor-pointer": !!props.onClick
			}),
			onClick: (e) => onClick?.(item, index, e),
			onMouseEnter: (e) => onMouseEnter?.(item, index, e),
			onMouseLeave: (e) => onMouseLeave?.(item, index, e),
			children: [/* @__PURE__ */ jsx("div", {
				className: "flex-shrink-0 size-2 rounded-sm",
				style: { backgroundColor: item.color }
			}), formatter?.(item.value, { value: item.value }, index) ?? item.payload?.name]
		}, item.value))
	});
});
CustomLegend.displayName = "CustomLegend";

//#endregion
export { getLegendProps as t };
//# sourceMappingURL=legend-Dn3oeCjV.js.map