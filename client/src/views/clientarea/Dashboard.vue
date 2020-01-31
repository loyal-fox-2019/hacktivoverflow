<template>
  <div class="mt-3">
    <b-tabs content-class="mt-3">
      <b-tab title="Questions" active><p> <QuestionTable /> </p></b-tab>
      <b-tab title="Answers"><p>I'm the second tab</p></b-tab>
      <b-tab title="Tags"><p>I'm a disabled tab!</p></b-tab>
    </b-tabs>
  </div>
</template>

<script>
import QuestionTable from '@/components/questions/QuestionTable.vue';

export default {
  name: 'Dashboard',
  components: {
    QuestionTable,
  },
  data() {
    return {};
  },
};
</script>

<style lang="css" scoped></style>
