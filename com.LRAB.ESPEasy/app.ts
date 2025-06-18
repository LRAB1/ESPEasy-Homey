'use strict';

import Homey from 'homey';

module.exports = class MyApp extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('MyApp has been initialized');

    const card = this.homey.flow.getActionCard(`log-something-to-console`);
    card.registerRunListener(async () => {
      //log something.
      this.log(`Hoeshabaroer`); //This call works!
    });
  }

}
