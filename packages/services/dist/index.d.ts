import { AI_EDITOR_TASKS } from "@plane/constants";
import * as axios0 from "axios";
import { AxiosRequestConfig } from "axios";
import { CycleDateCheckData, IApiToken, ICsrfTokenData, ICycle, IEmailCheckData, IEmailCheckResponse, IFavorite, IFormattedInstanceConfiguration, IInstance, IInstanceAdmin, IInstanceConfiguration, IInstanceInfo, IIssueLabel, ILastActiveWorkspaceDetails, ILinkDetails, IModule, IPublicIssue, IState, IUser, IUserProjectsRole, IWebhook, IWorkspace, IWorkspaceActiveCyclesResponse, IWorkspaceBulkInviteFormData, IWorkspaceMember, IWorkspaceMemberInvitation, IWorkspaceMemberMe, IWorkspaceSearchResults, IWorkspaceView, ModuleLink, TCycleDistribution, TCycleEstimateDistribution, TDuplicateAssetData, TDuplicateAssetResponse, TFileEntityInfo, TFileMetaDataLite, TFileSignedURLResponse, THomeDashboardResponse, TIssuePublicComment, TIssuesResponse, TNotification, TNotificationPaginatedInfo, TNotificationPaginatedInfoQueryParams, TPage, TProgressSnapshot, TProjectPublishSettings, TPublicCycle, TPublicIssuesResponse, TPublicMember, TPublicModule, TUnreadNotificationsCount, TUserProfile, TWidget, TWidgetStatsRequestParams, TWidgetStatsResponse, TWorkspacePaginationInfo } from "@plane/types";

//#region src/api.service.d.ts
/**
 * Abstract base class for making HTTP requests using axios
 * @abstract
 */
declare abstract class APIService {
  protected baseURL: string;
  private axiosInstance;
  /**
   * Creates an instance of APIService
   * @param {string} baseURL - The base URL for all HTTP requests
   */
  constructor(baseURL: string);
  /**
   * Makes a GET request to the specified URL
   * @param {string} url - The endpoint URL
   * @param {object} [params={}] - URL parameters
   * @param {AxiosRequestConfig} [config={}] - Additional axios configuration
   * @returns {Promise} Axios response promise
   */
  get(url: string, params?: {}, config?: AxiosRequestConfig): Promise<axios0.AxiosResponse<any, any, {}>>;
  /**
   * Makes a POST request to the specified URL
   * @param {string} url - The endpoint URL
   * @param {object} [data={}] - Request body data
   * @param {AxiosRequestConfig} [config={}] - Additional axios configuration
   * @returns {Promise} Axios response promise
   */
  post(url: string, data?: {}, config?: AxiosRequestConfig): Promise<axios0.AxiosResponse<any, any, {}>>;
  /**
   * Makes a PUT request to the specified URL
   * @param {string} url - The endpoint URL
   * @param {object} [data={}] - Request body data
   * @param {AxiosRequestConfig} [config={}] - Additional axios configuration
   * @returns {Promise} Axios response promise
   */
  put(url: string, data?: {}, config?: AxiosRequestConfig): Promise<axios0.AxiosResponse<any, any, {}>>;
  /**
   * Makes a PATCH request to the specified URL
   * @param {string} url - The endpoint URL
   * @param {object} [data={}] - Request body data
   * @param {AxiosRequestConfig} [config={}] - Additional axios configuration
   * @returns {Promise} Axios response promise
   */
  patch(url: string, data?: {}, config?: AxiosRequestConfig): Promise<axios0.AxiosResponse<any, any, {}>>;
  /**
   * Makes a DELETE request to the specified URL
   * @param {string} url - The endpoint URL
   * @param {any} [data] - Request body data
   * @param {AxiosRequestConfig} [config={}] - Additional axios configuration
   * @returns {Promise} Axios response promise
   */
  delete(url: string, data?: any, config?: AxiosRequestConfig): Promise<axios0.AxiosResponse<any, any, {}>>;
  /**
   * Makes a custom request with the provided configuration
   * @param {object} [config={}] - Axios request configuration
   * @returns {Promise} Axios response promise
   */
  request(config?: {}): Promise<axios0.AxiosResponse<any, any, {}>>;
}
//#endregion
//#region src/ai/ai.service.d.ts
/**
 * Payload type for AI editor tasks
 * @typedef {Object} TTaskPayload
 * @property {number} [casual_score] - Optional score for casual tone analysis
 * @property {number} [formal_score] - Optional score for formal tone analysis
 * @property {AI_EDITOR_TASKS} task - Type of AI editor task to perform
 * @property {string} text_input - The input text to be processed
 */
type TTaskPayload = {
  casual_score?: number;
  formal_score?: number;
  task: AI_EDITOR_TASKS;
  text_input: string;
};
/**
 * Service class for handling AI-related API operations
 * Extends the base APIService class to interact with AI endpoints
 * @extends {APIService}
 */
declare class AIService extends APIService {
  constructor(BASE_URL?: string);
  /**
   * Creates a GPT-based task for a specific workspace
   * @param {string} workspaceSlug - The unique identifier for the workspace
   * @param {Object} data - The data payload for the GPT task
   * @param {string} data.prompt - The prompt text for the GPT model
   * @param {string} data.task - The type of task to be performed
   * @returns {Promise<any>} The response data from the GPT task
   * @throws {Error} Throws the response error if the request fails
   */
  prompt(workspaceSlug: string, data: {
    prompt: string;
    task: string;
  }): Promise<any>;
  /**
   * Performs an editor-specific AI task for text processing
   * @param {string} workspaceSlug - The unique identifier for the workspace
   * @param {TTaskPayload} data - The task payload containing text and processing parameters
   * @returns {Promise<{response: string}>} The processed text response
   * @throws {Error} Throws the response data if the request fails
   */
  rephraseGrammar(workspaceSlug: string, data: TTaskPayload): Promise<{
    response: string;
  }>;
}
//#endregion
//#region src/developer/api-token.service.d.ts
declare class APITokenService extends APIService {
  constructor(BASE_URL?: string);
  /**
   * Retrieves all API tokens for a specific workspace
   * @returns {Promise<IApiToken[]>} Array of API tokens associated with the workspace
   * @throws {Error} Throws response data if the request fails
   */
  list(): Promise<IApiToken[]>;
  /**
   * Retrieves a specific API token by its ID
   * @param {string} tokenId - The unique identifier of the API token
   * @returns {Promise<IApiToken>} The requested API token's details
   * @throws {Error} Throws response data if the request fails
   */
  retrieve(tokenId: string): Promise<IApiToken>;
  /**
   * Creates a new API token for a workspace
   * @param {Partial<IApiToken>} data - The data for creating the new API token
   * @returns {Promise<IApiToken>} The newly created API token
   * @throws {Error} Throws response data if the request fails
   */
  create(data: Partial<IApiToken>): Promise<IApiToken>;
  /**
   * Deletes a specific API token from the workspace
   * @param {string} tokenId - The unique identifier of the API token to delete
   * @returns {Promise<IApiToken>} The deleted API token's details
   * @throws {Error} Throws response data if the request fails
   */
  destroy(tokenId: string): Promise<IApiToken>;
}
//#endregion
//#region src/developer/webhook.service.d.ts
/**
 * Service class for managing webhooks
 * Handles CRUD operations for webhooks and secret key management
 * @extends {APIService}
 */
