import "../../classname-iNHf9Pb8.js";
import "../../card-DKs_swY2.js";
import { t as getLegendProps } from "../../legend-Dn3oeCjV.js";
import { i as CustomYAxisTick, r as CustomXAxisTick, t as CustomTooltip } from "../../tooltip-Cc8Ky3IF.js";
import React, { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { AXIS_LABEL_CLASSNAME } from "@plane/constants";
import { Area, CartesianGrid, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

//#region src/charts/area-chart/root.tsx
const AreaChart = React.memo(function AreaChart$1(props) {
	const { data, areas, xAxis, yAxis, className, legend, margin, tickCount = {
		x: void 0,
		y: 10
	}, customTicks, showTooltip = true, comparisonLine } = props;
	const [activeArea, setActiveArea] = useState(null);
	const [activeLegend, setActiveLegend] = useState(null);
	const { itemKeys, itemLabels, itemDotColors } = useMemo(() => {
		const keys = [];
		const labels = {};
		const colors = {};
		for (const area of areas) {
			keys.push(area.key);
			labels[area.key] = area.label;
			colors[area.key] = area.fill;
		}
		return {
			itemKeys: keys,
			itemLabels: labels,
			itemDotColors: colors
		};
	}, [areas]);
	const renderAreas = useMemo(() => areas.map((area) => /* @__PURE__ */ jsx(Area, {
		type: area.smoothCurves ? "monotone" : "linear",
		dataKey: area.key,
		stackId: area.stackId,
		fill: area.fill,
		opacity: !!activeLegend && activeLegend !== area.key ? .1 : 1,
		fillOpacity: area.fillOpacity,
		strokeOpacity: area.strokeOpacity,
		stroke: area.strokeColor,
		strokeWidth: 2,
		style: area.style,
		dot: area.showDot ? {
			fill: area.fill,
			fillOpacity: 1
		} : false,
		activeDot: { stroke: area.fill },
		onMouseEnter: () => setActiveArea(area.key),
		onMouseLeave: () => setActiveArea(null),
		className: "[&_path]:transition-opacity [&_path]:duration-200"
	}, area.key)), [activeLegend, areas]);
	const comparisonLineData = useMemo(() => {
		if (!data || data.length === 0) return [];
		const lastYValue = data[data.length - 1][yAxis.key] ?? 0;
		return data.map((item, index) => {
			const interpolatedValue = index / (data.length - 1) * lastYValue;
			return {
				[xAxis.key]: item[xAxis.key],
				comparisonLine: interpolatedValue
			};
		});
	}, [
		data,
		xAxis.key,
		yAxis.key
	]);
	return /* @__PURE__ */ jsx("div", {
		className,
		children: /* @__PURE__ */ jsx(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ jsxs(ComposedChart, {
				data,
				margin: {
					top: margin?.top === void 0 ? 5 : margin.top,
					right: margin?.right === void 0 ? 30 : margin.right,
					bottom: margin?.bottom === void 0 ? 5 : margin.bottom,
					left: margin?.left === void 0 ? 20 : margin.left
				},
				children: [
					/* @__PURE__ */ jsx(CartesianGrid, {
						stroke: "rgba(var(--color-border-100), 0.8)",
						vertical: false
					}),
					/* @__PURE__ */ jsx(XAxis, {
						dataKey: xAxis.key,
						tick: (props$1) => {
							return /* @__PURE__ */ jsx(customTicks?.x || CustomXAxisTick, { ...props$1 });
						},
						tickLine: false,
						axisLine: false,
						label: xAxis.label && {
							value: xAxis.label,
							dy: 28,
							className: AXIS_LABEL_CLASSNAME
						},
						tickCount: tickCount.x
					}),
					/* @__PURE__ */ jsx(YAxis, {
						domain: yAxis.domain,
						tickLine: false,
						axisLine: false,
						label: yAxis.label && {
							value: yAxis.label,
							angle: -90,
							position: "bottom",
							offset: yAxis.offset ?? -24,
							dx: yAxis.dx ?? -16,
							className: AXIS_LABEL_CLASSNAME
						},
						tick: (props$1) => {
							return /* @__PURE__ */ jsx(customTicks?.y || CustomYAxisTick, { ...props$1 });
						},
						tickCount: tickCount.y,
						allowDecimals: !!yAxis.allowDecimals
					}),
					legend && /* @__PURE__ */ jsx(Legend, {
						formatter: (value) => itemLabels[value],
						onMouseEnter: (payload) => setActiveLegend(payload.value),
						onMouseLeave: () => setActiveLegend(null),
						...getLegendProps(legend)
					}),
					showTooltip && /* @__PURE__ */ jsx(Tooltip, {
						cursor: {
							stroke: "rgba(var(--color-text-300))",
							strokeDasharray: "4 4"
						},
						wrapperStyle: { pointerEvents: "auto" },
						content: ({ active, label, payload }) => /* @__PURE__ */ jsx(CustomTooltip, {
							active,
							activeKey: activeArea,
							label,
							payload,
							itemKeys,
							itemLabels,
							itemDotColors
						})
					}),
					renderAreas,
					comparisonLine && /* @__PURE__ */ jsx(Line, {
						data: comparisonLineData,
						type: "linear",
						dataKey: "comparisonLine",
						stroke: comparisonLine.strokeColor,
						fill: comparisonLine.strokeColor,
						strokeWidth: 2,
						strokeDasharray: comparisonLine.dashedLine ? "4 4" : "none",
						activeDot: false,
						legendType: "none",
						name: "Comparison line"
					})
				]
			})
		})
	});
});
AreaChart.displayName = "AreaChart";

//#endregion
export { AreaChart };
//# sourceMappingURL=index.js.map