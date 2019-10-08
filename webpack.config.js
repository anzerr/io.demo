
const path = require('path');

module.exports = {
	entry: './index.ts',
	mode: 'development',
	module: {
		rules: [{
			test: /\.tsx?$/,
			use: 'ts-loader',
			exclude: /node_modules/
		},
		{
			test: /\.css$/i,
			use: ['style-loader', 'css-loader'],
		},
		{
			test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
			use: [{
				loader: 'file-loader',
				options: {
					name: '[name].[ext]',
					outputPath: 'fonts/'
				}
			}]
		},
		{
			test: /\.(png|jpe?g|gif)$/i,
			use: [{
				loader: 'file-loader',
			}]
		}
		]
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			'@app': path.resolve(__dirname, 'src/app/'),
			'@demo': path.resolve(__dirname, 'src/app/demo/'),
			'@part': path.resolve(__dirname, 'src/app/part/'),
			'@util': path.resolve(__dirname, 'src/util/')
		}
	},
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist')
	}
};