declare class WebhookService extends APIService {
  constructor(BASE_URL?: string);
  /**
   * Retrieves all webhooks for a workspace
   * @param {string} workspaceSlug - The unique slug identifier for the workspace
   * @returns {Promise<IWebhook[]>} Promise resolving to array of webhooks
   * @throws {Error} If the API request fails
   */
  list(workspaceSlug: string): Promise<IWebhook[]>;
  /**
   * Retrieves details of a specific webhook
   * @param {string} workspaceSlug - The unique slug identifier for the workspace
   * @param {string} webhookId - The unique identifier for the webhook
   * @returns {Promise<IWebhook>} Promise resolving to webhook details
   * @throws {Error} If the API request fails
   */
  retrieve(workspaceSlug: string, webhookId: string): Promise<IWebhook>;
  /**
   * Creates a new webhook in the workspace
   * @param {string} workspaceSlug - The unique slug identifier for the workspace
   * @param {Object} [data={}] - Webhook configuration data
   * @returns {Promise<IWebhook>} Promise resolving to the created webhook
   * @throws {Error} If the API request fails
   */
  create(workspaceSlug: string, data?: {}): Promise<IWebhook>;
  /**
   * Updates an existing webhook
   * @param {string} workspaceSlug - The unique slug identifier for the workspace
   * @param {string} webhookId - The unique identifier for the webhook
   * @param {Object} [data={}] - Updated webhook configuration data
   * @returns {Promise<IWebhook>} Promise resolving to the updated webhook
   * @throws {Error} If the API request fails
   */
  update(workspaceSlug: string, webhookId: string, data?: {}): Promise<IWebhook>;
  /**
   * Deletes a webhook from the workspace
   * @param {string} workspaceSlug - The unique slug identifier for the workspace
   * @param {string} webhookId - The unique identifier for the webhook
   * @returns {Promise<void>} Promise resolving when webhook is deleted
   * @throws {Error} If the API request fails
   */
  destroy(workspaceSlug: string, webhookId: string): Promise<void>;
  /**
   * Regenerates the secret key for a webhook
   * @param {string} workspaceSlug - The unique slug identifier for the workspace
   * @param {string} webhookId - The unique identifier for the webhook
   * @returns {Promise<IWebhook>} Promise resolving to the webhook with new secret key
   * @throws {Error} If the API request fails
   */
  regenerateSecretKey(workspaceSlug: string, webhookId: string): Promise<IWebhook>;
}
//#endregion
//#region src/auth/auth.service.d.ts
/**
 * Service class for handling authentication-related operations
 * Provides methods for user authentication, password management, and session handling
 * @extends {APIService}
 */
declare class AuthService extends APIService {
  /**
   * Creates an instance of AuthService
   * Initializes with the base API URL
   */
  constructor(BASE_URL?: string);
  /**
   * Requests a CSRF token for form submission security
   * @returns {Promise<ICsrfTokenData>} Object containing the CSRF token
   * @throws {Error} Throws the complete error object if the request fails
   * @remarks This method uses the validateStatus: null option to bypass interceptors for unauthorized errors.
   */
  requestCSRFToken(): Promise<ICsrfTokenData>;
  /**
   * Checks if an email exists in the system
   * @param {IEmailCheckData} data - Email data to verify
   * @returns {Promise<IEmailCheckResponse>} Response indicating email status
   * @throws {Error} Throws response data if the request fails
   */
  emailCheck(data: IEmailCheckData): Promise<IEmailCheckResponse>;
  /**
   * Sends a password reset link to the specified email address
   * @param {{ email: string }} data - Object containing the email address
   * @returns {Promise<any>} Response from the password reset request
   * @throws {Error} Throws response object if the request fails
   */
  sendResetPasswordLink(data: {
    email: string;
  }): Promise<any>;
  /**
   * Sets a new password using a reset token
   * @param {string} token - CSRF token for form submission security
   * @param {{ password: string }} data - Object containing the new password
   * @returns {Promise<any>} Response from the password update request
   * @throws {Error} Throws response data if the request fails
   */
  setPassword(token: string, data: {
    password: string;
  }): Promise<any>;
  /**
   * Generates a unique code for magic link authentication
   * @param {{ email: string }} data - Object containing the email address
   * @returns {Promise<any>} Response containing the generated unique code
   * @throws {Error} Throws response data if the request fails
   */
  generateUniqueCode(data: {
    email: string;
  }): Promise<any>;
  /**
   * Performs user sign out by submitting a form with CSRF token
   * Creates and submits a form dynamically to handle the sign-out process
   * @param {string} baseUrl - Base URL for the sign-out endpoint
   * @returns {Promise<any>} Resolves when sign-out is complete
   * @throws {Error} Throws error if CSRF token is not found
   */
  signOut(baseUrl: string): Promise<any>;
}
//#endregion
//#region src/auth/sites-auth.service.d.ts
/**
 * Service class for handling authentication-related operations for Plane space application
 * Provides methods for user authentication, password management, and session handling
 * @extends {APIService}
 * @remarks This service is only available for plane sites
 */
declare class SitesAuthService extends APIService {
  /**
   * Creates an instance of SitesAuthService
   * Initializes with the base API URL
   */
  constructor(BASE_URL?: string);
  /**
   * Checks if an email exists in the system
   * @param {IEmailCheckData} data - Email data to verify
   * @returns {Promise<IEmailCheckResponse>} Response indicating email status
   * @throws {Error} Throws response data if the request fails
   */
  emailCheck(data: IEmailCheckData): Promise<IEmailCheckResponse>;
  /**
   * Generates a unique code for magic link authentication
   * @param {{ email: string }} data - Object containing the email address
   * @returns {Promise<any>} Response containing the generated unique code
   * @throws {Error} Throws response data if the request fails
   */
  generateUniqueCode(data: {
    email: string;
  }): Promise<any>;
}
//#endregion
//#region src/cycle/cycle-analytics.service.d.ts
/**
 * Service class for managing cycles within a workspace and project context.
 * Extends APIService to handle HTTP requests to the cycle-related endpoints.
 * @extends {APIService}
 */
declare class CycleAnalyticsService extends APIService {
  constructor(BASE_URL?: string);
  /**
   * Retrieves analytics for active cycles in a workspace.
   * @param {string} workspaceSlug - The workspace identifier
   * @param {string} projectId - The project identifier
   * @param {string} cycleId - The cycle identifier
   * @param {string} [analytic_type="points"] - The type of analytics to retrieve
   * @returns {Promise<TCycleDistribution | TCycleEstimateDistribution>} The cycle analytics data
   * @throws {Error} If the request fails
   */
  workspaceActiveCyclesAnalytics(workspaceSlug: string, projectId: string, cycleId: string, analytic_type?: string): Promise<TCycleDistribution | TCycleEstimateDistribution>;
  /**
   * Retrieves progress data for active cycles.
   * @param {string} workspaceSlug - The workspace identifier
   * @param {string} projectId - The project identifier
   * @param {string} cycleId - The cycle identifier
   * @returns {Promise<TProgressSnapshot>} The cycle progress data
   * @throws {Error} If the request fails
   */
  workspaceActiveCyclesProgress(workspaceSlug: string, projectId: string, cycleId: string): Promise<TProgressSnapshot>;
  /**
   * Retrieves advanced progress data for active cycles (Pro feature).
   * @param {string} workspaceSlug - The workspace identifier
   * @param {string} projectId - The project identifier
   * @param {string} cycleId - The cycle identifier
   * @returns {Promise<TProgressSnapshot>} The detailed cycle progress data
   * @throws {Error} If the request fails
   */
  workspaceActiveCyclesProgressPro(workspaceSlug: string, projectId: string, cycleId: string): Promise<TProgressSnapshot>;
}
//#endregion
//#region src/cycle/cycle-archive.service.d.ts
/**
 * Service class for managing archived cycles in a project
 * Provides methods for retrieving, archiving, and restoring project cycles
 * @extends {APIService}
 */
