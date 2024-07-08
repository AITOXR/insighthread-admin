import PropTypes from 'prop-types';
import Button from './Button'; // Import the Button component

const alertStyles = {
  success: {
    border: 'border-green-500',
    background: 'bg-green-100',
    text: 'text-green-600',
    icon: (
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
        className="h-6 w-6 text-green-600"
      >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    ),
  },
  error: {
    border: 'border-red-500',
    background: 'bg-red-100',
    text: 'text-red-600',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="24" height="24" viewBox="0 0 48 48">
        <path fill="#f44336" d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"></path>
        <path fill="#fff" d="M29.656,15.516l2.828,2.828l-14.14,14.14l-2.828-2.828L29.656,15.516z"></path>
        <path fill="#fff" d="M32.484,29.656l-2.828,2.828l-14.14-14.14l2.828-2.828L32.484,29.656z"></path>
      </svg>
    ),
  },
  warning: {
    border: 'border-yellow-500',
    background: 'bg-yellow-100',
    text: 'text-yellow-600',
    icon: (
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
        className="h-6 w-6 text-yellow-600"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
    ),
  },
};

export default function Alerts({ type, message, onClose, onConfirm, onCancel }) {
  const styles = alertStyles[type] || alertStyles.success;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className={`rounded-md border-l-4 ${styles.border} ${styles.background} p-4 w-96`}>
        <div className="flex items-center justify-between space-x-4">
          <div>{styles.icon}</div>
          <div>
            <p className={`text-sm font-medium ${styles.text}`}>{message}</p>
          </div>
          <div>
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
              className={`h-6 w-6 cursor-pointer ${styles.text}`}
              onClick={onClose}
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>
        {type === 'warning' && (
          <div className="flex justify-end space-x-4 mt-4">
            <Button text="Cancel" className="bg-gray-500" onClick={onCancel} />
            <Button text="Delete" className="bg-red-600" onClick={onConfirm} />
          </div>
        )}
      </div>
    </div>
  );
}

Alerts.propTypes = {
  type: PropTypes.oneOf(['success', 'error', 'warning']).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
};

Alerts.defaultProps = {
  onConfirm: () => {},
  onCancel: () => {},
};
