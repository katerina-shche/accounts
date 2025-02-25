<template>
    <div>
        <input
          type="text"
          v-model="marks"
          aria-labelledby="marks-header"
        />
        <input
          type="text"
          v-model="recordType"
          aria-labelledby="type-header"
        />
        <input
          type="text"
          v-model="login"
          aria-labelledby="login-header"
        />
        <input
          type="password"
          v-model="password"
          aria-labelledby="password-header"
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
const marks = ref(props.account.marks);
const recordType = ref(props.account.recordType);
const login = ref(props.account.login);
const password = ref(props.account.password);
const id = ref(props.account.id)

const accountsStore = useAccountsStore()

</script>

<style scoped>

</style>