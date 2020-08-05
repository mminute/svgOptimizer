'use strict';
// https://www.npmjs.com/package/svgo

// TO RUN: node script.js {name of file to run w/o .svg extension}

const FS = require('fs');
const PATH = require('path');
const SVGO = require('svgo');

function run() {
  const filename = process.argv.slice(2);
  const filepath = PATH.resolve(__dirname, `./svgs/${filename}.svg`);

  if (!FS.existsSync(filepath)) {
    return;
  }

const svgo = new SVGO({
  plugins: [{
    cleanupAttrs: true,
  }, {
    removeDoctype: true,
  },{
    removeXMLProcInst: true,
  },{
    removeComments: true,
  },{
    removeMetadata: true,
  },{
    removeTitle: true,
  },{
    removeDesc: true,
  },{
    removeUselessDefs: true,
  },{
    removeEditorsNSData: true,
  },{
    removeEmptyAttrs: true,
  },{
    removeHiddenElems: true,
  },{
    removeEmptyText: true,
  },{
    removeEmptyContainers: true,
  },{
    removeViewBox: false,
  },{
    cleanupEnableBackground: true,
  },{
    convertStyleToAttrs: true,
  },{
    convertColors: true,
  },{
    convertPathData: true,
  },{
    convertTransform: true,
  },{
    removeUnknownsAndDefaults: true,
  },{
    removeNonInheritableGroupAttrs: true,
  },{
    removeUselessStrokeAndFill: true,
  },{
    removeUnusedNS: true,
  },{
    cleanupIDs: true,
  },{
    cleanupNumericValues: true,
  },{
    moveElemsAttrsToGroup: true,
  },{
    moveGroupAttrsToElems: true,
  },{
    collapseGroups: true,
  },{
    removeRasterImages: false,
  },{
    mergePaths: true,
  },{
    convertShapeToPath: true,
  },{
    sortAttrs: true,
  },{
    removeDimensions: true,
  },{
    removeAttrs: {attrs: '(stroke|fill)'},
  }]
});

FS.readFile(filepath, 'utf8', function(err, data) {

  if (err) {
    throw err;
  }

  svgo.optimize(data, {path: filepath}).then(function(result) {
    FS.writeFileSync(PATH.resolve(__dirname, `./svgs/optimized/${filename}.svg`), result.data);
  });

});
}

run();
