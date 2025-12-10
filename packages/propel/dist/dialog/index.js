import { t as cn } from "../classname-iNHf9Pb8.js";
import { forwardRef, memo, useMemo } from "react";
import { Dialog as Dialog$1 } from "@base-ui-components/react";
import { jsx, jsxs } from "react/jsx-runtime";

//#region src/dialog/root.tsx
let EDialogWidth = /* @__PURE__ */ function(EDialogWidth$1) {
	EDialogWidth$1["SM"] = "sm:max-w-sm";
	EDialogWidth$1["MD"] = "sm:max-w-md";
	EDialogWidth$1["LG"] = "sm:max-w-lg";
	EDialogWidth$1["XL"] = "sm:max-w-xl";
	EDialogWidth$1["XXL"] = "sm:max-w-2xl";
	EDialogWidth$1["XXXL"] = "sm:max-w-3xl";
	EDialogWidth$1["XXXXL"] = "sm:max-w-4xl";
	EDialogWidth$1["VXL"] = "sm:max-w-5xl";
	EDialogWidth$1["VIXL"] = "sm:max-w-6xl";
	EDialogWidth$1["VIIXL"] = "sm:max-w-7xl";
	return EDialogWidth$1;
}({});
const OVERLAY_CLASSNAME = cn("fixed inset-0 z-backdrop bg-custom-backdrop");
const BASE_CLASSNAME = "relative text-left bg-custom-background-100 rounded-lg shadow-md w-full z-modal";
const getPositionClassNames = (position) => cn("isolate fixed z-modal", {
	"top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2": position === "center",
	"top-8 left-1/2 -translate-x-1/2": position === "top"
});
const DialogPortal = memo(function DialogPortal$1({ children,...props }) {
	return /* @__PURE__ */ jsx(Dialog$1.Portal, {
		"data-slot": "dialog-portal",
		...props,
		children
	});
});
DialogPortal.displayName = "DialogPortal";
const DialogOverlay = memo(function DialogOverlay$1({ className,...props }) {
	return /* @__PURE__ */ jsx(Dialog$1.Backdrop, {
		"data-slot": "dialog-overlay",
		className: cn(OVERLAY_CLASSNAME, className),
		...props
	});
});
DialogOverlay.displayName = "DialogOverlay";
const DialogComponent = memo(function DialogComponent$1({ children,...props }) {
	return /* @__PURE__ */ jsx(Dialog$1.Root, {
		"data-slot": "dialog",
		...props,
		children
	});
});
DialogComponent.displayName = "Dialog";
const DialogTrigger = memo(function DialogTrigger$1({ children,...props }) {
	return /* @__PURE__ */ jsx(Dialog$1.Trigger, {
		"data-slot": "dialog-trigger",
		...props,
		children
	});
});
DialogTrigger.displayName = "DialogTrigger";
const DialogPanel = forwardRef(function DialogPanel$1({ className, width = EDialogWidth.XXL, children, position = "center",...props }, ref) {
	const positionClassNames = useMemo(() => getPositionClassNames(position), [position]);
	return /* @__PURE__ */ jsxs(DialogPortal, { children: [/* @__PURE__ */ jsx(DialogOverlay, {}), /* @__PURE__ */ jsx(Dialog$1.Popup, {
		ref,
		"data-slot": "dialog-content",
		className: cn(BASE_CLASSNAME, positionClassNames, width, className),
		role: "dialog",
		"aria-modal": "true",
		...props,
		children
	})] });
});
DialogPanel.displayName = "DialogPanel";
const DialogTitle = memo(function DialogTitle$1({ className, children,...props }) {
	return /* @__PURE__ */ jsx(Dialog$1.Title, {
		"data-slot": "dialog-title",
		className: cn("text-lg leading-none font-semibold", className),
		...props,
		children
	});
});
DialogTitle.displayName = "DialogTitle";
const Dialog = Object.assign(DialogComponent, {
	Panel: DialogPanel,
	Title: DialogTitle
});

//#endregion
export { Dialog, DialogPanel, DialogTitle, EDialogWidth };
//# sourceMappingURL=index.js.map