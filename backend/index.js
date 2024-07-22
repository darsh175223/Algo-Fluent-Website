import express, { response } from "express"
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import userLoginRoutes from './routes/userLoginRoutes.js';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());


app.get('/', (request, response)=>{
    console.log(request);
    return response.status(234).send('mern worked')
})

app.use('/userlogin',userLoginRoutes );



mongoose.connect(mongoDBURL).then(()=>{
    console.log('app connected to database');
    app.listen(PORT, ()=>{
        console.log('app i s listening')
    });


}).catch((error)=>{
    console.log(error);

});

