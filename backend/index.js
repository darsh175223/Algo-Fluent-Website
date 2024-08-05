import express, { response } from "express"
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import userLoginRoutes from './routes/userLoginRoutes.js';
import userUpdateRoutes from './routes/userUpdateRoutes.js';

import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());




app.use('/userlogin',userLoginRoutes );
app.use('/userupdate',userUpdateRoutes );



mongoose.connect(mongoDBURL).then(()=>{
    console.log('app connected to database');
    app.listen(PORT, () => {
        console.log(`Server is  l i s t e n i n g  on port ${PORT}`);
      });


}).catch((error)=>{
    console.log(error);

});

