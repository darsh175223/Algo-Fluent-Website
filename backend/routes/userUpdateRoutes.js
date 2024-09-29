import express from 'express';
import {User} from "../models/userLogin.js";

const router2 = express.Router();

//route to GET all users

router2.get('/', async (request, response) => {
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

//incerement level parameter by one
router2.patch('/', async (request, response) => {
    
    try {
        console.log('username: ', request.body.username);
        const u = request.body.username
        const user = await User.findOne({userName: u});
        console.log(user.lvl);
  
      
  
      // Update user level only if authentication is successful
      const updatedUser = await User.findOneAndUpdate(
        { userName: u }, // Find the user by username
        { $inc: { lvl: 1 } }, // Increment the 'lvl' field by 1
        { new: true } // Return the updated document
      );
  
      if (!updatedUser) {
        return response.status(500).send({ message: 'Failed to update user level' });
      }
      console.log(user.lvl)
      return response.status(200).json({
        message: 'User level increased successfully',
        level : user.lvl+1
      });
    } catch (error) {
        console.log("h1");
      console.error(error.message);
      console.log("h2");

      response.status(500).send({ message: 'Internal server error' });
      console.log("h3");

    }
  });
  
// Route to update the review field for a user
router2.post('/', async (request, response) => {
  try {
      const { username, review } = request.body;

      // Check if both fields are provided
      if (!username || !review) {
          return response.status(400).send({ message: 'Username and review are required' });
      }

      // Find the user by username and update the review field
      const updatedUser = await User.findOneAndUpdate(
          { userName: username },
          { review: review }, // Update the review field
          { new: true } // Return the updated document
      );

      if (!updatedUser) {
          return response.status(404).send({ message: 'User not found' });
      }

      return response.status(200).json({
          message: 'Review updated successfully',
          data: updatedUser
      });
  } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
  }
});



  





export default router2;