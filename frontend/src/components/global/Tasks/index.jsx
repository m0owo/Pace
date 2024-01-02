import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiCheckboxBlankCircleLine } from "react-icons/ri"
import { RiCheckboxCircleFill } from "react-icons/ri";
import { HiDotsVertical } from "react-icons/hi";
import { motion, AnimatePresence } from 'framer-motion';
import EditTask from '../EditTask';


const Tasks = () => {
    const [allTasks, setAllTasks] = useState([]);

    async function getTasks() {
        try {
            const res = await fetch(
                "http://localhost:3000/tasks"
            );
            const allTasksArray = await res.json();
            setAllTasks(allTasksArray);
        } catch (error) {
            console.error(error.message);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    console.log(allTasks);

    const Task = ({task}) => {
        const [showEdit, setShowEdit] = useState(false);
        const [currentStatus, setCurrentStatus] = useState(task.status);

        async function changeStatus() {
            try {
                const newStatus = currentStatus === "Done" ? "To Do" : "Done";
                const res = await fetch(
                    `http://localhost:3000/tasks/${task.task_id}/status`,
                    {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ status: newStatus }),
                    }
                );
                console.log(JSON.stringify({ status: newStatus }));
                console.log(await res.json());
                setCurrentStatus(newStatus);
            } catch (error) {
                console.error(error.message);
            }
        }    
        return (
            <>
                <motion.div className='p-10 sm:p-16 w-full bg-red-50 
                                rounded-xl flex flex-col shadow-md
                                gap-4 relative'
                            initial={{y : -100}}
                            animate={{y: 0}}>
                    <div className='absolute top-5 right-5 flex flex-row justify-end'>
                        <p className='text-xs opacity-50 font-helveticaneue font-normal'>
                            {/* {(currentStatus == "Done" && ) ?
                            `Date Completed ${task.formatted_completed_at}` :
                            `Date Added ${task.formatted_created_at}` 
                            } */}
                            {`Date Added ${task.formatted_created_at}`} 
                        </p>
                    </div>
                    <div className='h-[90%] flex flex-row gap-5 relative'>
                        <div onClick={changeStatus}
                            className='flex flex-row transition-all'>
                                <RiCheckboxCircleFill className={`my-auto text-2xl transition-all
                                                                ${(currentStatus == "Done") ? 
                                                                    "opacity-100 scale-100" : 
                                                                    "opacity-0 scale-0 w-0"}
                                                                    fill-red-900`}
                                                    onClick={() => setCurrentStatus("To Do")}
                                />
                                <RiCheckboxBlankCircleLine className={`my-auto text-2xl transition-all
                                                                    ${(currentStatus == "Done") ? 
                                                                    "opacity-0 scale-0 w-0": 
                                                                    "opacity-100 scale-100"}`}
                                                    onClick={() => setCurrentStatus("Done")}
                                />

                        </div>
                        <p className={`${(currentStatus == "Done") ? "line-through opacity-40" : "" }
                                      font-helveticaneue font-bold text-md sm:text-lg`}>
							{task.task_description}
						</p>
                    </div>
					<div className='absolute top-5 right-5 flex flex-row'>
                        <EditTask prop={showEdit} setProp={setShowEdit} task={task} after={getTasks} />
						<HiDotsVertical className='absolute right-0 sm:my-12 my-8 rounded-full text-2xl p-1
                                                 hover:text-gray-100 hover:bg-gray-800 sm:text-3xl
                                                   transition-all'
                                        onClick={() => {setShowEdit(!showEdit)}} />
					</div>
                </motion.div>
            </>
        );
    };

    return (
        <>
            <div className='flex flex-row p-5'>
                <NavLink className="my-auto" to="/Pace/">
                    <IoMdArrowRoundBack className='text-2xl my-auto
                                                rounded-full text-[#4c0e23]
                                                hover:text-red-100' 
                                        
                    />
                </NavLink>
                <h1 className="text-5xl sm:text-6xl sm:mx-10 text-center 
                            transition-all font-extrabold p-5 mx-auto font-akrasia
                            text-[#4c0e23]"
                >
                    My Project
                </h1>
            </div>
            <motion.div className="w-full p-10 flex flex-col gap-4 justify-center mb-40"
            >
                {
                    allTasks.map(task => (
                            <Task 
                                  key={task.task_id}
                                  task={task}
                            />
                    ))
                }
            </motion.div>
        </>
    );
};

export default Tasks;
