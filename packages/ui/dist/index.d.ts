import * as React$2 from "react";
import React$1, { ElementType, FC, KeyboardEventHandler, MutableRefObject, ReactNode, Ref } from "react";
import { ClassValue } from "clsx";
import * as react_jsx_runtime5 from "react/jsx-runtime";
import { ChevronDownIcon, ISvgIcons } from "@plane/propel/icons";
import * as lucide_react0 from "lucide-react";
import { LucideProps } from "lucide-react";
import * as _headlessui_react0 from "@headlessui/react";
import { E_PASSWORD_STRENGTH } from "@plane/constants";
import { EProductSubscriptionEnum, ICustomSearchSelectOption } from "@plane/types";
import { Placement } from "@popperjs/core";

//#region src/avatar/avatar.d.ts
type TAvatarSize = "sm" | "md" | "base" | "lg" | number;
type Props$13 = {
  /**
   * The name of the avatar which will be displayed on the tooltip
   */
  name?: string;
  /**
   * The background color if the avatar image fails to load
   */
  fallbackBackgroundColor?: string;
  /**
   * The text to display if the avatar image fails to load
   */
  fallbackText?: string;
  /**
   * The text color if the avatar image fails to load
   */
  fallbackTextColor?: string;
  /**
   * Whether to show the tooltip or not
   * @default true
   */
  showTooltip?: boolean;
  /**
   * The size of the avatars
   * Possible values: "sm", "md", "base", "lg"
   * @default "md"
   */
  size?: TAvatarSize;
  /**
   * The shape of the avatar
   * Possible values: "circle", "square"
   * @default "circle"
   */
  shape?: "circle" | "square";
  /**
   * The source of the avatar image
   */
  src?: string;
  /**
   * The custom CSS class name to apply to the component
   */
  className?: string;
};
/**
 * Get the size details based on the size prop
 * @param size The size of the avatar
 * @returns The size details
 */
declare const getSizeInfo: (size: TAvatarSize) => {
  avatarSize: string;
  fontSize: string;
  spacing: string;
};
/**
 * Get the border radius based on the shape prop
 * @param shape The shape of the avatar
 * @returns The border radius
 */
declare const getBorderRadius: (shape: "circle" | "square") => "rounded-full" | "rounded";
/**
 * Check if the value is a valid number
 * @param value The value to check
 * @returns Whether the value is a valid number or not
 */
