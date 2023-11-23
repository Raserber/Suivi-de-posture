function searchAndReturnEndDevice(receiveArray, deviceNumber) {

    receiveArray = JSON.parse(receiveArray.data)

    for (let i=0; i < receiveArray.length; i++) {
       if (receiveArray[i].devEUI === "f1f2f3430100000" + deviceNumber) {

          receiveArray[i].data.angleX *= 180/Math.PI
          receiveArray[i].data.angleY *= 180/Math.PI
          receiveArray[i].data.angleZ *= 180/Math.PI

           return receiveArray[i].data;
       }
   }

   return {
      angleX : 0,
      angleY : 0,
      angleZ : 0
   }
 }

 function posture(CORPS, JAMBE, GENOU) {

    return {"version":7,"data":[[0,3.8,0],[CORPS,-90,0],[0,0,-2],[0,0,5],[6,0,JAMBE],[GENOU],[-6,-6,-0.6],[-6,0,JAMBE],[GENOU],[6,6,-0.6],[7,-0.6,-5],[15],[5,0,0],[-90,70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[-7,0.6,-5],[15],[-5,0,0],[90,-70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10]]}
           
 }