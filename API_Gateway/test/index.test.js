const expect=require('chai').expect;
const assert = require('chai').assert;
const request= require('request');
const app= require('../index').Queue
//Unit Tests for each PORTS

describe('Unit Tests for API GATEWAY>index.js',function () {
    //Tests for connections
    describe('Connections Test',function(){
        it('Rabbit MQ connection Test',function(done){
           done()
        })
    })
})