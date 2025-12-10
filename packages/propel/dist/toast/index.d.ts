import * as React$1 from "react";
import * as react_jsx_runtime18 from "react/jsx-runtime";

//#region src/toast/toast.d.ts
declare enum TOAST_TYPE {
  SUCCESS = "success",
  ERROR = "error",
  INFO = "info",
  WARNING = "warning",
  LOADING = "loading",
  LOADING_TOAST = "loading-toast",
}
type SetToastProps = {
  type: TOAST_TYPE.LOADING;
  title?: string;
} | {
  id?: string | number;
  type: Exclude<TOAST_TYPE, TOAST_TYPE.LOADING>;
  title: string;
  message?: string;
  actionItems?: React$1.ReactNode;
};
type PromiseToastCallback<ToastData> = (data: ToastData) => string;
type ActionItemsPromiseToastCallback<ToastData> = (data: ToastData) => React$1.ReactNode;
type PromiseToastData<ToastData> = {
  title: string;
  message?: PromiseToastCallback<ToastData>;
  actionItems?: ActionItemsPromiseToastCallback<ToastData>;
};
type PromiseToastOptions<ToastData> = {
  loading?: string;
  success: PromiseToastData<ToastData>;
  error: PromiseToastData<ToastData>;
};
type ToastProps = {
  theme: "light" | "dark" | "system";
};
declare function Toast(props: ToastProps): react_jsx_runtime18.JSX.Element;
declare const setToast: (props: SetToastProps) => string;
declare const updateToast: (id: string, props: SetToastProps) => void;
declare const setPromiseToast: <ToastData>(promise: Promise<ToastData>, options: PromiseToastOptions<ToastData>) => void;
declare const dismissToast: (tId: string) => void;
//#endregion
export { TOAST_TYPE, Toast, ToastProps, dismissToast, setPromiseToast, setToast, updateToast };
//# sourceMappingURL=index.d.ts.map