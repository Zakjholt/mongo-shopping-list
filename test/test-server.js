global.DATABASE_URL = 'mongodb://localhost/shopping-list-test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Item = require('../models/item');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);

describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {
            Item.create({
                name: 'Broad beans'
            }, {
                name: 'Tomatoes'
            }, {
                name: 'Peppers'
            }, function() {
                done();
            });
        });
    });
    //Copied from other test-server
    it('should list items on get', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                done();
            });
    });
    it('should add an item on post', function(done) {
        chai.request(app)
            .post('/items')
            .send({
                'name': 'Kale'
            })
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.name.should.equal('Kale');
                Item.find({
                    'name': 'Kale'
                }).should.exist;
                done();
            });
    });
    it('should edit an item on put', function(done) {
        chai.request(app)
            .put('/items/2')
            .send({
                'name': 'test',
                'id': '2'
            })
            .end(function(err, res) {
                Item.find({
                    'name': 'test'
                }).should.exist;
                done();
            });
    });
    // it('should delete an item on delete', function(done) {
    //     chai.request(app)
    //         .delete('/items/1')
    //         .send({
    //             'id': '1'
    //         })
    //         .end(function(err, res) {
    //             console.log(Item.find({
    //                 'id': '1'
    //             }));
    //             done();
    //         });
    // });

    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});
