
router.get('/', (req, res) => {
    res.json({ response: 'a GET request for LOOKING at questions' });
  });
  router.post('/', (req, res) => {
    res.json({
      response: 'a POST request for CREATING questions',
      body: req.body
    });
  });
  router.get('/:qID', (req, res) => {
    res.json({
      response: `a GET request for LOOKING at a special answer id: ${req.params.qID}`
    });
  });