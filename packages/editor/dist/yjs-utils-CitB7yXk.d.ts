import { CSSProperties } from "react";
import { TCustomComponentsMetaData } from "@plane/utils";
import { HocuspocusProvider } from "@hocuspocus/provider";
import { NodeViewProps } from "@tiptap/react";
import * as _tiptap_core0 from "@tiptap/core";
import { Content, Editor, Extension, Extensions, JSONContent, Mark, Node, ParentConfig, Range, RawCommands } from "@tiptap/core";
import { Selection } from "@tiptap/pm/state";
import { EditorProps, EditorView } from "@tiptap/pm/view";
import "@tiptap/extension-mention";
import "@tiptap/suggestion";
import { MarkType, NodeType } from "@tiptap/pm/model";
import "@tiptap/extension-blockquote";
import "@tiptap/extension-text-align";
import { Buffer } from "buffer";
import { TDocumentPayload, TPage, TSearchEntities } from "@plane/types";
import { EPageAccess } from "@plane/constants";

//#region src/core/types/ai.d.ts
type TAIMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};
type TAIHandler = {
  menu?: (props: TAIMenuProps) => React.ReactNode;
};
//#endregion
//#region src/core/constants/extension.d.ts
declare enum CORE_EXTENSIONS$1 {
  BLOCKQUOTE = "blockquote",
  BOLD = "bold",
  BULLET_LIST = "bulletList",
  CALLOUT = "calloutComponent",
  CHARACTER_COUNT = "characterCount",
  CODE_BLOCK = "codeBlock",
  CODE_INLINE = "code",
  CUSTOM_COLOR = "customColor",
  CUSTOM_IMAGE = "imageComponent",
  CUSTOM_LINK = "link",
  DOCUMENT = "doc",
  DROP_CURSOR = "dropCursor",
  ENTER_KEY = "enterKey",
  GAP_CURSOR = "gapCursor",
  HARD_BREAK = "hardBreak",
  HEADING = "heading",
  HEADINGS_LIST = "headingsList",
  HISTORY = "history",
  HORIZONTAL_RULE = "horizontalRule",
  IMAGE = "image",
  ITALIC = "italic",
  LIST_ITEM = "listItem",
  MARKDOWN_CLIPBOARD = "markdownClipboard",
  MENTION = "mention",
  ORDERED_LIST = "orderedList",
  PARAGRAPH = "paragraph",
  PLACEHOLDER = "placeholder",
  SIDE_MENU = "editorSideMenu",
  SLASH_COMMANDS = "slash-command",
  STRIKETHROUGH = "strike",
  TABLE = "table",
  TABLE_CELL = "tableCell",
  TABLE_HEADER = "tableHeader",
  TABLE_ROW = "tableRow",
  TASK_ITEM = "taskItem",
  TASK_LIST = "taskList",
  TEXT_ALIGN = "textAlign",
  TEXT_STYLE = "textStyle",
  TYPOGRAPHY = "typography",
  UNDERLINE = "underline",
  UTILITY = "utility",
  WORK_ITEM_EMBED = "issue-embed-component",
  EMOJI = "emoji",
  UNIQUE_ID = "uniqueID",
}
//#endregion
//#region src/ce/types/asset.d.ts
type TAdditionalEditorAsset = never;
//#endregion
//#region src/core/types/asset.d.ts
type TEditorImageAsset = {
  href: string;
  id: string;
  name: string;
  src: string;
  type: CORE_EXTENSIONS$1.IMAGE | CORE_EXTENSIONS$1.CUSTOM_IMAGE;
};
type TEditorAsset = TEditorImageAsset | TAdditionalEditorAsset;
//#endregion
//#region src/core/types/collaboration.d.ts
type CollaborationError = {
  type: "auth-failed";
  message: string;
} | {
  type: "network-error";
  message: string;
} | {
  type: "forced-close";
  code: number;
  message: string;
} | {
  type: "max-retries";
  message: string;
};
/**
 * Single-stage state machine for collaboration lifecycle.
 * Stages represent the sequential progression: initial → connecting → awaiting-sync → synced
 *
 * Invariants:
 * - "awaiting-sync" only occurs when connection is successful and sync is pending
 * - "synced" occurs only after connection success and onSynced callback
 * - "reconnecting" with attempt > 0 when retrying after a connection drop
 * - "disconnected" is terminal (connection failed or forced close)
 */
