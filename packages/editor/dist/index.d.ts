import { $ as ICollaborativeDocumentEditorProps, At as TEditorAsset, B as TSlashCommandSectionKeys, C as TDocumentEventsServer, Ct as TRealtimeConfig, Dt as CollaborationError, Et as CollabStage, G as TCollaborativeEditorHookProps, H as TMentionHandler, J as TEmbedItem, K as TEditorHookProps, Mt as CORE_EXTENSIONS, Nt as TAIHandler, Ot as CollaborationState, Pt as TAIMenuProps, Q as EditorTitleRefApi, R as CommandProps, S as TDocumentEventsClient, St as TFileHandler, Tt as TExtendedFileHandler, U as TMentionSection, V as TCallbackMentionComponentProps, W as TMentionSuggestion, X as EditorEvents, Y as CoreEditorRefApi, Z as EditorRefApi, _ as CreatePayload, _t as IMarking, a as convertHTMLDocumentToAllFormats, at as TCommandExtraProps, b as TDocumentEventEmitter, bt as TEditorFontStyle, c as getAllDocumentFormatsFromRichTextEditorBinaryData, ct as TEditorCommands, d as ApiServerPayload, dt as IEditorPropsExtended, et as IDocumentEditorProps, f as BaseActionPayload, ft as TExtendedCommandExtraProps, g as CommonRealtimeFields, h as BroadcastedEventUnion, i as convertBinaryDataToBase64String, it as NodeViewProps, jt as TEditorImageAsset, kt as TServerHandler, l as getBinaryDataFromDocumentEditorHTMLString, lt as ICollaborativeDocumentEditorPropsExtended, m as BroadcastedEvent, mt as TExtendedEditorRefApi, n as applyUpdates, nt as ILiteTextEditorProps, o as extractTextFromHTML, ot as TCommandWithProps, p as BroadcastPayloadUnion, pt as TExtendedEditorCommands, q as TExtensions, r as convertBase64StringToBinaryData, rt as IRichTextEditorProps, s as getAllDocumentFormatsFromDocumentEditorBinaryData, st as TDocumentInfo, t as TITLE_EDITOR_EXTENSIONS, tt as IEditorProps, u as getBinaryDataFromRichTextEditorHTMLString, ut as IEditorExtensionOptions, v as EventToPayloadMap, vt as TDisplayConfig, w as createRealtimeEvent, wt as TUserDetails, x as TDocumentEventKey, xt as TEditorLineSpacing, y as TAllEventTypes, yt as TEditorFontSize, z as ISlashCommandItem } from "./yjs-utils-CitB7yXk.js";
import * as react1 from "react";
import React$1 from "react";
import { HocuspocusProvider } from "@hocuspocus/provider";
import "react/jsx-runtime";
import "@tiptap/react";
import { LucideIcon } from "lucide-react";
import * as _tiptap_core1 from "@tiptap/core";
import { Editor, Extension, Extensions } from "@tiptap/core";
import { EditorState, Selection } from "@tiptap/pm/state";
import { Node as Node$2 } from "@tiptap/pm/model";
import "yjs";

