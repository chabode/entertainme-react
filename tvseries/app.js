const express = require('express')
const app = express()
const PORT = process.env.PORT || 3002

const { connect } = require('./config/mongo')

connect((err) => {
    const tvseriesRouter = require('./routers')
    if(!err){
        app.use(express.json())
        app.use(express.urlencoded({extended:false}))
        app.use('/', tvseriesRouter)
        app.listen(PORT, () => {
            console.log('listen to server tvseries', PORT)
        })
    }
})
