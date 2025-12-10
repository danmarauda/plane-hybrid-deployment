import React, { MouseEvent, ReactNode } from "react";
import * as react_jsx_runtime5 from "react/jsx-runtime";

//#region src/portal/constants.d.ts
declare enum EPortalWidth {
  QUARTER = "quarter",
  HALF = "half",
  THREE_QUARTER = "three-quarter",
  FULL = "full",
}
declare enum EPortalPosition {
  LEFT = "left",
  RIGHT = "right",
  CENTER = "center",
}
declare const PORTAL_WIDTH_CLASSES: {
  readonly quarter: "w-1/4 min-w-80 max-w-96";
  readonly half: "w-1/2 min-w-96 max-w-2xl";
  readonly "three-quarter": "w-3/4 min-w-96 max-w-5xl";
  readonly full: "w-full";
};
declare const PORTAL_POSITION_CLASSES: {
  readonly left: "left-0";
  readonly right: "right-0";
  readonly center: "left-1/2 -translate-x-1/2";
};
declare const DEFAULT_PORTAL_ID = "full-screen-portal";
declare const MODAL_Z_INDEX = 25;
//#endregion
//#region src/portal/types.d.ts
interface BasePortalProps {
  children: ReactNode;
  className?: string;
}
interface PortalWrapperProps extends BasePortalProps {
  portalId?: string;
  fallbackToDocument?: boolean;
  onMount?: () => void;
  onUnmount?: () => void;
}
interface ModalPortalProps extends BasePortalProps {
  isOpen: boolean;
  onClose?: () => void;
  portalId?: string;
  overlayClassName?: string;
  contentClassName?: string;
  width?: EPortalWidth;
  position?: EPortalPosition;
  fullScreen?: boolean;
  showOverlay?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}
type PortalEventHandler = () => void;
type PortalKeyboardHandler = (event: KeyboardEvent) => void;
type PortalMouseHandler = (event: MouseEvent) => void;
//#endregion
//#region src/portal/modal-portal.d.ts
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
declare function ModalPortal({
  children,
  isOpen,
  onClose,
  portalId,
  className,
  overlayClassName,
  contentClassName,
  width,
  position,
  fullScreen,
  showOverlay,
  closeOnOverlayClick,
  closeOnEscape
}: ModalPortalProps): react_jsx_runtime5.JSX.Element | null;
//#endregion
//#region src/portal/portal-wrapper.d.ts
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
declare function PortalWrapper({
  children,
  portalId,
  fallbackToDocument,
  className,
  onMount,
  onUnmount
}: PortalWrapperProps): React.ReactElement<any, string | React.JSXElementConstructor<any>> | null;
//#endregion
export { BasePortalProps, DEFAULT_PORTAL_ID, EPortalPosition, EPortalWidth, MODAL_Z_INDEX, ModalPortal, ModalPortalProps, PORTAL_POSITION_CLASSES, PORTAL_WIDTH_CLASSES, PortalEventHandler, PortalKeyboardHandler, PortalMouseHandler, PortalWrapper, PortalWrapperProps };
//# sourceMappingURL=index.d.ts.map