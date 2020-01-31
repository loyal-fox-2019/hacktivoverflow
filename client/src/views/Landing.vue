<template>
  <div>
    <LoginForm v-if="isRegistered" @to-register="isRegistered = false"/>
    <RegisterForm v-else @to-login="isRegistered = true"/>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'

export default {
  name: 'Landing',
  components: {
    LoginForm,
    RegisterForm
  },
  data() {
    return {
      isRegistered: true
    }
  }
}
</script>

<style>

</style>