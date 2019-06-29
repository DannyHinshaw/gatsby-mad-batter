import * as React from "react";
import ParallaxPanel from "../ParallaxPanel";
import "./PromoPanel.scss";


const PromoPanel = (): JSX.Element => {
	return (
		<ParallaxPanel scrollId="promo">
			<>
				<div id="promoText" className="panel-text">
					<div className="title-container">
						<h3 className="title">
							PROMOS & SPECIALS
						</h3>
					</div>

					<div id="special" style={{ fontSize: "1.75rem", lineHeight: "2.25rem" }}>
						<h1>4th OF JULY SPECIAL</h1>
						<br />
						<p>
							<strong>What:</strong> 8" layer cake (your choice of chocolate, vanilla, or red velvet), decorated with
							red/white/blue
						</p>

						<p>
							<strong>When:</strong> for delivery July 4th, (8am-1pm)
						</p>

						<p>
							<strong>How Much:</strong> $35 (delivery not included)
						</p>

						<p>
							Contact me to get your order in! And of course,
						</p>

						<p>
							I'm also still taking orders for any other goodies you may want😁
						</p>
					</div>

					<br />
					<hr />

					<div id="promo" style={{ fontSize: "1.75rem", lineHeight: "2.25rem" }}>
						<h1>FRESH MAD BATTER TEES!</h1>
						<img className="img-circle" src="/imgs/mbc-tee.jpg" alt="MBC-Tee" />
						<p>
							Variety of styles available, starting @ $21.99!
						</p>

						<p>
							<a target="_blank" href="https://www.bonfire.com/mad-batter-cupcakery-shirts/">
								To shop click here!
							</a>
						</p>

					</div>

				</div>
			</>
		</ParallaxPanel>
	);
};

export default PromoPanel;
