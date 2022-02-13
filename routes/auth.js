const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("the auth route");
})

module.exports = router;