import React from "react";
import "./CupcakeSVG.scss";

export const CupcakeSVG = () => {
	// SVG adapted from mermer's design (thank you!): https://codepen.io/mer-mer/pen/ALNAGr
	return (
		<svg id="cupcake-svg" version="1.1" x="0px" y="0px" width="150px" height="25vh" viewBox="5.375 0 39.25 50"
		     style={{ overflow: "visible" }} enableBackground="new 5.375 0 39.25 50">
			<g id="Layer_1">
				<path className="path line-4" fill="none" stroke="#EBF0FA" strokeWidth="0.8" strokeMiterlimit="10" d="M15.248,15.688c0,0-0.147-4.094,1.877-6.468
		c1.306-1.531,2-2.095,3.875-3.22c0,0,0.869,3.125,6.935,4.5s15.434,2.688,8.222,12.069" />
				<path className="path line-2" fill="none" stroke="#EBF0FA" strokeWidth="0.75" strokeMiterlimit="10" d="M39.832,30.25c0,0,2.668-1.777,2.668-5.25
		c0-3.473-4.198-5.535-4.198-5.535" />
				<path className="path line-3" fill="none" stroke="#EBF0FA" strokeWidth="0.75" strokeMiterlimit="10" d="M12,23c0,0-1.135-3.535,0.875-5.75
		c1.903-2.098,9.119-2.899,9.119-2.899" />
				<path className="path line-2" fill="none" stroke="#EBF0FA" strokeWidth="0.75" strokeMiterlimit="10" d="M22.983,20.391c0,0-5.573,1.416-9.15,2.275
		c-2.926,0.703-5.421,0.96-5.583,3.833s1.749,3.75,1.749,3.75" />
				<path className="path line-3" fill="none" stroke="#EBF0FA" strokeWidth="0.75" strokeMiterlimit="10" d="M26.083,19.465c0,0,4.974-1.549,7.417-3.132
		c1.935-1.253,2.53-3.146,2.53-3.146" />
				<path className="path line-1" fill="none" stroke="#EBF0FA" strokeWidth="0.75" strokeMiterlimit="10" d="M33.792,24.781
		c-4.604,3.969-10.809,5.469-10.809,5.469" />
				<g>
					<path fill="none" stroke="#EBF0FA" strokeWidth="0.75" strokeMiterlimit="10" d="M7.417,30.25h34.5l-4,17.75
			c0,0,0.06,1.25-1.887,1.25s-21.947,0-21.947,0s-1.967,0.416-2.442-1.25S7.417,30.25,7.417,30.25z" />
					<line fill="none" stroke="#EBF0FA" strokeWidth="0.75" strokeMiterlimit="10" x1="11.642" y1="30.25"
					      x2="15.25"
					      y2="49.25" />
					<line fill="none" stroke="#EBF0FA" strokeWidth="0.75" strokeMiterlimit="10" x1="16" y1="30.25" x2="18.333"
					      y2="49.296" />
					<line fill="none" stroke="#EBF0FA" strokeWidth="0.75" strokeMiterlimit="10" x1="20.333" y1="30.25"
					      x2="21.583"
					      y2="49.296" />
					<line fill="none" stroke="#EBF0FA" strokeWidth="0.75" strokeMiterlimit="10" x1="24.667" y1="30.25"
					      x2="24.667"
					      y2="49.296" />
					<line fill="none" stroke="#EBF0FA" strokeWidth="0.75" strokeMiterlimit="10" x1="29.291" y1="30.25" x2="28"
					      y2="49.296" />
					<line fill="none" stroke="#EBF0FA" strokeWidth="0.75" strokeMiterlimit="10" x1="33.25" y1="30.25"
					      x2="31.057"
					      y2="49.296" />
					<line fill="none" stroke="#EBF0FA" strokeWidth="0.75" strokeMiterlimit="10" x1="37.667" y1="30.25"
					      x2="34.167"
					      y2="49.296" />
				</g>
				<g className="cherry">
					<circle fill="#FFFFFF" stroke="#EBF0FA" strokeWidth="0.75" strokeMiterlimit="10" cx="26.897" cy="9.22"
					        r="3.968" />
					<path className="cherry-stem" fill="none" stroke="#EBF0FA" strokeWidth="0.75" strokeMiterlimit="10" d="M36.03,1.375c0,0-2.675-1.35-5.165,0.125
			s-2.703,3.23-2.931,3.893" />
				</g>
			</g>
		</svg>
	);
};
