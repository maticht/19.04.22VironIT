const Router = require('express')
const router = new Router()
const controller = require('./controller')
const {viewAllUsersAuth} = require('./mid/middleware')
const load = require('./mid/fileMiddleware')

router.post('/reg', load.single('file'), controller.reg)
    .post('/log', controller.log)
    .get('/', viewAllUsersAuth, controller.getAllUsers)
    .get('/:email', controller.getUsersByEmail)
    .delete('/:email', controller.deleteUsersByEmail)
    .put('/:email', load.single('file'), controller.overwriteUsersByEmail)

module.exports = router