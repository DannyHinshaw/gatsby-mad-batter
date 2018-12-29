import * as React from "react";
import Slider, { Settings } from "react-slick";
import ParallaxPanel from "../ParallaxPanel";
import "./TestimonialsPanel.scss";

interface ITestimonialObj {
	quote: string
	name: string
}

const testimonials: ITestimonialObj[] = [
	{
		name: "Melody A",
		quote: `Amazing!!!! The flavors, the details in her work, one bite and you are taken to a place of happiness! 
		The fondant is actually worth eating, I know most of the time you would peel it off and move it to the side but 
		not hers it tastes like your normal buttercream  icing. Wow!`
	},
	{
		name: "Paul P",
		quote: `The artistic talent of the products produced by this company are of top quality. The types of baked goods, 
		flavors, styles and freshness are amazing. This company puts a lot of work into producing home made, fresh baked 
		goods. Nothing coming out of a box from this kitchen. Highly recommend you try their products.`
	},
	{
		name: "Betsy H",
		quote: `Mad Batter does such amazing work and has so many unique flavors and decorating options available! 
		Creativity just flows from Mad Batter Cupcakery!`
	},
	{
		name: "Janet P",
		quote: `Mad about Mad Batter Cupcakery! Creative and scrumptious describe Shannon’s artistry. 
		Wishing to please the customer, she takes great care in her baking.`
	},
	{
		name: "Courtney P",
		quote: `Most tasty treats this side of the Mississippi. And super affordable. Plus the girl who makes them is super good looking.`
	}
];

const PrevButton = (props): JSX.Element => {
	const { currentSlide, slideCount, className, onClick } = props;
	return (
		<div onClick={onClick}>
			<button type="button" data-role="none" className="slick-arrow slick-prev" aria-label="prev">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" version="1.1">
					<path fill="#FFFFFF" d="M 16,16.46 11.415,11.875 16,7.29 14.585,5.875 l -6,6 6,6 z" />
				</svg>
			</button>
		</div>
	);
};
const NextButton = (props): JSX.Element => {
	const { currentSlide, slideCount, className, onClick } = props;
	return (
		<div onClick={onClick}>
			<button type="button" data-role="none" className="slick-arrow slick-next" aria-label="next">
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
					<path fill="#FFFFFF" d="M8.585 16.46l4.585-4.585-4.585-4.585 1.415-1.415 6 6-6 6z" />
				</svg>
			</button>
		</div>
	);
};

const settings: Settings = {
	dots: true,
	fade: true,
	infinite: true,
	speed: 500,
	slidesToShow: 1,
	slidesToScroll: 1,
	autoplay: true,
	autoplaySpeed: 7500,
	prevArrow: <PrevButton />,
	nextArrow: <NextButton />
};

/**
 * Generate blockquote html.
 * @param {ITestimonialObj} testimonial
 * @param {number} key
 * @returns {JSX.Element}
 */
const testimonialQuote = (testimonial: ITestimonialObj, key: number): JSX.Element => (
	<div className="quote-container" key={key}>
		<div className="quote">
			<blockquote>
				<p>
					{testimonial.quote}
				</p>
				<cite>
					<span>
						{testimonial.name}
					</span>
				</cite>
			</blockquote>
		</div>
	</div>
);

/**
 * Generates html for all blockquote.
 * @param {ITestimonialObj} testimonial
 * @param {number} i
 * @returns {JSX.Element}
 */
const generateQuote = (testimonial: ITestimonialObj, i: number) => testimonialQuote(testimonial, i);

/**
 * Testimonial panel component.
 * @returns {JSX.Element}
 * @constructor
 */
const TestimonialPanel = (): JSX.Element => (
	<ParallaxPanel scrollId="testimonial" bgImage="imgs/pumpkin_pie.jpg" pHeight="100vh">
		<div id="testimonialText" className="panel-text">
			<div className="header-center-container">
				<h3 className="title" style={{ width: "13rem" }}>
					TESTIMONIALS
				</h3>
			</div>

			<Slider {...settings}>
				{testimonials.map(generateQuote)}
			</Slider>
		</div>
	</ParallaxPanel>
);

export default TestimonialPanel;
