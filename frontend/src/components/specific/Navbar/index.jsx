import { RiCalendarTodoLine } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <div className="flex justify-center bottom-0 right-0 left-0 fixed p-2 z-10">
                <div className="flex flex-row justify-center m-2 rounded-xl gap-10
                              bg-gray-700 w-full p-2"
                >
                    <NavbarLink icon={<AiOutlineHome className="m-auto text-xl text-red-100 group-hover:text-black" />}
                                link="/Pace/" />    
                    <NavbarLink icon={<RiCalendarTodoLine className="m-auto text-xl text-red-100 group-hover:text-black" />}
                                link="/Pace/tasks/" />

                </div>
            </div>
        </>
    );
};

const NavbarLink = ({icon, link }) => {
    return (
        <>
            <NavLink className="p-2 rounded-lg hover:bg-gray-100 bg-gray-700
                                hover:cursor-pointer group flex flex-col 
                                justify-center shadow-black shadow-md" 
                     to={link}
            >
                {icon}
                <p className="text-center text-sm text-red-100 group-hover:text-black">
                    Tasks
                </p>
            </NavLink>
        </>
    )
}

export default Navbar;
