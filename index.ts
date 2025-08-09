import { API } from "./apis/api";
import { PageHolder } from "./abstractClasses";
import NewTodoPage from "./pages/NewTodoPage";
import SignupPage from "./pages/SignupPage";
import TodoPage from "./pages/TodoPage";
import { BrowserContext } from "@playwright/test";
import config from "./playwright.config";

export class Application extends PageHolder {
  public api = new API(this.page.request);

  public newTodoPage = new NewTodoPage(this.page);
  public todoPage = new TodoPage(this.page);
  public signupPage = new SignupPage(this.page);

  async setTokenToCookies(
    access_token: string,
    firstName: string,
    userID: string,
    context: BrowserContext
  ) {
    await context.addCookies([
      {
        name: "access_token",
        value: access_token,
        url: config.use?.baseURL,
      },
      {
        name: "firstName",
        value: firstName,
        url: config.use?.baseURL,
      },
      {
        name: "userID",
        value: userID,
        url: config.use?.baseURL,
      },
    ]);
  }
}
