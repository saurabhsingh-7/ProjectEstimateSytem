import React, { useState } from 'react';
import './App.css';
import Subform from './Subform';
import TabContent from './TabContent';

const App = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [subforms, setSubforms] = useState([]);

  const addSubform = () => {
    setSubforms([...subforms, { id: Date.now(), title: 'New Project', rows: [] }]);
  };

  const updateNetTotal = (id, netTotal) => {
    const newSubforms = subforms.map(subform =>
      subform.id === id ? { ...subform, netTotal } : subform
    );
    setSubforms(newSubforms);
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="App">
      <div className="banner">
        Project Estimate System Powered by Zoho Partners (Helios Tech Labs)
      </div>
      <div className="tabs">
        <button className={activeTab === 0 ? 'tab active' : 'tab'} onClick={() => handleTabClick(0)}>Project Estimate System</button>
        <button className={activeTab === 1 ? 'tab active' : 'tab'} onClick={() => handleTabClick(1)}>Request for Proposal - Part 1</button>
        <button className={activeTab === 2 ? 'tab active' : 'tab'} onClick={() => handleTabClick(2)}>Request for Proposal - Part 2</button>
        <button className={activeTab === 3 ? 'tab active' : 'tab'} onClick={() => handleTabClick(3)}>Request for Proposal - Part 3</button>
        <button className={activeTab === 4 ? 'tab active' : 'tab'} onClick={() => handleTabClick(4)}>Request for Proposal - Part 4</button>
        <button className={activeTab === 5 ? 'tab active' : 'tab'} onClick={() => handleTabClick(5)}>Request for Proposal - Part 5</button>
      </div>
      <div className="tab-content">
        {activeTab === 0 && (
          <div>
            <button className="add-subform-button" onClick={addSubform}>Add Project</button>
            {subforms.map(subform => (
              <Subform key={subform.id} subform={subform} updateNetTotal={updateNetTotal} />
            ))}
          </div>
        )}
        {activeTab > 0 && <TabContent tabIndex={activeTab} />}
      </div>
    </div>
  );
}

export default App;
