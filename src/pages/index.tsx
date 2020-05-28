import { graphql } from "gatsby";
import * as React from "react";
import { ComponentType } from "react";
import { Provider } from "react-redux";
import "semantic-ui-css/semantic.min.css";
import AboutPanel from "../components/AboutPanel";
import ContactPanel from "../components/ContactPanel";
import GalleryPanel from "../components/GalleryPanel";
import MainPanel from "../components/MainPanel";
import Navbar from "../components/Navbar";
import SEO from "../components/SEO";
import TestimonialPanel from "../components/TestimonialsPanel";
import { IFluidImage, IImageNode } from "../globals";
import { store } from "../store";
import "./Index.scss";


export interface ISectionProps {
	bgImage: IFluidImage
}

interface IndexPageProps {
	data: {
		site: {
			siteMetadata: {
				name: string;
				tagline: string;
			},
		},
		allImageSharp: {
			edges: IImageNode[]
		}
	}
}

export const query = graphql`
	query {
		allImageSharp {
			edges {
				node {
					id
					fluid(quality: 100, maxWidth: 1600) {
						...GatsbyImageSharpFluid_withWebp
						originalName
					}
				}
			}
		}
	}
`;

/**
 * Main page layout component.
 * @param {IndexPageProps} props
 * @returns {JSX.Element}
 * @constructor
 */
const Index: ComponentType<IndexPageProps> = (props: IndexPageProps) => {
	const mainBG = "shannon-setting-up.jpg";
	const contactBG = "cupcakes-background.jpg";
	const testimonialsBG = "birch-background.jpg";
	const images = props.data.allImageSharp.edges.reduce((base, curr) => {
		const { node } = curr;
		return {
			...base,
			[node.fluid.originalName]: node
		};
	}, {});

	return (
		<Provider store={store}>
			<SEO />
			<Navbar />
			<main>
				<MainPanel bgImage={images[mainBG].fluid} />
				{/*<PromoPanel />*/}
				<AboutPanel />
				<TestimonialPanel bgImage={images[testimonialsBG].fluid} />
				{/*<FlavorsPanel />*/}
				<GalleryPanel />
				<ContactPanel bgImage={images[contactBG].fluid} />
			</main>
		</Provider>
	);
};

export default Index;
