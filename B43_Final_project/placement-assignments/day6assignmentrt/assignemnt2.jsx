import { useState } from "react";

function Dashboard() {
  const [showStats, setShowStats] = useState(true);
  const [showActivity, setShowActivity] = useState(true);
  const [showActions, setShowActions] = useState(true);

  const noWidgetsSelected = !showStats && !showActivity && !showActions;

  
  if (noWidgetsSelected) {
    return (
      <div>
        <Controls
          showStats={showStats}
          setShowStats={setShowStats}
          showActivity={showActivity}
          setShowActivity={setShowActivity}
          showActions={showActions}
          setShowActions={setShowActions}
        />
        <p>No widgets selected</p>
      </div>
    );
  }

  return (
    <div>
      <Controls
        showStats={showStats}
        setShowStats={setShowStats}
        showActivity={showActivity}
        setShowActivity={setShowActivity}
        showActions={showActions}
        setShowActions={setShowActions}
      />

      {showStats && <UserStats />}
      {showActivity && <RecentActivity />}
      {showActions && <QuickActions />}
    </div>
  );
}
