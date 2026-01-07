import React, { useState } from 'react'

function ToDoList() {

    const [tasks, setTasks] = useState(["Leet Code","3L water","Communication skill","Exercise","Reading Book"])
    const [newTasks, setNewTasks] = useState("")
    const [editId, setEditId] = useState(null)

    function handleEditTasks(id, task) {
        setEditId(id);
        setNewTasks(task);
    }

    function handleInputChange(event) {
        setNewTasks(event.target.value)
    }

    function addTask() {

        if (newTasks.trim() === '') return;

        if (editId === 0 || editId) {
            setTasks(prev => prev.map((task, index) => index === editId ? task.replace(task, newTasks) : task));
            setEditId(null);
        }
        else {
            setTasks(prev => [...prev, newTasks])
        }

        setNewTasks("");
    }
    function deleteTask(index) {
        const updatedTasks = tasks.filter((ele, i) => i !== index)
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
                [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
                [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }
    function edit(index) {

    }
    return (
        <div className="to-do-list">
            <h1>To-Do-List</h1>
            <div>
                <input
                    type='text'
                    placeholder='Enter a task...'
                    value={newTasks}
                    onChange={handleInputChange} />
                <button
                    className='add-button'
                    onClick={addTask}>
                    {editId === null ? "Set" : "Update"}
                </button>
            </div>
            <ol>
                {tasks.map((task, index) =>
                    <li key={index}><span>{index + 1} .</span>
                        <span className='text' onChange={edit(index)}>{task}</span>
                        <button
                            className='delete-task'
                            onClick={() => deleteTask(index)}>
                            Remove
                        </button>
                        <button
                            className='move-button'
                            onClick={() => moveTaskUp(index)}>
                            Move Up
                        </button>
                        <button
                            className='move-button'
                            onClick={() => moveTaskDown(index)}>
                            Move Down
                        </button>
                        <button
                            className='edit-button'
                            onClick={() => handleEditTasks(index, task)}>
                            Edit
                        </button>
                    </li>
                )}
            </ol>
        </div>
    )
}

export default ToDoList
