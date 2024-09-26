import { defineStore } from "pinia";

export const generalStore = defineStore('generalStore', {
    state: () => ({
      dialogBrokerMQTT: true,
      step: 1
    }),
  })