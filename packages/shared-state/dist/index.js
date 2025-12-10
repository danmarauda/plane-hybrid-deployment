import { cloneDeep, isEmpty, isEqual, set } from "lodash-es";
import { action, computed, makeObservable, observable, runInAction, toJS } from "mobx";
import { computedFn } from "mobx-utils";
import { v4 } from "uuid";
import { DEFAULT_FILTER_CONFIG_OPTIONS, DEFAULT_FILTER_EXPRESSION_OPTIONS, DEFAULT_FILTER_VISIBILITY_OPTIONS, EMPTY_OPERATOR_LABEL } from "@plane/constants";
import { FILTER_FIELD_TYPE, FILTER_NODE_TYPE, LOGICAL_OPERATOR, MULTI_VALUE_OPERATORS, WORK_ITEM_FILTER_PROPERTY_KEYS } from "@plane/types";
import { addAndCondition, createAndGroupNode, createConditionNode, deepCompareFilterExpressions, extractConditions, extractConditionsWithDisplayOperators, findConditionsByPropertyAndOperator, findNodeById, getDateOperatorLabel, getOperatorForPayload, getOperatorLabel, hasValidValue, isAndGroupNode, isConditionNode, isDateFilterOperator, isDateFilterType, removeNodeFromExpression, sanitizeAndStabilizeExpression, shouldNotifyChangeForExpression, updateNodeInExpression } from "@plane/utils";

//#region src/store/rich-filters/adapter.ts
/**
* Abstract base class for converting between external filter formats and internal filter expressions.
* Provides common utilities for creating and manipulating filter nodes.
*
* @template K - Property key type that extends TFilterProperty
* @template E - External filter type that extends TExternalFilter
*/
var FilterAdapter = class {};

//#endregion
//#region src/store/rich-filters/config.ts
var FilterConfig = class {
	id;
	label;
	icon;
	isEnabled;
	supportedOperatorConfigsMap;
	allowMultipleFilters;
	/**
	* Creates a new FilterConfig instance.
	* @param params - The parameters for the filter config.
	*/
	constructor(params) {
		this.id = params.id;
		this.label = params.label;
		this.icon = params.icon;
		this.isEnabled = params.isEnabled;
		this.supportedOperatorConfigsMap = params.supportedOperatorConfigsMap;
		this.allowMultipleFilters = params.allowMultipleFilters;
		makeObservable(this, {
			id: observable,
			label: observable,
			icon: observable,
			isEnabled: observable,
			supportedOperatorConfigsMap: observable,
			allowMultipleFilters: observable,
			allEnabledSupportedOperators: computed,
			firstOperator: computed,
			mutate: action
		});
	}
	/**
	* Returns all supported operators.
	* @returns All supported operators.
	*/
	get allEnabledSupportedOperators() {
		return Array.from(this.supportedOperatorConfigsMap.entries()).filter(([, operatorConfig]) => operatorConfig.isOperatorEnabled).map(([operator]) => operator);
	}
	/**
	* Returns the first operator.
	* @returns The first operator.
	*/
	get firstOperator() {
		return this.allEnabledSupportedOperators[0];
	}
	/**
	* Returns the operator config.
	* @param operator - The operator.
	* @returns The operator config.
	*/
	getOperatorConfig = computedFn((operator) => this.supportedOperatorConfigsMap.get(getOperatorForPayload(operator).operator));
	/**
	* Returns the label for an operator.
	* @param operator - The operator.
	* @returns The label for the operator.
	*/
	getLabelForOperator = computedFn((operator) => {
		if (!operator) return EMPTY_OPERATOR_LABEL;
		const operatorConfig = this.getOperatorConfig(operator);
		if (operatorConfig?.operatorLabel) return operatorConfig.operatorLabel;
		if (operatorConfig?.type && isDateFilterType(operatorConfig.type) && isDateFilterOperator(operator)) return getDateOperatorLabel(operator);
		return getOperatorLabel(operator);
	});
	/**
	* Returns the operator for a value.
	* @param value - The value.
	* @returns The operator for the value.
	*/
	getDisplayOperatorByValue = computedFn((operator, value) => {
		const operatorConfig = this.getOperatorConfig(operator);
		if (operatorConfig?.type === FILTER_FIELD_TYPE.MULTI_SELECT && (Array.isArray(value) ? value.length : 0) <= 1) return operatorConfig.singleValueOperator;
		return operator;
	});
	/**
	* Returns all supported operator options for display in the filter UI.
	* This method filters out operators that are already applied (unless multiple filters are allowed)
	* and includes both positive and negative variants when supported.
	*
	* @param value - The current filter value used to determine the appropriate operator variant
	* @returns Array of operator options with their display labels and values
	*/
	getAllDisplayOperatorOptionsByValue = computedFn((value) => {
		const operatorOptions = [];
		for (const operator of this.allEnabledSupportedOperators) {
			const displayOperator = this.getDisplayOperatorByValue(operator, value);
			const displayOperatorLabel = this.getLabelForOperator(displayOperator);
			operatorOptions.push({
				value: operator,
				label: displayOperatorLabel
			});
			const additionalOperatorOption = this._getAdditionalOperatorOptions(operator, value);
			if (additionalOperatorOption) operatorOptions.push(additionalOperatorOption);
		}
		return operatorOptions;
	});
	/**
	* Mutates the config.
	* @param updates - The updates to apply to the config.
	*/
	mutate = action((updates) => {
		runInAction(() => {
			for (const key in updates) if (updates.hasOwnProperty(key)) {
				const configKey = key;
				set(this, configKey, updates[configKey]);
			}
		});
	});
	_getAdditionalOperatorOptions = (_operator, _value) => void 0;
};

