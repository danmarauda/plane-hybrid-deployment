import { t as cn } from "../../classname-iNHf9Pb8.js";
import "../../card-DKs_swY2.js";
import { t as getLegendProps } from "../../legend-Dn3oeCjV.js";
import { i as CustomYAxisTick, r as CustomXAxisTick, t as CustomTooltip } from "../../tooltip-Cc8Ky3IF.js";
import React, { useCallback, useMemo, useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { AXIS_LABEL_CLASSNAME } from "@plane/constants";
import { Bar, BarChart as BarChart$1, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

//#region src/charts/bar-chart/bar.tsx
const MIN_BAR_HEIGHT_FOR_INTERNAL_TEXT = 14;
const BAR_TOP_BORDER_RADIUS = 4;
const BAR_BOTTOM_BORDER_RADIUS = 4;
const DEFAULT_LOLLIPOP_LINE_WIDTH = 2;
const DEFAULT_LOLLIPOP_CIRCLE_RADIUS = 8;
const calculatePercentage = (data, stackKeys, currentKey) => {
	const total = stackKeys.reduce((sum, key) => sum + data[key], 0);
	return total === 0 ? 0 : Math.round(data[currentKey] / total * 100);
};
const getBarPath = (x, y, width, height, topRadius, bottomRadius) => `
  M${x},${y + topRadius}
  Q${x},${y} ${x + topRadius},${y}
  L${x + width - topRadius},${y}
  Q${x + width},${y} ${x + width},${y + topRadius}
  L${x + width},${y + height - bottomRadius}
  Q${x + width},${y + height} ${x + width - bottomRadius},${y + height}
  L${x + bottomRadius},${y + height}
  Q${x},${y + height} ${x},${y + height - bottomRadius}
  Z
`;
function PercentageText({ x, y, percentage, className }) {
	return /* @__PURE__ */ jsxs("text", {
		x,
		y,
		textAnchor: "middle",
		className: cn("text-xs font-medium", className),
		fill: "currentColor",
		children: [percentage, "%"]
	});
}
const CustomBar = React.memo(function CustomBar$1(props) {
	const { opacity, fill, x, y, width, height, dataKey, stackKeys, payload, textClassName, showPercentage, showTopBorderRadius, showBottomBorderRadius } = props;
	if (!height) return null;
	const currentBarPercentage = calculatePercentage(payload, stackKeys, dataKey);
	const TEXT_PADDING_Y = Math.min(6, Math.abs(MIN_BAR_HEIGHT_FOR_INTERNAL_TEXT - height / 2));
	const textY = y + height - TEXT_PADDING_Y;
	const showText = showPercentage && height >= MIN_BAR_HEIGHT_FOR_INTERNAL_TEXT && currentBarPercentage !== void 0 && !Number.isNaN(currentBarPercentage);
	return /* @__PURE__ */ jsxs("g", { children: [/* @__PURE__ */ jsx("path", {
		d: getBarPath(x, y, width, height, showTopBorderRadius ? BAR_TOP_BORDER_RADIUS : 0, showBottomBorderRadius ? BAR_BOTTOM_BORDER_RADIUS : 0),
		className: "transition-opacity duration-200",
		fill,
		opacity
	}), showText && /* @__PURE__ */ jsx(PercentageText, {
		x: x + width / 2,
		y: textY,
		percentage: currentBarPercentage,
		className: textClassName
	})] });
});
const CustomBarLollipop = React.memo(function CustomBarLollipop$1(props) {
	const { fill, x, y, width, height, dataKey, stackKeys, payload, textClassName, showPercentage, dotted } = props;
	const currentBarPercentage = calculatePercentage(payload, stackKeys, dataKey);
	return /* @__PURE__ */ jsxs("g", { children: [
		/* @__PURE__ */ jsx("line", {
			x1: x + width / 2,
			y1: y + height,
			x2: x + width / 2,
			y2: y,
			stroke: fill,
			strokeWidth: DEFAULT_LOLLIPOP_LINE_WIDTH,
			strokeLinecap: "round",
			strokeDasharray: dotted ? "4 4" : "0"
		}),
		/* @__PURE__ */ jsx("circle", {
			cx: x + width / 2,
			cy: y,
			r: DEFAULT_LOLLIPOP_CIRCLE_RADIUS,
			fill,
			stroke: "none"
		}),
		showPercentage && /* @__PURE__ */ jsx(PercentageText, {
			x: x + width / 2,
			y,
			percentage: currentBarPercentage,
			className: textClassName
		})
	] });
});
/**
* Factory function to create shape variants with consistent props
* @param Component - The base component to render
* @param factoryProps - Additional props to pass to the component
* @returns A function that creates the shape with proper props
*/
const createShapeVariant = (Component, factoryProps) => (shapeProps, bar, stackKeys) => {
	const showTopBorderRadius = bar.showTopBorderRadius?.(shapeProps.dataKey, shapeProps.payload);
	const showBottomBorderRadius = bar.showBottomBorderRadius?.(shapeProps.dataKey, shapeProps.payload);
	return /* @__PURE__ */ jsx(Component, {
		...shapeProps,
		fill: typeof bar.fill === "function" ? bar.fill(shapeProps.payload) : bar.fill,
		stackKeys,
		textClassName: bar.textClassName,
		showPercentage: bar.showPercentage,
		showTopBorderRadius: !!showTopBorderRadius,
		showBottomBorderRadius: !!showBottomBorderRadius,
		...factoryProps
	});
};
const barShapeVariants = {
	bar: createShapeVariant(CustomBar),
	lollipop: createShapeVariant(CustomBarLollipop),
	"lollipop-dotted": createShapeVariant(CustomBarLollipop, { dotted: true })
};
CustomBar.displayName = "CustomBar";
CustomBarLollipop.displayName = "CustomBarLollipop";

//#endregion
//#region src/charts/bar-chart/root.tsx
const DEFAULT_BAR_FILL_COLOR = "#000000";
const BarChart = React.memo(function BarChart$2(props) {
	const { data, bars, xAxis, yAxis, barSize = 40, className, legend, margin, tickCount = {
		x: void 0,
		y: 10
	}, customTicks, showTooltip = true, customTooltipContent } = props;
	const [activeBar, setActiveBar] = useState(null);
	const [activeLegend, setActiveLegend] = useState(null);
	const { stackKeys, stackLabels } = useMemo(() => {
		const keys = [];
		const labels = {};
		for (const bar of bars) {
			keys.push(bar.key);
			labels[bar.key] = bar.label;
		}
		return {
			stackKeys: keys,
			stackLabels: labels
		};
	}, [bars]);
	const getBarColor = useCallback((payload, barKey) => {
		const bar = bars.find((b) => b.key === barKey);
		if (!bar) return DEFAULT_BAR_FILL_COLOR;
		if (typeof bar.fill === "function") {
			const payloadItem = payload?.find((item) => item.dataKey === barKey);
			if (payloadItem?.payload) try {
				return bar.fill(payloadItem.payload);
			} catch (error) {
				console.error(error);
				return DEFAULT_BAR_FILL_COLOR;
			}
			else return DEFAULT_BAR_FILL_COLOR;
		} else return bar.fill;
	}, [bars]);
	const getAllBarColors = useCallback((payload) => {
		const colors = {};
		for (const bar of bars) colors[bar.key] = getBarColor(payload, bar.key);
		return colors;
	}, [bars, getBarColor]);
	const renderBars = useMemo(() => bars.map((bar) => /* @__PURE__ */ jsx(Bar, {
		dataKey: bar.key,
		stackId: bar.stackId,
		opacity: !!activeLegend && activeLegend !== bar.key ? .1 : 1,
		shape: (shapeProps) => {
			const shapeVariant = barShapeVariants[bar.shapeVariant ?? "bar"];
			const node = shapeVariant(shapeProps, bar, stackKeys);
			return React.isValidElement(node) ? node : /* @__PURE__ */ jsx(Fragment, { children: node });
		},
		className: "[&_path]:transition-opacity [&_path]:duration-200",
		onMouseEnter: () => setActiveBar(bar.key),
		onMouseLeave: () => setActiveBar(null),
		fill: getBarColor(data, bar.key)
	}, bar.key)), [
		activeLegend,
		stackKeys,
		bars,
		getBarColor,
		data
	]);
	return /* @__PURE__ */ jsx("div", {
		className,
		children: /* @__PURE__ */ jsx(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ jsxs(BarChart$1, {
				data,
				margin: {
					top: margin?.top === void 0 ? 5 : margin.top,
					right: margin?.right === void 0 ? 30 : margin.right,
					bottom: margin?.bottom === void 0 ? 5 : margin.bottom,
					left: margin?.left === void 0 ? 20 : margin.left
				},
				barSize,
				className: "recharts-wrapper",
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
						label: {
							value: xAxis.label,
							dy: xAxis.dy ?? 28,
							className: AXIS_LABEL_CLASSNAME
						},
						tickCount: tickCount.x
					}),
					/* @__PURE__ */ jsx(YAxis, {
						domain: yAxis.domain,
						tickLine: false,
						axisLine: false,
						label: {
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
						onMouseEnter: (payload) => setActiveLegend(payload.value),
						onMouseLeave: () => setActiveLegend(null),
						formatter: (value) => stackLabels[value],
						...getLegendProps(legend)
					}),
					showTooltip && /* @__PURE__ */ jsx(Tooltip, {
						cursor: {
							fill: "currentColor",
							className: "text-custom-background-90/80 cursor-pointer"
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
								label,
								payload,
								activeKey: activeBar,
								itemKeys: stackKeys,
								itemLabels: stackLabels,
								itemDotColors: getAllBarColors(payload || [])
							});
						}
					}),
					renderBars
				]
			})
		})
	});
});
BarChart.displayName = "BarChart";

//#endregion
export { BarChart };
//# sourceMappingURL=index.js.map