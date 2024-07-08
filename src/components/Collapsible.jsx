import { useState } from 'react';
import PropTypes from 'prop-types';

const Collapsible = ({ title, children, className, contentClassName }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`collapsible ${className}`}>
      <div className="collapsible-header flex justify-between items-center bg-gray-200 p-4 cursor-pointer" onClick={handleToggle}>
        <h2 className="text-lg font-semibold">{title}</h2>
        <button className="text-lg font-bold">{isOpen ? '-' : '+'}</button>
      </div>
      {isOpen && <div className={`collapsible-content p-4 bg-white ${contentClassName}`}>{children}</div>}
    </div>
  );
};

Collapsible.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  contentClassName: PropTypes.string,
};

Collapsible.defaultProps = {
  className: '',
  contentClassName: '',
};

export default Collapsible;
