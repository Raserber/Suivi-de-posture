import { defineStore } from "pinia";

export const generalStore = defineStore('generalStore', {
    state: () => ({
      
      messageMQTT: null,
      
      statutMQTT: "",
      
      dialogBrokerMQTT: {
        visible: true,
        step: 1
      },
    }),
  })