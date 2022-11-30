import express from 'express';
const app = express();

const PORT = 8000;
import userRouter from './routing/userRouter.js';

app.use(express.json());
app.use('/', userRouter);

app.listen(PORT, () => {
    console.log(`server starts of Port ${PORT}`)
})