import { t as cn } from "../classname-iNHf9Pb8.js";
import * as React$1 from "react";
import { jsx } from "react/jsx-runtime";

//#region src/table/core.tsx
const Table = React$1.forwardRef(function Table$1({ className,...props }, ref) {
	return /* @__PURE__ */ jsx("div", {
		className: "relative w-full overflow-auto",
		children: /* @__PURE__ */ jsx("table", {
			ref,
			className: cn("w-full caption-bottom text-sm", className),
			...props
		})
	});
});
Table.displayName = "Table";
const TableHeader = React$1.forwardRef(function TableHeader$1({ className,...props }, ref) {
	return /* @__PURE__ */ jsx("thead", {
		ref,
		className: cn("bg-custom-background-80 py-4 border-y border-custom-border-200", className),
		...props
	});
});
TableHeader.displayName = "TableHeader";
const TableBody = React$1.forwardRef(function TableBody$1({ className,...props }, ref) {
	return /* @__PURE__ */ jsx("tbody", {
		ref,
		className: cn("", className),
		...props
	});
});
TableBody.displayName = "TableBody";
const TableFooter = React$1.forwardRef(function TableFooter$1({ className,...props }, ref) {
	return /* @__PURE__ */ jsx("tfoot", {
		ref,
		className: cn("bg-custom-background-300 font-medium", className),
		...props
	});
});
TableFooter.displayName = "TableFooter";
const TableRow = React$1.forwardRef(function TableRow$1({ className,...props }, ref) {
	return /* @__PURE__ */ jsx("tr", {
		ref,
		className: cn("transition-colors data-[state=selected]:bg-custom-background-100", className),
		...props
	});
});
TableRow.displayName = "TableRow";
const TableHead = React$1.forwardRef(function TableHead$1({ className,...props }, ref) {
	return /* @__PURE__ */ jsx("th", {
		ref,
		className: cn("h-10 px-2 text-left align-middle font-medium text-custom-text-300 [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
		...props
	});
});
TableHead.displayName = "TableHead";
const TableCell = React$1.forwardRef(function TableCell$1({ className,...props }, ref) {
	return /* @__PURE__ */ jsx("td", {
		ref,
		className: cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
		...props
	});
});
TableCell.displayName = "TableCell";
const TableCaption = React$1.forwardRef(function TableCaption$1({ className,...props }, ref) {
	return /* @__PURE__ */ jsx("caption", {
		ref,
		className: cn("mt-4 text-sm text-custom-text-300", className),
		...props
	});
});
TableCaption.displayName = "TableCaption";

//#endregion
export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow };
//# sourceMappingURL=index.js.map