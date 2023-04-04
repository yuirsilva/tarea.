import styles from './Task.module.css'

import { useMutation, useQueryClient } from 'react-query'
import axios from 'axios'

export default function Task({ children, onClick, taskId }: { children: React.ReactNode, onClick?: React.MouseEventHandler, taskId: number }) {
    const taskDelete = () => axios.delete(`https://localhost:7147/api/Tasks/${taskId}`)

    const queryClient = useQueryClient()
    const { mutate: taskDeleteDel } = useMutation(taskDelete, {
        onSuccess: () => {
            queryClient.invalidateQueries('tasks')
        },
    })

    const handleTaskDelete = () => {
        taskDeleteDel()
    }

    return (
        <li className={styles.task}>
            <button onClick={handleTaskDelete} title='Complete task' role='checkbox' aria-checked='false' className={styles.checkbox}></button>
            <div>
                <button onClick={onClick} className={styles.taskName}>{children}</button>
                <button onClick={handleTaskDelete} className={styles.deleteTask}>delete</button>
            </div>
        </li>
    )
}
