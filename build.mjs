/**
 * NOTE:
 * subDir means the "data" or "packs" folder inside our json folder
 * main dir is our json folder with all the folders named after each db
 * json directories are folders that contain entities in json format and that are named after a Foundry db file
 */

import * as fs from 'fs';
import { validateArgs } from './modules.mjs';
import { getFiles } from './modules.mjs';

const worldPath = validateArgs(process.argv);

// get all subdirectories of main directory
const jsonPath = worldPath + "/json";
const subDirs = getFiles(jsonPath);

// for each subdirectory (data, packs)
subDirs.forEach(dir => {

    // get array of json directories
    let subDirPath = [jsonPath, dir].join("/");
    let jsonDirs = getFiles(subDirPath)

    // for each json directory
    jsonDirs.forEach(json => {
        let writePath = [worldPath, dir, json].join("/") + ".db"; // get path of original db
        let arrJSON = getFiles(subDirPath + "/" + json); // get array of each JSON file in the json directory

        arrJSON
            .map(path => [jsonPath, dir, json, path].join("/")) // get actual path to the JSON file
            .forEach(readPath => {
                fs.writeFileSync(writePath, fs.readFileSync(readPath) + '\n', {flag: 'a'}); // write the contents of JSON file back to the db in append mode
        });
    });
});