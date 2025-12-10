import { ReactNode } from "react";
import * as react_jsx_runtime36 from "react/jsx-runtime";

//#region src/tab-navigation/tab-navigation-types.d.ts
type TTabNavigationItemProps = {
  /** The content to display inside the tab (icons, text, etc.) */
  children: ReactNode;
  /** Whether this tab is currently active */
  isActive: boolean;
  /** Additional CSS class names */
  className?: string;
};
type TTabNavigationListProps = {
  /** The navigation items (each should be a TabNavigationItem wrapped in a routing component) */
  children: ReactNode;
  /** Additional CSS class names for the container */
  className?: string;
};
//#endregion
//#region src/tab-navigation/tab-navigation-item.d.ts
declare function TabNavigationItem({
  children,
  isActive,
  className
}: TTabNavigationItemProps): react_jsx_runtime36.JSX.Element;
declare namespace TabNavigationItem {
  var displayName: string;
}
//#endregion
//#region src/tab-navigation/tab-navigation-list.d.ts
declare function TabNavigationList({
  children,
  className
}: TTabNavigationListProps): react_jsx_runtime36.JSX.Element;
declare namespace TabNavigationList {
  var displayName: string;
}
//#endregion
export { type TTabNavigationItemProps, type TTabNavigationListProps, TabNavigationItem, TabNavigationList };
//# sourceMappingURL=index.d.ts.map