import http from "http";

export class Application {
  constructor() {
    this.server = this._createServer();
    this.middleWare = [];
    this.routes = [];
  }

  use(middleware) {
    this.middleWare.push(middleware);
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoints = router.endpoints[path];
      Object.keys(endpoints).forEach((method) => {
        this.routes.push({
          path,
          method,
          handler: endpoints[method],
        });
      });
    });
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  _createServer() {
    return http.createServer((req, res) => {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        if (body) {
          try {
            req.body = JSON.parse(body);
          } catch (e) {
            req.body = null;
          }
        }

        this.middleWare.forEach((md) => md(req, res));

        const route = this._matchRoute(req.pathname, req.method);
        if (route) {
          req.params = route.params;
          route.handler(req, res);
        } else {
          res.statusCode = 404;
          res.end("Not Found");
        }
      });
    });
  }

  _matchRoute(pathname, method) {
    for (const route of this.routes) {
      const paramNames = [];
      const regexPath = route.path.replace(/:([^\/]+)/g, (_, key) => {
        paramNames.push(key);
        return "([^\\/]+)";
      });

      const regex = new RegExp(`^${regexPath}$`);
      const match = pathname.match(regex);

      if (match && route.method === method) {
        const params = {};
        paramNames.forEach((key, index) => {
          params[key] = match[index + 1];
        });
        return { handler: route.handler, params };
      }
    }

    return null;
  }
}
