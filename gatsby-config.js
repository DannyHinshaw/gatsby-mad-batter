const config = require("./config/website");

/**
 * TODO: Sitemap:
 */

module.exports = {
	siteMetadata: {
		name: "Mad Batter Cupcakery",
		tagline: "Freshly Baked"
	},
	plugins: [
		{
			resolve: "gatsby-plugin-typography",
			options: {
				omitGoogleFont: true,
				pathToConfigModule: "src/utils/typography.tsx"
			}
		},
		"gatsby-plugin-sass",
		"gatsby-plugin-react-helmet",
		"gatsby-plugin-sharp",
		"gatsby-transformer-sharp",
		"gatsby-plugin-typescript",
		"gatsby-plugin-tslint",
		"gatsby-plugin-offline",
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				name: config.siteTitle,
				short_name: config.siteTitleAlt,
				description: config.siteDescription,
				start_url: config.pathPrefix,
				background_color: config.backgroundColor,
				theme_color: config.themeColor,
				display: "standalone",
				icon: "static/favicons/favicon.png", // This path is relative to the root of the site.
				icons: [
					{
						src: "/favicons/android-chrome-192x192.png",
						sizes: "192x192",
						type: "image/png"
					},
					{
						src: "/favicons/android-chrome-512x512.png",
						sizes: "512x512",
						type: "image/png"
					},
					{
						src: "/favicons/apple-touch-icon.png",
						sizes: "152x152",
						type: "image/png"
					},
					{
						src: "/favicons/favicon-16x16.png",
						sizes: "16x16",
						type: "image/png"
					},
					{
						src: "/favicons/favicon-32x32.png",
						sizes: "32x32",
						type: "image/png"
					},
					{
						src: "/favicons/mstile-150x150.png",
						sizes: "150x150",
						type: "image/png"
					},
				]
			}
		}
	]
};
