<template>
  <div class="chrome-context -col -fixed h-screen">
  <NavBar />
  <main class="chrome-context -row -fixed z-0">
    <SideBar />
		<div class="px-4">
	    <router-view />
		</div>
  </main>
</div>
</template>

<script>
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'

export default {
  name: 'Home',
  components: {
    NavBar,
    SideBar
  }
}
</script>

<style scoped>
.min-w-48 {
	min-width: 12rem;
}
.min-h-48 {
	min-height: 12rem;
}
summary.hide-disclosure::-webkit-details-marker {
	display: none;
}
.hover\:cursor-pointer:hover {
	cursor: pointer;
}
/* .open\:text-white[open] {
	color: white;
}
.open\:bg-purple-300[open] {
	background-color: #d6bcfa;
}
.active\:border-purple-800 {
	border-left: 4px solid;
	border-color: #553c9a;
}
.active\:text-white {
	color: #fff;
} */
.chrome-context {
	display: flex;
	margin: 0;
}
.chrome-context > :not(.chrome) {
	flex: 1 0 auto;
}
.chrome-context > .chrome {
	flex: 0 0 auto;
}
.-col {
	flex-direction: column;
}
.-row {
	flex-direction: row;
}
.-row > :not(.chrome) {
	flex: 1 1 auto;
}
.-fixed {
	overflow: hidden;
}
.-fixed > :not(.chrome) {
	flex: 1 1 auto;
	overflow-y: auto;
}
.-fixed > .chrome {
	flex: 0 0 auto;
}
.scroll-shadow, .shadow-top, .shadow-bottom {
	position: relative;
}
.scroll-shadow:before, .scroll-shadow:after, .shadow-top:before, .shadow-bottom:after {
	content: '';
	position: absolute;
	left: 0;
	right: 0;
	height: 0.33em;
	z-index: 10;
}
.scroll-shadow:before, .shadow-top:before {
	top: 0;
	background: linear-gradient(to bottom, rgba(203, 213, 224, .8), transparent);
	border-bottom-right-radius: 100%;
	border-bottom-left-radius: 100%;
}
.scroll-shadow:after, .shadow-bottom:after {
	bottom: 0;
	background: linear-gradient(to top, rgba(203, 213, 224, .8), transparent);
	border-top-right-radius: 100%;
	border-top-left-radius: 100%;
}
.scrollbar-none {
	-ms-overflow-style: none;
	scrollbar-width: none;
}
.scrollbar-none::-webkit-scrollbar {
	display: none;
	width: 0px;
	background: transparent;
}
.scrollable {
	overflow-y: scroll;
	max-height: 100%;
}
</style>