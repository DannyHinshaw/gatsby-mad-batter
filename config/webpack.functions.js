const webpack = require("webpack");
const { NODE_ENV } = process.env;

module.exports = {
	mode: NODE_ENV === "dev" ? "development" : "production",
	plugins: [
		new webpack.DefinePlugin({ "global.GENTLY": false })
	]
};
