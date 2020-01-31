<template>
  <div>
    <TitlePage :title="'Top Questions'" />
    <div class="row">
      <div class="col-9">
        <QuestionCardList v-for="question in questions" :key="question._id" :item="question" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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
  computed: {
    ...mapState('Question', ['questions']),
  },
  methods: {
    ...mapActions('Question', ['getQuestions']),
  },
  created() {
    this.getQuestions();
  },
};
</script>

<style lang="css" scoped></style>
