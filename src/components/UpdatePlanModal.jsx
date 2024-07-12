import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Dropdown from './Dropdown';
import Button from './Button';

const UpdatePlanModal = ({ user, plans, onSave, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState('');

  useEffect(() => {
    setSelectedPlan(user.plan);
  }, [user]);

  const handleSave = () => {
    onSave(user, selectedPlan);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Update Plan for {user.name}</h2>
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
        <Dropdown
          label="Select Plan"
          options={plans.map(plan => plan.planName)}
          selectedValue={selectedPlan}
          onSelect={setSelectedPlan}
        />
        <div className="flex justify-end mt-4">
          <Button text="Cancel" className="mr-2 bg-gray-500" onClick={onClose} />
          <Button text="Save" className="bg-green-500" onClick={handleSave} />
        </div>
      </div>
    </div>
  );
};

UpdatePlanModal.propTypes = {
  user: PropTypes.object.isRequired,
  plans: PropTypes.array.isRequired,
  onSave: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UpdatePlanModal;
