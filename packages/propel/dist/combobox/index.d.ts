import * as React$1 from "react";
import * as react_jsx_runtime6 from "react/jsx-runtime";

//#region src/combobox/combobox.d.ts
type TMaxHeight = "lg" | "md" | "rg" | "sm";
interface ComboboxProps {
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  multiSelect?: boolean;
  maxSelections?: number;
  disabled?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React$1.ReactNode;
}
interface ComboboxButtonProps {
  disabled?: boolean;
  children?: React$1.ReactNode;
  className?: string;
  ref?: React$1.Ref<HTMLButtonElement>;
}
interface ComboboxOptionsProps {
  searchPlaceholder?: string;
  emptyMessage?: string;
  showSearch?: boolean;
  className?: string;
  children?: React$1.ReactNode;
  maxHeight?: TMaxHeight;
  inputClassName?: string;
  optionsContainerClassName?: string;
  positionerClassName?: string;
  searchQuery?: string;
  onSearchQueryChange?: (query: string) => void;
  onSearchQueryKeyDown?: (e: React$1.KeyboardEvent<HTMLInputElement>) => void;
  dataPreventOutsideClick?: boolean;
}
interface ComboboxOptionProps {
  value: string;
  disabled?: boolean;
  children?: React$1.ReactNode;
  className?: string;
}
declare function ComboboxRoot({
  value,
  defaultValue,
  onValueChange,
  multiSelect,
  disabled,
  open,
  onOpenChange,
  children
}: ComboboxProps): react_jsx_runtime6.JSX.Element;
declare function ComboboxOptions({
  children,
  showSearch,
  searchPlaceholder,
  maxHeight,
  className,
  inputClassName,
  optionsContainerClassName,
  emptyMessage,
  positionerClassName,
  searchQuery: controlledSearchQuery,
  onSearchQueryChange,
  onSearchQueryKeyDown,
  dataPreventOutsideClick
}: ComboboxOptionsProps): react_jsx_runtime6.JSX.Element;
declare function ComboboxOption({
  value,
  children,
  disabled,
  className
}: ComboboxOptionProps): react_jsx_runtime6.JSX.Element;
declare const Combobox: typeof ComboboxRoot & {
  Button: React$1.ForwardRefExoticComponent<Omit<ComboboxButtonProps, "ref"> & React$1.RefAttributes<HTMLButtonElement>>;
  Options: typeof ComboboxOptions;
  Option: typeof ComboboxOption;
};
//#endregion
export { Combobox, ComboboxButtonProps, ComboboxOptionProps, ComboboxOptionsProps, ComboboxProps };
//# sourceMappingURL=index.d.ts.map