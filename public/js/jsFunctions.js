function searchAndReturnEndDevice(receiveArray, deviceNumber) {

    receiveArray = JSON.parse(receiveArray.data)

    for (let i=0; i < receiveArray.length; i++) {
       if (receiveArray[i].devEUI === "f1f2f3430100000" + deviceNumber) {

         var angleX = Math.atan2(-receiveArray[i].data.angleZ, receiveArray[i].data.angleY)
         angleX = angleX < 0 ? 2*Math.PI + angleX : angleX         
         angleX = angleX * 180/Math.PI - 90

         var angleY = Math.atan2(receiveArray[i].data.angleX, -receiveArray[i].data.angleZ)
         angleY = angleY < 0 ? 2*Math.PI + angleY : angleY         
         angleY = angleY * 180/Math.PI - 90

         var angleZ = Math.atan2(receiveArray[i].data.angleX, receiveArray[i].data.angleY)
         angleZ = angleZ < 0 ? 2*Math.PI + angleZ : angleZ         
         angleZ = angleZ * 180/Math.PI - 90

         return {
            angleX : angleX,
            angleY : angleY,
            angleZ : angleZ
         };
       }
   }

   return 0
 }

 function posture(CORPS, JAMBE, GENOU) {

   const PIED = -(CORPS - JAMBE + GENOU)

   return {"version":7,"data":[[0,3.8,0],[CORPS,-90,0],[0,0,-2],[0,0,5],[6,0,JAMBE],[GENOU],[-6,-6,PIED],[-6,0,JAMBE],[GENOU],[6,6,PIED],[7,-0.6,-5],[15],[5,0,0],[-90,70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[-7,0.6,-5],[15],[-5,0,0],[90,-70,75,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10],[0,0,10,0,10,0,10]]}
           
 }