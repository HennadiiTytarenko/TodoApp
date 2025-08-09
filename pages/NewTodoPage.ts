import { APIRequestContext, Page } from "@playwright/test";
import TodoApi from "../apis/TodoApi";
import User from "../models/User";
import { PageHolder } from "../abstractClasses";

export default class NewTodoPage extends PageHolder {
  private get newTodoInput() {
    return "[data-testid=new-todo]";
  }

  private get newTodoSubmit() {
    return "[data-testid=submit-newTask]";
  }

  async load() {
    await this.page.goto(process.env.BASE_URL + "/todo/new");
  }

  async addTodo(task: string) {
    await this.page.fill(this.newTodoInput, task);
    await this.page.click(this.newTodoSubmit);
  }

  async addTodoUsingApi(request: APIRequestContext, user: User) {
    await new TodoApi().addTodo(request, user);
  }
}
