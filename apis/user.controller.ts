import { User } from "./models";
import { RequestHolder } from "./requestHolder";

export class UserController extends RequestHolder {
  async signup(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<User> {
    const signupResponse = await this.request.post(process.env.BASE_URL + "/api/v1/users/register", {
      data,
    });

    return signupResponse.json() as Promise<User>;
  }
}
