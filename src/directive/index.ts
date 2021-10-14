import copy from "./copy";

const directives = {
  copy,
};

export function installDirective(app: any): void {
  Object.keys(directives).forEach((key) => {
    app.directive(key, directives[key]);
  });
}
