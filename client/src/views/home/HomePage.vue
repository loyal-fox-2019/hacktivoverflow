<template>
  <div>
    <TitlePage :title="'Top Questions'" />
    <div class="row">
      <div class="col-9">
        <QuestionCardList />
      </div>
    </div>
  </div>
</template>

<script>
import TitlePage from '@/components/TitlePage.vue';
import QuestionCardList from '@/components/questions/QuestionCardList.vue';

export default {
  name: 'HomePage',
  components: {
    TitlePage,
    QuestionCardList,
  },
  data() {
    return {};
  },
};
</script>

<style lang="css" scoped></style>
