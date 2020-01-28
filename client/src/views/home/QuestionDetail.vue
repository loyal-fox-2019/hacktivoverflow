<template>
  <div>
    <TitlePage :title="'Lorem ipsum'">
      <div class="border-bottom">
        <span style="font-size:12px;"> <font class="text-muted">Asked</font>: Today </span>
        <span style="font-size:12px;"> <font class="text-muted">Viewed</font>: 5 times </span>
      </div>
    </TitlePage>
    <div class="row mt-3">
      <div class="col-9">
        <div class="row">
          <div class="col-1" style="font-size: 2rem">
            <Vote />
          </div>
          <div class="col-11">
            <Content />
          </div>
        </div>
        <div class="subheader mt-3">
          <h2 style="font-size: 18px;">6 Answers</h2>
          <hr />
        </div>
        <div class="row">
          <div class="col-1" style="font-size: 2rem">
            <Vote />
          </div>
          <div class="col-11">
            <Content />
          </div>
        </div>
        <hr />
        <div class="subheader mt-3">
          <h2 style="font-size: 18px;">Your answer</h2>
          <hr />
        </div>
        <div>
          <TextEditor />
        </div>
      </div>
      <div class="col-3"></div>
    </div>
  </div>
</template>

<script>
import TitlePage from '@/components/TitlePage.vue';
import Vote from '@/components/questions/Vote.vue';
import Content from '@/components/questions/Content.vue';
import TextEditor from '@/components/questions/TextEditor.vue';

export default {
  name: 'QuestionDetail',
  components: {
    TitlePage,
    Vote,
    Content,
    TextEditor,
  },
  data() {
    return {};
  },
};
</script>

<style lang="css" scoped></style>