//#endregion
//#region src/store/rich-filters/config-manager.ts
/**
* Manages filter configurations for a filter instance.
* Handles registration, updates, and retrieval of filter configurations.
* Provides computed properties for available configurations based on current filter state.
*
* @template P - The filter property type extending TFilterProperty
* @template V - The filter value type extending TFilterValue
* @template E - The external filter type extending TExternalFilter
*/
var FilterConfigManager = class {
	filterConfigs;
	configOptions;
	areConfigsReady;
	_filterInstance;
	/**
	* Creates a new FilterConfigManager instance.
	*
	* @param filterInstance - The parent filter instance this manager belongs to
	* @param params - Configuration parameters for the manager
	*/
	constructor(filterInstance, params) {
		this.filterConfigs = /* @__PURE__ */ new Map();
		this.configOptions = this._initializeConfigOptions(params.options);
		this.areConfigsReady = true;
		this._filterInstance = filterInstance;
		makeObservable(this, {
			filterConfigs: observable,
			configOptions: observable,
			areConfigsReady: observable,
			allAvailableConfigs: computed,
			register: action,
			registerAll: action,
			updateConfigByProperty: action,
			setAreConfigsReady: action
		});
	}
	/**
	* Returns all available filterConfigs.
	* If allowSameFilters is true, all enabled configs are returned.
	* Otherwise, only configs that are not already applied to the filter instance are returned.
	* @returns All available filterConfigs.
	*/
	get allAvailableConfigs() {
		const appliedProperties = new Set(this._filterInstance.allConditions.map((condition) => condition.property));
		return this._allEnabledConfigs.filter((config) => config.allowMultipleFilters || !appliedProperties.has(config.id));
	}
	/**
	* Returns a config by filter property.
	* @param property - The property to get the config for.
	* @returns The config for the property, or undefined if not found.
	*/
	getConfigByProperty = computedFn((property) => this.filterConfigs.get(property));
	/**
	* Register a config.
	* If a config with the same property already exists, it will be updated with the new values.
	* Otherwise, a new config will be created.
	* @param configUpdates - The config updates to register.
	*/
	register = action((configUpdates) => {
		if (this.filterConfigs.has(configUpdates.id)) this.filterConfigs.get(configUpdates.id).mutate(configUpdates);
		else this.filterConfigs.set(configUpdates.id, new FilterConfig(configUpdates));
	});
	/**
	* Register all configs.
	* @param configs - The configs to register.
	*/
	registerAll = action((configs) => {
		configs.forEach((config) => this.register(config));
	});
	/**
	* Updates a config by filter property.
	* @param property - The property of the config to update.
	* @param configUpdates - The updates to apply to the config.
	*/
	updateConfigByProperty = action((property, configUpdates) => {
		this.filterConfigs.get(property)?.mutate(configUpdates);
	});
	/**
	* Updates the configs ready state.
	* @param value - The new configs ready state.
	*/
	setAreConfigsReady = action((value) => {
		this.areConfigsReady = value;
	});
	get _allConfigs() {
		return Array.from(this.filterConfigs.values());
	}
	/**
	* Returns all enabled filterConfigs.
	* @returns All enabled filterConfigs.
	*/
	get _allEnabledConfigs() {
		return this._allConfigs.filter((config) => config.isEnabled);
	}
	/**
	* Initializes the config options.
	* @param options - The options to initialize the config options with.
	* @returns The initialized config options.
	*/
	_initializeConfigOptions(options) {
		return DEFAULT_FILTER_CONFIG_OPTIONS ? {
			...DEFAULT_FILTER_CONFIG_OPTIONS,
			...options
		} : options || {};
	}
};

