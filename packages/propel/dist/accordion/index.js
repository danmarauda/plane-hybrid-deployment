import "react";
import { Accordion as Accordion$1 } from "@base-ui-components/react";
import { PlusIcon } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";

//#region src/accordion/accordion.tsx
function AccordionRoot({ defaultValue = [], allowMultiple = false, className = "", children }) {
	return /* @__PURE__ */ jsx(Accordion$1.Root, {
		defaultValue,
		openMultiple: allowMultiple,
		className: `text-base ${className}`,
		children
	});
}
function AccordionItem({ value, disabled, className = "", children }) {
	return /* @__PURE__ */ jsx(Accordion$1.Item, {
		value,
		disabled,
		className: `relative ${className}`,
		children
	});
}
function AccordionTrigger({ className = "", icon = /* @__PURE__ */ jsx(PlusIcon, {
	"aria-hidden": "true",
	className: "transition-all ease-out  group-data-[panel-open]:rotate-45"
}), iconClassName = "", children, asChild = false }) {
	return /* @__PURE__ */ jsx(Accordion$1.Header, { children: asChild ? /* @__PURE__ */ jsx(Accordion$1.Trigger, {
		className: `w-full py-2 ${className}`,
		children
	}) : /* @__PURE__ */ jsxs(Accordion$1.Trigger, {
		className: `flex w-full items-center justify-between gap-2 py-2 ${className}`,
		children: [children, /* @__PURE__ */ jsx("span", {
			"aria-hidden": "true",
			className: `flex-shrink-0 ${iconClassName}`,
			children: icon
		})]
	}) });
}
function AccordionContent({ className = "", contentWrapperClassName = "", children }) {
	return /* @__PURE__ */ jsx(Accordion$1.Panel, {
		className: `h-[var(--accordion-panel-height)] overflow-hidden transition-[height] ease-out data-[ending-style]:h-0 data-[starting-style]:h-0 ${className}`,
		children: /* @__PURE__ */ jsx("div", {
			className: `py-2 ${contentWrapperClassName}`,
			children
		})
	});
}
const Accordion = {
	Root: AccordionRoot,
	Item: AccordionItem,
	Trigger: AccordionTrigger,
	Content: AccordionContent
};

//#endregion
export { Accordion };
//# sourceMappingURL=index.js.map