import React, { useState, useEffect } from 'react';
import './App.css';

const Subform = ({ subform, updateNetTotal, removeProject }) => {
  const [title, setTitle] = useState(subform.title);
  const [rows, setRows] = useState(subform.rows);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const addRow = () => {
    setRows([
      ...rows,
      {
        id: Date.now(),
        srNo: rows.length + 1,
        item: '',
        unit: 0,
        costPerUnit: 0,
        tax: 0,
        totalAmount: 0,
        subtotal: 0
      }
    ]);
  };

  const removeRow = (id) => {
    const newRows = rows
      .filter((row) => row.id !== id)
      .map((row, index) => ({
        ...row,
        srNo: index + 1
      }));
    setRows(newRows);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const toggleEditingTitle = () => {
    setIsEditingTitle(!isEditingTitle);
  };

  const handleRowChange = (id, field, value) => {
    const newRows = rows.map((row) => {
      if (row.id === id) {
        let updatedRow = { ...row, [field]: value };

        if (field === 'unit' || field === 'costPerUnit' || field === 'tax') {
          updatedRow.subtotal = updatedRow.unit * updatedRow.costPerUnit;
          updatedRow.totalAmount =
            updatedRow.subtotal + (updatedRow.subtotal * (updatedRow.tax / 100));
        }

        return updatedRow;
      }
      return row;
    });
    setRows(newRows);
  };

  useEffect(() => {
    const netTotal = rows.reduce((acc, row) => acc + row.totalAmount, 0);
    updateNetTotal(subform.id, netTotal);
  }, [rows]);

  return (
    <div className="subform">
      {isEditingTitle ? (
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onBlur={toggleEditingTitle}
          className="title-input"
        />
      ) : (
        <h3 className="subform-title" onClick={toggleEditingTitle}>
          Project Name: {title}
        </h3>
      )}

      <div className="header-row">
        <span className="header-cell">Project Item</span>
        <span className="header-cell">Unit</span>
        <span className="header-cell">SrNo</span>
        <span className="header-cell">Cost/Unit</span>
        <span className="header-cell">Tax %</span>
        <span className="header-cell">Total Amount</span>
      </div>

      {rows.map((row) => (
        <div key={row.id} className="row">
          <span className="row-cell" style={{ marginLeft: '20px' }}>{row.srNo}</span>
          <input
            type="text"
            value={row.item}
            onChange={(e) => handleRowChange(row.id, 'item', e.target.value)}
            className="item-input"
            style={{ marginLeft: '20px' }}
          />
          <input
            type="number"
            value={row.unit}
            onChange={(e) => handleRowChange(row.id, 'unit', parseFloat(e.target.value) || 0)}
            className="number-input"
            style={{ marginLeft: '20px' }}
          />
          <input
            type="number"
            value={row.costPerUnit}
            onChange={(e) => handleRowChange(row.id, 'costPerUnit', parseFloat(e.target.value) || 0)}
            className="number-input"
            style={{ marginLeft: '20px' }}
          />
          <input
            type="number"
            value={row.tax}
            onChange={(e) => handleRowChange(row.id, 'tax', parseFloat(e.target.value) || 0)}
            className="number-input"
            style={{ marginLeft: '20px' }}
            placeholder="Tax %"
          />
          <span className="row-cell" style={{ marginLeft: '20px' }}>{row.totalAmount.toFixed(2)}</span>
          <button className="remove-button" onClick={() => removeRow(row.id)}>Remove</button>
        </div>
      ))}
      <button className="add-row-button" onClick={addRow}>Add Row</button>
      <div className="net-total">Sub Total : {rows.reduce((acc, row) => acc + row.totalAmount, 0).toFixed(2)}</div>
      <button className="remove-project-button" onClick={() => removeProject(subform.id)}>Remove Task</button>
    </div>
  );
};

export default Subform;
