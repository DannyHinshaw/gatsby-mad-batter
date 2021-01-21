import { graphql, Link } from "gatsby";
import BackgroundImage from "gatsby-background-image";
import React from "react";
import { IPageProps } from "../globals";
import "./404.scss";


export const query = graphql`
	query {
		file(relativePath: { eq: "charlotte-looking.jpg" }) {
			childImageSharp {
				fluid(quality: 100, maxWidth: 4160) {
					...GatsbyImageSharpFluid_withWebp
				}
			}
		}
	}
`;

const Error = (props: IPageProps): JSX.Element => {
	const { fluid } = props.data.file.childImageSharp;
	const bgOverlay = "rgba(59,57,57,0.54)";
	const bgImageStack = [
		`linear-gradient(${bgOverlay}, ${bgOverlay})`,
		fluid
	];

	return (
		<main id="notFound">
			<BackgroundImage fluid={bgImageStack} Tag="div" id="bgImage">
				<Link to="/" id="homeLink">
					<img src="/logos/dark_logo_transparent_background.png" alt="Mad Batter Logo" id="logo"
					     style={{ height: 150, margin: "4rem" }} />
				</Link>

				<div id="txtContainer">
					<div>
						<h3>Dang...</h3>
						<p>We looked, but there's nothing here :/</p>
						<p>Let’s just forget this happened and <Link to="/">go home...</Link></p>
					</div>
				</div>
			</BackgroundImage>
		</main>
	);
};

export default Error;
