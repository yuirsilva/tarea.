'use client'
import styles from './page.module.css'

import Header from '@/components/mainpage/Header'
import Greeting from '@/components/login/Greeting'
import Task from '@/components/inbox/Task'
import Modal from '@/components/inbox/Modal'
import Input from '@/components/login/Input'
import Button from '@/components/inbox/Button'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'
import Image from 'next/image'

export interface Task {
    id?: number;
    title: string;
    description: string;
    status: string;
    userId: string;
}

export default function TodoList() {
    const [isTaskSelected, setIsTaskSelected] = useState(false)

    const [task, setTask] = useState({ title: '', description: '' })

    const [state, setState] = useState({
        selectedTask: {},
        taskAdd: false,
        task: { title: '', description: '' }
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setTask({ ...task, [name]: value })
    };

    const { data: session } = useSession({ required: true })

    const { data: res, isLoading } = useQuery('tasks', () => {
        if (session?.user.id) {
            return axios.get(`https://localhost:7147/api/Tasks/GetByUser/${session?.user.id}`)
        }
    },
        {
            enabled: !!session?.user.id,
        })

    const handleTaskPost = (task: Task) => {
        return axios.post('https://localhost:7147/api/Tasks', task)
    }
    const queryClient = useQueryClient()
    const { mutate: taskPost } = useMutation(handleTaskPost, {
        onSuccess: () => {
            queryClient.invalidateQueries('tasks')
        }
    })

    const handleTaskSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const taskInfo = {
            ...task,
            status: 'uncompleted',
            userId: session?.user.id!
        }
        taskPost(taskInfo)
    }

    const handleTaskClick = (task: Task) => {
        setIsTaskSelected(!isTaskSelected)
        setState(prevState => ({
            ...prevState,
            selectedTask: task
        }))

    }
    const handleModalClose = () => {
        setIsTaskSelected(false)
        setState(prevState => ({
            ...prevState,
            selectedTask: {}
        }))
    }
    const handleTaskAdd = () => {
        setState(prevState => ({
            ...prevState,
            taskAdd: !state.taskAdd
        }))
    }

    return <>
        <main className={styles.main}>
            <Header>
                {
                    session?.user?.image ?
                        <Image
                            alt='User photo'
                            src={session.user.image}
                            width={50}
                            height={50}
                            style={{ borderRadius: '50%', userSelect: 'none', pointerEvents: 'none' }}
                        />
                        :
                        <Image
                            alt='User photo'
                            src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAeVJREFUaEPtlG2rQUEQx/+klIeQx0TCC/n+X8N7eYGE8pAQKYl7m63Ruee6Z9lMndzZl2fPzM78fjsb6fV6X/iAFdFGQmZRjYRMCNSIGhEioFdLCKxzWjXijE4oUI0IgXVOq0ac0QkFqhEhsM5p1YgzOqHA/2WkVquhXC7fWS6XS8xmM3i/73Y7DIfDl3i3221ks1kTc7vdMJ/PcTwe0Wq1EI/Hcb1eMR6Psd/vrXmfMkIH0vIWmslkUK/XMZ1Ocblc0Gw2sV6vsVqtrIfyD91uF4fDwUDh5T2LQKXTafT7fWvOpxqhAxOJhEl2Pp8xGo2QSqWQy+UwGAzMdyqA9rioUqmESqWCyWRi9huNBhaLxb1Rysfkaf90OpmCO50Ottut+Y9gVatVk4P2g5a1ETrQS5uJEUl/I35r1Ew+n0c0Gv1ly2uUrg7bSSaTPxph67brZW3ET4F1bzabQCOPrkoQUQYUi8VkjPxFjozYZoSbpgb8s0C2isWiGWZabJ1mgs2+fUa8rxPfZTos6NWivUKhcC/UPyM8V/xq8avnnZ23v1rWJyMEP7w8IyGo+WEJ2kjYzKgRNSJEQK+WEFjntGrEGZ1QoBoRAuucVo04oxMKVCNCYJ3TqhFndEKBakQIrHPajzHyDQY7n5gdF+WyAAAAAElFTkSuQmCC'
                            width={50}
                            height={50}
                        />
                }
                <p>{session?.user?.name}</p>
                <Button type='button' title='Sign out' btnClass='signOut' action={() => signOut({ callbackUrl: '/login' })}>Sign out</Button>
            </Header>
            <section className={styles.listSection}>
                <Greeting />
                <ul className={styles.list}>
                    {
                        isLoading ? <p>Loading...</p> : null
                    }
                    {
                        res?.data.length === 0 ? <p>Hmm... no task found.</p> : res?.data.map((task: Task) => <Task taskId={task.id!} key={task.id} onClick={() => { handleTaskClick(task) }} >{task.title}</Task>)
                    }
                    <li className={styles.addTaskButton}>
                        <Button type='button' title='Add task' action={handleTaskAdd}>+ Add task</Button>
                        {state.taskAdd && <form onSubmit={handleTaskSubmit} className={styles.addTaskForm}>
                            <Input type='text' name='title' change={handleInputChange} value={task.title} placeholder='Task Title' />
                            <Input type='text' name='description' change={handleInputChange} value={task.description} placeholder='Task Description' />
                            <div>
                                <Button type='button' title='Cancel task addition' btnClass='cancel' action={handleTaskAdd}>Cancel</Button>
                                <Button type='submit' title='Add task' btnClass='submit'>Add task</Button>
                            </div>
                        </form>}
                    </li>
                </ul>
                {isTaskSelected && <Modal isTaskSelected={isTaskSelected} setIsTaskSelected={setIsTaskSelected} selectedTask={state.selectedTask} handleModalClose={handleModalClose} />}
            </section>
        </main>
    </>
}
