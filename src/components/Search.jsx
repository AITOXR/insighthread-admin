import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

const Search = ({ data, onSearch, onView, className }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = useCallback((query) => {
    setQuery(query);
    if (query === '') {
      setResults([]);
      onSearch([]);
      onSearch(data);
      return;
    }

    const filteredData = data.filter(row =>
      Object.values(row).some(value =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      )
    );
    setResults(filteredData);
    onSearch(filteredData);
  }, [data, onSearch]);

  const handleResultClick = (result) => {
    onView(result);
    setQuery('');
    setResults([]);
  };

  return (
    <div className={`relative ${className}`}>
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search..."
        className="p-2 border rounded w-full"
      />
      {results.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
          {results.map((result) => (
            <li
              key={result.id}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onMouseDown={() => handleResultClick(result)}
            >
              {result.Name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Search.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSearch: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
  className: PropTypes.string,
};

Search.defaultProps = {
  className: '',
};

export default Search;
