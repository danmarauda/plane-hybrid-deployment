import * as react1 from "react";
import { Dialog as Dialog$1 } from "@base-ui-components/react";

//#region src/dialog/root.d.ts
declare enum EDialogWidth {
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
type DialogPosition = "center" | "top";
interface DialogProps extends React.ComponentProps<typeof Dialog$1.Root> {
  children: React.ReactNode;
}
interface DialogPanelProps extends React.ComponentProps<typeof Dialog$1.Popup> {
  width?: EDialogWidth;
  position?: DialogPosition;
  children: React.ReactNode;
}
interface DialogTitleProps extends React.ComponentProps<typeof Dialog$1.Title> {
  children: React.ReactNode;
}
declare const DialogComponent: react1.NamedExoticComponent<DialogProps>;
declare const DialogPanel: react1.ForwardRefExoticComponent<Omit<DialogPanelProps, "ref"> & react1.RefAttributes<HTMLDivElement>>;
declare const DialogTitle: react1.NamedExoticComponent<DialogTitleProps>;
declare const Dialog: typeof DialogComponent & {
  Panel: typeof DialogPanel;
  Title: typeof DialogTitle;
};
//#endregion
export { Dialog, DialogPanel, DialogPanelProps, DialogPosition, DialogProps, DialogTitle, DialogTitleProps, EDialogWidth };
//# sourceMappingURL=index.d.ts.map