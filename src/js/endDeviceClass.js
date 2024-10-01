
class endDevice {

  constructor (topic, deviceName, data) {
    
    this.selected = false
    this.topic = topic
    this.deviceName = deviceName
    this.position = null
    this.angleWatch = null
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

    this.accX = this.findKey("accX", data)
    this.accY = this.findKey("accY", data)
    this.accZ = this.findKey("accZ", data)
    
    this.gyrX = this.findKey("gyrX", data)*(Math.PI/180)
    this.gyrY = this.findKey("gyrY", data)*(Math.PI/180)
    this.gyrZ = this.findKey("gyrZ", data)*(Math.PI/180)
    
    this.calculAngles()
  }
  
  calculAngles() {

    this.angleX = (1 - this.alpha) * (this.angleX|0 + this.gyrX * this.dt/1000) + this.alpha * this.calculAngleAcceleration("accX")
    this.angleY = (1 - this.alpha) * (this.angleY|0 + this.gyrY * this.dt/1000) + this.alpha * this.calculAngleAcceleration("accY")
    this.angleZ = (1 - this.alpha) * (this.angleZ|0 + this.gyrX * this.dt/1000) + this.alpha * this.calculAngleAcceleration("accZ")
  }

  calculAngleAcceleration(accReference) {
    let accelX          = this.g * this.accX;
    let accelY          = this.g * this.accY;
    let accelZ          = this.g * this.accZ;
    
    if (accReference == "accX") {
      return Math.atan2(accelX, accelZ);  // Utilisation de atan2
    }

    else if (accReference == "accY") {
      return Math.atan2(accelY, accelZ);  // Par exemple si tu veux calculer l'angle autour de Y
    }

    else {
      return Math.atan2(accelZ, accelX);  // Cas générique
    }
  }
  
  get time() {

    return Math.floor((Date.now() - this.lastTime)/1000)
  }
  
  get isValid() {
    return (
      this.accX && this.accY && this.accZ &&
      this.gyrX && this.gyrY && this.gyrZ
    )
  }
  
  get isValidOptional() {
    return (
      this.findKey("deviceName", this.rawData) &&
      this.findKey("dt", this.rawData)
    )
  }
  
  findKey(key, obj) {
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
        const result = this.findKey(key, obj[k]);
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
    this.selectedTopics = []
  }
  
  update (topic, data) {
    
    // trouves le nom du ED à travers le topic MQTT
    var matchTopic = topic.match(/(?:device|iotize)\/([A-Za-z0-9]{10,})/)
    try {
      
      matchTopic = matchTopic[1]
    }
    catch (e) {

      matchTopic = topic
    }
   
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
      this.selectedTopics.splice(this.selectedDevices.indexOf(device.topic), 1)
      this.list[device.deviceName].selected = false
    }
    
    else {

      this.list[device.deviceName].selected = true
      this.listSelected.push(device.deviceName)
      this.selectedTopics.push(device.topic)
    }
  }
  
  get selectedDevices() {
    
    return Object.values(this.list).filter(device => device.selected);
  }
  
  removeFirstSelected () {

    this.list[this.listSelected.shift()].selected = false
  }
  
  removeSelected() {

    this.selectedDevices.forEach(device => {
      
      device.selected = false
    })
    
    this.listSelected = []
  }
  
  get torse () {

    return this.selectedDevices.find(device => ( device.position != null && device.position != [] ? device.position.includes("torse") : false))
  }
  
  get cuisses () {

    return this.selectedDevices.find(device => (device.position != null  && device.position != [] ? device.position.includes("cuisses") : false))
  }
  
  get jambes () {

    return this.selectedDevices.find(device => (device.position != null && device.position != [] ? device.position.includes("jambes") : false))
  }

  get corps () {

    return this.selectedDevices.find(device => (device.position != null && device.position != [] ? device.position.includes("corps") : false))
  }
  
  get angleTorse () {

    if (this.torse) {
      return this.torse[this.torse.angleWatch]*(180/Math.PI)
    }
    return undefined
  }

  get angleCuisses () {

    if (this.cuisses) {
      return this.cuisses[this.cuisses.angleWatch]*(180/Math.PI)
    }
    return undefined
  }

  get angleJambes () {

    if (this.jambes) {
      return this.jambes[this.jambes.angleWatch]*(180/Math.PI)
    }
    return undefined
  }
  
  removePositions() {

    this.list.forEach(device => {
      
      device.position = null
    })
  }
}