//#endregion
//#region src/store/rich-filters/filter-helpers.ts
/**
* Comprehensive helper class for filter instance operations.
* Provides utilities for filter expression manipulation, node operations,
* operator transformations, and expression restructuring.
*
* @template K - The filter property type extending TFilterProperty
* @template E - The external filter type extending TExternalFilter
*/
var FilterInstanceHelper = class {
	_filterInstance;
	adapter;
	isVisible;
	/**
	* Creates a new FilterInstanceHelper instance.
	*
	* @param adapter - The filter adapter for converting between internal and external formats
	*/
	constructor(filterInstance, params) {
		this._filterInstance = filterInstance;
		this.adapter = params.adapter;
		this.isVisible = false;
		makeObservable(this, {
			isVisible: observable,
			setInitialVisibility: action,
			toggleVisibility: action
		});
	}
	/**
	* Initializes the filter expression from external format.
	* @param initialExpression - The initial expression to initialize the filter with
	* @returns The initialized filter expression or null if no initial expression provided
	*/
	initializeExpression = (initialExpression) => {
		if (!initialExpression) return null;
		return this.adapter.toInternal(toJS(cloneDeep(initialExpression)));
	};
	/**
	* Initializes the filter expression options with defaults.
	* @param expressionOptions - Optional expression options to override defaults
	* @returns The initialized filter expression options
	*/
	initializeExpressionOptions = (expressionOptions) => ({
		...DEFAULT_FILTER_EXPRESSION_OPTIONS,
		...expressionOptions
	});
	/**
	* Sets the initial visibility state for the filter based on options and active filters.
	* @param visibilityOption - The visibility options for the filter instance.
	* @returns The initial visibility state
	*/
	setInitialVisibility = action((visibilityOption) => {
		if (visibilityOption.autoSetVisibility === false) {
			this.isVisible = visibilityOption.isVisibleOnMount;
			return;
		}
		if (this._filterInstance.hasActiveFilters) {
			this.isVisible = true;
			return;
		}
		this.isVisible = false;
	});
	/**
	* Toggles the visibility of the filter.
	* @param isVisible - The visibility to set.
	*/
	toggleVisibility = action((isVisible) => {
		if (isVisible !== void 0) {
			this.isVisible = isVisible;
			return;
		}
		this.isVisible = !this.isVisible;
	});
	/**
	* Adds a condition to the filter expression based on the logical operator.
	* @param expression - The current filter expression
	* @param groupOperator - The logical operator to use for the condition
	* @param condition - The condition to add
	* @param isNegation - Whether the condition should be negated
	* @returns The updated filter expression
	*/
	addConditionToExpression = (expression, groupOperator, condition, isNegation) => this._addConditionByOperator(expression, groupOperator, this._getConditionPayloadToAdd(condition, isNegation));
	/**
	* Updates the property and operator of a condition in the filter expression.
	* This method updates the property, operator, resets the value, and handles negation properly.
	* @param expression - The filter expression to operate on
	* @param conditionId - The ID of the condition being updated
	* @param property - The new property for the condition
	* @param operator - The new operator for the condition
	* @param isNegation - Whether the condition should be negated
	* @returns The updated expression
	*/
	handleConditionPropertyUpdate = (expression, conditionId, property, operator, isNegation) => {
		const payload = {
			property,
			operator,
			value: void 0
		};
		return this._updateCondition(expression, conditionId, payload, isNegation);
	};
	/**
	* Restructures the expression when a condition's operator changes between positive and negative.
	* @param expression - The filter expression to operate on
	* @param conditionId - The ID of the condition being updated
	* @param newOperator - The new operator for the condition
	* @param isNegation - Whether the operator is negation
	* @param shouldResetValue - Whether to reset the condition value
	* @returns The restructured expression
	*/
	restructureExpressionForOperatorChange = (expression, conditionId, newOperator, isNegation, shouldResetValue) => {
		const payload = shouldResetValue ? {
			operator: newOperator,
			value: void 0
		} : { operator: newOperator };
		return this._updateCondition(expression, conditionId, payload, isNegation);
	};
	/**
	* Gets the condition payload to add to the expression.
	* @param conditionNode - The condition node to add
	* @param isNegation - Whether the condition should be negated
	* @returns The condition payload to add
	*/
	_getConditionPayloadToAdd = (condition, _isNegation) => {
		return createConditionNode(condition);
	};
	/**
	* Handles the logical operator switch for adding conditions.
	* @param expression - The current expression
	* @param groupOperator - The logical operator
	* @param conditionToAdd - The condition to add
	* @returns The updated expression
	*/
	_addConditionByOperator(expression, groupOperator, conditionToAdd) {
		switch (groupOperator) {
			case LOGICAL_OPERATOR.AND: return addAndCondition(expression, conditionToAdd);
			default:
				console.warn(`Unsupported logical operator: ${groupOperator}`);
				return expression;
		}
	}
	/**
	* Updates a condition with the given payload and handles negation wrapping/unwrapping.
	* @param expression - The filter expression to operate on
	* @param conditionId - The ID of the condition being updated
	* @param payload - The payload to update the condition with
	* @param isNegation - Whether the condition should be negated
	* @returns The updated expression with proper negation handling
	*/
	_updateCondition = (expression, conditionId, payload, _isNegation) => {
		updateNodeInExpression(expression, conditionId, payload);
		return expression;
	};
};

