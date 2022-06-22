import axios from 'axios';

export default {
  postFile(fd) {
    return axios.post(`${window.location.protocol}//${window.location.host}/api/files`, fd, {
      // onUploadProgress: uploadEvent => {
      //   //console.log(`upload progress ${Math.round(uploadEvent.loaded / uploadEvent.total * 100)}%`)
      // }
    });
  },
  getFiles () {
    return axios.get('/api/files');
  },
  deleteFile (file) {
    return axios.delete('/api/files/' + file.fileName);
  }
};