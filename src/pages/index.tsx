import * as React from "react";
import { CSSProperties } from "react";
import "semantic-ui-css/semantic.min.css";
import AboutPanel from "../components/AboutPanel";
import ContactPanel from "../components/ContactPanel";
import GalleryPanel from "../components/GalleryPanel";
import MainPanel from "../components/MainPanel";
import Navbar from "../components/Navbar";
import PromoPanel from "../components/PromoPanel";
import SEO from "../components/SEO";
import TestimonialPanel from "../components/TestimonialsPanel";
import "./Index.scss";

interface IndexPageProps {
	data: {
		site: {
			siteMetadata: {
				name: string;
				tagline: string;
			},
		},
	};
}

export interface IParallaxProps {
	insideStyles: CSSProperties
	pHeight: string
	text?: string
}

/**
 * Main page layout component.
 * @param {IndexPageProps} props
 * @returns {JSX.Element}
 * @constructor
 */
export class Index extends React.Component<IndexPageProps> {
	public componentDidMount() {
		const parallaxDivs: NodeListOf<HTMLDivElement> = document.querySelectorAll(".react-parallax");
		parallaxDivs.forEach((div: HTMLDivElement, i: number) => {
			div.style.zIndex = String(100 - i);
		});
	};

	public render() {
		return (
			<>
				<SEO />
				<main>
					<Navbar />
					<MainPanel />
					<PromoPanel />
					<AboutPanel />
					<TestimonialPanel />
					<GalleryPanel />
					<ContactPanel />
				</main>
			</>
		);
	}
}

export default Index;