//#endregion
//#region src/store/rich-filters/filter.ts
var FilterInstance = class {
	id;
	initialFilterExpression;
	expression;
	expressionOptions;
	adapter;
	configManager;
	onExpressionChange;
	helper;
	constructor(params) {
		this.id = v4();
		this.adapter = params.adapter;
		this.helper = new FilterInstanceHelper(this, { adapter: this.adapter });
		this.configManager = new FilterConfigManager(this, { options: params.options?.config });
		const initialExpression = this.helper.initializeExpression(params.initialExpression);
		this.initialFilterExpression = cloneDeep(initialExpression);
		this.expression = cloneDeep(initialExpression);
		this.expressionOptions = this.helper.initializeExpressionOptions(params.options?.expression);
		this.onExpressionChange = params.onExpressionChange;
		this.helper.setInitialVisibility(params.options?.visibility ?? DEFAULT_FILTER_VISIBILITY_OPTIONS);
		makeObservable(this, {
			id: observable,
			initialFilterExpression: observable,
			expression: observable,
			expressionOptions: observable.struct,
			adapter: observable,
			configManager: observable,
			hasActiveFilters: computed,
			hasChanges: computed,
			isVisible: computed,
			allConditions: computed,
			allConditionsForDisplay: computed,
			clearFilterOptions: computed,
			saveViewOptions: computed,
			updateViewOptions: computed,
			canClearFilters: computed,
			canSaveView: computed,
			canUpdateView: computed,
			resetExpression: action,
			findConditionsByPropertyAndOperator: action,
			findFirstConditionByPropertyAndOperator: action,
			addCondition: action,
			updateConditionOperator: action,
			updateConditionValue: action,
			removeCondition: action,
			clearFilters: action,
			saveView: action,
			updateView: action,
			updateExpressionOptions: action
		});
	}
	/**
	* Checks if the filter instance has any active filters.
	* @returns True if the filter instance has any active filters, false otherwise.
	*/
	get hasActiveFilters() {
		if (!this.expression) return false;
		if (this.allConditionsForDisplay.length === 0) return false;
		return this.allConditionsForDisplay.some((condition) => hasValidValue(condition.value));
	}
	/**
	* Checks if the filter instance has any changes with respect to the initial expression.
	* @returns True if the filter instance has any changes, false otherwise.
	*/
	get hasChanges() {
		return !deepCompareFilterExpressions(this.initialFilterExpression, this.expression);
	}
	/**
	* Returns the visibility of the filter instance.
	* @returns The visibility of the filter instance.
	*/
	get isVisible() {
		return this.helper.isVisible;
	}
	/**
	* Returns all conditions from the filter expression.
	* @returns An array of filter conditions.
	*/
	get allConditions() {
		if (!this.expression) return [];
		return extractConditions(this.expression);
	}
	/**
	* Returns all conditions in the filter expression for display purposes.
	* @returns An array of filter conditions for display purposes.
	*/
	get allConditionsForDisplay() {
		if (!this.expression) return [];
		return extractConditionsWithDisplayOperators(this.expression);
	}
	/**
	* Returns the clear filter options.
	* @returns The clear filter options.
	*/
	get clearFilterOptions() {
		return this.expressionOptions.clearFilterOptions;
	}
	/**
	* Returns the save view options.
	* @returns The save view options.
	*/
	get saveViewOptions() {
		return this.expressionOptions.saveViewOptions;
	}
	/**
	* Returns the update view options.
	* @returns The update view options.
	*/
	get updateViewOptions() {
		return this.expressionOptions.updateViewOptions;
	}
	/**
	* Checks if the filter expression can be cleared.
	* @returns True if the filter expression can be cleared, false otherwise.
	*/
	get canClearFilters() {
		if (!this.expression) return false;
		if (this.allConditionsForDisplay.length === 0) return false;
		return this.clearFilterOptions ? !this.clearFilterOptions.isDisabled : true;
	}
	/**
	* Checks if the filter expression can be saved as a view.
	* @returns True if the filter instance can be saved, false otherwise.
	*/
	get canSaveView() {
		return this.hasActiveFilters && !!this.saveViewOptions && !this.saveViewOptions.isDisabled;
	}
	/**
	* Checks if the filter expression can be updated as a view.
	* @returns True if the filter expression can be updated, false otherwise.
	*/
	get canUpdateView() {
		return !!this.updateViewOptions && (this.hasChanges || !!this.updateViewOptions.hasAdditionalChanges) && !this.updateViewOptions.isDisabled;
	}
	/**
	* Toggles the visibility of the filter instance.
	* @param isVisible - The visibility to set.
	*/
	toggleVisibility = action((isVisible) => {
		this.helper.toggleVisibility(isVisible);
	});
	/**
	* Resets the filter expression to the initial expression.
	* @param externalExpression - The external expression to reset to.
	*/
	resetExpression = action((externalExpression, shouldResetInitialExpression = true) => {
		this.expression = this.helper.initializeExpression(externalExpression);
		if (shouldResetInitialExpression) this._resetInitialFilterExpression();
		this._notifyExpressionChange();
	});
	/**
	* Finds all conditions by property and operator.
	* @param property - The property to find the conditions by.
	* @param operator - The operator to find the conditions by.
	* @returns All the conditions that match the property and operator.
	*/
	findConditionsByPropertyAndOperator = action((property, operator) => {
		if (!this.expression) return [];
		return findConditionsByPropertyAndOperator(this.expression, property, operator);
	});
	/**
	* Finds the first condition by property and operator.
	* @param property - The property to find the condition by.
	* @param operator - The operator to find the condition by.
	* @returns The first condition that matches the property and operator.
	*/
	findFirstConditionByPropertyAndOperator = action((property, operator) => {
		if (!this.expression) return void 0;
		return findConditionsByPropertyAndOperator(this.expression, property, operator)[0];
	});
	/**
	* Adds a condition to the filter expression.
	* @param groupOperator - The logical operator to use for the condition.
	* @param condition - The condition to add.
	* @param isNegation - Whether the condition should be negated.
	*/
	addCondition = action((groupOperator, condition, isNegation = false) => {
		const conditionValue = condition.value;
		this.expression = this.helper.addConditionToExpression(this.expression, groupOperator, condition, isNegation);
		if (hasValidValue(conditionValue)) this._notifyExpressionChange();
	});
	/**
	* Updates the property of a condition in the filter expression.
	* @param conditionId - The id of the condition to update.
	* @param property - The new property for the condition.
	*/
	updateConditionProperty = action((conditionId, property, operator, isNegation) => {
		if (!this.expression) return;
		const conditionBeforeUpdate = cloneDeep(findNodeById(this.expression, conditionId));
		if (!conditionBeforeUpdate || conditionBeforeUpdate.type !== FILTER_NODE_TYPE.CONDITION) return;
		const updatedExpression = this.helper.handleConditionPropertyUpdate(this.expression, conditionId, property, operator, isNegation);
		if (updatedExpression) {
			this.expression = updatedExpression;
			this._notifyExpressionChange();
		}
	});
	/**
	* Updates the operator of a condition in the filter expression.
	* @param conditionId - The id of the condition to update.
	* @param operator - The new operator for the condition.
	*/
	updateConditionOperator = action((conditionId, operator, isNegation) => {
		if (!this.expression) return;
		const conditionBeforeUpdate = cloneDeep(findNodeById(this.expression, conditionId));
		if (!conditionBeforeUpdate || conditionBeforeUpdate.type !== FILTER_NODE_TYPE.CONDITION) return;
		const currentOperatorConfig = this.configManager.getConfigByProperty(conditionBeforeUpdate.property)?.getOperatorConfig(conditionBeforeUpdate.operator);
		const newOperatorConfig = this.configManager.getConfigByProperty(conditionBeforeUpdate.property)?.getOperatorConfig(operator);
		const shouldResetConditionValue = currentOperatorConfig?.type !== newOperatorConfig?.type;
		const updatedExpression = this.helper.restructureExpressionForOperatorChange(this.expression, conditionId, operator, isNegation, shouldResetConditionValue);
		if (updatedExpression) this.expression = updatedExpression;
		if (hasValidValue(conditionBeforeUpdate.value)) this._notifyExpressionChange();
	});
	/**
	* Updates the value of a condition in the filter expression with automatic optimization.
	* @param conditionId - The id of the condition to update.
	* @param value - The new value for the condition.
	*/
	updateConditionValue = action((conditionId, value) => {
		if (!this.expression) return;
		const conditionBeforeUpdate = cloneDeep(findNodeById(this.expression, conditionId));
		if (!conditionBeforeUpdate || conditionBeforeUpdate.type !== FILTER_NODE_TYPE.CONDITION) return;
		if (!hasValidValue(value)) {
			this.removeCondition(conditionId);
			return;
		}
		if (isEqual(conditionBeforeUpdate.value, value)) return;
		updateNodeInExpression(this.expression, conditionId, { value });
		this._notifyExpressionChange();
	});
	/**
	* Removes a condition from the filter expression.
	* @param conditionId - The id of the condition to remove.
	*/
	removeCondition = action((conditionId) => {
		if (!this.expression) return;
		const { expression, shouldNotify } = removeNodeFromExpression(this.expression, conditionId);
		this.expression = expression;
		if (shouldNotify) this._notifyExpressionChange();
	});
	/**
	* Clears the filter expression.
	*/
	clearFilters = action(async () => {
		if (this.canClearFilters) {
			const shouldNotify = shouldNotifyChangeForExpression(this.expression);
			this.expression = null;
			await this.clearFilterOptions?.onFilterClear();
			if (shouldNotify) this._notifyExpressionChange();
		} else console.warn("Cannot clear filters: invalid expression or missing options.");
	});
	/**
	* Saves the filter expression.
	*/
	saveView = action(async () => {
		if (this.canSaveView && this.saveViewOptions) await this.saveViewOptions.onViewSave(this._getExternalExpression());
		else console.warn("Cannot save view: invalid expression or missing options.");
	});
	/**
	* Updates the filter expression.
	*/
	updateView = action(async () => {
		if (this.canUpdateView && this.updateViewOptions) {
			await this.updateViewOptions.onViewUpdate(this._getExternalExpression());
			this._resetInitialFilterExpression();
		} else console.warn("Cannot update view: invalid expression or missing options.");
	});
	/**
	* Updates the expression options for the filter instance.
	* This allows dynamic updates to options like isDisabled properties.
	*/
	updateExpressionOptions = action((newOptions) => {
		this.expressionOptions = {
			...this.expressionOptions,
			...newOptions
		};
	});
	/**
	* Resets the initial filter expression to the current expression.
	*/
	_resetInitialFilterExpression() {
		this.initialFilterExpression = cloneDeep(this.expression);
	}
	/**
	* Returns the external filter representation of the filter instance.
	* @returns The external filter representation of the filter instance.
	*/
	_getExternalExpression = computedFn(() => this.adapter.toExternal(sanitizeAndStabilizeExpression(toJS(this.expression))));
	/**
	* Notifies the parent component of the expression change.
	*/
	_notifyExpressionChange() {
		this.onExpressionChange?.(this._getExternalExpression());
	}
};

