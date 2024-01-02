import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FormSignIn from "../components/FormSignIn";

const SignIn = () => {
	return (
		<div className="content">
			<Navbar />
			<main className="main bg-dark">
				<FormSignIn />
			</main>
			<Footer />
		</div>
	);
};

export default SignIn;
