class endDevice {

  constructor (topic, deviceName, data) {

    this.topic = topic
    this.deviceName = deviceName

    this.g = 9.80665
    this.alpha = 0.94

    
    this.angleX = 0
    this.angleY = 0
    this.angleZ = 0
    
    this.updateData(data)
  }
  
  updateData(data) {
    this.rawData = data
    this.lastTime = Date.now()

    this.dt = this.findKey("dt")

    this.accX = this.findKey("accX")
    this.accY = this.findKey("accY")
    this.accZ = this.findKey("accZ")

    this.gyrX = this.findKey("gyrX")
    this.gyrY = this.findKey("gyrY")
    this.gyrZ = this.findKey("gyrZ")
    
    this.calculAngles()
  }
  
  calculAngles() {

    this.angleX = (1 - this.alpha) * (this.angleX + this.gyrX * this.dt) + this.alpha * this.calculAngleAcceleration(this.accX)
    this.angleY = (1 - this.alpha) * (this.angleY + this.gyrY * this.dt) + this.alpha * this.calculAngleAcceleration(this.accY)
    this.angleZ = (1 - this.alpha) * (this.angleZ + this.gyrX * this.dt) + this.alpha * this.calculAngleAcceleration(this.accZ)
  }

  calculAngleAcceleration(accReference) {
    let accelX          = this.g * this.accX;
    let accelY          = this.g * this.accY;
    let accelZ          = this.g * this.accZ;
    let axeReference    = this.g * accReference;
    
    const accelMagnitude = Math.sqrt(accelX * accelX + accelY * accelY + accelZ * accelZ)
    
    return Math.asin(axeReference/accelMagnitude)
  }
  
  time() {

    return Date.now() - this.lastTime
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

export class managerED {
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