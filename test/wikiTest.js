var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
var models = require('../models');
chai.use(spies);

describe('Page Model', function() {
    var page;
    beforeEach(function() {
        page = new models.Page()
    })

    describe('Validations', function() {
        it('should err without title', function(done) {
            page.body = "asd";
            page.validate(function(err) {
                expect(err).to.be.ok;
                done();
            })
            
        })
        it('should err with title of zero length', function(done) {
            page.title = "";
            page.body = "asd";
            page.validate(function(err) {
                expect(err).to.be.ok;
                done();
            })
        })
        it('should err without body', function(done) {
            page.title = "add";
            page.validate(function(err) {
                expect(err).to.be.ok;
                done();
            })
        })
    })

    describe('Statics', function() {
        describe('findBytag', function() {
            xit('should get pages with the search tag', function() {})
            xit('should not get pages without the search tag', function() {})
        })
    })

    describe('Methods', function() {
        describe('computeUrlName', function() {
            xit('should convert non-word-like chars to underscores', function() {})
        })
        describe('getSimilar', function() {
            xit('should never get itself', function() {})
            xit('should get other pages with any common tags', function() {})
            xit('should not get other pages without any common tags', function() {})
        })
    })

    describe('Virtuals', function() {
        describe('full_route', function() {
            xit('should return the url_name prepended by "/wiki/"', function() {})
        })
    })

    describe('Hooks', function() {
        xit('should call computeUrlName before save', function() {})
    })

})