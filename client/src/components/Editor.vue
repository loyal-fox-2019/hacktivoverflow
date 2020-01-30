<template>
<b-modal :id="ku_id" size="xl" title="Extra Large Modal" hide-footer>
  <v-form v-model="valid" @submit.prevent="editPOST" class="mx-auto">
    <v-container>
      <v-col

          class="mx-auto w-75"
        >
          <v-text-field
            v-model="title"
            :rules="nameRules"
            label="Title"
            required
          ></v-text-field>
        </v-col>

        <v-col
          class="mx-auto w-75"
        >
          <vue-editor v-model="content" required></vue-editor>
        </v-col>

        <v-col

          class="mx-auto w-75"
        >
            <b-form-tags v-model="tags" separator=" ,;" class="mb-2"></b-form-tags>
        </v-col>

        <v-col
        class="mx-auto w-75"
        >
        <v-btn medium color="dark" type="submit" :block="true">Submit edit</v-btn>
        </v-col>
    </v-container>
  </v-form>
  </b-modal>
</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
  name: 'FormQuestion',
  props: ['data', 'ku_id'],
  data () {
    return {
      valid: false,
      title: '',
      nameRules: [
        v => !!v || 'Title is required'
      ],
      content: '',
      tags: []
    }
  },
  components: {
    VueEditor
  },
  mounted () {
    console.log(this.data.title, 'data title')
    this.title = this.data.title
    this.content = this.data.content
    this.tags = this.data.tags
  },
  methods: {
    editPOST () {
      this.axios({
        method: 'patch',
        url: 'questions/' + this.data._id,
        data: {
          title: this.title,
          content: this.content,
          tags: this.tags
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('fetchAllQuestion')
          this.$router.push('/')
          this.title = ''
          this.content = ''
          this.tags = []
        }).catch((err) => {
          console.log(err.response.data.message)
          this.$store.commit('SET_ALERT', {
            message: err.response.data.message,
            variant: 'danger'
          })
        })
    }
  }
}

</script>
