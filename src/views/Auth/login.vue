<template lang="html">
  <div class="lp">
      <div class="lp-form">
        <h1 class="lp-title">BoyeOffice</h1>
        <p>Welcome, please login.</p>
        <form @submit.prevent="login">
          <div class="form-group">
            <label for="email">Account:</label>
            <input type="email"
             class="form-control"
             placeholder="Email Address"
             required
             v-model="form.email">
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <router-link 
              to="/password">
              Forgot Password?
            </router-link>
            <input type="password" 
              class="form-control"
              required
              placeholder="Password"
              v-model="form.password">
          </div>
          <div v-if="showError"
           class="form-group text-center">
            <span class="text-danger">
              {{message}}
            </span>
          </div>
          <div class="form-group">
            <button 
              v-if="buttonVissible"
              class="btn btn-primary btn-block">
              Login
            </button>
            <button 
                v-else
                disabled
                class="btn btn-primary btn-block">
                Wait for it...
            </button>
          </div>
        </form>
        <div class="lp-s-link">
          <router-link class="pull-right" to="/register">
            Join now!
          </router-link>
        </div>
        <div class="social-link">
          <span>Sign in with: </span>
          <a href="javascript:void(0);">
            <i class="fa fa-facebook-official"></i>
          </a>
          <a href="javascript:void(0);">
            <i class="fa fa-twitter"></i>
          </a>
        </div>
        <div class="lp-footer">
          <h2>&copy; 2019 BoyeOffice</h2>
        </div>
      </div>
  </div>
</template>

<script>
import Storage from "@/storage";
export default {
  data() {
    return {
      form: {
        remember_me: true
      },
      method: "post",
      showError: false,
      buttonVissible: true,
      message: ""
    };
  },
  methods: {
    login() {
      this.buttonVissible = false;
      this.$store
        .dispatch("login", this.form)
        .then(response => {
          //this.fetchProfile();
        })
        .catch(error => {
          this.buttonVissible = true;
          this.showError = true;
          this.triggerError();
          if (error.response.status === 401) {
            this.message = error.response.data.message;
          }
        });
    },
    triggerError() {
      setTimeout(() => {
        this.showError = false;
      }, 5000);
    },
    fetchProfile() {
      this.$store.dispatch("getProfile").then(response => {
        this.$router.push("/");
      });
    }
  },
  mounted: function() {
    document.title = "Login";
    axios.get('api/test').then(response => {
        console.log(response)
    })
  }
};
</script>

