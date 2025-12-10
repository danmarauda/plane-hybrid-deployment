import { TClearFilterOptions, TConfigOptions, TExpressionOptions, TFilterOptions, TSaveViewOptions, TUpdateViewOptions } from "@plane/constants";
import { EIssuesStoreType, IFilterAdapter, SingleOrArray, TAllAvailableOperatorsForDisplay, TBuildFilterExpressionParams, TExternalFilter, TFilterConditionForBuild, TFilterConditionNode, TFilterConditionNodeForDisplay, TFilterConditionPayload, TFilterConfig, TFilterExpression, TFilterProperty, TFilterValue, TLogicalOperator, TOperatorSpecificConfigs, TSupportedOperators, TWorkItemFilterExpression, TWorkItemFilterProperty } from "@plane/types";

//#region src/store/rich-filters/adapter.d.ts

/**
 * Abstract base class for converting between external filter formats and internal filter expressions.
 * Provides common utilities for creating and manipulating filter nodes.
 *
 * @template K - Property key type that extends TFilterProperty
 * @template E - External filter type that extends TExternalFilter
 */
declare abstract class FilterAdapter<K extends TFilterProperty, E extends TExternalFilter> implements IFilterAdapter<K, E> {
  /**
   * Converts an external filter format to internal filter expression.
   * Must be implemented by concrete adapter classes.
   *
   * @param externalFilter - The external filter to convert
   * @returns The internal filter expression or null if conversion fails
   */
  abstract toInternal(externalFilter: E): TFilterExpression<K> | null;
  /**
   * Converts an internal filter expression to external filter format.
   * Must be implemented by concrete adapter classes.
   *
   * @param internalFilter - The internal filter expression to convert
   * @returns The external filter format
   */
  abstract toExternal(internalFilter: TFilterExpression<K> | null): E;
}
//#endregion
//#region src/store/rich-filters/config.d.ts
type TOperatorOptionForDisplay = {
  value: TAllAvailableOperatorsForDisplay;
  label: string;
};
interface IFilterConfig<P extends TFilterProperty, V extends TFilterValue = TFilterValue> extends TFilterConfig<P, V> {
  allEnabledSupportedOperators: TSupportedOperators[];
  firstOperator: TSupportedOperators | undefined;
  getOperatorConfig: (operator: TAllAvailableOperatorsForDisplay) => TOperatorSpecificConfigs<V>[keyof TOperatorSpecificConfigs<V>] | undefined;
  getLabelForOperator: (operator: TAllAvailableOperatorsForDisplay | undefined) => string;
  getDisplayOperatorByValue: <T extends TSupportedOperators>(operator: T, value: V) => T;
  getAllDisplayOperatorOptionsByValue: (value: V) => TOperatorOptionForDisplay[];
  mutate: (updates: Partial<TFilterConfig<P, V>>) => void;
}
//#endregion
//#region src/store/rich-filters/config-manager.d.ts
/**
 * Interface for managing filter configurations.
 * Provides methods to register, update, and retrieve filter configurations.
 * - filterConfigs: Map storing filter configurations by their ID
 * - configOptions: Configuration options controlling filter behavior
 * - allConfigs: All registered filter configurations
 * - allAvailableConfigs: All available filter configurations based on current state
 * - getConfigByProperty: Retrieves a filter configuration by its ID
 * - register: Registers a single filter configuration
 * - registerAll: Registers multiple filter configurations
 * - updateConfigByProperty: Updates an existing filter configuration by ID
 * @template P - The filter property type extending TFilterProperty
 */
