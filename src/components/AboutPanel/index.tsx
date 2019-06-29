import * as React from "react";
import { CupcakeSVG } from "../CupcakeSVG";
import ParallaxPanel from "../ParallaxPanel";
import "./AboutPanel.scss";

const AboutPanel = (): JSX.Element => {
	return (
		<ParallaxPanel scrollId="about" pHeight="100vh">
			<>
				<div id="aboutText" className="panel-text">
					<h3 className="title">ABOUT</h3>
					<div style={{ fontSize: "1.75rem", lineHeight: "2.25rem" }}>
						Mad Batter Cupcakery is a bake-to-order, online bakery based out of Elgin, SC that delivers straight
						to your door. We’re happy to supply you with a six pack of cupcakes for that simple chocolate craving, or a
						full table of assorted baked goods for that loved one’s birthday. As far as decorating goes,
						the possibilities are endless with both buttercream and fondant as options.
						Dietary restrictions? Not an issue! MBC is knowledgeable in Gluten-Free and Vegan baking!
					</div>
				</div>
				<div id="cupcakeContainer">
					<CupcakeSVG />
				</div>
			</>
		</ParallaxPanel>
	);
};

export default AboutPanel;
