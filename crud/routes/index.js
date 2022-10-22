var express = require('express')
var db = require('../db')
var router = express.Router()

/* GET home page. */
router.get('/', async function (req, res, next) {
  // console.log('to aqui msm')
  // console.log(globalString)
  res.render('index', { docs: await db.findAll() })
})

router.get('/new', function (req, res, next) {
  res.render('new', { title: 'Cadastro de Cliente', action: '/new', doc: {} })
})

// GET to delete
router.get('/delete/:id', async function (req, res, next) {
  const id = req.params.id
  await db.deleteOne(id)
  res.redirect('/?delete=true')
})

/* POST edit page. */
router.post('/edit/:id', async function (req, res) {
  const id = req.params.id
  const nome = req.body.nome
  const idade = parseInt(req.body.idade)
  const uf = req.body.uf
  await db.update(id, { nome, idade, uf })
  res.redirect('/?edit=true')
})

/* POST new page. */
router.post('/new', async function (req, res) {
  const nome = req.body.nome
  const idade = parseInt(req.body.idade)
  const uf = req.body.uf
  await db.insert({ nome, idade, uf })
  res.redirect('/?new=true')
})

/* GET edit page. */
router.get('/edit/:id', async function (req, res, next) {
  const id = req.params.id
  const doc = await db.findOne(id)
  res.render('new', {
    title: 'Edição de Cliente',
    doc,
    action: '/edit/' + doc._id
  })
})

module.exports = router
