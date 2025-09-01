import { defineStore } from "pinia";
import { managerED } from "../js/endDeviceClass";

export const generalStore = defineStore('generalStore', {
    state: () => ({

      isFullscreen: false,
      timerPosition: 10,
      declenchementPosAssise: false,
      
      endDevices: new managerED,
      pourcentageBatterie : -1,
      
      statutMQTT: "",
      hostMQTT: "",
      
      dialogBrokerMQTT: {
        visible: false,
        step: 1
      },
    }),
  })