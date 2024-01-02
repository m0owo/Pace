import { useState } from 'react';
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import IconButton from "../iconButton";

const EditTask = ({prop, setProp, task, after}) => {
    const [description, setDescription] = useState(task.task_description);
    const [editing, setEditing] = useState(false);

    const toggleEditing = () => {
        setEditing(!editing);
    }

    const handleChange = (e) => {
        setDescription(e.target.value);
    }

    async function deleteTask() {
        try {
            const res = await fetch(
                `http://localhost:3000/tasks/${task.task_id}`,
                {
                    method: "DELETE",
                    headers: { "Content-Type" : "application/json" }
                }
            )
            console.log(res.json());
            await setProp(false);
            await after();
        } catch (error) {
            console.error(error.message)
        }
    };

    async function editTask() {
        try {
            const newDescription = { task_description : description }; 
            const res = await fetch(
                `http://localhost:3000/tasks/${task.task_id}/description`,
                {
                    method: "PUT",
                    headers: { "Content-Type" : "application/json" },
                    body: JSON.stringify(newDescription)
                }
            )
            console.log(res.json());
            console.log("description", newDescription);
        } catch (error) {
            console.error(error.message);
        }
    };
    return (
        <>
            <div className='w-screen'>
                {editing && (
                        <div
                            className="fixed inset-0 h-[100%] bg-black opacity-40 z-20"
                            onClick={toggleEditing}
                        ></div>
                )}
                <div className={`border-black border-[1px] bottom-0 fixed right-0
                                w-[100%] rounded-t-lg transition-all z-50 bg-gray-100
                                ${editing ? "h-[40%]" : "h-[0%] invisible"}`}
                >
                    <h2 className='font-helveticaneue font-semibold text-2xl
                               sm:text-3xl pt-10 pl-8'>Edit Task Description</h2>
                    <form
                        onSubmit={editTask}
                        className="flex flex-row text-center justify-center fixed
                                    gap-4 px-20 sm:px-20 py-6 h-fit transition-all
                                    w-full"
                    >
                        <input
                            type="text"
                            placeholder={task.task_description}
                            className="h-[50px] w-[80%] border-gray-700 border-[1px] 
                                        rounded-lg px-2 font-helveticaneue font-normal"
                            value={description}
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            className="w-auto h-[50px] border-gray-700 border-[1px]
                                    rounded-full p-2 hover:bg-gray-900 justify-center
                                    hover:text-white transition-all text-nowrap
                                    text-center text-md bg-white font-helveticaneue
                                    font-semibold"
                            disabled={!task.task_description.trim()}
                        >
                            Finish Editing
                        </button>
                    </form>
                </div>
            </div>

            <div className={` absolute right-9 bg-black text-white flex flex-col
                            p-2 rounded-xl ${prop ? "scale-100 opacity-100" : " scale-0 opacity-0" }
                            transition-all duration-75`}
            >
                <div className="flex flex-col text-xs text-nowrap">
                    <IconButton icon={<FiEdit className="my-auto"/>}
                                text="Edit Task"
                                todo={() => {setEditing(true)}} />
                    <IconButton icon={<MdDelete className="my-auto"/>}
                                text="Delete Task" 
                                todo={deleteTask} />
                </div>
            </div>
        </>
    );
};

export default EditTask;
