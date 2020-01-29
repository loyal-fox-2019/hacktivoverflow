<template>
  <div>
    <TitlePage :title="title" :button="false"> </TitlePage>
    <div class="row">
      <div class="col-9">
        <div class="card rounder">
          <div class="card-body">
            <form @submit.prevent="!isUpdate ? createQuestion(form) : updateQuestion(form)">
              <div class="form-group">
                <label for="title">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="e.g. How to set baseUrl Vue?"
                  v-model="form.title"
                />
              </div>
              <div class="form-group">
                <label for="body">Body</label>
                <vue-editor v-model="form.content"></vue-editor>
              </div>
              <div class="form-group">
                <label for="tags">Tags</label>
                <b-form-select
                  v-model="form.tags"
                  :options="nTags"
                  multiple
                  :select-size="4"
                ></b-form-select>
              </div>
              <button type="submit" class="btn btn-primary">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { VueEditor } from 'vue2-editor';
import TitlePage from '@/components/TitlePage.vue';

export default {
  name: 'askQuestion',
  components: {
    TitlePage,
    VueEditor,
  },
  data() {
    return {
      form: {
        title: '',
        content: '',
        tags: [],
      },
      nTags: [],
      title: 'Ask a public question',
      isUpdate: false,
    };
  },
  computed: {
    ...mapState('Tag', ['tags']),
    ...mapState('Question', ['question']),
  },
  methods: {
    ...mapActions('Tag', ['getTags']),
    ...mapActions('Question', ['createQuestion', 'getQuestion', 'updateQuestion']),
  },
  watch: {
    tags(val) {
      const tags = [];
      if (val) {
        for (let i = 0; i < val.length; i += 1) {
          tags.push({
            text: val[i].name,
            value: val[i]._id,
          });
        }
        this.nTags = tags;
      }
    },
    question(val) {
      if (val) {
        this.form = {
          _id: val._id,
          title: val.title,
          content: val.content,
          tags: val.tags,
          slug: val.slug,
        };
      }
    },
  },
  created() {
    this.getTags();
    const route = this.$route;
    if (route.name === 'updateQuestion') {
      this.title = 'Update a question';
      this.isUpdate = true;
      this.getQuestion(`slug/${route.params.slug}`);
    }
  },
};
</script>

<style lang="css" scoped></style>
