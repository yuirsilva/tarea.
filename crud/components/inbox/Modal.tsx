'use client'
import styles from './Modal.module.css'

import axios from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import { useState } from 'react'

import ModalForm from './ModalForm'

type Path = 'title' | 'description'

export default function Modal({ selectedTask, handleModalClose, isTaskSelected, setIsTaskSelected }: { selectedTask: any, handleModalClose: any, isTaskSelected: boolean, setIsTaskSelected: any }) {
    const [isEditingTitle, setIsEditingTitle] = useState(false)
    const [isEditingDesc, setIsEditingDesc] = useState(false)

    const [task, setTask] = useState({ title: '', description: '' })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setTask({ ...task, [name]: value })
    };

    const patchData = (path: Path) => [{ op: 'replace', path: path, value: task[path] }]

    const dataChange = (path: Path) => axios.patch(`https://localhost:7147/api/Tasks/${selectedTask.id}`, patchData(path))

    const queryClient = useQueryClient()

    const { mutate: titlePatchFunc } = useMutation(() => dataChange('title'), {
        onSuccess: () => {
            queryClient.invalidateQueries('tasks')
        },
    })
    const { mutate: descPatchFunc } = useMutation(() => dataChange('description'), {
        onSuccess: () => {
            queryClient.invalidateQueries('tasks')
        },
    })

    const handlePatch = (path: Path) => (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const patchFunc = path === 'title' ? titlePatchFunc : descPatchFunc
        patchFunc()
        setIsTaskSelected(!isTaskSelected)
    }
    const titlePatch = handlePatch('title'), descPatch = handlePatch('description')

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span onClick={handleModalClose} className={styles.close}>&times;</span>
                <div className={styles.modalTaskContent}>
                    <div className={styles.fields}>
                        <h2 className={styles.title} onClick={() => setIsEditingTitle(!isEditingTitle)}>{selectedTask.title}</h2>

                        {isEditingTitle && <ModalForm action={titlePatch} name='title' placeholder='Task title' value={task.title} onChange={handleInputChange} />}

                        <p className={styles.description} style={{ marginBottom: isEditingDesc ? '1rem' : '' }} onClick={() => setIsEditingDesc(!isEditingDesc)} >{selectedTask.description}</p>

                        {isEditingDesc && <ModalForm action={descPatch} name='description' placeholder='Task description' value={task.description} onChange={handleInputChange} />}

                    </div>
                </div>
            </div>
        </div>
    )
}
