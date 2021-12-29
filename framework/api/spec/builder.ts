
export class ApiSpec {
  path: string;
  method: string;
  params: Record<string, any>;
}
export class ResourceSpec {
  api: ApiSpec[] = [];

  addApi(path: string, method: string, params: Record<string, any>) {
    this.api.push({
      path,
      method,
      params,
    });
  }
}
export class SpecBuilder {
  resources: Record<string, ResourceSpec> = {};

  constructor() {

  }

  addResource(name: string) {
    const res = new ResourceSpec();
    this.resources[name] = res;
    return res;
  }
}
const specBuilder = new SpecBuilder();
export default specBuilder;