//#region src/ce/types/issue-embed.d.ts
type TEmbedConfig = {
  issue?: TIssueEmbedConfig;
};
type TReadOnlyEmbedConfig = TEmbedConfig;
type TIssueEmbedConfig = {
  widgetCallback: ({
    issueId,
    projectId,
    workspaceSlug
  }: {
    issueId: string;
    projectId: string | undefined;
    workspaceSlug: string | undefined;
  }) => React.ReactNode;
};
//#endregion
//#region src/core/components/editors/document/collaborative-editor.d.ts
declare const CollaborativeDocumentEditorWithRef: React$1.ForwardRefExoticComponent<Omit<IEditorProps, "value" | "initialValue" | "onEnterKeyPress"> & {
  aiHandler?: TAIHandler;
  documentLoaderClassName?: string;
  dragDropEnabled?: boolean;
  editable: boolean;
  realtimeConfig: TRealtimeConfig;
  serverHandler?: TServerHandler;
  user: TUserDetails;
  extendedDocumentEditorProps?: ICollaborativeDocumentEditorPropsExtended;
  updatePageProperties?: <T extends keyof EventToPayloadMap>(pageIds: string | string[], actionType: T, data: EventToPayloadMap[T], performAction?: boolean) => void;
  pageRestorationInProgress?: boolean;
  titleRef?: React$1.MutableRefObject<EditorTitleRefApi | null>;
  isFetchingFallbackBinary?: boolean;
} & React$1.RefAttributes<CoreEditorRefApi>>;
//#endregion
//#region src/core/components/editors/document/editor.d.ts
declare const DocumentEditorWithRef: react1.ForwardRefExoticComponent<Omit<IEditorProps, "value" | "initialValue" | "onEnterKeyPress"> & {
  aiHandler?: TAIHandler;
  user?: TUserDetails;
  value: _tiptap_core1.Content;
} & react1.RefAttributes<CoreEditorRefApi>>;
//#endregion
//#region src/core/components/editors/lite-text/editor.d.ts
declare const LiteTextEditorWithRef: react1.ForwardRefExoticComponent<IEditorProps & react1.RefAttributes<CoreEditorRefApi>>;
//#endregion
//#region src/core/components/editors/rich-text/editor.d.ts
declare const RichTextEditorWithRef: react1.ForwardRefExoticComponent<IEditorProps & {
  dragDropEnabled?: boolean;
} & react1.RefAttributes<CoreEditorRefApi>>;
//#endregion
//#region src/core/constants/common.d.ts
type TEditorTypes = "lite" | "document";
type ExtraPropsForCommand<T extends TEditorCommands> = T extends keyof TCommandExtraProps ? TCommandExtraProps[T] : object;
type ToolbarMenuItem<T extends TEditorCommands = TEditorCommands> = {
  itemKey: T;
  renderKey: string;
  name: string;
  icon: LucideIcon;
  shortcut?: string[];
  editors: TEditorTypes[];
  extraProps?: ExtraPropsForCommand<T>;
};
declare const TYPOGRAPHY_ITEMS: ToolbarMenuItem<"text" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6">[];
declare const TEXT_ALIGNMENT_ITEMS: ToolbarMenuItem<"text-align">[];
declare const USER_ACTION_ITEMS: ToolbarMenuItem<"quote" | "code">[];
declare const COMPLEX_ITEMS: ToolbarMenuItem<"table" | "image">[];
declare const TOOLBAR_ITEMS: { [editorType in TEditorTypes]: {
  [key: string]: ToolbarMenuItem[];
} };
declare const COLORS_LIST: {
  key: string;
  label: string;
  textColor: string;
  backgroundColor: string;
}[];
//#endregion
//#region src/core/helpers/common.d.ts
type EditorClassNameArgs = {
  noBorder?: boolean;
  borderOnFocus?: boolean;
  containerClassName?: string;
};
declare const getEditorClassNames: ({
  noBorder,
  borderOnFocus,
  containerClassName
}: EditorClassNameArgs) => string;
declare const findParentNodeOfType: (selection: Selection, typeName: string[]) => {
  node: Node$2;
  pos: number;
  depth: number;
} | null;
declare const findTableAncestor: (node: Node | null) => HTMLTableElement | null;
declare const getTrimmedHTML: (html: string) => string;
declare const isValidHttpUrl: (string: string) => {
  isValid: boolean;
  url: string;
};
declare const getParagraphCount: (editorState: EditorState | undefined) => number;
//#endregion
//#region src/ce/constants/extensions.d.ts
declare enum ADDITIONAL_EXTENSIONS {}
//#endregion
//#region src/core/extensions/trailing-node.d.ts
interface TrailingNodeOptions {
  node: string;
  notAfter: string[];
}
declare const TrailingNode: Extension<TrailingNodeOptions, any>;
//#endregion
export { ADDITIONAL_EXTENSIONS, ApiServerPayload, BaseActionPayload, BroadcastPayloadUnion, BroadcastedEvent, BroadcastedEventUnion, COLORS_LIST, COMPLEX_ITEMS, CORE_EXTENSIONS, CollabStage, CollaborationError, CollaborationState, CollaborativeDocumentEditorWithRef, CommandProps, CommonRealtimeFields, CoreEditorRefApi, CreatePayload, DocumentEditorWithRef, EditorEvents, EditorRefApi, EditorTitleRefApi, EventToPayloadMap, ExtraPropsForCommand, ICollaborativeDocumentEditorProps, ICollaborativeDocumentEditorPropsExtended, IDocumentEditorProps, IEditorExtensionOptions, IEditorProps, IEditorPropsExtended, ILiteTextEditorProps, IMarking, IRichTextEditorProps, ISlashCommandItem, LiteTextEditorWithRef, NodeViewProps, RichTextEditorWithRef, TAIHandler, TAIMenuProps, TAllEventTypes, TCallbackMentionComponentProps, TCollaborativeEditorHookProps, TCommandExtraProps, TCommandWithProps, TDisplayConfig, TDocumentEventEmitter, TDocumentEventKey, TDocumentEventsClient, TDocumentEventsServer, TDocumentInfo, TEXT_ALIGNMENT_ITEMS, TEditorAsset, TEditorCommands, TEditorFontSize, TEditorFontStyle, TEditorHookProps, TEditorImageAsset, TEditorLineSpacing, TEditorTypes, TEmbedConfig, TEmbedItem, TExtendedCommandExtraProps, TExtendedEditorCommands, TExtendedEditorRefApi, TExtendedFileHandler, TExtensions, TFileHandler, TITLE_EDITOR_EXTENSIONS, TIssueEmbedConfig, TMentionHandler, TMentionSection, TMentionSuggestion, TOOLBAR_ITEMS, TReadOnlyEmbedConfig, TRealtimeConfig, TServerHandler, TSlashCommandSectionKeys, TUserDetails, TYPOGRAPHY_ITEMS, ToolbarMenuItem, TrailingNode, USER_ACTION_ITEMS, applyUpdates, convertBase64StringToBinaryData, convertBinaryDataToBase64String, convertHTMLDocumentToAllFormats, createRealtimeEvent, extractTextFromHTML, findParentNodeOfType, findTableAncestor, getAllDocumentFormatsFromDocumentEditorBinaryData, getAllDocumentFormatsFromRichTextEditorBinaryData, getBinaryDataFromDocumentEditorHTMLString, getBinaryDataFromRichTextEditorHTMLString, getEditorClassNames, getParagraphCount, getTrimmedHTML, isValidHttpUrl };
//# sourceMappingURL=index.d.ts.map