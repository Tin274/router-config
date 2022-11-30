import { pathToFileURL } from "url";
import { pool } from "../db.js";

export const checkUser = async (req, res, next) => {
    

    const { firstname, lastname } = req.body;
    
    const query ='SELECT * FROM users WHERE firstname=$1 AND lastname=$2'
    const values = [firstname, lastname];

    if(firstname.length < 1 || lastname.length < 1) {
      res.status(404).json({msg: "name muss mindestens ein charakter enthalten"})
    } else {
      const {rows} = await pool.query(query, values);

      if(rows.length === 0) {
         
          next();
      }
      else {
           res.status(404).json({msg:"firstname and lastname already exists"})
        }

    }
}

export const checkUserUpdate = async (req, res, next) => {

    const {id} = req.params
    const {firstname, lastname} = req.body

    const query = 'SELECT * FROM users WHERE id=$1';
    const values = [id]
    const { rows } = await pool.query(query, values)
    // console.log("rows:", rows)
    // console.log("rows.firstname:", rows[0].firstname)
    //  console.log("rows.lastname:", rows[0].lastname)
    if (rows[0].firstname === firstname && rows[0].lastname === lastname) {
        res.status(404).json({msg: "nichts verändert"})
    }
    else {   
    next() 
    }
    
}

export const checkUserId = async (req, res, next) => {
    const {id} = req.params
    
    const query = 'SELECT * FROM users WHERE id=$1';
    const values = [id]
    const {rows} = await pool.query(query, values)

    if (rows.length >=1) {
            next()
    }
    else {
    return res.status(404).json({msg: `user mit ${id} nicht da`})
    }
}

