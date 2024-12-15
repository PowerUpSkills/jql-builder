import React, { useState } from 'react';
import {
  FIELDS,
  OPERATORS,
  CONJUNCTIONS,
  DEFAULT_CONDITION
} from './constants';
import {
  generateJQLQuery,
  getCombinedExplanation
} from './utils';

const JQLBuilder = () => {
  const [conditions, setConditions] = useState([{ ...DEFAULT_CONDITION, id: 1 }]);

  const updateCondition = (id, field, value) => {
    setConditions(conditions.map(condition => 
      condition.id === id ? { ...condition, [field]: value } : condition
    ));
  };

  const addCondition = () => {
    const newId = Math.max(...conditions.map(c => c.id)) + 1;
    setConditions([...conditions, { ...DEFAULT_CONDITION, id: newId }]);
  };

  const removeCondition = (id) => {
    if (conditions.length > 1) {
      setConditions(conditions.filter(condition => condition.id !== id));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">JQL Query Builder</h2>
        <button 
          onClick={addCondition}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Add Condition
        </button>
      </div>

      {/* Plain English Explanation */}
      <div className="mb-6 bg-green-50 p-4 rounded border border-green-200">
        <h3 className="text-lg font-medium mb-2 text-green-800">What this filter does:</h3>
        <p className="text-green-700">
          {getCombinedExplanation(conditions)}
        </p>
      </div>

      {/* Conditions Builder */}
      <div className="space-y-4">
        {conditions.map((condition, index) => (
          <div key={condition.id} className="relative p-4 border rounded-lg bg-gray-50">
            {/* Conjunction Selector */}
            {index > 0 && (
              <div className="absolute -top-3 left-4 bg-white px-2">
                <select
                  className="border rounded p-1 text-sm"
                  value={condition.conjunction}
                  onChange={(e) => updateCondition(condition.id, 'conjunction', e.target.value)}
                >
                  {CONJUNCTIONS.map(conj => (
                    <option key={conj} value={conj}>{conj}</option>
                  ))}
                </select>
              </div>
            )}
            
            {/* Condition Builder Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Field Select */}
              <div>
                <label className="block text-sm font-medium mb-2">Field</label>
                <select 
                  className="w-full p-2 border rounded"
                  value={condition.field}
                  onChange={(e) => updateCondition(condition.id, 'field', e.target.value)}
                >
                  {FIELDS.map(field => (
                    <option key={field} value={field}>{field}</option>
                  ))}
                </select>
              </div>
              
              {/* Operator Select */}
              <div>
                <label className="block text-sm font-medium mb-2">Operator</label>
                <select 
                  className="w-full p-2 border rounded"
                  value={condition.operator}
                  onChange={(e) => updateCondition(condition.id, 'operator', e.target.value)}
                >
                  {OPERATORS.map(op => (
                    <option key={op} value={op}>{op}</option>
                  ))}
                </select>
              </div>
              
              {/* Value Input */}
              <div>
                <label className="block text-sm font-medium mb-2">Value</label>
                <input 
                  type="text"
                  className="w-full p-2 border rounded"
                  value={condition.value}
                  onChange={(e) => updateCondition(condition.id, 'value', e.target.value)}
                  placeholder="Enter value..."
                />
              </div>
              
              {/* Remove Button */}
              <div className="flex items-end">
                {conditions.length > 1 && (
                  <button 
                    onClick={() => removeCondition(condition.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Generated Query Display */}
      <div className="mt-6 bg-blue-50 p-4 rounded">
        <h3 className="text-lg font-medium mb-2">Generated JQL Query:</h3>
        <code className="block bg-white p-3 rounded border text-sm">
          {generateJQLQuery(conditions) || 'Build your query by adding conditions above'}
        </code>
      </div>
    </div>
  );
};

export default JQLBuilder;