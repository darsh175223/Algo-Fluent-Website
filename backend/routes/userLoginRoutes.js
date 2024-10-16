import express from 'express';
import {User} from "../models/userLogin.js";
import router2 from './userUpdateRoutes.js';

const router = express.Router();

//route to POST user
router.post('/', async (request, response) => {

    try {
      const registerTime = new Date().toString();
      const newUser1 = {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        userName: request.body.userName,
        password: request.body.password,
        lvl: '0',
        loginTimes: [registerTime],
      };
  
      const userSend = await User.create(newUser1);
      return response.status(201).send(userSend);
    } catch (error) {
      console.log(error);
      response.status(500).send({ message: error.message });
    }
  });


//IMPORTANT: userLOGIN function
router.patch('/', async (request, response) => {
    try {
        const u = request.body.password;
        const userSend = await User.findOne({ userName: u });

        if (request.body.password == userSend.password) {
            console.log("passwords matched!!!");

            // New functionality to set loginTime and update loginTimes array
            const loginTime = new Date().toString();
            userSend.loginTimes.push(loginTime); // Append loginTime to loginTimes array
            await userSend.save(); // Save the updated user document

            return response.status(200).json({
                count: userSend.length,
                data: userSend
            });
        } else {
            response.status(500).send({ message: 'passwords didnt match' });
        }
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


    // Route to get the level of a user by username
router.patch('/:id', async (request, response) => {
    try {
        const u = request.body.username;
        console.log("request:  ",request.body)
        const userSend = await User.findOne({userName: u});
        console.log("level:  ",userSend.lvl)
        

        return response.status(200).json({
            level : userSend.lvl
        });
     
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

  

//route to GET all users

router.get('/', async (request, response) => {
    try {
      const user = await User.find({});
  
      return response.status(200).json({
        count: user.length,
        data: user,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
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

// Route for Delete a book
router.delete('/:id', async (request, response) => {
    try {
      const { id } = request.params;
  
      const result = await User.findByIdAndDelete(id);
  
      if (!result) {
        return response.status(404).json({ message: 'User not found' });
      }
  
      return response.status(200).send({ message: 'Book deleted successfully' });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });



export default router;