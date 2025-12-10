import { t as cn } from "../classname-iNHf9Pb8.js";
import React from "react";
import { jsx } from "react/jsx-runtime";

//#region src/skeleton/root.tsx
function SkeletonRoot({ children, className = "", ariaLabel = "Loading content" }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "skeleton",
		className: cn("animate-pulse", className),
		role: "status",
		"aria-label": ariaLabel,
		children
	});
}
function SkeletonItem({ height = "auto", width = "auto", className = "" }) {
	return /* @__PURE__ */ jsx("div", {
		"data-slot": "skeleton-item",
		className: cn("rounded-md bg-custom-background-80", className),
		style: {
			height,
			width
		}
	});
}
const Skeleton = Object.assign(SkeletonRoot, { Item: SkeletonItem });
SkeletonRoot.displayName = "plane-ui-skeleton";
SkeletonItem.displayName = "plane-ui-skeleton-item";

//#endregion
export { Skeleton, SkeletonItem, SkeletonRoot };
//# sourceMappingURL=index.js.map