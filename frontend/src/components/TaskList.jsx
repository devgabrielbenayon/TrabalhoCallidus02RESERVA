export default function TaskList({ tasks }) {
    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id}>
                <strong>{task.title}</strong>: {task.description} - {task.status}
                </li>
            ))}
        </ul>
    );
}