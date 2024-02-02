<script setup>
import Editor from 'primevue/editor';
import { ref } from 'vue';
import Swal from 'sweetalert2'
import { useMailStore } from '../stores/mail'

let content_text = ref('')
let mail_to = ref('')
let subject_to = ref('')
const mailStore = useMailStore()

const send = async () => {
  let formData = {
    to : mail_to.value,
    subject : subject_to.value,
    content : content_text.value
  }
  await mailStore.sent_mail(formData)
  if(mailStore.textBox.accepted){
      Swal.fire({
      title: 'ส่งเมลสำเร็จ',
      text: mailStore.textBox.accepted[0],
      icon: 'success',
      confirmButtonText: 'ปิด'
    })
    mail_to.value = ''
    subject_to.value = ''
    content_text.value = ''
  }else{
    Swal.fire({
      title: 'ส่งเมลล้มเหลว',
      icon: 'error',
      confirmButtonText: 'ปิด'
    })
    mail_to.value = ''
    subject_to.value = ''
    content_text.value = ''
  }
}
</script>

<template>
  <div class="container w-96 h-96 mx-auto md:w-1/2 lg:w-full">
      <div class="flex justify-center">
        <div class="w-1/2 box border-gray-500 border border-opacity-30 shadow-xl bg-white">
          <div class="flex">
            <div class="flex-1 mx-4 mt-4 text-xl text-slate-700">New Email</div>
          </div>
          <div class="mt-4 mx-4">
            <span class="text-slate-700">To:</span>
            <input type="email" v-model="mail_to" class="input bg-white input-to w-3/4 mx-3 text-slate-700" required>
            <hr>
            <span class="text-slate-700">Subject:</span>
            <input type="text" v-model="subject_to" class="input bg-white input-to w-3/4 mx-3 text-slate-700" required>
            <hr>
          </div>
          <Editor v-model="content_text" class="h-72 p-4"/>
          <div class="mt-6 p-4">
            <button class="btn btn-secondary w-full" @click="send">Send Email</button>
          </div>
        </div>
      </div>
  </div>
</template>

<style scoped>
.input-to {
  border-width : 0px;
}

.input:focus-visible{
  outline : none;
}

.box {
  height: 35rem;
}
</style>