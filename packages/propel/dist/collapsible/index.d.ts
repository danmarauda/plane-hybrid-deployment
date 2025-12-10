import React from "react";
import * as react_jsx_runtime31 from "react/jsx-runtime";

//#region src/collapsible/collapsible.d.ts
type RootProps = {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  onToggle?: () => void;
  defaultOpen?: boolean;
};
type TriggerProps = {
  children: React.ReactNode;
  className?: string;
  buttonRef?: React.RefObject<HTMLButtonElement>;
};
type ContentProps = {
  children: React.ReactNode;
  className?: string;
};
declare function Root({
  children,
  className,
  isOpen: controlledIsOpen,
  onToggle,
  defaultOpen
}: RootProps): react_jsx_runtime31.JSX.Element;
declare function Trigger({
  children,
  className,
  buttonRef
}: TriggerProps): react_jsx_runtime31.JSX.Element;
declare function Content({
  children,
  className
}: ContentProps): react_jsx_runtime31.JSX.Element;
declare const Collapsible: {
  CollapsibleRoot: typeof Root;
  CollapsibleTrigger: typeof Trigger;
  CollapsibleContent: typeof Content;
};
//#endregion
export { Collapsible };
//# sourceMappingURL=index.d.ts.map