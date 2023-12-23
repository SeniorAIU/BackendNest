// express.d.ts

import * as expressSession from 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: any; // Adjust the type as needed
  }

  interface Session {
    user?: any; // Adjust the type as needed
  }
}

export = expressSession;
