const router=require('express').Router()
const {createlist,getlist,deletemovie}=require('../Controllers/list')

router.post('/',createlist)
router.get('/:username',getlist)
router.delete('/:username/:id', deletemovie);
module.exports=router