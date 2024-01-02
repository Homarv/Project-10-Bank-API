import React from "react";
import FeatureItem from "./FeatureItem";
import money from "../assets/images/icon-money.png";
import chat from "../assets/images/icon-chat.png";
import security from "../assets/images/icon-security.png";

const Features = () => {
	return (
		<section className="features">
			<h2 className="sr-only">Features</h2>
			<FeatureItem
				image={chat}
				alt="Chat Icon"
				title="You are our #1 priority"
				text="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
			/>
			<FeatureItem
				image={money}
				alt="Money Icon"
				title="More savings means higher rates"
				text="The more you save with us, the higher your interest rate will be!"
			/>
			<FeatureItem
				image={security}
				alt="Security Icon"
				title="Security you can trust"
				text="We use top of the line encryption to make sure your data and money is always safe."
			/>
		</section>
	);
};

export default Features;
