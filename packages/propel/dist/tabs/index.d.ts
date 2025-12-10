import * as React$1 from "react";
import { Tabs as Tabs$1 } from "@base-ui-components/react/tabs";

//#region src/tabs/tabs.d.ts
declare const TabsList: React$1.ForwardRefExoticComponent<Omit<Tabs$1.List.Props & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const TabsTrigger: React$1.ForwardRefExoticComponent<Omit<Tabs$1.Tab.Props & React$1.RefAttributes<Element> & {
  size?: "sm" | "md" | "lg";
}, "ref"> & React$1.RefAttributes<Element>>;
declare const TabsContent: React$1.ForwardRefExoticComponent<Omit<Tabs$1.Panel.Props & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const TabsIndicator: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
declare const Tabs: React$1.ForwardRefExoticComponent<Omit<Tabs$1.Root.Props & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>> & {
  List: React$1.ForwardRefExoticComponent<Omit<Tabs$1.List.Props & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
  Trigger: React$1.ForwardRefExoticComponent<Omit<Tabs$1.Tab.Props & React$1.RefAttributes<Element> & {
    size?: "sm" | "md" | "lg";
  }, "ref"> & React$1.RefAttributes<Element>>;
  Content: React$1.ForwardRefExoticComponent<Omit<Tabs$1.Panel.Props & React$1.RefAttributes<HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
  Indicator: React$1.ForwardRefExoticComponent<Omit<React$1.DetailedHTMLProps<React$1.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "ref"> & React$1.RefAttributes<HTMLDivElement>>;
};
//#endregion
export { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger };
//# sourceMappingURL=index.d.ts.map