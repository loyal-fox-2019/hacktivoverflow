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
  name: 'Index',
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
};
</script>

<style lang="css">
body {
  font-size: 0.875rem;
}

[role='main'] {
  padding-top: 55px;
}
</style>
