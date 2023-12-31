import { RiCalendarTodoLine } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <div className="flex justify-center bottom-0 right-0 left-0 fixed p-2 z-10">
                <div className="flex flex-row justify-center m-2 rounded-xl gap-10
                                w-full p-2 bg-[#212]"
                >
                    <NavbarLink icon={<AiOutlineHome className="m-auto text-xl text-[#cc2048] group-hover:text-[#4c0e23]" />}
                                link="/Pace/" label="Home" />    
                    <NavbarLink icon={<RiCalendarTodoLine className="m-auto text-xl text-[#cc2048] group-hover:text-[#4c0e23]" />}
                                link="/Pace/tasks/" label="Tasks" />

                </div>
            </div>
        </>
    );
};

const NavbarLink = ({icon, link, label}) => {
    return (
        <>
            <NavLink className="p-2 rounded-lg hover:cursor-pointer group
                                flex flex-col transition-all justify-center" 
                     to={link}
            >
                {icon}
                <p className="text-center text-sm text-[#cc2048]
                            group-hover:text-[#4c0e23] font-akrasia">
                {label}
                </p>
            </NavLink>
        </>
    )
}

export default Navbar;
