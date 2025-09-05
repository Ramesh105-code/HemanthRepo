import React, { useState } from "react";
import Modal from "./components/modal";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Reusable Modal Example</h1>
      <button onClick={() => setIsModalOpen(true)}>Open Modal</button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Hello from the Modal </h2>
        <p>This is reusable. You can pass forms, buttons, or any content here.</p>
        <button onClick={() => alert("Button inside modal clicked!")}>
          Click Me
        </button>
      </Modal>
    </div>
  );
};

export default App;
