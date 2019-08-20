import * as React from "react";
import ParallaxPanel from "../ParallaxPanel";
import "./FlavorsPanel.scss";

const FlavorsPanel = (): JSX.Element => {
	return (
		<ParallaxPanel scrollId="flavors" pHeight="100vh">
			<div id="flavorsText" className="panel-text">
				<h3 className="title" style={{ width: "23rem" }}>
					SEASONAL FLAVORS
				</h3>
				<div id="flavorsGrid">
					<div>Vanilla</div>
					<div>Chocolate</div>
					<div>Red Velvet</div>
					<div>Funfetti</div>
					<div>Lemon</div>
					<div>Coconut</div>
					<div>PB&J</div>
					<div>White Almond</div>
				</div>
			</div>
		</ParallaxPanel>
	);
};

export default FlavorsPanel;
