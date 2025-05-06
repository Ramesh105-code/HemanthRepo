import React, { useState } from 'react';

const DynamicEmailForm = () => {
  const [emails, setEmails] = useState([{ id: Date.now(), value: '' }]); // State to hold email inputs
  const [emailErrors, setEmailErrors] = useState([]); // State to hold email validation errors

  // Handle the addition of a new email field
  const handleAddEmail = () => {
    setEmails([...emails, { id: Date.now(), value: '' }]);
    setEmailErrors([]); // Reset errors when a new email is added
  };

  // Handle email field change
  const handleEmailChange = (id, value) => {
    const updatedEmails = emails.map((email) =>
      email.id === id ? { ...email, value } : email
    );
    setEmails(updatedEmails);
  };

  // Handle form submission and validate emails
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate each email
    const errors = emails.map((email) =>
      !validateEmail(email.value) ? 'Invalid email format' : ''
    );

    setEmailErrors(errors);

    // Check if all emails are valid before alerting
    if (errors.every((error) => !error)) {
      alert('Emails submitted: ' + emails.map((email) => email.value).join(', '));
    }
  };

  // Simple email validation function
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {emails.map((email, index) => (
          <div key={email.id}>
            <input
              type="email"
              placeholder="Enter email"
              value={email.value}
              onChange={(e) => handleEmailChange(email.id, e.target.value)}
            />
            {emailErrors[index] && (
              <span style={{ color: 'red', fontSize: '12px' }}>
                {emailErrors[index]}
              </span>
            )}
            <br />
          </div>
        ))}
        <button type="button" onClick={handleAddEmail}>
          Add Email
        </button>
        <button type="submit">Submit</button>
      </form>

      <div>
        <h3>Entered Emails:</h3>
        <ul>
          {emails.map((email) => (
            <li key={email.id}>{email.value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DynamicEmailForm;