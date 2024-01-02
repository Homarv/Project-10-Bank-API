import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Accounts from "../components/Accounts";
import { store } from "../store/index";
import { useNavigate } from "react-router-dom";

const User = () => {
	const authToken = store.getState().token;
	const navigate = useNavigate();

	useEffect(() => {
		async function authenticateUser() {
			if (!authToken) {
				// Rediriger l'utilisateur vers la page de connexion
				navigate("/login");
				return;
			}
		}
		authenticateUser();
	}, [authToken, navigate]);

	return (
		<div className="content">
			<Navbar />
			<main className="main bg-dark">
				<Header />
				<Accounts />
			</main>
			<Footer />
		</div>
	);
};

export default User;
