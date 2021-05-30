import { readdirSync } from 'fs'

/**
 * Get an array of all subdirectories
 * @param source {String} path of root directory
 * @returns {Array} List of subdirectories
 */
export const getFiles = source =>
  readdirSync(source, { withFileTypes: true })
    .map(dirent =>
      dirent.name
    );

/**
 * Validates node arguments and returns world path
 * @param argv contents of process.argv()
 * @returns {String} path to world
 */
export function validateArgs(argv) {
  // get worldPath
  const worldPath = argv[2];

  // exit if there are no arguments or if this is not a Foundry VTT Data directory
  if (worldPath === undefined) process.exit();
  if (!worldPath.includes("Data/worlds/")) process.exit();

  return worldPath;
};