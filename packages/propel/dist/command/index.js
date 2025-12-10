import { t as cn } from "../classname-iNHf9Pb8.js";
import "react";
import { SearchIcon } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Command as Command$2 } from "cmdk";

//#region src/command/command.tsx
function CommandComponent({ className,...props }) {
	return /* @__PURE__ */ jsx(Command$2, {
		"data-slot": "command",
		className: cn("", className),
		...props
	});
}
function CommandInput({ className,...props }) {
	return /* @__PURE__ */ jsxs("div", {
		"data-slot": "command-input-wrapper",
		className: "flex items-center gap-1.5 rounded border border-custom-border-100 bg-custom-background-90 px-2",
		children: [/* @__PURE__ */ jsx(SearchIcon, {
			className: "size-3.5 flex-shrink-0 text-custom-text-400",
			strokeWidth: 1.5
		}), /* @__PURE__ */ jsx(Command$2.Input, {
			"data-slot": "command-input",
			className: cn(className),
			...props
		})]
	});
}
function CommandList({ ...props }) {
	return /* @__PURE__ */ jsx(Command$2.List, {
		"data-slot": "command-list",
		...props
	});
}
function CommandEmpty({ ...props }) {
	return /* @__PURE__ */ jsx(Command$2.Empty, {
		"data-slot": "command-empty",
		...props
	});
}
function CommandItem({ ...props }) {
	return /* @__PURE__ */ jsx(Command$2.Item, {
		"data-slot": "command-item",
		...props
	});
}
const Command = Object.assign(CommandComponent, {
	Input: CommandInput,
	List: CommandList,
	Empty: CommandEmpty,
	Item: CommandItem
});

//#endregion
export { Command };
//# sourceMappingURL=index.js.map