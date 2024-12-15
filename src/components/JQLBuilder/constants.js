/**
 * Core JQL field options that users can filter by.
 * These represent the most commonly used JIRA fields.
 */
export const FIELDS = [
    'project',
    'issuetype',
    'status',
    'priority',
    'assignee',
    'reporter',
    'created',
    'updated',
    'labels',
    'component',
    'fixVersion',
    'duedate'
  ];
  
  /**
   * Standard JQL operators available for building conditions.
   * Listed in order of common usage frequency.
   */
  export const OPERATORS = [
    '=',      // Exact match
    '!=',     // Not equal
    '>',      // Greater than (dates)
    '>=',     // Greater than or equal
    '<',      // Less than (dates)
    '<=',     // Less than or equal
    'IN',     // Multiple value match
    'NOT IN', // Multiple value exclusion
    '~',      // Contains text
    '!~',     // Does not contain text
    'IS',     // Special values (EMPTY)
    'IS NOT'  // Not special values
  ];
  
  /**
   * Logical operators for combining multiple conditions.
   * These determine how multiple conditions are evaluated together.
   */
  export const CONJUNCTIONS = ['AND', 'OR'];
  
  /**
   * Human-readable descriptions for each operator.
   * Used to generate plain English explanations of queries.
   */
  export const OPERATOR_DESCRIPTIONS = {
    '=': 'exactly matches',
    '!=': 'does not match',
    '>': 'is after',
    '>=': 'is on or after',
    '<': 'is before',
    '<=': 'is on or before',
    'IN': 'is any of',
    'NOT IN': 'is not any of',
    '~': 'contains',
    '!~': 'does not contain',
    'IS': 'is',
    'IS NOT': 'is not'
  };
  
  /**
   * Fields that require quote marks around their values in JQL.
   * Text-based fields need proper escaping in the query.
   */
  export const QUOTED_FIELDS = [
    'project',
    'issuetype',
    'status',
    'priority',
    'assignee',
    'reporter',
    'labels',
    'component',
    'fixVersion'
  ];
  
  /**
   * Fields that handle date values.
   * These fields require special formatting and support relative date functions.
   */
  export const DATE_FIELDS = [
    'created',
    'updated',
    'duedate'
  ];
  
  /**
   * Common JQL functions that can be used in queries.
   * These provide dynamic value resolution.
   */
  export const JQL_FUNCTIONS = [
    'currentUser()',
    'startOfDay()',
    'endOfDay()',
    'startOfWeek()',
    'endOfWeek()',
    'startOfMonth()',
    'endOfMonth()'
  ];
  
  /**
   * Default structure for a new condition.
   * Used when adding new conditions to the query builder.
   */
  export const DEFAULT_CONDITION = {
    field: 'project',
    operator: '=',
    value: '',
    conjunction: 'AND'
  };
  
  /**
   * Example values for different field types.
   * Helps users understand expected input formats.
   */
  export const FIELD_EXAMPLES = {
    project: 'PROJ',
    issuetype: 'Bug',
    status: 'In Progress',
    priority: 'High',
    assignee: 'currentUser()',
    created: 'startOfDay(-7d)',
    labels: 'frontend',
    component: 'API',
    fixVersion: '2.0'
  };