import builder, { SpecBuilder } from './builder';

const genspec = () => {
  const spec = {};
  for (const name of Object.keys(builder.resources)) {
    const resource = builder.resources[name];

    spec[name] = [];
    for (const api of resource.api) {
      spec[name].push({
        path: api.path,
        method: api.method,
        params: api.params,
      });
    }
  }
  return spec;
};
export default genspec;
