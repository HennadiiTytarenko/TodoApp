import { test, expect } from "@playwright/test";
import User from "../models/User";
import SignupPage from "../pages/SignupPage";
import TodoPage from "../pages/TodoPage";
import { Application } from "..";
import { randomUUID } from "crypto";

/*
test('@Smoke should be able to register to our application', async ({ page }) => {
  const user = new User();
  const signupPage = new SignupPage();
  await signupPage.load(page);
  await signupPage.signup(page, user);
  const todoPage = new TodoPage(page);
  const welcomeMessage = todoPage.getWelcomeMessageElement(page);
  console.log(welcomeMessage)
  await expect(welcomeMessage).not.toBeVisible();
});
*/

test.skip("@API Should be able to register to our application", async ({ page }) => {
  const app = new Application(page);
  const email = `test+${randomUUID()}@test.com`;
  const resp = await app.api.user.signup({
    firstName: "Hennadii",
    lastName: "Hennadii",
    email,
    password: email,
  });
  console.log(resp);

  await app.setTokenToCookies(
    resp.access_token,
    resp.firstName,
    resp.userID,
    page.context()
  );
  await app.newTodoPage.load(page);
});
