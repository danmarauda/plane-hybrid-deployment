import { t as cn } from "../classname-iNHf9Pb8.js";
import * as React$1 from "react";
import { Search } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
import { Combobox as Combobox$1 } from "@base-ui-components/react/combobox";

//#region src/combobox/combobox.tsx
const MAX_HEIGHT_CLASSES = {
	lg: "max-h-60",
	md: "max-h-48",
	rg: "max-h-36",
	sm: "max-h-28"
};
function ComboboxRoot({ value, defaultValue, onValueChange, multiSelect = false, disabled = false, open, onOpenChange, children }) {
	const handleValueChange = React$1.useCallback((newValue) => {
		onValueChange?.(newValue);
	}, [onValueChange]);
	return /* @__PURE__ */ jsx(Combobox$1.Root, {
		value,
		defaultValue,
		onValueChange: handleValueChange,
		multiple: multiSelect,
		disabled,
		open,
		onOpenChange,
		children
	});
}
const ComboboxButton = React$1.forwardRef(function ComboboxButton$1({ className, children, disabled = false }, ref) {
	return /* @__PURE__ */ jsx(Combobox$1.Trigger, {
		ref,
		disabled,
		className,
		children
	});
});
function ComboboxOptions({ children, showSearch = false, searchPlaceholder, maxHeight = "lg", className, inputClassName, optionsContainerClassName, emptyMessage = "No results found", positionerClassName, searchQuery: controlledSearchQuery, onSearchQueryChange, onSearchQueryKeyDown, dataPreventOutsideClick }) {
	const [internalSearchQuery, setInternalSearchQuery] = React$1.useState("");
	const searchQuery = controlledSearchQuery !== void 0 ? controlledSearchQuery : internalSearchQuery;
	const setSearchQuery = React$1.useCallback((query) => {
		if (onSearchQueryChange) onSearchQueryChange(query);
		else setInternalSearchQuery(query);
	}, [onSearchQueryChange]);
	const filteredChildren = React$1.useMemo(() => {
		if (!showSearch || !searchQuery) return children;
		return React$1.Children.toArray(children).filter((child) => {
			if (!React$1.isValidElement(child)) return true;
			if (child.type !== ComboboxOption) return true;
			const getTextContent = (node) => {
				if (typeof node === "string") return node;
				if (typeof node === "number") return String(node);
				if (React$1.isValidElement(node) && node.props.children) return getTextContent(node.props.children);
				if (Array.isArray(node)) return node.map(getTextContent).join(" ");
				return "";
			};
			const textContent = getTextContent(child.props.children);
			const value = child.props.value || "";
			const searchLower = searchQuery.toLowerCase();
			return textContent.toLowerCase().includes(searchLower) || String(value).toLowerCase().includes(searchLower);
		});
	}, [
		children,
		searchQuery,
		showSearch
	]);
	return /* @__PURE__ */ jsx(Combobox$1.Portal, { children: /* @__PURE__ */ jsx(Combobox$1.Positioner, {
		sideOffset: 8,
		className: positionerClassName,
		children: /* @__PURE__ */ jsx(Combobox$1.Popup, {
			className: cn("rounded-md border border-custom-border-200 bg-custom-background-100 p-1 shadow-lg", className),
			"data-prevent-outside-click": dataPreventOutsideClick,
			children: /* @__PURE__ */ jsxs("div", {
				className: "flex flex-col gap-1",
				children: [showSearch && /* @__PURE__ */ jsxs("div", {
					className: "relative",
					children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-custom-text-400" }), /* @__PURE__ */ jsx("input", {
						type: "text",
						placeholder: searchPlaceholder,
						value: searchQuery,
						onChange: (e) => setSearchQuery(e.target.value),
						onKeyDown: onSearchQueryKeyDown,
						className: cn("w-full rounded border border-custom-border-100 bg-custom-background-90 py-1.5 pl-8 pr-2 text-sm outline-none placeholder:text-custom-text-400", inputClassName)
					})]
				}), /* @__PURE__ */ jsxs(Combobox$1.List, {
					className: cn("overflow-auto outline-none", MAX_HEIGHT_CLASSES[maxHeight], optionsContainerClassName),
					children: [filteredChildren, showSearch && emptyMessage && React$1.Children.count(React$1.Children.toArray(filteredChildren).filter((child) => React$1.isValidElement(child) && child.type === ComboboxOption)) === 0 && /* @__PURE__ */ jsx("div", {
						className: "px-2 py-1.5 text-sm text-custom-text-400",
						children: emptyMessage
					})]
				})]
			})
		})
	}) });
}
function ComboboxOption({ value, children, disabled, className }) {
	return /* @__PURE__ */ jsx(Combobox$1.Item, {
		value,
		disabled,
		className: cn("cursor-pointer rounded px-2 py-1.5 text-sm outline-none transition-colors", className),
		children
	});
}
const Combobox = Object.assign(ComboboxRoot, {
	Button: ComboboxButton,
	Options: ComboboxOptions,
	Option: ComboboxOption
});

//#endregion
export { Combobox };
//# sourceMappingURL=index.js.map