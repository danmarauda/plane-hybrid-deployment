import * as React$1 from "react";
import * as react_jsx_runtime0 from "react/jsx-runtime";

//#region src/accordion/accordion.d.ts
interface AccordionRootProps {
  defaultValue?: string[];
  allowMultiple?: boolean;
  className?: string;
  children: React$1.ReactNode;
}
interface AccordionItemProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: React$1.ReactNode;
}
interface AccordionTriggerProps {
  className?: string;
  icon?: React$1.ReactNode;
  children: React$1.ReactNode;
  asChild?: boolean;
  iconClassName?: string;
}
interface AccordionContentProps {
  className?: string;
  contentWrapperClassName?: string;
  children: React$1.ReactNode;
}
declare function AccordionRoot({
  defaultValue,
  allowMultiple,
  className,
  children
}: AccordionRootProps): react_jsx_runtime0.JSX.Element;
declare function AccordionItem({
  value,
  disabled,
  className,
  children
}: AccordionItemProps): react_jsx_runtime0.JSX.Element;
declare function AccordionTrigger({
  className,
  icon,
  iconClassName,
  children,
  asChild
}: AccordionTriggerProps): react_jsx_runtime0.JSX.Element;
declare function AccordionContent({
  className,
  contentWrapperClassName,
  children
}: AccordionContentProps): react_jsx_runtime0.JSX.Element;
declare const Accordion: {
  Root: typeof AccordionRoot;
  Item: typeof AccordionItem;
  Trigger: typeof AccordionTrigger;
  Content: typeof AccordionContent;
};
//#endregion
export { Accordion, AccordionContentProps, AccordionItemProps, AccordionRootProps, AccordionTriggerProps };
//# sourceMappingURL=index.d.ts.map