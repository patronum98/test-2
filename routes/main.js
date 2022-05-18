var express  = require('express');
var router   = express.Router();
var multer   = require('multer'); // 1

var fs = require('fs');

var storage  = multer.diskStorage({ // 2
  destination(req, file, cb) {
    cb(null, 'uploadedFiles/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}__${file.originalname}`);
  },
});
var upload = multer({ dest: 'uploadedFiles/' }); // 3-1
var uploadWithOriginalFilename = multer({ storage: storage }); // 3-2

router.get('/', function(req,res){
  res.render('upload');
});


router.post('/upload', uploadWithOriginalFilename.single('attachment'), function(req,res){ // 5
    let test = JSON.stringify(req.file)
    var dejson = JSON.parse(test)
    var path = dejson.path
    fs.readFile(path, function(err, data){
        console.log('picture loading...');
        res.writeHead(200);
        res.write(data);
        res.render('confirmation');
        res.end();    
    });
});

module.exports = router;