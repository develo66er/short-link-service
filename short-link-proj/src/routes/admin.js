
const express = require('express');

const adminController = require('./../constrollers/admin');


const router = express.Router();


router.post('/link-redirect', adminController.postRedirect);

router.post('/', adminController.addLink);
 module.exports=router;