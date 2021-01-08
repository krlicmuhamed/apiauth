export const DEFAULT = {
  jwtauth: (api) => {
    // console.log(api);
    return {
      enabled: {
        web: true,
        websocket: false,
        socket: false,
        testServer: false
      },
      secret: api.general.serverToken + 'Change Me!',
      algorithm: 'HS512',
      enableParam: true // enables token as action param in addition to Authorization headers
    }
  }
};
export const TEST = {
  jwtauth: (api) => {
    return {
      enabled: {
        web: false,
        websocket: false,
        socket: false,
        testServer: false
      },
      secret: api.general.serverToken + 'Change Me!',
      algorithm: 'HS512',
      enableParam: true // enables token as action param in addition to Authorization headers
    }
  }
};
export const PRODUCTION = {
  jwtauth: (api) => {
    return {
      enabled: {
        web: true,
        websocket: true,
        socket: false,
        testServer: false
      },
      secret: api.general.serverToken + 'Change Me!',
      algorithm: 'HS512',
      enableParam: true // enables token as action param in addition to Authorization headers
    }
  }
};
