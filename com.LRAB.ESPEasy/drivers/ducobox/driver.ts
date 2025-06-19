import Homey from 'homey';

module.exports = class MyDriver extends Homey.Driver {

  /**
   * onInit is called when the driver is initialized.
   */
  async onInit() {
    this.log('old driver has been initialized');
  }

  /**
   * onPairListDevices is called when a user is adding a device and the 'list_devices' view is called.
   * This should return an array with the data of devices that are available for pairing.
   */
  async onPairListDevices() {
    return [
      // Example device data, note that `store` is optional
      {
        name: 'DucoBox ESP-EASY',
        data: {
          id: 'my-device-001',
        },
        // store: {
        //   address: '127.0.0.1',
        // },
      },
    ];
  }

};
