import { defineStore } from "pinia";

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [],
    user: null,
    loading: false
  }),
  getters: {

  },
  actions: {
    async getUsers() {
      this.loading = true;
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await response.json()
      this.users = data
      this.loading = false
    },
    async getUser(id) {
      this.user = null;
      this.loading = true;
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      const data = await response.json()
      this.user = data
      this.loading = false
    },
    async addUser(user) {
      this.users.push(user)
      const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: { 'Content-Type': 'application/json' }
      })
      if (res.error) {
        console.log(res.error)
      }
    },
  }
})