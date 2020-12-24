import * as React from "react";
import "./PromoPanel.scss";


const PromoPanel = (): JSX.Element => {
	return (
		<section id="promo" className={"single"}>
			<div id="promoText" className="panel-text">
				<div className="title-container">
					<h3 className="title">
						PROMOS & SPECIALS
					</h3>
				</div>

				{/*<div id="special" style={{ fontSize: "1.75rem", lineHeight: "2.25rem" }}>*/}
				{/*	<h1>*/}
				{/*		OCTOBER SAMPLER PACK!*/}
				{/*	</h1>*/}

				{/*	<img className="img-circle" src="/imgs/fall-sampler.jpg" alt="Fall Sampler Pack" />*/}

				{/*	<div className="align-left">*/}
				{/*		<p>*/}
				{/*			<strong>What: </strong> Sampler pack of cupcakes (red velvet, mexican hot chocolate, s'mores, and*/}
				{/*			pumpkin),*/}
				{/*			macarons (vanilla and hazelnut), and mini pies (pumpkin and apple)=12 pieces in total*/}
				{/*		</p>*/}

				{/*		<p>*/}
				{/*			<strong>When: </strong> For delivery ONLY on Wednesdays, every week for the month of*/}
				{/*			October (first come first serve), from 8am-2pm*/}
				{/*		</p>*/}

				{/*		<p>*/}
				{/*			<strong>How Much: </strong> $30 + delivery (varies depending on where you're located)*/}
				{/*		</p>*/}

				{/*		<p>*/}
				{/*			<i>*Sampler pack only available for Wednesday deliveries, but individual items/flavors*/}
				{/*				are available full time with a minimum order requirement of one dozen.</i>*/}
				{/*			<br />*/}
				{/*			<i>**Contains nuts/dairy/gluten</i>*/}
				{/*		</p>*/}
				{/*	</div>*/}
				{/*</div>*/}

				{/*<br />*/}
				{/*<hr />*/}

				<div id="promo" style={{ fontSize: "1.75rem", lineHeight: "2.25rem" }}>
					<br />

					<h1>THIS WEEK AT SECOND WAVE CAFE!</h1>
					<i style={{ fontSize: "20px" }}>529 S Lake Dr, Lexington, SC 29072</i>

					<br />

					<img className="img-circle" src="/imgs/2nd-wave-cupcake.jpeg" alt="Second Wave" />
					<p>
						You can pick up these goodies at <a href="https://www.facebook.com/SecondWaveCoffeeBooks"
						                                    target="_blank" rel="noreferrer">Second Wave Cafe!</a>
					</p>
					<p id="menuItems">
						<p>• Brownies</p>
						<p>• Cake Batter Macarons</p>
						<p>• Chocolate Cupcake with Cream Cheese Icing</p>
						<p>• Gluten-free Red Velvet Cupcake</p>
						<p>• Vegan Vanilla Cupcake with Chocolate Icing</p>
					</p>
					<br />
					<i>
						Get them while supplies last!
					</i>
				</div>
			</div>
		</section>
	);
};

export default PromoPanel;
