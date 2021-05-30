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

/**
 * Convert names to kebab case
 * @param {string} Name to convert
 * @returns {string} Name in kebab case
 */
export const toKebabCase = name =>
  name &&
  name
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');
