import { t as cn } from "../classname-iNHf9Pb8.js";
import * as React$1 from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { ScrollArea as ScrollArea$1 } from "@base-ui-components/react/scroll-area";

//#region src/scrollarea/scrollarea.tsx
function ScrollArea({ children, orientation, scrollType, size = "md", rootClassName, viewportClassName,...props }) {
	return /* @__PURE__ */ jsxs(ScrollArea$1.Root, {
		"data-slot": "scroll-area",
		className: cn("relative", rootClassName),
		...props,
		children: [
			/* @__PURE__ */ jsx(ScrollArea$1.Viewport, {
				"data-slot": "scroll-area-viewport",
				className: cn("focus-visible:ring-ring/50 size-full overscroll-contain rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:outline", viewportClassName),
				children
			}),
			/* @__PURE__ */ jsx(ScrollBar, {
				orientation,
				scrollType,
				size
			}),
			/* @__PURE__ */ jsx(ScrollArea$1.Corner, {})
		]
	});
}
const horizontalSizeStyles = {
	sm: "p-[0.112rem] h-2.5",
	md: "p-[0.112rem] h-3",
	lg: "p-[0.112rem] h-4"
};
const verticalSizeStyles = {
	sm: "p-[0.112rem] w-2.5",
	md: "p-[0.112rem] w-3",
	lg: "p-[0.112rem] w-4"
};
const thumbSizeStyles = {
	sm: "before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:-translate-x-1/2 before:-translate-y-1/2",
	md: "before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-14 before:-translate-x-1/2 before:-translate-y-1/2",
	lg: "before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-17 before:-translate-x-1/2 before:-translate-y-1/2"
};
const ScrollBar = React$1.memo(function ScrollBar$1({ className, orientation = "vertical", scrollType = "always", size = "md",...props }) {
	return /* @__PURE__ */ jsx(ScrollArea$1.Scrollbar, {
		"data-slot": "scroll-area-scrollbar",
		orientation,
		className: cn("group/track mr-1 flex justify-center rounded bg-transparent opacity-0 transition-opacity delay-300 ", orientation === "vertical" && verticalSizeStyles[size], orientation === "horizontal" && horizontalSizeStyles[size], scrollType === "always" && "opacity-100", scrollType === "scroll" && "data-[scrolling]:opacity-100  data-[scrolling]:delay-0 data-[scrolling]:duration-75", scrollType === "hover" && "data-[hovering]:opacity-100 data-[hovering]:delay-0 data-[hovering]:duration-75", className),
		...props,
		children: /* @__PURE__ */ jsx(ScrollArea$1.Thumb, {
			"data-slot": "scroll-area-thumb",
			className: cn("relative flex-1 rounded-[10px] bg-custom-scrollbar-neutral group-hover:bg-custom-scrollbar-hover group-active/track:bg-custom-scrollbar-active data-[scrolling]:bg-custom-scrollbar-active", thumbSizeStyles[size])
		})
	});
});

//#endregion
export { ScrollArea };
//# sourceMappingURL=index.js.map