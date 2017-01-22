import environment from './environment';
import "bootstrap";
import AuthService from "./services/auth-service";


//Configure Bluebird Promises.
Promise.config({
  warnings: {
    wForgottenReturn: false
  }
});

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin("aurelia-animator-css")
     .plugin("aurelia-notification",
            config => {
                config.configure({
                    translate: false, // "true" needs aurelia-i18n to be configured
                    notifications: {      
                        success: {addnCls: "humane-jackedup-success", timeout:5000},
                        error: {addnCls: "humane-jackedup-error", timeout:10000},
                        info: {addnCls: "humane-jackedup-info", timeout:10000}
                    }
                });
            })
    .feature('resources');

  if (environment.debug) {
    aurelia.use.developmentLogging();
  }

  if (environment.testing) {
    aurelia.use.plugin('aurelia-testing');
  }

  aurelia.start().then(() => {
        let root = "app";
        const authService = aurelia.container.get(AuthService);

        authService.isAuthenticated().then((response) => {

            if (!response) {
                root = "login";
            };

            aurelia.setRoot(root);
        });
    });
}
