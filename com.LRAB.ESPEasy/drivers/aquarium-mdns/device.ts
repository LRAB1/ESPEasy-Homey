import Homey from 'homey';
import { get } from 'node:http';

module.exports = class MyDevice extends Homey.Device {

  /**
   * onInit is called when the device is initialized.
   */
  async onInit() {
    this.log('Aquarium-mDNS has been initialized');
    //  Setting a listener for onoff.
    this.registerCapabilityListener('onoff', async (value) => {
      this.log(value);
      if (this.getCapabilityValue('button') != value) {
        this.setCapabilityValue('button', value);
      } else {
        sendState(value);
        this.setCapabilityValue('button', value);
      };
    });
    //  Doing something with the onoff value.
    async function sendState(value:string) {
      get(`http://192.168.2.31/control?cmd=event,homey${value}`);
    };
    }
  };

  /**
   * onAdded is called when the user adds the device, called just after pairing.
   */
  async onAdded() {
    this.log('Aquarium has been added');
  }

  /**
   * onSettings is called when the user updates the device's settings.
   * @param {object} event the onSettings event data
   * @param {object} event.oldSettings The old settings object
   * @param {object} event.newSettings The new settings object
   * @param {string[]} event.changedKeys An array of keys changed since the previous version
   * @returns {Promise<string|void>} return a custom message that will be displayed
   */
  async onSettings({
    oldSettings,
    newSettings,
    changedKeys,
  }: {
    oldSettings: { [key: string]: boolean | string | number | undefined | null };
    newSettings: { [key: string]: boolean | string | number | undefined | null };
    changedKeys: string[];
  }): Promise<string | void> {
    this.log('MyDevice settings where change');
  }

  /**
   * onRenamed is called when the user updates the device's name.
   * This method can be used this to synchronise the name to the device.
   * @param {string} name The new name
   */
  async onRenamed(name: string) {
    this.log('MyDevice was renamed');
  }

  /**
   * onDeleted is called when the user deleted the device.
   */
  async onDeleted() {
    this.log('Aquarium has been deleted');
  }

};
