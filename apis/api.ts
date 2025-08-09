import { UserController } from "./user.controller";
import { RequestHolder } from "./requestHolder";

export class API extends RequestHolder {
  public readonly user = new UserController(this.request);
}
