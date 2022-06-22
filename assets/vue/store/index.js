import Vue from "vue";
import Vuex from "vuex";
import SecurityModule from "./security";
import FileModule from "./file";
import UserModule from "./user";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    security: SecurityModule,
    file: FileModule,
    user: UserModule,
  }
});
