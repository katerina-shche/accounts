<template>
    <div class="accounts-form">
        <div class='title'>
            <h1>Учетные записи</h1>
            <button id='plus-btn' @click="addInputLine()">
                <v-icon :icon='mdiPlus' id='mdiPlus'/>
            </button>
        </div>
    
        <div class='hint'><v-icon :icon='mdiHelpCircleOutline' id='mdiHelpCircleOutline'/><span>Для указания нескольких меток для одной пары логин/пароль используйте разделитель ; </span></div>
      
        <div class="form-container">
            <div class="form-header">
                <label id="marks-header">Метки</label>
                <label id="type-header">Тип записи</label>
                <label id="login-header">Логин</label>
                <label id="password-header">Пароль</label>
            </div>
    
            <div class="form-rows" v-if="accountsStore.accounts.length">
                <InputLine 
                    v-for="(account) in accountsStore.accounts"
                    :key="account.id" :account="account"
                />
            </div>
        </div> 
    </div>  
</template>
    
<script setup lang="ts">

import { useAccountsStore } from '@/stores/AccountsStore'
import { mdiPlus, mdiHelpCircleOutline } from '@mdi/js';
import InputLine from '@/components/InputLine.vue'
    
const accountsStore = useAccountsStore()
    
const addInputLine = () => {
    accountsStore.addEmptyAccount()
}

</script>
    
<style>
.accounts-form {
    width: 100vw;
    min-height: 100vh;
    padding: 50px;
}
.title {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    color:#202325;
}
.hint {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    width: 100%;
    min-height: 40px;
    max-height: fit-content;
    margin-top: 20px;
    background-color: #d3e3fd;
    border-radius: 10px;
}
.hint span {
    color: #202325;
}
#plus-btn, #reset-btn {
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
    position: relative;
    display: grid;
    width: 100%;
    min-height: 20px;
    max-height: fit-content;
    gap: 20px;
    margin: 20px 0; 
    grid-template-columns: 1fr 1fr 1fr 1fr 36px;
}
.form-header label {
    height: 100%;
    width: 100%;
    color: #525972;
}
#marks-header {
    grid-column-start: 1;
    grid-column-end: 1;
}
#type-header {
    grid-column-start: 2;
    grid-column-end: 2;
}
#login-header {
    grid-column-start: 3;
    grid-column-end: 3;
}
#password-header {
    grid-column-start: 4;
    grid-column-end: 4;

}
</style>
    