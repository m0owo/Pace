import { useState } from 'react'
const InputTask = () => {
    const [task, setTask] = useState("");
    
    const changeInput = (e) => {
        setTask(e.target.value);
    };

    const addTask = async e => {
        e.preventDefault();
        try {
            const taskInput = { task };
            const res = await fetch(
                "http://localhost:3000/todos",
                {
                    method: "POST",
                    headers: { "Content-Type" : "application/json" },
                    body: JSON.stringify(taskInput)
                });
            console.log(res);
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <>
            <form onSubmit={addTask}
                  className="flex flex-row text-center justify-center 
                            gap-4 p-20 sm:p-40 transition-all"
            >
                <input type="text" placeholder="Enter a task"
                       className="h-[40px] w-[80%] border-gray-700 border-[1px] 
                                  rounded-lg px-2"
                       value={task}
                       onChange={changeInput}
                />
                <button type='submit'
                        className="w-[40px] h-[40px] border-gray-700 border-[1px]
                                   rounded-full p-auto hover:bg-gray-900
                                   hover:text-white transition-all"
                > 
                + 
                </button>

            </form>
        </>
    )
}

export default InputTask;
