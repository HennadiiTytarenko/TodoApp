import { newTodoPageFixture } from "../fixtures";
import User from "../models/User";
import SignupPage from "../pages/SignupPage";
import TodoPage from "../pages/TodoPage";
import NewTodoPage from "../pages/NewTodoPage";
import test, { expect } from "@playwright/test";
import { Application } from "../index";

test("should be able to add a new todo", async ({ page, request, context }) => {
  const app = new Application(page);
  const signupPage = new SignupPage(page);
  const user = new User();
  await signupPage.signupUsingAPI(request, user, context);
  const newTodoPage = new NewTodoPage(page);
  await newTodoPage.load();
  await newTodoPage.addTodo("Learn Playwright!");
  const todoPage = new TodoPage(page);
  const todoItem = await todoPage.getTodoItem(page);
  expect(await todoItem.innerText()).toEqual("Learn Playwright!");
});

test.describe.configure({ mode: "parallel" });
newTodoPageFixture(
  "should be able to add a new todo2",
  {
    annotation: [
      {
        type: "JIRA",
        description: "Test-12345",
      },
    ],
  },
  async ({ newTodoPage, page, browser }) => {
    test
      .info()
      .annotations.push({
        type: "Browser Version",
        description: browser.version(),
      });
    await newTodoPage.addTodo("Learn Playwright!");
    const todoPage = new TodoPage(page);
    const todoItem = await todoPage.getTodoItem(page);
    expect(await todoItem.innerText()).toEqual("Learn Playwright!");
  }
);

test.skip("should be able to delete a todo", async ({ page, request, context }) => {
  const app = new Application(page);
  await app.signupPage.signupUsingAPI(request, user, context);
  await app.newTodoPage.addTodoUsingApi(request, user);

  const todoPage = new TodoPage(page);
  await todoPage.load(page);
  await todoPage.deleteTodo(page);
  const noTodosMessage = await todoPage.getNoTodosMessage(page);
  await expect(noTodosMessage).toBeVisible();
  /*	test.info().attach("Test", {
    body: JSON.stringify(user, null, 2),
    contentType: "application/json"
  })
*/
});
