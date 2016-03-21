import {Router, RouterConfiguration} from 'aurelia-router'

export class App {
  router: Router;
  
  configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'Aurelia';
    config.map([
      { route: ['', 'login'], name: 'login',      moduleId: './login',      nav: true, title: 'Login' },
      { route: 'main', name: 'main',      moduleId: './main',      nav: true, title: 'main' }
    ]);

    this.router = router;
  }
}
