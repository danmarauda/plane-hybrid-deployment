import * as React$1 from "react";
import { ContextMenu as ContextMenu$1 } from "@base-ui-components/react/context-menu";

//#region src/context-menu/context-menu.d.ts
interface ContextMenuProps extends React$1.ComponentProps<typeof ContextMenu$1.Root> {
  children: React$1.ReactNode;
}
interface ContextMenuTriggerProps extends React$1.ComponentProps<typeof ContextMenu$1.Trigger> {
  children: React$1.ReactNode;
  className?: string;
}
interface ContextMenuContentProps extends React$1.ComponentProps<typeof ContextMenu$1.Positioner> {
  children: React$1.ReactNode;
  className?: string;
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
  positionerClassName?: string;
}
interface ContextMenuItemProps extends React$1.ComponentProps<typeof ContextMenu$1.Item> {
  children: React$1.ReactNode;
  className?: string;
  disabled?: boolean;
}
declare const ContextMenu: React$1.ForwardRefExoticComponent<ContextMenuProps & React$1.RefAttributes<never>> & {
  Trigger: React$1.ForwardRefExoticComponent<Omit<ContextMenuTriggerProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
  Portal: typeof ContextMenu$1.Portal;
  Content: React$1.ForwardRefExoticComponent<Omit<ContextMenuContentProps, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
  Item: React$1.ForwardRefExoticComponent<Omit<ContextMenuItemProps, "ref"> & React$1.RefAttributes<Element>>;
  Separator: React$1.ForwardRefExoticComponent<Omit<ContextMenu$1.Separator.Props & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
  Submenu: typeof ContextMenu$1.SubmenuRoot;
  SubmenuTrigger: React$1.ForwardRefExoticComponent<Omit<ContextMenu$1.SubmenuTrigger.Props & React$1.RefAttributes<Element>, "ref"> & React$1.RefAttributes<Element>>;
};
//#endregion
export { ContextMenu, type ContextMenuContentProps, type ContextMenuItemProps, type ContextMenuProps, type ContextMenuTriggerProps };
//# sourceMappingURL=index.d.ts.map