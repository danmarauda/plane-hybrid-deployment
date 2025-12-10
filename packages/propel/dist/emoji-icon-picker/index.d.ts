import { n as TPlacement, r as TSide, t as TAlign } from "../placement-CnF1q1iR.js";
import { Ln as ChevronDownIcon } from "../index-ldoo5mRF.js";
import * as react0 from "react";
import * as lucide_react0 from "lucide-react";
import * as react_jsx_runtime29 from "react/jsx-runtime";
import { TLogoProps } from "@plane/types";

//#region src/emoji-icon-picker/helper.d.ts
declare const EmojiIconPickerTypes: {
  readonly EMOJI: "emoji";
  readonly ICON: "icon";
};
type TChangeHandlerProps = {
  type: typeof EmojiIconPickerTypes.EMOJI;
  value: string;
} | {
  type: typeof EmojiIconPickerTypes.ICON;
  value: {
    name: string;
    color: string;
  };
};
type TEmojiIconPickerTypes = typeof EmojiIconPickerTypes.EMOJI | typeof EmojiIconPickerTypes.ICON;
type TCustomEmojiPicker = {
  isOpen: boolean;
  handleToggle: (value: boolean) => void;
  buttonClassName?: string;
  className?: string;
  closeOnSelect?: boolean;
  defaultIconColor?: string;
  defaultOpen?: TEmojiIconPickerTypes;
  disabled?: boolean;
  dropdownClassName?: string;
  label: React.ReactNode;
  onChange: (value: TChangeHandlerProps) => void;
  placement?: TPlacement;
  searchDisabled?: boolean;
  searchPlaceholder?: string;
  iconType?: "material" | "lucide";
  theme?: "light" | "dark";
  side?: TSide;
  align?: TAlign;
};
type TIconsListProps = {
  defaultColor: string;
  onChange: (val: {
    name: string;
    color: string;
  }) => void;
  searchDisabled?: boolean;
};
/**
 * Adjusts the given hex color to ensure it has enough contrast.
 * @param {string} hex - The hex color code input by the user.
 * @returns {string} - The adjusted hex color code.
 */
declare const adjustColorForContrast: (hex: string) => string;
declare const DEFAULT_COLORS: string[];
/**
 * Enhanced emoji to decimal conversion that preserves emoji sequences
 * This function handles complex emoji sequences including skin tone modifiers
 * @param emoji - The emoji string to convert
 * @returns Array of decimal Unicode code points
 */
declare function emojiToDecimalEnhanced(emoji: string): number[];
/**
 * Enhanced decimal to emoji conversion that handles emoji sequences
 * @param decimals - Array of decimal Unicode code points
 * @returns The reconstructed emoji string
 */
declare function decimalToEmojiEnhanced(decimals: number[]): string;
/**
 * Converts emoji to a string representation for storage
 * This creates a comma-separated string of decimal values
 * @param emoji - The emoji string to convert
 * @returns String representation of decimal values
 */
declare function emojiToString(emoji: string): string;
/**
 * Converts string representation back to emoji
 * @param emojiString - Comma-separated string of decimal values
 * @returns The reconstructed emoji string
 */
declare function stringToEmoji(emojiString: string): string;
declare const getEmojiSize: (size: number) => number;
//#endregion
//#region src/emoji-icon-picker/emoji-picker.d.ts
declare function EmojiPicker(props: TCustomEmojiPicker): react_jsx_runtime29.JSX.Element;
//#endregion
//#region src/emoji-icon-picker/logo.d.ts
type Props = {
  logo: TLogoProps;
  size?: number;
  type?: "lucide" | "material";
};
declare function Logo(props: Props): react_jsx_runtime29.JSX.Element;
//#endregion
//#region src/emoji-icon-picker/lucide-icons.d.ts
declare const LUCIDE_ICONS_LIST: ({
  name: string;
  element: react0.ForwardRefExoticComponent<Omit<lucide_react0.LucideProps, "ref"> & react0.RefAttributes<SVGSVGElement>>;
} | {
  name: string;
  element: typeof ChevronDownIcon;
})[];
//#endregion
//#region src/emoji-icon-picker/material-icons.d.ts
declare const MATERIAL_ICONS_LIST: {
  name: string;
}[];
//#endregion
export { DEFAULT_COLORS, EmojiIconPickerTypes, EmojiPicker, LUCIDE_ICONS_LIST, Logo, MATERIAL_ICONS_LIST, TChangeHandlerProps, TCustomEmojiPicker, TEmojiIconPickerTypes, TIconsListProps, adjustColorForContrast, decimalToEmojiEnhanced, emojiToDecimalEnhanced, emojiToString, getEmojiSize, stringToEmoji };
//# sourceMappingURL=index.d.ts.map