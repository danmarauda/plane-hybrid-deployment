import "../../classname-iNHf9Pb8.js";
import { r as ECardSpacing, t as Card } from "../../card-DKs_swY2.js";
import { t as getLegendProps } from "../../legend-Dn3oeCjV.js";
import React, { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Cell, Label, Legend, Pie, PieChart as PieChart$1, ResponsiveContainer, Sector, Tooltip } from "recharts";

//#region src/charts/pie-chart/active-shape.tsx
const CustomActiveShape = React.memo(function CustomActiveShape$1(props) {
	const { cx, cy, cornerRadius, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
	return /* @__PURE__ */ jsxs("g", { children: [/* @__PURE__ */ jsx(Sector, {
		cx,
		cy,
		innerRadius,
		outerRadius,
		cornerRadius,
		startAngle,
		endAngle,
		fill
	}), /* @__PURE__ */ jsx(Sector, {
		cx,
		cy,
		startAngle,
		endAngle,
		cornerRadius,
		innerRadius: (outerRadius ?? 0) + 6,
		outerRadius: (outerRadius ?? 0) + 10,
		fill
	})] });
});

//#endregion
//#region src/charts/pie-chart/tooltip.tsx
const CustomPieChartTooltip = React.memo(function CustomPieChartTooltip$1(props) {
	const { dotColor, label, payload } = props;
	return /* @__PURE__ */ jsxs(Card, {
		className: "flex flex-col max-h-[40vh] w-[12rem] overflow-y-scroll vertical-scrollbar scrollbar-sm",
		spacing: ECardSpacing.SM,
		children: [/* @__PURE__ */ jsx("p", {
			className: "flex-shrink-0 text-xs text-custom-text-100 font-medium border-b border-custom-border-200 pb-2 truncate",
			children: label
		}), payload?.map((item) => /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2 text-xs capitalize",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2 truncate",
				children: [/* @__PURE__ */ jsx("div", {
					className: "flex-shrink-0 size-2 rounded-sm",
					style: { backgroundColor: dotColor }
				}), /* @__PURE__ */ jsxs("span", {
					className: "text-custom-text-300 truncate",
					children: [item?.name, ":"]
				})]
			}), /* @__PURE__ */ jsx("span", {
				className: "flex-shrink-0 font-medium text-custom-text-200",
				children: item?.value
			})]
		}, item?.dataKey))]
	});
});
CustomPieChartTooltip.displayName = "CustomPieChartTooltip";

//#endregion
//#region src/charts/pie-chart/root.tsx
const PieChart = React.memo(function PieChart$2(props) {
	const { data, dataKey, cells, className, innerRadius, legend, margin, outerRadius, showTooltip = true, showLabel, customLabel, centerLabel, cornerRadius, paddingAngle, tooltipLabel } = props;
	const [activeIndex, setActiveIndex] = useState(null);
	const [activeLegend, setActiveLegend] = useState(null);
	const renderCells = useMemo(() => cells.map((cell, index) => /* @__PURE__ */ jsx(Cell, {
		className: "transition-opacity duration-200",
		fill: cell.fill,
		opacity: !!activeLegend && activeLegend !== cell.key ? .1 : 1,
		style: { outline: "none" },
		onMouseEnter: () => setActiveIndex(index),
		onMouseLeave: () => setActiveIndex(null)
	}, cell.key)), [activeLegend, cells]);
	return /* @__PURE__ */ jsx("div", {
		className,
		children: /* @__PURE__ */ jsx(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ jsxs(PieChart$1, {
				data,
				margin: {
					top: margin?.top === void 0 ? 5 : margin.top,
					right: margin?.right === void 0 ? 30 : margin.right,
					bottom: margin?.bottom === void 0 ? 5 : margin.bottom,
					left: margin?.left === void 0 ? 20 : margin.left
				},
				children: [
					/* @__PURE__ */ jsxs(Pie, {
						activeIndex: activeIndex === null ? void 0 : activeIndex,
						onMouseLeave: () => setActiveIndex(null),
						data,
						dataKey,
						cx: "50%",
						cy: "50%",
						blendStroke: true,
						activeShape: /* @__PURE__ */ jsx(CustomActiveShape, {}),
						innerRadius,
						outerRadius,
						cornerRadius,
						paddingAngle,
						labelLine: false,
						label: showLabel ? ({ payload,...props$1 }) => /* @__PURE__ */ jsx("text", {
							className: "text-sm font-medium transition-opacity duration-200",
							cx: props$1.cx,
							cy: props$1.cy,
							x: props$1.x,
							y: props$1.y,
							textAnchor: props$1.textAnchor,
							dominantBaseline: props$1.dominantBaseline,
							fill: "rgba(var(--color-text-200))",
							opacity: !!activeLegend && activeLegend !== payload.key ? .1 : 1,
							children: customLabel?.(payload.count) ?? payload.count
						}) : void 0,
						children: [renderCells, centerLabel && /* @__PURE__ */ jsx(Label, {
							value: centerLabel.text,
							fill: centerLabel.fill,
							position: "center",
							opacity: activeLegend ? .1 : 1,
							style: centerLabel.style,
							className: centerLabel.className
						})]
					}),
					legend && /* @__PURE__ */ jsx(Legend, {
						onMouseEnter: (payload) => {
							const key = payload.payload?.key;
							if (!key) return;
							setActiveLegend(key);
							setActiveIndex(null);
						},
						onMouseLeave: () => setActiveLegend(null),
						...getLegendProps(legend)
					}),
					showTooltip && /* @__PURE__ */ jsx(Tooltip, {
						cursor: {
							fill: "currentColor",
							className: "text-custom-background-90/80 cursor-pointer"
						},
						wrapperStyle: { pointerEvents: "none" },
						content: ({ active, payload }) => {
							if (!active || !payload || !payload.length) return null;
							const cellData = cells.find((c) => c.key === payload[0].payload.key);
							if (!cellData) return null;
							const label = tooltipLabel ? typeof tooltipLabel === "function" ? tooltipLabel(payload[0]?.payload?.payload) : tooltipLabel : dataKey;
							return /* @__PURE__ */ jsx(CustomPieChartTooltip, {
								dotColor: cellData.fill,
								label,
								payload
							});
						}
					})
				]
			})
		})
	});
});
PieChart.displayName = "PieChart";

//#endregion
export { PieChart };
//# sourceMappingURL=index.js.map