import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useGetSuggestionsQuery } from '../services/suggestionsApi';
import { useUpdateRatioMutation } from '../services/ratiosApi'; 
import Input from '../components/Input';
import Button from '../components/Button';
import { parse } from 'mathjs';
import debounce from 'lodash.debounce';
import Dropdown from '../components/Dropdown';
import Alerts from '../components/Alerts';
import ViewRatio from '../components/ViewRatio';

export default function UpdateRatio({ ratio, onClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expression, setExpression] = useState(ratio.Formula);
  const [isValid, setIsValid] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [ratioName, setRatioName] = useState(ratio.Name);
  const [description, setDescription] = useState(ratio.Description);
  const [ratioType, setRatioType] = useState(ratio.Type);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);
  const [savedRatio, setSavedRatio] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetSearchTerm = useCallback(
    debounce((term) => {
      setSearchTerm(term);
      if (term) {
        setShowSuggestions(true);
      } else {
        setShowSuggestions(false);
      }
    }, 1000),
    []
  );

  const ratioOptions = ['Valuation', 'Profitability', 'Liquidity'];

  useEffect(() => {
    return () => {
      debouncedSetSearchTerm.cancel();
    };
  }, [debouncedSetSearchTerm]);

  const { data } = useGetSuggestionsQuery(searchTerm, {
    skip: searchTerm.length < 1,
  });

  const [updateRatio] = useUpdateRatioMutation();

  const handleSuggestionClick = (suggestion) => {
    const parts = expression.split(/([+\-*/%()])/);
    parts[parts.length - 1] = suggestion;
    const newExpression = parts.join('');
    setExpression(newExpression);
    setSearchTerm('');
    validateExpression(newExpression);
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    const lastChar = value.slice(-1);

    if (['+', '-', '*', '/', '%', '(', ')'].includes(lastChar)) {
      setExpression(value);
      setSearchTerm('');
      setShowSuggestions(false);
    } else {
      const parts = value.split(/([+\-*/%()])/);
      const term = parts[parts.length - 1].trim();
      setExpression(value);
      debouncedSetSearchTerm(term);
    }

    validateExpression(value);
    adjustInputHeight(e.target);
  };

  const handleInputBlur = () => {
    setShowSuggestions(false);
  };

  const adjustInputHeight = (input) => {
    input.style.height = 'auto';
    input.style.height = `${input.scrollHeight}px`;
  };

  const handleButtonClick = (operator) => {
    const newExpression = `${expression}${operator}`;
    setExpression(newExpression);
    setSearchTerm('');
    validateExpression(newExpression);
    setShowSuggestions(true);
  };

  const validateExpression = (expr) => {
    try {
      const parsedExpression = expr.replace(/\s+/g, '_');
      parse(parsedExpression);
      setIsValid(true);
    } catch {
      setIsValid(false);
    }
  };

  useEffect(() => {
    if (ratioName && expression && isValid && description && ratioType) {
      setIsSaveDisabled(false);
    } else {
      setIsSaveDisabled(true);
    }
  }, [ratioName, expression, isValid, description, ratioType]);

  const handleSave = async () => {
    const updatedRatio = {
      id: ratio.id,
      name: ratioName,
      formula: expression,
      description,
      type: ratioType.toLowerCase(),
    };
    try {
      const response = await updateRatio(updatedRatio).unwrap();
      if (response && response.ratioId) {
        setSavedRatio(response);
        setAlert({ show: true, type: 'success', message: 'Ratio updated successfully' });
      } else {
        setAlert({ show: true, type: 'error', message: 'Failed to update ratio' });
      }
    } catch (error) {
      setAlert({ show: true, type: 'error', message: 'Failed to update ratio' });
    } finally {
      setTimeout(() => handleCloseAlert(), 4000);
    }
  };

  const handleCloseAlert = () => {
    setAlert({ show: false, type: '', message: '' });
  };

  const handleCloseModal = () => {
    setSavedRatio(null);
    onClose(); // Close the update panel
  };

  return (
    <div className="fixed right-0 top-0 w-1/3 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-2xl font-semibold">Update Ratio</h2>
        <button onClick={handleCloseModal} className="text-lg font-bold">X</button>
      </div>
      {alert.show && <Alerts type={alert.type} message={alert.message} onClose={handleCloseAlert} />}
      <Input
        className="mb-4"
        type="text"
        placeholder="Enter Ratio/Formula Name"
        value={ratioName}
        onChange={(e) => setRatioName(e.target.value)}
        required
      />
      <textarea
        className={`mb-4 w-full resize-none border rounded p-1 focus:outline-none ${isValid ? '' : 'border-red-500'}`}
        placeholder="Enter the formula"
        required
        value={expression}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        onBlur={handleInputBlur}
        style={{ height: 'auto' }}
      />
      {showSuggestions && data && (
        <div className="suggestions absolute bg-white border border-gray-300 w-full max-h-60 overflow-y-auto z-10">
          {data.metrics.map((metric, index) => (
            <div
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onMouseDown={() => handleSuggestionClick(metric)}
            >
              {metric}
            </div>
          ))}
          {data.ratios.map((ratio, index) => (
            <div
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onMouseDown={() => handleSuggestionClick(ratio)}
            >
              {ratio}
            </div>
          ))}
        </div>
      )}
      <div className="flex mb-4">
        {['+', '-', '*', '/', '%', '(', ')'].map((operator) => (
          <Button
            key={operator}
            className="mx-1 bg-gray-500 p-0"
            text={operator}
            onClick={() => handleButtonClick(operator)}
          />
        ))}
      </div>
      <textarea
        className="mb-4 w-full resize-none border rounded p-1 focus:outline-none"
        placeholder="Description of formula"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={{ height: 'auto' }}
      />
      <Dropdown
        label="Select Type of Ratio"
        options={ratioOptions}
        onSelect={(value) => setRatioType(value)}
        selectedValue={ratioType.toLowerCase()} // Pass the selected value to Dropdown
      />
      <Button className="" text="Update" onClick={handleSave} disabled={isSaveDisabled} />
      {savedRatio && <ViewRatio ratio={savedRatio} onClose={handleCloseModal} />}
    </div>
  );
}

UpdateRatio.propTypes = {
  ratio: PropTypes.shape({
    id: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    Formula: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
