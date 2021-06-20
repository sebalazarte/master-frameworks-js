'use strict'

var express = require('express');
var ArticleController = require('../controllers/article');

var router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload/articles/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.' + file.mimetype.split('/')[1]);
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            cb(null, true);
        }
    }
});

const upload = multer({ storage: storage });


// var multipart = require('connect-multiparty');
// var md_upload = multipart({ uploadDir: './upload/articles'});

// Rutas de prueba
router.post('/datos-curso', ArticleController.datosCurso);
router.get('/test-de-controlador', ArticleController.test);

// Rutas útiles
router.post('/save', ArticleController.save);
router.get('/articles/:last?', ArticleController.getArticles);
router.get('/article/:id', ArticleController.getArticle);
router.put('/article/:id', ArticleController.update);
router.delete('/article/:id', ArticleController.delete);
// router.post('/upload-image/:id?', md_upload, ArticleController.upload);
router.post('/upload-image/:id?', upload.single('file0'), ArticleController.upload);
router.get('/get-image/:image', ArticleController.getImage);
router.get('/search/:search', ArticleController.search);

module.exports = router;