import { Gn as ISvgIcons } from "../index-ldoo5mRF.js";
import * as React$1 from "react";
import { LucideIcon } from "lucide-react";

//#region src/toolbar/toolbar.d.ts
interface ToolbarProps extends React$1.HTMLAttributes<HTMLDivElement> {
  children: React$1.ReactNode;
  className?: string;
}
interface ToolbarGroupProps extends React$1.HTMLAttributes<HTMLDivElement> {
  children: React$1.ReactNode;
  className?: string;
  isFirst?: boolean;
}
interface ToolbarItemProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon | React$1.FC<ISvgIcons>;
  isActive?: boolean;
  tooltip?: string;
  shortcut?: string[];
  className?: string;
  children?: React$1.ReactNode;
}
interface ToolbarSeparatorProps extends React$1.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
interface ToolbarSubmitButtonProps extends React$1.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  className?: string;
  children: React$1.ReactNode;
}
declare const Toolbar: React$1.ForwardRefExoticComponent<ToolbarProps & React$1.RefAttributes<HTMLDivElement>> & {
  Group: React$1.ForwardRefExoticComponent<ToolbarGroupProps & React$1.RefAttributes<HTMLDivElement>>;
  Item: React$1.ForwardRefExoticComponent<ToolbarItemProps & React$1.RefAttributes<HTMLButtonElement>>;
  Separator: React$1.ForwardRefExoticComponent<ToolbarSeparatorProps & React$1.RefAttributes<HTMLDivElement>>;
  SubmitButton: React$1.ForwardRefExoticComponent<ToolbarSubmitButtonProps & React$1.RefAttributes<HTMLButtonElement>>;
};
//#endregion
export { Toolbar, type ToolbarGroupProps, type ToolbarItemProps, type ToolbarProps, type ToolbarSeparatorProps, type ToolbarSubmitButtonProps };
//# sourceMappingURL=index.d.ts.map