//#endregion
//#region src/store/work-item-filters/adapter.ts
var WorkItemFiltersAdapter = class extends FilterAdapter {
	/**
	* Converts external work item filter expression to internal filter tree
	* @param externalFilter - The external filter expression
	* @returns Internal filter expression or null
	*/
	toInternal(externalFilter) {
		if (!externalFilter || isEmpty(externalFilter)) return null;
		try {
			return this._convertExpressionToInternal(externalFilter);
		} catch (error) {
			console.error("Failed to convert external filter to internal:", error);
			return null;
		}
	}
	/**
	* Recursively converts external expression data to internal filter tree
	* @param expression - The external expression data
	* @returns Internal filter expression
	*/
	_convertExpressionToInternal(expression) {
		if (!expression || isEmpty(expression)) throw new Error("Invalid expression: empty or null data");
		if (this._isWorkItemFilterConditionData(expression)) {
			const conditionResult = this._extractWorkItemFilterConditionData(expression);
			if (!conditionResult) throw new Error("Failed to extract condition data");
			const [property, operator, value] = conditionResult;
			return createConditionNode({
				property,
				operator,
				value
			});
		}
		const expressionKeys = Object.keys(expression);
		if (LOGICAL_OPERATOR.AND in expression) {
			const andConditions = expression[LOGICAL_OPERATOR.AND];
			if (!Array.isArray(andConditions) || andConditions.length === 0) throw new Error("AND group must contain at least one condition");
			return createAndGroupNode(andConditions.map((item) => this._convertExpressionToInternal(item)));
		}
		throw new Error(`Invalid expression: unknown structure with keys [${expressionKeys.join(", ")}]`);
	}
	/**
	* Converts internal filter expression to external format
	* @param internalFilter - The internal filter expression
	* @returns External filter expression
	*/
	toExternal(internalFilter) {
		if (!internalFilter) return {};
		try {
			return this._convertExpressionToExternal(internalFilter);
		} catch (error) {
			console.error("Failed to convert internal filter to external:", error);
			return {};
		}
	}
	/**
	* Recursively converts internal expression to external format
	* @param expression - The internal filter expression
	* @returns External expression data
	*/
	_convertExpressionToExternal(expression) {
		if (isConditionNode(expression)) return this._createWorkItemFilterConditionData(expression.property, expression.operator, expression.value);
		if (isAndGroupNode(expression)) return { [LOGICAL_OPERATOR.AND]: expression.children.map((child) => this._convertExpressionToExternal(child)) };
		throw new Error(`Unknown group node type for expression`);
	}
	/**
	* Type guard to check if data is of type TWorkItemFilterConditionData
	* @param data - The data to check
	* @returns True if data is TWorkItemFilterConditionData, false otherwise
	*/
	_isWorkItemFilterConditionData = (data) => {
		if (!data || typeof data !== "object" || isEmpty(data)) return false;
		const keys = Object.keys(data);
		if (keys.length === 0) return false;
		if (keys.some((key) => key === LOGICAL_OPERATOR.AND)) return false;
		return keys.every((key) => this._isValidWorkItemFilterConditionKey(key));
	};
	/**
	* Validates if a key is a valid work item filter condition key
	* @param key - The key to validate
	* @returns True if the key is valid
	*/
	_isValidWorkItemFilterConditionKey = (key) => {
		if (typeof key !== "string" || key.length === 0) return false;
		const lastDoubleUnderscoreIndex = key.lastIndexOf("__");
		if (lastDoubleUnderscoreIndex === -1 || lastDoubleUnderscoreIndex === 0 || lastDoubleUnderscoreIndex === key.length - 2) return false;
		const property = key.substring(0, lastDoubleUnderscoreIndex);
		const operator = key.substring(lastDoubleUnderscoreIndex + 2);
		if (!WORK_ITEM_FILTER_PROPERTY_KEYS.includes(property) && !property.startsWith("customproperty_")) return false;
		return operator.length > 0;
	};
	/**
	* Extracts property, operator and value from work item filter condition data
	* @param data - The condition data
	* @returns Tuple of property, operator and value, or null if invalid
	*/
	_extractWorkItemFilterConditionData = (data) => {
		const keys = Object.keys(data);
		if (keys.length !== 1) {
			console.error("Work item filter condition data must have exactly one key");
			return null;
		}
		const key = keys[0];
		if (!this._isValidWorkItemFilterConditionKey(key)) {
			console.error(`Invalid work item filter condition key: ${key}`);
			return null;
		}
		const lastDoubleUnderscoreIndex = key.lastIndexOf("__");
		const property = key.substring(0, lastDoubleUnderscoreIndex);
		const operator = key.substring(lastDoubleUnderscoreIndex + 2);
		const rawValue = data[key];
		return [
			property,
			operator,
			MULTI_VALUE_OPERATORS.includes(operator) ? this._parseFilterValue(rawValue) : rawValue
		];
	};
	/**
	* Parses filter value from string format
	* @param value - The string value to parse
	* @returns Parsed value as string or array of strings
	*/
	_parseFilterValue = (value) => {
		if (!value) return value;
		if (typeof value !== "string") return value;
		if (value === "") return value;
		if (value.includes(",")) {
			const splitValues = value.split(",").map((v) => v.trim()).filter((v) => v.length > 0);
			return splitValues.length === 1 ? splitValues[0] : splitValues;
		}
		return value;
	};
	/**
	* Creates TWorkItemFilterConditionData from property, operator and value
	* @param property - The filter property key
	* @param operator - The filter operator
	* @param value - The filter value
	* @returns The condition data object
	*/
	_createWorkItemFilterConditionData = (property, operator, value) => {
		const conditionKey = `${property}__${operator}`;
		const stringValue = Array.isArray(value) ? value.join(",") : value;
		return { [conditionKey]: stringValue };
	};
};
const workItemFiltersAdapter = new WorkItemFiltersAdapter();

