import http from "http";
import os from "os";

const cpus = os.cpus();
const workerPorts = cpus.map((_, index) => 4000 + index);

const current = 0;

const server = http.createServer((req, res) => {
  const targetPort = workerPorts[current];
  current = (current + 1) % workerPorts.length;

  const proxy = http.request(
    {
      hostname: "localhost",
      port: targetPort,
      path: req.url,
      method: req.method,
      headers: req.headers,
    },
    (proxyRes) => {
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    }
  );
  req.pipe(proxy, { end: true });
});

server.listen("4000", () => {
  console.log("Load balancer listening on port 4000");
});
