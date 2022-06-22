import FileAPI from '../api/file';

const UPLOAD_FILE = 'UPLOAD_FILE',
  UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS',
  UPLOAD_FILE_ERROR = 'UPLOAD_FILE_ERROR',
  DELETING_FILE = 'DELETING_FILE',
  DELETING_FILE_SUCCESS = 'DELETING_FILE_SUCCESS',
  DELETING_FILE_ERROR = 'DELETING_FILE_ERROR',
  FETCHING_FILES = 'FETCHING_FILES',
  FETCHING_FILES_SUCCESS = 'FETCHING_FILES_SUCCESS',
  FETCHING_FILES_ERROR = 'FETCHING_FILES_ERROR';

export default {
  namespaced: true,
  state: {
    isLoading: false,
    error: null,
    file: null,
    files: [],
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
    hasFiles (state) {
      return state.files.length > 0;
    },
    files (state) {
      return state.files;
    }
  },
  mutations: {
    [UPLOAD_FILE] (state, file) {
      state.isLoading = true;
      state.error = null;
      state.file = file;
    },
    [UPLOAD_FILE_SUCCESS] (state, file) {
      state.isLoading = false;
      state.error = null;
      state.files.unshift(file);
    },
    [UPLOAD_FILE_ERROR] (state, error) {
      state.isLoading = false;
      state.error = error;
      state.files = [];
    },
    [DELETING_FILE] (state) {
      state.isLoading = true;
      state.error = null;
      state.file = null;
    },
    [DELETING_FILE_SUCCESS] (state) {
      state.isLoading = false;
      state.error = null;
    },
    [DELETING_FILE_ERROR] (state, error) {
      state.isLoading = false;
      state.error = error;
    },
    [FETCHING_FILES] (state) {
      state.isLoading = true;
      state.error = null;
      state.files = [];
    },
    [FETCHING_FILES_SUCCESS] (state, files) {
      state.isLoading = false;
      state.error = null;
      state.files = files;
    },
    [FETCHING_FILES_ERROR] (state, error) {
      state.isLoading = false;
      state.error = error;
      state.files = [];
    }
  },
  actions: {
    async saveFile ({ commit }, fd) {
      commit(UPLOAD_FILE);
      try {
        let response = await FileAPI.postFile(fd);
        commit(UPLOAD_FILE_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(UPLOAD_FILE_ERROR, error);
        return null;
      }
    },
    async fetchFiles ({ commit }) {
      commit(FETCHING_FILES);
      try {
        let response = await FileAPI.getFiles();
        commit(FETCHING_FILES_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(FETCHING_FILES_ERROR, error);
        return null;
      }
    },
    async deleteFile ({ commit }, file) {
      commit(DELETING_FILE);
      try {
        let response = await FileAPI.deleteFile(file);
        commit(DELETING_FILE_SUCCESS, response.data);
        return response.data;
      } catch (error) {
        commit(DELETING_FILE_ERROR, error);
        return null;
      }
    }
  }
};
