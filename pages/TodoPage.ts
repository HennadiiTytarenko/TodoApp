import { Page } from "@playwright/test";
import { PageHolder } from "../abstractClasses";

export default class TodoPage extends PageHolder {
  private get welcomeMessage() {
    return `[data-testid=welcome]`;
  }

  private get deleteIcon() {
    return "[data-testid=delete]";
  }

  private get noTodosMessage() {
    return "[data-testid=no-todos]";
  }

  private get todoItem() {
    return "[data-testid=todo-item]";
  }

  async load(page: Page) {
    await page.goto("/todo");
  }

  getWelcomeMessageElement(page: Page) {
    return page.locator(this.welcomeMessage);
  }

  async deleteTodo(page: Page) {
    await page.click(this.deleteIcon);
  }

  async getNoTodosMessage(page: Page) {
    return page.locator(this.noTodosMessage);
  }

  async getTodoItem(page: Page) {
    return page.locator(this.todoItem);
  }
}
