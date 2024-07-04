
import PropTypes from 'prop-types';

const Dropdown = ({ label, options, onSelect }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-bold text-gray-700">{label}</label>
      <select
        className="block w-full p-2 border border-gray-300 rounded-md"
        onChange={(e) => onSelect(e.target.value)}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default Dropdown;
