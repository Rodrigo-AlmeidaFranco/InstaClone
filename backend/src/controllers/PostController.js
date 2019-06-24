const Post = require('../models/Post');
const path = require('path');
const fs = require('fs');
var sharp = require('jimp');

module.exports = {
    async index(req,res){
        const posts = await Post.find().sort('-creatAt');

        return res.json(posts);
    },
    async store(req,res){
        const{author,place,description,hashtags} = req.body;
        const{filename: image} = req.file;
        const [name] = image.split('.');
        const filename = `${name}.jpg`;

        await sharp.read(req.file.path)
        .then(img => {
          return img
            .resize(500,500) // resize
            .quality(70) // set JPEG quality
            .write( path.resolve(req.file.destination, 'resized',filename)); // save
        })
        .catch(err => {
          console.error(err);
        });

       fs.unlinkSync(req.file.path); 
        const post = await Post.create({
            author,
            place,
            description,
            hashtags,
            image:filename,
        })
        req.io.emit('post',post);

        return res.json(post);
    }
}