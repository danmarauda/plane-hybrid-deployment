import React from "react";
import * as react_jsx_runtime20 from "react/jsx-runtime";

//#region src/skeleton/root.d.ts
type SkeletonProps = {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
};
declare function SkeletonRoot({
  children,
  className,
  ariaLabel
}: SkeletonProps): react_jsx_runtime20.JSX.Element;
declare namespace SkeletonRoot {
  var displayName: string;
}
type ItemProps = {
  height?: string;
  width?: string;
  className?: string;
};
declare function SkeletonItem({
  height,
  width,
  className
}: ItemProps): react_jsx_runtime20.JSX.Element;
declare namespace SkeletonItem {
  var displayName: string;
}
declare const Skeleton: typeof SkeletonRoot & {
  Item: typeof SkeletonItem;
};
//#endregion
export { Skeleton, SkeletonItem, SkeletonRoot };
//# sourceMappingURL=index.d.ts.map