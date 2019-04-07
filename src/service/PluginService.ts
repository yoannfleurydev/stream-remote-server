import { Response, Request } from "express";
import { listPlugins } from "../plugin/PluginLoader";
import { pluginRepository } from "../common/Database";

// TODO Complete this function.
// We want to store all the plugins available with their operation, so the
// program avoid to read all the time the filesystem, only on boot.
export const savePlugins = () => {
  const plugins = listPlugins();

  pluginRepository.datastore.insert(plugins, (err: Error) => {
    if (err) {
      console.error(err);
    }
  });
};

// Should read in the repository, not in the filesystem.
export const getPlugins = (req: Request, res: Response) => {};
