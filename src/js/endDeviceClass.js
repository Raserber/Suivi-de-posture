
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
    this.vecteurGX = 0
    this.vecteurGY = 0
    this.vecteurGZ = 0
    this.conversionAcc = 0
    this.conversionGyr = 0
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
    
    this.conversionAcc = this.findKey("conversionAcc", data)
    this.conversionGyr = this.findKey("conversionGyr", data)
    
    this.accX = this.conversionAcc ? this.accX/this.conversionAcc : this.accX
    this.accY = this.conversionAcc ? this.accY/this.conversionAcc : this.accY
    this.accZ = this.conversionAcc ? this.accZ/this.conversionAcc : this.accZ

    this.gyrX = this.conversionGyr ? this.gyrX/this.conversionGyr : this.gyrX
    this.gyrY = this.conversionGyr ? this.gyrY/this.conversionGyr : this.gyrY
    this.gyrZ = this.conversionGyr ? this.gyrZ/this.conversionGyr : this.gyrZ

    this.calculAngles()
  }
  
  calculAngles() {

    // Vecteurs composantes du vecteur accélération terrestre
    this.vecteurGX = (1 - this.alpha) * (this.vecteurGX + this.gyrX * this.dt/1000) + this.alpha * this.accX
    this.vecteurGY = (1 - this.alpha) * (this.vecteurGY + this.gyrY * this.dt/1000) + this.alpha * this.accY
    this.vecteurGZ = (1 - this.alpha) * (this.vecteurGZ + this.gyrZ * this.dt/1000) + this.alpha * this.accZ

    // je ne sais pas pourquoi ça fonctionne mais ça fonctionne 🧟
    this.angleX = this.rebaseAngle(Math.atan2(-this.pythagore(this.vecteurGZ), this.pythagore(this.vecteurGY)) * 180/Math.PI - 90)
    this.angleY = this.rebaseAngle(Math.atan2(this.pythagore(this.vecteurGX), -this.pythagore(this.vecteurGZ)) * 180/Math.PI - 90)
    this.angleZ = this.rebaseAngle(Math.atan2(this.pythagore(this.vecteurGX), this.pythagore(this.vecteurGY)) * 180/Math.PI - 90)
    
  }

  pythagore(accReference) {
    let accelX = this.g * this.vecteurGX;
    let accelY = this.g * this.vecteurGY;
    let accelZ = this.g * this.vecteurGZ;
    const axeReference = this.g * accReference;
    
    const accelMagnitude = Math.sqrt(accelX * accelX + accelY * accelY + accelZ * accelZ)
    
    return Math.asin(axeReference/accelMagnitude)
  }

  rebaseAngle(angle) {

    return Math.abs(angle) >= 180 ? (Math.sign(angle) == 1 ? angle - 360 : angle + 360) : angle
  }
  
  get time() {

    return Math.floor((Date.now() - this.lastTime)/1000)
  }
  
  get isValid() {
    return (
      this.accX != undefined && this.accY != undefined && this.accZ != undefined &&
      this.gyrX != undefined && this.gyrY != undefined && this.gyrZ != undefined
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

  searchPosition(position) {

    return this.selectedDevices.find(device => ( device.position != null && device.position != [] ? device.position.includes(position) : false))
  }
  
  get torse () {

    return this.searchPosition("torse")
  }
  
  get cuisses () {
    
    return this.searchPosition("cuisses")
  }
  
  get jambes () {

    return this.searchPosition("jambes")
  }

  get cuisseGauche () {

    return this.searchPosition("cuisseGauche")
  }

  get cuisseDroite () {

    return this.searchPosition("cuisseDroite")
  }
  
  get jambeGauche () {

    return this.searchPosition("jambeGauche")
  }

  get jambeDroite () {

    return this.searchPosition("jambeDroite")
  }

  get corps () {

    return this.searchPosition("corps")
  }
  
  get angleTorse () {

    if (this.torse) {
      return this.torse[this.torse.angleWatch]
    }
    return 0
  }

  get angleCuisses () {

    if (this.cuisses) {
      return this.cuisses[this.cuisses.angleWatch]
    }
    return 0
  }

  get angleJambes () {

    if (this.jambes) {
      return this.jambes[this.jambes.angleWatch]
    }
    return 0
  }

  get angleCuisseGauche () {

    if (this.cuisseGauche) {
      return this.cuisseGauche[this.cuisseGauche.angleWatch]
    }
    return this.angleCuisses
  }

  get angleCuisseDroite () {

    if (this.cuisseDroite) {
      return this.cuisseDroite[this.cuisseDroite.angleWatch]
    }
    return this.angleCuisses
  }

  get angleJambeDroite () {

    if (this.jambeDroite) {
      return this.jambeDroite[this.jambeDroite.angleWatch]
    }
    return this.angleJambes
  }

  get angleJambeGauche () {

    if (this.jambeGauche) {
      return this.jambeGauche[this.jambeGauche.angleWatch]
    }
    return this.angleJambes
  }
  
  removePositions() {

    this.list.forEach(device => {
      
      device.position = null
    })
  }
}