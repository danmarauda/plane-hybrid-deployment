import { n as TPlacement, r as TSide, t as TAlign } from "../placement-CnF1q1iR.js";
import * as React$1 from "react";
import React from "react";
import * as react_jsx_runtime28 from "react/jsx-runtime";

//#region src/emoji-reaction/emoji-reaction.d.ts
interface EmojiReactionType {
  emoji: string;
  count: number;
  reacted?: boolean;
  users?: string[];
}
interface EmojiReactionProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement> {
  emoji: string;
  count: number;
  reacted?: boolean;
  users?: string[];
  onReactionClick?: (emoji: string) => void;
  className?: string;
  showCount?: boolean;
}
interface EmojiReactionGroupProps extends React$1.HTMLAttributes<HTMLDivElement> {
  reactions: EmojiReactionType[];
  onReactionClick?: (emoji: string) => void;
  onAddReaction?: () => void;
  className?: string;
  showAddButton?: boolean;
  maxDisplayUsers?: number;
}
interface EmojiReactionButtonProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement> {
  onAddReaction?: () => void;
  className?: string;
}
declare const EmojiReaction: React$1.ForwardRefExoticComponent<EmojiReactionProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const EmojiReactionButton: React$1.ForwardRefExoticComponent<EmojiReactionButtonProps & React$1.RefAttributes<HTMLButtonElement>>;
declare const EmojiReactionGroup: React$1.ForwardRefExoticComponent<EmojiReactionGroupProps & React$1.RefAttributes<HTMLDivElement>>;
//#endregion
//#region src/emoji-reaction/emoji-reaction-picker.d.ts
interface EmojiReactionPickerProps {
  isOpen: boolean;
  handleToggle: (value: boolean) => void;
  buttonClassName?: string;
  closeOnSelect?: boolean;
  disabled?: boolean;
  dropdownClassName?: string;
  label: React.ReactNode;
  onChange: (emoji: string) => void;
  placement?: TPlacement;
  searchDisabled?: boolean;
  searchPlaceholder?: string;
  side?: TSide;
  align?: TAlign;
}
declare function EmojiReactionPicker(props: EmojiReactionPickerProps): react_jsx_runtime28.JSX.Element;
//#endregion
export { EmojiReaction, EmojiReactionButton, type EmojiReactionButtonProps, EmojiReactionGroup, type EmojiReactionGroupProps, EmojiReactionPicker, type EmojiReactionPickerProps, type EmojiReactionProps, type EmojiReactionType };
//# sourceMappingURL=index.d.ts.map