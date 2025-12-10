import { t as cn } from "../classname-iNHf9Pb8.js";
import "../placement-Db9Qu3XD.js";
import "../utils-MPqvUdqq.js";
import { kn as ChevronLeftIcon } from "../icons-BueZeOyQ.js";
import "react";
import { jsx } from "react/jsx-runtime";
import { DayPicker } from "react-day-picker";

//#region src/calendar/root.tsx
function Calendar({ className, showOutsideDays = true,...props }) {
	const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
	const thirtyYearsAgoFirstDay = new Date(currentYear - 30, 0, 1);
	const thirtyYearsFromNowFirstDay = new Date(currentYear + 30, 11, 31);
	return /* @__PURE__ */ jsx(DayPicker, {
		showOutsideDays,
		className: cn("p-3", className),
		weekStartsOn: props.weekStartsOn,
		components: { Chevron: ({ className: className$1,...props$1 }) => /* @__PURE__ */ jsx(ChevronLeftIcon, {
			className: cn("size-4", {
				"rotate-180": props$1.orientation === "right",
				"-rotate-90": props$1.orientation === "down"
			}, className$1),
			...props$1
		}) },
		startMonth: thirtyYearsAgoFirstDay,
		endMonth: thirtyYearsFromNowFirstDay,
		...props
	});
}

//#endregion
export { Calendar };
//# sourceMappingURL=index.js.map