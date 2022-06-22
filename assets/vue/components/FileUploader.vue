<template>
  <div
    @dragover.prevent
    @drop.prevent
  >
    <div
      @dragover="dragover"
      @dragleave="draggingOver = false"
      @drop="drop"
    >
      <input
        id="file"
        ref="fileUploader"
        style="display: none;"
        type="file"
        accept=".csv, .CSV"
        @change="onFileSelected"
      >
      <div class="d-flex ml-4">
        <div class="form-group uploader-container">
          <div
            :class="[{'uploader-box': !fileSelected && !draggingOver},
                     {'uploader-box-uploaded': fileSelected && !draggingOver},
                     {'uploader-box-dragover': draggingOver}
            ]"
            @click="$refs.fileUploader.click()"
          >
            <div class="d-flex align-items-center justify-content-center uploader">
              <font-awesome-icon
                :icon="fileIcon"
                :size="'7x'"
                :class="[{'csvFileIcon': draggingOver}, {'text-primary': fileSelected && !draggingOver}]"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
        <div
          v-if="uploadedFile.name !== ''"
          class="small my-auto ml-2"
          :class="{'text-danger': showRemoveFileBtn}"
          @mouseenter="showRemoveFileBtn = true"
          @mouseleave="showRemoveFileBtn = false"
        >
          <span>
            {{ uploadedFile.name }} ({{ getReadableFileSizeString(uploadedFile.size) }})
          </span>
          <font-awesome-icon
            :icon="['fas', 'circle-xmark']"
            :size="'lg'"
            :class="{'invisible': !showRemoveFileBtn}"
            aria-hidden="true"
            @click="removeSelectedFile"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FileUploader',
  props: {
    fileType: {
      type: String,
      default: ''
    },
    fileIcon: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      showRemoveFileBtn: false,
      draggingOver: false,
      fileSelected: false,
      uploadedFile: {
        name: '',
        size: ''
      },
      filePath: null
    };
  },
  created () {
    this.$root.$on('removeFileFromUploader', this.removeFileFromUploader);
  },
  methods: {
    resetUploadedFile () {
      this.uploadedFile = {
        name: '',
        size: ''
      };
    },
    getReadableFileSizeString (fileSizeInBytes) {
      let i = -1;
      let byteUnits = [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'];
      do {
        fileSizeInBytes = fileSizeInBytes / 1024;
        i++;
      } while (fileSizeInBytes > 1024);

      return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
    },
    fileTypeCheck () {
      // if (this.$refs.fileUploader.files[0].type !== 'application/vnd.ms-excel') {
      //   this.removeFileFromUploader();
      //   this.resetUploadedFile();
      //   return false;
      // }

      return true;
    },
    dragover (event) {
      event.preventDefault();
      this.draggingOver = true;
      this.showRemoveFileBtn = false;
    },
    drop (event) {
      this.draggingOver = false;
      event.preventDefault();
      this.$refs.fileUploader.files = event.dataTransfer.files;

      if (! this.fileTypeCheck()) {
        return 0;
      }

      this.uploadedFile = event.dataTransfer.files[0];
      this.fileSelected = true;
      this.showRemoveFileBtn = false;
      this.onFileSelected(event);
    },
    removeSelectedFile () {
      this.$refs.fileUploader.value = '';
      this.resetUploadedFile();
      this.fileSelected = false;
      this.$emit('fileRemoved');
    },
    async onFileSelected (e) {
      // if (! this.fileTypeCheck()) {
      //   return 0;
      // }

      this.showRemoveFileBtn = false;

      if (! this.fileSelected) {
        this.uploadedFile = e.target.files[0];
      }

      this.fileSelected = true;

      const fd = new FormData();
      fd.append(this.fileType, this.uploadedFile, this.uploadedFile.name);

      const result = await this.$store.dispatch('file/saveFile', fd);

      this.filePath = result?.filePath;
      this.$emit('fileSelected', this.filePath);
    },
    async removeFileFromUploader () {
      this.resetUploadedFile();
      this.fileSelected = false;

      if (this.$refs.fileUploader !== undefined) {
        this.$refs.fileUploader.value = '';
      }
    }
  }
};
</script>

<style scoped>
.uploader-container {
  cursor: pointer;
}

.uploader-close {
  position: relative;
  top: -30px;
  right: -105px;
}

.uploader-box {
  border: #b2bdc9 2px dashed;
  border-radius: 20px;
  padding: 2rem;
}

.uploader-box-uploaded {
  border: blue 2px solid;
  border-radius: 20px;
  padding: 2rem;
}

.uploader-box-dragover {
  background-color: blue;
  border-radius: 20px;
  padding: 2rem;
}


.csvFileIcon {
  color: white;
}

.uploader > p {
  font-size: 10px;
  margin-bottom: 5px;
}

</style>