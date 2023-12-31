import { RiCalendarTodoLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <div className="flex justify-center bottom-0 right-0 left-0 fixed p-2">
                <div className="flex flex-row justify-center m-2 rounded-xl 
                              bg-blue-200 w-full p-2">
                    <NavbarLink link="/Pace/tasks/" />
                </div>
            </div>
        </>
    );
};

const NavbarLink = ({ link }) => {
    return (
        <>
            <NavLink className="p-2 rounded-lg bg-gray-100 hover:bg-gray-700
                                hover:cursor-pointer group flex flex-col 
                                justify-center" 
                     to={link}>
                <RiCalendarTodoLine className="m-auto text-xl group-hover:text-red-100" />
                <p className="text-center text-sm group-hover:text-red-100">
                    Tasks
                </p>
            </NavLink>
        </>
    )
}

export default Navbar;
