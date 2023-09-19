<template>
  <v-layout align-start>
    <v-flex>
      <v-data-table
        :headers="headers"
        :items="roles"
        :search="search"
        class="elevation-1"
        fixed-header
        style="overflow: auto; max-height: 700px;"
        loading="this.loading"
        loading-text="Loading... Please wait"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title
              ><strong>Lista de Roles</strong></v-toolbar-title
            >
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>


        <template v-slot:[`item.condicion`]="{ item }">
          <v-simple-checkbox
            v-model="item.condicion"
            disabled
          ></v-simple-checkbox>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    roles: [],
    search: "",
    valid: true,
    loading: true,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Name", align: "start", sortable: true, value: "nombre",},
      { text: "Description", value: "descripcion", sortable: false },
      { text: "Status", value: "condicion" },
    ],
  }),


  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      this.adModal = 0;
    },
  },

  created() {
    this.initialize();
    this.listar();
  },

  methods: {
    listar() {
      let me = this;
      console.log(this.loading);
      axios
        .get("Roles/Get")
        .then(function(response) {
          me.roles = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    cancelLoading() {
      let me = this;
      me.loading = false;
    },

    initialize() {},
  },
};
</script>
