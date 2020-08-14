declare module "*.scss" {
	const content: { [className: string]: string };
	export = content;
}

export interface IPageProps {
	data: any
}

export interface IFluidImage {
	originalName: string
	aspectRatio: number
	srcSetWebp: string
	srcWebp: string
	srcSet: string
	base64: string
	sizes: string
	src: string
}

export interface IImageNode {
	node: {
		id: string
		fluid: IFluidImage
	}
}

export interface ImgurData {
	description?: any;
	account_url?: any;
	section?: any;
	title?: any;
	nsfw?: any;
	vote?: any;

	in_most_viral: boolean;
	account_id: number;
	has_sound: boolean;
	in_gallery: boolean;
	deletehash: string;
	bandwidth: number;
	favorite: boolean;
	animated: boolean;
	datetime: number;
	ad_type: number;
	ad_url: string;
	is_ad: boolean;
	edited: string;
	height: number;
	width: number;
	views: number;
	size: number;
	type: string;
	name: string;
	link: string;
	tags: any[];
	id: string;
}

export interface ImgurResponse {
	data: ImgurData;
	success: boolean;
	status: number;
}

