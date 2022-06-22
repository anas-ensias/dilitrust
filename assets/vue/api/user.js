import axios from 'axios';

export default {
  putUser (id, newUserName) {
    return axios.put('/api/users/' + id, {
      username: newUserName,
    });
  },
  getUsers () {
    return axios.get('/api/users/all');
  },
  deleteUser (id) {
    return axios.delete('/api/users/' + id);
  }
};