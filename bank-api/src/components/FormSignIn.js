import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { store } from "../store/index";
import { saveToken } from "../actions/authActions";
import { useNavigate } from "react-router-dom";

const FormSignIn = () => {
	const navigate = useNavigate();
	const usernameRef = useRef(null);
	const passwordRef = useRef(null);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const email = usernameRef.current.value;
		const password = passwordRef.current.value;
		//console.log(JSON.stringify({ email, password }));

		try {
			const response = await fetch("http://localhost:3001/api/v1/user/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			});
			//console.log(response)

			if (response.ok) {
				const data = await response.json();
				//console.log(data)
				const authToken = data.body.token;
				//console.log(authToken)
				//sauvegarder le token dans le store
				store.dispatch(saveToken(authToken));
				//console.log(store.getState().token)

				// Rediriger l'utilisateur vers la page user
				navigate("/user");
			} else {
				// Gérez les erreurs de connexion
				console.log("Échec de la connexion");
			}
		} catch (error) {
			console.log("Erreur lors de la connexion", error);
		}
	};

	return (
		<section className="sign-in-content">
			<FontAwesomeIcon icon={faUserCircle} />
			<h1>Sign In</h1>
			<form onSubmit={handleSubmit}>
				<div className="input-wrapper">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						ref={usernameRef}
						id="username"
						autoComplete="username"
					/>
				</div>
				<div className="input-wrapper">
					<label htmlFor="password">Password</label>
					<input
						type="password"
						ref={passwordRef}
						id="password"
						autoComplete="current-password"
					/>
				</div>
				<div className="input-remember">
					<input type="checkbox" id="remember-me" />
					<label htmlFor="remember-me">Remember me</label>
				</div>
				<button type="submit" className="sign-in-button">
					Sign In
				</button>
			</form>
		</section>
	);
};

export default FormSignIn;
