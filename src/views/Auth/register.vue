<template lang="html">
  <div class="rp">
    <div class="rp-form">
      <h1>BoyeXpress</h1>
      <div v-if="showTerms" class="col-md-5 col-md-offset-4">
      </div>
      <div class="form-wrapper">
        <p>Welcome, please fill all fields.</p>
        <form  @submit.prevent="register">
          <div class="form-group">
            <label for="name">Full Name</label>
            <input
              type="text"
              class="form-control"
              v-model="form.name"
              required>
            <span class="text-danger"
             v-if="error.name">
             {{error.name[0]}}
             </span>
          </div>
          <div class="form-group">
            <label for="username">Username</label>
            <input 
              type="text"
              class="form-control"
              v-model="form.username"
              required>
            <span class="text-danger" v-if="error.username">{{error.username[0]}}</span>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email"
              class="form-control"
              v-model="form.email"
              required>
            <span class="text-danger" v-if="error.email">{{error.email[0]}}</span>
          </div>
           <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password"
              class="form-control"
              required
              v-model="form.password">
            <span class="text-danger" v-if="error.password">{{error.password[0]}}</span>
          </div>
          <div class="form-group">
            <label for="confirm">Repeat Password</label>
            <input 
              type="password"
              class="form-control"
              required
              v-model="form.password_confirmation">
            <span class="text-danger" v-if="error.password">{{error.password[0]}}</span>
          </div>
          <div class="form-group">
            <button class="btn btn-primary btn-block">Register</button>
          </div>
        </form>
        <div class="rp-login-link">
          <router-link to="/login">
            You have an account?
          </router-link>
        </div>
        <div class="clearfix"></div>
        <div class="rp-footer">
          <h2>&copy; 2019. BoyeXpress</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {},
      method: "post",
      showError: false,
      buttonVissible: true,
      message: "",
      error: {},
      showTerms: false
    };
  },
  methods: {
    register() {
      this.buttonVissible = false;
      this.$store
        .dispatch("register", this.form)
        .then(response => {
          this.buttonVissible = true;
        })
        .catch(error => {
          this.buttonVissible = true;
          this.showError = true;
          this.triggerError();
          this.error = error.response.data.errors;
        });
    },
    triggerError() {
      setTimeout(() => {
        this.showError = false;
      }, 5000);
    }
  },
  mounted: function() {
    document.title = "Register";
  }
};
</script>