declare class CycleArchiveService extends APIService {
  constructor(BASE_URL?: string);
  /**
   * Retrieves all archived cycles for a specific project
   * @param {string} workspaceSlug - The unique identifier for the workspace
   * @param {string} projectId - The unique identifier for the project
   * @returns {Promise<ICycle[]>} Array of archived cycles
   * @throws {Error} Throws response data if the request fails
   */
  list(workspaceSlug: string, projectId: string): Promise<ICycle[]>;
  /**
   * Retrieves details of a specific archived cycle
   * @param {string} workspaceSlug - The unique identifier for the workspace
   * @param {string} projectId - The unique identifier for the project
   * @param {string} cycleId - The unique identifier for the cycle
   * @returns {Promise<ICycle>} Details of the archived cycle
   * @throws {Error} Throws response data if the request fails
   */
  retrieve(workspaceSlug: string, projectId: string, cycleId: string): Promise<ICycle>;
  /**
   * Archives a specific cycle in a project
   * @param {string} workspaceSlug - The unique identifier for the workspace
   * @param {string} projectId - The unique identifier for the project
   * @param {string} cycleId - The unique identifier for the cycle to archive
   * @returns {Promise<{archived_at: string}>} Object containing the archive timestamp
   * @throws {Error} Throws response data if the request fails
   */
  archive(workspaceSlug: string, projectId: string, cycleId: string): Promise<{
    archived_at: string;
  }>;
  /**
   * Restores a previously archived cycle
   * @param {string} workspaceSlug - The unique identifier for the workspace
   * @param {string} projectId - The unique identifier for the project
   * @param {string} cycleId - The unique identifier for the cycle to restore
   * @returns {Promise<void>} Resolves when the cycle is successfully restored
   * @throws {Error} Throws response data if the request fails
   */
  restore(workspaceSlug: string, projectId: string, cycleId: string): Promise<void>;
}
//#endregion
//#region src/cycle/cycle-operations.service.d.ts
declare class CycleOperationsService extends APIService {
  constructor(BASE_URL?: string);
  /**
   * Adds a cycle to user favorites.
   * @param {string} workspaceSlug - The workspace identifier
   * @param {string} projectId - The project identifier
   * @param {{cycle: string}} data - The favorite cycle data
   * @returns {Promise<any>} The response data
   * @throws {Error} If the request fails
   */
  addToFavorites(workspaceSlug: string, projectId: string, data: {
    cycle: string;
  }): Promise<any>;
  /**
   * Removes a cycle from user favorites.
   * @param {string} workspaceSlug - The workspace identifier
   * @param {string} projectId - The project identifier
   * @param {string} cycleId - The cycle identifier
   * @returns {Promise<any>} The removal response
   * @throws {Error} If the request fails
   */
  removeFromFavorites(workspaceSlug: string, projectId: string, cycleId: string): Promise<any>;
  /**
   * Transfers issues between cycles.
   * @param {string} workspaceSlug - The workspace identifier
   * @param {string} projectId - The project identifier
   * @param {string} cycleId - The source cycle identifier
   * @param {{new_cycle_id: string}} data - The target cycle data
   * @returns {Promise<any>} The transfer response
   * @throws {Error} If the request fails
   */
  transferIssues(workspaceSlug: string, projectId: string, cycleId: string, data: {
    new_cycle_id: string;
  }): Promise<any>;
}
//#endregion
//#region src/cycle/cycle.service.d.ts
/**
 * Service class for managing cycles within a workspace and project context.
 * Extends APIService to handle HTTP requests to the cycle-related endpoints.
 * @extends {APIService}
 */
declare class CycleService extends APIService {
  constructor(BASE_URL?: string);
  /**
   * Retrieves paginated list of active cycles in a workspace.
   * @param {string} workspaceSlug - The workspace identifier
   * @param {string} cursor - The pagination cursor
   * @param {number} per_page - Number of items per page
   * @returns {Promise<IWorkspaceActiveCyclesResponse>} Paginated active cycles data
   * @throws {Error} If the request fails
   */
  workspaceActiveCycles(workspaceSlug: string, cursor: string, per_page: number): Promise<IWorkspaceActiveCyclesResponse>;
  /**
   * Gets all cycles in a workspace.
   * @param {string} workspaceSlug - The workspace identifier
   * @returns {Promise<ICycle[]>} Array of cycle objects
   * @throws {Error} If the request fails
   */
  getWorkspaceCycles(workspaceSlug: string): Promise<ICycle[]>;
  /**
   * Creates a new cycle in a project.
   * @param {string} workspaceSlug - The workspace identifier
   * @param {string} projectId - The project identifier
   * @param {any} data - The cycle creation data
   * @returns {Promise<ICycle>} The created cycle object
   * @throws {Error} If the request fails
   */
  create(workspaceSlug: string, projectId: string, data: any): Promise<ICycle>;
  /**
   * Retrieves cycles with optional filtering parameters.
   * @param {string} workspaceSlug - The workspace identifier
   * @param {string} projectId - The project identifier
   * @param {"current"} [cycleType] - Optional filter for cycle type
   * @returns {Promise<ICycle[]>} Array of filtered cycle objects
   * @throws {Error} If the request fails
   */
  getWithParams(workspaceSlug: string, projectId: string, cycleType?: "current"): Promise<ICycle[]>;
  /**
   * Retrieves detailed information for a specific cycle.
   * @param {string} workspaceSlug - The workspace identifier
   * @param {string} projectId - The project identifier
   * @param {string} cycleId - The cycle identifier
   * @returns {Promise<ICycle>} The cycle details
   * @throws {Error} If the request fails
   */
  retrieve(workspaceSlug: string, projectId: string, cycleId: string): Promise<ICycle>;
  /**
   * Retrieves issues associated with a specific cycle.
   * @param {string} workspaceSlug - The workspace identifier
   * @param {string} projectId - The project identifier
   * @param {string} cycleId - The cycle identifier
   * @param {any} [queries] - Optional query parameters
   * @param {object} [config={}] - Optional request configuration
   * @returns {Promise<TIssuesResponse>} The cycle issues data
   * @throws {Error} If the request fails
   */
  getCycleIssues(workspaceSlug: string, projectId: string, cycleId: string, queries?: any, config?: {}): Promise<TIssuesResponse>;
  /**
   * Updates a cycle with partial data.
   * @param {string} workspaceSlug - The workspace identifier
   * @param {string} projectId - The project identifier
   * @param {string} cycleId - The cycle identifier
   * @param {Partial<ICycle>} data - The partial cycle data to update
   * @returns {Promise<any>} The update response
   * @throws {Error} If the request fails
   */
  update(workspaceSlug: string, projectId: string, cycleId: string, data: Partial<ICycle>): Promise<any>;
  /**
   * Deletes a specific cycle.
   * @param {string} workspaceSlug - The workspace identifier
   * @param {string} projectId - The project identifier
   * @param {string} cycleId - The cycle identifier
   * @returns {Promise<any>} The deletion response
   * @throws {Error} If the request fails
   */
  destroy(workspaceSlug: string, projectId: string, cycleId: string): Promise<any>;
  /**
   * Validates cycle dates.
   * @param {string} workspaceSlug - The workspace identifier
   * @param {string} projectId - The project identifier
   * @param {CycleDateCheckData} data - The date check data
   * @returns {Promise<any>} The validation response
   * @throws {Error} If the request fails
   */
  validateDates(workspaceSlug: string, projectId: string, data: CycleDateCheckData): Promise<any>;
}
//#endregion
//#region src/cycle/sites-cycle.service.d.ts
/**
 * Service class for managing cycles within plane sites application.
 * Extends APIService to handle HTTP requests to the cycle-related endpoints.
 * @extends {APIService}
 * @remarks This service is only available for plane sites
 */
declare class SitesCycleService extends APIService {
  constructor(BASE_URL?: string);
  /**
   * Retrieves list of cycles for a specific anchor.
   * @param anchor - The anchor identifier for the published entity
   * @returns {Promise<TPublicCycle[]>} The list of cycles
   * @throws {Error} If the request fails
   */
  list(anchor: string): Promise<TPublicCycle[]>;
}
//#endregion
//#region src/dashboard/dashboard.service.d.ts
declare class DashboardService extends APIService {
  constructor(BASE_URL?: string);
  /**
   * Retrieves home dashboard widgets for a specific workspace
   * @param {string} workspaceSlug - The unique identifier for the workspace
   * @returns {Promise<THomeDashboardResponse>} Promise resolving to dashboard widget data
   * @throws {Error} If the API request fails
   */
  getHomeWidgets(workspaceSlug: string): Promise<THomeDashboardResponse>;
  /**
   * Fetches statistics for a specific dashboard widget
   * @param {string} workspaceSlug - The unique identifier for the workspace
   * @param {string} dashboardId - The unique identifier for the dashboard
   * @param {TWidgetStatsRequestParams} params - Parameters for filtering widget statistics
   * @returns {Promise<TWidgetStatsResponse>} Promise resolving to widget statistics data
   * @throws {Error} If the API request fails
   */
  getWidgetStats(workspaceSlug: string, dashboardId: string, params: TWidgetStatsRequestParams): Promise<TWidgetStatsResponse>;
  /**
   * Retrieves detailed information about a specific dashboard
   * @param {string} dashboardId - The unique identifier for the dashboard
   * @returns {Promise<TWidgetStatsResponse>} Promise resolving to dashboard details
   * @throws {Error} If the API request fails
   */
  retrieve(dashboardId: string): Promise<TWidgetStatsResponse>;
  /**
   * Updates a specific widget within a dashboard
   * @param {string} dashboardId - The unique identifier for the dashboard
   * @param {string} widgetId - The unique identifier for the widget
   * @param {Partial<TWidget>} data - Partial widget data to update
   * @returns {Promise<TWidget>} Promise resolving to the updated widget data
   * @throws {Error} If the API request fails
   */
  updateWidget(dashboardId: string, widgetId: string, data: Partial<TWidget>): Promise<TWidget>;
}
//#endregion
//#region src/instance/instance.service.d.ts
/**
 * Service class for managing instance-related operations
 * Handles retrieval of instance information and changelog
 * @extends {APIService}
 */
