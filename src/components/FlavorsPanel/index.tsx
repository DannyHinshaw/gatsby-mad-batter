import * as React from "react";
import "./FlavorsPanel.scss";

const FlavorsPanel = (): JSX.Element => {
	return (
		<section id="flavors" className="panel-text">
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
		</section>
	);
};

export default FlavorsPanel;
