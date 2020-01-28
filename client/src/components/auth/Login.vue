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
            autocomplete="off"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" required />
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
    return {};
  },
  methods: {
    login() {
      console.log('login');
    },
  },
};
</script>

<style lang="css" scoped></style>
