var express = require('express');
var cors = require('cors');
require('dotenv').config()
var bodyParser = require('body-parser');
var multer = require('multer');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

var app = express();

app.use (bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single('upfile'), function(req, res) {
  console.log(req.file);
  let name = req.file.originalname;
  let type = req.file.mimetype;
  let size = req.file.size;
  res.json({"name": name, "type": type, "size": size});

})

// 404-NOT FOUND Middleware
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('Not found');
}); 

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
