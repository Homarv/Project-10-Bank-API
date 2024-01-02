import React from "react";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import Features from "../components/Features";
import Footer from "../components/Footer";

const home = () => {
	return (
		<div className="content">
			<Navbar />
			<Banner />
			<Features />
			<Footer />
		</div>
	);
};

export default home;
