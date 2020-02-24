<template>
  <section id='register'>
      <div class="hero-image"></div>
      <div class="register-wrapper">
        <div class="form-wrapper">
          <form action="" @submit.prevent="login">
            <header class="text-center mb-4">
              <h4 class="header-font">HacktivOverflow</h4>
            </header>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <div class="input-group-text"><i class="far fa-envelope"></i></div>
              </div>
              <input v-model="email" type="text" class="form-control" placeholder="Email">
            </div>
            <div class="input-group mb-3">
              <div class="input-group-prepend">
                <div class="input-group-text"><i class="fas fa-lock"></i></div>
              </div>
              <input v-model="password" type="password" class="form-control" placeholder="Password">
            </div>
            <div class="form-group">
              <input class="btn btn-dark full-size" type="submit" value="Login">
            </div>
          </form>
        </div>
      </div>
    </section>
</template>

<script>

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      let form = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', form)
    }
  },
  components: {
  }
}
</script>

<style>
  #register {
    height: calc(100vh - 4rem);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .hero-image {
    /* background-image: url('/assets/images/hero-image-2.jpg'); */
    position: fixed;
    top: 0;
    left: 0;
    min-width: 100%;
    min-height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: -100;
  }
  .form-wrapper {
    position: relative;
    width: 280px;
    padding: 2rem 2rem;
    background-color: #ffffff;
    border: 1px solid #433333;
    border-radius: 8px;
    box-shadow: 0px -2px 20px -8px rgba(0, 0, 0, 0.6);
  }
  /* .form-wrapper header h4 {
    font-family: 'Fugaz One', cursive;
  } */
  #logo-img {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
    animation: bounce 4s infinite;
  }
  .full-size {
    width: 100%;
  }

  @keyframes bounce {
    0%, 100% {
      transform: translate(-50%, -42%);
    }
    50% {
      transform: translate(-50%, -54%);
    }
  }
</style>
