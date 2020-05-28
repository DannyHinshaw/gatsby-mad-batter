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