interface IFilterConfigManager<P extends TFilterProperty> {
  filterConfigs: Map<P, IFilterConfig<P, TFilterValue>>;
  configOptions: TConfigOptions;
  areConfigsReady: boolean;
  allAvailableConfigs: IFilterConfig<P, TFilterValue>[];
  getConfigByProperty: (property: P) => IFilterConfig<P, TFilterValue> | undefined;
  register: <C extends TFilterConfig<P, TFilterValue>>(config: C) => void;
  registerAll: (configs: TFilterConfig<P, TFilterValue>[]) => void;
  updateConfigByProperty: (property: P, configUpdates: Partial<TFilterConfig<P, TFilterValue>>) => void;
  setAreConfigsReady: (value: boolean) => void;
}
//#endregion
//#region src/store/rich-filters/filter.d.ts
/**
 * Interface for a filter instance.
 * Provides methods to manage the filter expression and notify changes.
 * - id: The id of the filter instance
 * - expression: The filter expression
 * - adapter: The filter adapter
 * - configManager: The filter config manager
 * - onExpressionChange: The callback to notify when the expression changes
 * - hasActiveFilters: Whether the filter instance has any active filters
 * - allConditions: All conditions in the filter expression
 * - allConditionsForDisplay: All conditions in the filter expression
 * - addCondition: Adds a condition to the filter expression
 * - updateConditionOperator: Updates the operator of a condition in the filter expression
 * - updateConditionValue: Updates the value of a condition in the filter expression
 * - removeCondition: Removes a condition from the filter expression
 * - clearFilters: Clears the filter expression
 * @template P - The filter property type extending TFilterProperty
 * @template E - The external filter type extending TExternalFilter
 */
