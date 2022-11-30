import pkg from 'pg';
const { Pool } = pkg;
import dotenv from "dotenv"
dotenv.config();

console.log("env : ", process.env.MY_URL)

const myConnectionString = 'postgres://comeewlw:ol9onWkfIsIuzWUk26Sx--Rx2HTiSjpE@mouse.db.elephantsql.com/comeewlw';

export const pool = new Pool({
  connectionString: myConnectionString
})