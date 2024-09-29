
class endDevice {

  constructor (topic, deviceName, data) {

    this.selected = false
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

    this.dt = this.findKey("dt") | 100

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
  
  get time() {

    return Math.floor((Date.now() - this.lastTime)/1000)
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

    this.list = {}
    this.listSelected = []
  }
  
  update (topic, data) {
    
    // trouves le nom du ED à travers le topic MQTT
    var matchTopic = topic.match(/(?:device|iotize)\/([A-Za-z0-9]{10,})/)
    matchTopic = matchTopic[1] ? matchTopic[1] : topic
   
    // ordre préférentiel : data.deviceName > matchTopic[1] > topic
    var deviceName = data.deviceName ? data.deviceName : undefined
    deviceName = deviceName ? deviceName : matchTopic
    
    if (this.list[deviceName]) {

      this.list[deviceName].updateData(data)
    }
    
    else {

      this.list[deviceName] = new endDevice(topic, deviceName, data)
    }
  }
  
  reset () {

    this.list = {}
    this.removeSelected()
  }
  
  select(device) {
    
    if (this.listSelected.includes(device.deviceName)) {

      this.listSelected.splice(this.listSelected.indexOf(device.deviceName), 1)
      this.list[device.deviceName].selected = false
    }
    
    else {

      this.list[device.deviceName].selected = true
      this.listSelected.push(device.deviceName)
    }
    
    console.log(this.listSelected)
  }
  
  get selectedDevices() {
    
    return Object.values(this.list).filter(device => device.selected);
  }

  removeFirstSelected () {

    this.list[this.listSelected.shift()].selected = false
  }
  
  removeSelected() {

    this.selectedDevices.forEach(device => {
      
      this.list[device.deviceName].selected = false
    })
    
    this.listSelected = []
  }
}