declare const isAValidNumber: (value: any) => boolean;
declare function Avatar(props: Props$13): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/avatar/avatar-group.d.ts
type Props$12 = {
  /**
   * The children of the avatar group.
   * These should ideally should be `Avatar` components
   */
  children: React$1.ReactNode;
  /**
   * The maximum number of avatars to display.
   * If the number of children exceeds this value, the additional avatars will be replaced by a count of the remaining avatars.
   * @default 2
   */
  max?: number;
  /**
   * Whether to show the tooltip or not
   * @default true
   */
  showTooltip?: boolean;
  /**
   * The size of the avatars
   * Possible values: "sm", "md", "base", "lg"
   * @default "md"
   */
  size?: TAvatarSize;
};
declare function AvatarGroup(props: Props$12): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/badge/helper.d.ts
type TBadgeVariant = "primary" | "accent-primary" | "outline-primary" | "neutral" | "accent-neutral" | "outline-neutral" | "success" | "accent-success" | "outline-success" | "warning" | "accent-warning" | "outline-warning" | "destructive" | "accent-destructive" | "outline-destructive";
type TBadgeSizes = "sm" | "md" | "lg" | "xl";
//#endregion
//#region src/badge/badge.d.ts
interface BadgeProps extends React$2.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TBadgeVariant;
  size?: TBadgeSizes;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  appendIcon?: any;
  prependIcon?: any;
  children: React$2.ReactNode;
}
declare const Badge: React$2.ForwardRefExoticComponent<BadgeProps & React$2.RefAttributes<HTMLButtonElement>>;
//#endregion
//#region src/breadcrumbs/breadcrumbs.d.ts
type BreadcrumbsProps = {
  className?: string;
  children: React$2.ReactNode;
  onBack?: () => void;
  isLoading?: boolean;
};
declare function BreadcrumbItemLoader(): react_jsx_runtime5.JSX.Element;
declare function Breadcrumbs({
  className,
  children,
  onBack,
  isLoading
}: BreadcrumbsProps): react_jsx_runtime5.JSX.Element;
declare namespace Breadcrumbs {
  var Item: typeof BreadcrumbItem;
  var Icon: typeof BreadcrumbIcon;
  var Label: typeof BreadcrumbLabel;
  var Separator: typeof BreadcrumbSeparator;
  var ItemWrapper: typeof BreadcrumbItemWrapper;
}
type BreadcrumbItemProps = {
  component?: React$2.ReactNode;
  showSeparator?: boolean;
  isLast?: boolean;
};
declare function BreadcrumbItem(props: BreadcrumbItemProps): react_jsx_runtime5.JSX.Element;
type BreadcrumbIconProps = {
  children: React$2.ReactNode;
  className?: string;
};
declare function BreadcrumbIcon(props: BreadcrumbIconProps): react_jsx_runtime5.JSX.Element;
type BreadcrumbLabelProps = {
  children: React$2.ReactNode;
  className?: string;
};
declare function BreadcrumbLabel(props: BreadcrumbLabelProps): react_jsx_runtime5.JSX.Element;
type BreadcrumbSeparatorProps = {
  className?: string;
  containerClassName?: string;
  iconClassName?: string;
  showDivider?: boolean;
};
declare function BreadcrumbSeparator(props: BreadcrumbSeparatorProps): react_jsx_runtime5.JSX.Element;
type BreadcrumbItemWrapperProps = {
  label?: string;
  disableTooltip?: boolean;
  children: React$2.ReactNode;
  className?: string;
  type?: "link" | "text";
  isLast?: boolean;
};
declare function BreadcrumbItemWrapper(props: BreadcrumbItemWrapperProps): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/dropdowns/context-menu/root.d.ts
type TContextMenuItem = {
  key: string;
  customContent?: React$1.ReactNode;
  title?: string;
  description?: string;
  icon?: React$1.FC<any>;
  action: () => void;
  shouldRender?: boolean;
  closeOnClick?: boolean;
  disabled?: boolean;
  className?: string;
  iconClassName?: string;
  nestedMenuItems?: TContextMenuItem[];
};
interface PortalProps$1 {
  children: React$1.ReactNode;
  container?: Element | null;
}
declare function Portal({
  children,
  container
}: PortalProps$1): React$1.ReactPortal | null;
declare const ContextMenuContext: React$1.Context<{
  closeAllSubmenus: () => void;
  registerSubmenu: (closeSubmenu: () => void) => () => void;
  portalContainer?: Element | null;
} | null>;
type ContextMenuProps = {
  parentRef: React$1.RefObject<HTMLElement>;
  items: TContextMenuItem[];
  portalContainer?: Element | null;
};
declare function ContextMenu(props: ContextMenuProps): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/dropdowns/context-menu/item.d.ts
type ContextMenuItemProps = {
  handleActiveItem: () => void;
  handleClose: () => void;
  isActive: boolean;
  item: TContextMenuItem;
};
declare function ContextMenuItem(props: ContextMenuItemProps): react_jsx_runtime5.JSX.Element | null;
//#endregion
//#region src/dropdowns/helper.d.ts
type Placement$1 = "top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end" | "left" | "left-start" | "left-end" | "right" | "right-start" | "right-end";
interface IDropdownProps {
  customButtonClassName?: string;
  customButtonTabIndex?: number;
  buttonClassName?: string;
  className?: string;
  customButton?: React.ReactNode;
  disabled?: boolean;
  input?: boolean;
  label?: string | React.ReactNode;
  maxHeight?: "sm" | "rg" | "md" | "lg" | "xl" | "2xl";
  noChevron?: boolean;
  chevronClassName?: string;
  onOpen?: () => void;
  optionsClassName?: string;
  placement?: Placement$1;
  tabIndex?: number;
  useCaptureForOutsideClick?: boolean;
  defaultOpen?: boolean;
}
interface ICustomMenuDropdownProps extends IDropdownProps {
  children: React.ReactNode;
  ellipsis?: boolean;
  noBorder?: boolean;
  verticalEllipsis?: boolean;
  menuButtonOnClick?: (...args: any) => void;
  menuItemsClassName?: string;
  onMenuClose?: () => void;
  closeOnSelect?: boolean;
  portalElement?: Element | null;
  openOnHover?: boolean;
  ariaLabel?: string;
}
interface ICustomSelectProps extends IDropdownProps {
  children: React.ReactNode;
  value: any;
  onChange: any;
}
interface CustomSearchSelectProps {
  footerOption?: React.ReactNode;
  onChange: any;
  onClose?: () => void;
  noResultsMessage?: string;
  options?: ICustomSearchSelectOption[];
}
interface SingleValueProps {
  multiple?: false;
  value: any;
}
interface MultipleValuesProps {
  multiple?: true;
  value: any[] | null;
}
type ICustomSearchSelectProps = IDropdownProps & CustomSearchSelectProps & (SingleValueProps | MultipleValuesProps);
interface ICustomMenuItemProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (args?: any) => void;
  className?: string;
}
interface ICustomSelectItemProps {
  children: React.ReactNode;
  value: any;
  className?: string;
}
interface ICustomSubMenuProps {
  children: React.ReactNode;
  trigger: React.ReactNode;
  disabled?: boolean;
  className?: string;
  contentClassName?: string;
  placement?: Placement$1;
}
interface ICustomSubMenuTriggerProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}
interface ICustomSubMenuContentProps {
  children: React.ReactNode;
  className?: string;
  placement?: Placement$1;
  sideOffset?: number;
  alignOffset?: number;
}
//#endregion
//#region src/dropdowns/custom-menu.d.ts
interface PortalProps {
  children: React$2.ReactNode;
  container?: Element | null;
  asChild?: boolean;
}
declare function CustomMenu(props: ICustomMenuDropdownProps): react_jsx_runtime5.JSX.Element;
declare namespace CustomMenu {
  var Portal: ({
    children,
    container,
    asChild
  }: PortalProps) => React$2.ReactPortal | null;
  var MenuItem: (props: ICustomMenuItemProps) => react_jsx_runtime5.JSX.Element;
  var SubMenu: (props: ICustomSubMenuProps) => react_jsx_runtime5.JSX.Element;
  var SubMenuTrigger: (props: ICustomSubMenuTriggerProps) => react_jsx_runtime5.JSX.Element;
  var SubMenuContent: (props: ICustomSubMenuContentProps) => react_jsx_runtime5.JSX.Element;
}
//#endregion
//#region src/dropdowns/custom-select.d.ts
declare function CustomSelect(props: ICustomSelectProps): react_jsx_runtime5.JSX.Element;
declare namespace CustomSelect {
  var Option: (props: ICustomSelectItemProps) => react_jsx_runtime5.JSX.Element;
}
//#endregion
//#region src/dropdowns/custom-search-select.d.ts
declare function CustomSearchSelect(props: ICustomSearchSelectProps): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/dropdowns/combo-box.d.ts
type Props$11 = {
  as?: ElementType | undefined;
  ref?: Ref<HTMLElement> | undefined;
  tabIndex?: number | undefined;
  className?: string | undefined;
  value?: string | string[] | null;
  onChange?: (value: any) => void;
  disabled?: boolean | undefined;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement> | undefined;
  multiple?: boolean;
  renderByDefault?: boolean;
  button: ReactNode;
  children: ReactNode;
};
declare const ComboDropDown: React$1.ForwardRefExoticComponent<Omit<Props$11, "ref"> & React$1.RefAttributes<unknown>>;
declare const ComboOptions: _headlessui_react0._internal_ComponentComboboxOptions;
declare const ComboOption: _headlessui_react0._internal_ComponentComboboxOption;
declare const ComboInput: _headlessui_react0._internal_ComponentComboboxInput;
//#endregion
//#region src/breadcrumbs/navigation-dropdown.d.ts
type TBreadcrumbNavigationDropdownProps = {
  selectedItemKey: string;
  navigationItems: TContextMenuItem[];
  navigationDisabled?: boolean;
  handleOnClick?: () => void;
  isLast?: boolean;
};
declare function BreadcrumbNavigationDropdown(props: TBreadcrumbNavigationDropdownProps): react_jsx_runtime5.JSX.Element | null;
//#endregion
//#region src/breadcrumbs/navigation-search-dropdown.d.ts
type TBreadcrumbNavigationSearchDropdownProps = {
  icon?: React$2.ReactNode;
  title?: string;
  selectedItem: string;
  navigationItems: ICustomSearchSelectOption[];
  onChange?: (value: string) => void;
  navigationDisabled?: boolean;
  isLast?: boolean;
  handleOnClick?: () => void;
  disableRootHover?: boolean;
  shouldTruncate?: boolean;
};
declare function BreadcrumbNavigationSearchDropdown(props: TBreadcrumbNavigationSearchDropdownProps): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/button/helper.d.ts
type TButtonVariant = "primary" | "accent-primary" | "outline-primary" | "neutral-primary" | "link-primary" | "danger" | "accent-danger" | "outline-danger" | "link-danger" | "tertiary-danger" | "link-neutral";
type TButtonSizes = "sm" | "md" | "lg" | "xl";
interface IButtonStyling {
  [key: string]: {
    default: string;
    hover: string;
    pressed: string;
    disabled: string;
  };
}
declare const buttonStyling: IButtonStyling;
declare const getButtonStyling: (variant: TButtonVariant, size: TButtonSizes, disabled?: boolean) => string;
declare const getIconStyling: (size: TButtonSizes) => string;
//#endregion
//#region src/button/button.d.ts
interface ButtonProps extends React$2.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TButtonVariant;
  size?: TButtonSizes;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  appendIcon?: any;
  prependIcon?: any;
  children: React$2.ReactNode;
}
declare const Button: React$2.ForwardRefExoticComponent<ButtonProps & React$2.RefAttributes<HTMLButtonElement>>;
//#endregion
//#region src/button/toggle-switch.d.ts
interface IToggleSwitchProps {
  value: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  className?: string;
}
declare function ToggleSwitch(props: IToggleSwitchProps): react_jsx_runtime5.JSX.Element;
declare namespace ToggleSwitch {
  var displayName: string;
}
//#endregion
//#region src/card/helper.d.ts
declare enum ECardVariant {
  WITHOUT_SHADOW = "without-shadow",
  WITH_SHADOW = "with-shadow",
}
declare enum ECardDirection {
  ROW = "row",
  COLUMN = "column",
}
declare enum ECardSpacing {
  SM = "sm",
  LG = "lg",
}
type TCardVariant = ECardVariant.WITHOUT_SHADOW | ECardVariant.WITH_SHADOW;
type TCardDirection = ECardDirection.ROW | ECardDirection.COLUMN;
type TCardSpacing = ECardSpacing.SM | ECardSpacing.LG;
//#endregion
//#region src/card/card.d.ts
interface CardProps extends React$2.HTMLAttributes<HTMLDivElement> {
  variant?: TCardVariant;
  spacing?: TCardSpacing;
  direction?: TCardDirection;
  className?: string;
  children: React$2.ReactNode;
}
declare const Card: React$2.ForwardRefExoticComponent<CardProps & React$2.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/collapsible/collapsible.d.ts
type TCollapsibleProps = {
  title: string | React$1.ReactNode;
  children: React$1.ReactNode;
  buttonRef?: React$1.RefObject<HTMLButtonElement>;
  className?: string;
  buttonClassName?: string;
  isOpen?: boolean;
  onToggle?: () => void;
  defaultOpen?: boolean;
};
declare function Collapsible(props: TCollapsibleProps): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/collapsible/collapsible-button.d.ts
type Props$10 = {
  isOpen: boolean;
  title: React$1.ReactNode;
  hideChevron?: boolean;
  indicatorElement?: React$1.ReactNode;
  actionItemElement?: React$1.ReactNode;
  className?: string;
  titleClassName?: string;
  ChevronIcon?: React$1.FC<ISvgIcons>;
};
declare function CollapsibleButton(props: Props$10): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/color-picker/color-picker.d.ts
interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  className?: string;
}
declare function ColorPicker(props: ColorPickerProps): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/constants/icons.d.ts
declare const MATERIAL_ICONS_LIST: {
  name: string;
}[];
declare const LUCIDE_ICONS_LIST: ({
  name: string;
  element: React$2.ForwardRefExoticComponent<Omit<lucide_react0.LucideProps, "ref"> & React$2.RefAttributes<SVGSVGElement>>;
} | {
  name: string;
  element: typeof ChevronDownIcon;
})[];
//#endregion
//#region src/row/helper.d.ts
declare enum ERowVariant {
  REGULAR = "regular",
  HUGGING = "hugging",
}
type TRowVariant = ERowVariant.REGULAR | ERowVariant.HUGGING;
//#endregion
//#region src/content-wrapper/content-wrapper.d.ts
interface ContentWrapperProps extends React$2.HTMLAttributes<HTMLDivElement> {
  variant?: TRowVariant;
  className?: string;
  children: React$2.ReactNode;
}
declare const ContentWrapper: React$2.ForwardRefExoticComponent<ContentWrapperProps & React$2.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/control-link/control-link.d.ts
type TControlLink = React$2.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  onClick: (event: React$2.MouseEvent<HTMLAnchorElement>) => void;
  children: React$2.ReactNode;
  target?: string;
  disabled?: boolean;
  className?: string;
  draggable?: boolean;
};
declare const ControlLink: React$2.ForwardRefExoticComponent<React$2.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  onClick: (event: React$2.MouseEvent<HTMLAnchorElement>) => void;
  children: React$2.ReactNode;
  target?: string;
  disabled?: boolean;
  className?: string;
  draggable?: boolean;
} & React$2.RefAttributes<HTMLAnchorElement>>;
//#endregion
//#region src/drag-handle.d.ts
interface IDragHandle {
  className?: string;
  disabled?: boolean;
}
declare const DragHandle: React$1.ForwardRefExoticComponent<IDragHandle & React$1.RefAttributes<HTMLButtonElement | null>>;
//#endregion
//#region src/drop-indicator.d.ts
type Props$9 = {
  isVisible: boolean;
  classNames?: string;
};
declare function DropIndicator(props: Props$9): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/dropdown/common/input-search.d.ts
interface IInputSearch {
  isOpen: boolean;
  query: string;
  updateQuery: (query: string) => void;
  inputIcon?: React$1.ReactNode;
  inputContainerClassName?: string;
  inputClassName?: string;
  inputPlaceholder?: string;
  isMobile: boolean;
}
declare function InputSearch(props: IInputSearch): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/dropdown/dropdown.d.ts
interface IDropdown {
  // root props
  onOpen?: () => void;
  onClose?: () => void;
  containerClassName?: string | ((isOpen: boolean) => string);
  tabIndex?: number;
  placement?: Placement;
  disabled?: boolean;

