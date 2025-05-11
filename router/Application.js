import http from "http";
import EventEmitter from "events";

export class Application {
  constructor() {
    this.emitter = new EventEmitter();
    this.server = this._createServer();
    this.middleWare = [];
  }

  use(middleWare) {
    this.middleWare.push(middleWare);
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoints = router.endpoint[path];
      Object.keys(endpoints).forEach((method) => {
        this.emitter.on(_getRouterMask(path, method), (req, res) => {
          const handler = endpoints[method];
          this.middleWare.forEach((md) => {
            md(req, res);
          });
          handler(req, res);
        });
      });
    });
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  _createServer() {
    return http.createServer((req, res) => {
      const emit = this.emitter.emit(
        this._getRouterMask(req.url, req.method),
        req,
        res
      );
      if (!emit) {
        res.end();
      }
    });
  }

  _getRouterMask(path, method) {
    return `[${path}]:[${method}]`;
  }
}
