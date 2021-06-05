/**
 * NOTE:
 * subDir means the "data" or "packs" folder inside our json folder
 * main dir is our json folder with all the folders named after each db
 * json directories are folders that contain entities in json format and that are named after a Foundry db file
 */

import * as fs from 'fs';
import { validateArgs } from './modules.mjs';
import { getFiles } from './modules.mjs';

var worldPath = validateArgs(process.argv);

// get all subdirectories of main directory
var jsonPath = worldPath + "/json";
const subDirs = getFiles(jsonPath);

// for each subdirectory (data, packs)
subDirs.forEach(dir => {

    // get array of json directories
    var subDirPath = [jsonPath, dir].join("/");
    var jsonDirs = getFiles(subDirPath)

    // for each json directory
    jsonDirs.forEach(json => {
        var writePath = [worldPath, dir, json].join("/") + ".db"; // get path of original db
        var arrJSON = getFiles(subDirPath + "/" + json); // get array of each JSON file in the json directory

        arrJSON
            .map(path => [jsonPath, dir, json, path].join("/")) // get actual path to the JSON file
            .forEach(readPath => {
                fs.writeFileSync(writePath, fs.readFileSync(readPath) + '\n', {flag: 'a'}); // write the contents of JSON file back to the db in append mode
        });
    });
});