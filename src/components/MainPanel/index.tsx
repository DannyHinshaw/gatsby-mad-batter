import * as React from "react";
import { baseUrl, bgImageQuality } from "../../api";
import ParallaxPanel from "../ParallaxPanel";
import "./MainPanel.scss";


const bgImage: string = `${baseUrl}/upload/${bgImageQuality},f_auto/v1563103451/mad-batter/disney_witches.jpg`;

const MainPanel = (): JSX.Element => {
	return (
		<ParallaxPanel scrollId="main" bgImage={bgImage} pHeight="100vh">
			<img
				id="mainLogo"
				style={{ maxWidth: "100vw" }}
				src="/logos/logo_transparent_background_white(hat_below).png"
				alt="Logo" />
		</ParallaxPanel>
	);
};

export default MainPanel;
