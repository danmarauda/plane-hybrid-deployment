import "../../classname-iNHf9Pb8.js";
import "../../card-DKs_swY2.js";
import { t as getLegendProps } from "../../legend-Dn3oeCjV.js";
import { n as CustomRadarAxisTick, t as CustomTooltip } from "../../tooltip-Cc8Ky3IF.js";
import { useMemo, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Legend, PolarAngleAxis, PolarGrid, Radar, RadarChart as RadarChart$1, ResponsiveContainer, Tooltip } from "recharts";

//#region src/charts/radar-chart/root.tsx
function RadarChart(props) {
	const { data, radars, margin, showTooltip, legend, className, angleAxis } = props;
	const [, setActiveIndex] = useState(null);
	const [activeLegend, setActiveLegend] = useState(null);
	const { itemKeys, itemLabels, itemDotColors } = useMemo(() => {
		const keys = [];
		const labels = {};
		const colors = {};
		for (const radar of radars) {
			keys.push(radar.key);
			labels[radar.key] = radar.name;
			colors[radar.key] = radar.stroke ?? radar.fill ?? "#000000";
		}
		return {
			itemKeys: keys,
			itemLabels: labels,
			itemDotColors: colors
		};
	}, [radars]);
	return /* @__PURE__ */ jsx("div", {
		className,
		children: /* @__PURE__ */ jsx(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ jsxs(RadarChart$1, {
				cx: "50%",
				cy: "50%",
				outerRadius: "80%",
				data,
				margin,
				children: [
					/* @__PURE__ */ jsx(PolarGrid, { stroke: "rgba(var(--color-border-100), 0.9)" }),
					/* @__PURE__ */ jsx(PolarAngleAxis, {
						dataKey: angleAxis.key,
						tick: (props$1) => /* @__PURE__ */ jsx(CustomRadarAxisTick, { ...props$1 })
					}),
					showTooltip && /* @__PURE__ */ jsx(Tooltip, {
						cursor: {
							stroke: "rgba(var(--color-text-300))",
							strokeDasharray: "4 4"
						},
						wrapperStyle: { pointerEvents: "auto" },
						content: ({ active, label, payload }) => /* @__PURE__ */ jsx(CustomTooltip, {
							active,
							activeKey: activeLegend,
							label,
							payload,
							itemKeys,
							itemLabels,
							itemDotColors
						})
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
					radars.map((radar) => /* @__PURE__ */ jsx(Radar, {
						name: radar.name,
						dataKey: radar.key,
						stroke: radar.stroke,
						fill: radar.fill,
						fillOpacity: radar.fillOpacity,
						dot: radar.dot
					}, radar.key))
				]
			})
		})
	});
}

//#endregion
export { RadarChart };
//# sourceMappingURL=index.js.map