import Homey, { Device, DiscoveryResult } from 'homey';
import { get } from 'node:http';

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
    
    this.registerCapabilityListener('Box_mode_enum_cap', async (mode) => {
      const body = await get(`http://192.168.2.26/control?cmd=[Serial_gateWay#Ventilationmode]`);
      console.log(`mode ${body}`);
    });

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
    this.log('MyDevice has been deleted');
  }

};
