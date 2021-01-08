import { Initializer, action, api } from "actionhero";
// import { jsonwebtoken } from "jsonwebtoken";
const jsonwebtoken = require('jsonwebtoken');

export class MyInitializer extends Initializer {
  constructor() {
    super();
    this.name = "jwtauth";
    this.loadPriority = 1000;
    this.startPriority = 1000;
    this.stopPriority = 1000;
  }

  async initialize(config) {
    api.jwtauth = {
      processToken: function(token, success, fail){
        jsonwebtoken.verify(token, config.jwtauth.secret, {}, function(err, data){
          err ? fail(err) : success(data);
        });
      },
      generateToken: function(data, options, success, fail) {

        // identify parameter format
        if (typeof(options) == 'function') {
          fail = success;
          success = options;
          options = {};
        } else {
          options = options ||  {};
        }
        if (!options.algorithm) {
          options.algorithm = config.jwtauth.algorithm;
        }

        try {
          var token = jsonwebtoken.sign(data, config.jwtauth.secret, options);
          console.log(1, token);
          if (success) {
            success(token);
          }
        } catch (err) {
          if (fail) {
            fail(err);
          }
        }
      }
    };
    const jwtMiddleware = {
      name: 'ah-jwt-auth',
      priority: 1000,
      global: true,
      preProcessor: function(data) {

        // is it required to have a valid token to access an action?
        var tokenRequired = false;
        // console.log(config);
        if (data.actionTemplate.authenticate && config.jwtauth.enabled[data.connection.type]) {
          tokenRequired = true;
        }

        // get request data from the required sources
        var token = '';
        var req = {
          headers: data.params.httpHeaders || (data.connection.rawConnection.req ? data.connection.rawConnection.req.headers : undefined) || data.connection.mockHeaders || {},
          uri: data.connection.rawConnection.req ? data.connection.rawConnection.req.uri : {}
        };

        var authHeader = req.headers.authorization ||  req.headers.Authorization ||  false;

        // extract token from http headers
        if (authHeader) {
          var parts = authHeader.split(' ');
          // console.log(0, parts);
          if (parts.length != 2 || parts[0].toLowerCase() !== 'bearer') {

            // return error if token was required and missing
            if (tokenRequired) {
              // return next({
              //   code: 500,
              //   message: 'Invalid Authorization Header'
              // });
              throw new Error('Invalid Authorization Header');
            } else {
              return
            }

          }
          token = parts[1];
        }

        // if action param for tokens is allowed, use it
        if (!token && config.jwtauth.enableParam && data.params.token) {
          token = data.params.token;
        }

        // return error if token was missing but marked as required
        if (tokenRequired && !token) {
          // return next({
          //   code: 500,
          //   message: 'Authorization Header Not Set'
          // });
          throw new Error('Authorization Header Not Set');

        }
        // process token and save in connection
        else if (token) {
          api.jwtauth.processToken(token, function(claims) {
            return data.connection.jwt = {
              token,
              claims
            };
        }, (msg)=>{throw new Error(msg);});
        } else {
          return;
        }
      }
    };
    action.addMiddleware(jwtMiddleware);
  }

  async start() {}

  async stop() {}
}
