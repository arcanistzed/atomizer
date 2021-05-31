/**
 * NOTE:
 * subDir means the "data" or "packs" folder inside the world
 * main dir is the new "json" directory with all the json files
*/

import * as fs from 'fs';
import lineReader from 'line-reader'
import { toKebabCase } from './modules.mjs';
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

    // get the path of all the original db files
    var readPath = [worldPath, subDirs[index], db].join("/");

    var counter = 0; // counts line number and is used to ensure that file order is the same

    // Read each line one at a time and copy the contents to a json file
    lineReader.eachLine(readPath, line => {
      // get object
      var object = JSON.parse(line);
      // generate identifier from id and kebab case formatted name
      var id = [counter, toKebabCase(object.name)].filter(Boolean).join("-");

      // get path of json file to copy to
      var writePath = [subDirPath, id].join("/") + ".json";

      // write the current line to that file
      fs.writeFileSync(writePath, line);

      // increment counter
      counter++;
    });
  });
});
