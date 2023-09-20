<template>
  <v-layout align-start>
    <v-flex>
      <v-data-table
        :headers="headers"
        :items="usuarios"
        :search="search"
        class="elevation-1"
        fixed-header
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title
              ><strong>Users List</strong></v-toolbar-title
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
            <v-dialog v-model="dialog" max-width="650px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  New Item
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="8" sm="8" md="8">
                          <v-text-field
                            v-model="nombre"
                            label="Name"
                            :counter="100"
                            required
                            :rules="nameRules"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="4" sm="4" md="4">
                          <v-select v-model="idrol"
                          :items="roles" label="Role"
                          :rules="roleRules">
                          </v-select>
                        </v-col>

                        <v-col cols="4" sm="4" md="4">
                          <v-select v-model="documentType"
                          :items="documents" label="ID Type"
                          :rules="documentRules">
                          </v-select>
                        </v-col>
                        
                        <v-col cols="4" sm="4" md="4">
                          <v-text-field
                            v-model="documentNum"
                            label="ID Number"
                            :rules="documentNumberRules"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="3" sm="3" md="3">
                          <v-text-field
                            v-model="phone"
                            label="Phone Number"
                            :rules="phoneRules"
                          ></v-text-field>
                        </v-col>

                        <v-col cols="6" sm="6" md="6">
                          <v-text-field
                            v-model="email"
                            label="e-mail"
                            :counter="30"
                            :rules="emailRules"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="6" sm="6" md="6">
                          <v-text-field
                            type="password"
                            v-model="password"
                            label="Password"
                            :counter="30"
                            :rules="passwordRules"
                            required
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            v-model="address"
                            label="Address"
                            :counter="150"
                            :rules="addressRules"
                            required
                          ></v-text-field>
                        </v-col>

                      </v-row>
                    </v-container>
                  </v-card-text>
                </v-form>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="adModal" max-width="250px">
              <v-card>
                <v-card-title class="headline" v-if="adAccion == 1"
                  >Activate Item?</v-card-title
                >
                <v-card-title class="headline" v-if="adAccion == 2"
                  >Deactivate Item?</v-card-title
                >

                <v-card-text>
                  You are
                  <span v-if="adAccion == 1"> Activating</span>
                  <span v-if="adAccion == 2"> Deactivating</span>
                  {{ adNombre }}
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
            
          </v-toolbar>
        </template>

        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)"> edit </v-icon>

          <template v-if="item.condicion">
            <v-icon small @click="ToggleStatus(2, item)"> dangerous </v-icon>
          </template>
          <template v-else>
            <v-icon small @click="ToggleStatus(1, item)"> check </v-icon>
          </template>
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
    usuarios: [],
    search: "",
    valid: true,
    loading: true,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Name", value: "nombre" , sortable: true },
      { text: "Role", value: "rol" , sortable: true },
      { text: "ID Type", value: "tipo_documento" , sortable: false},
      { text: "ID", value: "num_documento" , sortable: false},
      { text: "Address", value: "direccion" , sortable: false},
      { text: "Phone Number", value: "telefono" , sortable: false},
      { text: "e-Mail", value: "email" , sortable: false},
      { text: "Status", value: "condicion" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    id: "",
    idrol:'',
    nombre: '',
    roles:[
    ],
    documentType:'',
    documents:[
      'Cedula',
      'Pasaporte',
      'RUC',
      'DNI'
    ],
    documentNum: '',
    address: '',
    phone:'',
    email: '',
    password: '',
    passwordUpdate: false,
    passwordOld: '',
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length <= 100 || "Name must be less than 100 characters",
      (v) => v.length >= 3 || "Name must contain at least 3 characters",
    ],
    roleRules:[
      (v) => !!v || "Role is required"
    ],
    phoneRules:[
      (v) => !!v || "Phone is required",
      (v) => v.length >= 7 || "Phone must have more than 7 characters"
    ],
    emailRules:[
      (v) => !!v || "e-mail is required",
      (v) => v.length <= 30 || "e-mail must have less than 30 characters"
    ],
    documentRules:[
      (v) => !!v || "Document type is required"
    ],
    documentNumberRules:[
      (v) => !!v || "ID number is required",
      (v) => v.length >= 6 || "ID must have more than 6 characters"
    ],
    addressRules: [
      (v) => !!v || "Address is required",
      (v) => v.length <= 150 || "Address must be less than 150 characters",
    ],    
    passwordRules: [
      (v) => !!v || "Password is required",
      (v) => v.length <= 30 || "Password must be less than 30 characters",
      (v) => v.length >= 7 || "Password must contain at least 7 characters",
    ],
    adModal: 0,
    adNombre: "",
    adID: "",
    adAccion: "",
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Create User" : "Edit User";
    },
  },

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
    this.ValueList();
  },

  methods: {
    listar() {
      let me = this;
      me.loading = true;
      axios
        .get("Usuarios/Get")
        .then(function (response) {
          me.usuarios = response.data;
          me.loading = false;
          //console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    ValueList() {
      let me = this;
      var rolesArray = [];
      axios
        .get("Roles/GetValList")
        .then(function (response) {
          rolesArray = response.data;
          rolesArray.map(function (x) {
              me.roles.push({text: x.nombre, value: x.idrol});
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    initialize() {},

    editItem(item) {
      this.id = item.idusuario;
      this.idrol = item.idrol;
      this.nombre = item.nombre;
      this.email = item.email;
      this.phone = item.telefono;
      this.documentNum = item.num_documento;
      this.documentType = item.tipo_documento;
      this.address = item.direccion;
      this.password = item.password_hash
      this.passwordOld = item.password_hash
      this.editedIndex = 1;
      this.dialog = true;
    },

    ToggleStatus(accion, item) {
      this.adModal = 1;
      this.adNombre = item.nombre;
      this.adID = item.idusuario;
      this.dialogDelete = true;
      if (accion === 1) {
        this.adAccion = 1;
      } else if (accion === 2) {
        this.adAccion = 2;
      } else {
        this.adModal = 0;
      }
    },

    deleteItemConfirm() {
      let me = this;
      console.log(this);
      axios
        .post("Usuarios/ToggleActivation/" + this.adID, {})
        .then(function (res) {
          me.adModal = 0;
          me.adAccion = 0;
          me.adNombre = "";
          me.adID = "";
          me.listar();
        })
        .catch(function (err) {
          console.log(err);
        });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.limpiar();
    },
    limpiar() {
      this.idrol = "";
      this.nombre = "";
      this.documentType = "";
      this.documentNum = "";
      this.address = "";
      this.phone = "";
      this.email = "";
      this.password = "";
      this.passwordOld = "";
      this.passwdUpdate = false;
      this.editedIndex = -1;
    },
    close() {
      this.limpiar();
      this.adModal = 0;
      this.dialog = false;
    },
    save() {
      if (!this.validate()) {
        return;
      }
      if (this.editedIndex > -1) {
        let me = this;
        if(me.password != me.passwordOld)
        {
          me.passwordUpdate = true;
        }
        axios
          .put("Usuarios/Edit", {
            idusuario : me.id,
            idrol: me.idrol,
            nombre: me.nombre,
            tipo_documento: me.documentType,
            num_documento: me.documentNum,
            direccion: me.address,
            telefono: me.phone,
            email: me.email,
            password: me.password,
            act_password : me.passwordUpdate
          })
          .then(function (res) {
            me.close();
            me.listar();
            me.limpiar();
          })
          .catch(function (err) {
            console.log(err);
          });
      } else {
        //Agregar
        let me = this;
        axios
          .post("Usuarios/Create", {
            idrol: me.idrol,
            nombre: me.nombre,
            tipo_documento: me.documentType,
            num_documento: me.documentNum,
            direccion: me.address,
            telefono: me.phone,
            email: me.email,
            password: me.password
          })
          .then(function (res) {
            me.close();
            me.listar();
            me.limpiar();
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    },
    validate() {
      return this.$refs.form.validate();
    },
  },
};
</script>
