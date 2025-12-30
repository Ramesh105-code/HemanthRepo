import { useState } from "react";

function MultiStepForm() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    preference: "",
  });

  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  return (
    <div>
      <h3>Step {step} of 3</h3>

      {step === 1 && (
        <>
          <input
            placeholder="Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          <input
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <button onClick={next}>Next</button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button onClick={back}>Back</button>
          <button onClick={next}>Next</button>
        </>
      )}

      {step === 3 && (
        <>
          <select
            value={formData.preference}
            onChange={(e) =>
              setFormData({ ...formData, preference: e.target.value })
            }
          >
            <option value="">Select preference</option>
            <option value="Email">Email</option>
            <option value="SMS">SMS</option>
          </select>

          <h4>Review Data</h4>
          <pre>{JSON.stringify(formData, null, 2)}</pre>

          <button onClick={back}>Back</button>
          <button onClick={() => alert("Form Submitted!")}>
            Submit
          </button>
        </>
      )}
    </div>
  );
}
