import { r as TButtonVariant } from "../helper-BeEr4bgp.js";
import { t as TAlign } from "../placement-CnF1q1iR.js";
import React$1 from "react";
import * as react_jsx_runtime200 from "react/jsx-runtime";

//#region src/empty-state/assets/asset-types.d.ts
type HorizontalStackAssetType = "customer" | "epic" | "estimate" | "export" | "intake" | "label" | "link" | "members" | "note" | "priority" | "project" | "settings" | "state" | "template" | "token" | "unknown" | "update" | "webhook" | "work-item" | "worklog";
type VerticalStackAssetType = "archived-cycle" | "archived-module" | "archived-work-item" | "changelog" | "customer" | "cycle" | "dashboard" | "draft" | "epic" | "error-404" | "initiative" | "invalid-link" | "module" | "no-access" | "page" | "project" | "server-error" | "teamspace" | "view" | "work-item";
type IllustrationAssetType = "inbox" | "search";
type CompactAssetType = HorizontalStackAssetType | IllustrationAssetType;
type DetailedAssetType = VerticalStackAssetType | IllustrationAssetType;
//#endregion
//#region src/empty-state/assets/asset-registry.d.ts
declare const HORIZONTAL_STACK_ASSETS: Record<HorizontalStackAssetType, React$1.ComponentType<{
  className?: string;
}>>;
declare const VERTICAL_STACK_ASSETS: Record<VerticalStackAssetType, React$1.ComponentType<{
  className?: string;
}>>;
declare const ILLUSTRATION_ASSETS: Record<IllustrationAssetType, React$1.ComponentType<{
  className?: string;
}>>;
declare const getCompactAsset: (assetKey: CompactAssetType, className?: string) => React$1.ReactNode;
declare const getDetailedAsset: (assetKey: DetailedAssetType, className?: string) => React$1.ReactNode;
//#endregion
//#region src/empty-state/assets/helper.d.ts
declare const ILLUSTRATION_COLOR_TOKEN_MAP: {
  fill: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  stroke: {
    primary: string;
    secondary: string;
  };
};
type TIllustrationAssetProps = {
  className?: string;
};
//#endregion
//#region src/empty-state/assets/horizontal-stack/customer.d.ts
declare function CustomerHorizontalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/horizontal-stack/epic.d.ts
declare function EpicHorizontalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/horizontal-stack/estimate.d.ts
declare function EstimateHorizontalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/horizontal-stack/export.d.ts
declare function ExportHorizontalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/horizontal-stack/intake.d.ts
declare function IntakeHorizontalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/horizontal-stack/label.d.ts
declare function LabelHorizontalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/horizontal-stack/link.d.ts
declare function LinkHorizontalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/horizontal-stack/members.d.ts
declare function MembersHorizontalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/horizontal-stack/note.d.ts
declare function NoteHorizontalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/horizontal-stack/priority.d.ts
declare function PriorityHorizontalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/horizontal-stack/project.d.ts
declare function ProjectHorizontalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/horizontal-stack/settings.d.ts
declare function SettingsHorizontalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/horizontal-stack/state.d.ts
declare function StateHorizontalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/horizontal-stack/template.d.ts
declare function TemplateHorizontalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/horizontal-stack/token.d.ts
declare function TokenHorizontalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/horizontal-stack/unknown.d.ts
declare function UnknownHorizontalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/horizontal-stack/update.d.ts
declare function UpdateHorizontalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/horizontal-stack/webhook.d.ts
declare function WebhookHorizontalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/horizontal-stack/work-item.d.ts
declare function WorkItemHorizontalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/horizontal-stack/worklog.d.ts
declare function WorklogHorizontalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/illustration/inbox.d.ts
declare function InboxIllustration({
  className,
  ...rest
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/illustration/search.d.ts
declare function SearchIllustration({
  className,
  ...rest
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/vertical-stack/404-error.d.ts
declare function Error404VerticalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/vertical-stack/archived-cycle.d.ts
declare function ArchivedCycleVerticalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/vertical-stack/archived-module.d.ts
declare function ArchivedModuleVerticalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/vertical-stack/archived-work-item.d.ts
declare function ArchivedWorkItemVerticalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/vertical-stack/changelog.d.ts
declare function ChangelogVerticalStackIllustration({
  className,
  ...rest
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/vertical-stack/customer.d.ts
declare function CustomerVerticalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/vertical-stack/cycle.d.ts
declare function CycleVerticalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/vertical-stack/dashboard.d.ts
declare function DashboardVerticalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/vertical-stack/draft.d.ts
declare function DraftVerticalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/vertical-stack/epic.d.ts
declare function EpicVerticalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/vertical-stack/initiative.d.ts
declare function InitiativeVerticalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/vertical-stack/invalid-link.d.ts
declare function InvalidLinkVerticalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/vertical-stack/module.d.ts
declare function ModuleVerticalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/vertical-stack/no-access.d.ts
declare function NoAccessVerticalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/vertical-stack/page.d.ts
declare function PageVerticalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/vertical-stack/project.d.ts
declare function ProjectVerticalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/vertical-stack/server-error.d.ts
declare function ServerErrorVerticalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/vertical-stack/teamspace.d.ts
declare function TeamspaceVerticalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/vertical-stack/view.d.ts
declare function ViewVerticalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/assets/vertical-stack/work-item.d.ts
declare function WorkItemVerticalStackIllustration({
  className
}: TIllustrationAssetProps): react_jsx_runtime200.JSX.Element;
//#endregion
//#region src/empty-state/types.d.ts
interface ActionButton extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label: string;
  variant?: TButtonVariant;
  [key: `data-${string}`]: string | undefined;
}
interface BaseEmptyStateCommonProps {
  title?: string;
  actions?: ActionButton[];
  /** CSS classes for the content wrapper */
  className?: string;
  /** CSS classes for the root container */
  rootClassName?: string;
  /** CSS classes for the asset wrapper */
  assetClassName?: string;
  description?: string;
  assetKey?: CompactAssetType | DetailedAssetType;
  asset?: React.ReactNode;
  align?: TAlign;
  customButton?: React.ReactNode;
}
//#endregion
//#region src/empty-state/compact-empty-state.d.ts
declare function EmptyStateCompact({
  asset,
  assetKey,
  title,
  description,
  actions,
  className,
  rootClassName,
  assetClassName,
  align,
  customButton
}: BaseEmptyStateCommonProps): react_jsx_runtime200.JSX.Element;
declare namespace EmptyStateCompact {
  var displayName: string;
}
//#endregion
//#region src/empty-state/detailed-empty-state.d.ts
declare function EmptyStateDetailed({
  asset,
  assetKey,
  title,
  description,
  actions,
  className,
  rootClassName,
  assetClassName,
  customButton,
  align
}: BaseEmptyStateCommonProps): react_jsx_runtime200.JSX.Element;
declare namespace EmptyStateDetailed {
  var displayName: string;
}
//#endregion
//#region src/empty-state/empty-state.d.ts
/**
 * @deprecated Use EmptyStateCompact or EmptyStateDetailed directly with assetKey for better type safety
 *
 * This wrapper component maintains backward compatibility for existing code.
 * For new code, prefer:
 * - EmptyStateCompact with assetKey for simple states
 * - EmptyStateDetailed with assetKey for detailed states
 */
type EmptyStateType = "detailed" | "simple";
interface EmptyStateProps {
  /** @deprecated Use assetKey instead */
  asset?: React$1.ReactNode;
  title?: string;
  description?: string;
  actions?: BaseEmptyStateCommonProps["actions"];
  className?: string;
  rootClassName?: string;
  assetClassName?: string;
  type?: EmptyStateType;
  /** Type-safe asset key (use instead of asset) */
  assetKey?: CompactAssetType | DetailedAssetType;
}
declare function EmptyState({
  type,
  asset,
  assetKey,
  title,
  description,
  actions,
  className,
  rootClassName,
  assetClassName
}: EmptyStateProps): react_jsx_runtime200.JSX.Element;
declare namespace EmptyState {
  var displayName: string;
}
//#endregion
export { ActionButton, ArchivedCycleVerticalStackIllustration, ArchivedModuleVerticalStackIllustration, ArchivedWorkItemVerticalStackIllustration, BaseEmptyStateCommonProps, ChangelogVerticalStackIllustration, CompactAssetType, CustomerHorizontalStackIllustration, CustomerVerticalStackIllustration, CycleVerticalStackIllustration, DashboardVerticalStackIllustration, DetailedAssetType, DraftVerticalStackIllustration, EmptyState, EmptyStateCompact, EmptyStateDetailed, EmptyStateProps, EpicHorizontalStackIllustration, EpicVerticalStackIllustration, Error404VerticalStackIllustration, EstimateHorizontalStackIllustration, ExportHorizontalStackIllustration, HORIZONTAL_STACK_ASSETS, HorizontalStackAssetType, ILLUSTRATION_ASSETS, ILLUSTRATION_COLOR_TOKEN_MAP, IllustrationAssetType, InboxIllustration, InitiativeVerticalStackIllustration, IntakeHorizontalStackIllustration, InvalidLinkVerticalStackIllustration, LabelHorizontalStackIllustration, LinkHorizontalStackIllustration, MembersHorizontalStackIllustration, ModuleVerticalStackIllustration, NoAccessVerticalStackIllustration, NoteHorizontalStackIllustration, PageVerticalStackIllustration, PriorityHorizontalStackIllustration, ProjectHorizontalStackIllustration, ProjectVerticalStackIllustration, SearchIllustration, ServerErrorVerticalStackIllustration, SettingsHorizontalStackIllustration, StateHorizontalStackIllustration, TIllustrationAssetProps, TeamspaceVerticalStackIllustration, TemplateHorizontalStackIllustration, TokenHorizontalStackIllustration, UnknownHorizontalStackIllustration, UpdateHorizontalStackIllustration, VERTICAL_STACK_ASSETS, VerticalStackAssetType, ViewVerticalStackIllustration, WebhookHorizontalStackIllustration, WorkItemHorizontalStackIllustration, WorkItemVerticalStackIllustration, WorklogHorizontalStackIllustration, getCompactAsset, getDetailedAsset };
//# sourceMappingURL=index.d.ts.map