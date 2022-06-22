<template>
  <div>
    <h2 class="mt-5">
      Files uploaded list:
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
              #
            </th>
            <th scope="col">
              FileName
            </th>
            <th scope="col">
              Path
            </th>
            <th scope="col">
              Size (Byte)
            </th>
            <th scope="col">
              Actions
            </th>
          </tr>
        </thead>
        <tbody v-if="files.length">
          <tr
            v-for="(file, i) in files"
            :key="i"
          >
            <th scope="row">
              {{ i++ }}
            </th>
            <td>{{ file.fileName }}</td>
            <td>{{ file.path }}</td>
            <td>{{ file.size }}</td>
            <td class="text-center">
              <template v-if="canDownloadFile">
                <a
                  v-tooltip:top="'Download file'"
                  :href="'/' + file.fileName"
                  download
                >
                  <font-awesome-icon
                    :icon="['fas', 'file-download']"
                    :size="'lg'"
                    aria-hidden="true"
                  />
                </a>
                <font-awesome-icon
                  v-tooltip:top="'Delete file'"
                  :icon="['fas', 'trash']"
                  class="text-danger"
                  style="cursor: pointer;"
                  :size="'lg'"
                  aria-hidden="true"
                  @click="deleteFile(file)"
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
              No files found
            </td>
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>

export default {
  name: 'Files',
  computed: {
    isLoading () {
      return this.$store.getters['file/isLoading'];
    },
    hasError () {
      return this.$store.getters['file/hasError'];
    },
    error () {
      return this.$store.getters['file/error'];
    },
    hasFiles () {
      return this.$store.getters['file/hasFiles'];
    },
    files () {
      return this.$store.getters['file/files'];
    },
    canDownloadFile () {
      return this.$store.getters['security/hasRole']('ROLE_ADMIN');
    }
  },
  created () {
    this.$store.dispatch('file/fetchFiles');
  },
  methods: {
    async deleteFile (file) {
      $('.tooltip').tooltip('hide');

      await this.$store.dispatch('file/deleteFile', file);
      await this.$store.dispatch('file/fetchFiles');
    }
  }
};
</script>
