import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function TaskDetail() {
  const { id } = useParams();
  const task = useSelector((state) =>
    state.tasks.tasks.find((task) => task.id === parseInt(id))
  );

  if (!task) {
    return <div>Task not found</div>;
  }

  return (
    <div>
      <h2>{task.todo}</h2>
      <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
      {/* Add notes, timer, and action logs here */}
    </div>
  );
}

export default TaskDetail;