import { connect, Stan } from "node-nats-streaming";

//creating wrapper class for nats client because avoiding circular dependency issues
class NatsWrapper {
  private _client?: Stan;
  constructor() {}

  get client() {
    if (!this._client)
      throw new Error("Cannot access NATS client before connecting");
    return this._client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this._client = connect(clusterId, clientId, {
      url,
      waitOnFirstConnect: true,
    });

    return new Promise<void>((resolve, reject) => {
      this.client.on("connect", () => {
        console.log("Connected to NATS");
        resolve();
      });
      this.client.on("error", (err) => {
        reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();
