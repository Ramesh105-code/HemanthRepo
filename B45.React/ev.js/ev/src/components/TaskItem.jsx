import { Link } from 'react-router-dom';

function TaskItem({ task, highlight }) {
  return (
    <li style={{ backgroundColor: highlight ? 'yellow' : 'white' }}>
      <Link to={`/task/${task.id}`}>{task.todo}</Link> - {task.completed ? 'Completed' : 'Pending'}
    </li>
  );
}

export default TaskItem;