declare class InstanceService extends APIService {
  /**
   * Creates an instance of InstanceService
   * Initializes the service with the base API URL
   */
  constructor();
  /**
   * Retrieves information about the current instance
   * @returns {Promise<IInstanceInfo>} Promise resolving to instance information
   * @throws {Error} If the API request fails
   * @remarks This method uses the validateStatus: null option to bypass interceptors for unauthorized errors.
   */
  info(): Promise<IInstanceInfo>;
  /**
   * Fetches the changelog for the current instance
   * @returns {Promise<TPage>} Promise resolving to the changelog page data
   * @throws {Error} If the API request fails
   */
  changelog(): Promise<TPage>;
  /**
   * Fetches the list of instance admins
   * @returns {Promise<IInstanceAdmin[]>} Promise resolving to an array of instance admins
   * @throws {Error} If the API request fails
   * @remarks This method uses the validateStatus: null option to bypass interceptors for unauthorized errors.
   */
  admins(): Promise<IInstanceAdmin[]>;
  /**
   * Updates the instance information
   * @param {Partial<IInstance>} data Data to update the instance with
   * @returns {Promise<IInstance>} Promise resolving to the updated instance information
   * @throws {Error} If the API request fails
   */
  update(data: Partial<IInstance>): Promise<IInstance>;
  /**
   * Fetches the list of instance configurations
   * @returns {Promise<IInstanceConfiguration[]>} Promise resolving to an array of instance configurations
   * @throws {Error} If the API request fails
   */
  configurations(): Promise<IInstanceConfiguration[]>;
  /**
   * Updates the instance configurations
   * @param {Partial<IFormattedInstanceConfiguration>} data Data to update the instance configurations with
   * @returns {Promise<IInstanceConfiguration[]>} The updated instance configurations
   * @throws {Error} If the API request fails
   */
  updateConfigurations(data: Partial<IFormattedInstanceConfiguration>): Promise<IInstanceConfiguration[]>;
  /**
   * Sends a test email to the specified receiver to test SMTP configuration
   * @param {string} receiverEmail Email address to send the test email to
   * @returns {Promise<void>} Promise resolving to void
   * @throws {Error} If the API request fails
   */
  sendTestEmail(receiverEmail: string): Promise<void>;
  /**
   * Disables the email configuration
   * @returns {Promise<void>} Promise resolving to void
   * @throws {Error} If the API request fails
   */
  disableEmail(): Promise<void>;
}
//#endregion
//#region src/intake/intake.service.d.ts
declare class IntakeService extends APIService {
  constructor(BASE_URL?: string);
}
//#endregion
//#region src/intake/issue.service.d.ts
declare class IntakeIssueService extends APIService {
  constructor(BASE_URL?: string);
  list(workspaceSlug: string, projectId: string, params?: {}): Promise<any>;
}
//#endregion
//#region src/module/link.service.d.ts
/**
 * Service class for handling module link related operations.
 * Extends the base APIService class to interact with module link endpoints.
 */
declare class ModuleLinkService extends APIService {
  /**
   * Creates an instance of ModuleLinkService.
   * @param {string} baseURL - The base URL for the API endpoints
   */
  constructor(baseURL: string);
  /**
   * Creates a new module link.
   * @param {string} workspaceSlug - The unique identifier for the workspace
   * @param {string} projectId - The unique identifier for the project
   * @param {string} moduleId - The unique identifier for the module
   * @param {Partial<ModuleLink>} data - The module link data to be created
   * @returns {Promise<ILinkDetails>} The created module link details
   * @throws {Error} When the API request fails
   */
  create(workspaceSlug: string, projectId: string, moduleId: string, data: Partial<ModuleLink>): Promise<ILinkDetails>;
  /**
   * Updates an existing module link.
   * @param {string} workspaceSlug - The unique identifier for the workspace
   * @param {string} projectId - The unique identifier for the project
   * @param {string} moduleId - The unique identifier for the module
   * @param {string} linkId - The unique identifier for the link to update
   * @param {Partial<ModuleLink>} data - The module link data to be updated
   * @returns {Promise<ILinkDetails>} The updated module link details
   * @throws {Error} When the API request fails
   */
  update(workspaceSlug: string, projectId: string, moduleId: string, linkId: string, data: Partial<ModuleLink>): Promise<ILinkDetails>;
  /**
   * Deletes a module link.
   * @param {string} workspaceSlug - The unique identifier for the workspace
   * @param {string} projectId - The unique identifier for the project
   * @param {string} moduleId - The unique identifier for the module
   * @param {string} linkId - The unique identifier for the link to delete
   * @returns {Promise<any>} Response data from the server
   * @throws {Error} When the API request fails
   */
  destroy(workspaceSlug: string, projectId: string, moduleId: string, linkId: string): Promise<any>;
}
//#endregion
//#region src/module/module.service.d.ts
declare class ModuleService extends APIService {
  constructor(baseURL: string);
  workspaceModulesList(workspaceSlug: string): Promise<IModule[]>;
  projectModulesList(workspaceSlug: string, projectId: string): Promise<IModule[]>;
  create(workspaceSlug: string, projectId: string, data: any): Promise<IModule>;
  retrieve(workspaceSlug: string, projectId: string, moduleId: string): Promise<IModule>;
  update(workspaceSlug: string, projectId: string, moduleId: string, data: Partial<IModule>): Promise<IModule>;
  destroy(workspaceSlug: string, projectId: string, moduleId: string): Promise<any>;
  getModuleIssues(workspaceSlug: string, projectId: string, moduleId: string, queries?: any, config?: {}): Promise<TIssuesResponse>;
  addIssuesToModule(workspaceSlug: string, projectId: string, moduleId: string, data: {
    issues: string[];
  }): Promise<void>;
  addModulesToIssue(workspaceSlug: string, projectId: string, issueId: string, data: {
    modules: string[];
    removed_modules?: string[];
  }): Promise<void>;
  removeIssuesFromModuleBulk(workspaceSlug: string, projectId: string, moduleId: string, issueIds: string[]): Promise<void>;
  removeModulesFromIssueBulk(workspaceSlug: string, projectId: string, issueId: string, moduleIds: string[]): Promise<void>;
  createModuleLink(workspaceSlug: string, projectId: string, moduleId: string, data: Partial<ModuleLink>): Promise<ILinkDetails>;
  updateModuleLink(workspaceSlug: string, projectId: string, moduleId: string, linkId: string, data: Partial<ModuleLink>): Promise<ILinkDetails>;
  deleteModuleLink(workspaceSlug: string, projectId: string, moduleId: string, linkId: string): Promise<any>;
  addModuleToFavorites(workspaceSlug: string, projectId: string, data: {
    module: string;
  }): Promise<any>;
  removeModuleFromFavorites(workspaceSlug: string, projectId: string, moduleId: string): Promise<any>;
}
//#endregion
//#region src/module/operations.service.d.ts
declare class ModuleOperationService extends APIService {
  constructor(baseURL: string);
  /**
   * Add issues to a module
   * @param {string} workspaceSlug - The slug of the workspace
   * @param {string} projectId - The ID of the project
   * @param {string} moduleId - The ID of the module
   * @param {object} data - The data to be sent in the request body
   * @param {string[]} data.issues - The IDs of the issues to be added
   * @returns {Promise<void>}
   */
  addIssuesToModule(workspaceSlug: string, projectId: string, moduleId: string, data: {
    issues: string[];
  }): Promise<void>;
  /**
   * Add modules to an issue
   * @param {string} workspaceSlug - The slug of the workspace
   * @param {string} projectId - The ID of the project
   * @param {string} issueId - The ID of the issue
   * @param {object} data - The data to be sent in the request body
   * @param {string[]} data.modules - The IDs of the modules to be added
   * @param {string[]} [data.removed_modules] - The IDs of the modules to be removed
   * @returns {Promise<void>}
   */
  addModulesToIssue(workspaceSlug: string, projectId: string, issueId: string, data: {
    modules: string[];
    removed_modules?: string[];
  }): Promise<void>;
  /**
   * Remove issues from a module
   * @param {string} workspaceSlug - The slug of the workspace
   * @param {string} projectId - The ID of the project
   * @param {string} moduleId - The ID of the module
   * @param {string[]} issueIds - The IDs of the issues to be removed
   * @returns {Promise<void>}
   */
  removeIssuesFromModuleBulk(workspaceSlug: string, projectId: string, moduleId: string, issueIds: string[]): Promise<void>;
  /**
   * Remove modules from an issue
   * @param {string} workspaceSlug - The slug of the workspace
   * @param {string} projectId - The ID of the project
   * @param {string} issueId - The ID of the issue
   * @param {string[]} moduleIds - The IDs of the modules to be removed
   * @returns {Promise<void>}
   */
  removeModulesFromIssueBulk(workspaceSlug: string, projectId: string, issueId: string, moduleIds: string[]): Promise<void>;
  /**
   * Add a module to favorites
   * @param {string} workspaceSlug - The slug of the workspace
   * @param {string} projectId - The ID of the project
   * @param {object} data - The data to be sent in the request body
   * @param {string} data.module - The ID of the module to be added
   * @returns {Promise<any>}
   */
  addModuleToFavorites(workspaceSlug: string, projectId: string, data: {
    module: string;
  }): Promise<any>;
  /**
   * Remove a module from favorites
   * @param {string} workspaceSlug - The slug of the workspace
   * @param {string} projectId - The ID of the project
   * @param {string} moduleId - The ID of the module to be removed
   * @returns {Promise<any>}
   */
  removeModuleFromFavorites(workspaceSlug: string, projectId: string, moduleId: string): Promise<any>;
}
//#endregion
//#region src/module/sites-module.service.d.ts
/**
 * Service class for managing modules within plane sites application.
 * Extends APIService to handle HTTP requests to the module-related endpoints.
 * @extends {APIService}
 * @remarks This service is only available for plane sites
 */
