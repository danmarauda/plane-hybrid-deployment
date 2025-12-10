import { API_BASE_URL } from "@plane/constants";
import axios from "axios";
import { fileTypeFromBuffer } from "file-type";

//#region src/api.service.ts
/**
* Abstract base class for making HTTP requests using axios
* @abstract
*/
var APIService = class {
	baseURL;
	axiosInstance;
	/**
	* Creates an instance of APIService
	* @param {string} baseURL - The base URL for all HTTP requests
	*/
	constructor(baseURL) {
		this.baseURL = baseURL;
		this.axiosInstance = axios.create({
			baseURL,
			withCredentials: true
		});
	}
	/**
	* Makes a GET request to the specified URL
	* @param {string} url - The endpoint URL
	* @param {object} [params={}] - URL parameters
	* @param {AxiosRequestConfig} [config={}] - Additional axios configuration
	* @returns {Promise} Axios response promise
	*/
	get(url, params = {}, config = {}) {
		return this.axiosInstance.get(url, {
			...params,
			...config
		});
	}
	/**
	* Makes a POST request to the specified URL
	* @param {string} url - The endpoint URL
	* @param {object} [data={}] - Request body data
	* @param {AxiosRequestConfig} [config={}] - Additional axios configuration
	* @returns {Promise} Axios response promise
	*/
	post(url, data = {}, config = {}) {
		return this.axiosInstance.post(url, data, config);
	}
	/**
	* Makes a PUT request to the specified URL
	* @param {string} url - The endpoint URL
	* @param {object} [data={}] - Request body data
	* @param {AxiosRequestConfig} [config={}] - Additional axios configuration
	* @returns {Promise} Axios response promise
	*/
	put(url, data = {}, config = {}) {
		return this.axiosInstance.put(url, data, config);
	}
	/**
	* Makes a PATCH request to the specified URL
	* @param {string} url - The endpoint URL
	* @param {object} [data={}] - Request body data
	* @param {AxiosRequestConfig} [config={}] - Additional axios configuration
	* @returns {Promise} Axios response promise
	*/
	patch(url, data = {}, config = {}) {
		return this.axiosInstance.patch(url, data, config);
	}
	/**
	* Makes a DELETE request to the specified URL
	* @param {string} url - The endpoint URL
	* @param {any} [data] - Request body data
	* @param {AxiosRequestConfig} [config={}] - Additional axios configuration
	* @returns {Promise} Axios response promise
	*/
	delete(url, data, config = {}) {
		return this.axiosInstance.delete(url, {
			data,
			...config
		});
	}
	/**
	* Makes a custom request with the provided configuration
	* @param {object} [config={}] - Axios request configuration
	* @returns {Promise} Axios response promise
	*/
	request(config = {}) {
		return this.axiosInstance(config);
	}
};

