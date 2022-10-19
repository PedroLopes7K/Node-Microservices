var express = require('express')
var db = require('../db')
var router = express.Router()

/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('index', { docs: await db.findAll() })
})

router.get('/new', function (req, res, next) {
  res.render('new', { title: 'Cadastro de Cliente', action: '/new' })
})
router.post('/new', function (req, res, next) {
  res.redirect('/?new=true')
})

module.exports = router
