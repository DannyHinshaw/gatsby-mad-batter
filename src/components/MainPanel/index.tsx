import BackgroundImage, { IFluidObject } from "gatsby-background-image";
import * as React from "react";
import { ComponentType } from "react";
import { ISectionProps } from "../../pages";

// @ts-ignore
import Logo from "./mad-batter-header-logo.png";
import "./MainPanel.scss";

const MainPanel: ComponentType<ISectionProps> = ({ bgImage }): JSX.Element => (
	<BackgroundImage fluid={bgImage} Tag="section" id="main">
		<div id="logoContainer">
			<img
				src={Logo}
				style={{ maxWidth: "1600px" }}
				id="mainLogo"
				alt="Logo" />
		</div>
	</BackgroundImage>
);

export default MainPanel;
