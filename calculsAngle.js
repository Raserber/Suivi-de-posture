angles = {
  angleX : 0,
  angleY : 0,
  angleZ : 0
}

function calculAngleAcceleration(data, axeReference) {
    g = 9.80665

    let accelX = g * data.accX;
    let accelY = g * data.accY;
    let accelZ = g * data.accZ;
    axeReference *= g;
    
    const accelMagnitude = Math.sqrt(accelX * accelX + accelY * accelY + accelZ * accelZ)
    
    return Math.asin(axeReference/accelMagnitude)
}
module.exports = {

    calculAnglesFiltered(data) {
        const driftAxeX = 16.25, driftAxeY = 18, driftAxeZ = 19.75
        
        angles.angleX = (1 - data.alpha) * (angles.angleX + (data.gyrX - driftAxeX) * data.dt) + data.alpha * calculAngleAcceleration(data, data.accX)
        angles.angleY = (1 - data.alpha) * (angles.angleY + (data.gyrY - driftAxeY) * data.dt) + data.alpha * calculAngleAcceleration(data, data.accY)
        angles.angleZ = (1 - data.alpha) * (angles.angleZ + (data.gyrX - driftAxeZ) * data.dt) + data.alpha * calculAngleAcceleration(data, data.accZ)
        
        return angles
    }
}