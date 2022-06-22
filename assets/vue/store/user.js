import UserAPI from '../api/user';

const
  DELETING_USER = 'DELETING_USER',
  DELETING_USER_SUCCESS = 'DELETING_USER_SUCCESS',
  DELETING_USER_ERROR = 'DELETING_USER_ERROR',
  EDITING_USER = 'EDITING_USER',
  EDITING_USER_SUCCESS = 'EDITING_USER_SUCCESS',
  EDITING_USER_ERROR = 'EDITING_USER_ERROR',
  FETCHING_USERS = 'FETCHING_USERS',
  FETCHING_USERS_SUCCESS = 'FETCHING_USERS_SUCCESS',
  FETCHING_USERS_ERROR = 'FETCHING_USERS_ERROR';

export default {
  namespaced: true,
  state: {
    isLoading: false,
    error: null,
    user: null,
    users: [],
  },
  getters: {
    isLoading (state) {
      return state.isLoading;
    },
    hasError (state) {
      return state.error !== null;
    },
    error (state) {
      return state.error;
    },
    hasUsers (state) {
      return state.users.length > 0;
    },
    users (state) {
      return state.users;
    }
  },
  mutations: {
    [EDITING_USER] (state) {
      state.isLoading = true;
      state.error = null;
      state.user = null;
    },
    [EDITING_USER_SUCCESS] (state) {
      state.isLoading = false;
      state.error = null;
    },
    [EDITING_USER_ERROR] (state, error) {
      state.isLoading = false;
      state.error = error;
    },
    [DELETING_USER] (state) {
      state.isLoading = true;
      state.error = null;
      state.user = null;
    },
    [DELETING_USER_SUCCESS] (state) {
      state.isLoading = false;
      state.error = null;
    },
    [DELETING_USER_ERROR] (state, error) {
      state.isLoading = false;
      state.error = error;
    },
    [FETCHING_USERS] (state) {
      state.isLoading = true;
      state.error = null;
      state.users = [];
    },
    [FETCHING_USERS_SUCCESS] (state, users) {
      state.isLoading = false;
      state.error = null;
      state.users = users;
    },
    [FETCHING_USERS_ERROR] (state, error) {
      state.isLoading = false;
      state.error = error;
      state.users = [];
    }
  },
  actions: {
    async editUser ({ commit }, payload) {
      commit(EDITING_USER);
      try {
        let response = await UserAPI.putUser(payload.userId, payload.newUserName);
        commit(EDITING_USER_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(EDITING_USER_ERROR, error);
        return null;
      }
    },
    async fetchUsers ({ commit }) {
      commit(FETCHING_USERS);
      try {
        let response = await UserAPI.getUsers();
        commit(FETCHING_USERS_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(FETCHING_USERS_ERROR, error);
        return null;
      }
    },
    async deleteUser ({ commit }, id) {
      commit(DELETING_USER);
      try {
        let response = await UserAPI.deleteUser(id);
        commit(DELETING_USER_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(DELETING_USER_ERROR, error);
        return null;
      }
    }
  }
};