declare class SitesModuleService extends APIService {
  constructor(BASE_URL?: string);
  /**
   * Retrieves a list of modules for a specific anchor.
   * @param {string} anchor - The anchor identifier
   * @returns {Promise<TPublicModule[]>} The list of modules
   * @throws {Error} If the API request fails
   */
  list(anchor: string): Promise<TPublicModule[]>;
}
//#endregion
//#region src/user/favorite.service.d.ts
/**
 * Service class for managing user favorites
 * Handles operations for adding, updating, removing, and retrieving user favorites within a workspace
 * @extends {APIService}
 */
declare class UserFavoriteService extends APIService {
  constructor(BASE_URL?: string);
  /**
   * Adds a new item to user favorites
   * @param {string} workspaceSlug - The unique slug identifier for the workspace
   * @param {Partial<IFavorite>} data - Favorite item data to be added
   * @returns {Promise<IFavorite>} Promise resolving to the created favorite item
   * @throws {Error} If the API request fails
   */
  add(workspaceSlug: string, data: Partial<IFavorite>): Promise<IFavorite>;
  /**
   * Updates an existing favorite item
   * @param {string} workspaceSlug - The unique slug identifier for the workspace
   * @param {string} favoriteId - The unique identifier for the favorite item
   * @param {Partial<IFavorite>} data - Updated favorite item data
   * @returns {Promise<IFavorite>} Promise resolving to the updated favorite item
   * @throws {Error} If the API request fails
   */
  update(workspaceSlug: string, favoriteId: string, data: Partial<IFavorite>): Promise<IFavorite>;
  /**
   * Removes an item from user favorites
   * @param {string} workspaceSlug - The unique slug identifier for the workspace
   * @param {string} favoriteId - The unique identifier for the favorite item to remove
   * @returns {Promise<void>} Promise resolving when the favorite item is removed
   * @throws {Error} If the API request fails
   */
  remove(workspaceSlug: string, favoriteId: string): Promise<void>;
  /**
   * Retrieves all favorite items for a user in a workspace
   * @param {string} workspaceSlug - The unique slug identifier for the workspace
   * @returns {Promise<IFavorite[]>} Promise resolving to array of favorite items
   * @throws {Error} If the API request fails
   * @remarks This method includes the 'all' parameter to retrieve all favorites
   */
  list(workspaceSlug: string): Promise<IFavorite[]>;
  /**
   * Retrieves grouped favorite items for a specific favorite in a workspace
   * @param {string} workspaceSlug - The unique slug identifier for the workspace
   * @param {string} favoriteId - The unique identifier for the favorite item to get grouped items for
   * @returns {Promise<IFavorite[]>} Promise resolving to array of grouped favorite items
   * @throws {Error} If the API request fails
   */
  groupedList(workspaceSlug: string, favoriteId: string): Promise<IFavorite[]>;
}
//#endregion
//#region src/user/user.service.d.ts
/**
 * Service class for managing user operations
 * Handles operations for retrieving the current user's details and perform CRUD operations
 * @extends {APIService}
 */
declare class UserService extends APIService {
  /**
   * Constructor for UserService
   * @param BASE_URL - Base URL for API requests
   */
  constructor(BASE_URL?: string);
  /**
   * Retrieves the current user details
   * @returns {Promise<IUser>} Promise resolving to the current user details
   */
  me(): Promise<IUser>;
  /**
   * Updates the current user details
   * @param {Partial<IUser>} data Data to update the user with
   * @returns {Promise<IUser>} Promise resolving to the updated user details
   * @throws {Error} If the API request fails
   */
  update(data: Partial<IUser>): Promise<IUser>;
  /**
   * Retrieves the current user's profile details
   * @returns {Promise<TUserProfile>} Promise resolving to the current user's profile details
   * @throws {Error} If the API request fails
   */
  profile(): Promise<TUserProfile>;
  /**
   * Updates the current user's profile details
   * @param {Partial<TUserProfile>} data Data to update the user's profile with
   * @returns {Promise<TUserProfile>} Promise resolving to the updated user's profile details
   * @throws {Error} If the API request fails
   */
  updateProfile(data: Partial<TUserProfile>): Promise<TUserProfile>;
  /**
   * Retrieves the current instance admin details
   * @returns {Promise<IUser>} Promise resolving to the current instance admin details
   * @throws {Error} If the API request fails
   */
  adminDetails(): Promise<IUser>;
}
//#endregion
//#region src/user/sites-member.service.d.ts
/**
 * Service class for managing members operations within plane sites application.
 * Extends APIService to handle HTTP requests to the member-related endpoints.
 * @extends {APIService}
 * @remarks This service is only available for plane sites
 */
declare class SitesMemberService extends APIService {
  constructor(BASE_URL?: string);
  /**
   * Retrieves a list of members for a specific anchor.
   * @param {string} anchor - The anchor identifier
   * @returns {Promise<TPublicMember[]>} The list of members
   * @throws {Error} If the API request fails
   */
  list(anchor: string): Promise<TPublicMember[]>;
}
//#endregion
//#region src/project/view.service.d.ts
declare class ProjectViewService extends APIService {
  /**
   * Creates an instance of ProjectViewService
   * @param {string} baseUrl - The base URL for API requests
   */
  constructor(BASE_URL?: string);
}
//#endregion
//#region src/project/sites-publish.service.d.ts
/**
 * Service class for managing project publish operations within plane sites application.
 * Extends APIService to handle HTTP requests to the project publish-related endpoints.
 * @extends {APIService}
 * @remarks This service is only available for plane sites
 */
declare class SitesProjectPublishService extends APIService {
  constructor(BASE_URL?: string);
  /**
   * Retrieves publish settings for a specific anchor.
   * @param {string} anchor - The anchor identifier
   * @returns {Promise<TProjectPublishSettings>} The publish settings
   * @throws {Error} If the API request fails
   */
  retrieveSettingsByAnchor(anchor: string): Promise<TProjectPublishSettings>;
  /**
   * Retrieves publish settings for a specific project.
   * @param {string} workspaceSlug - The workspace slug
   * @param {string} projectID - The project identifier
   * @returns {Promise<TProjectPublishSettings>} The publish settings
   * @throws {Error} If the API request fails
   */
  retrieveSettingsByProjectId(workspaceSlug: string, projectID: string): Promise<TProjectPublishSettings>;
}
//#endregion
//#region src/workspace/invitation.service.d.ts
/**
 * Service class for managing workspace invitations
 * Handles operations related to inviting users to workspaces and managing invitations
 * @extends {APIService}
 */