interface IFilterInstance<P extends TFilterProperty, E extends TExternalFilter> {
  id: string;
  initialFilterExpression: TFilterExpression<P> | null;
  expression: TFilterExpression<P> | null;
  adapter: IFilterAdapter<P, E>;
  configManager: IFilterConfigManager<P>;
  onExpressionChange?: (expression: E) => void;
  hasActiveFilters: boolean;
  hasChanges: boolean;
  isVisible: boolean;
  allConditions: TFilterConditionNode<P, TFilterValue>[];
  allConditionsForDisplay: TFilterConditionNodeForDisplay<P, TFilterValue>[];
  clearFilterOptions: TClearFilterOptions | undefined;
  saveViewOptions: TSaveViewOptions<E> | undefined;
  updateViewOptions: TUpdateViewOptions<E> | undefined;
  canClearFilters: boolean;
  canSaveView: boolean;
  canUpdateView: boolean;
  toggleVisibility: (isVisible?: boolean) => void;
  resetExpression: (externalExpression: E, shouldResetInitialExpression?: boolean) => void;
  findConditionsByPropertyAndOperator: (property: P, operator: TAllAvailableOperatorsForDisplay) => TFilterConditionNodeForDisplay<P, TFilterValue>[];
  findFirstConditionByPropertyAndOperator: (property: P, operator: TAllAvailableOperatorsForDisplay) => TFilterConditionNodeForDisplay<P, TFilterValue> | undefined;
  addCondition: <V extends TFilterValue>(groupOperator: TLogicalOperator, condition: TFilterConditionPayload<P, V>, isNegation: boolean) => void;
  updateConditionProperty: (conditionId: string, property: P, operator: TSupportedOperators, isNegation: boolean) => void;
  updateConditionOperator: (conditionId: string, operator: TSupportedOperators, isNegation: boolean) => void;
  updateConditionValue: <V extends TFilterValue>(conditionId: string, value: SingleOrArray<V>) => void;
  removeCondition: (conditionId: string) => void;
  clearFilters: () => Promise<void>;
  saveView: () => Promise<void>;
  updateView: () => Promise<void>;
  updateExpressionOptions: (newOptions: Partial<TExpressionOptions<E>>) => void;
}
type TFilterParams<P extends TFilterProperty, E extends TExternalFilter> = {
  adapter: IFilterAdapter<P, E>;
  options?: Partial<TFilterOptions<E>>;
  initialExpression?: E;
  onExpressionChange?: (expression: E) => void;
};
declare class FilterInstance<P extends TFilterProperty, E extends TExternalFilter> implements IFilterInstance<P, E> {
  id: string;
  initialFilterExpression: TFilterExpression<P> | null;
  expression: TFilterExpression<P> | null;
  expressionOptions: TExpressionOptions<E>;
  adapter: IFilterAdapter<P, E>;
  configManager: IFilterConfigManager<P>;
  onExpressionChange?: (expression: E) => void;
  private helper;
  constructor(params: TFilterParams<P, E>);
  /**
   * Checks if the filter instance has any active filters.
   * @returns True if the filter instance has any active filters, false otherwise.
   */
  get hasActiveFilters(): IFilterInstance<P, E>["hasActiveFilters"];
  /**
   * Checks if the filter instance has any changes with respect to the initial expression.
   * @returns True if the filter instance has any changes, false otherwise.
   */
  get hasChanges(): IFilterInstance<P, E>["hasChanges"];
  /**
   * Returns the visibility of the filter instance.
   * @returns The visibility of the filter instance.
   */
  get isVisible(): IFilterInstance<P, E>["isVisible"];
  /**
   * Returns all conditions from the filter expression.
   * @returns An array of filter conditions.
   */
  get allConditions(): IFilterInstance<P, E>["allConditions"];
  /**
   * Returns all conditions in the filter expression for display purposes.
   * @returns An array of filter conditions for display purposes.
   */
  get allConditionsForDisplay(): IFilterInstance<P, E>["allConditionsForDisplay"];
  /**
   * Returns the clear filter options.
   * @returns The clear filter options.
   */
  get clearFilterOptions(): IFilterInstance<P, E>["clearFilterOptions"];
  /**
   * Returns the save view options.
   * @returns The save view options.
   */
  get saveViewOptions(): IFilterInstance<P, E>["saveViewOptions"];
  /**
   * Returns the update view options.
   * @returns The update view options.
   */
  get updateViewOptions(): IFilterInstance<P, E>["updateViewOptions"];
  /**
   * Checks if the filter expression can be cleared.
   * @returns True if the filter expression can be cleared, false otherwise.
   */
  get canClearFilters(): IFilterInstance<P, E>["canClearFilters"];
  /**
   * Checks if the filter expression can be saved as a view.
   * @returns True if the filter instance can be saved, false otherwise.
   */
  get canSaveView(): IFilterInstance<P, E>["canSaveView"];
  /**
   * Checks if the filter expression can be updated as a view.
   * @returns True if the filter expression can be updated, false otherwise.
   */
  get canUpdateView(): IFilterInstance<P, E>["canUpdateView"];
  /**
   * Toggles the visibility of the filter instance.
   * @param isVisible - The visibility to set.
   */
  toggleVisibility: IFilterInstance<P, E>["toggleVisibility"];
  /**
   * Resets the filter expression to the initial expression.
   * @param externalExpression - The external expression to reset to.
   */
  resetExpression: IFilterInstance<P, E>["resetExpression"];
  /**
   * Finds all conditions by property and operator.
   * @param property - The property to find the conditions by.
   * @param operator - The operator to find the conditions by.
   * @returns All the conditions that match the property and operator.
   */
  findConditionsByPropertyAndOperator: IFilterInstance<P, E>["findConditionsByPropertyAndOperator"];
  /**
   * Finds the first condition by property and operator.
   * @param property - The property to find the condition by.
   * @param operator - The operator to find the condition by.
   * @returns The first condition that matches the property and operator.
   */
  findFirstConditionByPropertyAndOperator: IFilterInstance<P, E>["findFirstConditionByPropertyAndOperator"];
  /**
   * Adds a condition to the filter expression.
   * @param groupOperator - The logical operator to use for the condition.
   * @param condition - The condition to add.
   * @param isNegation - Whether the condition should be negated.
   */
  addCondition: IFilterInstance<P, E>["addCondition"];
  /**
   * Updates the property of a condition in the filter expression.
   * @param conditionId - The id of the condition to update.
   * @param property - The new property for the condition.
   */
  updateConditionProperty: IFilterInstance<P, E>["updateConditionProperty"];
  /**
   * Updates the operator of a condition in the filter expression.
   * @param conditionId - The id of the condition to update.
   * @param operator - The new operator for the condition.
   */
  updateConditionOperator: IFilterInstance<P, E>["updateConditionOperator"];
  /**
   * Updates the value of a condition in the filter expression with automatic optimization.
   * @param conditionId - The id of the condition to update.
   * @param value - The new value for the condition.
   */
  updateConditionValue: IFilterInstance<P, E>["updateConditionValue"];
  /**
   * Removes a condition from the filter expression.
   * @param conditionId - The id of the condition to remove.
   */
  removeCondition: IFilterInstance<P, E>["removeCondition"];
  /**
   * Clears the filter expression.
   */
  clearFilters: IFilterInstance<P, E>["clearFilters"];
  /**
   * Saves the filter expression.
   */
  saveView: IFilterInstance<P, E>["saveView"];
  /**
   * Updates the filter expression.
   */
  updateView: IFilterInstance<P, E>["updateView"];
  /**
   * Updates the expression options for the filter instance.
   * This allows dynamic updates to options like isDisabled properties.
   */
  updateExpressionOptions: IFilterInstance<P, E>["updateExpressionOptions"];
  /**
   * Resets the initial filter expression to the current expression.
   */
  private _resetInitialFilterExpression;
  /**
   * Returns the external filter representation of the filter instance.
   * @returns The external filter representation of the filter instance.
   */
  private _getExternalExpression;
  /**
   * Notifies the parent component of the expression change.
   */
  private _notifyExpressionChange;
}
//#endregion
//#region src/store/work-item-filters/adapter.d.ts
declare class WorkItemFiltersAdapter extends FilterAdapter<TWorkItemFilterProperty, TWorkItemFilterExpression> {
  /**
   * Converts external work item filter expression to internal filter tree
   * @param externalFilter - The external filter expression
   * @returns Internal filter expression or null
   */
  toInternal(externalFilter: TWorkItemFilterExpression): TFilterExpression<TWorkItemFilterProperty> | null;
  /**
   * Recursively converts external expression data to internal filter tree
   * @param expression - The external expression data
   * @returns Internal filter expression
   */
  private _convertExpressionToInternal;
  /**
   * Converts internal filter expression to external format
   * @param internalFilter - The internal filter expression
   * @returns External filter expression
   */
  toExternal(internalFilter: TFilterExpression<TWorkItemFilterProperty>): TWorkItemFilterExpression;
  /**
   * Recursively converts internal expression to external format
   * @param expression - The internal filter expression
   * @returns External expression data
   */
  private _convertExpressionToExternal;
  /**
   * Type guard to check if data is of type TWorkItemFilterConditionData
   * @param data - The data to check
   * @returns True if data is TWorkItemFilterConditionData, false otherwise
   */
  private _isWorkItemFilterConditionData;
  /**
   * Validates if a key is a valid work item filter condition key
   * @param key - The key to validate
   * @returns True if the key is valid
   */
  private _isValidWorkItemFilterConditionKey;
  /**
   * Extracts property, operator and value from work item filter condition data
   * @param data - The condition data
   * @returns Tuple of property, operator and value, or null if invalid
   */
  private _extractWorkItemFilterConditionData;
  /**
   * Parses filter value from string format
   * @param value - The string value to parse
   * @returns Parsed value as string or array of strings
   */
  private _parseFilterValue;
  /**
   * Creates TWorkItemFilterConditionData from property, operator and value
   * @param property - The filter property key
   * @param operator - The filter operator
   * @param value - The filter value
   * @returns The condition data object
   */
  private _createWorkItemFilterConditionData;
}
declare const workItemFiltersAdapter: WorkItemFiltersAdapter;
//#endregion
//#region src/utils/rich-filter.helper.d.ts
/**
 * Builds a temporary filter expression from conditions.
 * @param params.conditions - The conditions for building the filter expression.
 * @param params.adapter - The adapter for building the filter expression.
 * @returns The temporary filter expression.
 */
