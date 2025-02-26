<template>
    <div class="input-line">
        <input
          type="text"
          v-model.trim="marksAsText"
          aria-labelledby="marks-header"
          class="marks-input"
          maxlength="50"
          placeholder="Введите метки через ;"
          @blur="accountValidation"
        />
        <select
          id="mySelect"
          v-model="recordType"
          aria-labelledby="type-header"
          class="record-type-input"
          @change="accountValidation">
            <option value="Локальная">Локальная</option>
            <option value="LDAP">LDAP</option>
        </select>
        <input
          type="text"
          v-model.trim="login"
          aria-labelledby="login-header"
          class="login-input"
          :class="{ 'stretch': recordType === 'LDAP', 'invalid-input': !isLoginValid}"
          maxlength="100"
          placeholder="Введите логин"
          required
          @blur="accountValidation"
        />
        <input v-if="recordType === 'Локальная'"
          :type="showPassword ? 'text' : 'password'"
          v-model.trim="password"
          aria-labelledby="password-header"
          class="password-input"
          :class="{ 'invalid-input': !isPasswordValid }"
          maxlength="100"
          placeholder="Введите пароль"
          :required="recordType === 'Локальная'"
          @blur="accountValidation"
        />
        <button v-if="recordType === 'Локальная'" @click="togglePasswordVisibility" type="button" class="toggle-btn">
          <v-icon :icon="showPassword ? mdiEye : mdiEyeOff"/>
        </button>
        <button @click="() => accountsStore.deleteAccountById(id)" type="button" class="delete-btn">
          <v-icon :icon='mdiTrashCanOutline' />
        </button>
    </div>
</template>

<script setup lang="ts">
/* global defineProps, defineEmits, PropType */
import { mdiTrashCanOutline, mdiEyeOff, mdiEye } from '@mdi/js';
import { ref, PropType } from 'vue';
import { useAccountsStore } from '@/stores/accountsStore'
import Account from '@/types/Account';

const props = defineProps({
  account: {
    type: Object as PropType<Account>,
    required: true
  }
});
const marksAsText = ref(props.account.marks.map(item => item.text).join('; '));
const recordType = ref(props.account.recordType);
const login = ref(props.account.login);
const password = ref(props.account.password);
const id = ref(props.account.id);
const isLoginValid = ref(true);
const isPasswordValid = ref(true);
const showPassword = ref(false)
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

const accountsStore = useAccountsStore()

const accountValidation = () => {
  if (recordType.value === 'LDAP') {
    password.value = null;
    isPasswordValid.value = true;
  }

  if (login.value === '' || login.value.length > 100) {
    isLoginValid.value = false;
  } else {
    isLoginValid.value = true;
  }

  if ((recordType.value === 'Локальная' && !password.value) || (password.value && password.value.length > 100)) {
    isPasswordValid.value = false;
  } else {
    isPasswordValid.value = true;
  }

  if (isLoginValid.value && isPasswordValid.value) {
    accountsStore.updateAccountById(id.value, {
      marks: marksAsText.value.split(";").map(item => ({ text: item.trim() })),
      recordType: recordType.value,
      login: login.value,
      password: password.value
    })

    console.log(accountsStore.accounts)
  }
}

</script>

<style scoped>
.input-line {
  position: relative;
  display: grid;
  width: 100%;
  height: 40px;
  gap: 20px;
  margin: 20px 0; 
  grid-template-columns: 1fr 1fr 1fr 1fr 36px;
  align-items: stretch;
  justify-items: stretch;
}
input, select {
  border-radius: 10px;
  border: 1px solid #d3e3fd;
  height: 40px;
  appearance: auto;
  padding: 0 10px;
}
.marks-input {
  grid-column-start: 1;
  grid-column-end: 1;
  width: 100%;
}
.record-type-input {
  grid-column-start: 2;
  grid-column-end: 2;
  width: 100%;
}
.login-input {
  grid-column-start: 3;
  grid-column-end: 3;
  width: 100%;
}
.password-input {
  grid-column-start: 4;
  grid-column-end: 4;
  width: 100%;
}

input.login-input.stretch {
  display: inline-block;
  grid-column-start: 3;
  grid-column-end: 5;
  width: 100%;
} 

.delete-btn {
  grid-column-start: 5;
  grid-column-end: 5;
  width: 16px;
  justify-self: start;
  transform: translateX(-4px);
}

.toggle-btn {
  position: absolute;
  right: 65px;
  top: 8px;
}

.invalid-input {
  border: 2px solid rgb(229, 81, 81);
}
.v-icon {
  color: #545a60;
  z-index: 1;
} 
</style>