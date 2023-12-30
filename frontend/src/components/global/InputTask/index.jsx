import { useState } from 'react'
const InputTask = () => {
    const [taskDescription, setTaskDescription] = useState("");
    
    const handleChange = (e) => {
        setTaskDescription(e.target.value);
    };

    const addTask = async e => {
        e.preventDefault();
        try {
            const taskInput = { task_description: taskDescription };
            const res = await fetch(
                "http://localhost:3000/tasks",
                {
                    method: "POST",
                    headers: { "Content-Type" : "application/json" },
                    body: JSON.stringify(taskInput)
                });
            console.log(JSON.stringify(taskInput));
            console.log(res);
            setTaskDescription("");
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
            <form onSubmit={addTask}
                  className="flex flex-row text-center justify-center 
                            gap-4 px-20 sm:px-20 py-10 h-fit transition-all"
            >
                <input type="text" placeholder="Enter a task"
                       className="h-[40px] w-[80%] border-gray-700 border-[1px] 
                                  rounded-lg px-2"
                       value={taskDescription}
                       onChange={handleChange}
                />
                <button type='submit'
                        className="w-[40px] h-[40px] border-gray-700 border-[1px]
                                   rounded-full p-auto hover:bg-gray-900
                                   hover:text-white transition-all"
                        disabled={!taskDescription.trim()}
                > + </button>

            </form>
        </>
    )
}

export default InputTask;
