module.exports = (app, repository) => {
  app.get('/movies/premieres', async (req, res, next) => {
    const movies = await repository.getMoviePremieres()
    if (!movies || movies.length === 0) return res.sendStatus(404)
    res.json(movies)
  })

  app.get('/movies/:id', async (req, res, next) => {
    const movie = await repository.getMovieById(req.params.id)
    if (!movie) return res.sendStatus(404)
    res.json(movie)
  })

  app.get('/movies', async (req, res, next) => {
    const movies = await repository.getAllMovies()
    if (!movies || movies.length === 0) return res.sendStatus(404)
    res.json(movies)
  })

  app.get('/movies/category/:category', async (req, res, next) => {
    const movies = await repository.getMovieByCategory(req.params.category)
    if (!movies || movies.length === 0) return res.sendStatus(404)
    res.json(movies)
  })

  app.post('/movies', async (req, res, next) => {
    let movieData = {
      titulo: req.body.titulo,
      sinopse: req.body.sinopse,
      duracao: req.body.duracao,
      dataLancamento: req.body.dataLancamento,
      imagem: req.body.imagem,
      categorias: req.body.categorias.map(categoria => categoria.toLowerCase())
    }
    const movie = await repository.insertMovie(movieData)
    console.log(movie)
    if (movie.acknowledged == false) {
      return res.json({ status: 500, msg: 'Error creating movie!' })
    }
    res.json({ status: 200, msg: 'Movie created successfuly!' })
  })

  app.delete('/movies/:id', async (req, res, next) => {
    await repository.deleteMovie(req.params.id)
    res.json({ status: 200, msg: 'Movie deleted successfuly!' })
  })
}
