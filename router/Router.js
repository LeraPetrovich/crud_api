
import EventEmitter from "events";

const emitter = new EventEmitter();

export class Router {
  constructor() {
    this.endpoints = {};
  }

  request(method = "GET", path, handler) {
    if (!this.endpoints[path]) {
      this.endpoints[path] = {};
    }

    const endpointsPath = this.endpoints[path];

    if (endpointsPath[method]) {
      throw new Error(`${method} has path ${path}`);
    }

    endpointsPath[method] = handler;
    emitter.on(`[${path}]:[${method}]`, (req, res) => {
      handler(req, res);
    });
  }

  get(path, handler) {
    this.request("GET", path, handler);
  }
  post(path, handler) {
    this.request("POST", path, handler);
  }
  put(path, handler) {
    this.request("PUT", path, handler);
  }
  delete(path, handler) {
    this.request("DELETE", path, handler);
  }
}