class NewsController {
  // [GET] /news
  index(req, res) {
    // req.query
    res.render('news');
  }

  // [GET] /news/:slug
  show(req, res) {
    res.send('News detail');
  }
}

module.exports = new NewsController();
