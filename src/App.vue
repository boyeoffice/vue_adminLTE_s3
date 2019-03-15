<template>
  <div 
    :class="{
      'skin-purple': $route.meta.auth === true, 
      'auth-page hold-transitions': $route.meta.auth === false}">
    <div 
      :class="{
        'wrapper': $route.meta.auth === true, 
        'auth-inner': $route.meta.auth === false}">
      <navbar v-show="$route.meta.auth"></navbar>
      <sidebar v-show="$route.meta.auth" :slideMenuItems="slideMenuItems"></sidebar>
      <div 
        :class="{'content-wrapper': $route.meta.auth === true, 
        'auth-wrapper': $route.meta.auth === false}">
        <section v-show="$route.meta.auth" class="content-header">
          <h1>
            Dashboard
            <small>Control panel</small>
          </h1>
          <ol class="breadcrumb">
            <li>
              <a href="#">
                <i class="fa fa-dashboard"></i> Home
              </a>
            </li>
            <li class="active">Calendar</li>
          </ol>
        </section>
         <transition name="page" mode="out-in">
           <router-view/>
         </transition>
      </div>
    <main-footer v-show="$route.meta.auth"></main-footer>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/components/Navbar'
  import Sidebar from '@/components/Sidebar'
  import slideMenuItems from "@/config/slideMenuItems"
  import MainFooter from '@/components/Footer'
  export default {
    components: {
      Navbar,
      Sidebar,
      MainFooter
    },
    data: function() {
      return {
        slideMenuItems: slideMenuItems
      }
    },
    created: function(){
      if (this.$store.state.auth.authentication === true){
        this.fetchProfile()
      }
    },
    methods: {
      fetchProfile(){
        this.$store.dispatch('getProfile')
      }
    }
  }
</script>