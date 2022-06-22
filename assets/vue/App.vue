<template>
  <div class="container">
    <nav
      v-if="isAuthenticated"
      class="navbar navbar-expand-lg navbar-light bg-light"
    >
      <router-link
        class="navbar-brand"
        to="/home"
      >
        Dilitrust
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon" />
      </button>
      <div
        id="navbarNav"
        class="collapse navbar-collapse"
      >
        <ul class="navbar-nav">
          <router-link
            class="nav-item"
            tag="li"
            to="/home"
            active-class="active"
          >
            <a class="nav-link">Home</a>
          </router-link>
          <router-link
            class="nav-item"
            tag="li"
            to="/files"
            active-class="active"
          >
            <a class="nav-link">Uploaded Files</a>
          </router-link>
          <router-link
            class="nav-item"
            tag="li"
            to="/users"
            active-class="active"
          >
            <a class="nav-link">Manage users</a>
          </router-link>
        </ul>
      </div>
      <a
        v-if="isAuthenticated"
        class="btn btn-outline-danger text-right"
        href="/api/logout"
      >
        Logout
      </a>
    </nav>
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    isAuthenticated () {
      return this.$store.getters['security/isAuthenticated'];
    }
  },
  created () {
    let isAuthenticated = JSON.parse(this.$parent.$el.attributes['data-is-authenticated'].value),
      user = JSON.parse(this.$parent.$el.attributes['data-user'].value);

    let payload = { isAuthenticated: isAuthenticated, user: user };
    this.$store.dispatch('security/onRefresh', payload);
  }
};
</script>