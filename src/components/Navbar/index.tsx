import React from "react";
import Headroom from "react-headroom";
import { Link } from "react-scroll";
import "./Navbar.scss";

interface INavLinkProps {
	targetName: string
	linkText: string
}

const NavLink = (props: INavLinkProps): JSX.Element => (
	<Link to={props.targetName} activeClass="active" spy={true} smooth={true} duration={250}>
		{props.linkText}
	</Link>
);

const Navbar = (): JSX.Element => {
	return (
		<Headroom>
			<nav id="navLinksContainer">
				<NavLink targetName="about" linkText="ABOUT" />
				<NavLink targetName="gallery" linkText="GALLERY" />
				<NavLink targetName="contact" linkText="CONTACT" />
			</nav>
		</Headroom>
	);
};

export default Navbar;
