import { defineStore } from "pinia";

const generalStore = defineStore('generalStore', {
    state: () => ({
      
      messageMQTT: null,
      
      dialogBrokerMQTT: {
        visible: true,
        step: 1
      },
    }),
  })

export default generalStore