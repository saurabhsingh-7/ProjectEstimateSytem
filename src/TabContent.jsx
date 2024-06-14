import React from 'react';
import './TabContent.css';

const TabContent = ({ tabIndex }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form for Tab ${tabIndex} submitted!`);
  };

  const getFormContent = (index) => {
    switch (index) {
      case 1:
        return (
          <div className="form-section">
            <h2>Request for Proposal - Part 1</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Project Title:
                <input type="text" name="projectTitle" />
              </label>
              <label>
                Project Description:
                <textarea name="projectDescription"></textarea>
              </label>
              <label>
                Submission Deadline:
                <input type="date" name="submissionDeadline" />
              </label>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        );
      case 2:
        return (
          <div className="form-section">
            <h2>Request for Proposal - Part 2</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Project Budget:
                <input type="number" name="projectBudget" />
              </label>
              <label>
                Project Timeline:
                <input type="text" name="projectTimeline" />
              </label>
              <label>
                Proposal Submission Instructions:
                <textarea name="submissionInstructions"></textarea>
              </label>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        );
      case 3:
        return (
          <div className="form-section">
            <h2>Request for Proposal - Part 3</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Evaluation Criteria:
                <textarea name="evaluationCriteria"></textarea>
              </label>
              <label>
                Selection Process:
                <textarea name="selectionProcess"></textarea>
              </label>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        );
      case 4:
        return (
          <div className="form-section">
            <h2>Request for Proposal - Part 4</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Contact Information:
                <input type="text" name="contactInformation" />
              </label>
              <label>
                Questions and Clarifications:
                <textarea name="questionsAndClarifications"></textarea>
              </label>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        );
      case 5:
        return (
          <div className="form-section">
            <h2>Request for Proposal - Part 5</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Submission Format:
                <textarea name="submissionFormat"></textarea>
              </label>
              <label>
                Additional Information:
                <textarea name="additionalInformation"></textarea>
              </label>
              <button type="submit" className="submit-button">Submit</button>
            </form>
          </div>
        );
      default:
        return null;
    }
  };

  return <div>{getFormContent(tabIndex)}</div>;
};

export default TabContent;
