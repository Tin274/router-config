import { pool } from '../db.js';
import { validationResult } from 'express-validator'

export const getAllUser = async (req, res) => {
    const {rows} = await pool.query('SELECT * FROM users')
    res.json (rows)
}


export const getOneUser = async (req, res) => {
    const { id } = req.params;
    
    try {
        const { rows } = await pool.query('SELECT * FROM users WHERE id=$1', [id])
        if (rows.length >=1) {
             res.json(rows)
        }
        else {
             res.json({msg: `user mit ${id} ist nicht vorhanden`}) 
        }
       
    }catch (err) {
        console.log(err.stack)

    return res.status(404).json({msg: `${id} is not valid`})
    }
}


export const createSingleUser = async (req, res) => {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
  }
  const {firstname, lastname} = req.body;
  const query = 'INSERT INTO users (firstname, lastname) VALUES ($1,$2)';
  const values = [firstname, lastname];
  if(req.body){
    const {rows} = await pool.query(query,values)
    console.log("neuer user angelegt", rows)
  } else {
    /* res.status(404).json({msg: 'no data transfer'}) */
    res.status(404).send("user not found")
  } 
  res.status(200).send("create single user")
}


export const updateOneUser = async (req, res) => {

    const { id } = req.params;
    const { firstname, lastname } = req.body;
    const myQuery = 'UPDATE users SET firstname=$1, lastname=$2 WHERE id=$3 RETURNING *';
    const myValues = [firstname, lastname, id];
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
  
    try { 
        const result = await pool.query(myQuery, myValues)
        console.log(result)

        return res.status(200).json({msg: `user mit id ${id} wurde erfolgreich aktulisiert`}) 
    }
    catch(err){
        console.log(err.stack)
        res.status(500).json({msg: 'connection fehlt'})
    } 
}


export const deleteOneUser = async(req, res) => {
    
  const {id} = req.params;
  const myQuery = 'DELETE FROM users WHERE id=$1';
  const myValue = [id];

    try {
      const {rows} = await pool.query(myQuery, myValue)
      return res.status(200).json({msg: `user mit ${id} wurde gelöscht`})
    } catch (err){
      console.log(err.stack)
      res.status(500).json({msg: 'connection fehlt'})
    }
}

