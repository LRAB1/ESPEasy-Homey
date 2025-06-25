import Homey, { Device, DiscoveryResult } from 'homey';
import { emit } from 'node:process';
import { stringify } from 'node:querystring';

module.exports = class MyDevice extends Homey.Device {

  /**
   * onInit is called when the device is initialized.
   */
  async onInit() {

    this.log('DUCOBOX-mDNS has been initialized');

    this.registerCapabilityListener('onoff', async (value) => {
      this.log('Button On/Off', value);
    });
    
    this.registerCapabilityListener('fan_speed', async (speed) => {
      this.log('fan_speed', speed);
    });

    // Registering the capability listener for 'Box_mode_enum_cap'. Frontend.
    this.registerCapabilityListener('Box_mode_enum_cap', async (mode) => {
      this.log('Box_mode_enum_cap', mode);
    });

    this.setCapabilityValue('Box_mode_enum_cap', `0`).catch(this.error); // Setting the default value when first initializing the device.

    this.setUnavailable(this.homey.__('device_unavailable')).catch(this.error);

    this.setAvailable();
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
    this.log("MyDevice settings where changed");
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
    this.log('Ducobox has been deleted');
  }

};
