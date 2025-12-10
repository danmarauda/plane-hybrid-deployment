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
export { getButtonStyling as a, buttonStyling as i, TButtonSizes as n, getIconStyling as o, TButtonVariant as r, IButtonStyling as t };
//# sourceMappingURL=helper-BeEr4bgp.d.ts.map