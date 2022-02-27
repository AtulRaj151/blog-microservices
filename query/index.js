// /query server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors())

const posts = {};



app.post('/posts', (req, res)=> {
  res.send(posts)
});


app.post('/events',(req,res)=> {
  const { type , data } = req.body;
  console.log(req.body)
   if( type === 'PostCreated') {
       const { id , title } = data;
       posts[id] = { id, title , comments: []}
   }
   if( type === 'CommentCreated') {
       const { id, content, postId } = data;
       const post = posts[postId];
       post.comments.push({id, content});
   }
   console.log(posts)
   res.send({});
});

app.listen(4002,()=>{
    console.log("listening on port 4002");
})