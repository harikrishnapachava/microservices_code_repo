import React from 'react';

const Alert = ({ message, type, dismiss }) => (
  <div>
    <div className={`alert alert-${type} alert-dismissible fade show`} style={{ maxWidth: '400px' }} role="alert">
      <button type="button" className="close" onClick={dismiss} data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      {message}
    </div>
  </div>
);
export default Alert;
