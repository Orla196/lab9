const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');


app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Connecting to MongoDB using Mongoose
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@martinscluster.w5rtkz0.mongodb.net/DB14?retryWrites=true&w=majority');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
// Defining the book schema and model
const bookSchema = new mongoose.Schema({
  title: String,
  cover: String,
  author: String
})

const bookModel = mongoose.model('sdfsdfsdfsdfsdfffffffffffff423', bookSchema);
// API routes for CRUD operations on books
app.put('/api/book/:id', async (req, res) => {
  console.log("Update: " + req.params.id);

  let book = await bookModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(book);
})
//delete book conponent
app.delete('/api/book/:id', async (req, res) => {
  console.log("Delete: " + req.params.id);
  let book = await bookModel.findByIdAndDelete(req.params.id);
  res.send(book);
})

app.post('/api/book', (req, res) => {
  console.log(req.body);

  bookModel.create({
    title: req.body.title,
    cover: req.body.cover,
    author: req.body.author
  })
    .then(() => { res.send("Book Created") })
    .catch(() => { res.send("Book NOT Created") });

})
// Default route
app.get('/', (req, res) => {
  res.send('Hello World!')
})
// API endpoint to get all books
app.get('/api/books', async (req, res) => {

  let books = await bookModel.find({});
  res.json(books);
})
// API endpoint to get a specific book by its identifier
app.get('/api/book/:identifier', async (req, res) => {
  console.log(req.params.identifier);

  let book = await bookModel.findById(req.params.identifier);
  res.send(book);
})
// Starting the Express app on the specified port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
