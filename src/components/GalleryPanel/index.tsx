import * as React from "react";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { formatURLs, IGalleryPanelState, IResponseData, TAGGED_IMAGES_URL } from "../../api";
import ParallaxPanel from "../ParallaxPanel";
import "./GalleryPanel.scss";


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
			.then((res: Response) =>
				res.json())
			.then((data: IResponseData) =>
				formatURLs(data))
			.then((imgs: ReactImageGalleryItem[]) =>
				this.setState({ images: imgs }))
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
