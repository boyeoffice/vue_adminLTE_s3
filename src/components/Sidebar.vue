<template>
	<aside class="main-sidebar">
		<section class="sidebar">
			<div class="user-panel">
		        <div class="pull-left image">
		          <img v-if="profile.avatar_id === null" src="@/assets/default.png" class="img-circle" alt="User Image">
		          <img v-else 
                :src="profile.avatar" 
                class="img-circle" 
                :alt="profile.name"
                style="width: 50px; height: 50px;">
		        </div>
		        <div class="pull-right info">
		          <p>{{profile.name}}</p>
		          <router-link :to="{name: 'Profile'}">
		            <i class="fa fa-user text-success"></i>
		            Profile
		          </router-link>
		          <a href="javascript:void(0)" @click="logout">
		            <i class="fa fa-power-off text-warning"></i>
		            Logout
		          </a>
		       </div>
		      </div>
		      <ul data-widget="tree" class="sidebar-menu">
		        <va-slider-item
            v-for="(item,index) in slideMenuItems"
            :key="index"
            :data="item"
            :type="item.type"
            :isHeader="item.isHeader"
            :name="item.name"
            :badge="item.badge"
            :items="item.items"
            :router="item.router"
            :link="item.link"
            :icon="item.icon"
            ></va-slider-item>
          </ul>
		</section>
	</aside>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import VaSliderItem from '@/components/VaSliderItem.vue'
  import Storage from '@/storage'
export default {
  props: {
    slideMenuItems: {
      type: Array,
      default: []
    }
  },
	components: { VaSliderItem },
  computed:
    mapGetters(['profile']),
  methods: {
    logout(){
        return new Promise(() => {
          axios.post('api/v2/logout').then(response => {
            this.$store.commit('RECIEVE_AUTH', false)
            Storage.remove()
            this.$router.push('/login')
          }).catch(error => {

          })
        })
    }
  },
  mounted(){
  }
}
</script>
