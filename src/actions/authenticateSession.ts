import { Action, api } from "actionhero";

export class authenticateSession extends Action {
  constructor() {
    super();
    this.name = "authenticateSession";
    this.description = "Creates a new JWT token";
    this.outputExample = {};
    this.inputs = {
      firstName: {required:false},
      lastName: {required:false},
      email: {required:false}
    }
  }

  async run(Data) {
    console.log(Data);
    api.jwtauth.generateToken({t:1}, {}, (token)=>{
      Data.response.token = token;
    }, (err)=>{
      throw new Error(err);
    })
  }
}
