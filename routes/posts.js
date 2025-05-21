const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { object } = require('webidl-conversions');

router.post('/create' , async (req, res) => {
    try{
        const newPost= await Post.create(req.body);
        res.status(201).send(newPost);
    }catch(error){
        console.error('Error al crear la publicación:', error);
        if(error.name==='ValidationError'){
            const errors= object.values(error.errors).map(err => err.message);
            return res.status(400).send({ message: 'Error de validación', errors });
        }
        res.status(500).send({ message: 'Error al crear la publicación', error: error.message });
    }
});

router.get('/' , async (req, res) => {
    try{
       const posts = await Post.find();
       res.status(200).send(posts);
    }catch(error){
        console.error('Error al obtener las publicaciones:', error);
        res.status(500).send({ message: 'Error al obtener las publicaciones', error: error.message });
    }
});


router.get('/id/:_id' , async (req, res) =>{
    try{
        const post= await Post.findById(req.params._id);
        if(!post){
            return res.status(404).send({ message: 'Publicación no encontrada' });
        }
        res.status(200).send(post);
    }catch(error){
         console.error('Error al buscar la publicación por ID:', error);
         if(error==='ObjctId'){
            return res.status(400).send ({ message: 'ID de publicación inválido' });
         }
         res.status(500).send({message: 'Error al buscar la publicación', error: error.message});
    }

});

router.get('/title/:_title' , async (req, res) =>{
    try{
        const posts= await Post.findOne({ title: req.params.title });
        if(!post){
            return res.status(404).send({ message: 'No se encontraron publicaciones con ese título' });
        }
        res.status(200).send(post);
    }catch(error){
         console.error('Error al buscar la publicación por título:', error);
         res.status(500).send({message: 'Error al buscar la publicación por titulo', error: error.message});
    }

});

router.put('/id/:_id' , async (req, res) =>{
    try{
        const post = await Post.findByIdAndUpdate(req.params._id,req.body,{ new: true });
         if(!post){
            return res.status(404).send({ message: 'Publicación no encontrada para actualizar' });
        }
        res.status(200).send(post);
    }catch(error){
        console.error('Error al actualizar la publicación:', error);

       if(error.kind==='ObjctId'){
            return res.status(400).send ({ message: 'ID de publicación inválido' });
         }
        
      if(error.name==='ValidationError'){
            const errors= object.values(error.errors).map(err => err.message);
            return res.status(400).send({ message: 'Error de validación al actualizar', errors });
        }
        res.status(500).send({ message: 'Error al actualizar la publicación', error: error.message });
    }
});

router.delete('/id/:_id' , async (req, res) =>{
    try{
        const post = await Post.findByIdAndDelete(req.params._id);
         if(!post){
            return res.status(404).send({ message: 'Publicación no encontrada para eliminar' });
        }
        res.status(200).send({ message: "El post ha sido eliminado Correctamente" });
    }catch(error){
        console.error('Error al eliminar la publicación:', error);

       if(error.kind==='ObjctId'){
            return res.status(400).send ({ message: 'ID de publicación inválido' });
         }
        
      if(error.name==='ValidationError'){
            const errors= object.values(error.errors).map(err => err.message);
            return res.status(400).send({ message: 'Error de validación al eliminar', errors });
        }
        res.status(500).send({ message: 'Error al eliminar la publicación', error: error.message });
    }
});

module.exports=router;