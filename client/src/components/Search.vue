<template>
  <div id="myOverlay" class="overlay" v-show="active">
    <span class="closebtn" @click="active = false" title="Close Overlay">×</span>
    <div class="overlay-content">
      <form action="/">
        <input type="text" placeholder="Search Questions.." name="search" />
        <button type="submit"><b-icon-search></b-icon-search></button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: ['isSearch'],
  data() {
    return {
      active: false,
    };
  },
  watch: {
    isSearch() {
      console.log('==');
      this.active = true;
    },
  },
};
</script>

<style lang="css">
.overlay {
  height: 100%;
  width: 100%;
  /*display: none;*/
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.9);
}

.overlay-content {
  position: relative;
  top: 46%;
  width: 80%;
  text-align: center;
  margin-top: 30px;
  margin: auto;
}

.overlay .closebtn {
  position: absolute;
  top: 20px;
  right: 45px;
  font-size: 60px;
  cursor: pointer;
  color: white;
}

.overlay .closebtn:hover {
  color: #ccc;
}

.overlay input[type='text'] {
  padding: 15px;
  font-size: 17px;
  border: none;
  float: left;
  width: 80%;
  background: white;
}

.overlay input[type='text']:hover {
  background: #f1f1f1;
}

.overlay button {
  float: left;
  width: 20%;
  padding: 15px;
  background: #ddd;
  font-size: 17px;
  border: none;
  cursor: pointer;
}

.overlay button:hover {
  background: #bbb;
}
.active {
  display: block !important;
}
</style>
