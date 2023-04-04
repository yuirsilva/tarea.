import styles from './ModalForm.module.css'

export default function ModalForm({ action, name, placeholder, value, onChange }: { action: React.FormEventHandler<HTMLFormElement>, name: string, placeholder: string, value: string, onChange: React.ChangeEventHandler<HTMLInputElement> }) {
    return (
        <form onSubmit={action} className={styles.editForm}>
            <input className={styles.taskInput} type='text' name={name} placeholder={placeholder} value={value} onChange={onChange} />
            <div>
                <button title='Cancel editing'>Cancel</button>
                <button title='Submit edit' type='submit'>Save</button>
            </div>
        </form>
    )
}
