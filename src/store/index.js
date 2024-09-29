import { defineStore } from "pinia";
import { managerED } from "../js/endDeviceClass";

export const generalStore = defineStore('generalStore', {
    state: () => ({
      
      messageMQTT: null,
      
      endDevices: new managerED,
      
      statutMQTT: "",
      serveurMQTT: "",
      
      dialogBrokerMQTT: {
        visible: true,
        step: 2
      },
    }),
  })