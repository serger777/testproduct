const Autoprefixer = require('autoprefixer'),
	Cleaner = require('clean-webpack-plugin'),
	Entries = require('webpack-entry-plus'),
	Fs = require('fs'),
	Glob = require('glob'),
	HtmlPlugin = require('html-webpack-plugin'),
	Path = require('path'),
	SpriteExtract = require('svg-sprite-loader/plugin'),
	StyleOptimize = require('optimize-css-assets-webpack-plugin'),
	StyleExtract = require('mini-css-extract-plugin');
/* после интеграции с боевым */
//TerserPlugin = require('terser-webpack-plugin')


const fileCleaner = new Cleaner({
	dry: false,
	cleanOnceBeforeBuildPatterns: ['*.html']
});
const spriteExtract = new SpriteExtract({ plainSprite: true });
const styleExtract = new StyleExtract({ filename: '[name].css' });
const styleOptimize = new StyleOptimize({});

/*  после интеграции с боевым */
//const scriptMinimizer = new TerserPlugin({terserOptions:{output:{comments: false}},test: /\.js(\?.*)?$/i, parallel: true, extractComments: false, sourceMap: false})

const files = [
	{
		entryFiles: Path.resolve(__dirname, 'src/template/index.js'),
		outputName: 'template'
	},
	{
		entryFiles: Glob.sync(
			Path.resolve(__dirname, 'src/pages/**/*.js')
		),
		outputName(filepath) {
			return filepath
				.replace(Path.resolve(__dirname) + '/src/', '')
				.replace('.js', '');
		}
	}
];

function htmlGenerator(dir) {
	const templates = Fs.readdirSync(Path.resolve(__dirname, dir));
	return templates.map(template => {
		const parts = template.split('.');
		const name = parts[0];
		const ext = parts[1];
		if (ext === 'pug') {
			return new HtmlPlugin({
				inject: false,
				filename: `${name}.html`,
				template: Path.resolve(
					__dirname,
					`${dir}/${name}.${ext}`
				)
			});
		}
	}).filter(file => file instanceof HtmlPlugin);
}

const config = {
	stats: {
		assets: true,
		entrypoints: false,
		errors: true,
		errorDetails: true,
		warnings: false,
		modules: false
	},
	entry: Entries(files),
	output: {
		path: Path.resolve(__dirname, 'build'),
		filename: '[name].js'
	},
	resolve: {
		extensions: ['.js', '.svg'],
		alias: {
			Components: Path.resolve(__dirname, 'src/components'),
			Helpers: Path.resolve(__dirname, 'src/helpers'),
			Icons: Path.resolve(__dirname, 'src/icons')
		}
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /(node_modules)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							sourceMaps: true,
							presets: ['@babel/preset-env'],
							plugins: [
								'@babel/plugin-transform-strict-mode',
								'@babel/plugin-transform-runtime',
								'@babel/plugin-transform-arrow-functions',
								'@babel/plugin-syntax-object-rest-spread',
								'@babel/plugin-syntax-throw-expressions',
								[
									'@babel/plugin-transform-classes',
									{
										loose: true
									}
								]
							]
						}
					}
				]
			},
			{
				test: /\.pug?$/,
				use: [
					{
						loader: 'pug-loader',
						options: {
							pretty: true
						}
					}
				]
			},
			{
				test: /\.(styl?|css)$/,
				exclude: /\.woff(2)?$/,
				use: [
					StyleExtract.loader,
					{
						loader: 'css-loader',
						options: {
							import: true,
							sourceMap: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								Autoprefixer({
									grid: true,
									cascade: false
								})
							],
							sourceMap: true
						}
					},
					{
						loader: 'stylus-loader',
						options: {
							sourceMap: true,
							preferPathResolver: 'webpack',
							import: [
								Path.resolve(
									__dirname,
									'src/template/_var.styl'
								),
								Path.resolve(
									__dirname,
									'src/template/_mixin.styl'
								)
							]
						}
					}
				]
			},
			{
				test: /\.svg?$/,
				exclude: Path.resolve(__dirname, 'src/icons'),
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'interface/[name].[ext]'
						}
					}
				]
			},
			{
				test: /\.svg?$/,
				include: Path.resolve(__dirname, 'src/icons'),
				use: [
					{
						loader: 'svg-sprite-loader',
						options: {
							extract: true,
							spriteFilename: `sprite.svg`,
							publicPath: `interface/`,
							symbolId: filePath =>
								Path.basename(filePath, '.svg')
						}
					},
					{
						loader: 'svgo-loader',
						options: {
							plugins: [{ removeTitle: true }]
						}
					}
				]
			}
		]
	},
	optimization: {
		minimize: true
	},
	plugins: [
		fileCleaner,
		spriteExtract,
		styleOptimize,
		styleExtract
	].concat(htmlGenerator('_demo/pages'))
};

module.exports = (env, param) => {
	config.mode = param.mode;
	config.cache = param.mode === 'production';
	return config;
};