import "../../classname-iNHf9Pb8.js";
import "../../card-DKs_swY2.js";
import { t as getLegendProps } from "../../legend-Dn3oeCjV.js";
import { i as CustomYAxisTick, r as CustomXAxisTick, t as CustomTooltip } from "../../tooltip-Cc8Ky3IF.js";
import React, { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { AXIS_LABEL_CLASSNAME } from "@plane/constants";
import { CartesianGrid, Legend, Line, LineChart as LineChart$1, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

//#region src/charts/line-chart/root.tsx
const LineChart = React.memo(function LineChart$2(props) {
	const { data, lines, margin, xAxis, yAxis, className, tickCount = {
		x: void 0,
		y: 10
	}, customTicks, legend, showTooltip = true, customTooltipContent } = props;
	const [activeLine, setActiveLine] = useState(null);
	const [activeLegend, setActiveLegend] = useState(null);
	const { itemKeys, itemLabels, itemDotColors } = useMemo(() => {
		const keys = [];
		const labels = {};
		const colors = {};
		for (const line of lines) {
			keys.push(line.key);
			labels[line.key] = line.label;
			colors[line.key] = line.stroke;
		}
		return {
			itemKeys: keys,
			itemLabels: labels,
			itemDotColors: colors
		};
	}, [lines]);
	const renderLines = useMemo(() => lines.map((line) => /* @__PURE__ */ jsx(Line, {
		dataKey: line.key,
		type: line.smoothCurves ? "monotone" : "linear",
		className: "[&_path]:transition-opacity [&_path]:duration-200",
		opacity: !!activeLegend && activeLegend !== line.key ? .1 : 1,
		fill: line.fill,
		stroke: line.stroke,
		strokeWidth: 2,
		strokeDasharray: line.dashedLine ? "4 4" : "none",
		dot: line.showDot ? {
			fill: line.fill,
			fillOpacity: 1
		} : false,
		activeDot: { stroke: line.fill },
		onMouseEnter: () => setActiveLine(line.key),
		onMouseLeave: () => setActiveLine(null)
	}, line.key)), [activeLegend, lines]);
	return /* @__PURE__ */ jsx("div", {
		className,
		children: /* @__PURE__ */ jsx(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ jsxs(LineChart$1, {
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
							offset: -24,
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
						onMouseEnter: (payload) => setActiveLegend(payload.value),
						onMouseLeave: () => setActiveLegend(null),
						formatter: (value) => itemLabels[value],
						...getLegendProps(legend)
					}),
					showTooltip && /* @__PURE__ */ jsx(Tooltip, {
						cursor: {
							stroke: "rgba(var(--color-text-300))",
							strokeDasharray: "4 4"
						},
						wrapperStyle: { pointerEvents: "auto" },
						content: ({ active, label, payload }) => {
							if (customTooltipContent) return customTooltipContent({
								active,
								label,
								payload
							});
							return /* @__PURE__ */ jsx(CustomTooltip, {
								active,
								activeKey: activeLine,
								label,
								payload,
								itemKeys,
								itemLabels,
								itemDotColors
							});
						}
					}),
					renderLines
				]
			})
		})
	});
});
LineChart.displayName = "LineChart";

//#endregion
export { LineChart };
//# sourceMappingURL=index.js.map