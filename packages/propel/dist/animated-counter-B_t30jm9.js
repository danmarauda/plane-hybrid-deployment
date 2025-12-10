import { t as cn } from "./classname-iNHf9Pb8.js";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";

//#region src/animated-counter/animated-counter.tsx
const sizeClasses = {
	sm: "text-xs",
	md: "text-sm",
	lg: "text-base"
};
function AnimatedCounter({ count, className, size = "md" }) {
	const [displayCount, setDisplayCount] = useState(count);
	const [prevCount, setPrevCount] = useState(count);
	const [isAnimating, setIsAnimating] = useState(false);
	const [direction, setDirection] = useState(null);
	const [animationKey, setAnimationKey] = useState(0);
	useEffect(() => {
		if (count !== prevCount) {
			setDirection(count > prevCount ? "up" : "down");
			setIsAnimating(true);
			setAnimationKey((prev) => prev + 1);
			setDisplayCount(count);
			const timer = setTimeout(() => {
				setIsAnimating(false);
				setDirection(null);
				setPrevCount(count);
			}, 250);
			return () => clearTimeout(timer);
		}
	}, [count, prevCount]);
	const sizeClass = sizeClasses[size];
	return /* @__PURE__ */ jsxs("div", {
		className: cn("relative inline-flex items-center justify-center overflow-hidden min-w-2", sizeClass),
		children: [isAnimating && /* @__PURE__ */ jsx("span", {
			className: cn("absolute inset-0 flex items-center justify-center font-medium", "animate-[slideOut_0.25s_ease-out_forwards]", direction === "up" && "[--slide-out-dir:-100%]", direction === "down" && "[--slide-out-dir:100%]", sizeClass),
			style: { animation: direction === "up" ? "slideOut 0.25s ease-out forwards, fadeOut 0.25s ease-out forwards" : "slideOutDown 0.25s ease-out forwards, fadeOut 0.25s ease-out forwards" },
			children: prevCount
		}, `prev-${animationKey}`), /* @__PURE__ */ jsx("span", {
			className: cn("flex items-center justify-center font-medium", isAnimating && "animate-[slideIn_0.25s_ease-out_forwards]", !isAnimating && "opacity-100", sizeClass, className),
			style: isAnimating ? { animation: direction === "up" ? "slideInFromBottom 0.25s ease-out forwards" : "slideInFromTop 0.25s ease-out forwards" } : void 0,
			children: displayCount
		}, `current-${animationKey}`)]
	});
}

//#endregion
export { AnimatedCounter as t };
//# sourceMappingURL=animated-counter-B_t30jm9.js.map