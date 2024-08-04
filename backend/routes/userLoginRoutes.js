import express from 'express';
import {User} from "../models/userLogin.js";

const router = express.Router();

//route to POST user
router.post('/', async (request, response) => {
    console.log('username: '+request.body.userName+', password: '+request.body.password);

    try {
      const newUser1 = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        userName: request.body.userName,
        password: request.body.password
      };
  
      const userSend = await User.create(newUser1);
      return response.status(201).send(userSend);
    } catch (error) {
      console.log(error);
      response.status(500).send({ message: error.message });
    }
  });

  router.patch('/', async (request, response) => {
    console.log('username: '+request.body.username+', password: '+request.body.password);
    try{
        console.log('username: '+request.body.username+' but the password: '+request.body.password);

        const u = request.body.password;
        console.log('testing u: '+u);

        
        const userSend = await User.findOne({userName: u});
        console.log(userSend);
        console.log(request.body.password+' vs '+userSend.password);
        if(request.body.password==userSend.password){
            console.log("passwords matched!!!");
            return response.status(200).json({
                count: userSend.length,
                data: userSend
            });
        }else{
            response.status(500).send({message: 'passwords didnt match'});

        }     


    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});


    }
  });

//route to GET all users


// router.get('/', async(request, response)=>{
//     try{
//         const userSend = await User.find({});
//         return response.status(200).json({
//             count: userSend.length,
//             data: userSend
//         });



//     }catch(error){
//         console.log(error.message);
//         response.status(500).send({message: error.message});


//     }
// });

//get one book form database using id
router.get('/:id', async(request, response)=>{
    try{
        const {id} = request.params;
        const userSend = await User.findById(id);

        return response.status(200).json(userSend);



    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});


    }
});




//route to update data
router.put('/:id', async(request, response)=>{
    try{
        if(
            !request.body.firstName ||
            !request.body.lastName ||
            !request.body.userName ||
            !request.body.password 
        ){
            return response.status(400).send({
                message: 'send all required fields' 
            });

        }



        const {id} = request.params;
        const result = await User.findByIdAndUpdate(id, request.body);
        if(!result){
            return response.status(404).json({message: 'Book not found'});

        }

        return response.status(200).json({message: 'Book successfully updated'});



    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message});


    }
});




export default router;