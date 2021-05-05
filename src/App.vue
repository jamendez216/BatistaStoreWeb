<template>
  <v-app id="inspire">
    <v-navigation-drawer clipped app v-model="drawer">
      <v-list-item to="/">
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

          <v-list-item
            v-for="submenu in item.submenu"
            :key="submenu.title"
            v-bind:to="submenu.action"
          >
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

    <v-main>
      <v-container fluid fill-height>
        <v-slide-y-transition mode="out-in">
          <router-view />
        </v-slide-y-transition>
      </v-container>
    </v-main>

    <v-card width="100%">
      <v-footer flat fixed absolute>
        <v-card flat tile width="100%" class="text-center text-align-center">
          <v-card-text>
            <v-icon>work</v-icon>
            <strong> jamendez216@gmail.com</strong> —
            <v-icon>update</v-icon>
            <a href="https://github.com/jamendez216">
              github.com/jamendez216</a
            >
            —
            <v-icon>call</v-icon>
            809-654-6980 —
            <v-icon>person</v-icon>
            <a href="https://www.linkedin.com/in/jose-armando-mendez-espinal-23b2b7168/">
            linkedin.com/josemendez/</a
            >
          </v-card-text>

          <v-divider></v-divider>
          <v-card-text>
            {{ new Date().getFullYear() }} — <strong>Mendez' Solutions</strong>
          </v-card-text>
        </v-card>
      </v-footer>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
      items: [
        {
          icon: "bubble_chart",
          title: "Inspire",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
      Menu: [
        {
          action: "storefront",
          submenu: [
            { title: "Categorías", action: "categorias" },
            { title: "Productos", action: "articulos" },
          ],
          title: "Almacén",
        },
        {
          action: "savings",
          submenu: [
            { title: "Ingresos", action: "ingresos" },
            { title: "Proveedores", action: "proveedores" },
          ],
          title: "Compras",
        },
        {
          action: "payment",
          submenu: [
            { title: "Ventas", action: "ventas" },
            { title: "Clientes", action: "clientes" },
          ],
          title: "Ventas",
        },
        {
          action: "assignment_ind",
          submenu: [
            { title: "Usuarios", action: "usuarios" },
            { title: "Roles", action: "roles" },
          ],
          title: "Accesos",
        },
      ],
      padless: false,
      variant: "default",
    };
  },
};
</script>

