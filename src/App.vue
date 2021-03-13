<template>
  <v-app id="inspire">
    <v-navigation-drawer  clipped app v-model="drawer">
      <v-list-item to="/" >
        <v-list-item-content>
          <v-list-item-title class="title">
            <v-list-item-action>
              <v-icon large>home</v-icon>
            </v-list-item-action>
            Inicio
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list>
        <v-list-group
        v-for="item in Menu"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="submenu in item.submenu"
            :key="submenu.title" v-bind:to="submenu.action">
            <v-list-item-content>
              <v-list-item-title v-text="submenu.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left fixed color="secondary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title><h2>Inventario Batista</h2></v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid fill-height>
        <v-slide-y-transition mode="out-in">
          <router-view/>
        </v-slide-y-transition>
      </v-container>
    </v-content>

  </v-app>
</template>

<script>
  export default {
  name: 'App',
  data: () => {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
      Menu: [
        {
          action: 'storefront',
          submenu: [
                    { title: 'Categorías', action: 'categorias'}, 
                    { title: 'Productos', action: 'productos'}
                  ],
          title: 'Almacén'
        },
        {
          action: 'savings',
          submenu: [
                    { title: 'Ingresos', action: 'ingresos'}, 
                    { title: 'Proveedores', action: 'proveedores'}
                  ],
          title: 'Compras'
        },
        {
          action: 'payment',
          submenu: [
                    { title: 'Ventas', action: 'ventas' }, 
                    { title: 'Clientes', action: 'clientes'}
                  ],
          title: 'Ventas'
        },
        {
          action: 'assignment_ind',
          submenu: [
                  { title: 'Usuarios', action: 'usuarios'}, 
                  { title: 'Roles', action: 'roles'},
                  ],
          title: 'Accesos'
        },
      ]
    }
  }
}
</script>

