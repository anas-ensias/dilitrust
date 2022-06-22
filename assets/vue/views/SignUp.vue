<template>
  <div class="vue-template">
    <img
      class="d-block mx-auto"
      style="width: 250px; height: 250px;"
      alt="dilitrustLogo"
      src="../../images/dilitrustLogo.jpg"
    >
    <form class="mx-auto w-50">
      <div
        v-if="hasError"
        class="row col"
      >
        <error-message :error="error" />
      </div>
      <h3 class="text-center">
        Sign Up
      </h3>
      <div class="form-group">
        <label>Email address</label>
        <input
          v-model="login"
          type="email"
          class="form-control form-control-lg"
        >
      </div>
      <div class="form-group">
        <label>Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control form-control-lg"
        >
      </div>
      <div class="form-group">
        <label>Confirm password</label>
        <input
          v-model="passwordConfirmation"
          type="password"
          class="form-control form-control-lg"
        >
      </div>
      <div class="row">
        <button
          type="submit"
          class="btn btn-primary col m-3"
          @click="backToLoginPage"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="btn btn-dark col m-3"
          :disabled="! login.length || ! password.length || ! passwordConfirmation.length || isLoading"
          @click="signUp"
        >
          Sign Up
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import ErrorMessage from '../components/ErrorMessage';

export default {
  name: 'SignUp',
  components: {
    ErrorMessage
  },
  data () {
    return {
      login: '',
      password: '',
      passwordConfirmation: ''
    };
  },
  computed: {
    isLoading () {
      return this.$store.getters['security/isLoading'];
    },
    hasError () {
      if (this.isLoading && this.password !== this.passwordConfirmation) {
        return true;
      }

      return this.$store.getters['security/hasError'];
    },
    error () {
      if (this.isLoading && this.password !== this.passwordConfirmation) {
        return 'Bad password confirmation';
      }

      return this.$store.getters['security/error'];
    }
  },
  created () {
    let redirect = this.$route.query.redirect;

    if (this.$store.getters['security/isAuthenticated']) {
      if (typeof redirect !== 'undefined') {
        this.$router.push({ path: redirect });
      } else {
        this.$router.push({ path: '/home' });
      }
    }
  },
  methods: {
    backToLoginPage () {
      this.$router.push({ path: '/login' });
    },
    async signUp () {
      let payload = { login: this.$data.login, password: this.$data.password },
        redirect = this.$route.query.redirect;

      await this.$store.dispatch('security/signUp', payload);
      if (! this.$store.getters['security/hasError']) {
        if (typeof redirect !== 'undefined') {
          this.$router.push({ path: redirect });
        } else {
          this.$router.push({ path: '/home' });
        }
      }
    }
  }
};
</script>
<style scoped>
* {
  box-sizing: border-box;
}

body {
  background: #2554FF !important;
  min-height: 100vh;
  display: flex;
  font-weight: 400;
}

body,
html,
.App,
.vue-template,
.vertical-center {
  width: 100%;
  height: 100%;
}

.navbar-light {
  background-color: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
}

.vertical-center {
  display: flex;
  text-align: left;
  justify-content: center;
  flex-direction: column;
}

.inner-block {
  width: 450px;
  margin: auto;
  background: #ffffff;
  box-shadow: 0px 14px 80px rgba(34, 35, 58, 0.2);
  padding: 40px 55px 45px 55px;
  border-radius: 15px;
  transition: all .3s;
}

.vertical-center .form-control:focus {
  border-color: #2554FF;
  box-shadow: none;
}

.vertical-center h3 {
  text-align: center;
  margin: 0;
  line-height: 1;
  padding-bottom: 20px;
}

label {
  font-weight: 500;
}

.forgot-password,
.sign-up,
.forgot-password a,
.sign-up a {
  text-align: right;
  font-size: 13px;
  padding-top: 10px;
  color: #7a7a7a;
  margin: 0;
}

.forgot-password a,
.sign-up a {
  color: #2554FF;
}

.social-icons {
  text-align: center;
  font-family: "Open Sans";
  font-weight: 300;
  font-size: 1.5em;
  color: #222222;
}

.social-icons ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.social-icons ul li {
  display: inline-block;
  zoom: 1;
  width: 65px;
  vertical-align: middle;
  border: 1px solid #e3e8f9;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  margin-right: 5px;
  background: #f4f6ff;
}

.social-icons ul li a {
  display: block;
  font-size: 1.4em;
  margin: 0 5px;
  text-decoration: none;
}

.social-icons ul li a i {
  -webkit-transition: all 0.2s ease-in;
  -moz-transition: all 0.2s ease-in;
  -o-transition: all 0.2s ease-in;
  -ms-transition: all 0.2s ease-in;
  transition: all 0.2s ease-in;
}

.social-icons ul li a:focus i,
.social-icons ul li a:active i {
  transition: none;
  color: #222222;
}
</style>