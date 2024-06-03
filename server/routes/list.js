const router=require('express').Router()
const {createlist,getlist,deletemovie,getId,getmovies}=require('../Controllers/list')

router.post('/',createlist)
router.get('/:username',getlist)
router.delete('/:username/:id', deletemovie);
router.post('/share',getId)
router.get("/share/:id", getmovies);
module.exports=router