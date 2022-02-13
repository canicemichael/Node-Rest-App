const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("the boy is good");
})

module.exports = router;