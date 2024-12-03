const {register} = require('../controller/auth/register');
const {login} =require('../controller/auth/login');


const router = require("express").Router();

router.post("/register", register);
router.post("/login",login);

module.exports = router