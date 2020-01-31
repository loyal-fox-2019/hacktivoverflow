<template>
  <div class="card col-9">
    <div class="card-body">
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            autofocus
            placeholder="your@mail.com"
            autocomplete="off"
            required
            v-model="form.email"
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            class="form-control"
            id="password"
            placeholder="******"
            required
            v-model="form.password"
          />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',

  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch('login', this.form);
    },
  },
};
</script>

<style lang="css" scoped></style>
