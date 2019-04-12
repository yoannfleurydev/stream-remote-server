import { Response, Request } from "express";
import { listPlugins } from "../plugin/PluginLoader";
import { pluginRepository } from "../common/Database";
import Plugin from "../entity/Plugin";

// We want to store all the plugins available with their operation, so the
// program avoid to read all the time the filesystem, only on boot.
// ? Not a req, res method, maybe this should be in the PluginLoader file
export const savePlugins = () => {
  const newPlugins: Array<Plugin> = listPlugins();

  pluginRepository.datastore.find({}, (err: Error, plugins: Array<Plugin>) => {
    if (err) {
      console.log("PluginService.ts", err, plugins);
    }

    // Get the list of the plugins' name
    // If the plugin's name is already in database we do nothing
    // Else, we add the plugin in the database
    const pluginsName = plugins.map(plugin => plugin.name);

    newPlugins.forEach(plugin => {
      if (!pluginsName.includes(plugin.name)) {
        pluginRepository.datastore.insert(plugin, (err: Error) => {
          if (err) {
            console.error(err);
          }

          console.log(plugin, "inserted");
        });
      }
    });
  });
};

// Should read in the repository, not in the filesystem.
export const getPlugins = (req: Request, res: Response) => {
  pluginRepository.datastore.find({}, (err: Error, plugins: Array<Plugin>) => {
    if (err) {
      console.log("PluginService.ts", err, plugins);
    }

    res.json(plugins);
  });
};
