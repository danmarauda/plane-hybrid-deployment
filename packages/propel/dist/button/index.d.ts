import { a as getButtonStyling, i as buttonStyling, n as TButtonSizes, o as getIconStyling, r as TButtonVariant, t as IButtonStyling } from "../helper-BeEr4bgp.js";
import * as React$1 from "react";

//#region src/button/button.d.ts
interface ButtonProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: TButtonVariant;
  size?: TButtonSizes;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  appendIcon?: any;
  prependIcon?: any;
  children: React$1.ReactNode;
}
declare const Button: React$1.ForwardRefExoticComponent<ButtonProps & React$1.RefAttributes<HTMLButtonElement>>;
//#endregion
export { Button, type ButtonProps, IButtonStyling, TButtonSizes, TButtonVariant, buttonStyling, getButtonStyling, getIconStyling };
//# sourceMappingURL=index.d.ts.map