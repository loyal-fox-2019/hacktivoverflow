<template>
  <div class="bg-white border-r-2 border-gray-300 w-64" style="height:90.5vh">
    <ul class="list-reset">
        <li >
            <router-link to="/" class="trans block border-gray-300 p-4 text-grey-darker text-right font-bold border-purple hover:bg-gray-300">Public</router-link>
        </li>
        <li >
        <router-link to="/user-question" class="trans text-right block p-4 text-grey-darker font-bold border-grey-lighter hover:border-purple-light hover:bg-gray-300">Your questions</router-link>
        </li>
        <!-- <li > -->
        <!-- <a href="#" class="trans block p-4 text-grey-darker font-bold border-grey-lighter hover:border-purple-light hover:bg-gray-300">Services</a>
        </li>
        <li >
        <a href="#" class="trans block p-4 text-grey-darker font-bold border-grey-lighter hover:border-purple-light hover:bg-gray-300">Contact us</a> -->
        <!-- </li> -->
    </ul>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>