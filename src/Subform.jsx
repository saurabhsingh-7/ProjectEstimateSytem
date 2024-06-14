import React, { useState, useEffect } from 'react';

const Subform = ({ subform, updateNetTotal }) => {
  const [title, setTitle] = useState(subform.title);
  const [rows, setRows] = useState(subform.rows);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const headers = ['SrNo', 'Project Item', 'Hours', 'Cost/Hour', 'Subtotal'];

  const addRow = () => {
    setRows([
      ...rows,
      { id: Date.now(), srNo: rows.length + 1, item: '', hours: 0, costPerHour: 0, subtotal: 0 }
    ]);
  };

  const removeRow = (id) => {
    const newRows = rows.filter(row => row.id !== id).map((row, index) => ({
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
    const newRows = rows.map(row => {
      if (row.id === id) {
        const updatedRow = { ...row, [field]: value };
        updatedRow.subtotal = updatedRow.hours * updatedRow.costPerHour;
        return updatedRow;
      }
      return row;
    });
    setRows(newRows);
  };

  useEffect(() => {
    const netTotal = rows.reduce((acc, row) => acc + row.subtotal, 0);
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
        <h3 className="subform-title" onClick={toggleEditingTitle}>{title}</h3>
      )}

      <div className="headers">
        {headers.map((header, index) => (
          <span key={index}>{header}</span>
        ))}
      </div>

      {rows.map((row, rowIndex) => (
        <div key={row.id} className="row">
          <span>{row.srNo}</span>
          <input
            type="text"
            value={row.item}
            onChange={(e) => handleRowChange(row.id, 'item', e.target.value)}
            className="item-input"
          />
          <input
            type="number"
            value={row.hours}
            onChange={(e) => handleRowChange(row.id, 'hours', parseFloat(e.target.value) || 0)}
            className="number-input"
          />
          <input
            type="number"
            value={row.costPerHour}
            onChange={(e) => handleRowChange(row.id, 'costPerHour', parseFloat(e.target.value) || 0)}
            className="number-input"
          />
          <span>{row.subtotal.toFixed(2)}</span>
          <button className="remove-button" onClick={() => removeRow(row.id)}>Remove</button>
        </div>
      ))}
      <button className="add-row-button" onClick={addRow}>Add Row</button>
      <div className="net-total">Net Total: {rows.reduce((acc, row) => acc + row.subtotal, 0).toFixed(2)}</div>
    </div>
  );
}

export default Subform;
