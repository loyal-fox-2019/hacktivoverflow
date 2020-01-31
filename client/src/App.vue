<template>
  <div>
    <Search :isSearch="isSearch" />
    <Navigation />
    <div class="container-fluid">
      <div class="row">
        <Sidebar @isSearch="isSearch = !isSearch" />
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view></router-view>
        </main>
      </div>
    </div>
    <footer class="mt-5"></footer>
  </div>
</template>
<script>
import Navigation from '@/components/Navigation.vue';
import Sidebar from '@/components/Sidebar.vue';
import Search from '@/components/Search.vue';

export default {
  name: 'App',
  components: {
    Navigation,
    Sidebar,
    Search,
  },
  data() {
    return {
      isSearch: false,
    };
  },
  computed: {
    errors() {
      return this.$store.state.errors;
    },
    success() {
      return this.$store.state.success;
    },
  },
  watch: {
    errors(val) {
      if (val) {
        this.$bvToast.toast(JSON.parse(JSON.stringify(val)), {
          title: 'Failed!',
          autoHideDelay: 3000,
          variant: 'warning',
          appendToast: true,
        });
        this.$store.commit('SET_ERRORS', null);
      }
    },
    success(val) {
      this.$bvToast.toast(JSON.parse(JSON.stringify(val)), {
        title: 'Success!',
        autoHideDelay: 1000,
        variant: 'success',
        appendToast: true,
      });
      this.$store.commit('SET_SUCCESS', null);
    },
  },
  created() {
    const token = localStorage.getItem('stuckoverlow.token');
    if (token) {
      this.$store.commit('SET_ISLOGIN', token);
    }
  },
};
</script>
<style>
body {
  font-size: 0.875rem;
}

[role='main'] {
  padding-top: 55px;
}
</style>
