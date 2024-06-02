const router=require('express').Router()
const {createUser,login,getUser}=require('../Controllers/login')
const {createlist}=require('../Controllers/list')





router.post('/',createUser)
router.post('/login',login)
router.get('/:id',getUser)


module.exports=router