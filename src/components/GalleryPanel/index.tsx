import * as cloudinary from "cloudinary-core";
import * as React from "react";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { Parallax } from "react-parallax";
import ParallaxPanel from "../ParallaxPanel";
import "./GalleryPanel.scss";

interface IImageResourceData {
	created_at: string
	public_id: string
	version: number
	format: string
	height: number
	width: number
	type: string
}

interface IResponseData {
	resources: IImageResourceData[]
}

interface IGalleryPanelState {
	images: ReactImageGalleryItem[]
}

const TAGGED_IMAGES_URL: string = "https://res.cloudinary.com/nulleffort/image/list/madbatter.json";
const cl = new cloudinary.Cloudinary({ cloud_name: "nulleffort", secure: true });

/**
 * Convert urls to consumable object for gallery component.
 * @param {IResponseData} data
 * @returns {ReactImageGalleryItem[]}
 */
const formatURLs = (data: IResponseData): ReactImageGalleryItem[] => {
	const { resources } = data;
	return resources.map((imageData: IImageResourceData) => ({
		original: cl.url(imageData.public_id, { effect: "sharpen", gravity: "auto" }),
		thumbnail: undefined
	}));
};

/**
 * Gallery panel component.
 * @returns {JSX.Element}
 * @constructor
 */
class GalleryPanel extends React.Component {
	public state: IGalleryPanelState = {
		images: []
	};

	// Fetch image data
	public componentDidMount() {
		fetch(TAGGED_IMAGES_URL)
			.then((res: Response) => res.json())
			.then((data: IResponseData) => formatURLs(data))
			.then((imgs: ReactImageGalleryItem[]) => this.setState({ images: imgs }))
			.catch(console.error);
	}

	public render() {
		return (
			<ParallaxPanel scrollId="gallery" pHeight="auto">
				<div id="gallery" className="panel-text">
					<ImageGallery
						showFullscreenButton={false}
						showPlayButton={false}
						showThumbnails={false}
						items={this.state.images}
					/>
				</div>
			</ParallaxPanel>
		);
	}
}

export default GalleryPanel;
