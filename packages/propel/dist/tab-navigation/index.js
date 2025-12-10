import { t as cn } from "../classname-iNHf9Pb8.js";
import "../placement-Db9Qu3XD.js";
import "../utils-MPqvUdqq.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

//#region src/tab-navigation/tab-navigation-item.tsx
function TabNavigationItem({ children, isActive, className }) {
	return /* @__PURE__ */ jsxs("div", {
		className: cn("relative flex items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors z-10", isActive ? "text-custom-text-100" : "text-custom-text-200 hover:text-custom-text-100", className),
		children: [/* @__PURE__ */ jsx(AnimatePresence, { children: isActive && /* @__PURE__ */ jsx(motion.div, {
			className: "absolute inset-0 bg-custom-background-90 rounded-md -z-10",
			initial: {
				opacity: 0,
				scale: .9
			},
			animate: {
				opacity: 1,
				scale: 1
			},
			exit: {
				opacity: 0,
				scale: .9
			},
			transition: {
				duration: .3,
				ease: [
					.4,
					0,
					.2,
					1
				]
			}
		}) }), children]
	});
}
TabNavigationItem.displayName = "TabNavigationItem";

//#endregion
//#region src/tab-navigation/tab-navigation-list.tsx
function TabNavigationList({ children, className }) {
	return /* @__PURE__ */ jsx(LayoutGroup, {
		id: "tab-navigation",
		children: /* @__PURE__ */ jsx("div", {
			className: cn("relative flex items-center gap-1 rounded-md", className),
			children
		})
	});
}
TabNavigationList.displayName = "TabNavigationList";

//#endregion
export { TabNavigationItem, TabNavigationList };
//# sourceMappingURL=index.js.map