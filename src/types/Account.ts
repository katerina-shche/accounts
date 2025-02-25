import Mark from '@/types/Mark'

export default interface Account {
    marks: Mark[],
    recordType: 'Локальная' | 'LDAP',
    login: string,
    password: string | null,
    id: string,
  }