  // button props
  buttonContent?: (isOpen: boolean, value: string | string[] | undefined) => React.ReactNode;
  buttonContainerClassName?: string;
  buttonClassName?: string;

  // input props
  disableSearch?: boolean;
  inputPlaceholder?: string;
  inputClassName?: string;
  inputIcon?: React.ReactNode;
  inputContainerClassName?: string;

  // options props
  keyExtractor: (option: TDropdownOption) => string;
  optionsContainerClassName?: string;
  queryArray?: string[];
  sortByKey?: string;
  firstItem?: (optionValue: string) => boolean;
  renderItem?: ({
    value,
    selected,
    disabled
  }: {
    value: string;
    selected: boolean;
    disabled?: boolean;
  }) => React.ReactNode;
  loader?: React.ReactNode;
  disableSorting?: boolean;
}
interface TDropdownOption {
  data: any;
  value: string;
  className?: ({
    active,
    selected
  }: {
    active: boolean;
    selected?: boolean;
  }) => string;
  disabled?: boolean;
}
interface IMultiSelectDropdown extends IDropdown {
  value: string[];
  onChange: (value: string[]) => void;
  options: TDropdownOption[] | undefined;
}
interface ISingleSelectDropdown extends IDropdown {
  value: string;
  onChange: (value: string) => void;
  options: TDropdownOption[] | undefined;
}
interface IDropdownButton {
  isOpen: boolean;
  buttonContent?: (isOpen: boolean, value: string | string[] | undefined) => React.ReactNode;
  buttonClassName?: string;
  buttonContainerClassName?: string;
  handleOnClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  setReferenceElement: (element: HTMLButtonElement | null) => void;
  disabled?: boolean;
}
interface IMultiSelectDropdownButton extends IDropdownButton {
  value: string[];
}
interface ISingleSelectDropdownButton extends IDropdownButton {
  value: string;
}
interface IDropdownOptions {
  isOpen: boolean;
  query: string;
  setQuery: (query: string) => void;
  inputPlaceholder?: string;
  inputClassName?: string;
  inputIcon?: React.ReactNode;
  inputContainerClassName?: string;
  disableSearch?: boolean;
  handleClose?: () => void;
  keyExtractor: (option: TDropdownOption) => string;
  renderItem: (({
    value,
    selected,
    disabled
  }: {
    value: string;
    selected: boolean;
    disabled?: boolean;
  }) => React.ReactNode) | undefined;
  options: TDropdownOption[] | undefined;
  loader?: React.ReactNode;
  isMobile?: boolean;
}
interface IMultiSelectDropdownOptions extends IDropdownOptions {
  value: string[];
}
interface ISingleSelectDropdownOptions extends IDropdownOptions {
  value: string;
}
//#endregion
//#region src/dropdown/common/button.d.ts
declare function DropdownButton(props: IMultiSelectDropdownButton | ISingleSelectDropdownButton): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/dropdown/common/options.d.ts
declare function DropdownOptions(props: IMultiSelectDropdownOptions | ISingleSelectDropdownOptions): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/dropdown/common/loader.d.ts
declare function DropdownOptionsLoader(): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/dropdown/multi-select.d.ts
declare function MultiSelectDropdown(props: IMultiSelectDropdown): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/dropdown/single-select.d.ts
declare function Dropdown(props: ISingleSelectDropdown): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/favorite-star.d.ts
type Props$8 = {
  buttonClassName?: string;
  iconClassName?: string;
  onClick: (e: React$1.MouseEvent<HTMLButtonElement>) => void;
  selected: boolean;
};
declare function FavoriteStar(props: Props$8): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/form-fields/input.d.ts
interface InputProps extends React$2.InputHTMLAttributes<HTMLInputElement> {
  mode?: "primary" | "transparent" | "true-transparent";
  inputSize?: "xs" | "sm" | "md";
  hasError?: boolean;
  className?: string;
  autoComplete?: "on" | "off";
}
declare const Input: React$2.ForwardRefExoticComponent<InputProps & React$2.RefAttributes<HTMLInputElement>>;
//#endregion
//#region src/form-fields/textarea.d.ts
interface TextAreaProps extends React$1.TextareaHTMLAttributes<HTMLTextAreaElement> {
  mode?: "primary" | "transparent" | "true-transparent";
  textAreaSize?: "xs" | "sm" | "md";
  hasError?: boolean;
  className?: string;
}
declare const TextArea: React$1.ForwardRefExoticComponent<TextAreaProps & React$1.RefAttributes<HTMLTextAreaElement>>;
//#endregion
//#region src/form-fields/input-color-picker.d.ts
interface InputColorPickerProps {
  hasError: boolean;
  value: string | undefined;
  onChange: (value: string) => void;
  name: string;
  className?: string;
  style?: React$2.CSSProperties;
  placeholder: string;
}
declare function InputColorPicker(props: InputColorPickerProps): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/form-fields/checkbox.d.ts
interface CheckboxProps extends React$2.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
  iconClassName?: string;
  indeterminate?: boolean;
}
declare const Checkbox: React$2.ForwardRefExoticComponent<CheckboxProps & React$2.RefAttributes<HTMLInputElement>>;
//#endregion
//#region src/form-fields/root.d.ts
interface LabelProps {
  htmlFor: string;
  children: React$1.ReactNode;
  className?: string;
}
declare function Label({
  htmlFor,
  children,
  className
}: LabelProps): react_jsx_runtime5.JSX.Element;
interface FormFieldProps {
  label: string;
  htmlFor: string;
  children: React$1.ReactNode;
  className?: string;
  optional?: boolean;
}
declare function FormField({
  label,
  htmlFor,
  children,
  className,
  optional
}: FormFieldProps): react_jsx_runtime5.JSX.Element;
interface ValidationMessageProps {
  type: "error" | "success";
  message: string;
  className?: string;
}
declare function ValidationMessage({
  type,
  message,
  className
}: ValidationMessageProps): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/form-fields/password/indicator.d.ts
interface PasswordStrengthIndicatorProps {
  password: string;
  showCriteria?: boolean;
  isFocused?: boolean;
}
declare function PasswordStrengthIndicator({
  password,
  showCriteria,
  isFocused
}: PasswordStrengthIndicatorProps): react_jsx_runtime5.JSX.Element | null;
//#endregion
//#region src/form-fields/password/helper.d.ts
interface StrengthInfo {
  message: string;
  textColor: string;
  activeFragments: number;
}
/**
 * Get strength information including message, color, and active fragments
 */