declare class WorkspaceInvitationService extends APIService {
  constructor(BASE_URL?: string);
  /**
   * Retrieves all workspace invitations for the current user
   * @returns {Promise<IWorkspaceMemberInvitation[]>} Promise resolving to array of workspace invitations
   * @throws {Error} If the API request fails
   */
  userInvitations(): Promise<IWorkspaceMemberInvitation[]>;
  /**
   * Retrieves all invitations for a specific workspace
   * @param {string} workspaceSlug - The unique slug identifier for the workspace
   * @returns {Promise<IWorkspaceMemberInvitation[]>} Promise resolving to array of workspace invitations
   * @throws {Error} If the API request fails
   */
  workspaceInvitations(workspaceSlug: string): Promise<IWorkspaceMemberInvitation[]>;
  /**
   * Sends bulk invitations to users for a workspace
   * @param {string} workspaceSlug - The unique slug identifier for the workspace
   * @param {IWorkspaceBulkInviteFormData} data - Bulk invitation data containing user information
   * @returns {Promise<any>} Promise resolving to the invitation response
   * @throws {Error} If the API request fails
   */
  invite(workspaceSlug: string, data: IWorkspaceBulkInviteFormData): Promise<any>;
  /**
   * Update Invitation
   * @param workspaceSlug
   * @param invitationId
   * @param data
   * @returns
   */
  update(workspaceSlug: string, invitationId: string, data: Partial<IWorkspaceMember>): Promise<any>;
  /**
   * Delete Workspace invitation
   * @param workspaceSlug
   * @param invitationId
   * @returns
   */
  destroy(workspaceSlug: string, invitationId: string): Promise<any>;
  /**
   * Accepts an invitation to join a workspace
   * @param {string} workspaceSlug - The unique slug identifier for the workspace
   * @param {string} invitationId - The unique identifier for the invitation
   * @param {any} data - Additional data required for joining the workspace
   * @returns {Promise<any>} Promise resolving to the join response
   * @throws {Error} If the API request fails
   */
  join(workspaceSlug: string, invitationId: string, data: any): Promise<any>;
  /**
   * Accepts multiple workspace invitations at once
   * @param {any} data - Data containing information about invitations to accept
   * @returns {Promise<any>} Promise resolving to the bulk join response
   * @throws {Error} If the API request fails
   */
  joinMany(data: any): Promise<any>;
}
//#endregion
//#region src/workspace/member.service.d.ts
/**
 * Service class for managing workspace members
 * Handles operations related to workspace membership, including member information,
 * updates, deletions, and role management
 * @extends {APIService}
 */
declare class WorkspaceMemberService extends APIService {
  /**
   * Creates an instance of WorkspaceMemberService
   * @param {string} baseUrl - The base URL for API requests
   */
  constructor(BASE_URL?: string);
  /**
   * Retrieves current user's information for a specific workspace
   * @param {string} workspaceSlug - The unique slug identifier for the workspace
   * @returns {Promise<IWorkspaceMemberMe>} Promise resolving to current user's workspace member information
   * @throws {Error} If the API request fails
   */
  myInfo(workspaceSlug: string): Promise<IWorkspaceMemberMe>;
  /**
   * Retrieves all members of a specific workspace
   * @param {string} workspaceSlug - The unique slug identifier for the workspace
   * @returns {Promise<IWorkspaceMember[]>} Promise resolving to array of workspace members
   * @throws {Error} If the API request fails
   */
  list(workspaceSlug: string): Promise<IWorkspaceMember[]>;
  /**
   * Updates a workspace member's information
   * @param {string} workspaceSlug - The unique slug identifier for the workspace
   * @param {string} memberId - The unique identifier for the member
   * @param {Partial<IWorkspaceMember>} data - Updated member data
   * @returns {Promise<IWorkspaceMember>} Promise resolving to the updated member information
   * @throws {Error} If the API request fails
   */
  update(workspaceSlug: string, memberId: string, data: Partial<IWorkspaceMember>): Promise<IWorkspaceMember>;
  /**
   * Removes a member from a workspace
   * @param {string} workspaceSlug - The unique slug identifier for the workspace
   * @param {string} memberId - The unique identifier for the member to remove
   * @returns {Promise<any>} Promise resolving to the deletion response
   * @throws {Error} If the API request fails
   */
  destroy(workspaceSlug: string, memberId: string): Promise<any>;
  /**
   * Retrieves the current user's project roles within a workspace
   * @param {string} workspaceSlug - The unique slug identifier for the workspace
   * @returns {Promise<IUserProjectsRole>} Promise resolving to user's project roles
   * @throws {Error} If the API request fails
   */
  getWorkspaceUserProjectsRole(workspaceSlug: string): Promise<IUserProjectsRole>;
}
//#endregion
//#region src/workspace/notification.service.d.ts
declare class WorkspaceNotificationService extends APIService {
  constructor(BASE_URL?: string);
  /**
   * Retrieves the count of unread notifications for a workspace
   * @param {string} workspaceSlug - The unique identifier for the workspace
   * @returns {Promise<TUnreadNotificationsCount | undefined>} The count of unread notifications
   */
  getUnreadCount(workspaceSlug: string): Promise<TUnreadNotificationsCount | undefined>;
  /**
   * Retrieves paginated notifications for a workspace
   * @param {string} workspaceSlug - The unique identifier for the workspace
   * @param {TNotificationPaginatedInfoQueryParams} params - Query parameters for pagination and filtering
   * @returns {Promise<TNotificationPaginatedInfo | undefined>} Paginated list of notifications
   */
  list(workspaceSlug: string, params: TNotificationPaginatedInfoQueryParams): Promise<TNotificationPaginatedInfo | undefined>;
  /**
   * Updates a specific notification by ID
   * @param {string} workspaceSlug - The unique identifier for the workspace
   * @param {string} notificationId - The unique identifier for the notification
   * @param {Partial<TNotification>} data - The notification data to update
   * @returns {Promise<TNotification | undefined>} The updated notification
   */
  update(workspaceSlug: string, notificationId: string, data: Partial<TNotification>): Promise<TNotification | undefined>;
  /**
   * Marks a notification as read
   * @param {string} workspaceSlug - The unique identifier for the workspace
   * @param {string} notificationId - The unique identifier for the notification
   * @returns {Promise<TNotification | undefined>} The updated notification
   */
  markAsRead(workspaceSlug: string, notificationId: string): Promise<TNotification | undefined>;
  /**
   * Marks a notification as unread
   * @param {string} workspaceSlug - The unique identifier for the workspace
   * @param {string} notificationId - The unique identifier for the notification
   * @returns {Promise<TNotification | undefined>} The updated notification
   */
  markAsUnread(workspaceSlug: string, notificationId: string): Promise<TNotification | undefined>;
  /**
   * Archives a notification
   * @param {string} workspaceSlug - The unique identifier for the workspace
   * @param {string} notificationId - The unique identifier for the notification
   * @returns {Promise<TNotification | undefined>} The updated notification
   */
  archive(workspaceSlug: string, notificationId: string): Promise<TNotification | undefined>;
  /**
   * Unarchives a notification
   * @param {string} workspaceSlug - The unique identifier for the workspace
   * @param {string} notificationId - The unique identifier for the notification
   * @returns {Promise<TNotification | undefined>} The updated notification
   */
  unarchive(workspaceSlug: string, notificationId: string): Promise<TNotification | undefined>;
  /**
   * Marks all notifications as read based on filter criteria
   * @param {string} workspaceSlug - The unique identifier for the workspace
   * @param {TNotificationPaginatedInfoQueryParams} data - Filter criteria for notifications to mark as read
   * @returns {Promise<TNotification | undefined>} The result of the operation
   */
  markAllAsRead(workspaceSlug: string, data: TNotificationPaginatedInfoQueryParams): Promise<TNotification | undefined>;
}
//#endregion
//#region src/workspace/view.service.d.ts
declare class WorkspaceViewService extends APIService {
  /**
   * Creates an instance of WorkspaceViewService
   * @param {string} baseUrl - The base URL for API requests
   */
  constructor(BASE_URL?: string);
  create(workspaceSlug: string, data: Partial<IWorkspaceView>): Promise<IWorkspaceView>;
  update(workspaceSlug: string, viewId: string, data: Partial<IWorkspaceView>): Promise<IWorkspaceView>;
  destroy(workspaceSlug: string, viewId: string): Promise<any>;
  list(workspaceSlug: string): Promise<IWorkspaceView[]>;
  retrieve(workspaceSlug: string, viewId: string): Promise<IWorkspaceView>;
  getViewIssues(workspaceSlug: string, params: any, config?: {}): Promise<TIssuesResponse>;
}
//#endregion
//#region src/workspace/workspace.service.d.ts
/**
 * Service class for managing workspace operations
 * Handles CRUD operations and various workspace-related functionalities
 * @extends {APIService}
 */
