import { IncomingHttpHeaders, RequestOptions, request } from "http";

import { Account } from "../../../app/server_app/model/AuthModel";

type AwesomeRequestResponseType = {
  statusCode: number;
  headers: IncomingHttpHeaders;
  body: any;
};

export async function makeAwesomeRequest(
  options: RequestOptions,
  body?: Account
): Promise<AwesomeRequestResponseType> {
  return new Promise((resolve, reject) => {
    const clientRequest = request(options, (incomingMessage) => {
      let response: AwesomeRequestResponseType = {
        statusCode: incomingMessage.statusCode ?? 0,
        headers: incomingMessage.headers,
        body: [],
      };
      incomingMessage.on("data", (chunk: Account) => {
        response.body.push(chunk);
      });

      incomingMessage.on("end", () => {
        if (response.body.length) {
          response.body = response.body.join("");

          try {
            response.body = JSON.parse(response.body);
          } catch (error) {
            console.log(error);
          }
        }
        resolve(response);
      });
      incomingMessage.on("error", (err) => {
        reject(err);
      });
    });

    clientRequest.on("error", (error) => {
      reject(error);
    });
    clientRequest.setHeader("user-agent", "AwesomeRequest");

    if (body) {
      clientRequest.write(JSON.stringify(body));
    }
    clientRequest.end();
  });
}