declare const buildTempFilterExpressionFromConditions: <P extends TFilterProperty, V extends TFilterValue, E extends TExternalFilter>(params: TBuildFilterExpressionParams<P, V, E>) => E | undefined;
//#endregion
//#region src/utils/work-item-filters.helper.d.ts
type TWorkItemFilterCondition = TFilterConditionForBuild<TWorkItemFilterProperty, TFilterValue>;
/**
 * Builds a work item filter expression from conditions.
 * @param params.conditions - The conditions for building the filter expression.
 * @returns The work item filter expression.
 */
declare const buildWorkItemFilterExpressionFromConditions: (params: Omit<TBuildFilterExpressionParams<TWorkItemFilterProperty, TFilterValue, TWorkItemFilterExpression>, "adapter">) => TWorkItemFilterExpression | undefined;
//#endregion
//#region src/store/work-item-filters/shared.d.ts
type TWorkItemFilterKey = `${EIssuesStoreType}-${string}`;
type IWorkItemFilterInstance = IFilterInstance<TWorkItemFilterProperty, TWorkItemFilterExpression>;
//#endregion
//#region src/store/work-item-filters/filter.store.d.ts
type TGetOrCreateFilterParams = {
  showOnMount?: boolean;
  entityId: string;
  entityType: EIssuesStoreType;
  expressionOptions?: TExpressionOptions<TWorkItemFilterExpression>;
  initialExpression?: TWorkItemFilterExpression;
  onExpressionChange?: (expression: TWorkItemFilterExpression) => void;
};
interface IWorkItemFilterStore {
  filters: Map<TWorkItemFilterKey, IWorkItemFilterInstance>;
  getFilter: (entityType: EIssuesStoreType, entityId: string) => IWorkItemFilterInstance | undefined;
  getOrCreateFilter: (params: TGetOrCreateFilterParams) => IWorkItemFilterInstance;
  resetExpression: (entityType: EIssuesStoreType, entityId: string, expression: TWorkItemFilterExpression) => void;
  updateFilterExpressionFromConditions: (entityType: EIssuesStoreType, entityId: string, conditions: TWorkItemFilterCondition[], fallbackFn: (expression: TWorkItemFilterExpression) => Promise<void>) => Promise<void>;
  updateFilterValueFromSidebar: (entityType: EIssuesStoreType, entityId: string, condition: TWorkItemFilterCondition) => void;
  deleteFilter: (entityType: EIssuesStoreType, entityId: string) => void;
}
declare class WorkItemFilterStore implements IWorkItemFilterStore {
  filters: IWorkItemFilterStore["filters"];
  constructor();
  /**
   * Returns a filter instance.
   * @param entityType - The entity type.
   * @param entityId - The entity id.
   * @returns The filter instance.
   */
  getFilter: IWorkItemFilterStore["getFilter"];
  /**
   * Gets or creates a new filter instance.
   * If the instance already exists, updates its expression options to ensure they're current.
   */
  getOrCreateFilter: IWorkItemFilterStore["getOrCreateFilter"];
  /**
   * Resets the initial expression for a filter instance.
   * @param entityType - The entity type.
   * @param entityId - The entity id.
   * @param expression - The expression to update.
   */
  resetExpression: IWorkItemFilterStore["resetExpression"];
  /**
   * Updates the filter expression from conditions.
   * @param entityType - The entity type.
   * @param entityId - The entity id.
   * @param conditions - The conditions to update.
   * @param fallbackFn - The fallback function to update the expression if the filter instance does not exist.
   */
  updateFilterExpressionFromConditions: IWorkItemFilterStore["updateFilterExpressionFromConditions"];
  /**
   * Handles sidebar filter updates by adding new conditions or updating existing ones.
   * This method processes filter conditions from the sidebar UI and applies them to the
   * appropriate filter instance, handling both positive and negative operators correctly.
   *
   * @param entityType - The entity type (e.g., project, cycle, module)
   * @param entityId - The unique identifier for the entity
   * @param condition - The filter condition containing property, operator, and value
   */
  updateFilterValueFromSidebar: IWorkItemFilterStore["updateFilterValueFromSidebar"];
  /**
   * Deletes a filter instance.
   * @param entityType - The entity type.
   * @param entityId - The entity id.
   */
  deleteFilter: IWorkItemFilterStore["deleteFilter"];
  /**
   * Returns a filter key.
   * @param entityType - The entity type.
   * @param entityId - The entity id.s
   * @returns The filter key.
   */
  _getFilterKey: (entityType: EIssuesStoreType, entityId: string) => TWorkItemFilterKey;
  /**
   * Initializes a filter instance.
   * @param params - The parameters for the filter instance.
   * @returns The filter instance.
   */
  _initializeFilterInstance: (params: TGetOrCreateFilterParams) => FilterInstance<"state_group" | "priority" | "start_date" | "target_date" | "assignee_id" | "mention_id" | "created_by_id" | "subscriber_id" | "label_id" | "state_id" | "cycle_id" | "module_id" | "project_id" | "created_at" | "updated_at", TWorkItemFilterExpression>;
}
//#endregion
export { FilterAdapter, FilterInstance, IFilterInstance, IWorkItemFilterInstance, IWorkItemFilterStore, TWorkItemFilterCondition, TWorkItemFilterKey, WorkItemFilterStore, buildTempFilterExpressionFromConditions, buildWorkItemFilterExpressionFromConditions, workItemFiltersAdapter };
//# sourceMappingURL=index.d.ts.map