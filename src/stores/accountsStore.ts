import { defineStore } from 'pinia';
import Account from '@/types/Account';
import AccountsState from '@/types/AccountsState';
import { nanoid } from 'nanoid';

// interface Mark {
//   text: string,
// }

// interface Account {
//   marks: Mark[],
//   recordType: 'Локальная' | 'LDAP',
//   login: string,
//   password: string | null,
//   id: string,
// }
// interface AccountsState {
//   accounts: Account[];
// }

export const useAccountsStore = defineStore('accountsStore', {
  state: (): AccountsState => ({
    accounts: [] as Account[],
  }),
  getters: {
    // просто для теста: беру аккаунт по индексу
    getAccountByIndex: (state) => (index: number): Account => {
      return state.accounts[index];
    },
  },
  actions: {
    // добавляю новый пустой аккаунт
    addEmptyAccount(): void {
      this.accounts.push({
        marks: [],
        recordType: 'Локальная',
        login: '',
        password: '',
        id: nanoid(),
      });
    },
    // удаляю аккаунт по логину
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
