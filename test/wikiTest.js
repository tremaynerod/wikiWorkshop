var expect = require('chai').expect;
var chai = require('chai');
var spies = require('chai-spies');
var models = require('../models');
//var async = require('async');
var forEach = require('async-foreach').forEach;
chai.use(spies);

describe('Page Model', function() {    
    describe('Validations', function() {
        var page;
        beforeEach(function() {
            page = new models.Page()
        })

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


    beforeEach(function(done) {
        models.Page.create({
            title: 'foo',
            body: 'bar',
            tags: ['catron', 'baron']
        }, done )
    })
    afterEach(function(done){
        models.Page.remove({}, function(){
            done();
        })
    })

        describe('findBytag', function() {
            it('should get pages with the search tag', function(done) {
                models.Page.findByTag('baron', function(err, pages) {
                    expect(pages).to.have.lengthOf(1)
                    done()
                })
            })
            it('should not get pages without the search tag', function(done) {
                models.Page.findByTag('zordon', function(err, pages) {
                    expect(pages).to.have.lengthOf(0)
                    done()
                })
            })
        })
    })

    describe('Methods', function() {
        var page;
        var page2;
        var page3;
        beforeEach(function() {
            page = new models.Page({ title: 'dsf 90vds', body: 'bar',
                 tags: ['g1', 'g2'] });

            page2 = new models.Page({ title: 'dsf 90vds', body: 'bar',
                 tags: ['g1', 'g3'] });

            page3 = new models.Page({ title: 'dsf 90vds', body: 'bar',
                 tags: ['z1', 'z3'] });
        })
        afterEach(function(done){
        models.Page.remove({}, function(){
            done();
            })
        })

        describe('computeUrlName', function() {
            it('should convert non-word-like chars to underscores', function(done) {
                page.computeUrlName()
                expect(page.url_name).to.equal('dsf_90vds')
                done();
            })
        })
        describe('getSimilar', function() {
            it('should never get itself', function(done) {
                var isIn = false;
                 page.save(function(err, page) {
                     page2.save(function(err, page) {
                        page.getSimilar(function(err, pages) { 
                            expect(pages).to.have.lengthOf(1);
                            done();
                        });
                     });
                });      
            })

        
            it('should get other pages with any common tags', function(done) {
                page.save(function(err, page) {
                     page2.save(function(err, page) {
                        page.getSimilar(function(err, pages) { 
                            expect(pages).to.have.lengthOf(1);
                            done();
                        });
                     });
                }); 
            })
            it('should not get other pages without any common tags', function(done) {
                page.save(function(err, page) {
                     page2.save(function(err, page) {
                        page.getSimilar(function(err, pages) { 
                            expect(pages).to.have.lengthOf(1);
                            done();
                        });
                     });
                }); 
            })
        })
    })

    describe('Virtuals', function() {
        var title = "One more";
        beforeEach(function() {
            page = new models.Page({ title: title, body: 'bar'});
        })
        afterEach(function(done){
        models.Page.remove({}, function(){
            done();
            })
        })

        describe('full_route', function() {
            it('should return the url_name prepended by "/wiki/"', function(done) {
                page.computeUrlName()
                expect(page.virtuals('full_route').get().to.equal('wiki/One_more')
                done();
            })
        })
    })

    describe('Hooks', function() {
        xit('should call computeUrlName before save', function() {

        })
    })

})