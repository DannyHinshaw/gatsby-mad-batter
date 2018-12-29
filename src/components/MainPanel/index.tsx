import * as React from "react";
import ParallaxPanel from "../ParallaxPanel";
import "./MainPanel.scss";

const MainPanel = (): JSX.Element => {
	return (
		<ParallaxPanel scrollId="main" bgImage="imgs/disney_witches.jpeg" pHeight="100vh">
			<img
				id="mainLogo"
				style={{ maxWidth: "100vw" }}
				src="/logos/logo_transparent_background_white(hat_below).png"
				alt="Logo" />
		</ParallaxPanel>
	);
};

export default MainPanel;
