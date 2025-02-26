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
          type="password"
          v-model.trim="password"
          aria-labelledby="password-header"
          class="password-input"
          :class="{ 'invalid-input': !isPasswordValid }"
          maxlength="100"
          placeholder="Введите пароль"
          :required="recordType === 'Локальная'"
          @blur="accountValidation"
        />
        <v-icon :icon='mdiTrashCanOutline' @click="() => accountsStore.deleteAccountById(id)"/>
    </div>
</template>

<script setup lang="ts">
/* global defineProps, defineEmits, PropType */
import { mdiTrashCanOutline } from '@mdi/js';
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
  }
}

</script>

<style scoped>
.input-line {
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  height: 40px;
  gap: 20px;
  margin: 20px 0;
  align-items: center;
}
input, select {
  border-radius: 10px;
  border: 1px solid #d3e3fd;
  height: 100%;
  width: 25%;
  appearance: auto;
  padding: 0 10px;
}
.stretch {
  width: 50%;
}
.invalid-input {
  border: 2px solid rgb(229, 81, 81);
}
</style>