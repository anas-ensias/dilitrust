<template>
  <div>
    <div class="row col">
      <h1 class="mt-3">
        Upload a new file:
      </h1>
    </div>
    <div class="mx-5 mt-3">
      <p>To upload a new file you have two options:</p>
      <ul>
        <li>Click on the icon bellow.</li>
        <li>Drag & Drop a file.</li>
      </ul>
      <p>If the color of the icon turns to blue. It means that you have uploaded successfully your file.</p>
      <p>Also, after uploading a file, when you hover the name of the file, you have the possibility to delete it in order to upload a new one.</p>
    </div>
    <FileUploader
      v-if="canCreateFile"
      class="d-flex justify-content-center"
      :file-type="'file'"
      :file-icon="['fas', 'file-import']"
    />
  </div>
</template>

<script>
import FileUploader from '../components/FileUploader';

export default {
  name: 'Home',
  components: { FileUploader },
  computed: {
    canCreateFile () {
      return this.$store.getters['security/hasRole']('ROLE_ADMIN');
    }
  }
};
</script>