declare const getStrengthInfo: (strength: E_PASSWORD_STRENGTH) => StrengthInfo;
/**
 * Get fragment color based on position and active state
 */
declare const getFragmentColor: (fragmentIndex: number, activeFragments: number) => string;
//#endregion
//#region src/form-fields/password/password-input.d.ts
interface PasswordInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  showToggle?: boolean;
  error?: boolean;
}
declare function PasswordInput({
  id,
  value,
  onChange,
  placeholder,
  className,
  showToggle,
  error
}: PasswordInputProps): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/header/helper.d.ts
declare enum EHeaderVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  TERNARY = "ternary",
}
type THeaderVariant = EHeaderVariant.PRIMARY | EHeaderVariant.SECONDARY | EHeaderVariant.TERNARY;
//#endregion
//#region src/header/header.d.ts
interface HeaderProps {
  variant?: THeaderVariant;
  setHeight?: boolean;
  className?: string;
  children: React$2.ReactNode;
  showOnMobile?: boolean;
}
declare function Header(props: HeaderProps): react_jsx_runtime5.JSX.Element;
declare namespace Header {
  var LeftItem: (props: HeaderProps) => react_jsx_runtime5.JSX.Element;
  var RightItem: (props: HeaderProps) => react_jsx_runtime5.JSX.Element;
  var displayName: string;
}
//#endregion
//#region src/link/block.d.ts
type TLinkItemBlockProps = {
  title: string;
  url: string;
  createdAt?: Date | string;
  menuItems?: TContextMenuItem[];
  onClick?: () => void;
};
declare function LinkItemBlock(props: TLinkItemBlockProps): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/loader.d.ts
type Props$7 = {
  children: React$1.ReactNode;
  className?: string;
};
declare function Loader({
  children,
  className
}: Props$7): react_jsx_runtime5.JSX.Element;
declare namespace Loader {
  var Item: ({
    height,
    width,
    className
  }: ItemProps) => react_jsx_runtime5.JSX.Element;
  var displayName: string;
}
type ItemProps = {
  height?: string;
  width?: string;
  className?: string;
};
//#endregion
//#region src/modals/constants.d.ts
declare enum EModalPosition {
  TOP = "flex items-center justify-center text-center mx-4 my-10 md:my-20",
  CENTER = "flex items-end sm:items-center justify-center p-4 min-h-full",
}
declare enum EModalWidth {
  SM = "sm:max-w-sm",
  MD = "sm:max-w-md",
  LG = "sm:max-w-lg",
  XL = "sm:max-w-xl",
  XXL = "sm:max-w-2xl",
  XXXL = "sm:max-w-3xl",
  XXXXL = "sm:max-w-4xl",
  VXL = "sm:max-w-5xl",
  VIXL = "sm:max-w-6xl",
  VIIXL = "sm:max-w-7xl",
}
//#endregion
//#region src/modals/alert-modal.d.ts
type TModalVariant = "danger" | "primary";
type Props$6 = {
  content: React$1.ReactNode | string;
  handleClose: () => void;
  handleSubmit: () => void;
  hideIcon?: boolean;
  isSubmitting: boolean;
  isOpen: boolean;
  position?: EModalPosition;
  primaryButtonText?: {
    loading: string;
    default: string;
  };
  secondaryButtonText?: string;
  title: string;
  variant?: TModalVariant;
  width?: EModalWidth;
};
declare function AlertModalCore(props: Props$6): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/modals/modal-core.d.ts
type Props$5 = {
  children: React$1.ReactNode;
  handleClose?: () => void;
  isOpen: boolean;
  position?: EModalPosition;
  width?: EModalWidth;
  className?: string;
};
declare function ModalCore(props: Props$5): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/popovers/types.d.ts
type TPopoverButtonDefaultOptions = {
  button?: ReactNode;
  buttonClassName?: string;
  buttonRefClassName?: string;
  disabled?: boolean;
};
type TPopoverDefaultOptions = TPopoverButtonDefaultOptions & {
  popperPosition?: Placement | undefined;
  popperPadding?: number | undefined;
  panelClassName?: string;
  popoverClassName?: string;
  popoverButtonRef?: MutableRefObject<HTMLButtonElement | null>;
};
type TPopover = TPopoverDefaultOptions & {
  children: ReactNode;
};
type TPopoverMenu<T> = TPopoverDefaultOptions & {
  data: T[];
  keyExtractor: (item: T, index: number) => string;
  render: (item: T, index: number) => ReactNode;
};
//#endregion
//#region src/popovers/popover.d.ts
declare function Popover(props: TPopover): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/popovers/popover-menu.d.ts
declare function PopoverMenu<T>(props: TPopoverMenu<T>): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/progress/radial-progress.d.ts
interface IRadialProgressBar {
  progress: number;
}
declare function RadialProgressBar(props: IRadialProgressBar): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/progress/progress-bar.d.ts
type Props$4 = {
  maxValue?: number;
  value?: number;
  radius?: number;
  strokeWidth?: number;
  activeStrokeColor?: string;
  inactiveStrokeColor?: string;
};
declare function ProgressBar({
  maxValue,
  value,
  radius,
  strokeWidth,
  activeStrokeColor,
  inactiveStrokeColor
}: Props$4): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/progress/linear-progress-indicator.d.ts
type Props$3 = {
  data: any;
  noTooltip?: boolean;
  inPercentage?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  barClassName?: string;
};
declare function LinearProgressIndicator({
  data,
  noTooltip,
  inPercentage,
  size,
  className,
  barClassName
}: Props$3): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/progress/circular-progress-indicator.d.ts
interface ICircularProgressIndicator {
  size: number;
  percentage: number;
  strokeWidth?: number;
  strokeColor?: string;
  children?: React$1.ReactNode;
}
declare function CircularProgressIndicator(props: ICircularProgressIndicator): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/row/row.d.ts
interface RowProps extends React$2.HTMLAttributes<HTMLDivElement> {
  variant?: TRowVariant;
  className?: string;
  children: React$2.ReactNode;
}
declare const Row: React$2.ForwardRefExoticComponent<RowProps & React$2.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/scroll-area.d.ts
type TScrollAreaProps = {
  type?: "auto" | "always" | "scroll" | "hover";
  className?: string;
  scrollHideDelay?: number;
  size?: "sm" | "md" | "lg";
  children: React$1.ReactNode;
};
declare function ScrollArea(props: TScrollAreaProps): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/sortable/sortable.d.ts
type TEnhancedData<T> = T & {
  __uuid__?: string;
};
type Props$2<T> = {
  data: TEnhancedData<T>[];
  render: (item: T, index: number) => React$1.ReactNode;
  onChange: (data: T[], movedItem?: T) => void;
  keyExtractor: (item: T, index: number) => string;
  containerClassName?: string;
  id?: string;
};
declare function Sortable<T>({
  data,
  render,
  onChange,
  keyExtractor,
  containerClassName,
  id
}: Props$2<T>): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/sortable/draggable.d.ts
type Props$1 = {
  children: React$1.ReactNode;
  data: any;
  className?: string;
};
declare function Draggable({
  children,
  data,
  className
}: Props$1): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/spinners/circular-spinner.d.ts
interface ISpinner extends React$2.SVGAttributes<SVGElement> {
  height?: string;
  width?: string;
  className?: string | undefined;
}
declare function Spinner({
  height,
  width,
  className
}: ISpinner): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/spinners/circular-bar-spinner.d.ts
interface ICircularBarSpinner extends React$2.SVGAttributes<SVGElement> {
  height?: string;
  width?: string;
  className?: string | undefined;
}
declare function CircularBarSpinner({
  height,
  width,
  className
}: ICircularBarSpinner): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/tables/types.d.ts
type TTableColumn<T> = {
  key: string;
  content: string;
  thRender?: () => React.ReactNode;
  tdRender: (rowData: T) => React.ReactNode;
};
type TTableData<T> = {
  data: T[];
  columns: TTableColumn<T>[];
  keyExtractor: (rowData: T) => string;
  tableClassName?: string;
  tHeadClassName?: string;
  tHeadTrClassName?: string;
  thClassName?: string;
  tBodyClassName?: string;
  tBodyTrClassName?: string;
  tdClassName?: string;
};
//#endregion
//#region src/tables/table.d.ts
declare function Table<T>(props: TTableData<T>): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/tabs/tab-list.d.ts
type TabListItem = {
  key: string;
  icon?: FC<LucideProps>;
  label?: React$1.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};
