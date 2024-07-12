import { useState, useCallback, useEffect } from 'react';
import Search from "../components/Search";
import Button from '../components/Button';
import Table from '../components/Table';
import Alerts from '../components/Alerts';
import UpdatePlanModal from '../components/UpdatePlanModal';
import { useGetAllUsersQuery, useUpdateUserStatusMutation } from '../services/userApi';
import { useGetAllPlansQuery } from '../services/plansApi';

const headers = ['Name', 'Email', 'Plans/Services'];

const UserManagement = () => {
  const { data: usersData, error, isLoading, refetch } = useGetAllUsersQuery();
  const { data: plansData, error: plansError, isLoading: plansLoading } = useGetAllPlansQuery();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [userToDelete, setUserToDelete] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [userToUpdate, setUserToUpdate] = useState(null);
  const [updateUserStatus] = useUpdateUserStatusMutation();

  useEffect(() => {
    if (usersData) {
      const formattedUsers = usersData.map((user) => ({
        ...user,
        plan: user.userPlans.length > 0 ? user.userPlans[0].plan.name : 'No Plan',
      }));
      setUsers(formattedUsers);
      setFilteredUsers(formattedUsers);
    }
  }, [usersData]);

  const handleSearch = useCallback((searchTerm) => {
    const term = searchTerm.toLowerCase();
    const results = users.filter(user =>
      user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
    );
    setFilteredUsers(results.length ? results : []);
    setAlert({
      show: results.length === 0,
      type: 'error',
      message: 'No users found'
    });
  }, [users]);

  const handleActivateDeactivate = async (user) => {
    try {
      const updatedUser = await updateUserStatus({ userId: user.id, isActive: !user.isActive }).unwrap();
      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === user.id ? { ...u, isActive: updatedUser.isActive } : u
        )
      );
      setAlert({ show: true, type: 'success', message: `User ${updatedUser.isActive ? 'activated' : 'deactivated'} successfully` });
      setTimeout(() => setAlert({ show: false, type: '', message: '' }), 4000);
      refetch();
    } catch (error) {
      setAlert({ show: true, type: 'error', message: 'Failed to update user status' });
      setTimeout(() => setAlert({ show: false, type: '', message: '' }), 4000);
    }
  };

  const handleUpdatePlan = (user) => {
    setUserToUpdate(user);
  };

  const handleSavePlan = (user, newPlan) => {
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.id === user.id ? { ...u, plan: newPlan } : u
      )
    );
    setAlert({ show: true, type: 'success', message: 'Plan updated successfully' });
    setTimeout(() => setAlert({ show: false, type: '', message: '' }), 4000);
    setUserToUpdate(null);
    
  };

  const handleRemove = (user) => {
    setUserToDelete(user);
    setShowDeleteAlert(true);
  };

  const handleDeleteConfirm = () => {
    setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userToDelete.id));
    setAlert({ show: true, type: 'success', message: 'User deleted successfully' });
    setTimeout(() => setAlert({ show: false, type: '', message: '' }), 4000);
    setShowDeleteAlert(false);
    setUserToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteAlert(false);
    setUserToDelete(null);
  };

  if (isLoading || plansLoading) return <div>Loading...</div>;
  if (error || plansError) return <div>Error fetching data</div>;

  return (
    <div className="relative">
      <div className="app p-4">
        <div className="flex justify-between items-center mb-6">
          <Search
            data={users}
            onSearch={handleSearch}
            onView={() => {}} // Placeholder function to avoid prop type warning
            className="flex-1 mr-4"
          />
          <Button text="Add User" className="text-sm bg-green-700 mr-1" onClick={() => setFilteredUsers(users)} />
          <Button text="Refresh" className="text-sm bg-blue-700" onClick={refetch} />
        </div>
        <Table
          headers={headers}
          data={filteredUsers}
          onView={() => {}} // No view functionality for users, so this is a no-op
          onUpdate={handleUpdatePlan}
          onRemove={handleRemove}
          customRowRenderer={(user, handleSelectRow, selectedRows) => (
            <tr key={user.id} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(user.id)}
                  onChange={() => handleSelectRow(user.id)}
                />
              </td>
              <td className="py-3 px-6 text-left">{user.name}</td>
              <td className="py-3 px-6 text-left">{user.email}</td>
              <td className="py-3 px-6 text-left">
                {user.plan}
                <Button text="Update Plan" className="ml-2 text-sm bg-green-500" onClick={() => handleUpdatePlan(user)} />
              </td>
              <td className="py-3 px-6 text-left">
                <Button
                  text={user.isActive ? 'Deactivate' : 'Activate'}
                  className="text-sm bg-yellow-500"
                  onClick={() => handleActivateDeactivate(user)}
                />
                <Button text="Remove" className="ml-2 text-sm bg-red-500" onClick={() => handleRemove(user)} />
              </td>
            </tr>
          )}
        />
      </div>
      {userToUpdate && (
        <UpdatePlanModal
          user={userToUpdate}
          plans={plansData}
          onSave={handleSavePlan}
          onClose={() => setUserToUpdate(null)}
        />
      )}
      {showDeleteAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Delete User</h2>
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
                onClick={handleDeleteCancel}
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </div>
            <p className="mb-4">Are you sure you want to delete this user?</p>
            <div className="flex justify-end">
              <Button text="Cancel" className="mr-2 bg-gray-500" onClick={handleDeleteCancel} />
              <Button text="Delete" className="bg-red-500" onClick={handleDeleteConfirm} />
            </div>
          </div>
        </div>
      )}
      {alert.show && (
        <Alerts
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ show: false, type: '', message: '' })}
        />
      )}
    </div>
  );
};

export default UserManagement;
