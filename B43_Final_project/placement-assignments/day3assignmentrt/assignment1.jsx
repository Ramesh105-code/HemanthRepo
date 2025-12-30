import { useState } from "react";

function PasswordValidator() {
  const [password, setPassword] = useState("");

  const rules = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(rules).filter(Boolean).length;

  const borderColor =
    score <= 1 ? "red" : score <= 3 ? "orange" : "green";

  return (
    <div>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ border: `2px solid ${borderColor}` }}
        placeholder="Enter password"
      />

      <ul>
        <li>{rules.length ? "✓" : "✗"} Minimum 8 characters</li>
        <li>{rules.uppercase ? "✓" : "✗"} One uppercase letter</li>
        <li>{rules.number ? "✓" : "✗"} One number</li>
        <li>{rules.special ? "✓" : "✗"} One special character</li>
      </ul>
    </div>
  );
}
