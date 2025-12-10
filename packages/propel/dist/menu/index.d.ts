import * as react_jsx_runtime25 from "react/jsx-runtime";

//#region src/menu/types.d.ts
type TPlacement = "top" | "bottom" | "left" | "right";
type TMenuProps = {
  customButtonClassName?: string;
  customButtonTabIndex?: number;
  buttonClassName?: string;
  className?: string;
  customButton?: React.ReactNode;
  disabled?: boolean;
  input?: boolean;
  label?: string | React.ReactNode;
  maxHeight?: "sm" | "rg" | "md" | "lg";
  noChevron?: boolean;
  chevronClassName?: string;
  onOpen?: () => void;
  optionsClassName?: string;
  placement?: TPlacement;
  tabIndex?: number;
  useCaptureForOutsideClick?: boolean;
  children: React.ReactNode;
  ellipsis?: boolean;
  noBorder?: boolean;
  verticalEllipsis?: boolean;
  menuButtonOnClick?: (..._args: unknown[]) => void;
  menuItemsClassName?: string;
  onMenuClose?: () => void;
  closeOnSelect?: boolean;
  portalElement?: Element | null;
  openOnHover?: boolean;
  ariaLabel?: string;
  handleOpenChange?: (open: boolean) => void;
};
type TSubMenuProps = {
  children: React.ReactNode;
  trigger: React.ReactNode;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  placement?: TPlacement;
};
type TMenuItemProps = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (_args?: unknown) => void;
  className?: string;
};
//#endregion
//#region src/menu/menu.d.ts
declare function Menu(props: TMenuProps): react_jsx_runtime25.JSX.Element;
declare namespace Menu {
  var MenuItem: (props: TMenuItemProps) => react_jsx_runtime25.JSX.Element;
  var SubMenu: (props: TSubMenuProps) => react_jsx_runtime25.JSX.Element;
}
//#endregion
export { Menu, TMenuItemProps, TMenuProps, TPlacement, TSubMenuProps };
//# sourceMappingURL=index.d.ts.map