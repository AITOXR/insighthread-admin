import PropTypes from 'prop-types';

export default function Input({ type, placeholder, className, ...props }) {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      type={type}
      placeholder={placeholder}
      {...props}
    />
  );
}

// Define propTypes for the component
Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Input.defaultProps = {
  className: '',
};
