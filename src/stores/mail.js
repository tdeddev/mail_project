import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useMailStore = defineStore('main', {
  state : () => ({
    textBox : {}
  }),
  actions: {
    async sent_mail(fromData){
      try {
        let response = await axios.post('http://localhost:3000/send_mail', fromData)
        if(response){
          this.textBox = response.data
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
})

