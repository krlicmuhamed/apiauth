import { Action } from "actionhero";

export abstract class AuthenticatedAction extends Action {
  authenticate: boolean;
  constructor() {
    super();
    this.middleware = ["authenticated-action"];
  }
}