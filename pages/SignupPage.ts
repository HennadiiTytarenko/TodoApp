import { APIRequestContext, BrowserContext, Page } from "@playwright/test";
import User from "../models/User";
import UserApi from "../apis/UserApi";
import config from "../playwright.config";
import { PageHolder } from "../abstractClasses";

export default class SignupPage extends PageHolder {
  async load() {
    await this.page.goto(process.env.BASE_URL + "/signup");
  }

  private get firstNameInput() {
    return `[data-testid=first-name]`;
  }

  private get lastNameInput() {
    return `[data-testid=last-name]`;
  }

  private get emailInput() {
    return `[data-testid=email]`;
  }

  private get passwordInput() {
    return `[data-testid=password]`;
  }

  private get confirmPasswordInput() {
    return `[data-testid=confirm-password]`;
  }

  private get submitButton() {
    return `[data-testid=submit]`;
  }

  async signup(user: User) {
    await this.page.fill(this.firstNameInput, user.getFirstName());
    await this.page.fill(this.lastNameInput, user.getLastName());
    await this.page.fill(this.emailInput, user.getEmail());
    await this.page.fill(this.passwordInput, user.getPassword());
    await this.page.fill(this.confirmPasswordInput, user.getPassword());
    await this.page.click(this.submitButton);
  }

  async signupUsingAPI(
    request: APIRequestContext,
    user: User,
    context: BrowserContext
  ) {
    const response = await new UserApi().signup(request, user);

    const responseBody = await response.json();
    const access_token = responseBody.access_token;
    const firstName = responseBody.firstName;
    const userID = responseBody.userID;

    user.setAccessToken(access_token);

    await context.addCookies([
      {
        name: "access_token",
        value: access_token,
        url: process.env.BASE_URL,
      },
      {
        name: "firstName",
        value: firstName,
        url: process.env.BASE_URL,
      },
      {
        name: "userID",
        value: userID,
        url: process.env.BASE_URL,
      },
    ]);
  }
}
