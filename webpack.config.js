var webpack = require("webpack");
var path = require("path");

module.exports = {
	entry: {
		app: "./src/main.js"
	},
	output: {
		filename: "./public/build/bundle.js"
	},
	devtool: "#source-map",
	module: {
		loaders: [
			{
				test: /\.(js|jsx)$/, // Match both .js and .jsx files
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
					presets: ["es2015", "react"]
				}
			},
			{
				test: /\.json?$/, // Using json-loader to load json
				loader: "json-loader"
			},
			{
				test: /\.css$/,
				use: [{ loader: "style-loader" }, { loader: "css-loader" }]
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				loader: "url-loader?limit=100000"
			}
		]
	},

	devServer: {
		port: 3000,
		historyApiFallback: true
	}
};
