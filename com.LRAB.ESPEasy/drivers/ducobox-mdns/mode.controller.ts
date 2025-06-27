// Define the modes, its calls etc.

import { get } from "node:http";

async function gatewayAuto(autoSet:boolean, res:boolean): Promise<boolean> {
    if (autoSet === true) {
        get('http://192.168.2.26/control?cmd=event,mode13');
        return res = true;
    } else {
        get('http://192.168.2.26/control?cmd=event,mode11');
        return res = false;  
    };
}

module.exports = {
    gatewayAuto
};