declare class WorkspaceService extends APIService {
  /**
   * Creates an instance of WorkspaceService
   * @param {string} baseUrl - The base URL for API requests
   */
  constructor(BASE_URL?: string);
  /**
   * Retrieves all workspaces for the current user
   * @returns {Promise<IWorkspace[]>} Promise resolving to an array of workspaces
   * @throws {Error} If the API request fails
   */
  list(): Promise<IWorkspace[]>;
  /**
   * Retrieves details of a specific workspace
   * @param {string} workspaceSlug - The unique slug identifier for the workspace
   * @returns {Promise<IWorkspace>} Promise resolving to workspace details
   * @throws {Error} If the API request fails
   */
  retrieve(workspaceSlug: string): Promise<IWorkspace>;
  /**
   * Creates a new workspace
   * @param {Partial<IWorkspace>} data - Workspace data for creation
   * @returns {Promise<IWorkspace>} Promise resolving to the created workspace
   * @throws {Error} If the API request fails
   */
  create(data: Partial<IWorkspace>): Promise<IWorkspace>;
  /**
   * Updates an existing workspace
   * @param {string} workspaceSlug - The unique slug identifier for the workspace
   * @param {Partial<IWorkspace>} data - Updated workspace data
   * @returns {Promise<IWorkspace>} Promise resolving to the updated workspace
   * @throws {Error} If the API request fails
   */
  update(workspaceSlug: string, data: Partial<IWorkspace>): Promise<IWorkspace>;
  /**
   * Deletes a workspace
   * @param {string} workspaceSlug - The unique slug identifier for the workspace
   * @returns {Promise<any>} Promise resolving to the deletion response
   * @throws {Error} If the API request fails
   */
  destroy(workspaceSlug: string): Promise<any>;
  /**
   * Retrieves information about the user's last visited workspace
   * @returns {Promise<ILastActiveWorkspaceDetails>} Promise resolving to last active workspace details
   * @throws {Error} If the API request fails
   */
  lastVisited(): Promise<ILastActiveWorkspaceDetails>;
  /**
   * Checks if a workspace slug is available
   * @param {string} slug - The workspace slug to check
   * @returns {Promise<any>} Promise resolving to slug availability status
   * @throws {Error} If the API request fails
   */
  slugCheck(slug: string): Promise<any>;
  /**
   * Searches within a workspace
   * @param {string} workspaceSlug - The unique slug identifier for the workspace
   * @param {Object} params - Search parameters
   * @param {string} [params.project_id] - Optional project ID to scope the search
   * @param {string} params.search - Search query string
   * @param {boolean} params.workspace_search - Whether to search across the entire workspace
   * @returns {Promise<IWorkspaceSearchResults>} Promise resolving to search results
   * @throws {Error} If the API request fails
   */
  search(workspaceSlug: string, params: {
    project_id?: string;
    search: string;
    workspace_search: boolean;
  }): Promise<IWorkspaceSearchResults>;
}
//#endregion
//#region src/workspace/instance-workspace.service.d.ts
/**
 * Service class for managing instance workspaces
 * Handles CRUD operations on instance workspaces
 * @extends APIService
 */
declare class InstanceWorkspaceService extends APIService {
  /**
   * Constructor for InstanceWorkspaceService
   * @param BASE_URL - Base URL for API requests
   */
  constructor(BASE_URL?: string);
  /**
   * Retrieves a paginated list of workspaces for the current instance
   * @param {string} nextPageCursor - Optional cursor to retrieve the next page of results
   * @returns {Promise<TWorkspacePaginationInfo>} Promise resolving to a paginated list of workspaces
   * @throws {Error} If the API request fails
   */
  list(nextPageCursor?: string): Promise<TWorkspacePaginationInfo>;
  /**
   * Checks if a workspace slug is available
   * @param {string} slug - The workspace slug to check
   * @returns {Promise<any>} Promise resolving to slug availability status
   * @throws {Error} If the API request fails
   */
  slugCheck(slug: string): Promise<any>;
  /**
   * Creates a new workspace
   * @param {Partial<IWorkspace>} data - Workspace data for creation
   * @returns {Promise<IWorkspace>} Promise resolving to the created workspace
   * @throws {Error} If the API request fails
   */
  create(data: Partial<IWorkspace>): Promise<IWorkspace>;
}
//#endregion
//#region src/file/file-upload.service.d.ts
/**
 * Service class for handling file upload operations
 * Handles file uploads
 * @extends {APIService}
 */
declare class FileUploadService extends APIService {
  private cancelSource;
  constructor();
  /**
   * Uploads a file to the specified signed URL
   * @param {string} url - The URL to upload the file to
   * @param {FormData} data - The form data to upload
   * @returns {Promise<void>} Promise resolving to void
   * @throws {Error} If the request fails
   */
  uploadFile(url: string, data: FormData): Promise<void>;
  /**
   * Cancels the upload
   */
  cancelUpload(): void;
}
//#endregion
//#region src/file/file.service.d.ts
/**
 * Service class for managing file operations within plane applications.
 * Extends APIService to handle HTTP requests to the file-related endpoints.
 * @extends {APIService}
 */
declare class FileService extends APIService {
  /**
   * Creates an instance of FileService
   * @param {string} BASE_URL - The base URL for API requests
   */
  constructor(BASE_URL?: string);
  /**
   * Deletes a new asset
   * @param {string} assetPath - The asset path
   * @returns {Promise<void>} Promise resolving to void
   * @throws {Error} If the request fails
   */
  deleteNewAsset(assetPath: string): Promise<void>;
  /**
   * Deletes an old editor asset
   * @param {string} workspaceId - The workspace identifier
   * @param {string} src - The asset source
   * @returns {Promise<any>} Promise resolving to void
   * @throws {Error} If the request fails
   */
  deleteOldEditorAsset(workspaceId: string, src: string): Promise<any>;
  /**
   * Restores an old editor asset
   * @param {string} workspaceId - The workspace identifier
   * @param {string} src - The asset source
   * @returns {Promise<void>} Promise resolving to void
   * @throws {Error} If the request fails
   */
  restoreOldEditorAsset(workspaceId: string, src: string): Promise<void>;
  /**
   * Duplicates assets
   * @param {string} workspaceSlug - The workspace slug
   * @param {TDuplicateAssetData} data - The data for the duplicate assets
   * @returns {Promise<TDuplicateAssetResponse>} Promise resolving to a record of asset IDs
   * @throws {Error} If the request fails
   */
  duplicateAssets(workspaceSlug: string, data: TDuplicateAssetData): Promise<TDuplicateAssetResponse>;
}
//#endregion
//#region src/file/sites-file.service.d.ts
/**
 * Service class for managing file operations within plane sites application.
 * Extends FileService to manage file-related operations.
 * @extends {FileService}
 * @remarks This service is only available for plane sites
 */
declare class SitesFileService extends FileService {
  private cancelSource;
  fileUploadService: FileUploadService;
  /**
   * Creates an instance of SitesFileService
   * @param {string} BASE_URL - The base URL for API requests
   */
  constructor(BASE_URL?: string);
  /**
   * Updates the upload status of an asset
   * @param {string} anchor - The anchor identifier
   * @param {string} assetId - The asset identifier
   * @returns {Promise<void>} Promise resolving to void
   * @throws {Error} If the request fails
   */
  private updateAssetUploadStatus;
  /**
   * Updates the upload status of multiple assets
   * @param {string} anchor - The anchor identifier
   * @param {string} entityId - The entity identifier
   * @param {Object} data - The data payload
   * @returns {Promise<void>} Promise resolving to void
   * @throws {Error} If the request fails
   */
  updateBulkAssetsUploadStatus(anchor: string, entityId: string, data: {
    asset_ids: string[];
  }): Promise<void>;
  /**
   * Uploads a file to the specified anchor
   * @param {string} anchor - The anchor identifier
   * @param {TFileEntityInfo} data - The data payload
   * @param {File} file - The file to upload
   * @returns {Promise<TFileSignedURLResponse>} Promise resolving to the signed URL response
   * @throws {Error} If the request fails
   */
  uploadAsset(anchor: string, data: TFileEntityInfo, file: File): Promise<TFileSignedURLResponse>;
  /**
   * Restores a new asset
   * @param {string} workspaceSlug - The workspace slug
   * @param {string} src - The asset source
   * @returns {Promise<void>} Promise resolving to void
   * @throws {Error} If the request fails
   */
  restoreNewAsset(anchor: string, src: string): Promise<void>;
  /**
   * Cancels the upload
   */
  cancelUpload(): void;
}
//#endregion
//#region src/file/helper.d.ts
/**
 * @description from the provided signed URL response, generate a payload to be used to upload the file
 * @param {TFileSignedURLResponse} signedURLResponse
 * @param {File} file
 * @returns {FormData} file upload request payload
 */
