<template>
  <div>
    <TitlePage :title="'Ask a public question'" :button="false"> </TitlePage>
    <div class="row">
      <div class="col-9">
        <div class="card rounder">
          <div class="card-body">
            <form>
              <div class="form-group">
                <label for="title">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="title"
                  placeholder="e.g. How to set baseUrl Vue?"
                />
              </div>
              <div class="form-group">
                <label for="body">Body</label>
                <TextEditor />
              </div>
              <div class="form-group">
                <label for="tags">Tags</label>
                <input
                  type="text"
                  class="form-control"
                  id="tags"
                  placeholder="e.g. (node.js django xcode)"
                />
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
import TitlePage from '@/components/TitlePage.vue';
import TextEditor from '@/components/questions/TextEditor.vue';

export default {
  name: 'askQuestion',
  components: {
    TitlePage,
    TextEditor,
  },
  data() {
    return {};
  },
};
</script>

<style lang="css" scoped></style>
