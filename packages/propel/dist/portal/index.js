import { t as cn } from "../classname-iNHf9Pb8.js";
import "../placement-Db9Qu3XD.js";
import "../utils-MPqvUdqq.js";
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { createPortal } from "react-dom";

//#region src/portal/constants.ts
let EPortalWidth = /* @__PURE__ */ function(EPortalWidth$1) {
	EPortalWidth$1["QUARTER"] = "quarter";
	EPortalWidth$1["HALF"] = "half";
	EPortalWidth$1["THREE_QUARTER"] = "three-quarter";
	EPortalWidth$1["FULL"] = "full";
	return EPortalWidth$1;
}({});
let EPortalPosition = /* @__PURE__ */ function(EPortalPosition$1) {
	EPortalPosition$1["LEFT"] = "left";
	EPortalPosition$1["RIGHT"] = "right";
	EPortalPosition$1["CENTER"] = "center";
	return EPortalPosition$1;
}({});
const PORTAL_WIDTH_CLASSES = {
	[EPortalWidth.QUARTER]: "w-1/4 min-w-80 max-w-96",
	[EPortalWidth.HALF]: "w-1/2 min-w-96 max-w-2xl",
	[EPortalWidth.THREE_QUARTER]: "w-3/4 min-w-96 max-w-5xl",
	[EPortalWidth.FULL]: "w-full"
};
const PORTAL_POSITION_CLASSES = {
	[EPortalPosition.LEFT]: "left-0",
	[EPortalPosition.RIGHT]: "right-0",
	[EPortalPosition.CENTER]: "left-1/2 -translate-x-1/2"
};
const DEFAULT_PORTAL_ID = "full-screen-portal";
const MODAL_Z_INDEX = 25;

//#endregion
//#region src/portal/portal-wrapper.tsx
/**
* PortalWrapper - A reusable portal component that renders children into a specific DOM element
* Optimized for SSR compatibility and performance
*
* @param children - The content to render inside the portal
* @param portalId - The ID of the DOM element to render into
* @param fallbackToDocument - Whether to render directly if portal container is not found
* @param className - Optional className to apply to the portal container div
* @param onMount - Callback fired when portal is mounted
* @param onUnmount - Callback fired when portal is unmounted
*/
function PortalWrapper({ children, portalId = DEFAULT_PORTAL_ID, fallbackToDocument = true, className, onMount, onUnmount }) {
	const [portalContainer, setPortalContainer] = useState(null);
	const [isMounted, setIsMounted] = useState(false);
	useLayoutEffect(() => {
		if (typeof window === "undefined") return;
		let container = document.getElementById(portalId);
		if (!container) {
			container = document.createElement("div");
			container.id = portalId;
			container.setAttribute("data-portal", "true");
			document.body.appendChild(container);
		}
		setPortalContainer(container);
		setIsMounted(true);
		onMount?.();
		return () => {
			onUnmount?.();
			if (container && container.children.length === 0 && container.hasAttribute("data-portal")) document.body.removeChild(container);
		};
	}, [
		portalId,
		onMount,
		onUnmount
	]);
	const content = useMemo(() => {
		if (!children) return null;
		return className ? /* @__PURE__ */ jsx("div", {
			className,
			children
		}) : children;
	}, [children, className]);
	if (!isMounted) return null;
	if (portalContainer) return createPortal(content, portalContainer);
	if (fallbackToDocument) return content ? content : null;
	return null;
}

//#endregion
//#region src/portal/modal-portal.tsx
/**
* @param children - The modal content to render
* @param isOpen - Whether the modal is open
* @param onClose - Function to call when modal should close
* @param portalId - The ID of the DOM element to render into
* @param className - Custom className for the modal container
* @param overlayClassName - Custom className for the overlay
* @param contentClassName - Custom className for the content area
* @param width - Predefined width options using EPortalWidth enum
* @param position - Position of the modal using EPortalPosition enum
* @param fullScreen - Whether to render in fullscreen mode
* @param showOverlay - Whether to show background overlay
* @param closeOnOverlayClick - Whether clicking overlay closes modal
* @param closeOnEscape - Whether pressing Escape closes modal
*/
function ModalPortal({ children, isOpen, onClose, portalId = DEFAULT_PORTAL_ID, className, overlayClassName, contentClassName, width = EPortalWidth.HALF, position = EPortalPosition.RIGHT, fullScreen = false, showOverlay = true, closeOnOverlayClick = true, closeOnEscape = true }) {
	const contentRef = useRef(null);
	const handleOverlayClick = useCallback((e) => {
		if (closeOnOverlayClick && onClose && e.target === e.currentTarget) onClose();
	}, [closeOnOverlayClick, onClose]);
	const handleEscape = useCallback((e) => {
		if (closeOnEscape && onClose && e.key === "Escape") onClose();
	}, [closeOnEscape, onClose]);
	useEffect(() => {
		if (!isOpen) return;
		document.addEventListener("keydown", handleEscape);
		return () => {
			document.removeEventListener("keydown", handleEscape);
		};
	}, [isOpen, handleEscape]);
	const modalClasses = useMemo(() => {
		return cn("top-0 h-full bg-white shadow-lg absolute transition-transform duration-300 ease-out", fullScreen ? "w-full h-full" : PORTAL_WIDTH_CLASSES[width], fullScreen ? "" : PORTAL_POSITION_CLASSES[position], contentClassName);
	}, [
		fullScreen,
		width,
		position,
		contentClassName
	]);
	if (!isOpen) return null;
	return /* @__PURE__ */ jsx(PortalWrapper, {
		portalId,
		children: /* @__PURE__ */ jsxs("div", {
			className: cn("absolute inset-0 h-full w-full overflow-y-auto", className),
			style: { zIndex: MODAL_Z_INDEX },
			role: "dialog",
			children: [showOverlay && /* @__PURE__ */ jsx("div", {
				className: cn("absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300", overlayClassName),
				onClick: handleOverlayClick,
				"aria-hidden": "true"
			}), /* @__PURE__ */ jsx("div", {
				ref: contentRef,
				className: cn(modalClasses),
				style: { zIndex: MODAL_Z_INDEX + 1 },
				role: "document",
				children
			})]
		})
	});
}

//#endregion
export { DEFAULT_PORTAL_ID, EPortalPosition, EPortalWidth, MODAL_Z_INDEX, ModalPortal, PORTAL_POSITION_CLASSES, PORTAL_WIDTH_CLASSES, PortalWrapper };
//# sourceMappingURL=index.js.map