import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import IconButton from "../iconButton";

const EditTask = ({prop, setProp, task, after}) => {
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
            setProp(false);
            after();
        } catch (error) {
            console.error(error.message)
        }
    };
    async function editTask() {
        console.log("edit", task.task_id);
    };
    return (
        <>
            <div className={` absolute right-9 bg-black text-white flex flex-col
                            p-2 rounded-xl ${prop ? "scale-100 opacity-100" : " scale-0 opacity-0" }
                            transition-all duration-75`}
            >
                <div className="flex flex-col text-xs text-nowrap">
                    <IconButton icon={<FiEdit className="my-auto"/>}
                                text="Edit Task"
                                todo={editTask} />
                    <IconButton icon={<MdDelete className="my-auto"/>}
                                text="Delete Task" 
                                todo={deleteTask} />
                </div>
            </div>
        </>
    );
};

export default EditTask;
