class endDevice {

  constructor (topic, deviceName, data) {

    this.topic = topic
    this.deviceName = deviceName
    this.rawData = data
    
    this.angleX = 0
    this.angleY = 0
    this.angleZ = 0
    
    this.updateData()
  }
  
  updateData(data) {
    this.rawData = data

    this.dt = this.findKey("dt") | 1000

    this.accX = this.accConversion("accX")
    this.accY = this.accConversion("accY")
    this.accZ = this.accConversion("accZ")

    this.gyrX = this.gyrConversion("gyrX")
    this.gyrY = this.gyrConversion("gyrY")
    this.gyrZ = this.gyrConversion("gyrZ")
    
    this.calculAngles()
  }
  
  accConversion(acc) {
    return this.findKey(acc)/16824
  }
   
  gyrConversion(gyr) {
    return this.findKey(gyr)/131
  }
  
  calculAngles() {
    const alpha = 0.94


    this.angleX = (1 - alpha) * (this.angleX|0 + this.gyrX * this.dt) + alpha * this.calculAngleAcceleration(this.accX)
    this.angleY = (1 - alpha) * (this.angleY|0 + this.gyrY * this.dt) + alpha * this.calculAngleAcceleration(this.accY)
    this.angleZ = (1 - alpha) * (this.angleZ|0 + this.gyrX * this.dt) + alpha * this.calculAngleAcceleration(this.accZ)
  }

  calculAngleAcceleration(accReference) {
    let g = 9.80665

    let accelX          = g * this.accX;
    let accelY          = g * this.accY;
    let accelZ          = g * this.accZ;
    let axeReference    = g * accReference;
    
    const accelMagnitude = Math.sqrt(accelX * accelX + accelY * accelY + accelZ * accelZ)
    
    return Math.asin(axeReference/accelMagnitude)
  }
  
  findKey(key) {
    var obj = this.rawData
    // Vérifie si l'objet est valide
    if (typeof obj !== 'object' || obj === null) {
      return undefined;
    }
  
    // Parcours chaque clé de l'objet
    for (let k in obj) {
      if (k === key) {
        // Si la clé est trouvée, retourne la valeur associée
        return obj[k];
      }
  
      // Si la valeur est un objet, on recherche récursivement
      if (typeof obj[k] === 'object' && obj[k] !== null) {
        const result = findKey(obj[k], key);
        if (result !== undefined) {
          return result;
        }
      }
    }
  
    // Retourne undefined si la clé n'est pas trouvée
    return undefined;
  }
}

class managerED {
  constructor() {

    this.devices = {}
  }
  
  update (topic, data) {
    
    
    // trouves le nom du ED à travers le topic MQTT
    var matchTopic = topic.match(/(?:device|iotize)\/([A-Za-z0-9]{10,})/)
    matchTopic = matchTopic[1] ? matchTopic[1] : topic
   
    // ordre préférentiel : data.deviceName > matchTopic[1] > topic
    var deviceName = data.deviceName ? data.deviceName : undefined
    deviceName = deviceName ? deviceName : matchTopic
    
    if (this.devices[deviceName]) {

      this.devices[deviceName].updateData(data)
    }
    
    else {

      this.devices[deviceName] = new endDevice(topic, deviceName, data)
    }
  }
}