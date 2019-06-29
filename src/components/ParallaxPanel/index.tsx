import * as React from "react";
import { CSSProperties } from "react";
import { Parallax } from "react-parallax";
import { Element } from "react-scroll";

export interface IParallaxPanelProps {
	insideStyles?: CSSProperties
	innerText?: string
	inverse?: boolean
	pHeight?: string
	bgImage?: string
	children: JSX.Element
	scrollId: string
}

/**
 * Parallax Panel wrapper component.
 * @param {IParallaxPanelProps} props
 * @returns {any}
 * @constructor
 */
const ParallaxPanel = (props: IParallaxPanelProps) => {
	return (
		<Element name={props.scrollId} style={{ position: "relative" }}>
			<Parallax bgImage={props.bgImage} strength={props.inverse ? (-1) * 500 : 500} blur={{ min: -1, max: 3 }}>
				<div style={props.pHeight ? { minHeight: props.pHeight } : {}}>
					{props.children}
				</div>
			</Parallax>
		</Element>
	);
};

export default ParallaxPanel;