//#endregion
//#region src/ai/ai.service.ts
/**
* Service class for handling AI-related API operations
* Extends the base APIService class to interact with AI endpoints
* @extends {APIService}
*/
var AIService = class extends APIService {
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	/**
	* Creates a GPT-based task for a specific workspace
	* @param {string} workspaceSlug - The unique identifier for the workspace
	* @param {Object} data - The data payload for the GPT task
	* @param {string} data.prompt - The prompt text for the GPT model
	* @param {string} data.task - The type of task to be performed
	* @returns {Promise<any>} The response data from the GPT task
	* @throws {Error} Throws the response error if the request fails
	*/
	async prompt(workspaceSlug, data) {
		return this.post(`/api/workspaces/${workspaceSlug}/ai-assistant/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	/**
	* Performs an editor-specific AI task for text processing
	* @param {string} workspaceSlug - The unique identifier for the workspace
	* @param {TTaskPayload} data - The task payload containing text and processing parameters
	* @returns {Promise<{response: string}>} The processed text response
	* @throws {Error} Throws the response data if the request fails
	*/
	async rephraseGrammar(workspaceSlug, data) {
		return this.post(`/api/workspaces/${workspaceSlug}/rephrase-grammar/`, data).then((res) => res?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/developer/api-token.service.ts
var APITokenService = class extends APIService {
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	/**
	* Retrieves all API tokens for a specific workspace
	* @returns {Promise<IApiToken[]>} Array of API tokens associated with the workspace
	* @throws {Error} Throws response data if the request fails
	*/
	async list() {
		return this.get(`/api/users/api-tokens/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Retrieves a specific API token by its ID
	* @param {string} tokenId - The unique identifier of the API token
	* @returns {Promise<IApiToken>} The requested API token's details
	* @throws {Error} Throws response data if the request fails
	*/
	async retrieve(tokenId) {
		return this.get(`/api/users/api-tokens/${tokenId}`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Creates a new API token for a workspace
	* @param {Partial<IApiToken>} data - The data for creating the new API token
	* @returns {Promise<IApiToken>} The newly created API token
	* @throws {Error} Throws response data if the request fails
	*/
	async create(data) {
		return this.post(`/api/users/api-tokens/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Deletes a specific API token from the workspace
	* @param {string} tokenId - The unique identifier of the API token to delete
	* @returns {Promise<IApiToken>} The deleted API token's details
	* @throws {Error} Throws response data if the request fails
	*/
	async destroy(tokenId) {
		return this.delete(`/api/users/api-tokens/${tokenId}`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/developer/webhook.service.ts
/**
* Service class for managing webhooks
* Handles CRUD operations for webhooks and secret key management
* @extends {APIService}
*/
var WebhookService = class extends APIService {
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	/**
	* Retrieves all webhooks for a workspace
	* @param {string} workspaceSlug - The unique slug identifier for the workspace
	* @returns {Promise<IWebhook[]>} Promise resolving to array of webhooks
	* @throws {Error} If the API request fails
	*/
	async list(workspaceSlug) {
		return this.get(`/api/workspaces/${workspaceSlug}/webhooks/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Retrieves details of a specific webhook
	* @param {string} workspaceSlug - The unique slug identifier for the workspace
	* @param {string} webhookId - The unique identifier for the webhook
	* @returns {Promise<IWebhook>} Promise resolving to webhook details
	* @throws {Error} If the API request fails
	*/
	async retrieve(workspaceSlug, webhookId) {
		return this.get(`/api/workspaces/${workspaceSlug}/webhooks/${webhookId}/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Creates a new webhook in the workspace
	* @param {string} workspaceSlug - The unique slug identifier for the workspace
	* @param {Object} [data={}] - Webhook configuration data
	* @returns {Promise<IWebhook>} Promise resolving to the created webhook
	* @throws {Error} If the API request fails
	*/
	async create(workspaceSlug, data = {}) {
		return this.post(`/api/workspaces/${workspaceSlug}/webhooks/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Updates an existing webhook
	* @param {string} workspaceSlug - The unique slug identifier for the workspace
	* @param {string} webhookId - The unique identifier for the webhook
	* @param {Object} [data={}] - Updated webhook configuration data
	* @returns {Promise<IWebhook>} Promise resolving to the updated webhook
	* @throws {Error} If the API request fails
	*/
	async update(workspaceSlug, webhookId, data = {}) {
		return this.patch(`/api/workspaces/${workspaceSlug}/webhooks/${webhookId}/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Deletes a webhook from the workspace
	* @param {string} workspaceSlug - The unique slug identifier for the workspace
	* @param {string} webhookId - The unique identifier for the webhook
	* @returns {Promise<void>} Promise resolving when webhook is deleted
	* @throws {Error} If the API request fails
	*/
	async destroy(workspaceSlug, webhookId) {
		return this.delete(`/api/workspaces/${workspaceSlug}/webhooks/${webhookId}/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Regenerates the secret key for a webhook
	* @param {string} workspaceSlug - The unique slug identifier for the workspace
	* @param {string} webhookId - The unique identifier for the webhook
	* @returns {Promise<IWebhook>} Promise resolving to the webhook with new secret key
	* @throws {Error} If the API request fails
	*/
	async regenerateSecretKey(workspaceSlug, webhookId) {
		return this.post(`/api/workspaces/${workspaceSlug}/webhooks/${webhookId}/regenerate/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/auth/auth.service.ts
/**
* Service class for handling authentication-related operations
* Provides methods for user authentication, password management, and session handling
* @extends {APIService}
*/
var AuthService = class extends APIService {
	/**
	* Creates an instance of AuthService
	* Initializes with the base API URL
	*/
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	/**
	* Requests a CSRF token for form submission security
	* @returns {Promise<ICsrfTokenData>} Object containing the CSRF token
	* @throws {Error} Throws the complete error object if the request fails
	* @remarks This method uses the validateStatus: null option to bypass interceptors for unauthorized errors.
	*/
	async requestCSRFToken() {
		return this.get("/auth/get-csrf-token/", { validateStatus: null }).then((response) => response.data).catch((error) => {
			throw error;
		});
	}
	/**
	* Checks if an email exists in the system
	* @param {IEmailCheckData} data - Email data to verify
	* @returns {Promise<IEmailCheckResponse>} Response indicating email status
	* @throws {Error} Throws response data if the request fails
	*/
	async emailCheck(data) {
		return this.post("/auth/email-check/", data, { headers: {} }).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Sends a password reset link to the specified email address
	* @param {{ email: string }} data - Object containing the email address
	* @returns {Promise<any>} Response from the password reset request
	* @throws {Error} Throws response object if the request fails
	*/
	async sendResetPasswordLink(data) {
		return this.post(`/auth/forgot-password/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	/**
	* Sets a new password using a reset token
	* @param {string} token - CSRF token for form submission security
	* @param {{ password: string }} data - Object containing the new password
	* @returns {Promise<any>} Response from the password update request
	* @throws {Error} Throws response data if the request fails
	*/
	async setPassword(token, data) {
		return this.post(`/auth/set-password/`, data, { headers: { "X-CSRFTOKEN": token } }).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Generates a unique code for magic link authentication
	* @param {{ email: string }} data - Object containing the email address
	* @returns {Promise<any>} Response containing the generated unique code
	* @throws {Error} Throws response data if the request fails
	*/
	async generateUniqueCode(data) {
		return this.post("/auth/magic-generate/", data, { headers: {} }).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Performs user sign out by submitting a form with CSRF token
	* Creates and submits a form dynamically to handle the sign-out process
	* @param {string} baseUrl - Base URL for the sign-out endpoint
	* @returns {Promise<any>} Resolves when sign-out is complete
	* @throws {Error} Throws error if CSRF token is not found
	*/
	async signOut(baseUrl) {
		await this.requestCSRFToken().then((data) => {
			const csrfToken = data?.csrf_token;
			if (!csrfToken) throw Error("CSRF token not found");
			const form = document.createElement("form");
			const element1 = document.createElement("input");
			form.method = "POST";
			form.action = `${baseUrl}/auth/sign-out/`;
			element1.value = csrfToken;
			element1.name = "csrfmiddlewaretoken";
			element1.type = "hidden";
			form.appendChild(element1);
			document.body.appendChild(form);
			form.submit();
		});
	}
};

//#endregion
//#region src/auth/sites-auth.service.ts
/**
* Service class for handling authentication-related operations for Plane space application
* Provides methods for user authentication, password management, and session handling
* @extends {APIService}
* @remarks This service is only available for plane sites
*/
var SitesAuthService = class extends APIService {
	/**
	* Creates an instance of SitesAuthService
	* Initializes with the base API URL
	*/
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	/**
	* Checks if an email exists in the system
	* @param {IEmailCheckData} data - Email data to verify
	* @returns {Promise<IEmailCheckResponse>} Response indicating email status
	* @throws {Error} Throws response data if the request fails
	*/
	async emailCheck(data) {
		return this.post("/auth/spaces/email-check/", data, { headers: {} }).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Generates a unique code for magic link authentication
	* @param {{ email: string }} data - Object containing the email address
	* @returns {Promise<any>} Response containing the generated unique code
	* @throws {Error} Throws response data if the request fails
	*/
	async generateUniqueCode(data) {
		return this.post("/auth/spaces/magic-generate/", data, { headers: {} }).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/cycle/cycle-analytics.service.ts
/**
* Service class for managing cycles within a workspace and project context.
* Extends APIService to handle HTTP requests to the cycle-related endpoints.
* @extends {APIService}
*/
var CycleAnalyticsService = class extends APIService {
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	/**
	* Retrieves analytics for active cycles in a workspace.
	* @param {string} workspaceSlug - The workspace identifier
	* @param {string} projectId - The project identifier
	* @param {string} cycleId - The cycle identifier
	* @param {string} [analytic_type="points"] - The type of analytics to retrieve
	* @returns {Promise<TCycleDistribution | TCycleEstimateDistribution>} The cycle analytics data
	* @throws {Error} If the request fails
	*/
	async workspaceActiveCyclesAnalytics(workspaceSlug, projectId, cycleId, analytic_type = "points") {
		return this.get(`/api/workspaces/${workspaceSlug}/projects/${projectId}/cycles/${cycleId}/analytics?type=${analytic_type}`).then((res) => res?.data).catch((err) => {
			throw err?.response?.data;
		});
	}
	/**
	* Retrieves progress data for active cycles.
	* @param {string} workspaceSlug - The workspace identifier
	* @param {string} projectId - The project identifier
	* @param {string} cycleId - The cycle identifier
	* @returns {Promise<TProgressSnapshot>} The cycle progress data
	* @throws {Error} If the request fails
	*/
	async workspaceActiveCyclesProgress(workspaceSlug, projectId, cycleId) {
		return this.get(`/api/workspaces/${workspaceSlug}/projects/${projectId}/cycles/${cycleId}/progress/`).then((res) => res?.data).catch((err) => {
			throw err?.response?.data;
		});
	}
	/**
	* Retrieves advanced progress data for active cycles (Pro feature).
	* @param {string} workspaceSlug - The workspace identifier
	* @param {string} projectId - The project identifier
	* @param {string} cycleId - The cycle identifier
	* @returns {Promise<TProgressSnapshot>} The detailed cycle progress data
	* @throws {Error} If the request fails
	*/
	async workspaceActiveCyclesProgressPro(workspaceSlug, projectId, cycleId) {
		return this.get(`/api/workspaces/${workspaceSlug}/projects/${projectId}/cycles/${cycleId}/cycle-progress/`).then((res) => res?.data).catch((err) => {
			throw err?.response?.data;
		});
	}
};

//#endregion
//#region src/cycle/cycle-archive.service.ts
/**
* Service class for managing archived cycles in a project
* Provides methods for retrieving, archiving, and restoring project cycles
* @extends {APIService}
*/
var CycleArchiveService = class extends APIService {
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	/**
	* Retrieves all archived cycles for a specific project
	* @param {string} workspaceSlug - The unique identifier for the workspace
	* @param {string} projectId - The unique identifier for the project
	* @returns {Promise<ICycle[]>} Array of archived cycles
	* @throws {Error} Throws response data if the request fails
	*/
	async list(workspaceSlug, projectId) {
		return this.get(`/api/workspaces/${workspaceSlug}/projects/${projectId}/archived-cycles/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Retrieves details of a specific archived cycle
	* @param {string} workspaceSlug - The unique identifier for the workspace
	* @param {string} projectId - The unique identifier for the project
	* @param {string} cycleId - The unique identifier for the cycle
	* @returns {Promise<ICycle>} Details of the archived cycle
	* @throws {Error} Throws response data if the request fails
	*/
	async retrieve(workspaceSlug, projectId, cycleId) {
		return this.get(`/api/workspaces/${workspaceSlug}/projects/${projectId}/archived-cycles/${cycleId}/`).then((res) => res?.data).catch((err) => {
			throw err?.response?.data;
		});
	}
	/**
	* Archives a specific cycle in a project
	* @param {string} workspaceSlug - The unique identifier for the workspace
	* @param {string} projectId - The unique identifier for the project
	* @param {string} cycleId - The unique identifier for the cycle to archive
	* @returns {Promise<{archived_at: string}>} Object containing the archive timestamp
	* @throws {Error} Throws response data if the request fails
	*/
	async archive(workspaceSlug, projectId, cycleId) {
		return this.post(`/api/workspaces/${workspaceSlug}/projects/${projectId}/cycles/${cycleId}/archive/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Restores a previously archived cycle
	* @param {string} workspaceSlug - The unique identifier for the workspace
	* @param {string} projectId - The unique identifier for the project
	* @param {string} cycleId - The unique identifier for the cycle to restore
	* @returns {Promise<void>} Resolves when the cycle is successfully restored
	* @throws {Error} Throws response data if the request fails
	*/
	async restore(workspaceSlug, projectId, cycleId) {
		return this.delete(`/api/workspaces/${workspaceSlug}/projects/${projectId}/cycles/${cycleId}/archive/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/cycle/cycle-operations.service.ts
var CycleOperationsService = class extends APIService {
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	/**
	* Adds a cycle to user favorites.
	* @param {string} workspaceSlug - The workspace identifier
	* @param {string} projectId - The project identifier
	* @param {{cycle: string}} data - The favorite cycle data
	* @returns {Promise<any>} The response data
	* @throws {Error} If the request fails
	*/
	async addToFavorites(workspaceSlug, projectId, data) {
		return this.post(`/api/workspaces/${workspaceSlug}/projects/${projectId}/user-favorite-cycles/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Removes a cycle from user favorites.
	* @param {string} workspaceSlug - The workspace identifier
	* @param {string} projectId - The project identifier
	* @param {string} cycleId - The cycle identifier
	* @returns {Promise<any>} The removal response
	* @throws {Error} If the request fails
	*/
	async removeFromFavorites(workspaceSlug, projectId, cycleId) {
		return this.delete(`/api/workspaces/${workspaceSlug}/projects/${projectId}/user-favorite-cycles/${cycleId}/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Transfers issues between cycles.
	* @param {string} workspaceSlug - The workspace identifier
	* @param {string} projectId - The project identifier
	* @param {string} cycleId - The source cycle identifier
	* @param {{new_cycle_id: string}} data - The target cycle data
	* @returns {Promise<any>} The transfer response
	* @throws {Error} If the request fails
	*/
	async transferIssues(workspaceSlug, projectId, cycleId, data) {
		return this.post(`/api/workspaces/${workspaceSlug}/projects/${projectId}/cycles/${cycleId}/transfer-issues/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/cycle/cycle.service.ts
/**
* Service class for managing cycles within a workspace and project context.
* Extends APIService to handle HTTP requests to the cycle-related endpoints.
* @extends {APIService}
*/
var CycleService = class extends APIService {
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	/**
	* Retrieves paginated list of active cycles in a workspace.
	* @param {string} workspaceSlug - The workspace identifier
	* @param {string} cursor - The pagination cursor
	* @param {number} per_page - Number of items per page
	* @returns {Promise<IWorkspaceActiveCyclesResponse>} Paginated active cycles data
	* @throws {Error} If the request fails
	*/
	async workspaceActiveCycles(workspaceSlug, cursor, per_page) {
		return this.get(`/api/workspaces/${workspaceSlug}/active-cycles/`, { params: {
			per_page,
			cursor
		} }).then((res) => res?.data).catch((err) => {
			throw err?.response?.data;
		});
	}
	/**
	* Gets all cycles in a workspace.
	* @param {string} workspaceSlug - The workspace identifier
	* @returns {Promise<ICycle[]>} Array of cycle objects
	* @throws {Error} If the request fails
	*/
	async getWorkspaceCycles(workspaceSlug) {
		return this.get(`/api/workspaces/${workspaceSlug}/cycles/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Creates a new cycle in a project.
	* @param {string} workspaceSlug - The workspace identifier
	* @param {string} projectId - The project identifier
	* @param {any} data - The cycle creation data
	* @returns {Promise<ICycle>} The created cycle object
	* @throws {Error} If the request fails
	*/
	async create(workspaceSlug, projectId, data) {
		return this.post(`/api/workspaces/${workspaceSlug}/projects/${projectId}/cycles/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Retrieves cycles with optional filtering parameters.
	* @param {string} workspaceSlug - The workspace identifier
	* @param {string} projectId - The project identifier
	* @param {"current"} [cycleType] - Optional filter for cycle type
	* @returns {Promise<ICycle[]>} Array of filtered cycle objects
	* @throws {Error} If the request fails
	*/
	async getWithParams(workspaceSlug, projectId, cycleType) {
		return this.get(`/api/workspaces/${workspaceSlug}/projects/${projectId}/cycles/`, { params: { cycle_view: cycleType } }).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Retrieves detailed information for a specific cycle.
	* @param {string} workspaceSlug - The workspace identifier
	* @param {string} projectId - The project identifier
	* @param {string} cycleId - The cycle identifier
	* @returns {Promise<ICycle>} The cycle details
	* @throws {Error} If the request fails
	*/
	async retrieve(workspaceSlug, projectId, cycleId) {
		return this.get(`/api/workspaces/${workspaceSlug}/projects/${projectId}/cycles/${cycleId}/`).then((res) => res?.data).catch((err) => {
			throw err?.response?.data;
		});
	}
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
	async getCycleIssues(workspaceSlug, projectId, cycleId, queries, config = {}) {
		return this.get(`/api/workspaces/${workspaceSlug}/projects/${projectId}/cycles/${cycleId}/cycle-issues/`, { params: queries }, config).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Updates a cycle with partial data.
	* @param {string} workspaceSlug - The workspace identifier
	* @param {string} projectId - The project identifier
	* @param {string} cycleId - The cycle identifier
	* @param {Partial<ICycle>} data - The partial cycle data to update
	* @returns {Promise<any>} The update response
	* @throws {Error} If the request fails
	*/
	async update(workspaceSlug, projectId, cycleId, data) {
		return this.patch(`/api/workspaces/${workspaceSlug}/projects/${projectId}/cycles/${cycleId}/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Deletes a specific cycle.
	* @param {string} workspaceSlug - The workspace identifier
	* @param {string} projectId - The project identifier
	* @param {string} cycleId - The cycle identifier
	* @returns {Promise<any>} The deletion response
	* @throws {Error} If the request fails
	*/
	async destroy(workspaceSlug, projectId, cycleId) {
		return this.delete(`/api/workspaces/${workspaceSlug}/projects/${projectId}/cycles/${cycleId}/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Validates cycle dates.
	* @param {string} workspaceSlug - The workspace identifier
	* @param {string} projectId - The project identifier
	* @param {CycleDateCheckData} data - The date check data
	* @returns {Promise<any>} The validation response
	* @throws {Error} If the request fails
	*/
	async validateDates(workspaceSlug, projectId, data) {
		return this.post(`/api/workspaces/${workspaceSlug}/projects/${projectId}/cycles/date-check/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/cycle/sites-cycle.service.ts
/**
* Service class for managing cycles within plane sites application.
* Extends APIService to handle HTTP requests to the cycle-related endpoints.
* @extends {APIService}
* @remarks This service is only available for plane sites
*/
var SitesCycleService = class extends APIService {
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	/**
	* Retrieves list of cycles for a specific anchor.
	* @param anchor - The anchor identifier for the published entity
	* @returns {Promise<TPublicCycle[]>} The list of cycles
	* @throws {Error} If the request fails
	*/
	async list(anchor) {
		return this.get(`/api/public/anchor/${anchor}/cycles/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/dashboard/dashboard.service.ts
var DashboardService = class extends APIService {
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	/**
	* Retrieves home dashboard widgets for a specific workspace
	* @param {string} workspaceSlug - The unique identifier for the workspace
	* @returns {Promise<THomeDashboardResponse>} Promise resolving to dashboard widget data
	* @throws {Error} If the API request fails
	*/
	async getHomeWidgets(workspaceSlug) {
		return this.get(`/api/workspaces/${workspaceSlug}/dashboard/`, { params: { dashboard_type: "home" } }).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Fetches statistics for a specific dashboard widget
	* @param {string} workspaceSlug - The unique identifier for the workspace
	* @param {string} dashboardId - The unique identifier for the dashboard
	* @param {TWidgetStatsRequestParams} params - Parameters for filtering widget statistics
	* @returns {Promise<TWidgetStatsResponse>} Promise resolving to widget statistics data
	* @throws {Error} If the API request fails
	*/
	async getWidgetStats(workspaceSlug, dashboardId, params) {
		return this.get(`/api/workspaces/${workspaceSlug}/dashboard/${dashboardId}/`, { params }).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Retrieves detailed information about a specific dashboard
	* @param {string} dashboardId - The unique identifier for the dashboard
	* @returns {Promise<TWidgetStatsResponse>} Promise resolving to dashboard details
	* @throws {Error} If the API request fails
	*/
	async retrieve(dashboardId) {
		return this.get(`/api/dashboard/${dashboardId}/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Updates a specific widget within a dashboard
	* @param {string} dashboardId - The unique identifier for the dashboard
	* @param {string} widgetId - The unique identifier for the widget
	* @param {Partial<TWidget>} data - Partial widget data to update
	* @returns {Promise<TWidget>} Promise resolving to the updated widget data
	* @throws {Error} If the API request fails
	*/
	async updateWidget(dashboardId, widgetId, data) {
		return this.patch(`/api/dashboard/${dashboardId}/widgets/${widgetId}/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/instance/instance.service.ts
/**
* Service class for managing instance-related operations
* Handles retrieval of instance information and changelog
* @extends {APIService}
*/
var InstanceService = class extends APIService {
	/**
	* Creates an instance of InstanceService
	* Initializes the service with the base API URL
	*/
	constructor() {
		super(API_BASE_URL);
	}
	/**
	* Retrieves information about the current instance
	* @returns {Promise<IInstanceInfo>} Promise resolving to instance information
	* @throws {Error} If the API request fails
	* @remarks This method uses the validateStatus: null option to bypass interceptors for unauthorized errors.
	*/
	async info() {
		return this.get("/api/instances/", { validateStatus: null }).then((response) => response.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Fetches the changelog for the current instance
	* @returns {Promise<TPage>} Promise resolving to the changelog page data
	* @throws {Error} If the API request fails
	*/
	async changelog() {
		return this.get("/api/instances/changelog/").then((response) => response.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Fetches the list of instance admins
	* @returns {Promise<IInstanceAdmin[]>} Promise resolving to an array of instance admins
	* @throws {Error} If the API request fails
	* @remarks This method uses the validateStatus: null option to bypass interceptors for unauthorized errors.
	*/
	async admins() {
		return this.get("/api/instances/admins/", { validateStatus: null }).then((response) => response.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Updates the instance information
	* @param {Partial<IInstance>} data Data to update the instance with
	* @returns {Promise<IInstance>} Promise resolving to the updated instance information
	* @throws {Error} If the API request fails
	*/
	async update(data) {
		return this.patch("/api/instances/", data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Fetches the list of instance configurations
	* @returns {Promise<IInstanceConfiguration[]>} Promise resolving to an array of instance configurations
	* @throws {Error} If the API request fails
	*/
	async configurations() {
		return this.get("/api/instances/configurations/").then((response) => response.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Updates the instance configurations
	* @param {Partial<IFormattedInstanceConfiguration>} data Data to update the instance configurations with
	* @returns {Promise<IInstanceConfiguration[]>} The updated instance configurations
	* @throws {Error} If the API request fails
	*/
	async updateConfigurations(data) {
		return this.patch("/api/instances/configurations/", data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Sends a test email to the specified receiver to test SMTP configuration
	* @param {string} receiverEmail Email address to send the test email to
	* @returns {Promise<void>} Promise resolving to void
	* @throws {Error} If the API request fails
	*/
	async sendTestEmail(receiverEmail) {
		return this.post("/api/instances/email-credentials-check/", { receiver_email: receiverEmail }).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Disables the email configuration
	* @returns {Promise<void>} Promise resolving to void
	* @throws {Error} If the API request fails
	*/
	async disableEmail() {
		return this.delete("/api/instances/configurations/disable-email-feature/").then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/intake/intake.service.ts
var IntakeService = class extends APIService {
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
};

//#endregion
//#region src/intake/issue.service.ts
var IntakeIssueService = class extends APIService {
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	async list(workspaceSlug, projectId, params = {}) {
		return this.get(`/api/workspaces/${workspaceSlug}/projects/${projectId}/inbox-issues/`, { params }).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/module/link.service.ts
/**
* Service class for handling module link related operations.
* Extends the base APIService class to interact with module link endpoints.
*/
var ModuleLinkService = class extends APIService {
	/**
	* Creates an instance of ModuleLinkService.
	* @param {string} baseURL - The base URL for the API endpoints
	*/
	constructor(baseURL) {
		super(baseURL);
	}
	/**
	* Creates a new module link.
	* @param {string} workspaceSlug - The unique identifier for the workspace
	* @param {string} projectId - The unique identifier for the project
	* @param {string} moduleId - The unique identifier for the module
	* @param {Partial<ModuleLink>} data - The module link data to be created
	* @returns {Promise<ILinkDetails>} The created module link details
	* @throws {Error} When the API request fails
	*/
	async create(workspaceSlug, projectId, moduleId, data) {
		return this.post(`/api/workspaces/${workspaceSlug}/projects/${projectId}/modules/${moduleId}/module-links/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
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
	async update(workspaceSlug, projectId, moduleId, linkId, data) {
		return this.patch(`/api/workspaces/${workspaceSlug}/projects/${projectId}/modules/${moduleId}/module-links/${linkId}/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	/**
	* Deletes a module link.
	* @param {string} workspaceSlug - The unique identifier for the workspace
	* @param {string} projectId - The unique identifier for the project
	* @param {string} moduleId - The unique identifier for the module
	* @param {string} linkId - The unique identifier for the link to delete
	* @returns {Promise<any>} Response data from the server
	* @throws {Error} When the API request fails
	*/
	async destroy(workspaceSlug, projectId, moduleId, linkId) {
		return this.delete(`/api/workspaces/${workspaceSlug}/projects/${projectId}/modules/${moduleId}/module-links/${linkId}/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/module/module.service.ts
var ModuleService = class extends APIService {
	constructor(baseURL) {
		super(baseURL);
	}
	async workspaceModulesList(workspaceSlug) {
		return this.get(`/api/workspaces/${workspaceSlug}/modules/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	async projectModulesList(workspaceSlug, projectId) {
		return this.get(`/api/workspaces/${workspaceSlug}/projects/${projectId}/modules/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	async create(workspaceSlug, projectId, data) {
		return this.post(`/api/workspaces/${workspaceSlug}/projects/${projectId}/modules/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	async retrieve(workspaceSlug, projectId, moduleId) {
		return this.get(`/api/workspaces/${workspaceSlug}/projects/${projectId}/modules/${moduleId}/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	async update(workspaceSlug, projectId, moduleId, data) {
		return this.patch(`/api/workspaces/${workspaceSlug}/projects/${projectId}/modules/${moduleId}/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	async destroy(workspaceSlug, projectId, moduleId) {
		return this.delete(`/api/workspaces/${workspaceSlug}/projects/${projectId}/modules/${moduleId}/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	async getModuleIssues(workspaceSlug, projectId, moduleId, queries, config = {}) {
		return this.get(`/api/workspaces/${workspaceSlug}/projects/${projectId}/modules/${moduleId}/issues/`, { params: queries }, config).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	async addIssuesToModule(workspaceSlug, projectId, moduleId, data) {
		return this.post(`/api/workspaces/${workspaceSlug}/projects/${projectId}/modules/${moduleId}/issues/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	async addModulesToIssue(workspaceSlug, projectId, issueId, data) {
		return this.post(`/api/workspaces/${workspaceSlug}/projects/${projectId}/issues/${issueId}/modules/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	async removeIssuesFromModuleBulk(workspaceSlug, projectId, moduleId, issueIds) {
		const promiseDataUrls = [];
		issueIds.forEach((issueId) => {
			promiseDataUrls.push(this.delete(`/api/workspaces/${workspaceSlug}/projects/${projectId}/modules/${moduleId}/issues/${issueId}/`));
		});
		await Promise.all(promiseDataUrls).then((response) => response).catch((error) => {
			throw error?.response?.data;
		});
	}
	async removeModulesFromIssueBulk(workspaceSlug, projectId, issueId, moduleIds) {
		const promiseDataUrls = [];
		moduleIds.forEach((moduleId) => {
			promiseDataUrls.push(this.delete(`/api/workspaces/${workspaceSlug}/projects/${projectId}/modules/${moduleId}/issues/${issueId}/`));
		});
		await Promise.all(promiseDataUrls).then((response) => response).catch((error) => {
			throw error?.response?.data;
		});
	}
	async createModuleLink(workspaceSlug, projectId, moduleId, data) {
		return this.post(`/api/workspaces/${workspaceSlug}/projects/${projectId}/modules/${moduleId}/module-links/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	async updateModuleLink(workspaceSlug, projectId, moduleId, linkId, data) {
		return this.patch(`/api/workspaces/${workspaceSlug}/projects/${projectId}/modules/${moduleId}/module-links/${linkId}/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	async deleteModuleLink(workspaceSlug, projectId, moduleId, linkId) {
		return this.delete(`/api/workspaces/${workspaceSlug}/projects/${projectId}/modules/${moduleId}/module-links/${linkId}/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	async addModuleToFavorites(workspaceSlug, projectId, data) {
		return this.post(`/api/workspaces/${workspaceSlug}/projects/${projectId}/user-favorite-modules/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	async removeModuleFromFavorites(workspaceSlug, projectId, moduleId) {
		return this.delete(`/api/workspaces/${workspaceSlug}/projects/${projectId}/user-favorite-modules/${moduleId}/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/module/operations.service.ts
var ModuleOperationService = class extends APIService {
	constructor(baseURL) {
		super(baseURL);
	}
	/**
	* Add issues to a module
	* @param {string} workspaceSlug - The slug of the workspace
	* @param {string} projectId - The ID of the project
	* @param {string} moduleId - The ID of the module
	* @param {object} data - The data to be sent in the request body
	* @param {string[]} data.issues - The IDs of the issues to be added
	* @returns {Promise<void>}
	*/
	async addIssuesToModule(workspaceSlug, projectId, moduleId, data) {
		return this.post(`/api/workspaces/${workspaceSlug}/projects/${projectId}/modules/${moduleId}/issues/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
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
	async addModulesToIssue(workspaceSlug, projectId, issueId, data) {
		return this.post(`/api/workspaces/${workspaceSlug}/projects/${projectId}/issues/${issueId}/modules/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Remove issues from a module
	* @param {string} workspaceSlug - The slug of the workspace
	* @param {string} projectId - The ID of the project
	* @param {string} moduleId - The ID of the module
	* @param {string[]} issueIds - The IDs of the issues to be removed
	* @returns {Promise<void>}
	*/
	async removeIssuesFromModuleBulk(workspaceSlug, projectId, moduleId, issueIds) {
		const promiseDataUrls = [];
		issueIds.forEach((issueId) => {
			promiseDataUrls.push(this.delete(`/api/workspaces/${workspaceSlug}/projects/${projectId}/modules/${moduleId}/issues/${issueId}/`));
		});
		await Promise.all(promiseDataUrls).then((response) => response).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Remove modules from an issue
	* @param {string} workspaceSlug - The slug of the workspace
	* @param {string} projectId - The ID of the project
	* @param {string} issueId - The ID of the issue
	* @param {string[]} moduleIds - The IDs of the modules to be removed
	* @returns {Promise<void>}
	*/
	async removeModulesFromIssueBulk(workspaceSlug, projectId, issueId, moduleIds) {
		const promiseDataUrls = [];
		moduleIds.forEach((moduleId) => {
			promiseDataUrls.push(this.delete(`/api/workspaces/${workspaceSlug}/projects/${projectId}/modules/${moduleId}/issues/${issueId}/`));
		});
		await Promise.all(promiseDataUrls).then((response) => response).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Add a module to favorites
	* @param {string} workspaceSlug - The slug of the workspace
	* @param {string} projectId - The ID of the project
	* @param {object} data - The data to be sent in the request body
	* @param {string} data.module - The ID of the module to be added
	* @returns {Promise<any>}
	*/
	async addModuleToFavorites(workspaceSlug, projectId, data) {
		return this.post(`/api/workspaces/${workspaceSlug}/projects/${projectId}/user-favorite-modules/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Remove a module from favorites
	* @param {string} workspaceSlug - The slug of the workspace
	* @param {string} projectId - The ID of the project
	* @param {string} moduleId - The ID of the module to be removed
	* @returns {Promise<any>}
	*/
	async removeModuleFromFavorites(workspaceSlug, projectId, moduleId) {
		return this.delete(`/api/workspaces/${workspaceSlug}/projects/${projectId}/user-favorite-modules/${moduleId}/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/module/sites-module.service.ts
/**
* Service class for managing modules within plane sites application.
* Extends APIService to handle HTTP requests to the module-related endpoints.
* @extends {APIService}
* @remarks This service is only available for plane sites
*/
var SitesModuleService = class extends APIService {
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	/**
	* Retrieves a list of modules for a specific anchor.
	* @param {string} anchor - The anchor identifier
	* @returns {Promise<TPublicModule[]>} The list of modules
	* @throws {Error} If the API request fails
	*/
	async list(anchor) {
		return this.get(`/api/public/anchor/${anchor}/modules/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/user/favorite.service.ts
/**
* Service class for managing user favorites
* Handles operations for adding, updating, removing, and retrieving user favorites within a workspace
* @extends {APIService}
*/
var UserFavoriteService = class extends APIService {
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	/**
	* Adds a new item to user favorites
	* @param {string} workspaceSlug - The unique slug identifier for the workspace
	* @param {Partial<IFavorite>} data - Favorite item data to be added
	* @returns {Promise<IFavorite>} Promise resolving to the created favorite item
	* @throws {Error} If the API request fails
	*/
	async add(workspaceSlug, data) {
		return this.post(`/api/workspaces/${workspaceSlug}/user-favorites/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	/**
	* Updates an existing favorite item
	* @param {string} workspaceSlug - The unique slug identifier for the workspace
	* @param {string} favoriteId - The unique identifier for the favorite item
	* @param {Partial<IFavorite>} data - Updated favorite item data
	* @returns {Promise<IFavorite>} Promise resolving to the updated favorite item
	* @throws {Error} If the API request fails
	*/
	async update(workspaceSlug, favoriteId, data) {
		return this.patch(`/api/workspaces/${workspaceSlug}/user-favorites/${favoriteId}/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	/**
	* Removes an item from user favorites
	* @param {string} workspaceSlug - The unique slug identifier for the workspace
	* @param {string} favoriteId - The unique identifier for the favorite item to remove
	* @returns {Promise<void>} Promise resolving when the favorite item is removed
	* @throws {Error} If the API request fails
	*/
	async remove(workspaceSlug, favoriteId) {
		return this.delete(`/api/workspaces/${workspaceSlug}/user-favorites/${favoriteId}/`).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	/**
	* Retrieves all favorite items for a user in a workspace
	* @param {string} workspaceSlug - The unique slug identifier for the workspace
	* @returns {Promise<IFavorite[]>} Promise resolving to array of favorite items
	* @throws {Error} If the API request fails
	* @remarks This method includes the 'all' parameter to retrieve all favorites
	*/
	async list(workspaceSlug) {
		return this.get(`/api/workspaces/${workspaceSlug}/user-favorites/`, { params: { all: true } }).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Retrieves grouped favorite items for a specific favorite in a workspace
	* @param {string} workspaceSlug - The unique slug identifier for the workspace
	* @param {string} favoriteId - The unique identifier for the favorite item to get grouped items for
	* @returns {Promise<IFavorite[]>} Promise resolving to array of grouped favorite items
	* @throws {Error} If the API request fails
	*/
	async groupedList(workspaceSlug, favoriteId) {
		return this.get(`/api/workspaces/${workspaceSlug}/user-favorites/${favoriteId}/group/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/user/user.service.ts
/**
* Service class for managing user operations
* Handles operations for retrieving the current user's details and perform CRUD operations
* @extends {APIService}
*/
var UserService = class extends APIService {
	/**
	* Constructor for UserService
	* @param BASE_URL - Base URL for API requests
	*/
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	/**
	* Retrieves the current user details
	* @returns {Promise<IUser>} Promise resolving to the current user details
	*/
	async me() {
		return this.get("/api/users/me/").then((response) => response?.data).catch((error) => {
			throw error;
		});
	}
	/**
	* Updates the current user details
	* @param {Partial<IUser>} data Data to update the user with
	* @returns {Promise<IUser>} Promise resolving to the updated user details
	* @throws {Error} If the API request fails
	*/
	async update(data) {
		return this.patch("/api/users/me/", data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Retrieves the current user's profile details
	* @returns {Promise<TUserProfile>} Promise resolving to the current user's profile details
	* @throws {Error} If the API request fails
	*/
	async profile() {
		return this.get("/api/users/me/profile/").then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	/**
	* Updates the current user's profile details
	* @param {Partial<TUserProfile>} data Data to update the user's profile with
	* @returns {Promise<TUserProfile>} Promise resolving to the updated user's profile details
	* @throws {Error} If the API request fails
	*/
	async updateProfile(data) {
		return this.patch("/api/users/me/profile/", data).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	/**
	* Retrieves the current instance admin details
	* @returns {Promise<IUser>} Promise resolving to the current instance admin details
	* @throws {Error} If the API request fails
	*/
	async adminDetails() {
		return this.get("/api/instances/admins/me/").then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/user/sites-member.service.ts
/**
* Service class for managing members operations within plane sites application.
* Extends APIService to handle HTTP requests to the member-related endpoints.
* @extends {APIService}
* @remarks This service is only available for plane sites
*/
var SitesMemberService = class extends APIService {
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	/**
	* Retrieves a list of members for a specific anchor.
	* @param {string} anchor - The anchor identifier
	* @returns {Promise<TPublicMember[]>} The list of members
	* @throws {Error} If the API request fails
	*/
	async list(anchor) {
		return this.get(`/api/public/anchor/${anchor}/members/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/project/view.service.ts
var ProjectViewService = class extends APIService {
	/**
	* Creates an instance of ProjectViewService
	* @param {string} baseUrl - The base URL for API requests
	*/
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
};

//#endregion
//#region src/project/sites-publish.service.ts
/**
* Service class for managing project publish operations within plane sites application.
* Extends APIService to handle HTTP requests to the project publish-related endpoints.
* @extends {APIService}
* @remarks This service is only available for plane sites
*/
var SitesProjectPublishService = class extends APIService {
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	/**
	* Retrieves publish settings for a specific anchor.
	* @param {string} anchor - The anchor identifier
	* @returns {Promise<TProjectPublishSettings>} The publish settings
	* @throws {Error} If the API request fails
	*/
	async retrieveSettingsByAnchor(anchor) {
		return this.get(`/api/public/anchor/${anchor}/settings/`).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	/**
	* Retrieves publish settings for a specific project.
	* @param {string} workspaceSlug - The workspace slug
	* @param {string} projectID - The project identifier
	* @returns {Promise<TProjectPublishSettings>} The publish settings
	* @throws {Error} If the API request fails
	*/
	async retrieveSettingsByProjectId(workspaceSlug, projectID) {
		return this.get(`/api/public/workspaces/${workspaceSlug}/projects/${projectID}/anchor/`).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
};

//#endregion
//#region src/workspace/invitation.service.ts
/**
* Service class for managing workspace invitations
* Handles operations related to inviting users to workspaces and managing invitations
* @extends {APIService}
*/
var WorkspaceInvitationService = class extends APIService {
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	/**
	* Retrieves all workspace invitations for the current user
	* @returns {Promise<IWorkspaceMemberInvitation[]>} Promise resolving to array of workspace invitations
	* @throws {Error} If the API request fails
	*/
	async userInvitations() {
		return this.get("/api/users/me/workspaces/invitations/").then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Retrieves all invitations for a specific workspace
	* @param {string} workspaceSlug - The unique slug identifier for the workspace
	* @returns {Promise<IWorkspaceMemberInvitation[]>} Promise resolving to array of workspace invitations
	* @throws {Error} If the API request fails
	*/
	async workspaceInvitations(workspaceSlug) {
		return this.get(`/api/workspaces/${workspaceSlug}/invitations/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Sends bulk invitations to users for a workspace
	* @param {string} workspaceSlug - The unique slug identifier for the workspace
	* @param {IWorkspaceBulkInviteFormData} data - Bulk invitation data containing user information
	* @returns {Promise<any>} Promise resolving to the invitation response
	* @throws {Error} If the API request fails
	*/
	async invite(workspaceSlug, data) {
		return this.post(`/api/workspaces/${workspaceSlug}/invitations/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Update Invitation
	* @param workspaceSlug
	* @param invitationId
	* @param data
	* @returns
	*/
	async update(workspaceSlug, invitationId, data) {
		return this.patch(`/api/workspaces/${workspaceSlug}/invitations/${invitationId}/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Delete Workspace invitation
	* @param workspaceSlug
	* @param invitationId
	* @returns
	*/
	async destroy(workspaceSlug, invitationId) {
		return this.delete(`/api/workspaces/${workspaceSlug}/invitations/${invitationId}/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Accepts an invitation to join a workspace
	* @param {string} workspaceSlug - The unique slug identifier for the workspace
	* @param {string} invitationId - The unique identifier for the invitation
	* @param {any} data - Additional data required for joining the workspace
	* @returns {Promise<any>} Promise resolving to the join response
	* @throws {Error} If the API request fails
	*/
	async join(workspaceSlug, invitationId, data) {
		return this.post(`/api/workspaces/${workspaceSlug}/invitations/${invitationId}/join/`, data, { headers: {} }).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Accepts multiple workspace invitations at once
	* @param {any} data - Data containing information about invitations to accept
	* @returns {Promise<any>} Promise resolving to the bulk join response
	* @throws {Error} If the API request fails
	*/
	async joinMany(data) {
		return this.post("/api/users/me/workspaces/invitations/", data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/workspace/member.service.ts
/**
* Service class for managing workspace members
* Handles operations related to workspace membership, including member information,
* updates, deletions, and role management
* @extends {APIService}
*/
var WorkspaceMemberService = class extends APIService {
	/**
	* Creates an instance of WorkspaceMemberService
	* @param {string} baseUrl - The base URL for API requests
	*/
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	/**
	* Retrieves current user's information for a specific workspace
	* @param {string} workspaceSlug - The unique slug identifier for the workspace
	* @returns {Promise<IWorkspaceMemberMe>} Promise resolving to current user's workspace member information
	* @throws {Error} If the API request fails
	*/
	async myInfo(workspaceSlug) {
		return this.get(`/api/workspaces/${workspaceSlug}/workspace-members/me/`).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	/**
	* Retrieves all members of a specific workspace
	* @param {string} workspaceSlug - The unique slug identifier for the workspace
	* @returns {Promise<IWorkspaceMember[]>} Promise resolving to array of workspace members
	* @throws {Error} If the API request fails
	*/
	async list(workspaceSlug) {
		return this.get(`/api/workspaces/${workspaceSlug}/members/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Updates a workspace member's information
	* @param {string} workspaceSlug - The unique slug identifier for the workspace
	* @param {string} memberId - The unique identifier for the member
	* @param {Partial<IWorkspaceMember>} data - Updated member data
	* @returns {Promise<IWorkspaceMember>} Promise resolving to the updated member information
	* @throws {Error} If the API request fails
	*/
	async update(workspaceSlug, memberId, data) {
		return this.patch(`/api/workspaces/${workspaceSlug}/members/${memberId}/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Removes a member from a workspace
	* @param {string} workspaceSlug - The unique slug identifier for the workspace
	* @param {string} memberId - The unique identifier for the member to remove
	* @returns {Promise<any>} Promise resolving to the deletion response
	* @throws {Error} If the API request fails
	*/
	async destroy(workspaceSlug, memberId) {
		return this.delete(`/api/workspaces/${workspaceSlug}/members/${memberId}/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Retrieves the current user's project roles within a workspace
	* @param {string} workspaceSlug - The unique slug identifier for the workspace
	* @returns {Promise<IUserProjectsRole>} Promise resolving to user's project roles
	* @throws {Error} If the API request fails
	*/
	async getWorkspaceUserProjectsRole(workspaceSlug) {
		return this.get(`/api/users/me/workspaces/${workspaceSlug}/project-roles/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/workspace/notification.service.ts
var WorkspaceNotificationService = class extends APIService {
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	/**
	* Retrieves the count of unread notifications for a workspace
	* @param {string} workspaceSlug - The unique identifier for the workspace
	* @returns {Promise<TUnreadNotificationsCount | undefined>} The count of unread notifications
	*/
	async getUnreadCount(workspaceSlug) {
		return this.get(`/api/workspaces/${workspaceSlug}/users/notifications/unread/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Retrieves paginated notifications for a workspace
	* @param {string} workspaceSlug - The unique identifier for the workspace
	* @param {TNotificationPaginatedInfoQueryParams} params - Query parameters for pagination and filtering
	* @returns {Promise<TNotificationPaginatedInfo | undefined>} Paginated list of notifications
	*/
	async list(workspaceSlug, params) {
		return this.get(`/api/workspaces/${workspaceSlug}/users/notifications`, { params }).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Updates a specific notification by ID
	* @param {string} workspaceSlug - The unique identifier for the workspace
	* @param {string} notificationId - The unique identifier for the notification
	* @param {Partial<TNotification>} data - The notification data to update
	* @returns {Promise<TNotification | undefined>} The updated notification
	*/
	async update(workspaceSlug, notificationId, data) {
		return this.patch(`/api/workspaces/${workspaceSlug}/users/notifications/${notificationId}/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Marks a notification as read
	* @param {string} workspaceSlug - The unique identifier for the workspace
	* @param {string} notificationId - The unique identifier for the notification
	* @returns {Promise<TNotification | undefined>} The updated notification
	*/
	async markAsRead(workspaceSlug, notificationId) {
		return this.post(`/api/workspaces/${workspaceSlug}/users/notifications/${notificationId}/read/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Marks a notification as unread
	* @param {string} workspaceSlug - The unique identifier for the workspace
	* @param {string} notificationId - The unique identifier for the notification
	* @returns {Promise<TNotification | undefined>} The updated notification
	*/
	async markAsUnread(workspaceSlug, notificationId) {
		return this.delete(`/api/workspaces/${workspaceSlug}/users/notifications/${notificationId}/read/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Archives a notification
	* @param {string} workspaceSlug - The unique identifier for the workspace
	* @param {string} notificationId - The unique identifier for the notification
	* @returns {Promise<TNotification | undefined>} The updated notification
	*/
	async archive(workspaceSlug, notificationId) {
		return this.post(`/api/workspaces/${workspaceSlug}/users/notifications/${notificationId}/archive/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Unarchives a notification
	* @param {string} workspaceSlug - The unique identifier for the workspace
	* @param {string} notificationId - The unique identifier for the notification
	* @returns {Promise<TNotification | undefined>} The updated notification
	*/
	async unarchive(workspaceSlug, notificationId) {
		return this.delete(`/api/workspaces/${workspaceSlug}/users/notifications/${notificationId}/archive/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Marks all notifications as read based on filter criteria
	* @param {string} workspaceSlug - The unique identifier for the workspace
	* @param {TNotificationPaginatedInfoQueryParams} data - Filter criteria for notifications to mark as read
	* @returns {Promise<TNotification | undefined>} The result of the operation
	*/
	async markAllAsRead(workspaceSlug, data) {
		return this.post(`/api/workspaces/${workspaceSlug}/users/notifications/mark-all-read/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/workspace/view.service.ts
var WorkspaceViewService = class extends APIService {
	/**
	* Creates an instance of WorkspaceViewService
	* @param {string} baseUrl - The base URL for API requests
	*/
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	async create(workspaceSlug, data) {
		return this.post(`/api/workspaces/${workspaceSlug}/views/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	async update(workspaceSlug, viewId, data) {
		return this.patch(`/api/workspaces/${workspaceSlug}/views/${viewId}/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	async destroy(workspaceSlug, viewId) {
		return this.delete(`/api/workspaces/${workspaceSlug}/views/${viewId}/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	async list(workspaceSlug) {
		return this.get(`/api/workspaces/${workspaceSlug}/views/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	async retrieve(workspaceSlug, viewId) {
		return this.get(`/api/workspaces/${workspaceSlug}/views/${viewId}/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	async getViewIssues(workspaceSlug, params, config = {}) {
		return this.get(`/api/workspaces/${workspaceSlug}/issues/`, { params }, config).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/workspace/workspace.service.ts
/**
* Service class for managing workspace operations
* Handles CRUD operations and various workspace-related functionalities
* @extends {APIService}
*/
var WorkspaceService = class extends APIService {
	/**
	* Creates an instance of WorkspaceService
	* @param {string} baseUrl - The base URL for API requests
	*/
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	/**
	* Retrieves all workspaces for the current user
	* @returns {Promise<IWorkspace[]>} Promise resolving to an array of workspaces
	* @throws {Error} If the API request fails
	*/
	async list() {
		return this.get("/api/users/me/workspaces/").then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Retrieves details of a specific workspace
	* @param {string} workspaceSlug - The unique slug identifier for the workspace
	* @returns {Promise<IWorkspace>} Promise resolving to workspace details
	* @throws {Error} If the API request fails
	*/
	async retrieve(workspaceSlug) {
		return this.get(`/api/workspaces/${workspaceSlug}/`).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	/**
	* Creates a new workspace
	* @param {Partial<IWorkspace>} data - Workspace data for creation
	* @returns {Promise<IWorkspace>} Promise resolving to the created workspace
	* @throws {Error} If the API request fails
	*/
	async create(data) {
		return this.post("/api/workspaces/", data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Updates an existing workspace
	* @param {string} workspaceSlug - The unique slug identifier for the workspace
	* @param {Partial<IWorkspace>} data - Updated workspace data
	* @returns {Promise<IWorkspace>} Promise resolving to the updated workspace
	* @throws {Error} If the API request fails
	*/
	async update(workspaceSlug, data) {
		return this.patch(`/api/workspaces/${workspaceSlug}/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Deletes a workspace
	* @param {string} workspaceSlug - The unique slug identifier for the workspace
	* @returns {Promise<any>} Promise resolving to the deletion response
	* @throws {Error} If the API request fails
	*/
	async destroy(workspaceSlug) {
		return this.delete(`/api/workspaces/${workspaceSlug}/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Retrieves information about the user's last visited workspace
	* @returns {Promise<ILastActiveWorkspaceDetails>} Promise resolving to last active workspace details
	* @throws {Error} If the API request fails
	*/
	async lastVisited() {
		return this.get("/api/users/last-visited-workspace/").then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Checks if a workspace slug is available
	* @param {string} slug - The workspace slug to check
	* @returns {Promise<any>} Promise resolving to slug availability status
	* @throws {Error} If the API request fails
	*/
	async slugCheck(slug) {
		return this.get(`/api/workspace-slug-check/?slug=${slug}`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
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
	async search(workspaceSlug, params) {
		return this.get(`/api/workspaces/${workspaceSlug}/search/`, { params }).then((res) => res?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/workspace/instance-workspace.service.ts
/**
* Service class for managing instance workspaces
* Handles CRUD operations on instance workspaces
* @extends APIService
*/
var InstanceWorkspaceService = class extends APIService {
	/**
	* Constructor for InstanceWorkspaceService
	* @param BASE_URL - Base URL for API requests
	*/
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	/**
	* Retrieves a paginated list of workspaces for the current instance
	* @param {string} nextPageCursor - Optional cursor to retrieve the next page of results
	* @returns {Promise<TWorkspacePaginationInfo>} Promise resolving to a paginated list of workspaces
	* @throws {Error} If the API request fails
	*/
	async list(nextPageCursor) {
		return this.get(`/api/instances/workspaces/`, { params: { cursor: nextPageCursor } }).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Checks if a workspace slug is available
	* @param {string} slug - The workspace slug to check
	* @returns {Promise<any>} Promise resolving to slug availability status
	* @throws {Error} If the API request fails
	*/
	async slugCheck(slug) {
		const params = new URLSearchParams({ slug });
		return this.get(`/api/instances/workspace-slug-check/?${params.toString()}`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Creates a new workspace
	* @param {Partial<IWorkspace>} data - Workspace data for creation
	* @returns {Promise<IWorkspace>} Promise resolving to the created workspace
	* @throws {Error} If the API request fails
	*/
	async create(data) {
		return this.post("/api/instances/workspaces/", data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/file/file-upload.service.ts
/**
* Service class for handling file upload operations
* Handles file uploads
* @extends {APIService}
*/
var FileUploadService = class extends APIService {
	cancelSource;
	constructor() {
		super("");
	}
	/**
	* Uploads a file to the specified signed URL
	* @param {string} url - The URL to upload the file to
	* @param {FormData} data - The form data to upload
	* @returns {Promise<void>} Promise resolving to void
	* @throws {Error} If the request fails
	*/
	async uploadFile(url, data) {
		this.cancelSource = axios.CancelToken.source();
		return this.post(url, data, {
			headers: { "Content-Type": "multipart/form-data" },
			cancelToken: this.cancelSource.token,
			withCredentials: false
		}).then((response) => response?.data).catch((error) => {
			if (axios.isCancel(error)) console.log(error.message);
			else throw error?.response?.data;
		});
	}
	/**
	* Cancels the upload
	*/
	cancelUpload() {
		this.cancelSource.cancel("Upload canceled");
	}
};

//#endregion
//#region src/file/helper.ts
/**
* @description from the provided signed URL response, generate a payload to be used to upload the file
* @param {TFileSignedURLResponse} signedURLResponse
* @param {File} file
* @returns {FormData} file upload request payload
*/
const generateFileUploadPayload = (signedURLResponse, file) => {
	const formData = new FormData();
	Object.entries(signedURLResponse.upload_data.fields).forEach(([key, value]) => formData.append(key, value));
	formData.append("file", file);
	return formData;
};
/**
* @description Detect MIME type from file signature using file-type library
* @param {File} file
* @returns {Promise<string>} detected MIME type or empty string if unknown
*/
const detectMimeTypeFromSignature = async (file) => {
	try {
		const buffer = await file.slice(0, 4096).arrayBuffer();
		return (await fileTypeFromBuffer(new Uint8Array(buffer)))?.mime || "";
	} catch (_error) {
		return "";
	}
};
/**
* @description Determine the MIME type of a file using multiple detection methods
* @param {File} file
* @returns {Promise<string>} detected MIME type
*/
const detectFileType = async (file) => {
	if (file.type && file.type.trim() !== "") return file.type;
	try {
		const signatureType = await detectMimeTypeFromSignature(file);
		if (signatureType) return signatureType;
	} catch (_error) {
		console.error("Error detecting file type from signature:", _error);
	}
	return "application/octet-stream";
};
/**
* @description returns the necessary file meta data to upload a file
* @param {File} file
* @returns {Promise<TFileMetaDataLite>} payload with file info
*/
const getFileMetaDataForUpload = async (file) => {
	const fileType = await detectFileType(file);
	return {
		name: file.name,
		size: file.size,
		type: fileType
	};
};
/**
* @description this function returns the assetId from the asset source
* @param {string} src
* @returns {string} assetId
*/
const getAssetIdFromUrl = (src) => {
	const sourcePaths = src.split("/");
	return sourcePaths[sourcePaths.length - 1] ?? "";
};

//#endregion
//#region src/file/file.service.ts
/**
* Service class for managing file operations within plane applications.
* Extends APIService to handle HTTP requests to the file-related endpoints.
* @extends {APIService}
*/
var FileService = class extends APIService {
	/**
	* Creates an instance of FileService
	* @param {string} BASE_URL - The base URL for API requests
	*/
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	/**
	* Deletes a new asset
	* @param {string} assetPath - The asset path
	* @returns {Promise<void>} Promise resolving to void
	* @throws {Error} If the request fails
	*/
	async deleteNewAsset(assetPath) {
		return this.delete(assetPath).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Deletes an old editor asset
	* @param {string} workspaceId - The workspace identifier
	* @param {string} src - The asset source
	* @returns {Promise<any>} Promise resolving to void
	* @throws {Error} If the request fails
	*/
	async deleteOldEditorAsset(workspaceId, src) {
		const assetKey = getAssetIdFromUrl(src);
		return this.delete(`/api/workspaces/file-assets/${workspaceId}/${assetKey}/`).then((response) => response?.status).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Restores an old editor asset
	* @param {string} workspaceId - The workspace identifier
	* @param {string} src - The asset source
	* @returns {Promise<void>} Promise resolving to void
	* @throws {Error} If the request fails
	*/
	async restoreOldEditorAsset(workspaceId, src) {
		const assetKey = getAssetIdFromUrl(src);
		return this.post(`/api/workspaces/file-assets/${workspaceId}/${assetKey}/restore/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Duplicates assets
	* @param {string} workspaceSlug - The workspace slug
	* @param {TDuplicateAssetData} data - The data for the duplicate assets
	* @returns {Promise<TDuplicateAssetResponse>} Promise resolving to a record of asset IDs
	* @throws {Error} If the request fails
	*/
	async duplicateAssets(workspaceSlug, data) {
		return this.post(`/api/assets/v2/workspaces/${workspaceSlug}/duplicate-assets/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/file/sites-file.service.ts
/**
* Service class for managing file operations within plane sites application.
* Extends FileService to manage file-related operations.
* @extends {FileService}
* @remarks This service is only available for plane sites
*/
var SitesFileService = class extends FileService {
	cancelSource;
	fileUploadService;
	/**
	* Creates an instance of SitesFileService
	* @param {string} BASE_URL - The base URL for API requests
	*/
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
		this.cancelUpload = this.cancelUpload.bind(this);
		this.fileUploadService = new FileUploadService();
	}
	/**
	* Updates the upload status of an asset
	* @param {string} anchor - The anchor identifier
	* @param {string} assetId - The asset identifier
	* @returns {Promise<void>} Promise resolving to void
	* @throws {Error} If the request fails
	*/
	async updateAssetUploadStatus(anchor, assetId) {
		return this.patch(`/api/public/assets/v2/anchor/${anchor}/${assetId}/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Updates the upload status of multiple assets
	* @param {string} anchor - The anchor identifier
	* @param {string} entityId - The entity identifier
	* @param {Object} data - The data payload
	* @returns {Promise<void>} Promise resolving to void
	* @throws {Error} If the request fails
	*/
	async updateBulkAssetsUploadStatus(anchor, entityId, data) {
		return this.post(`/api/public/assets/v2/anchor/${anchor}/${entityId}/bulk/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Uploads a file to the specified anchor
	* @param {string} anchor - The anchor identifier
	* @param {TFileEntityInfo} data - The data payload
	* @param {File} file - The file to upload
	* @returns {Promise<TFileSignedURLResponse>} Promise resolving to the signed URL response
	* @throws {Error} If the request fails
	*/
	async uploadAsset(anchor, data, file) {
		const fileMetaData = await getFileMetaDataForUpload(file);
		return this.post(`/api/public/assets/v2/anchor/${anchor}/`, {
			...data,
			...fileMetaData
		}).then(async (response) => {
			const signedURLResponse = response?.data;
			const fileUploadPayload = generateFileUploadPayload(signedURLResponse, file);
			await this.fileUploadService.uploadFile(signedURLResponse.upload_data.url, fileUploadPayload);
			await this.updateAssetUploadStatus(anchor, signedURLResponse.asset_id);
			return signedURLResponse;
		}).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Restores a new asset
	* @param {string} workspaceSlug - The workspace slug
	* @param {string} src - The asset source
	* @returns {Promise<void>} Promise resolving to void
	* @throws {Error} If the request fails
	*/
	async restoreNewAsset(anchor, src) {
		const assetId = getAssetIdFromUrl(src);
		return this.post(`/api/public/assets/v2/anchor/${anchor}/restore/${assetId}/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
	/**
	* Cancels the upload
	*/
	cancelUpload() {
		this.cancelSource.cancelUpload();
	}
};

//#endregion
//#region src/label/sites-label.service.ts
/**
* Service class for managing labels within plane sites application.
* Extends APIService to handle HTTP requests to the label-related endpoints.
* @extends {APIService}
* @remarks This service is only available for plane sites
*/
var SitesLabelService = class extends APIService {
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	/**
	* Retrieves a list of labels for a specific anchor.
	* @param {string} anchor - The anchor identifier
	* @returns {Promise<IIssueLabel[]>} The list of labels
	* @throws {Error} If the API request fails
	*/
	async list(anchor) {
		return this.get(`/api/public/anchor/${anchor}/labels/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/state/sites-state.service.ts
/**
* Service class for managing states within plane sites application.
* Extends APIService to handle HTTP requests to the state-related endpoints.
* @extends {APIService}
* @remarks This service is only available for plane sites
*/
var SitesStateService = class extends APIService {
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	/**
	* Retrieves a list of states for a specific anchor.
	* @param {string} anchor - The anchor identifier
	* @returns {Promise<IState[]>} The list of states
	* @throws {Error} If the API request fails
	*/
	async list(anchor) {
		return this.get(`/api/public/anchor/${anchor}/states/`).then((response) => response?.data).catch((error) => {
			throw error?.response?.data;
		});
	}
};

//#endregion
//#region src/issue/sites-issue.service.ts
/**
* Service class for managing issues within plane sites application
* Extends the APIService class to handle HTTP requests to the issue-related endpoints
* @extends {APIService}
* @remarks This service is only available for plane sites
*/
var SitesIssueService = class extends APIService {
	constructor(BASE_URL) {
		super(BASE_URL || API_BASE_URL);
	}
	/**
	* Retrieves a paginated list of issues for a specific anchor
	* @param {string} anchor - The anchor identifier
	* @param {any} params - Optional query parameters
	* @returns {Promise<TPublicIssuesResponse>} Promise resolving to a paginated list of issues
	* @throws {Error} If the API request fails
	*/
	async list(anchor, params) {
		return this.get(`/api/public/anchor/${anchor}/issues/`, { params }).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	/**
	* Retrieves details of a specific issue
	* @param {string} anchor - The anchor identifier
	* @param {string} issueID - The issue identifier
	* @returns {Promise<IPublicIssue>} Promise resolving to the issue details
	* @throws {Error} If the API request fails
	*/
	async retrieve(anchor, issueID) {
		return this.get(`/api/public/anchor/${anchor}/issues/${issueID}/`).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	/**
	* Retrieves the votes associated with a specific issue
	* @param {string} anchor - The anchor identifier
	* @param {string} issueID - The issue identifier
	* @returns {Promise<any>} Promise resolving to the votes
	* @throws {Error} If the API request fails
	*/
	async listVotes(anchor, issueID) {
		return this.get(`/api/public/anchor/${anchor}/issues/${issueID}/votes/`).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	/**
	* Creates a new vote for a specific issue
	* @param {string} anchor - The anchor identifier
	* @param {string} issueID - The issue identifier
	* @param {any} data - The vote data
	* @returns {Promise<any>} Promise resolving to the created vote
	* @throws {Error} If the API request fails
	*/
	async addVote(anchor, issueID, data) {
		return this.post(`/api/public/anchor/${anchor}/issues/${issueID}/votes/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	/**
	* Deletes a vote for a specific issue
	* @param {string} anchor - The anchor identifier
	* @param {string} issueID - The issue identifier
	* @returns {Promise<any>} Promise resolving to the deletion response
	* @throws {Error} If the API request fails
	*/
	async removeVote(anchor, issueID) {
		return this.delete(`/api/public/anchor/${anchor}/issues/${issueID}/votes/`).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	/**
	* Retrieves the reactions associated with a specific issue
	* @param {string} anchor - The anchor identifier
	* @param {string} issueID - The issue identifier
	* @returns {Promise<any>} Promise resolving to the reactions
	* @throws {Error} If the API request fails
	*/
	async listReactions(anchor, issueID) {
		return this.get(`/api/public/anchor/${anchor}/issues/${issueID}/reactions/`).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	/**
	* Creates a new reaction for a specific issue
	* @param {string} anchor - The anchor identifier
	* @param {string} issueID - The issue identifier
	* @param {any} data - The reaction data
	* @returns {Promise<any>} Promise resolving to the created reaction
	* @throws {Error} If the API request fails
	*/
	async addReaction(anchor, issueID, data) {
		return this.post(`/api/public/anchor/${anchor}/issues/${issueID}/reactions/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	/**
	* Deletes a reaction for a specific issue
	* @param {string} anchor - The anchor identifier
	* @param {string} issueID - The issue identifier
	* @param {string} reactionId - The reaction identifier
	* @returns {Promise<any>} Promise resolving to the deletion response
	* @throws {Error} If the API request fails
	*/
	async removeReaction(anchor, issueID, reactionId) {
		return this.delete(`/api/public/anchor/${anchor}/issues/${issueID}/reactions/${reactionId}/`).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	/**
	* Retrieves the comments associated with a specific issue
	* @param {string} anchor - The anchor identifier
	* @param {string} issueID - The issue identifier
	* @returns {Promise<any>} Promise resolving to the comments
	* @throws {Error} If the API request fails
	*/
	async listComments(anchor, issueID) {
		return this.get(`/api/public/anchor/${anchor}/issues/${issueID}/comments/`).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	/**
	* Creates a new comment for a specific issue
	* @param {string} anchor - The anchor identifier
	* @param {string} issueID - The issue identifier
	* @param {any} data - The comment data
	* @returns {Promise<TIssuePublicComment>} Promise resolving to the created comment
	* @throws {Error} If the API request fails
	*/
	async addComment(anchor, issueID, data) {
		return this.post(`/api/public/anchor/${anchor}/issues/${issueID}/comments/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	/**
	* Updates a comment for a specific issue
	* @param {string} anchor - The anchor identifier
	* @param {string} issueID - The issue identifier
	* @param {string} commentId - The comment identifier
	* @param {any} data - The updated comment data
	* @returns {Promise<any>} Promise resolving to the updated comment
	* @throws {Error} If the API request fails
	*/
	async updateComment(anchor, issueID, commentId, data) {
		return this.patch(`/api/public/anchor/${anchor}/issues/${issueID}/comments/${commentId}/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	/**
	* Deletes a comment for a specific issue
	* @param {string} anchor - The anchor identifier
	* @param {string} issueID - The issue identifier
	* @param {string} commentId - The comment identifier
	* @returns {Promise<any>} Promise resolving to the deletion response
	* @throws {Error} If the API request fails
	*/
	async removeComment(anchor, issueID, commentId) {
		return this.delete(`/api/public/anchor/${anchor}/issues/${issueID}/comments/${commentId}/`).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	/**
	* Creates a new reaction for a specific comment
	* @param {string} anchor - The anchor identifier
	* @param {string} commentId - The comment identifier
	* @param {any} data - The reaction data
	* @returns {Promise<any>} Promise resolving to the created reaction
	* @throws {Error} If the API request fails
	*/
	async addCommentReaction(anchor, commentId, data) {
		return this.post(`/api/public/anchor/${anchor}/comments/${commentId}/reactions/`, data).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
	/**
	* Deletes a reaction for a specific comment
	* @param {string} anchor - The anchor identifier
	* @param {string} commentId - The comment identifier
	* @param {string} reactionHex - The reaction identifier
	* @returns {Promise<any>} Promise resolving to the deletion response
	* @throws {Error} If the API request fails
	*/
	async removeCommentReaction(anchor, commentId, reactionHex) {
		return this.delete(`/api/public/anchor/${anchor}/comments/${commentId}/reactions/${reactionHex}/`).then((response) => response?.data).catch((error) => {
			throw error?.response;
		});
	}
};

//#endregion
export { AIService, APITokenService, AuthService, CycleAnalyticsService, CycleArchiveService, CycleOperationsService, CycleService, DashboardService, FileService, FileUploadService, InstanceService, InstanceWorkspaceService, IntakeIssueService, IntakeService, ModuleLinkService, ModuleOperationService, ModuleService, ProjectViewService, SitesAuthService, SitesCycleService, SitesFileService, SitesIssueService, SitesLabelService, SitesMemberService, SitesModuleService, SitesProjectPublishService, SitesStateService, UserFavoriteService, UserService, WebhookService, WorkspaceInvitationService, WorkspaceMemberService, WorkspaceNotificationService, WorkspaceService, WorkspaceViewService, generateFileUploadPayload, getAssetIdFromUrl, getFileMetaDataForUpload };
//# sourceMappingURL=index.js.map