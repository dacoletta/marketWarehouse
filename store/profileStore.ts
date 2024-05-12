import { defineStore } from 'pinia';

export const useProfileStore = defineStore({
  id: 'profileStore',
  state: () => ({
    profile: {
      lastName: '', username: '', firstName: '', email: '', gender: ''
    }
   }),
  actions: {
    setProfile(p: any) {
      this.profile = p;
      localStorage.setItem('profile', JSON.stringify(p));
    },

    setProfileByStorage() {
      this.profile = JSON.parse(localStorage.getItem('profile') || '{}');
    }
  }
})
