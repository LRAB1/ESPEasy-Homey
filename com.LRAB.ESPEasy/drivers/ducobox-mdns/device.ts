import Homey from 'homey';

module.exports = class MyDevice extends Homey.Device {

  /**
   * onInit is called when the device is initialized.
   */
  async onInit() {
    this.log('DUCOBOX-mDNS has been initialized');

    this.registerCapabilityListener('onoff', async (value) => {
      this.log('Button On/Off', value);
    });

    this.setCapabilityValue('onoff', true).catch(this.error);
    
    this.registerCapabilityListener('fan_mode', async (state) => {
      this.log('fan_mode', state);
    });
      
    this.setCapabilityValue('fan_mode', 'auto').catch(this.error);

    this.registerCapabilityListener('fan_speed', async (speed) => {
      this.log('fan_speed', speed);
    });

    this.setCapabilityValue('fan_speed', 0).catch(this.error);

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
