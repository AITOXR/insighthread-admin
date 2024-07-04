import PropTypes from 'prop-types';
import { useEffect } from 'react';

export default function ViewRatio({ ratio, onClose }) {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <>
      {ratio && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Saved Ratio Details</h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 cursor-pointer"
                onClick={onClose}
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold">Ratio/Formula Name:</p>
              <p className="text-sm">{ratio.ratioName}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold">Formula:</p>
              <p className="text-sm">{ratio.formula}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold">Description:</p>
              <p className="text-sm">{ratio.description}</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold">Type of Ratio:</p>
              <p className="text-sm">{ratio.type}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

ViewRatio.propTypes = {
  ratio: PropTypes.shape({
    ratioName: PropTypes.string.isRequired,
    formula: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};
