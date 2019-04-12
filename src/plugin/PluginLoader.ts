import fs, { Dirent } from "fs";
import Plugin from "../entity/Plugin";

const PLUGINS_DIRECTORY: string = "/plugins";
const PACKAGE_JSON: string = "package.json";

/**
 * List all the plugins available
 */
export const listPlugins = (): Plugin[] => {
  const pluginsPath = getPluginsDirectory();

  // List all items in the given directory with their filetype, so we can
  // filter directories after
  const items: Dirent[] = fs.readdirSync(pluginsPath, {
    withFileTypes: true
  });

  // Get only the directories that contains a package.json
  const directories: Dirent[] = items.filter(
    item => item.isDirectory() && hasPackageJsonFile(item)
  );

  return directories.map(directory => {
    return createPlugin(pluginsPath, directory);
  });
};

/**
 * Get the plugin directory.
 * TODO Check if this works when the project is packaged
 */
const getPluginsDirectory = (): string => {
  return `${process.cwd()}${PLUGINS_DIRECTORY}`;
};

/**
 * Check if the given directory has a package.json file.
 * @param dirent The directory entry
 */
const hasPackageJsonFile = (dirent: Dirent): boolean => {
  try {
    fs.accessSync(`${getPluginsDirectory()}/${dirent.name}/package.json`);

    return true;
  } catch (err) {
    return false;
  }
};

const createPlugin = (pluginPath: string, directory: Dirent): Plugin => {
  const packageJson = require(`${pluginPath}/${
    directory.name
  }/${PACKAGE_JSON}`);

  const operations = require(`${pluginPath}/${directory.name}/${
    packageJson.main
  }`);

  return new Plugin(pluginPath, directory, packageJson, operations);
};
