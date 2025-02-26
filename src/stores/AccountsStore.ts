import { defineStore } from 'pinia';
import Account from '@/types/Account';
import AccountsState from '@/types/AccountsState';
import { nanoid } from 'nanoid';

export const useAccountsStore = defineStore('AccountsStore', {
  state: (): AccountsState => ({
    accounts: [] as Account[],
  }),
  actions: {
    addEmptyAccount(): void {
      this.accounts.push({
        marks: [],
        recordType: 'Локальная',
        login: '',
        password: '',
        id: nanoid(),
      });
    },
    deleteAccountById(id: string): void {
      this.accounts = this.accounts.filter((acc) => acc.id !== id);
    },
    updateAccountById(id: string, updatedData: Partial<Account>) {
      const account = this.accounts.find(acc => acc.id === id)
      if (account) {
        Object.assign(account, updatedData)
      }
    },
  },
  persist: true, // localStorage
});