//#endregion
//#region src/utils/rich-filter.helper.ts
/**
* Builds a temporary filter expression from conditions.
* @param params.conditions - The conditions for building the filter expression.
* @param params.adapter - The adapter for building the filter expression.
* @returns The temporary filter expression.
*/
const buildTempFilterExpressionFromConditions = (params) => {
	const { conditions, adapter } = params;
	let tempExpression = void 0;
	const tempFilterInstance = new FilterInstance({
		adapter,
		onExpressionChange: (expression) => {
			tempExpression = expression;
		}
	});
	for (const condition of conditions) {
		const { operator, isNegation } = getOperatorForPayload(condition.operator);
		tempFilterInstance.addCondition(LOGICAL_OPERATOR.AND, {
			property: condition.property,
			operator,
			value: condition.value
		}, isNegation);
	}
	return tempExpression;
};

//#endregion
//#region src/utils/work-item-filters.helper.ts
/**
* Builds a work item filter expression from conditions.
* @param params.conditions - The conditions for building the filter expression.
* @returns The work item filter expression.
*/
const buildWorkItemFilterExpressionFromConditions = (params) => {
	const workItemFilterExpression = buildTempFilterExpressionFromConditions({
		...params,
		adapter: workItemFiltersAdapter
	});
	if (!workItemFilterExpression) console.error("Failed to build work item filter expression from conditions");
	return workItemFilterExpression;
};