type TTabListProps = {
  tabs: TabListItem[];
  tabListClassName?: string;
  tabClassName?: string;
  size?: "sm" | "md" | "lg";
  selectedTab?: string;
  onTabChange?: (key: string) => void;
};
declare function TabList({
  tabs,
  tabListClassName,
  tabClassName,
  size,
  selectedTab,
  onTabChange
}: TTabListProps): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/tabs/tabs.d.ts
type TabContent = {
  content: React$1.ReactNode;
};
type TabItem = TabListItem & TabContent;
type TTabsProps = {
  tabs: TabItem[];
  storageKey?: string;
  actions?: React$1.ReactNode;
  defaultTab?: string;
  containerClassName?: string;
  tabListContainerClassName?: string;
  tabListClassName?: string;
  tabClassName?: string;
  tabPanelClassName?: string;
  size?: "sm" | "md" | "lg";
  storeInLocalStorage?: boolean;
};
declare function Tabs(props: TTabsProps): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/tag/helper.d.ts
declare enum ETagVariant {
  OUTLINED = "outlined",
}
declare enum ETagSize {
  SM = "sm",
  LG = "lg",
}
type TTagVariant = ETagVariant.OUTLINED;
type TTagSize = ETagSize.SM | ETagSize.LG;
//#endregion
//#region src/tag/tag.d.ts
interface TagProps extends React$2.ComponentProps<"div"> {
  variant?: TTagVariant;
  size?: TTagSize;
  className?: string;
  children: React$2.ReactNode;
}
declare const Tag: React$2.ForwardRefExoticComponent<Omit<TagProps, "ref"> & React$2.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/tooltip/tooltip.d.ts
type TPosition = "top" | "right" | "bottom" | "left" | "auto" | "auto-end" | "auto-start" | "bottom-left" | "bottom-right" | "left-bottom" | "left-top" | "right-bottom" | "right-top" | "top-left" | "top-right";
interface ITooltipProps {
  tooltipHeading?: string;
  tooltipContent: string | React$1.ReactNode;
  position?: TPosition;
  children: React$1.ReactElement;
  disabled?: boolean;
  className?: string;
  openDelay?: number;
  closeDelay?: number;
  isMobile?: boolean;
  renderByDefault?: boolean;
}
declare function Tooltip({
  tooltipHeading,
  tooltipContent,
  position,
  children,
  disabled,
  className,
  openDelay,
  closeDelay,
  isMobile,
  renderByDefault
}: ITooltipProps): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/typography/sub-heading.d.ts
type Props = {
  children: React$1.ReactNode;
  className?: string;
  noMargin?: boolean;
};
declare function SubHeading({
  children,
  className,
  noMargin
}: Props): react_jsx_runtime5.JSX.Element;
//#endregion
//#region src/utils/classname.d.ts
declare const cn: (...inputs: ClassValue[]) => string;
//#endregion
//#region src/utils/icons.d.ts
/**
 * Returns a random icon name from the LUCIDE_ICONS_LIST array
 */
