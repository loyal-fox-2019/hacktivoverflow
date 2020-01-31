<template>
  <div class="mt-3">
    <b-tabs content-class="mt-3">
      <b-tab title="Login" active>
        <div>
          <Login />
        </div>
      </b-tab>
      <b-tab title="Register">
        <div>
          <Register />
        </div>
      </b-tab>
    </b-tabs>
  </div>
</template>

<script>
import Login from '@/components/auth/Login.vue';
import Register from '@/components/auth/Register.vue';

export default {
  name: 'Auth',
  components: {
    Login,
    Register,
  },
  data() {
    return {};
  },
};
</script>

<style lang="css" scoped></style>
