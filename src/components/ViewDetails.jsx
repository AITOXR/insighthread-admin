import PropTypes from 'prop-types';
import { useState } from 'react';
import { ClipboardIcon } from '@heroicons/react/24/outline';

const ViewDetails = ({ row, onClose }) => {
  const [copied, setCopied] = useState(false);


  const handleCopy = () => {
    navigator.clipboard.writeText(row.Name).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the copied state after 2 seconds
    });
  };
  return (
    <div className="fixed right-0 top-0 w-1/3 h-full bg-white shadow-lg z-50 p-6 overflow-y-auto">
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-2xl font-semibold">Details</h2>
        <button onClick={onClose} className="text-lg font-bold">X</button>
      </div>
      <div className="space-y-4">
        <div>
        <div className="flex items-center">
            <h3 className="text-lg font-semibold">Name:</h3>
            <button onClick={handleCopy} className="ml-2 text-blue-500 hover:text-blue-700">
              <ClipboardIcon className="h-5 w-5 inline-block" />
            </button>
            {copied && <span className="ml-2 text-green-500">Copied</span>}
          </div>
          <p>{row.Name}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Formula:</h3>
          <p>{row.Formula}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Description:</h3>
          <p>{row.Description}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold">Type:</h3>
          <p className="inline-block bg-green-200 text-green-800 px-2 py-1 rounded">{row.Type}</p>
        </div>
      </div>
    </div>
  );
};

ViewDetails.propTypes = {
  row: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Formula: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Type: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ViewDetails;