//#endregion
//#region src/store/work-item-filters/filter.store.ts
var WorkItemFilterStore = class {
	filters;
	constructor() {
		this.filters = /* @__PURE__ */ new Map();
		makeObservable(this, {
			filters: observable,
			getOrCreateFilter: action,
			resetExpression: action,
			updateFilterExpressionFromConditions: action,
			deleteFilter: action
		});
	}
	/**
	* Returns a filter instance.
	* @param entityType - The entity type.
	* @param entityId - The entity id.
	* @returns The filter instance.
	*/
	getFilter = computedFn((entityType, entityId) => this.filters.get(this._getFilterKey(entityType, entityId)));
	/**
	* Gets or creates a new filter instance.
	* If the instance already exists, updates its expression options to ensure they're current.
	*/
	getOrCreateFilter = action((params) => {
		const existingFilter = this.getFilter(params.entityType, params.entityId);
		if (existingFilter) {
			if (params.expressionOptions) existingFilter.updateExpressionOptions(params.expressionOptions);
			if (params.onExpressionChange) existingFilter.onExpressionChange = params.onExpressionChange;
			if (params.showOnMount !== void 0) existingFilter.toggleVisibility(params.showOnMount);
			return existingFilter;
		}
		const newFilter = this._initializeFilterInstance(params);
		const filterKey = this._getFilterKey(params.entityType, params.entityId);
		this.filters.set(filterKey, newFilter);
		return newFilter;
	});
	/**
	* Resets the initial expression for a filter instance.
	* @param entityType - The entity type.
	* @param entityId - The entity id.
	* @param expression - The expression to update.
	*/
	resetExpression = action((entityType, entityId, expression) => {
		const filter = this.getFilter(entityType, entityId);
		if (filter) filter.resetExpression(expression);
	});
	/**
	* Updates the filter expression from conditions.
	* @param entityType - The entity type.
	* @param entityId - The entity id.
	* @param conditions - The conditions to update.
	* @param fallbackFn - The fallback function to update the expression if the filter instance does not exist.
	*/
	updateFilterExpressionFromConditions = action(async (entityType, entityId, conditions, fallbackFn) => {
		const filter = this.getFilter(entityType, entityId);
		const newFilterExpression = buildWorkItemFilterExpressionFromConditions({ conditions });
		if (!newFilterExpression) return;
		if (filter) filter.resetExpression(newFilterExpression, false);
		else await fallbackFn(newFilterExpression);
	});
	/**
	* Handles sidebar filter updates by adding new conditions or updating existing ones.
	* This method processes filter conditions from the sidebar UI and applies them to the
	* appropriate filter instance, handling both positive and negative operators correctly.
	*
	* @param entityType - The entity type (e.g., project, cycle, module)
	* @param entityId - The unique identifier for the entity
	* @param condition - The filter condition containing property, operator, and value
	*/
	updateFilterValueFromSidebar = action((entityType, entityId, condition) => {
		const filter = this.getFilter(entityType, entityId);
		if (!filter) {
			console.warn(`Cannot handle sidebar filters update: filter instance not found for entity type "${entityType}" with ID "${entityId}"`);
			return;
		}
		const conditionNode = filter.findFirstConditionByPropertyAndOperator(condition.property, condition.operator);
		if (!conditionNode) {
			const { operator, isNegation } = getOperatorForPayload(condition.operator);
			const conditionPayload = {
				property: condition.property,
				operator,
				value: condition.value
			};
			filter.addCondition(LOGICAL_OPERATOR.AND, conditionPayload, isNegation);
			return;
		}
		filter.updateConditionValue(conditionNode.id, condition.value);
	});
	/**
	* Deletes a filter instance.
	* @param entityType - The entity type.
	* @param entityId - The entity id.
	*/
	deleteFilter = action((entityType, entityId) => {
		this.filters.delete(this._getFilterKey(entityType, entityId));
	});
	/**
	* Returns a filter key.
	* @param entityType - The entity type.
	* @param entityId - The entity id.s
	* @returns The filter key.
	*/
	_getFilterKey = (entityType, entityId) => `${entityType}-${entityId}`;
	/**
	* Initializes a filter instance.
	* @param params - The parameters for the filter instance.
	* @returns The filter instance.
	*/
	_initializeFilterInstance = (params) => new FilterInstance({
		adapter: workItemFiltersAdapter,
		initialExpression: params.initialExpression,
		onExpressionChange: params.onExpressionChange,
		options: {
			expression: params.expressionOptions,
			visibility: params.showOnMount ? {
				autoSetVisibility: false,
				isVisibleOnMount: true
			} : { autoSetVisibility: true }
		}
	});
};

//#endregion
export { FilterAdapter, FilterInstance, WorkItemFilterStore, buildTempFilterExpressionFromConditions, buildWorkItemFilterExpressionFromConditions, workItemFiltersAdapter };
//# sourceMappingURL=index.js.map