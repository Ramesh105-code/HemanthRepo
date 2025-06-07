import React from "react";
import ReactDOM from "react-dom/client";

let instanceIdCounter = 0;

function MessageBox({ text, log, instanceId }) {
  if (!MessageBox.instances) MessageBox.instances = {};

  if (!MessageBox.instances[instanceId]) {
    
    MessageBox.instances[instanceId] = {
      lastText: text,
      renderCount: 1,
    };
    log(`Mount: MessageBox #${instanceId}`);
  } else {
   
    const instance = MessageBox.instances[instanceId];
    instance.renderCount += 1;
    if (instance.lastText !== text) {
      log(`Update: MessageBox #${instanceId} (text changed)`);
      instance.lastText = text;
    } else {
      log(`Render: MessageBox #${instanceId} (text unchanged)`);
    }
  }

  return (
    <div className="message-box">
      Current Message: {text} (Rendered{" "}
      {MessageBox.instances[instanceId].renderCount} times)
    </div>
  );
}


MessageBox.cleanup = function (instanceId, log) {
  if (MessageBox.instances && MessageBox.instances[instanceId]) {
    log(`Unmount: MessageBox #${instanceId}`);
    delete MessageBox.instances[instanceId];
  }
};

function App() {
  const [text, setText] = React.useState("Hello");
  const [showBox, setShowBox] = React.useState(true);
  const [logs, setLogs] = React.useState([]);
  const [instanceId, setInstanceId] = React.useState(() => ++instanceIdCounter);

  function log(message) {
    setLogs((prevLogs) => [...prevLogs, message]);
  }

  function toggleBox() {
    if (showBox) {
      
      MessageBox.cleanup(instanceId, log);
    } else {
      
      const newId = ++instanceIdCounter;
      setInstanceId(newId);
    }
    setShowBox(!showBox);
  }

  return (
    <div>
      <h2>Manual Lifecycle Tracker</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter message"
      />
      <button onClick={toggleBox}>
        {showBox ? "Hide" : "Show"} MessageBox
      </button>

      <div style={{ margin: "1em 0" }}>
        {showBox && (
          <MessageBox text={text} log={log} instanceId={instanceId} />
        )}
      </div>

      <h3>Lifecycle Logs:</h3>
      <pre>{logs.join("\n")}</pre>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
