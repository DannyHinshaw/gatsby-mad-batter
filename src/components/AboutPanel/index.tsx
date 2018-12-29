import * as React from "react";
import { Parallax } from "react-parallax";
import { CupcakeSVG } from "../CupcakeSVG";
import ParallaxPanel from "../ParallaxPanel";
import "./AboutPanel.scss";

const AboutPanel = (): JSX.Element => {
	return (
		<ParallaxPanel scrollId="about" pHeight="100vh">
			<>
				<div id="aboutText" className="panel-text">
					<h3 className="title">ABOUT</h3>
					Mad Batter Cupcakery is a gluten-free, bake-to-order, online bakery based out of Elgin, SC.
					We’re happy to supply you with a six pack of cupcakes for that simple chocolate craving, or a
					full table of assorted baked goods for that loved one’s birthday. As far as decorating goes,
					the possibilities are endless with both buttercream and fondant as options.
				</div>
				<div id="cupcakeContainer">
					<CupcakeSVG />
				</div>
			</>
		</ParallaxPanel>
	);
};

export default AboutPanel;
