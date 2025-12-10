import { t as cn } from "../classname-iNHf9Pb8.js";
import * as React$1 from "react";
import { jsx } from "react/jsx-runtime";
import { Tabs as Tabs$1 } from "@base-ui-components/react/tabs";

//#region src/tabs/tabs.tsx
const TabsRoot = React$1.forwardRef(function TabsRoot$1({ className,...props }, ref) {
	return /* @__PURE__ */ jsx(Tabs$1.Root, {
		"data-slot": "tabs",
		className: cn("flex flex-col w-full h-full", className),
		...props,
		ref
	});
});
const TabsList = React$1.forwardRef(function TabsList$1({ className,...props }, ref) {
	return /* @__PURE__ */ jsx(Tabs$1.List, {
		"data-slot": "tabs-list",
		className: cn("flex w-full items-center justify-between gap-1.5 rounded-md text-sm p-0.5 bg-custom-background-80/60 relative overflow-auto", className),
		...props,
		ref
	});
});
const TabsTrigger = React$1.forwardRef(function TabsTrigger$1({ className, size = "md",...props }, ref) {
	return /* @__PURE__ */ jsx(Tabs$1.Tab, {
		"data-slot": "tabs-trigger",
		className: cn("flex items-center justify-center p-1 min-w-fit w-full font-medium text-custom-text-100 outline-none focus:outline-none cursor-pointer transition-all duration-200 ease-in-out rounded", "data-[selected]:bg-custom-background-100 data-[selected]:text-custom-text-100 data-[selected]:shadow-sm", "text-custom-text-400 hover:text-custom-text-300 hover:bg-custom-background-80/60", "disabled:text-custom-text-400 disabled:cursor-not-allowed", {
			"text-xs": size === "sm",
			"text-sm": size === "md",
			"text-base": size === "lg"
		}, className),
		...props,
		ref
	});
});
const TabsContent = React$1.forwardRef(function TabsContent$1({ className,...props }, ref) {
	return /* @__PURE__ */ jsx(Tabs$1.Panel, {
		"data-slot": "tabs-content",
		className: cn("relative outline-none", className),
		...props,
		ref
	});
});
const TabsIndicator = React$1.forwardRef(function TabsIndicator$1({ className,...props }, ref) {
	return /* @__PURE__ */ jsx("div", {
		className: cn("absolute left-0 top-[50%] z-[-1] h-6 w-[var(--active-tab-width)] translate-x-[var(--active-tab-left)] -translate-y-[50%] rounded-sm bg-custom-background-100 shadow-sm transition-[width,transform] duration-200 ease-in-out", className),
		...props,
		ref
	});
});
const Tabs = Object.assign(TabsRoot, {
	List: TabsList,
	Trigger: TabsTrigger,
	Content: TabsContent,
	Indicator: TabsIndicator
});

//#endregion
export { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger };
//# sourceMappingURL=index.js.map