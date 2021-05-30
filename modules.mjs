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
 * Verify there is a node argument and return world path
 * @param argv contents of process.argv()
 * @returns {String} path to world
 */
export function validateArgs(argv) {
  // get worldPath
  const worldPath = argv[2];

  // exit if there are no arguments
  if (worldPath === undefined) process.exit();

  return worldPath;
};