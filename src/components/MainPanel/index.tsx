import * as React from "react";
import { baseUrl } from "../../api";
import ParallaxPanel from "../ParallaxPanel";
import "./MainPanel.scss";


const bgImage: string = `${baseUrl}/upload/q_15,f_auto/v1561671612/mad-batter/disney_witches.jpg`;

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
