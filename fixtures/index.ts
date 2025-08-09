import { test as base } from '@playwright/test';
import TodoPage from "../pages/TodoPage";
import User from '../models/User';
import SignupPage from '../pages/SignupPage';
import NewTodoPage from '../pages/NewTodoPage';

type MyFixtures = {
  todoPage: TodoPage;
  newTodoPage: NewTodoPage;
  signupPage: SignupPage;
};

export const newTodoPageFixture = base.extend<MyFixtures>({
  newTodoPage: async ({ page, request, context }, use) => {
    const user = new User();
    const signupPage = new SignupPage(page);
    await signupPage.signupUsingAPI(request, user, context);
    const newTodoPage = new NewTodoPage(page);
    await newTodoPage.load(page);
    await use(newTodoPage);
  },
});
export { expect } from '@playwright/test';
