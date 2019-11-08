const assert = require('assert')
const proxyquire = require('proxyquire')

const {
    moviesMock,
    MovieServiceMock
} = require('../utils/mocks/movies.mock')
const testServer = require('../utils/test.server')

describe('routes - movies', function(){
    const route = proxyquire('../routes/movie.route',{
        '../services/movies':MovieServiceMock
    })   

    const request = testServer(route)    
    describe('GET/ movies', function(){
        it('should respond with 200 status', function(done){
            
            request.get('/movies').expect(200,done)
        })

        it('should respond with the movies list', function(done){
            request.get('/movies').end((err, res)=>{
                assert.deepEqual(res.body,{
                    data:moviesMock,
                    message:'Movies Listed'
                })
                done()
            })
        })
    })
})    