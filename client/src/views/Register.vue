<template>
  <div class="register">
    <div class="container">
      <div class="row">
        <div class="col-md d-flex flex-column justify-content-center">
          <h3 class="title-register mb-3">
            Join the HacktivOverflow Community
          </h3>
          <p class="subtitle-register">
            <i class="fas fa-comments text-primary mr-2"></i> Get unstuck - ask
            a question
          </p>
          <p class="subtitle-register">
            <i class="fas fa-vote-yea text-primary mr-2"></i> Unlock new
            privileges like voting and commenting
          </p>
          <p class="subtitle-register">
            <i class="fas fa-tags text-primary mr-2"></i> Save your favorite
            tags, filters and jobs
          </p>
          <p class="subtitle-register">
            <i class="fas fa-trophy text-primary mr-2"></i> Earn reputation and
            badges
          </p>
          <p class="text-muted mb-0">
            Use the power of HacktivOverflow inside your organization.
          </p>
          <p class="text-muted">
            Try a
            <span class="text-primary"
              >free trial of HacktivOverflow for Teams</span
            >
          </p>
        </div>
        <div class="col-md">
          <LoginForm :page="page"></LoginForm>
          <p class="text-muted text-center mt-3">
            <small
              >Already Have an account ?
              <router-link to="/login">Log in</router-link></small
            >
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm'
export default {
  components: {
    LoginForm
  },
  data() {
    return {
      page: 'register'
    }
  }
}
</script>

<style scoped>
.register {
  min-height: calc(100vh - 70px);
  background-color: #eff0f1;
  padding-top: 5%;
  padding-bottom: 3%;
}
.title-register {
  font-weight: 600;
  font-size: 32px;
}
.subtitle-register {
  font-size: 18px;
}
</style>
