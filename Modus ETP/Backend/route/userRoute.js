const express = require('express');
const userRoute = express();
const userController = require('../controller.js/userController')

userRoute.get('/userLoad',userController.userLoad)
userRoute.get('/getUser',userController.getUser)

userRoute.post('/userCreate',userController.userCreate)
userRoute.post('/deleteUser',userController.deleteUser)
userRoute.post('/updateUser',userController.updateUser)

module.exports = userRoute;