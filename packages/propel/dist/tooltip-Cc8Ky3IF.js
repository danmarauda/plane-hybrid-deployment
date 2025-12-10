import { t as cn } from "./classname-iNHf9Pb8.js";
import { r as ECardSpacing, t as Card } from "./card-DKs_swY2.js";
import React from "react";
import { jsx, jsxs } from "react/jsx-runtime";

//#region src/charts/components/tick.tsx
const AXIS_TICK_CLASSNAME = "fill-custom-text-300 text-sm";
const CustomXAxisTick = React.memo(function CustomXAxisTick$1({ x, y, payload, getLabel }) {
	return /* @__PURE__ */ jsx("g", {
		transform: `translate(${x},${y})`,
		children: /* @__PURE__ */ jsx("text", {
			y: 0,
			dy: 16,
			textAnchor: "middle",
			className: AXIS_TICK_CLASSNAME,
			children: getLabel ? getLabel(payload.value) : payload.value
		})
	});
});
CustomXAxisTick.displayName = "CustomXAxisTick";
const CustomYAxisTick = React.memo(function CustomYAxisTick$1({ x, y, payload }) {
	return /* @__PURE__ */ jsx("g", {
		transform: `translate(${x},${y})`,
		children: /* @__PURE__ */ jsx("text", {
			dx: -10,
			textAnchor: "middle",
			className: AXIS_TICK_CLASSNAME,
			children: payload.value
		})
	});
});
CustomYAxisTick.displayName = "CustomYAxisTick";
const CustomRadarAxisTick = React.memo(function CustomRadarAxisTick$1({ x, y, payload, getLabel, cx, cy, offset = 16 }) {
	const dx = x - cx;
	const dy = y - cy;
	const length = Math.sqrt(dx * dx + dy * dy);
	const normX = dx / length;
	const normY = dy / length;
	return /* @__PURE__ */ jsx("g", {
		transform: `translate(${x + normX * offset},${y + normY * offset})`,
		children: /* @__PURE__ */ jsx("text", {
			y: 0,
			textAnchor: "middle",
			className: AXIS_TICK_CLASSNAME,
			children: getLabel ? getLabel(payload.value) : payload.value
		})
	});
});
CustomRadarAxisTick.displayName = "CustomRadarAxisTick";

//#endregion
//#region src/charts/components/tooltip.tsx
const CustomTooltip = React.memo(function CustomTooltip$1(props) {
	const { active, activeKey, label, payload, itemKeys, itemLabels, itemDotColors } = props;
	const filteredPayload = payload?.filter((item) => item.dataKey && itemKeys.includes(`${item.dataKey}`));
	if (!active || !filteredPayload || !filteredPayload.length) return null;
	return /* @__PURE__ */ jsxs(Card, {
		className: "flex flex-col max-h-[40vh] w-[12rem] overflow-y-scroll vertical-scrollbar scrollbar-sm",
		spacing: ECardSpacing.SM,
		children: [/* @__PURE__ */ jsx("p", {
			className: "flex-shrink-0 text-xs text-custom-text-100 font-medium border-b border-custom-border-200 pb-2 truncate",
			children: label
		}), filteredPayload.map((item) => {
			if (!item.dataKey) return null;
			return /* @__PURE__ */ jsxs("div", {
				className: cn("flex items-center gap-2 text-xs transition-opacity", { "opacity-20": activeKey && item.dataKey !== activeKey }),
				children: [/* @__PURE__ */ jsxs("div", {
					className: "flex items-center gap-2 truncate",
					children: [itemDotColors[item?.dataKey] && /* @__PURE__ */ jsx("div", {
						className: "flex-shrink-0 size-2 rounded-sm",
						style: { backgroundColor: itemDotColors[item?.dataKey] }
					}), /* @__PURE__ */ jsxs("span", {
						className: "text-custom-text-300 truncate",
						children: [itemLabels[item?.dataKey], ":"]
					})]
				}), /* @__PURE__ */ jsx("span", {
					className: "flex-shrink-0 font-medium text-custom-text-200",
					children: item?.value
				})]
			}, item?.dataKey);
		})]
	});
});
CustomTooltip.displayName = "CustomTooltip";

//#endregion
export { CustomYAxisTick as i, CustomRadarAxisTick as n, CustomXAxisTick as r, CustomTooltip as t };
//# sourceMappingURL=tooltip-Cc8Ky3IF.js.map