import { t as cn } from "../../classname-iNHf9Pb8.js";
import { r as ECardSpacing, t as Card } from "../../card-DKs_swY2.js";
import React, { useMemo } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { ResponsiveContainer, Tooltip, Treemap } from "recharts";

//#region src/charts/tree-map/map-content.tsx
const LAYOUT = {
	PADDING: 2,
	RADIUS: 6,
	TEXT: {
		PADDING_LEFT: 8,
		PADDING_RIGHT: 8,
		VERTICAL_OFFSET: 20,
		ELLIPSIS_OFFSET: -4,
		FONT_SIZES: {
			SM: 12.6,
			XS: 10.8
		}
	},
	ICON: {
		SIZE: 16,
		GAP: 6
	},
	MIN_DIMENSIONS: {
		HEIGHT_FOR_BOTH: 42,
		HEIGHT_FOR_TOP: 35,
		HEIGHT_FOR_DOTS: 20,
		WIDTH_FOR_ICON: 30,
		WIDTH_FOR_DOTS: 15
	}
};
const calculateContentWidth = (text, fontSize) => String(text).length * fontSize * .7;
const calculateTopSectionConfig = (effectiveWidth, name, hasIcon) => {
	const iconWidth = hasIcon ? LAYOUT.ICON.SIZE + LAYOUT.ICON.GAP : 0;
	const nameWidth = calculateContentWidth(name, LAYOUT.TEXT.FONT_SIZES.SM);
	const totalPadding = LAYOUT.TEXT.PADDING_LEFT + LAYOUT.TEXT.PADDING_RIGHT;
	const canShowIcon = hasIcon && effectiveWidth >= LAYOUT.MIN_DIMENSIONS.WIDTH_FOR_ICON;
	if (!canShowIcon) return {
		showIcon: false,
		showName: effectiveWidth >= LAYOUT.MIN_DIMENSIONS.WIDTH_FOR_DOTS,
		nameTruncated: true
	};
	const availableWidthForName = effectiveWidth - (canShowIcon ? iconWidth : 0) - totalPadding;
	return {
		showIcon: canShowIcon,
		showName: availableWidthForName > 0,
		nameTruncated: !(availableWidthForName >= nameWidth)
	};
};
const calculateBottomSectionConfig = (effectiveWidth, effectiveHeight, value, label) => {
	if (effectiveHeight < LAYOUT.MIN_DIMENSIONS.HEIGHT_FOR_BOTH) return {
		show: false,
		showValue: false,
		showLabel: false,
		labelTruncated: false
	};
	const totalPadding = LAYOUT.TEXT.PADDING_LEFT + LAYOUT.TEXT.PADDING_RIGHT;
	const valueWidth = value ? calculateContentWidth(value, LAYOUT.TEXT.FONT_SIZES.XS) : 0;
	const labelWidth = label ? calculateContentWidth(label, LAYOUT.TEXT.FONT_SIZES.XS) + 4 : 0;
	const availableWidth = effectiveWidth - totalPadding;
	if (availableWidth < Math.max(valueWidth, LAYOUT.MIN_DIMENSIONS.WIDTH_FOR_DOTS)) return {
		show: true,
		showValue: false,
		showLabel: false,
		labelTruncated: false
	};
	return {
		show: true,
		showValue: true,
		showLabel: true,
		labelTruncated: !(availableWidth >= valueWidth + labelWidth)
	};
};
const calculateVisibility = (width, height, hasIcon, name, value, label) => {
	const effectiveWidth = width - LAYOUT.PADDING * 2;
	const effectiveHeight = height - LAYOUT.PADDING * 2;
	if (effectiveHeight < LAYOUT.MIN_DIMENSIONS.HEIGHT_FOR_DOTS || effectiveWidth < LAYOUT.MIN_DIMENSIONS.WIDTH_FOR_DOTS) return {
		top: {
			showIcon: false,
			showName: false,
			nameTruncated: false
		},
		bottom: {
			show: false,
			showValue: false,
			showLabel: false,
			labelTruncated: false
		}
	};
	return {
		top: calculateTopSectionConfig(effectiveWidth, name, hasIcon),
		bottom: calculateBottomSectionConfig(effectiveWidth, effectiveHeight, value, label)
	};
};
const truncateText = (text, maxWidth, fontSize, reservedWidth = 0) => {
	const availableWidth = maxWidth - reservedWidth;
	if (availableWidth <= 0) return "";
	const avgCharWidth = fontSize * .7;
	const maxChars = Math.floor(availableWidth / avgCharWidth);
	const stringText = String(text);
	if (maxChars <= 3) return "";
	if (stringText.length <= maxChars) return stringText;
	return `${stringText.slice(0, maxChars - 3)}...`;
};
function CustomTreeMapContent({ x, y, width, height, name, value, label, fillColor, fillClassName, textClassName, icon }) {
	const dimensions = useMemo(() => {
		return {
			pX: x + LAYOUT.PADDING,
			pY: y + LAYOUT.PADDING,
			pWidth: Math.max(0, width - LAYOUT.PADDING * 2),
			pHeight: Math.max(0, height - LAYOUT.PADDING * 2)
		};
	}, [
		x,
		y,
		width,
		height
	]);
	const visibility = useMemo(() => calculateVisibility(width, height, !!icon, name, value, label), [
		width,
		height,
		icon,
		name,
		value,
		label
	]);
	if (!name || width <= 0 || height <= 0) return null;
	const renderContent = () => {
		const { pX, pY, pWidth, pHeight } = dimensions;
		const { top, bottom } = visibility;
		const availableTextWidth = pWidth - LAYOUT.TEXT.PADDING_LEFT - LAYOUT.TEXT.PADDING_RIGHT;
		const iconSpace = top.showIcon ? LAYOUT.ICON.SIZE + LAYOUT.ICON.GAP : 0;
		return /* @__PURE__ */ jsxs("g", { children: [
			/* @__PURE__ */ jsx("path", {
				d: `
            M${pX + LAYOUT.RADIUS},${pY}
            L${pX + pWidth - LAYOUT.RADIUS},${pY}
            Q${pX + pWidth},${pY} ${pX + pWidth},${pY + LAYOUT.RADIUS}
            L${pX + pWidth},${pY + pHeight - LAYOUT.RADIUS}
            Q${pX + pWidth},${pY + pHeight} ${pX + pWidth - LAYOUT.RADIUS},${pY + pHeight}
            L${pX + LAYOUT.RADIUS},${pY + pHeight}
            Q${pX},${pY + pHeight} ${pX},${pY + pHeight - LAYOUT.RADIUS}
            L${pX},${pY + LAYOUT.RADIUS}
            Q${pX},${pY} ${pX + LAYOUT.RADIUS},${pY}
          `,
				className: cn("transition-colors duration-200 hover:opacity-90", fillClassName),
				fill: fillColor ?? "currentColor"
			}),
			/* @__PURE__ */ jsxs("g", { children: [top.showIcon && icon && /* @__PURE__ */ jsx("foreignObject", {
				x: pX + LAYOUT.TEXT.PADDING_LEFT,
				y: pY + LAYOUT.TEXT.PADDING_LEFT,
				width: LAYOUT.ICON.SIZE,
				height: LAYOUT.ICON.SIZE,
				className: textClassName || "text-custom-text-300",
				children: React.cloneElement(icon, {
					className: cn("size-4", icon?.props?.className),
					"aria-hidden": true
				})
			}), top.showName && /* @__PURE__ */ jsx("text", {
				x: pX + LAYOUT.TEXT.PADDING_LEFT + iconSpace,
				y: pY + LAYOUT.TEXT.VERTICAL_OFFSET,
				textAnchor: "start",
				className: cn("text-sm font-extralight tracking-wider select-none", textClassName || "text-custom-text-300"),
				fill: "currentColor",
				children: top.nameTruncated ? truncateText(name, availableTextWidth, LAYOUT.TEXT.FONT_SIZES.SM, iconSpace) : name
			})] }),
			bottom.show && /* @__PURE__ */ jsx("g", { children: bottom.showValue && value !== void 0 && /* @__PURE__ */ jsxs("text", {
				x: pX + LAYOUT.TEXT.PADDING_LEFT,
				y: pY + pHeight - LAYOUT.TEXT.PADDING_LEFT,
				textAnchor: "start",
				className: cn("text-sm font-extralight tracking-wider select-none", textClassName || "text-custom-text-300"),
				fill: "currentColor",
				children: [
					value.toLocaleString(),
					bottom.showLabel && label && /* @__PURE__ */ jsx("tspan", {
						dx: 4,
						children: bottom.labelTruncated ? truncateText(label, availableTextWidth - calculateContentWidth(value, LAYOUT.TEXT.FONT_SIZES.SM) - 4, LAYOUT.TEXT.FONT_SIZES.SM) : label
					}),
					!bottom.showLabel && label && /* @__PURE__ */ jsx("tspan", {
						dx: 4,
						children: "..."
					})
				]
			}) })
		] });
	};
	return /* @__PURE__ */ jsxs("g", { children: [/* @__PURE__ */ jsx("rect", {
		x,
		y,
		width,
		height,
		fill: "transparent"
	}), renderContent()] });
}

