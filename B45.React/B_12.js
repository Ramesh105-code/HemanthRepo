import React from "react";
import Card from "./components/Card";
import "./App.css";

const App = () => {
  return (
    <div className="container">
      <h1>Reusable Card Component</h1>
      
      <div className="card-container">
        <Card title="Card 1">
          <p>This is the content of Card 1.</p>
          <button>Click Me</button>
        </Card>

        <Card title="Card 2">
          <p>This card contains an image.</p>
          <img src="https://via.placeholder.com/150" alt="Placeholder" />
        </Card>

        <Card title="Card 3">
          <p>Here is some other dynamic content.</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default App;
