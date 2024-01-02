import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PageError from "./pages/PageError";
import SignIn from "./pages/SignIn";
import User from "./pages/User";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<SignIn />} />
				<Route path="/profil" element={<User />} />
				{/* path="*" fonctionne si jamais l'url ne correspond à rien de dééclaré au dessus  */}
				<Route path="*" element={<PageError />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