declare const getRandomIconName: () => string;
//#endregion
//#region src/billing/subscription.d.ts
declare const getSubscriptionTextColor: (planVariant: EProductSubscriptionEnum, shade?: "200" | "400") => string;
declare const getSubscriptionBackgroundColor: (planVariant: EProductSubscriptionEnum, shade?: "50" | "100" | "200" | "400") => string;
declare const getSubscriptionBorderColor: (planVariant: EProductSubscriptionEnum, shade?: "200" | "400") => string;
declare const getUpgradeButtonStyle: (planVariant: EProductSubscriptionEnum, isDisabled: boolean) => string | undefined;
declare const getUpgradeCardVariantStyle: (planVariant: EProductSubscriptionEnum) => string | undefined;
declare const getSuccessModalVariantStyle: (planVariant: EProductSubscriptionEnum) => string;
declare const getBillingAndPlansCardVariantStyle: (planVariant: EProductSubscriptionEnum) => string;
declare const getSubscriptionTextAndBackgroundColor: (planVariant: EProductSubscriptionEnum) => string;
declare const getDiscountPillStyle: (planVariant: EProductSubscriptionEnum) => string;
//#endregion
//#region src/oauth/oauth-options.d.ts
type TOAuthOption = {
  id: string;
  text: string;
  icon: React$2.ReactNode;
  onClick: () => void;
  enabled?: boolean;
};
type OAuthOptionsProps = {
  options: TOAuthOption[];
  compact?: boolean;
  className?: string;
  containerClassName?: string;
};
declare function OAuthOptions(props: OAuthOptionsProps): react_jsx_runtime5.JSX.Element | null;
//#endregion
export { AlertModalCore, Avatar, AvatarGroup, Badge, BadgeProps, BreadcrumbIcon, BreadcrumbItem, BreadcrumbItemLoader, BreadcrumbItemWrapper, BreadcrumbLabel, BreadcrumbNavigationDropdown, BreadcrumbNavigationSearchDropdown, BreadcrumbSeparator, Breadcrumbs, Button, ButtonProps, Card, CardProps, Checkbox, CheckboxProps, CircularBarSpinner, CircularProgressIndicator, Collapsible, CollapsibleButton, ColorPicker, ComboDropDown, ComboInput, ComboOption, ComboOptions, ContentWrapper, ContentWrapperProps, ContextMenu, ContextMenuContext, ContextMenuItem, ControlLink, CustomMenu, CustomSearchSelect, CustomSelect, DragHandle, Draggable, DropIndicator, Dropdown, DropdownButton, DropdownOptions, DropdownOptionsLoader, ECardDirection, ECardSpacing, ECardVariant, EHeaderVariant, EModalPosition, EModalWidth, ERowVariant, ETagSize, ETagVariant, FavoriteStar, FormField, Header, HeaderProps, IButtonStyling, ISpinner, Input, InputColorPicker, InputColorPickerProps, InputProps, InputSearch, LUCIDE_ICONS_LIST, Label, LinearProgressIndicator, LinkItemBlock, Loader, MATERIAL_ICONS_LIST, ModalCore, MultiSelectDropdown, OAuthOptions, PasswordInput, PasswordStrengthIndicator, PasswordStrengthIndicatorProps, Popover, PopoverMenu, Portal, ProgressBar, RadialProgressBar, Row, RowProps, ScrollArea, Sortable, Spinner, StrengthInfo, SubHeading, TAvatarSize, TButtonSizes, TButtonVariant, TCollapsibleProps, TContextMenuItem, TControlLink, TLinkItemBlockProps, TModalVariant, TOAuthOption, TPosition, TabContent, TabItem, TabList, TabListItem, Table, Tabs, Tag, TagProps, TextArea, TextAreaProps, ToggleSwitch, Tooltip, ValidationMessage, buttonStyling, cn, getBillingAndPlansCardVariantStyle, getBorderRadius, getButtonStyling, getDiscountPillStyle, getFragmentColor, getIconStyling, getRandomIconName, getSizeInfo, getStrengthInfo, getSubscriptionBackgroundColor, getSubscriptionBorderColor, getSubscriptionTextAndBackgroundColor, getSubscriptionTextColor, getSuccessModalVariantStyle, getUpgradeButtonStyle, getUpgradeCardVariantStyle, isAValidNumber };
//# sourceMappingURL=index.d.ts.map