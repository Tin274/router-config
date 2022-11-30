import pkg from 'pg';
const { Pool } = pkg;

const myConnectionString = 'postgres://comeewlw:ol9onWkfIsIuzWUk26Sx--Rx2HTiSjpE@mouse.db.elephantsql.com/comeewlw';

export const pool = new Pool({
  connectionString: myConnectionString
})