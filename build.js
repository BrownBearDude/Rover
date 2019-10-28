const Bundler = require('parcel-bundler');
const Path = require('path');

// Single entrypoint file location:
const entryFiles = Path.join(__dirname, './src/**/index.html');
// OR: Multiple files with globbing (can also be .js)
// const entryFiles = './src/*.js';
// OR: Multiple files in an array
// const entryFiles = ['./src/index.html', './some/other/directory/scripts.js'];

// Bundler options
const options = {
  outDir: './dist', // The out directory to put the build files in, defaults to dist
  minify: true,
  logLevel: 4, // 5 = save everything to a file, 4 = like 3, but with timestamps and additionally log http requests to dev server, 3 = log info, warnings & errors, 2 = log warnings & errors, 1 = log errors
  detailedReport: true, // Prints a detailed report of the bundles, assets, filesizes and times, defaults to false, reports are only printed if watch is disabled
  autoInstall: true, // Enable or disable auto install of missing dependencies found during bundling
};
const bundler = new Bundler(entryFiles, options);
bundler.on('bundled', ()=>{
	console.log('Copying "static" folder to build folder. . .');
	const fs = require('fs-extra');
	fs.copySync("./static/", "./dist/");
	fs.outputJsonSync(Path.join(__dirname, './dist/build_data.json'), {"commit": process.env.COMMIT_REF});
	console.log('Done building.');
	process.exit();
});
console.log("Building for commit " + process.env.COMMIT_REF + ".");
bundler.bundle();