import { useState, useRef, useEffect } from 'react';

const InputTask = () => {
    const [taskDescription, setTaskDescription] = useState("");
    const [expanded, setExpanded] = useState(false);
    const taskInputRef = useRef(null);

    useEffect(() => {
        if (expanded) {
            taskInputRef.current.focus();
        }
    }, [expanded]);

    const handleChange = (e) => {
        setTaskDescription(e.target.value);
    };

    const expandForm = () => {
        setExpanded(!expanded);
    };

    const addTask = async (e) => {
        e.preventDefault();
        try {
            const taskInput = { task_description: taskDescription };
            const res = await fetch(
                "http://localhost:3000/tasks",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(taskInput),
                }
            );
            console.log(JSON.stringify(taskInput));
            console.log(res);
            setTaskDescription("");
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <>
            {expanded && (
                <div
                    className="fixed inset-0 h-[61%] bg-black opacity-40"
                    onClick={expandForm}
                ></div>
            )}

            <button
                className={`w-[40px] h-[40px] border-gray-700 border-[1px]
                               rounded-full hover:bg-gray-900 bg-white
                             hover:text-white transition-all z-50
                               fixed m-6 ${expanded ? "bottom-60 right-1" : 
                               "bottom-20 right-4"}`}
                onClick={expandForm}
            >
                {expanded ? "-" : "+"}
            </button>
            <div
                className={`border-black border-[1px] bottom-0 fixed
                            w-full rounded-t-lg transition-all z-20 bg-gray-100
                            ${expanded ? "h-[40%]" : "h-[0%] invisible"}`}
            >
                <form
                    onSubmit={addTask}
                    className="flex flex-row text-center justify-center fixed
                                gap-4 px-20 sm:px-20 py-20 h-fit transition-all
                                w-full"
                >
                    <input
                        type="text"
                        placeholder="Enter a task"
                        className="h-[50px] w-[80%] border-gray-700 border-[1px] 
                                    rounded-lg px-2"
                        value={taskDescription}
                        onChange={handleChange}
                        ref={taskInputRef}
                    />
                    <button
                        type="submit"
                        className="w-auto h-[50px] border-gray-700 border-[1px]
                                    rounded-full p-2 hover:bg-gray-900 justify-center
                                    hover:text-white transition-all text-nowrap
                                    text-center text-md bg-white"
                        disabled={!taskDescription.trim()}
                    >
                        + Add Task
                    </button>
                </form>
            </div>
        </>
    );
};

export default InputTask;
