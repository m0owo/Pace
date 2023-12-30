import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "../../pages/home";

const AnimatedRoutes = () => {
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<Home />}></Route>
                <Route path='*' element={<Home />}></Route>

            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes;
