import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, updateTask, clearHighlight } from '../redux/tasksSlice';
import TaskItem from './TaskItem';

function InboxView() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const highlightedTaskId = useSelector((state) => state.tasks.highlightedTaskId);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (tasks.length > 0) {
        const randomIndex = Math.floor(Math.random() * tasks.length);
        const task = tasks[randomIndex];
        const updatedTask = {
          ...task,
          completed: !task.completed,
        };
        dispatch(updateTask({ id: task.id, changes: updatedTask }));
        setTimeout(() => {
          dispatch(clearHighlight());
        }, 3000);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [dispatch, tasks]);

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed === b.completed) {
      return a.id - b.id;
    }
    return a.completed ? 1 : -1;
  });

  return (
    <div>
      <h2>Inbox</h2>
      <ul>
        {sortedTasks.map((task) => (
          <TaskItem key={task.id} task={task} highlight={task.id === highlightedTaskId} />
        ))}
      </ul>
    </div>
  );
}

export default InboxView;