type CollabStage = {
  kind: "initial";
} | {
  kind: "connecting";
} | {
  kind: "awaiting-sync";
} | {
  kind: "synced";
} | {
  kind: "reconnecting";
  attempt: number;
} | {
  kind: "disconnected";
  error: CollaborationError;
};
/**
 * Public collaboration state exposed to consumers.
 * Contains the current stage and derived booleans for convenience.
 */
type CollaborationState = {
  stage: CollabStage;
  isServerSynced: boolean;
  isServerDisconnected: boolean;
};
type TServerHandler = {
  onStateChange: (state: CollaborationState) => void;
};
//#endregion
//#region src/ce/types/config.d.ts
type TExtendedFileHandler = object;
//#endregion
//#region src/core/types/config.d.ts
type TFileHandler = {
  assetsUploadStatus: Record<string, number>;
  cancel: () => void;
  checkIfAssetExists: (assetId: string) => Promise<boolean>;
  delete: (assetSrc: string) => Promise<void>;
  getAssetDownloadSrc: (path: string) => Promise<string>;
  getAssetSrc: (path: string) => Promise<string>;
  restore: (assetSrc: string) => Promise<void>;
  upload: (blockId: string, file: File) => Promise<string>;
  duplicate: (assetId: string) => Promise<string>;
  validation: {
    /**
     * @description max file size in bytes
     * @example enter 5242880(5 * 1024 * 1024) for 5MB
     */
    maxFileSize: number;
  };
} & TExtendedFileHandler;
type TEditorFontStyle = "sans-serif" | "serif" | "monospace";
type TEditorFontSize = "small-font" | "large-font" | "mobile-font";
type TEditorLineSpacing = "regular" | "small" | "mobile-regular";
type TDisplayConfig = {
  fontStyle?: TEditorFontStyle;
  fontSize?: TEditorFontSize;
  lineSpacing?: TEditorLineSpacing;
  wideLayout?: boolean;
};
type TUserDetails = {
  color: string;
  id: string;
  name: string;
  cookie?: string;
};
type TRealtimeConfig = {
  url: string;
};
type IMarking = {
  type: "heading";
  level: number;
  text: string;
  sequence: number;
};
//#endregion
//#region src/core/extensions/code/code-block.d.ts
declare module "@tiptap/core" {
  interface Commands<ReturnType$1> {}
}
//#endregion
//#region src/core/extensions/code-inline/index.d.ts
declare module "@tiptap/core" {
  interface Commands<ReturnType$1> {}
}
//#endregion
//#region src/core/extensions/custom-link/extension.d.ts
declare module "@tiptap/core" {
  interface Commands<ReturnType$1> {
    [CORE_EXTENSIONS$1.CUSTOM_LINK]: {
      /**
       * Set a link mark
       */
      setLink: (attributes: {
        href: string;
        target?: string | null;
        rel?: string | null;
        class?: string | null;
      }) => ReturnType$1;
      /**
       * Toggle a link mark
       */
      toggleLink: (attributes: {
        href: string;
        target?: string | null;
        rel?: string | null;
        class?: string | null;
      }) => ReturnType$1;
      /**
       * Unset a link mark
       */
      unsetLink: () => ReturnType$1;
    };
  }
  interface Storage {
    [CORE_EXTENSIONS$1.CUSTOM_LINK]: CustomLinkStorage;
  }
}
type CustomLinkStorage = {
  isPreviewOpen: boolean;
  posToInsert: {
    from: number;
    to: number;
  };
  isBubbleMenuOpen: boolean;
};
//#endregion
//#region src/core/extensions/image/extension.d.ts
declare module "@tiptap/core" {
  interface Storage {
    [CORE_EXTENSIONS$1.IMAGE]: ImageExtensionStorage;
  }
}
type ImageExtensionStorage = {
  deletedImageSet: Map<string, boolean>;
};
//#endregion
//#region src/core/extensions/table/table/table.d.ts
declare module "@tiptap/core" {
  interface Commands<ReturnType$1> {
    [CORE_EXTENSIONS$1.TABLE]: {
      insertTable: (options?: {
        rows?: number;
        cols?: number;
        withHeaderRow?: boolean;
      }) => ReturnType$1;
      addColumnBefore: () => ReturnType$1;
      addColumnAfter: () => ReturnType$1;
      deleteColumn: () => ReturnType$1;
      addRowBefore: () => ReturnType$1;
      addRowAfter: () => ReturnType$1;
      deleteRow: () => ReturnType$1;
      deleteTable: () => ReturnType$1;
      mergeCells: () => ReturnType$1;
      splitCell: () => ReturnType$1;
      toggleHeaderColumn: () => ReturnType$1;
      toggleHeaderRow: () => ReturnType$1;
      toggleHeaderCell: () => ReturnType$1;
      clearSelectedCells: () => ReturnType$1;
      mergeOrSplit: () => ReturnType$1;
      setCellAttribute: (name: string, value: any) => ReturnType$1;
      goToNextCell: () => ReturnType$1;
      goToPreviousCell: () => ReturnType$1;
      fixTables: () => ReturnType$1;
      setCellSelection: (position: {
        anchorCell: number;
        headCell?: number;
      }) => ReturnType$1;
    };
  }
  interface NodeConfig<Options, Storage> {
    tableRole?: string | ((this: {
      name: string;
      options: Options;
      storage: Storage;
      parent: ParentConfig<NodeConfig<Options>>["tableRole"];
    }) => string);
  }
}
//#endregion
//#region src/core/extensions/core-without-props.d.ts
declare const CoreEditorExtensionsWithoutProps: _tiptap_core0.AnyExtension[];
declare const DocumentEditorExtensionsWithoutProps: _tiptap_core0.Node<any, any>[];
//#endregion
//#region src/core/extensions/custom-color.d.ts
declare module "@tiptap/core" {
  interface Commands<ReturnType$1> {
    [CORE_EXTENSIONS$1.CUSTOM_COLOR]: {
      /**
       * Set the text color
       * @param {string} color The color to set
       * @example editor.commands.setTextColor('red')
       */
      setTextColor: (color: string) => ReturnType$1;
      /**
       * Unset the text color
       * @example editor.commands.unsetTextColor()
       */
      unsetTextColor: () => ReturnType$1;
      /**
       * Set the background color
       * @param {string} backgroundColor The color to set
       * @example editor.commands.setBackgroundColor('red')
       */
      setBackgroundColor: (backgroundColor: string) => ReturnType$1;
      /**
       * Unset the background color
       * @example editor.commands.unsetBackgroundColorColor()
       */
      unsetBackgroundColor: () => ReturnType$1;
    };
  }
}
//#endregion
//#region src/core/extensions/headings-list.d.ts
type HeadingExtensionStorage = {
  headings: IMarking[];
};
declare module "@tiptap/core" {
  interface Storage {
    [CORE_EXTENSIONS$1.HEADINGS_LIST]: HeadingExtensionStorage;
  }
}
//#endregion
//#region src/core/extensions/horizontal-rule.d.ts
declare module "@tiptap/core" {
  interface Commands<ReturnType$1> {}
}
//#endregion
//#region src/core/extensions/keymap.d.ts
declare module "@tiptap/core" {
  interface Commands<ReturnType$1> {
    customKeymap: {
      /**
       * Select text between node boundaries
       */
      selectTextWithinNodeBoundaries: () => ReturnType$1;
    };
  }
}
//#endregion
//#region src/core/extensions/text-align.d.ts
type TTextAlign = "left" | "center" | "right";
//#endregion
//#region src/ce/types/utils.d.ts
type TAdditionalActiveDropbarExtensions = never;
//#endregion
//#region src/core/extensions/utility.d.ts
type TActiveDropbarExtensions = CORE_EXTENSIONS$1.MENTION | CORE_EXTENSIONS$1.EMOJI | CORE_EXTENSIONS$1.SLASH_COMMANDS | CORE_EXTENSIONS$1.TABLE | "bubble-menu" | CORE_EXTENSIONS$1.SIDE_MENU | TAdditionalActiveDropbarExtensions;
declare module "@tiptap/core" {
  interface Commands {
    [CORE_EXTENSIONS$1.UTILITY]: {
      updateAssetsUploadStatus: (updatedStatus: TFileHandler["assetsUploadStatus"]) => () => void;
      updateAssetsList: (args: {
        asset: TEditorAsset;
      } | {
        idToRemove: string;
      }) => () => void;
      addActiveDropbarExtension: (extension: TActiveDropbarExtensions) => () => void;
      removeActiveDropbarExtension: (extension: TActiveDropbarExtensions) => () => void;
    };
  }
  interface Storage {
    [CORE_EXTENSIONS$1.UTILITY]: UtilityExtensionStorage;
  }
}
type UtilityExtensionStorage = {
  assetsList: TEditorAsset[];
  assetsUploadStatus: TFileHandler["assetsUploadStatus"];
  uploadInProgress: boolean;
  activeDropbarExtensions: TActiveDropbarExtensions[];
  isTouchDevice: boolean;
};
//#endregion
//#region src/ce/types/editor-extended.d.ts
type IEditorExtensionOptions = unknown;
type IEditorPropsExtended = unknown;
type ICollaborativeDocumentEditorPropsExtended = unknown;
type TExtendedEditorCommands = never;
type TExtendedCommandExtraProps = unknown;
type TExtendedEditorRefApi = unknown;
//#endregion
//#region src/core/types/editor.d.ts
type TEditorCommands = "text" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "bold" | "italic" | "underline" | "strikethrough" | "bulleted-list" | "numbered-list" | "to-do-list" | "quote" | "code" | "table" | "image" | "divider" | "link" | "issue-embed" | "text-color" | "background-color" | "text-align" | "callout" | "attachment" | "emoji" | "external-embed" | TExtendedEditorCommands;
type TCommandExtraProps = {
  image: {
    savedSelection: Selection | null;
  };
  attachment: {
    savedSelection: Selection | null;
  };
  "text-color": {
    color: string | undefined;
  };
  link: {
    url: string;
    text?: string;
  };
  "background-color": {
    color: string | undefined;
  };
  "text-align": {
    alignment: TTextAlign;
  };
};
type TCommandWithProps<T extends TEditorCommands> = T extends keyof TCommandExtraProps ? TCommandExtraProps[T] : object;
type TCommandWithPropsWithItemKey<T extends TEditorCommands> = T extends keyof TCommandExtraProps ? {
  itemKey: T;
} & TCommandExtraProps[T] : {
  itemKey: T;
};
type TDocumentInfo = {
  characters: number;
  paragraphs: number;
  words: number;
};
type CoreEditorRefApi = {
  blur: () => void;
  clearEditor: (emitUpdate?: boolean) => void;
  createSelectionAtCursorPosition: () => void;
  emitRealTimeUpdate: (action: TDocumentEventsServer) => void;
  executeMenuItemCommand: <T extends TEditorCommands>(props: TCommandWithPropsWithItemKey<T>) => void;
  focus: (args: Parameters<RawCommands["focus"]>[0]) => void;
  getAttributesWithExtendedMark: (mark: string | MarkType, attribute: string | NodeType | MarkType) => Record<string, any> | undefined;
  getCoordsFromPos: (pos?: number) => ReturnType<EditorView["coordsAtPos"]> | undefined;
  getCurrentCursorPosition: () => number | undefined;
  getDocument: () => {
    binary: Uint8Array | null;
    html: string;
    json: JSONContent | null;
  };
  getDocumentInfo: () => TDocumentInfo;
  getHeadings: () => IMarking[];
  getMarkDown: () => string;
  copyMarkdownToClipboard: () => void;
  getSelectedText: () => string | null;
  insertText: (contentHTML: string, insertOnNextLine?: boolean) => void;
  isAnyDropbarOpen: () => boolean;
  isEditorReadyToDiscard: () => boolean;
  isMenuItemActive: <T extends TEditorCommands>(props: TCommandWithPropsWithItemKey<T>) => boolean;
  listenToRealTimeUpdate: () => TDocumentEventEmitter | undefined;
  onDocumentInfoChange: (callback: (documentInfo: TDocumentInfo) => void) => () => void;
  onHeadingChange: (callback: (headings: IMarking[]) => void) => () => void;
  onStateChange: (callback: () => void) => () => void;
  redo: () => void;
  scrollSummary: (marking: IMarking) => void;
  scrollToNodeViaDOMCoordinates: ({
    pos,
    behavior
  }: {
    pos?: number;
    behavior?: ScrollBehavior;
  }) => void;
  setEditorValue: (content: string, emitUpdate?: boolean) => void;
  setEditorValueAtCursorPosition: (content: string) => void;
  setFocusAtPosition: (position: number) => void;
  setProviderDocument: (value: Uint8Array) => void;
  undo: () => void;
};
type EditorRefApi = CoreEditorRefApi & TExtendedEditorRefApi;
type EditorTitleRefApi = EditorRefApi;
type IEditorProps = {
  autofocus?: boolean;
  bubbleMenuEnabled?: boolean;
  containerClassName?: string;
  displayConfig?: TDisplayConfig;
  disabledExtensions: TExtensions[];
  editable: boolean;
  editorClassName?: string;
  editorProps?: EditorProps;
  extensions?: Extensions;
  flaggedExtensions: TExtensions[];
  fileHandler: TFileHandler;
  forwardedRef?: React.MutableRefObject<EditorRefApi | null>;
  getEditorMetaData: (htmlContent: string) => TCustomComponentsMetaData;
  handleEditorReady?: (value: boolean) => void;
  id: string;
  initialValue: string;
  isTouchDevice?: boolean;
  mentionHandler: TMentionHandler;
  onAssetChange?: (assets: TEditorAsset[]) => void;
  onEditorFocus?: () => void;
  onChange?: (json: object, html: string, {
    isMigrationUpdate
  }?: {
    isMigrationUpdate?: boolean;
  }) => void;
  onEnterKeyPress?: (e?: any) => void;
  onTransaction?: () => void;
  placeholder?: string | ((isFocused: boolean, value: string) => string);
  showPlaceholderOnEmpty?: boolean;
  tabIndex?: number;
  value?: string | null;
  extendedEditorProps: IEditorPropsExtended;
  workItemIdentifier?: string | null;
};
type ILiteTextEditorProps = IEditorProps;
type IRichTextEditorProps = IEditorProps & {
  dragDropEnabled?: boolean;
};
type ICollaborativeDocumentEditorProps = Omit<IEditorProps, "initialValue" | "onEnterKeyPress" | "value"> & {
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
  titleRef?: React.MutableRefObject<EditorTitleRefApi | null>;
  isFetchingFallbackBinary?: boolean;
};
type IDocumentEditorProps = Omit<IEditorProps, "initialValue" | "onEnterKeyPress" | "value"> & {
  aiHandler?: TAIHandler;
  user?: TUserDetails;
  value: Content;
};
type EditorEvents = {
  beforeCreate: never;
  create: never;
  update: never;
  selectionUpdate: never;
  transaction: never;
  focus: never;
  blur: never;
  destroy: never;
  ready: {
    height: number;
  };
};
type NodeViewProps$1 = NodeViewProps;
//#endregion
//#region src/core/types/embed.d.ts
type TEmbedItem = {
  id: string;
  title: string;
  subTitle: string;
  icon: React.ReactNode;
  projectId: string;
  workspaceSlug: string;
};
//#endregion
//#region src/core/types/extensions.d.ts
type TExtensions = "ai" | "collaboration-cursor" | "issue-embed" | "slash-commands" | "enter-key" | "image";
//#endregion
//#region src/core/types/hook.d.ts
type TCoreHookProps = Pick<IEditorProps, "disabledExtensions" | "editorClassName" | "editorProps" | "extendedEditorProps" | "extensions" | "flaggedExtensions" | "getEditorMetaData" | "handleEditorReady" | "isTouchDevice" | "onEditorFocus">;
type TEditorHookProps = TCoreHookProps & Pick<IEditorProps, "autofocus" | "fileHandler" | "forwardedRef" | "id" | "mentionHandler" | "onAssetChange" | "onChange" | "onTransaction" | "placeholder" | "showPlaceholderOnEmpty" | "tabIndex" | "value"> & {
  editable: boolean;
  enableHistory: boolean;
  initialValue?: Content;
  provider?: HocuspocusProvider;
};
type TCollaborativeEditorHookProps = TCoreHookProps & Pick<TEditorHookProps, "editable" | "fileHandler" | "forwardedRef" | "id" | "mentionHandler" | "onAssetChange" | "onChange" | "onTransaction" | "placeholder" | "showPlaceholderOnEmpty" | "tabIndex"> & Pick<ICollaborativeDocumentEditorProps, "dragDropEnabled" | "extendedDocumentEditorProps" | "realtimeConfig" | "serverHandler" | "user"> & {
  titleRef?: ICollaborativeDocumentEditorProps["titleRef"];
  updatePageProperties?: ICollaborativeDocumentEditorProps["updatePageProperties"];
};
//#endregion
//#region src/core/types/mention.d.ts
type TMentionSuggestion = {
  entity_identifier: string;
  entity_name: TSearchEntities;
  icon: React.ReactNode;
  id: string;
  subTitle?: string;
  title: string;
};
type TMentionSection = {
  key: string;
  title?: string;
  items: TMentionSuggestion[];
};
type TCallbackMentionComponentProps = Pick<TMentionSuggestion, "entity_identifier" | "entity_name">;
type TMentionHandler = {
  getMentionedEntityDetails?: (entity_identifier: string) => {
    display_name: string;
  } | undefined;
  renderComponent: (props: TCallbackMentionComponentProps) => React.ReactNode;
  searchCallback?: (query: string) => Promise<TMentionSection[]>;
};
//#endregion
//#region src/core/types/slash-commands-suggestion.d.ts
type CommandProps = {
  editor: Editor;
  range: Range;
};
type TSlashCommandSectionKeys = "general" | "text-colors" | "background-colors";
type ISlashCommandItem = {
  commandKey: TEditorCommands;
  key: string;
  title: string;
  description: string;
  searchTerms: string[];
  icon: React.ReactNode;
  iconContainerStyle?: CSSProperties;
  command: ({
    editor,
    range
  }: CommandProps) => void;
  badge?: React.ReactNode;
};
//#endregion
//#region src/core/constants/document-collaborative-events.d.ts
type ArchivedPayload = CreatePayload<{
  archived_at: string | null;
}>;
type UnarchivedPayload = BaseActionPayload;
type LockedPayload = CreatePayload<{
  is_locked: boolean;
}>;
type UnlockedPayload = BaseActionPayload;
type MadePublicPayload = CreatePayload<{
  access: EPageAccess;
}>;
type MadePrivatePayload = CreatePayload<{
  access: EPageAccess;
}>;
type DeletedPayload = CreatePayload<{
  deleted_at: Date | null;
}>;
type DuplicatedPayload = CreatePayload<{
  new_page_id: string;
}>;
type PropertyUpdatedPayload = CreatePayload<Partial<TPage>>;
type MovedPayload = CreatePayload<{
  new_project_id: string;
  new_page_id: string;
}>;
type RestoredPayload = CreatePayload<{
  deleted_page_ids?: string[];
}>;
type ErrorPayload = CreatePayload<{
  error_message: string;
  error_type: "fetch" | "store";
  error_code?: "content_too_large" | "page_locked" | "page_archived";
  should_disconnect?: boolean;
}>;
declare const DocumentCollaborativeEvents: {
  readonly lock: {
    readonly client: "locked";
    readonly server: "lock";
    readonly payloadType: LockedPayload;
  };
  readonly unlock: {
    readonly client: "unlocked";
    readonly server: "unlock";
    readonly payloadType: UnlockedPayload;
  };
  readonly archive: {
    readonly client: "archived";
    readonly server: "archive";
    readonly payloadType: ArchivedPayload;
  };
  readonly unarchive: {
    readonly client: "unarchived";
    readonly server: "unarchive";
    readonly payloadType: UnarchivedPayload;
  };
  readonly "make-public": {
    readonly client: "made-public";
    readonly server: "make-public";
    readonly payloadType: MadePublicPayload;
  };
  readonly "make-private": {
    readonly client: "made-private";
    readonly server: "make-private";
    readonly payloadType: MadePrivatePayload;
  };
  readonly delete: {
    readonly client: "deleted";
    readonly server: "delete";
    readonly payloadType: DeletedPayload;
  };
  readonly move: {
    readonly client: "moved";
    readonly server: "move";
    readonly payloadType: MovedPayload;
  };
  readonly duplicate: {
    readonly client: "duplicated";
    readonly server: "duplicate";
    readonly payloadType: DuplicatedPayload;
  };
  readonly property_update: {
    readonly client: "property_updated";
    readonly server: "property_update";
    readonly payloadType: PropertyUpdatedPayload;
  };
  readonly restore: {
    readonly client: "restored";
    readonly server: "restore";
    readonly payloadType: RestoredPayload;
  };
  readonly error: {
    readonly client: "error";
    readonly server: "error";
    readonly payloadType: ErrorPayload;
  };
};
//#endregion
//#region src/core/types/document-collaborative-events.d.ts
type BaseActionPayload = {
  user_id?: string;
};
type CreatePayload<T = Record<string, never>> = BaseActionPayload & T;
type TDocumentEventEmitter = {
  on: (event: string, callback: (message: {
    payload: TDocumentEventsClient;
  }) => void) => void;
  off: (event: string, callback: (message: {
    payload: TDocumentEventsClient;
  }) => void) => void;
};
type TDocumentEventKey = keyof typeof DocumentCollaborativeEvents;
type TDocumentEventsClient = (typeof DocumentCollaborativeEvents)[TDocumentEventKey]["client"];
type TDocumentEventsServer = (typeof DocumentCollaborativeEvents)[TDocumentEventKey]["server"];
type TAllEventTypes = TDocumentEventsClient;
type EventToPayloadMap = { [K in keyof typeof DocumentCollaborativeEvents as (typeof DocumentCollaborativeEvents)[K]["client"]]: (typeof DocumentCollaborativeEvents)[K]["payloadType"] };
type CommonRealtimeFields = {
  affectedPages: {
    currentPage: string;
    parentPage: string | null;
    descendantPages: string[];
  };
  workspace_slug: string;
  project_id?: string;
  teamspace_id?: string;
  user_id: string;
  timestamp: string;
};
declare function createRealtimeEvent<T extends keyof EventToPayloadMap>(opts: ApiServerPayload<T>): CommonRealtimeFields & BroadcastedEvent<T>;
type ApiServerPayload<T extends keyof EventToPayloadMap> = {
  action: T;
  descendants_ids: string[];
  page_id?: string;
  parent_id?: string;
  data: EventToPayloadMap[T];
  project_id?: string;
  teamspace_id?: string;
  workspace_slug: string;
  user_id: string;
};
type BroadcastPayloadUnion = { [K in keyof EventToPayloadMap]: ApiServerPayload<K> }[keyof EventToPayloadMap];
type BroadcastedEventUnion = { [K in keyof EventToPayloadMap]: BroadcastedEvent<K> }[keyof EventToPayloadMap];
type BroadcastedEvent<T extends keyof EventToPayloadMap = keyof EventToPayloadMap> = CommonRealtimeFields & {
  action: T;
  data: EventToPayloadMap[T];
};
//#endregion
//#region src/core/helpers/yjs-utils.d.ts
declare const TITLE_EDITOR_EXTENSIONS: Extensions;
/**
 * @description apply updates to a doc and return the updated doc in binary format
 * @param {Uint8Array} document
 * @param {Uint8Array} updates
 * @returns {Uint8Array}
 */
