<template>
  <v-layout align-start>
    <v-flex>
      <v-data-table
        :headers="headers"
        :items="articulos"
        :search="search"
        sort-by="calories"
        class="elevation-1"
        fixed-header
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title
              ><strong>Product List</strong></v-toolbar-title
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
                        <v-col cols="4" sm="4" md="4">
                          <v-text-field
                            v-model="codigo"
                            label="Code"
                            :counter="50"
                            required
                            :rules="codeRules"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="8" sm="8" md="8">
                          <v-select v-model="idcategoria"
                          :items="categorias" label="Category"
                          :rules="categoryRules">
                          </v-select>
                        </v-col>
                        
                        <v-col cols="12" sm="12" md="12">
                          <v-text-field
                            v-model="nombre"
                            label="Name"
                            :counter="50"
                            :rules="nameRules"
                            required
                          ></v-text-field>
                        </v-col>
                        
                        <v-col cols="5" sm="5" md="5">
                          <v-text-field
                            type="number"
                            v-model="stock"
                            label="Stock"
                            :rules="stockRules"
                          ></v-text-field>
                        </v-col>
                       <v-col cols="5" sm="5" md="5">
                          <v-text-field
                            type="number"
                            v-model="precio_venta"
                            label="Unit Price"
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
    articulos: [],
    categorias: [],
    search: "",
    valid: true,
    loading: true,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Code", value: "codigo" , sortable: false },
      { text: "Name", value: "nombre" , sortable: true },
      { text: "Category", value: "categoria" , sortable: true },
      { text: "Stock", value: "stock" , sortable: false},
      { text: "Unit Price", value: "precio_venta" , sortable: false},
      { text: "Status", value: "condicion" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    id: "",
    idcategoria:'',
    codigo: '',
    nombre: "",
    stock: 0,
    precio_venta:0,
    descripcion: "",
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => v.length <= 50 || "Name must be less than 50 characters",
      (v) => v.length >= 3 || "Name must contain at least 3 characters",
    ],
    categoryRules:[
      (v) => !!v || "Category is required"
    ],
    codeRules:[
      (v) => !!v || "Code is required"
    ],
    stockRules:[
      (v) => v >= 0 || "Stock must be greater than 0"
    ],
    adModal: 0,
    adNombre: "",
    adID: "",
    adAccion: "",
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Create Product" : "Edit Product";
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
        .get("Articulos/Get")
        .then(function (response) {
          me.articulos = response.data;
          me.loading = false;
          //console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    ValueList() {
      let me = this;
      var catArray = [];
      axios
        .get("Categorias/GetValList")
        .then(function (response) {
          
          catArray = response.data;
          catArray.map(function (x) {
              me.categorias.push({text: x.name, value: x.id});
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    initialize() {},

    editItem(item) {
      this.idarticulo = item.idarticulo;
      this.codigo = item.codigo;
      this.idcategoria = item.idcategoria;
      this.nombre = item.nombre;
      this.stock = item.stock;
      this.precio_venta = item.precio_venta;
      this.editedIndex = 1;
      this.dialog = true;
    },

    ToggleStatus(accion, item) {
      this.adModal = 1;
      this.adNombre = item.nombre;
      this.adID = item.idarticulo;
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
        .post("Articulos/ToggleActivation/" + this.adID, {})
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
      this.idarticulo = "";
      this.codigo = "";
      this.idcategoria = "";
      this.nombre = "";
      this.precio_venta = 0;
      this.stock = 0;
      this.descripcion = "";
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
        console.log(me.precio_venta)
        axios
          .put("Articulos/Edit", {
            idarticulo: me.idarticulo,
            codigo: me.codigo,
            idcategoria: me.idcategoria,
            nombre: me.nombre,
            precio_venta: me.precio_venta,
            stock: me.stock,
            descripcion: me.descripcion
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
          .post("Articulos/Create", {
            codigo : me.codigo,
            idcategoria: me.idcategoria,
            nombre: me.nombre,
            precio_venta: me.precio_venta,
            stock: me.stock,
            descripcion: me.descripcion
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
