<template>
  <div class="card col-9">
    <div class="card-body">
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="fullname">Full name</label>
          <input
            type="text"
            class="form-control"
            id="fullname"
            placeholder="John cena"
            required
            autofocus
            v-model="form.fullname"
          />
        </div>
        <div class="form-group">
          <label for="email">Email address</label>
          <input
            type="email"
            class="form-control"
            id="email"
            placeholder="your@mail.com"
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
            placeholder="*******"
            required
            v-model="form.password"
          />
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',

  data() {
    return {
      form: {
        fullname: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    register() {
      this.$store.dispatch('register', this.form);
    },
  },
};
</script>

<style lang="css" scoped></style>
