<template>
  <div>
    <div class="relative">
      <img src="@/assets/background.jpg" class="object-cover" />
      <div class="absolute inset-x-0 top-0 custom-content">
        <div class="flex flex-col justify-center h-full items-center">
          <div class="custom-hero rounded-sm px-2 shadow">
            <div class="text-6xl">We &lt;3 people who get stuck</div>
          </div>
          <div class="text-center mt-10">
            <router-link
              to="/questions"
              class="bg-orange-500 px-3 py-4 hover:bg-orange-600 hover:text-white rounded-sm focus:border-none shadow hover:shadow-lg"
              >Let's get started</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
}
</script>

<style scoped>
.custom-content {
  height: 57rem;
}

.custom-hero {
  background-color: rgb(255, 255, 255, 0.5);
}
</style>
