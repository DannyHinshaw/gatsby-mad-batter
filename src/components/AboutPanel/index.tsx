import * as React from "react";
import { CupcakeSVG } from "../CupcakeSVG";
import "./AboutPanel.scss";

const AboutPanel = (): JSX.Element => {
	return (
		<section id="about">
			<div id="aboutText" className="panel-text">
				<h3 className="title">ABOUT</h3>
				<div style={{ fontSize: "1.75rem", lineHeight: "2.25rem" }}>
					Mad Batter Cupcakery is a bake-to-order, online bakery based out of Lexington, SC (delivery only).
					We’re happy to supply you with a dozen cupcakes for that simple chocolate craving, or a
					full table of assorted baked goods for that loved one’s birthday. As far as decorating goes,
					the possibilities are endless with both buttercream and fondant as options.
					Dietary restrictions? Not an issue! MBC is knowledgeable in Gluten-Free and Vegan baking!
				</div>
			</div>
			<div id="cupcakeContainer">
				<CupcakeSVG />
			</div>
		</section>
	);
};

export default AboutPanel;
