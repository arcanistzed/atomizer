/**
 * NOTE:
 * subDir means the "data" or "packs" folder inside the world
 * main dir is the new "json" directory with all the json files
*/

import * as fs from 'fs';
import lineReader from 'line-reader'
import { validateArgs } from './modules.mjs';
import { getFiles } from './modules.mjs'

var worldPath = validateArgs(process.argv);

// create new path for main dir if it doesn't exist
var jsonPath = worldPath + "/json";
if (!fs.existsSync(jsonPath)) {
  fs.mkdirSync(jsonPath);
}

// get sub directories that exist
var subDirs = [];
var inWorldPath = getFiles(worldPath);
if (inWorldPath.includes('data')) subDirs.push('data');
if (inWorldPath.includes('packs')) subDirs.push('packs');

// create new path for each subdir if it doesn't exist
subDirs.forEach((dir, index) => {
  var jsonSubDirPath = [jsonPath, dir].join("/");
  if (!fs.existsSync(jsonSubDirPath)) {
    fs.mkdirSync(jsonSubDirPath);
  }

  // get each subdirectory path
  var subDirPath = [worldPath, subDirs[index]].join("/");

  // create an array with all .db files in subDir
  getFiles(subDirPath).forEach(db => {
    // create a new folder for each one if it doesn't already exist
    var subDirPath = [jsonPath, subDirs[index], db].join("/").replace(".db", "");
    if (!fs.existsSync(subDirPath)) {
      fs.mkdirSync(subDirPath);
    };

    var readPath = [worldPath, subDirs[index], db].join("/") // get the path of all the original db files

    var counter = 0;
    lineReader.eachLine(readPath, line => {
      var writePath = [subDirPath, counter].join("/") + ".json";
      fs.writeFileSync(writePath, line);
      counter++;
    });
  })
});
