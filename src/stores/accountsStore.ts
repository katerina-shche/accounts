import { defineStore } from 'pinia';
import Account from '@/types/Account';
import AccountsState from '@/types/AccountsState';

// interface Mark {
//   text: string,
// }

// interface Account {
//   marks: Mark[],
//   recordType: 'Локальная' | 'LDAP',
//   login: string,
//   password: string | null
// }
// interface AccountsState {
//   accounts: Account[];
// }

export const useAccountsStore = defineStore('accountsStore', {
  state: (): AccountsState => ({
    accounts: [],
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
        password: ''
      });
    },
    // удаляю аккаунт по логину
    deleteAccountByLogin(login: string): void {
      this.accounts = this.accounts.filter((acc) => acc.login !== login);
    },
    updateAccount(index: number, updates: Account): void {
      this.accounts[index] = updates;
    }
  },
  persist: true, // localStorage
});
