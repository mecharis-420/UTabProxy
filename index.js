import express from 'express';
import path from 'node:path';
import http from "node:http";
import createBareServer from "@tomphttp/bare-server-node";
import * as dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();

const port = process.env.PORT || 3000;


const __dirname = proccess.cwd();
const server = http.createServer();
const app = express(server);
const bareServer = createBareServer("/bare/");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "static")));


const static = [
    { path: "/", file: "index.html" },
  ];
  
  server.on("request", (req, res) => {
    if (bareServer.shouldRoute(req)) {
      bareServer.routeRequest(req, res);
    } else {
      app(req, res);
    }
  });
  
  server.on("upgrade", (req, socket, head) => {
    if (bareServer.shouldRoute(req)) {
      bareServer.routeUpgrade(req, socket, head);
    } else {
      socket.end();
    }
  });
  
  server.on("listening", () => {
    console.log(`u tabs running on port 3000${process.env.PORT}`);
  });
  
  server.listen({
    port: 3000,
}, () => {
    console.log(chalk.green(`Welcome to ${chalk.green.bold('UTabs ')}If you encounter an error, report to slaykepper#0, xineese#0, poormanhere#0 on discord`))
    console.log(chalk.green.bold("[UTABS] ") + "live at port " + chalk.bold.green(port));
  });
  
  