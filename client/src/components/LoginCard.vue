<template>
  <div>
    <b-card class="mb-2 shadow-sm">
      <b-card-text>
        <h3>Login()</h3>
      </b-card-text>
      <b-card-text class="text-left font-weight-bold">
        <b-form>
          <b-form-group
            id="input-username"
            label="Username / Email"
            label-for="username"
          >
            <b-form-input
              id="username"
              v-model="form.username"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-password"
            label="Password"
            label-for="password"
          >
            <b-form-input
              id="password"
              v-model="form.password"
              type="password"
              required
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="info" block size="sm">
            Log in
          </b-button>
        </b-form>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: null,
        password: null
      }
    };
  }
};
</script>
