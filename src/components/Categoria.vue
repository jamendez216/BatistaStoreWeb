<template>
  <div>
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          Conoce a tu jevita
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">
          Sacala a pasear
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3"> No se bro disculpa </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <image id="imagen1" src="" />

          <v-btn color="primary" @click="e1 = 2"> Continue </v-btn>

          <v-btn text>Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <image id="imagen2" src="" />

          <v-btn color="primary" @click="e1 = 3"> Continue </v-btn>

          <v-btn text> Cancel </v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <image id="imagen3" src="" />

          <v-btn color="primary" @click="e1 = 1"> Continue </v-btn>

          <v-btn text> Cancel </v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
export default {
  data() {

  },
  mounted() {
    fetch(
      "https://api.unsplash.com/photos/random/?client_id=J6_Hfxs_rnT0t5T6W0Edl6qMHVKSQwbFWC4hoWhczeg"
    )
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        document.getElementById("imagen1").src = resJson.urls.raw;
      });
    fetch(
      "https://api.unsplash.com/photos/random/?client_id=J6_Hfxs_rnT0t5T6W0Edl6qMHVKSQwbFWC4hoWhczeg"
    )
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        document.getElementById("imagen2").src = resJson.urls.raw;
      });
    fetch(
      "https://api.unsplash.com/photos/random/?client_id=J6_Hfxs_rnT0t5T6W0Edl6qMHVKSQwbFWC4hoWhczeg"
    )
      .then((res) => res.json())
      .then((resJson) => {
        console.log(resJson);
        document.getElementById("imagen3").src = resJson.urls.raw;
      });
  },
};
</script>
