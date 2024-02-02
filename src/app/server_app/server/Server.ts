import {
  createServer,
  IncomingMessage,
  Server as NodeServer,
  ServerResponse,
} from "http";

import { HTTP_CODES } from "../model/ServerModel";

import { ReservationsDataAccess } from "../data/ReservationsDataAccess";

import { Authorizer } from "../auth/Authorizer";

import { LoginHandler } from "../handlers/LoginHandler";
import { RegisterHandler } from "../handlers/RegisterHandler";
import { ReservationsHandler } from "../handlers/ReservationsHandler";

export class Server {
  private server!: NodeServer;
  private authorizer = new Authorizer();
  private reservationsDataAccess = new ReservationsDataAccess();

  public startServer() {
    this.server = createServer((req, res) => {
      console.log(`Got request from ${req.headers["user-agent"]}`);
      console.log(`Got request for ${req.url}`);
      this.handleRequest(req, res)
        .then(() => res.end())
        .catch((error) => {
          console.error("Error handling request:", error);
          res.statusCode = 500;
          res.end();
        });
    });
    this.server.listen(8080);
    console.log("server started");
  }

  private async handleRequest(
    request: IncomingMessage,
    response: ServerResponse
  ) {
    try {
      const route = this.getRouteFromUrl(request);
      switch (route) {
        case "register": {
          await new RegisterHandler(
            request,
            response,
            this.authorizer
          ).handleRequest();
          break;
        }
        case "login": {
          await new LoginHandler(
            request,
            response,
            this.authorizer
          ).handleRequest();
          break;
        }
        case "reservation": {
          const reservation = new ReservationsHandler(
            request,
            response,
            this.authorizer,
            this.reservationsDataAccess
          );
          await reservation.handleRequest();
          break;
        }
        default:
          break;
      }
    } catch (error: any) {
      response.writeHead(
        HTTP_CODES.INTERNAL_SERVER_ERROR,
        JSON.stringify(`Internal server error: ${error.message}`)
      );
      console.log(error);
    }
  }

  private getRouteFromUrl(request: IncomingMessage) {
    const fullRoute = request.url;
    if (fullRoute) {
      return fullRoute.split("/")[1];
    }
  }

  public async stopServer() {
    if (this.server) {
      this.server.close();
      console.log("server closed");
    }
  }
}
