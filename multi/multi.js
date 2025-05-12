import os from "os";
import { fork } from "child_process";

const cpus = os.cpus();
const portArray = cpus
  .map((_, index) => {
    return `400${index}`;
  })
  .filter((item) => item !== "4000");

fork("./multi/load-balancer.js");

portArray.forEach((item) => {
  fork("./multi/worker.js", [item]);
});
