import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { jsx } from "react/jsx-runtime";
import clsx from "clsx";
import { Collapsible as Collapsible$1 } from "@base-ui-components/react/collapsible";

//#region src/collapsible/collapsible.tsx
const CollapsibleContext = createContext(void 0);
const useCollapsible = () => {
	const context = useContext(CollapsibleContext);
	if (!context) throw new Error("Collapsible compound components cannot be rendered outside the Collapsible component");
	return context;
};
function Root({ children, className, isOpen: controlledIsOpen, onToggle, defaultOpen }) {
	const [localIsOpen, setLocalIsOpen] = useState(controlledIsOpen || defaultOpen || false);
	useEffect(() => {
		if (controlledIsOpen !== void 0) setLocalIsOpen(controlledIsOpen);
	}, [controlledIsOpen]);
	const handleToggle = useCallback(() => {
		if (controlledIsOpen !== void 0) onToggle?.();
		else setLocalIsOpen((prev) => !prev);
	}, [controlledIsOpen, onToggle]);
	return /* @__PURE__ */ jsx(CollapsibleContext.Provider, {
		value: {
			isOpen: localIsOpen,
			onToggle: handleToggle
		},
		children: /* @__PURE__ */ jsx(Collapsible$1.Root, {
			className: clsx(className),
			defaultOpen,
			open: localIsOpen,
			onOpenChange: handleToggle,
			children
		})
	});
}
function Trigger({ children, className, buttonRef }) {
	const { isOpen } = useCollapsible();
	return /* @__PURE__ */ jsx(Collapsible$1.Trigger, {
		"data-panel-open": isOpen,
		ref: buttonRef,
		className,
		children
	});
}
function Content({ children, className }) {
	return /* @__PURE__ */ jsx(Collapsible$1.Panel, {
		className: clsx("flex h-[var(--collapsible-panel-height)] flex-col overflow-hidden text-sm transition-all ease-out data-[ending-style]:h-0 data-[starting-style]:h-0", className),
		children
	});
}
const Collapsible = {
	CollapsibleRoot: Root,
	CollapsibleTrigger: Trigger,
	CollapsibleContent: Content
};

//#endregion
export { Collapsible };
//# sourceMappingURL=index.js.map