// import React from 'react';
import { useEffect } from 'react';
import Collapsible from '../components/Collapsible';
import Table from '../components/Table';
import { useState, useCallback } from 'react';
import ViewDetails from '../components/ViewDetails';
import Search from '../components/Search';
import { useGetviewDataQuery } from '../services/viewApi';
import Button from '../components/Button';
import UpdateRatio from '../features/UpdateRatio';
import Alerts from '../components/Alerts';
import { useDeleteRatioMutation } from '../services/ratiosApi';




const headers = ['Name', 'Formula', 'Description', 'Type'];

const View = () => {
  const { data, error, isLoading, refetch } = useGetviewDataQuery();
  const [selectedRow, setSelectedRow] = useState(null);
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isUpdatePanelOpen, setIsUpdatePanelOpen] = useState(false); 
  const [updateRow, setUpdateRow] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  const [deleteRatio] = useDeleteRatioMutation();



  useEffect(() => {
    if (data) {
      const allData = [
        ...data.incomeStatement.map((name, id) => ({
          id: `income-${id}`, Name: name, Formula: '', Description: '', Type: ''
        })),
        ...data.balanceSheet.map((name, id) => ({
          id: `balance-${id}`, Name: name, Formula: '', Description: '', Type: ''
        })),
        ...data.cashFlow.map((name, id) => ({
          id: `cashflow-${id}`, Name: name, Formula: '', Description: '', Type: ''
        })),
        ...data.ratios.map(({ ratioId, name, description, formula, type }) => ({
          id: `ratio-${ratioId}`, Name: name, Formula: formula, Description: description, Type: type
        })),
      ];
      setOriginalData(allData);
      setFilteredData(allData);
      // console.log("All Data:", allData); // Debugging Statement
    }
  }, [data]);

  const handleSearch = useCallback((results) => {
    setFilteredData(results.length ? results : originalData);
  }, [originalData]);

  const handleView = useCallback((row) => {
    setSelectedRow(row);
  }, []);

  const handleUpdate = useCallback((row) => {
    console.log('update', row);
    setUpdateRow(row);
    setIsUpdatePanelOpen(true);
  }, []);

  const handleRemove = (row) => {
    console.log('remove', row);
    setRowToDelete(row);
    setShowDeleteAlert(true);
  };

  const handleCloseDetails = () => {
    setSelectedRow(null);
  };

  const handleCloseUpdate = () => {
    setIsUpdatePanelOpen(false);
    setUpdateRow(null);
    refetch(); // Refetch data to get updated list
  };

  const handleDeleteConfirm = async () => {
    if (rowToDelete) {
      try {
        await deleteRatio(rowToDelete).unwrap();
        setAlert({ show: true, type: 'success', message: 'Ratio deleted successfully' });
        refetch();
      } catch (error) {
        setAlert({ show: true, type: 'error', message: 'Failed to delete ratio' });
      }
      setShowDeleteAlert(false);
      setRowToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteAlert(false);
    setRowToDelete(null);
  };

  useEffect(() => {
    if (selectedRow === null) {
      setFilteredData(originalData);
    }
  }, [selectedRow, originalData]);


  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data</div>;

  return (
    <div className="relative">
      <div className="app p-4">
      <div className="flex justify-between items-center mb-6">
          <Search
            data={originalData}
            onSearch={handleSearch}
            onView={handleView}
            className="flex-1 mr-4"
          />
          <Button text="Refresh" className="text-sm bg-blue-700" onClick={refetch} />
        </div>
        <Collapsible title="Income Statement">
          <Table
            headers={headers}
            data={filteredData.filter(item => item.id.startsWith('income'))}
            onView={handleView}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
          />
        </Collapsible>
        <Collapsible title="Balance Sheet">
          <Table
            headers={headers}
            data={filteredData.filter(item => item.id.startsWith('balance'))}
            onView={handleView}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
          />
        </Collapsible>
        <Collapsible title="Cash Flow">
          <Table
            headers={headers}
            data={filteredData.filter(item => item.id.startsWith('cashflow'))}
            onView={handleView}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
          />
        </Collapsible>
        <Collapsible title="Valuation Ratio">
          <Table
            headers={headers}
            data={filteredData.filter(item => item.id.startsWith('ratio') && item.Type === 'valuation')}
            onView={handleView}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
          />
        </Collapsible>
        <Collapsible title="Liquidity Ratio">
          <Table
            headers={headers}
            data={filteredData.filter(item => item.id.startsWith('ratio') && item.Type === 'liquidity')}
            onView={handleView}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
          />
        </Collapsible>
        <Collapsible title="Profitability Ratio">
          <Table
            headers={headers}
            data={filteredData.filter(item => item.id.startsWith('ratio') && item.Type === 'profitability')}
            onView={handleView}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
          />
        </Collapsible>
      </div>
      {selectedRow && <ViewDetails row={selectedRow} onClose={handleCloseDetails} />}
      {isUpdatePanelOpen && updateRow && (
        <UpdateRatio ratio={updateRow} onClose={handleCloseUpdate} />
      )}
      {showDeleteAlert && (
        <Alerts
          type="warning"
          message="Are you sure you want to delete this ratio?"
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
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

export default View;
