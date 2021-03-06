import BackgroundImage, { IFluidObject } from "gatsby-background-image";
import * as React from "react";
import { ComponentType } from "react";
import { ISectionProps } from "../../pages";
import "./MainPanel.scss";


const MainPanel: ComponentType<ISectionProps> = ({ bgImage }): JSX.Element => (
	<BackgroundImage fluid={bgImage} Tag="section" id="main">
		<div id="logoContainer">
			<img
				src="/logos/logo_transparent_background_white(hat_below).png"
				style={{ maxWidth: "1600px" }}
				id="mainLogo"
				alt="Logo" />
		</div>
	</BackgroundImage>
);

export default MainPanel;
