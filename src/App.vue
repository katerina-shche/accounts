<template>
  <div class='header'>
    <h1>Учетные записи</h1>
    <button id='plusButton' @click="addInputLine()">
      <v-icon :icon='mdiPlus' id='mdiPlus'/>
    </button>
    <button id='resetButton' @click="() => accountsStore.$reset()">
      <v-icon :icon='mdiTrashCanOutline' id='mdiTrashCanOutline'/>
    </button>
    <div class='header_info'><v-icon :icon='mdiHelpCircleOutline' id='mdiHelpCircleOutline'/><span>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ; </span></div>
  </div>
  <div class="form-container">
    <!-- Header Row -->
    <div class="form-header">
      <span id="marks-header">Метки</span>
      <span id="type-header">Тип записи</span>
      <span id="login-header">Логин</span>
      <span id="password-header">Пароль</span>
    </div>

    <!-- Dynamic Rows -->
    <div class="form-rows" v-if="accountsStore.accounts.length">
      <inputLine 
        v-for="(account) in accountsStore.accounts"
        :key="account.id" :account="account"
      />
        
      </div>
  </div> 
  
</template>

<script setup lang="ts">
import { useAccountsStore } from '@/stores/accountsStore'
import { mdiPlus, mdiHelpCircleOutline, mdiTrashCanOutline } from '@mdi/js';
import inputLine from '@/components/inputLine.vue'

const accountsStore = useAccountsStore()

const addInputLine = () => {
  //здесь буду добавлять новую линию
  console.log('жму на плюсик')
  accountsStore.addEmptyAccount()
  console.log(accountsStore.accounts)
}
</script>

<style>
#app {
 width: 100vw;
 height: 100vh;
 padding: 50px;
}
.header {
  width: 100%;
  display: flex;
  flex-flow: row wrap;
  color:#202325;
}
.header_info {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-top: 20px;
  background-color: #d3e3fd;
  border-radius: 10px;
}
.header_info span {
  color: #202325;
}
#plusButton, #resetButton {
  width: 50px;
  height: 50px;
  margin-left: 20px;
  border-radius: 10px;
  border: 1px solid #d3e3fd;
}
.v-icon {
  color: #545a60;
} 
#mdiHelpCircleOutline {
  margin: 0 10px;
}
.form-header {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: 40px;
  margin: 20px 0;
  align-items: center;
}
.form-header span {
  height: 100%;
  width: 25%;
}

</style>