//#endregion
//#region src/charts/tree-map/tooltip.tsx
const TreeMapTooltip = React.memo(function TreeMapTooltip$1({ active, payload }) {
	if (!active || !payload || !payload[0]?.payload) return null;
	const data = payload[0].payload;
	return /* @__PURE__ */ jsxs(Card, {
		className: "flex flex-col space-y-1.5",
		spacing: ECardSpacing.SM,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2 border-b border-custom-border-200 pb-2.5",
			children: [data?.icon, /* @__PURE__ */ jsx("p", {
				className: "text-xs text-custom-text-100 font-medium capitalize",
				children: data?.name
			})]
		}), /* @__PURE__ */ jsxs("span", {
			className: "text-xs font-medium text-custom-text-200",
			children: [data?.value.toLocaleString(), data.label && ` ${data.label}`]
		})]
	});
});
TreeMapTooltip.displayName = "TreeMapTooltip";

//#endregion
//#region src/charts/tree-map/root.tsx
const TreeMapChart = React.memo(function TreeMapChart$1(props) {
	const { data, className = "w-full h-96", isAnimationActive = false, showTooltip = true } = props;
	return /* @__PURE__ */ jsx("div", {
		className: cn(className),
		children: /* @__PURE__ */ jsx(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ jsx(Treemap, {
				data,
				nameKey: "name",
				dataKey: "value",
				stroke: "currentColor",
				className: "text-custom-background-100 bg-custom-background-100",
				content: /* @__PURE__ */ jsx(CustomTreeMapContent, {}),
				animationEasing: "ease-out",
				isUpdateAnimationActive: isAnimationActive,
				animationBegin: 100,
				animationDuration: 500,
				children: showTooltip && /* @__PURE__ */ jsx(Tooltip, {
					content: ({ active, payload }) => /* @__PURE__ */ jsx(TreeMapTooltip, {
						active,
						payload
					}),
					cursor: {
						fill: "currentColor",
						className: "text-custom-background-90/80 cursor-pointer"
					},
					wrapperStyle: { pointerEvents: "auto" }
				})
			})
		})
	});
});
TreeMapChart.displayName = "TreeMapChart";

//#endregion
export { TreeMapChart };
//# sourceMappingURL=index.js.map