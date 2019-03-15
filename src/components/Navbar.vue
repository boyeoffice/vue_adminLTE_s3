<template lang="html">
  <header class="main-header">
    <router-link :to="{ name: '', params: {} }" class="logo">
      <span class="logo-mini"><b>C</b>CM</span>
      <span class="logo-lg"><b>Boye</b>CMS</span>
    </router-link>
    <nav class="navbar navbar-static-top">
      <a href="javascript:void(0)" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </a>
      <div class="navbar-custom">
        <ul class="nav navbar-nav">
          <li class="dropdown message-menu"></li>
          <li class="dropdow notification-menu"></li>
          <li class="dropdown tasks-menu"></li>
          <li class="dropdown user user-menu"></li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  data(){
    return{
      screenSizes: {
        xs: 480,
        sm: 768,
        md: 992,
        lg: 1200
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="css">
</style>