declare const applyUpdates: (document: Uint8Array, updates?: Uint8Array) => Uint8Array;
/**
 * @description this function encodes binary data to base64 string
 * @param {Uint8Array} document
 * @returns {string}
 */
declare const convertBinaryDataToBase64String: (document: Uint8Array) => string;
/**
 * @description this function decodes base64 string to binary data
 * @param {string} document
 * @returns {Buffer<ArrayBuffer>}
 */
declare const convertBase64StringToBinaryData: (document: string) => Buffer<ArrayBuffer>;
/**
 * @description this function generates the binary equivalent of html content for the rich text editor
 * @param {string} descriptionHTML
 * @returns {Uint8Array}
 */
declare const getBinaryDataFromRichTextEditorHTMLString: (descriptionHTML: string) => Uint8Array;
/**
 * @description this function generates the binary equivalent of html content for the document editor
 * @param {string} descriptionHTML
 * @returns {Uint8Array}
 */
declare const getBinaryDataFromDocumentEditorHTMLString: (descriptionHTML: string) => Uint8Array;
/**
 * @description this function generates all document formats for the provided binary data for the rich text editor
 * @param {Uint8Array} description
 * @returns
 */
declare const getAllDocumentFormatsFromRichTextEditorBinaryData: (description: Uint8Array) => {
  contentBinaryEncoded: string;
  contentJSON: object;
  contentHTML: string;
};
/**
 * @description this function generates all document formats for the provided binary data for the document editor
 * @param {Uint8Array} description
 * @returns
 */
