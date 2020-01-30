<template>
  <v-form v-model="valid">
    <v-container>
      <v-col
          cols="12"
          md="10"
        >
          <v-text-field
            v-model="title"
            :rules="nameRules"
            label="Title"
            required
          ></v-text-field>
        </v-col>

        <v-col
          cols="12"
          md="10"
        >
          <vue-editor v-model="content"></vue-editor>
        </v-col>

        <v-col
          cols="12"
          md="10"
        >
            <b-form-tags v-model="tags" class="mb-2"></b-form-tags>
        </v-col>
    </v-container>
  </v-form>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  name: 'FormQuestion',
  data () {
    return {
      valid: false,
      title: '',
      nameRules: [
        v => !!v || 'Title is required',
        v => v.length > 10 || 'Title must be more than 10 characters'
      ],
      content: '',
      tags: []
    }
  },
  components: {
    VueEditor
  }
}
</script>

<style>

</style>
