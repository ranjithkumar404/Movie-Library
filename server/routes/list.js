const router=require('express').Router()
const {createlist,getlist}=require('../Controllers/list')

router.post('/',createlist)
router.get('/:username',getlist)

module.exports=router