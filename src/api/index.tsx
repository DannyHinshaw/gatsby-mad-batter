import * as cloudinary from "cloudinary-core";
import { ReactImageGalleryItem } from "react-image-gallery";


/*                        Cloudinary API Functions
 ******************************************************************************/

export interface IImageResourceData {
	created_at: string
	public_id: string
	version: number
	format: string
	height: number
	width: number
	type: string
}

export interface IResponseData {
	resources: IImageResourceData[]
}

export interface IGalleryPanelState {
	images: ReactImageGalleryItem[]
}

export const baseUrl: string = "https://res.cloudinary.com/nulleffort/image";
export const bgImageQuality: string = "q_auto";
export const TAGGED_IMAGES_URL: string = `${baseUrl}/list/madbatter.json`;
export const clClient = new cloudinary.Cloudinary({ cloud_name: "nulleffort", secure: true });

/**
 * Convert urls to consumable object for gallery component.
 * @param {IResponseData} data
 * @returns {ReactImageGalleryItem[]}
 */
export const formatURLs = (data: IResponseData): ReactImageGalleryItem[] => {
	const { resources } = data;
	return resources.map((imageData: IImageResourceData) => ({
		original: clClient.url(imageData.public_id.concat(".jpg"), {
			fetchFormat: "auto",
			effect: "sharpen",
			gravity: "auto"
		}),
		originalAlt: imageData.public_id
			.split("/")[1]
			.replace(/-/g, " ")
	}));
};
