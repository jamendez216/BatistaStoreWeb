<template>
  <v-app id="inspire">
    <v-navigation-drawer  clipped="$vuetify.breakpoint.mdAndUp" app v-model="drawer">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <v-list-tile-action>
              <v-icon large>home</v-icon>
            </v-list-tile-action>
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
            :key="submenu.title">
            <v-list-item-content>
              <v-list-item-title v-text="submenu.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app :clipped-left="$vuetify.breakpoint.mdAndUp" fixed color="secondary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title><h2>Inventario Batista</h2></v-toolbar-title>
    </v-app-bar>

    <v-main>
      <!--  -->
    </v-main>
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
                    { title: 'Categorías'}, 
                    { title: 'Productos'}
                  ],
          title: 'Almacén'
        },
        {
          action: 'savings',
          submenu: [
                    { title: 'Ingresos' }, 
                    { title: 'Proveedores'}
                  ],
          title: 'Compras'
        },
        {
          action: 'payment',
          submenu: [
                    { title: 'Ventas' }, 
                    { title: 'Clientes'}
                  ],
          title: 'Ventas'
        },
        {
          action: 'assignment_ind',
          submenu: [
                  { title: 'Usuarios'}, 
                  { title: 'Roles'},
                  ],
          title: 'Accesos'
        },
      ]
    }
  }
}
</script>

