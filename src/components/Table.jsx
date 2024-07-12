import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button'; // Adjust the path if necessary

const Table = ({ headers, data, onView, onUpdate, onRemove, className, customRowRenderer }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((row) => row !== id) : [...prev, id]
    );
  };

  return (
    <div className={`table-container ${className}`}>
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">
              <input
                type="checkbox"
                checked={
                  selectedRows.length > 0 &&
                  selectedRows.length === data.length
                }
                onChange={(e) =>
                  setSelectedRows(
                    e.target.checked ? data.map((row) => row.id) : []
                  )
                }
              />
            </th>
            {headers.map((header) => (
              <th key={header} className="py-3 px-6 text-left">{header}</th>
            ))}
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.map((row) =>
            customRowRenderer ? (
              customRowRenderer(row, handleSelectRow, selectedRows)
            ) : (
              <tr key={row.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(row.id)}
                    onChange={() => handleSelectRow(row.id)}
                  />
                </td>
                {headers.map((header) => (
                  <td key={header} className={`py-3 px-6 text-left ${header === 'Description' || header === 'Formula' ? 'whitespace-normal' : ''}`} style={{ wordBreak: 'break-word' }}>
                    {row[header]}
                  </td>
                ))}
                <td className="py-3 px-6 text-left">
                  <Button className="mr-2 mb-1 text-xs" text="View" onClick={() => onView(row)} />
                  <Button className="mr-2 mb-1 text-xs" text="Update" onClick={() => onUpdate(row)} />
                  <Button text="Remove" className="bg-red-600 text-xs" onClick={() => onRemove(row)} />
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <div className="pagination flex justify-between p-4">
        <Button text="Previous" />
        <Button text="Next" />
      </div>
    </div>
  );
};

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onView: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  className: PropTypes.string,
  customRowRenderer: PropTypes.func,
};

Table.defaultProps = {
  className: '',
  customRowRenderer: null,
};

export default Table;
