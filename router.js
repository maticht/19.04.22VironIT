const Router = require('express')
const router = new Router()
const controller = require('./controller')

router.post('/reg', controller.reg)
    .post('/log', controller.log)

module.exports = router