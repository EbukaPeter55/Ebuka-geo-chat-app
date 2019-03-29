<template>
  <div id="app">
  <!--Display the Navbar at the top--->  
  <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
/********Styling the background body of the DOM to a light grey***********/
body {
  background: #ddd;
}
</style>
