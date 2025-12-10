import { t as cn } from "../classname-iNHf9Pb8.js";
import "../placement-Db9Qu3XD.js";
import "../utils-MPqvUdqq.js";
import * as React$1 from "react";
import { jsx } from "react/jsx-runtime";
import { ContextMenu as ContextMenu$1 } from "@base-ui-components/react/context-menu";

//#region src/context-menu/context-menu.tsx
const ContextMenuRoot = React$1.forwardRef(function ContextMenuRoot$1({ children,...props }, _ref) {
	return /* @__PURE__ */ jsx(ContextMenu$1.Root, {
		...props,
		children
	});
});
const ContextMenuTrigger = React$1.forwardRef(function ContextMenuTrigger$1({ className, children,...props }, ref) {
	return /* @__PURE__ */ jsx(ContextMenu$1.Trigger, {
		ref,
		className: cn("outline-none", className),
		...props,
		children
	});
});
const ContextMenuPortal = ContextMenu$1.Portal;
const ContextMenuContent = React$1.forwardRef(function ContextMenuContent$1({ positionerClassName, className, children, side = "bottom", sideOffset = 4,...props }, ref) {
	return /* @__PURE__ */ jsx(ContextMenu$1.Positioner, {
		ref,
		side,
		sideOffset,
		...props,
		className: positionerClassName,
		children: /* @__PURE__ */ jsx(ContextMenu$1.Popup, {
			className: cn("z-50 min-w-32 overflow-hidden rounded-md border border-custom-border-200 bg-custom-background-100 p-1 shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2", className),
			children
		})
	});
});
const ContextMenuItem = React$1.forwardRef(function ContextMenuItem$1({ className, disabled, children,...props }, ref) {
	return /* @__PURE__ */ jsx(ContextMenu$1.Item, {
		ref,
		className: cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none", "focus:bg-custom-background-90 focus:text-custom-text-100", "data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
		disabled,
		...props,
		children
	});
});
const ContextMenuSeparator = React$1.forwardRef(function ContextMenuSeparator$1({ className,...props }, ref) {
	return /* @__PURE__ */ jsx(ContextMenu$1.Separator, {
		ref,
		className: cn("-mx-1 my-1 h-px bg-custom-border-200", className),
		...props
	});
});
const ContextMenuSubmenu = ContextMenu$1.SubmenuRoot;
const ContextMenuSubmenuTrigger = React$1.forwardRef(function ContextMenuSubmenuTrigger$1({ className, children,...props }, ref) {
	return /* @__PURE__ */ jsx(ContextMenu$1.SubmenuTrigger, {
		ref,
		className: cn("flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:outline-none", "focus:bg-custom-background-90 data-[state=open]:bg-custom-background-90", className),
		...props,
		children
	});
});
ContextMenuRoot.displayName = "ContextMenu";
ContextMenuTrigger.displayName = "ContextMenuTrigger";
ContextMenuContent.displayName = "ContextMenuContent";
ContextMenuItem.displayName = "ContextMenuItem";
ContextMenuSeparator.displayName = "ContextMenuSeparator";
ContextMenuSubmenuTrigger.displayName = "ContextMenuSubmenuTrigger";
const ContextMenu = Object.assign(ContextMenuRoot, {
	Trigger: ContextMenuTrigger,
	Portal: ContextMenuPortal,
	Content: ContextMenuContent,
	Item: ContextMenuItem,
	Separator: ContextMenuSeparator,
	Submenu: ContextMenuSubmenu,
	SubmenuTrigger: ContextMenuSubmenuTrigger
});

//#endregion
export { ContextMenu };
//# sourceMappingURL=index.js.map