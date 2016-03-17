import './setup';
import {ChildRouter} from '../../src/bootstrap-app/child-router';
var  expect = chai.expect;

class RouterStub {
  routes;
  
  configure(handler) {
    handler(this);
  }
  map(routes) {
    this.routes = routes;
  }
}

describe('the Child Router module', () => {
  var sut, mockedRouter;

  beforeEach(() => {
    mockedRouter = new RouterStub();
    sut = new ChildRouter();
    sut.configureRouter(mockedRouter, mockedRouter);
  });

  it('contains a router property', () => {
    expect(sut.router).not.to.be.undefined();
  });

  it('configures the heading', () => {
    expect(sut.heading).to.be.eq('Child Router');
  });

  it('should have a welcome route', () => {
    expect(sut.router.routes).to.contain({ route: ['','welcome'], name: 'welcome',  moduleId: 'welcome', nav: true, title:'Welcome' });
  });

  it('should have a users route', () => {
     expect(sut.router.routes).to.contain({ route: 'users', name: 'users', moduleId: 'users', nav: true, title:'Github Users' });
  });

  it('should have a child router route', () => {
    expect(sut.router.routes).to.contain({ route: 'child-router', name: 'child-router', moduleId: 'child-router', nav: true, title:'Child Router' });
  });
});
