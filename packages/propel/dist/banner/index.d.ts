import React from "react";

//#region src/banner/helper.d.ts
type TBannerVariant = "success" | "error" | "warning" | "info";
//#endregion
//#region src/banner/banner.d.ts
interface BannerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Visual variant of the banner */
  variant?: TBannerVariant;
  /** Icon to display before the title */
  icon?: React.ReactNode;
  /** Banner title/message */
  title?: React.ReactNode;
  /** Action elements to display on the right side */
  action?: React.ReactNode;
  /** Whether the banner can be dismissed */
  dismissible?: boolean;
  /** Callback when banner is dismissed */
  onDismiss?: () => void;
  /** Whether to show the banner */
  visible?: boolean;
  /** Animation duration for show/hide */
  animationDuration?: number;
}
declare const Banner: React.ForwardRefExoticComponent<BannerProps & React.RefAttributes<HTMLDivElement>>;
type BannerVariant = TBannerVariant;
//#endregion
export { Banner, type BannerProps, type BannerVariant, type TBannerVariant };
//# sourceMappingURL=index.d.ts.map