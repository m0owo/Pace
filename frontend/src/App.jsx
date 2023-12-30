import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "./components/specific/AnimatedRoutes";
import Navbar from "./components/specific/Navbar";

function App() {
	return (
		<Router>
			<Navbar />
			<AnimatedRoutes />
		</Router>
	)
}

export default App;
