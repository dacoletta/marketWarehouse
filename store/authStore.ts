import { defineStore } from 'pinia';
import { useProfileStore } from './profileStore';

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
      const profileStore = useProfileStore();
      
      if (data.value) {
        const token = useCookie('token');
        token.value = data.value.token;
        this.authenticated = true;
        profileStore.setProfile(data?.value);
      } else {
        const users = parseJson(localStorage.getItem('users'));
        const isInserted = users?.some((prod: any) => prod.username === username && prod.password === password);
        if (isInserted) {
          const token = useCookie('token');
          token.value = 'token';
          const i = users.findIndex((prod: any) => prod.username === username && prod.password === password)
          profileStore.setProfile(users[i] || null);
        }
        this.authenticated = isInserted;
      }
    },
    logUserOut() {
      const token = useCookie('token'); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
      localStorage.removeItem('profile');
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