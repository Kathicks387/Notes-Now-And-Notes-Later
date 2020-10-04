const express = require("express");  
const app = express();  
const PORT = process.env.PORT || 8080;  
const fs = require('fs');   
const path = require('path');  
let noteData = require('./db/db.json');  

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req,res)=>{
  res.sendFile(path.join(__dirname, '/public/index.html'));
}); //sends the index file 

app.get('/notes', (req,res)=>{
  res.sendFile(path.join(__dirname, '/public/notes.html'));
}); //sends the notes file 

app.get('/api/notes', (req, res)=>{
  res.json(noteData);
}); //sends the note data response from the db file 

app.post('/api/notes',(req,res)=>{
  console.log(req)
  console.log(req.body)
  noteData.push(req.body)
  noteData.forEach((note,i)=>{
    note.id = i +1
  });
  let newNote = JSON.stringify(noteData);
  fs.writeFileSync('./db/db.json', newNote);

  res.json(noteData);
});

app.delete('/api/notes/:id', (req,res)=>{
  let filtered= noteData.filter(note=>note.id !==parseInt(req.params.id));
  console.log(filtered)
  fs.writeFileSync('./db/db.json', JSON.stringify(filtered));
   res.redirect("localhost:8080/notes");
   
});



// require("./routes/apiRoutes")(app);
// require("./routes/htmlRoutes")(app);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
  });