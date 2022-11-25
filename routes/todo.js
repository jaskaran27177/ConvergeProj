import express  from "express";
const router =express.Router()

import {gettodos,createtodo,get_a_todo,deletetodo,changetodo,searchtodo} from '../controllers/todo.js'

router.post('/search',searchtodo)
router.get('/edit/:id',get_a_todo)
router.get('/delete/:id',deletetodo)
router.delete('/:id',deletetodo)
router.post('/:id',changetodo)
router.get('/',gettodos)
router.post('/', createtodo)

export default router