declare const generateFileUploadPayload: (signedURLResponse: TFileSignedURLResponse, file: File) => FormData;
/**
 * @description returns the necessary file meta data to upload a file
 * @param {File} file
 * @returns {Promise<TFileMetaDataLite>} payload with file info
 */
declare const getFileMetaDataForUpload: (file: File) => Promise<TFileMetaDataLite>;
/**
 * @description this function returns the assetId from the asset source
 * @param {string} src
 * @returns {string} assetId
 */
declare const getAssetIdFromUrl: (src: string) => string;
//#endregion
//#region src/label/sites-label.service.d.ts
/**
 * Service class for managing labels within plane sites application.
 * Extends APIService to handle HTTP requests to the label-related endpoints.
 * @extends {APIService}
 * @remarks This service is only available for plane sites
 */
declare class SitesLabelService extends APIService {
  constructor(BASE_URL?: string);
  /**
   * Retrieves a list of labels for a specific anchor.
   * @param {string} anchor - The anchor identifier
   * @returns {Promise<IIssueLabel[]>} The list of labels
   * @throws {Error} If the API request fails
   */
  list(anchor: string): Promise<IIssueLabel[]>;
}
//#endregion
//#region src/state/sites-state.service.d.ts
/**
 * Service class for managing states within plane sites application.
 * Extends APIService to handle HTTP requests to the state-related endpoints.
 * @extends {APIService}
 * @remarks This service is only available for plane sites
 */
declare class SitesStateService extends APIService {
  constructor(BASE_URL?: string);
  /**
   * Retrieves a list of states for a specific anchor.
   * @param {string} anchor - The anchor identifier
   * @returns {Promise<IState[]>} The list of states
   * @throws {Error} If the API request fails
   */
  list(anchor: string): Promise<IState[]>;
}
//#endregion
//#region src/issue/sites-issue.service.d.ts
/**
 * Service class for managing issues within plane sites application
 * Extends the APIService class to handle HTTP requests to the issue-related endpoints
 * @extends {APIService}
 * @remarks This service is only available for plane sites
 */
declare class SitesIssueService extends APIService {
  constructor(BASE_URL?: string);
  /**
   * Retrieves a paginated list of issues for a specific anchor
   * @param {string} anchor - The anchor identifier
   * @param {any} params - Optional query parameters
   * @returns {Promise<TPublicIssuesResponse>} Promise resolving to a paginated list of issues
   * @throws {Error} If the API request fails
   */
  list(anchor: string, params: any): Promise<TPublicIssuesResponse>;
  /**
   * Retrieves details of a specific issue
   * @param {string} anchor - The anchor identifier
   * @param {string} issueID - The issue identifier
   * @returns {Promise<IPublicIssue>} Promise resolving to the issue details
   * @throws {Error} If the API request fails
   */
  retrieve(anchor: string, issueID: string): Promise<IPublicIssue>;
  /**
   * Retrieves the votes associated with a specific issue
   * @param {string} anchor - The anchor identifier
   * @param {string} issueID - The issue identifier
   * @returns {Promise<any>} Promise resolving to the votes
   * @throws {Error} If the API request fails
   */
  listVotes(anchor: string, issueID: string): Promise<any>;
  /**
   * Creates a new vote for a specific issue
   * @param {string} anchor - The anchor identifier
   * @param {string} issueID - The issue identifier
   * @param {any} data - The vote data
   * @returns {Promise<any>} Promise resolving to the created vote
   * @throws {Error} If the API request fails
   */
  addVote(anchor: string, issueID: string, data: any): Promise<any>;
  /**
   * Deletes a vote for a specific issue
   * @param {string} anchor - The anchor identifier
   * @param {string} issueID - The issue identifier
   * @returns {Promise<any>} Promise resolving to the deletion response
   * @throws {Error} If the API request fails
   */
  removeVote(anchor: string, issueID: string): Promise<any>;
  /**
   * Retrieves the reactions associated with a specific issue
   * @param {string} anchor - The anchor identifier
   * @param {string} issueID - The issue identifier
   * @returns {Promise<any>} Promise resolving to the reactions
   * @throws {Error} If the API request fails
   */
  listReactions(anchor: string, issueID: string): Promise<any>;
  /**
   * Creates a new reaction for a specific issue
   * @param {string} anchor - The anchor identifier
   * @param {string} issueID - The issue identifier
   * @param {any} data - The reaction data
   * @returns {Promise<any>} Promise resolving to the created reaction
   * @throws {Error} If the API request fails
   */
  addReaction(anchor: string, issueID: string, data: any): Promise<any>;
  /**
   * Deletes a reaction for a specific issue
   * @param {string} anchor - The anchor identifier
   * @param {string} issueID - The issue identifier
   * @param {string} reactionId - The reaction identifier
   * @returns {Promise<any>} Promise resolving to the deletion response
   * @throws {Error} If the API request fails
   */
  removeReaction(anchor: string, issueID: string, reactionId: string): Promise<any>;
  /**
   * Retrieves the comments associated with a specific issue
   * @param {string} anchor - The anchor identifier
   * @param {string} issueID - The issue identifier
   * @returns {Promise<any>} Promise resolving to the comments
   * @throws {Error} If the API request fails
   */
  listComments(anchor: string, issueID: string): Promise<any>;
  /**
   * Creates a new comment for a specific issue
   * @param {string} anchor - The anchor identifier
   * @param {string} issueID - The issue identifier
   * @param {any} data - The comment data
   * @returns {Promise<TIssuePublicComment>} Promise resolving to the created comment
   * @throws {Error} If the API request fails
   */
  addComment(anchor: string, issueID: string, data: any): Promise<TIssuePublicComment>;
  /**
   * Updates a comment for a specific issue
   * @param {string} anchor - The anchor identifier
   * @param {string} issueID - The issue identifier
   * @param {string} commentId - The comment identifier
   * @param {any} data - The updated comment data
   * @returns {Promise<any>} Promise resolving to the updated comment
   * @throws {Error} If the API request fails
   */
  updateComment(anchor: string, issueID: string, commentId: string, data: any): Promise<any>;
  /**
   * Deletes a comment for a specific issue
   * @param {string} anchor - The anchor identifier
   * @param {string} issueID - The issue identifier
   * @param {string} commentId - The comment identifier
   * @returns {Promise<any>} Promise resolving to the deletion response
   * @throws {Error} If the API request fails
   */
  removeComment(anchor: string, issueID: string, commentId: string): Promise<any>;
  /**
   * Creates a new reaction for a specific comment
   * @param {string} anchor - The anchor identifier
   * @param {string} commentId - The comment identifier
   * @param {any} data - The reaction data
   * @returns {Promise<any>} Promise resolving to the created reaction
   * @throws {Error} If the API request fails
   */
  addCommentReaction(anchor: string, commentId: string, data: {
    reaction: string;
  }): Promise<any>;
  /**
   * Deletes a reaction for a specific comment
   * @param {string} anchor - The anchor identifier
   * @param {string} commentId - The comment identifier
   * @param {string} reactionHex - The reaction identifier
   * @returns {Promise<any>} Promise resolving to the deletion response
   * @throws {Error} If the API request fails
   */
  removeCommentReaction(anchor: string, commentId: string, reactionHex: string): Promise<any>;
}
//#endregion
export { AIService, APITokenService, AuthService, CycleAnalyticsService, CycleArchiveService, CycleOperationsService, CycleService, DashboardService, FileService, FileUploadService, InstanceService, InstanceWorkspaceService, IntakeIssueService, IntakeService, ModuleLinkService, ModuleOperationService, ModuleService, ProjectViewService, SitesAuthService, SitesCycleService, SitesFileService, SitesIssueService, SitesLabelService, SitesMemberService, SitesModuleService, SitesProjectPublishService, SitesStateService, TTaskPayload, UserFavoriteService, UserService, WebhookService, WorkspaceInvitationService, WorkspaceMemberService, WorkspaceNotificationService, WorkspaceService, WorkspaceViewService, generateFileUploadPayload, getAssetIdFromUrl, getFileMetaDataForUpload };
//# sourceMappingURL=index.d.ts.map