import { defineStore } from "pinia";
import { managerED } from "../js/endDeviceClass";

export const generalStore = defineStore('generalStore', {
    state: () => ({

      isFullscreen: false,
      timerPosition: 10,
      
      endDevices: new managerED,
      
      statutMQTT: "",
      hostMQTT: "",
      
      dialogBrokerMQTT: {
        visible: false,
        step: 1
      },
    }),
  })