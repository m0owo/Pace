import { RiCalendarTodoLine } from "react-icons/ri";
import { AiOutlineHome } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
    return (
        <>
            <motion.div className="flex justify-center bottom-0 right-0 left-0 fixed p-2 z-10"
                        initial={{y:500}}
                        animate={{y:0}}
                        transition={{duration:0.3}}
            >
                <div className="flex flex-row justify-center m-2 rounded-xl gap-10
                                w-full p-2 bg-[#33182a]"
                >
                    <motion.div initial={{x:-400}}
                                animate={{x:0}}
                                transition={{duration: 0.3}}
                    >
                        <NavbarLink icon={<AiOutlineHome className="m-auto text-xl text-[#ce5974] group-hover:text-[#4c0e23]" />}
                                    link="/Pace/" label="Home" />   
                    </motion.div>
                    <motion.div initial={{x:-400}}
                                animate={{x:0}}
                                transition={{duration: 0.35}}
                    >
                        <NavbarLink icon={<RiCalendarTodoLine className="m-auto text-xl text-[#ce5974] group-hover:text-[#4c0e23]" />}
                                    link="/Pace/tasks/" label="Tasks" /> 
                    </motion.div>
                </div>
            </motion.div>
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
                <p className="text-center text-sm text-[#ce5974]
                            group-hover:text-[#4c0e23] font-akrasia">
                {label}
                </p>
            </NavLink>
        </>
    )
}

export default Navbar;
