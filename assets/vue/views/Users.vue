<template>
  <div>
    <h2 class="mt-5">
      Users list:
    </h2>
    <template v-if="isLoading">
      <div class="d-flex justify-content-center mt-5 pt-5">
        <div
          class="spinner-border mx-auto my-auto"
          style="width: 3rem; height: 3rem;"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </template>
    <template v-else>
      <table class="table table-striped table-hover table-bordered my-5">
        <thead>
          <tr>
            <th scope="col">
              Id
            </th>
            <th scope="col">
              Username
            </th>
            <th scope="col">
              Roles
            </th>
            <th scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody v-if="users.length">
          <tr
            v-for="(user, i) in users"
            :key="i"
          >
            <th scope="row">
              {{ user.id }}
            </th>
            <td
              v-if="idUserToEdit === user.id"
              class="d-flex"
            >
              <input
                v-model="newUserName"
                type="text"
                class="form-control"
              >
              <font-awesome-icon
                :icon="['fas', 'circle-xmark']"
                :size="'sm'"
                aria-hidden="true"
                class="ml-3 text-danger my-auto"
                style="cursor: pointer;"
                @click="idUserToEdit = null"
              />
              <font-awesome-icon
                :icon="['fas', 'check-circle']"
                :size="'sm'"
                aria-hidden="true"
                class="ml-1 text-success my-auto"
                style="cursor: pointer;"
                @click="editUser(user.id)"
              />
            </td>
            <td v-else>
              {{ user.userName }}
            </td>
            <td>{{ user.roles }}</td>
            <td class="text-center">
              <template v-if="canEditUser">
                <a
                  v-tooltip:top="'Edit user'"
                  download
                  @click="startEditingUser(user)"
                >
                  <font-awesome-icon
                    :icon="['fas', 'user-edit']"
                    :size="'lg'"
                    aria-hidden="true"
                    style="cursor: pointer;"
                  />
                </a>
                <font-awesome-icon
                  v-if="user.id !== currentUser.id"
                  v-tooltip:top="'Delete user'"
                  :icon="['fas', 'trash']"
                  class="text-danger"
                  style="cursor: pointer;"
                  :size="'lg'"
                  aria-hidden="true"
                  @click="deleteUser(user.id)"
                />
              </template>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td
              class="text-center m-5 p-5"
              colspan="5"
            >
              No users found
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>

export default {
  name: 'Users',
  data () {
    return {
      newUserName: '',
      idUserToEdit: false
    };
  },
  computed: {
    isLoading () {
      return this.$store.getters['user/isLoading'];
    },
    hasError () {
      return this.$store.getters['user/hasError'];
    },
    error () {
      return this.$store.getters['user/error'];
    },
    hasUsers () {
      return this.$store.getters['user/hasUsers'];
    },
    users () {
      return this.$store.getters['user/users'];
    },
    canEditUser () {
      return this.$store.getters['security/hasRole']('ROLE_ADMIN');
    },
    currentUser () {
      return this.$store.getters['security/currentUser'];
    }
  },
  created () {
    this.$store.dispatch('user/fetchUsers');
  },
  methods: {
    startEditingUser (user) {
      this.idUserToEdit = user.id;
      this.newUserName = user.userName;
    },
    async deleteUser (userId) {
      $('.tooltip').tooltip('hide');

      await this.$store.dispatch('user/deleteUser', userId);
      await this.$store.dispatch('user/fetchUsers');
    },
    async editUser (userId) {
      let payload = { userId: userId, newUserName: this.newUserName };
      this.idUserToEdit = null;
      await this.$store.dispatch('user/editUser', payload);
      await this.$store.dispatch('user/fetchUsers');
    }
  }
};
</script>
