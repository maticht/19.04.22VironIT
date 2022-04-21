const Router = require('express')
const router = new Router()
const controller = require('./controller')

router.post('/reg', controller.reg)
    .post('/log', controller.log)
    .get('/', controller.getAllUsers)
    .get('/:email', controller.getUsersByEmail)
    .delete('/:email', controller.deleteUsersByEmail)
    .put('/:email', controller.overwriteUsersByEmail)

module.exports = router