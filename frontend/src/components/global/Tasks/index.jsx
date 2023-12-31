import { useState, useRef, useEffect } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiCheckboxBlankCircleLine } from "react-icons/ri"
import { RiCheckboxCircleFill } from "react-icons/ri";

// const addTask = async (e) => {
//     e.preventDefault();
//     try {
//         const taskInput = { task_description: taskDescription };
//         const res = await fetch(
//             "http://localhost:3000/tasks",
//             {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(taskInput),
//             }
//         );
//         console.log(JSON.stringify(taskInput));
//         console.log(res);
//         setTaskDescription("");
//     } catch (err) {
//         console.error(err.message);
//     }
// };

const Tasks = () => {
    const [allTasks, setAllTasks] = useState([]);

    async function getTasks() {
        const res = await fetch(
            "http://localhost:3000/tasks"
        );
        const allTasksArray = await res.json();
        setAllTasks(allTasksArray);
    };

    useEffect(() => {
        getTasks();
    }, []);

    console.log(allTasks);

    return (
        <>
            <div className='flex flex-row p-5'>
                <IoMdArrowRoundBack className='text-2xl my-auto
                                               rounded-full hover:bg-pink-100
                                               hover:text-white' />
                <h1 className="text-2xl sm:text-5xl sm:mx-0 text-center 
                               transition-all font-bold p-5 mx-auto"
                >
                    My To-do List
                </h1>
            </div>
            <div className="w-full p-10 flex flex-col gap-4 justify-center">
                {
                    allTasks.map(task => (
                            <Task 
                                  key={task.task_id}
                                  description={task.task_description}
                                  status={task.status}
                                  created={task.created_at}
                                  completed={task.complete_at}
                            />
                    ))
                }
            </div>
        </>
    );
};

const Task = ({description, status, created, completed}) => {
    const [currentStatus, setCurrentStatus] = useState(status);
    return (
        <>
            <div className='p-10 sm:p-16 w-full bg-pink-100 
                            rounded-xl flex flex-col'>
                <div className='flex flex-row gap-5'>
                    {(currentStatus == "Done") ? 
                        <RiCheckboxCircleFill className='text-3xl my-auto'/> :
                        <RiCheckboxBlankCircleLine className='text-2xl my-auto' />}
                    <p>{description}</p>
                </div>
            </div>
        </>
    );
};

export default Tasks;
