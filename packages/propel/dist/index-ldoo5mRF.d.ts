import * as React$2 from "react";
import * as react_jsx_runtime94 from "react/jsx-runtime";
import { EIconSize } from "@plane/constants";
import { TIntakeStateGroups } from "@plane/types";

//#region src/icons/type.d.ts
interface ISvgIcons extends React.SVGAttributes<SVGElement> {
  className?: string | undefined;
  percentage?: number;
}
//#endregion
//#region src/icons/actions/add-circle-icon.d.ts
declare function AddCircleIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/actions/add-icon.d.ts
declare function AddIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/actions/add-workitem-icon.d.ts
declare function AddWorkItemIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/actions/add-reaction-icon.d.ts
declare function AddReactionIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/actions/close-icon.d.ts
declare function CloseIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/actions/search-icon.d.ts
declare function SearchIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/actions/preferences-icon.d.ts
declare function PreferencesIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/arrows/chevron-down.d.ts
declare function ChevronDownIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/arrows/chevron-left.d.ts
declare function ChevronLeftIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/arrows/chevron-right.d.ts
declare function ChevronRightIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/arrows/chevron-up.d.ts
declare function ChevronUpIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/default-icon.d.ts
declare function DefaultIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/layouts/board-icon.d.ts
declare function BoardLayoutIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/layouts/calendar-icon.d.ts
declare function CalendarLayoutIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/layouts/card-icon.d.ts
declare function CardLayoutIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/layouts/grid-icon.d.ts
declare function GridLayoutIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/layouts/list-icon.d.ts
declare function ListLayoutIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/layouts/sheet-icon.d.ts
declare function SheetLayoutIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/layouts/timeline-icon.d.ts
declare function TimelineLayoutIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/project/cycle-icon.d.ts
declare function CycleIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/project/epic-icon.d.ts
declare function EpicIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/project/intake-icon.d.ts
declare function IntakeIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/project/module-icon.d.ts
declare function ModuleIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/project/page-icon.d.ts
declare function PageIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/project/view-icon.d.ts
declare function ViewsIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/project/work-items-icon.d.ts
declare function WorkItemsIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/properties/boolean-icon.d.ts
declare function BooleanPropertyIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/properties/dropdown-icon.d.ts
declare function DropdownPropertyIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/properties/due-date-icon.d.ts
declare function DueDatePropertyIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/properties/duplicate-icon.d.ts
declare function DuplicatePropertyIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/properties/estimate-icon.d.ts
declare function EstimatePropertyIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/properties/hash-icon.d.ts
declare function HashPropertyIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/properties/label-icon.d.ts
declare function LabelPropertyIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/properties/members-icon.d.ts
declare function MembersPropertyIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/properties/overdue-date-icon.d.ts
declare function OverdueDatePropertyIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/properties/parent-icon.d.ts
declare function ParentPropertyIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/properties/priority-icon.d.ts
declare function PriorityPropertyIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/properties/relates-to-icon.d.ts
declare function RelatesToPropertyIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/properties/relation-icon.d.ts
declare function RelationPropertyIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/properties/scope-icon.d.ts
declare function ScopePropertyIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/properties/start-date-icon.d.ts
declare function StartDatePropertyIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/properties/state-icon.d.ts
declare function StatePropertyIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/properties/user-circle-icon.d.ts
declare function UserCirclePropertyIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/properties/user-icon.d.ts
declare function UserPropertyIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/properties/user-square-icon.d.ts
declare function UserSquarePropertyIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/properties/workflows-icon.d.ts
declare function WorkflowsPropertyIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/sub-brand/pi-chat.d.ts
declare function PiChatLogo({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/sub-brand/plane-icon.d.ts
declare function PlaneNewIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/sub-brand/wiki-icon.d.ts
declare function WikiIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/workspace/analytics-icon.d.ts
declare function AnalyticsIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/workspace/archive-icon.d.ts
declare function ArchiveIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/workspace/dashboard-icon.d.ts
declare function DashboardIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/workspace/draft-icon.d.ts
declare function DraftIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/workspace/home-icon.d.ts
declare function HomeIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/workspace/inbox-icon.d.ts
declare function InboxIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/workspace/multiple-sticky-icon.d.ts
declare function MultipleStickyIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/workspace/project-icon.d.ts
declare function ProjectIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/workspace/your-work-icon.d.ts
declare function YourWorkIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/registry.d.ts
declare const ICON_REGISTRY: {
  readonly "sub-brand.plane": typeof PlaneNewIcon;
  readonly "sub-brand.wiki": typeof WikiIcon;
  readonly "sub-brand.pi-chat": typeof PiChatLogo;
  readonly "workspace.analytics": typeof AnalyticsIcon;
  readonly "workspace.archive": typeof ArchiveIcon;
  readonly "workspace.cycle": typeof CycleIcon;
  readonly "workspace.dashboard": typeof DashboardIcon;
  readonly "workspace.draft": typeof DraftIcon;
  readonly "workspace.home": typeof HomeIcon;
  readonly "workspace.inbox": typeof InboxIcon;
  readonly "workspace.multiple-sticky": typeof MultipleStickyIcon;
  readonly "workspace.page": typeof PageIcon;
  readonly "workspace.project": typeof ProjectIcon;
  readonly "workspace.views": typeof ViewsIcon;
  readonly "workspace.your-work": typeof YourWorkIcon;
  readonly "project.cycle": typeof CycleIcon;
  readonly "project.epic": typeof EpicIcon;
  readonly "project.intake": typeof IntakeIcon;
  readonly "project.module": typeof ModuleIcon;
  readonly "project.page": typeof PageIcon;
  readonly "project.view": typeof ViewsIcon;
  readonly "project.work-items": typeof WorkItemsIcon;
  readonly "layout.calendar": typeof CalendarLayoutIcon;
  readonly "layout.card": typeof CardLayoutIcon;
  readonly "layout.timeline": typeof TimelineLayoutIcon;
  readonly "layout.grid": typeof GridLayoutIcon;
  readonly "layout.board": typeof BoardLayoutIcon;
  readonly "layout.list": typeof ListLayoutIcon;
  readonly "layout.sheet": typeof SheetLayoutIcon;
  readonly "property.boolean": typeof BooleanPropertyIcon;
  readonly "property.dropdown": typeof DropdownPropertyIcon;
  readonly "property.due-date": typeof DueDatePropertyIcon;
  readonly "property.duplicate": typeof DuplicatePropertyIcon;
  readonly "property.estimate": typeof EstimatePropertyIcon;
  readonly "property.hash": typeof HashPropertyIcon;
  readonly "property.label": typeof LabelPropertyIcon;
  readonly "property.members": typeof MembersPropertyIcon;
  readonly "property.overdue-date": typeof OverdueDatePropertyIcon;
  readonly "property.parent": typeof ParentPropertyIcon;
  readonly "property.priority": typeof PriorityPropertyIcon;
  readonly "property.relates-to": typeof RelatesToPropertyIcon;
  readonly "property.relation": typeof RelationPropertyIcon;
  readonly "property.scope": typeof ScopePropertyIcon;
  readonly "property.start-date": typeof StartDatePropertyIcon;
  readonly "property.state": typeof StatePropertyIcon;
  readonly "property.user-circle": typeof UserCirclePropertyIcon;
  readonly "property.user": typeof UserPropertyIcon;
  readonly "property.user-square": typeof UserSquarePropertyIcon;
  readonly "property.workflows": typeof WorkflowsPropertyIcon;
  readonly "action.add": typeof AddIcon;
  readonly "action.add-workitem": typeof AddWorkItemIcon;
  readonly "action.add-reaction": typeof AddReactionIcon;
  readonly "action.close": typeof CloseIcon;
  readonly "action.search": typeof SearchIcon;
  readonly "action.preferences": typeof PreferencesIcon;
  readonly "arrow.chevron-down": typeof ChevronDownIcon;
  readonly "arrow.chevron-left": typeof ChevronLeftIcon;
  readonly "arrow.chevron-right": typeof ChevronRightIcon;
  readonly "arrow.chevron-up": typeof ChevronUpIcon;
  readonly default: typeof DefaultIcon;
};
type IconName = keyof typeof ICON_REGISTRY;
//#endregion
//#region src/icons/activity-icon.d.ts
declare function ActivityIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/ai-icon.d.ts
declare function AiIcon({
  width,
  height,
  className,
  color
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/at-risk-icon.d.ts
declare function AtRiskIcon({
  width,
  height
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/attachments/audio-file-icon.d.ts
declare function AudioFileIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/attachments/code-file-icon.d.ts
declare function CodeFileIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/attachments/document-file-icon.d.ts
declare function DocumentFileIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/attachments/image-file-icon.d.ts
declare function ImageFileIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/attachments/video-file-icon.d.ts
declare function VideoFileIcon({
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/bar-icon.d.ts
declare function BarIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/blocked-icon.d.ts
declare function BlockedIcon({
  height,
  width,
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/blocker-icon.d.ts
declare function BlockerIcon({
  height,
  width,
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/brand/accenture-logo.d.ts
declare function AccentureLogo({
  width,
  height,
  className,
  color
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/brand/dolby-logo.d.ts
declare function DolbyLogo({
  width,
  height,
  className,
  color
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/brand/sony-logo.d.ts
declare function SonyLogo({
  width,
  height,
  className,
  color
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/brand/zerodha-logo.d.ts
declare function ZerodhaLogo({
  width,
  height,
  className,
  color
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/brand/plane-lockup.d.ts
declare function PlaneLockup({
  width,
  height,
  className,
  color
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/brand/plane-logo.d.ts
declare function PlaneLogo({
  width,
  height,
  className,
  color
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/brand/plane-wordmark.d.ts
declare function PlaneWordmark({
  width,
  height,
  className,
  color
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/calendar-after-icon.d.ts
declare function CalendarAfterIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/calendar-before-icon.d.ts
declare function CalendarBeforeIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/center-panel-icon.d.ts
declare function CenterPanelIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/comment-fill-icon.d.ts
declare function CommentFillIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/create-icon.d.ts
declare function CreateIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/cycle/circle-dot-full-icon.d.ts
declare function CircleDotFullIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/cycle/contrast-icon.d.ts
declare function ContrastIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/cycle/helper.d.ts
interface ICycleGroupIcon {
  className?: string;
  color?: string;
  cycleGroup: TCycleGroups;
  height?: string;
  width?: string;
}
type TCycleGroups = "current" | "upcoming" | "completed" | "draft";
declare const CYCLE_GROUP_COLORS: { [key in TCycleGroups]: string };
declare const CYCLE_GROUP_I18N_LABELS: { [key in TCycleGroups]: string };
//#endregion
//#region src/icons/cycle/cycle-group-icon.d.ts
declare function CycleGroupIcon({
  className,
  color,
  cycleGroup,
  height,
  width
}: ICycleGroupIcon): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/cycle/double-circle-icon.d.ts
declare function DoubleCircleIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/dice-icon.d.ts
declare function DiceIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/discord-icon.d.ts
declare function DiscordIcon({
  width,
  height,
  className
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/display-properties.d.ts
declare function DisplayPropertiesIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/done-icon.d.ts
declare function DoneState({
  width,
  height,
  className
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/dropdown-icon.d.ts
declare function DropdownIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/favorite-folder-icon.d.ts
declare function FavoriteFolderIcon({
  className,
  color,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/full-screen-panel-icon.d.ts
declare function FullScreenPanelIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/github-icon.d.ts
declare function GithubIcon({
  width,
  height,
  className,
  color
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/gitlab-icon.d.ts
declare function GitlabIcon({
  width,
  height,
  className,
  color
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/helpers.d.ts
/**
 * Get the icon component by name
 * @param name - The icon name from the registry
 * @returns The icon component or default icon if not found
 */
declare const getIconComponent: (name: IconName) => typeof ChevronDownIcon | typeof ChevronLeftIcon | typeof ChevronRightIcon | typeof ChevronUpIcon | typeof PlaneNewIcon | typeof WikiIcon | typeof PiChatLogo | typeof AnalyticsIcon | typeof ArchiveIcon | typeof CycleIcon | typeof DashboardIcon | typeof DraftIcon | typeof HomeIcon | typeof InboxIcon | typeof MultipleStickyIcon | typeof PageIcon | typeof ProjectIcon | typeof ViewsIcon | typeof YourWorkIcon | typeof EpicIcon | typeof IntakeIcon | typeof ModuleIcon | typeof WorkItemsIcon | typeof CalendarLayoutIcon | typeof CardLayoutIcon | typeof TimelineLayoutIcon | typeof GridLayoutIcon | typeof BoardLayoutIcon | typeof ListLayoutIcon | typeof SheetLayoutIcon | typeof BooleanPropertyIcon | typeof DropdownPropertyIcon | typeof DueDatePropertyIcon | typeof DuplicatePropertyIcon | typeof EstimatePropertyIcon | typeof HashPropertyIcon | typeof LabelPropertyIcon | typeof MembersPropertyIcon | typeof OverdueDatePropertyIcon | typeof ParentPropertyIcon | typeof PriorityPropertyIcon | typeof RelatesToPropertyIcon | typeof RelationPropertyIcon | typeof ScopePropertyIcon | typeof StartDatePropertyIcon | typeof StatePropertyIcon | typeof UserCirclePropertyIcon | typeof UserPropertyIcon | typeof UserSquarePropertyIcon | typeof WorkflowsPropertyIcon | typeof AddIcon | typeof AddWorkItemIcon | typeof AddReactionIcon | typeof CloseIcon | typeof SearchIcon | typeof PreferencesIcon | typeof DefaultIcon;
/**
 * Check if the icon name exists in the registry
 * @param name - The icon name to check
 * @returns True if the icon exists in the registry
 */
declare const isValidIconName: (name: string) => name is IconName;
/**
 * Get all available icon names
 * @returns Array of all icon names in the registry
 */
declare const getIconNames: () => IconName[];
/**
 * Get icons by category
 * @param category - The category prefix (e.g., 'workspace', 'project')
 * @returns Array of icon names matching the category
 */
declare const getIconsByCategory: (category: string) => IconName[];
//#endregion
//#region src/icons/icon-wrapper.d.ts
interface IIconWrapper extends ISvgIcons {
  children: React$2.ReactNode;
  clipPathId?: string;
  viewBox?: string;
}
declare function IconWrapper({
  width,
  height,
  className,
  children,
  clipPathId,
  viewBox,
  ...rest
}: IIconWrapper): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/icon.d.ts
interface IconProps extends Omit<ISvgIcons, "ref"> {
  name: IconName;
}
declare function Icon({
  name,
  ...props
}: IconProps): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/in-progress-icon.d.ts
declare function InProgressState({
  width,
  height,
  className,
  color
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/info-fill-icon.d.ts
declare function InfoFillIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/info-icon.d.ts
declare function InfoIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/intake.d.ts
declare function Intake({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/layer-stack.d.ts
declare function LayerStackIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/layers-icon.d.ts
declare function LayersIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/lead-icon.d.ts
declare function LeadIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/module/backlog.d.ts
declare function ModuleBacklogIcon({
  width,
  height,
  className,
  color
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/module/cancelled.d.ts
declare function ModuleCancelledIcon({
  width,
  height,
  className
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/module/completed.d.ts
declare function ModuleCompletedIcon({
  width,
  height,
  className
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/module/in-progress.d.ts
declare function ModuleInProgressIcon({
  width,
  height,
  className,
  color
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/module/module-status-icon.d.ts
type TModuleStatus = "backlog" | "planned" | "in-progress" | "paused" | "completed" | "cancelled";
type Props = {
  status: TModuleStatus;
  className?: string;
  height?: string;
  width?: string;
};
declare function ModuleStatusIcon({
  status,
  className,
  height,
  width
}: Props): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/module/paused.d.ts
declare function ModulePausedIcon({
  width,
  height,
  className
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/module/planned.d.ts
declare function ModulePlannedIcon({
  width,
  height,
  className
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/monospace-icon.d.ts
declare function MonospaceIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/multiple-sticky.d.ts
declare function RecentStickyIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/off-track-icon.d.ts
declare function OffTrackIcon({
  width,
  height
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/on-track-icon.d.ts
declare function OnTrackIcon({
  width,
  height
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/overview-icon.d.ts
declare function OverviewIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/pending-icon.d.ts
declare function PendingState({
  width,
  height,
  className,
  color
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/photo-filter-icon.d.ts
declare function PhotoFilterIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/planned-icon.d.ts
declare function PlannedState({
  width,
  height,
  className
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/priority-icon.d.ts
type TIssuePriorities = "urgent" | "high" | "medium" | "low" | "none";
interface IPriorityIcon {
  className?: string;
  containerClassName?: string;
  priority: TIssuePriorities | undefined | null;
  size?: number;
  withContainer?: boolean;
}
declare function PriorityIcon(props: IPriorityIcon): react_jsx_runtime94.JSX.Element | null;
//#endregion
//#region src/icons/related-icon.d.ts
declare function RelatedIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/sans-serif-icon.d.ts
declare function SansSerifIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/serif-icon.d.ts
declare function SerifIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/set-as-default-icon.d.ts
declare function SetAsDefaultIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/side-panel-icon.d.ts
declare function SidePanelIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/state/backlog-group-icon.d.ts
declare function BacklogGroupIcon({
  width,
  height,
  className,
  color
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/state/cancelled-group-icon.d.ts
declare function CancelledGroupIcon({
  className,
  color,
  height,
  width,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/state/completed-group-icon.d.ts
declare function CompletedGroupIcon({
  className,
  color,
  height,
  width,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/state/started-group-icon.d.ts
declare function StartedGroupIcon({
  width,
  height,
  className,
  color,
  percentage
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/state/helper.d.ts
interface IStateGroupIcon {
  className?: string;
  color?: string;
  stateGroup: TStateGroups;
  size?: EIconSize;
  percentage?: number;
}
interface IIntakeStateGroupIcon {
  className?: string;
  color?: string;
  stateGroup: TIntakeStateGroups;
  size?: EIconSize;
  percentage?: number;
}
type TStateGroups = "backlog" | "unstarted" | "started" | "completed" | "cancelled";
//#endregion
//#region src/icons/state/state-group-icon.d.ts
declare function StateGroupIcon({
  className,
  color,
  stateGroup,
  size,
  percentage
}: IStateGroupIcon): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/state/unstarted-group-icon.d.ts
declare function UnstartedGroupIcon({
  width,
  height,
  className,
  color,
  percentage
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/state/intake-state-group-icon.d.ts
declare function IntakeStateGroupIcon({
  className,
  color,
  stateGroup,
  size
}: IIntakeStateGroupIcon): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/sticky-note-icon.d.ts
declare function StickyNoteIcon({
  width,
  height,
  className,
  color
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/suspended-user.d.ts
declare function SuspendedUserIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/teams.d.ts
declare function TeamsIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/transfer-icon.d.ts
declare function TransferIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/tree-map-icon.d.ts
declare function TreeMapIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/updates-icon.d.ts
declare function UpdatesIcon({
  className
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/user-activity-icon.d.ts
declare function UserActivityIcon({
  className,
  ...rest
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
//#region src/icons/workspace-icon.d.ts
declare function WorkspaceIcon({
  className
}: ISvgIcons): react_jsx_runtime94.JSX.Element;
//#endregion
export { GitlabIcon as $, WorkflowsPropertyIcon as $t, MonospaceIcon as A, CardLayoutIcon as An, BarIcon as At, LayersIcon as B, CloseIcon as Bn, IconName as Bt, PlannedState as C, IntakeIcon as Cn, PlaneLockup as Ct, OnTrackIcon as D, SheetLayoutIcon as Dn, AccentureLogo as Dt, OverviewIcon as E, TimelineLayoutIcon as En, DolbyLogo as Et, ModuleInProgressIcon as F, ChevronRightIcon as Fn, AudioFileIcon as Ft, InProgressState as G, ISvgIcons as Gn, HomeIcon as Gt, Intake as H, AddWorkItemIcon as Hn, ProjectIcon as Ht, ModuleCompletedIcon as I, ChevronLeftIcon as In, AtRiskIcon as It, IconWrapper as J, ArchiveIcon as Jt, Icon as K, DraftIcon as Kt, ModuleCancelledIcon as L, ChevronDownIcon as Ln, AiIcon as Lt, ModulePausedIcon as M, BoardLayoutIcon as Mn, ImageFileIcon as Mt, ModuleStatusIcon as N, DefaultIcon as Nn, DocumentFileIcon as Nt, OffTrackIcon as O, ListLayoutIcon as On, BlockerIcon as Ot, TModuleStatus as P, ChevronUpIcon as Pn, CodeFileIcon as Pt, isValidIconName as Q, PiChatLogo as Qt, ModuleBacklogIcon as R, PreferencesIcon as Rn, ActivityIcon as Rt, TIssuePriorities as S, ModuleIcon as Sn, PlaneLogo as St, PendingState as T, CycleIcon as Tn, SonyLogo as Tt, InfoIcon as U, AddIcon as Un, MultipleStickyIcon as Ut, LayerStackIcon as V, AddReactionIcon as Vn, YourWorkIcon as Vt, InfoFillIcon as W, AddCircleIcon as Wn, InboxIcon as Wt, getIconNames as X, WikiIcon as Xt, getIconComponent as Y, AnalyticsIcon as Yt, getIconsByCategory as Z, PlaneNewIcon as Zt, SetAsDefaultIcon as _, DropdownPropertyIcon as _n, CommentFillIcon as _t, TransferIcon as a, ScopePropertyIcon as an, DisplayPropertiesIcon as at, RelatedIcon as b, ViewsIcon as bn, CalendarAfterIcon as bt, StickyNoteIcon as c, PriorityPropertyIcon as cn, DoubleCircleIcon as ct, StateGroupIcon as d, MembersPropertyIcon as dn, CYCLE_GROUP_I18N_LABELS as dt, UserSquarePropertyIcon as en, GithubIcon as et, StartedGroupIcon as f, LabelPropertyIcon as fn, ICycleGroupIcon as ft, SidePanelIcon as g, DueDatePropertyIcon as gn, CreateIcon as gt, BacklogGroupIcon as h, DuplicatePropertyIcon as hn, CircleDotFullIcon as ht, TreeMapIcon as i, StartDatePropertyIcon as in, DoneState as it, ModulePlannedIcon as j, CalendarLayoutIcon as jn, VideoFileIcon as jt, RecentStickyIcon as k, GridLayoutIcon as kn, BlockedIcon as kt, IntakeStateGroupIcon as l, ParentPropertyIcon as ln, CycleGroupIcon as lt, CancelledGroupIcon as m, EstimatePropertyIcon as mn, ContrastIcon as mt, UserActivityIcon as n, UserCirclePropertyIcon as nn, FavoriteFolderIcon as nt, TeamsIcon as o, RelationPropertyIcon as on, DiscordIcon as ot, CompletedGroupIcon as p, HashPropertyIcon as pn, TCycleGroups as pt, IconProps as q, DashboardIcon as qt, UpdatesIcon as r, StatePropertyIcon as rn, DropdownIcon as rt, SuspendedUserIcon as s, RelatesToPropertyIcon as sn, DiceIcon as st, WorkspaceIcon as t, UserPropertyIcon as tn, FullScreenPanelIcon as tt, UnstartedGroupIcon as u, OverdueDatePropertyIcon as un, CYCLE_GROUP_COLORS as ut, SerifIcon as v, BooleanPropertyIcon as vn, CenterPanelIcon as vt, PhotoFilterIcon as w, EpicIcon as wn, ZerodhaLogo as wt, PriorityIcon as x, PageIcon as xn, PlaneWordmark as xt, SansSerifIcon as y, WorkItemsIcon as yn, CalendarBeforeIcon as yt, LeadIcon as z, SearchIcon as zn, ICON_REGISTRY as zt };
//# sourceMappingURL=index-ldoo5mRF.d.ts.map