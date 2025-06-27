import Homey, { Device, DiscoveryResult } from 'homey';
import { get } from 'node:http';
import { json } from 'node:stream/consumers';

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
  setInterval(() => {
    get('http://192.168.2.26/json?view=sensorupdate&tasknr=3', (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const jsonBody = JSON.parse(data);
          const fanSpeed = jsonBody?.TaskValues?.[0]?.Value;
          const adjustedFanSpeed = Math.abs(fanSpeed/100);
          this.log('Parsed fan speed:', fanSpeed);
          this.setCapabilityValue('fan_speed', adjustedFanSpeed).catch(this.error);
        } catch (err) {
          this.error('Failed to parse fan speed JSON:', err);
        }
      });
    }).on('error', (err) => {
      this.error('HTTP request error:', err);
    });
    this.log('Polling fan speed...');
  }, 5000); // 5 seconds
});

    // Registering the capability listener for 'Box_mode_enum_cap'. Frontend.
    this.registerCapabilityListener('Box_mode_enum_cap', async (mode) => {
      this.log('Box_mode_enum_cap', mode);
      setInterval(() => {
    get('http://192.168.2.26/json?view=sensorupdate&tasknr=2', (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const jsonBody = JSON.parse(data);
          const boxMode = jsonBody?.TaskValues?.[0]?.Value;
          this.log('Parsed box mode:', boxMode);
          this.setCapabilityValue('Box_mode_enum_cap', `${boxMode}`).catch(this.error);
          if (boxMode === 0) {
            this.setCapabilityValue('onoff', false).catch(this.error);
          } else if (boxMode >= 3) {
            this.setCapabilityValue('onoff', true).catch(this.error);
          }
        } catch (err) {
          this.error('Failed to parse fan speed JSON:', err);
        }
      });
    }).on('error', (err) => {
      this.error('HTTP request error:', err);
    });
    this.log('Polling box mode...');
  }, 10000); // 10 seconds
      if (mode >= 3) {
        this.log(`User requested setting: ${mode}`);
        get(`http://192.168.2.26/control?cmd=event,mode${mode}`);
      } else if (mode === 0) {
        this.log(`User requested DucoBox auto`, mode);
      };
    });

    this.triggerCapabilityListener('fan_speed', 0).catch(this.error);
    this.triggerCapabilityListener('Box_mode_enum_cap', `0`).catch(this.error);

    // this.setCapabilityValue('Box_mode_enum_cap', `0`).catch(this.error); // Setting the default value when first initializing the device.

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
