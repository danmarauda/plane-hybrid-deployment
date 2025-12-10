import * as react_jsx_runtime4 from "react/jsx-runtime";

//#region src/avatar/avatar.d.ts
type TAvatarSize = "sm" | "md" | "base" | "lg" | number;
type Props = {
  name?: string;
  fallbackBackgroundColor?: string;
  fallbackText?: string;
  fallbackTextColor?: string;
  showTooltip?: boolean;
  size?: TAvatarSize;
  shape?: "circle" | "square";
  src?: string;
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
declare const isAValidNumber: (value: unknown) => value is number;
declare function Avatar(props: Props): react_jsx_runtime4.JSX.Element;
//#endregion
export { Avatar, TAvatarSize, getBorderRadius, getSizeInfo, isAValidNumber };
//# sourceMappingURL=index.d.ts.map