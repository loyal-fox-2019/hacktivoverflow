<template>
  <div class="card col-9">
    <div class="card-body">
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="fullname">Full name</label>
          <input type="text" class="form-control" id="fullname" required autofocus />
        </div>
        <div class="form-group">
          <label for="email">Email address</label>
          <input type="email" class="form-control" id="email" required />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input type="password" class="form-control" id="password" required />
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
    return {};
  },
  methods: {
    register() {
      console.log('register');
    },
  },
};
</script>

<style lang="css" scoped></style>