declare const getAllDocumentFormatsFromDocumentEditorBinaryData: (description: Uint8Array, updateTitle: boolean) => {
  contentBinaryEncoded: string;
  contentJSON: object;
  contentHTML: string;
  titleHTML?: string;
};
type TConvertHTMLDocumentToAllFormatsArgs = {
  document_html: string;
  variant: "rich" | "document";
};
/**
 * @description Converts HTML content to all supported document formats (JSON, HTML, and binary)
 * @param {TConvertHTMLDocumentToAllFormatsArgs} args - Arguments containing HTML content and variant type
 * @param {string} args.document_html - The HTML content to convert
 * @param {"rich" | "document"} args.variant - The type of editor variant to use for conversion
 * @returns {TDocumentPayload} Object containing the document in all supported formats
 * @throws {Error} If an invalid variant is provided
 */
declare const convertHTMLDocumentToAllFormats: (args: TConvertHTMLDocumentToAllFormatsArgs) => TDocumentPayload;
declare const extractTextFromHTML: (html: string) => string;
//#endregion
export { ICollaborativeDocumentEditorProps as $, LockedPayload as A, TEditorAsset as At, TSlashCommandSectionKeys as B, TDocumentEventsServer as C, TRealtimeConfig as Ct, DocumentCollaborativeEvents as D, CollaborationError as Dt, DeletedPayload as E, CollabStage as Et, RestoredPayload as F, TCollaborativeEditorHookProps as G, TMentionHandler as H, UnarchivedPayload as I, TEmbedItem as J, TEditorHookProps as K, UnlockedPayload as L, MadePublicPayload as M, CORE_EXTENSIONS$1 as Mt, MovedPayload as N, TAIHandler as Nt, DuplicatedPayload as O, CollaborationState as Ot, PropertyUpdatedPayload as P, TAIMenuProps as Pt, EditorTitleRefApi as Q, CommandProps as R, TDocumentEventsClient as S, TFileHandler as St, ArchivedPayload as T, TExtendedFileHandler as Tt, TMentionSection as U, TCallbackMentionComponentProps as V, TMentionSuggestion as W, EditorEvents as X, CoreEditorRefApi as Y, EditorRefApi as Z, CreatePayload as _, IMarking as _t, convertHTMLDocumentToAllFormats as a, TCommandExtraProps as at, TDocumentEventEmitter as b, TEditorFontStyle as bt, getAllDocumentFormatsFromRichTextEditorBinaryData as c, TEditorCommands as ct, ApiServerPayload as d, IEditorPropsExtended as dt, IDocumentEditorProps as et, BaseActionPayload as f, TExtendedCommandExtraProps as ft, CommonRealtimeFields as g, DocumentEditorExtensionsWithoutProps as gt, BroadcastedEventUnion as h, CoreEditorExtensionsWithoutProps as ht, convertBinaryDataToBase64String as i, NodeViewProps$1 as it, MadePrivatePayload as j, TEditorImageAsset as jt, ErrorPayload as k, TServerHandler as kt, getBinaryDataFromDocumentEditorHTMLString as l, ICollaborativeDocumentEditorPropsExtended as lt, BroadcastedEvent as m, TExtendedEditorRefApi as mt, applyUpdates as n, ILiteTextEditorProps as nt, extractTextFromHTML as o, TCommandWithProps as ot, BroadcastPayloadUnion as p, TExtendedEditorCommands as pt, TExtensions as q, convertBase64StringToBinaryData as r, IRichTextEditorProps as rt, getAllDocumentFormatsFromDocumentEditorBinaryData as s, TDocumentInfo as st, TITLE_EDITOR_EXTENSIONS as t, IEditorProps as tt, getBinaryDataFromRichTextEditorHTMLString as u, IEditorExtensionOptions as ut, EventToPayloadMap as v, TDisplayConfig as vt, createRealtimeEvent as w, TUserDetails as wt, TDocumentEventKey as x, TEditorLineSpacing as xt, TAllEventTypes as y, TEditorFontSize as yt, ISlashCommandItem as z };
//# sourceMappingURL=yjs-utils-CitB7yXk.d.ts.map