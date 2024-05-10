import { defineStore } from 'pinia';

interface UserPayloadInterface {
  username: string;
  password: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    loading: false,
    users: [] as any[]
  }),
  actions: {
    async authenticateUser({ username, password }: UserPayloadInterface) {
      // useFetch from nuxt 3
      const { data, pending }: any = await useFetch('https://dummyjson.com/auth/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          username,
          password,
        },
      });
      this.loading = pending;

      if (data.value) {
        const token = useCookie('token'); // useCookie new hook in nuxt 3
        token.value = data?.value?.token; // set token to cookie
        this.authenticated = true; // set authenticated  state value to true
      } else {
        // Verifica se è utenza inserita a mano
        const users = JSON.parse(localStorage.getItem('users') || '{}');
        const isInserted = users?.some((prod: any) => { 
          return prod.username === username && prod.password === password 
        });
        if(isInserted) {
          const token = useCookie('token'); // useCookie new hook in nuxt 3
          token.value = "token"; // set token to cookie
        }
        this.authenticated = isInserted;
      }
    },
    logUserOut() {
      const token = useCookie('token'); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
    },
    async fetchUserList() {
      await fetch('https://dummyjson.com/users')
        .then(res => res.json())
        .then((res: any) => {
          this.setUserList(res.users);
        });
    },
    setUserList(list: any[]) {
      this.users = list;
    },
    addUser(newUser: any) {
      this.users.push(newUser);
    },
  },
});