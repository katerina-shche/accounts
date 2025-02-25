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
        <v-icon :icon='mdiTrashCanOutline'/>
    </div>
</template>

<script setup lang="ts">
/* global defineProps, defineEmits */
import { mdiTrashCanOutline } from '@mdi/js';
import { ref } from 'vue';
import Account from '@/types/Account';

const props = defineProps<Account>()
const marks = ref(props.marks);
const recordType = ref(props.recordType);
const login = ref(props.login);
const password = ref(props.password);

</script>

<style scoped>

</style>