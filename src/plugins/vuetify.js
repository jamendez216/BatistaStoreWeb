import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#1FAB89',
        secondary: '#62D2A2',
        third: "9df3c4",
        menu: "D7FBE8",
        accent: '#a82ffc',
        error: '#d189ff',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
        white: "FFFFFF"
      },
    },
  },
  icons: {
    iconfont: 'md',
  },
});
