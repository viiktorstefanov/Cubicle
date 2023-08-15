const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('details');
})

module.exports = router;