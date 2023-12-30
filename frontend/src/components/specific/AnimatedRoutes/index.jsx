import { Route, Routes, Navigate, useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "../../../pages/home";
import TasksList from "../../../pages/TasksList";


const AnimatedRoutes = () => {
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path='/Pace/' element={<Home />}></Route>
                <Route path='/Pace/tasks/' element={<TasksList />}></Route>
                <Route path='*' element={<Navigate to='/Pace/' replace={true} />}></Route>
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes;
