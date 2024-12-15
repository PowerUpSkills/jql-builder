import {
    OPERATOR_DESCRIPTIONS,
    QUOTED_FIELDS,
    DATE_FIELDS
  } from './constants';
  
  /**
   * Formats a single JQL condition
   * @param {Object} condition - The condition to format
   * @returns {string} Formatted JQL condition
   */
  export const formatCondition = (condition) => {
    if (!condition.value) return '';
    
    const { field, operator, value } = condition;
    
    // Handle IN and NOT IN operators
    if (['IN', 'NOT IN'].includes(operator)) {
      return `${field} ${operator} (${value})`;
    }
    
    // Handle fields that need quotes
    if (QUOTED_FIELDS.includes(field) && !value.includes('(')) {
      return `${field} ${operator} "${value}"`;
    }
    
    return `${field} ${operator} ${value}`;
  };
  
  /**
   * Generates complete JQL query from multiple conditions
   * @param {Array} conditions - Array of condition objects
   * @returns {string} Complete JQL query
   */
  export const generateJQLQuery = (conditions) => {
    return conditions
      .map((condition, index) => {
        const formattedCondition = formatCondition(condition);
        if (!formattedCondition) return '';
        if (index === 0) return formattedCondition;
        return `${condition.conjunction} ${formattedCondition}`;
      })
      .filter(Boolean)
      .join(' ');
  };
  
  /**
   * Generates human-readable explanation for a condition
   * @param {Object} condition - The condition to explain
   * @returns {string} Human-readable explanation
   */
  export const generateExplanation = (condition) => {
    if (!condition.value) {
      return `Looking for issues where ${condition.field} ${OPERATOR_DESCRIPTIONS[condition.operator]}...`;
    }
  
    let valueDisplay = condition.value;
    if (['IN', 'NOT IN'].includes(condition.operator)) {
      valueDisplay = condition.value.split(',').map(v => v.trim()).join(' or ');
    }
  
    // Special handling for date fields
    if (DATE_FIELDS.includes(condition.field)) {
      return `${condition.field} date ${OPERATOR_DESCRIPTIONS[condition.operator]} ${valueDisplay}`;
    }
  
    return `${condition.field} ${OPERATOR_DESCRIPTIONS[condition.operator]} ${valueDisplay}`;
  };
  
  /**
   * Combines multiple condition explanations
   * @param {Array} conditions - Array of condition objects
   * @returns {string} Combined explanation
   */
  export const getCombinedExplanation = (conditions) => {
    if (!conditions.some(c => c.value)) {
      return "Start building your filter by selecting criteria above";
    }
  
    return conditions
      .filter(c => c.value)
      .map((condition, index) => {
        const explanation = generateExplanation(condition);
        if (index === 0) return `Find issues where ${explanation}`;
        return `${condition.conjunction.toLowerCase()} ${explanation}`;
      })
      .join(' ');
  };