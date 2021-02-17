const express = require('express');
const app = express();
const bodyParser = require('body-parser');

/// MONGO
const MongoClient = require('mongodb').MongoClient
const mongURI = 'mongodb+srv://teachandtravelcn:Maximus123@cluster0.b3plz.mongodb.net/Good?retryWrites=true&w=majority'

MongoClient.connect(mongURI, {useUnifiedTopology: true})
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('good')
    const projectsCollection = db.collection('projects')

    // middleware//
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('public'))


///routes//
app.get('/', (req, res) => {
  const data = db.collection('projects').find().toArray()
  .then(results => {
    res.render('index.ejs', {projects: results});
  })
  .catch(error => console.error(error))
});

app.post('/projects', (req, res) => {
  // if (req.body.name.length < 1) {} //// try this
  console.log(req.body)
  projectsCollection.insertOne(req.body)
    .then(result => {
      res.redirect('/')
    })
    .catch(error => console.error(error))
});


//update//
app.put('/projects', (req, res) => {
  // console.log(req.body);
  projectsCollection.findOneAndUpdate(
    { name: req.body.name}, // instead of hardcoding name I want to read it from projecs input form
    {
      $set: {
        // image: req.body.image,
        // name: req.body.name,
        country: req.body.country,
        // descriprion: req.body.descriprion,
        // apply: req.body.apply,

      }
    },
  )
  .then(result => res.json('Success'))
  .catch(error => console.error(error))
})


/// delete
app.delete('/projects', (req, res) => {
  projectsCollection.deleteOne(
    { name: req.body.name }
  )
    .then(result => {
      if (result.deletedCount === 0) {
        return res.json('No project to delete')
      }
      res.json(`Deleted project`)
    })
    .catch(error => console.error(error))
})
















app.listen(3000, () => console.log('listening on 3000'));

  })
  .catch(console.error);
