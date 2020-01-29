<template>
  <b-modal id="modal-delete" title="Delete question" hide-footer size="sm">
    <p class="card-title">Are you sure, want to delete this question!</p>
    <div class="">
      <button class="btn btn-sm mr-3 btn-outline-dark" @click="$bvModal.hide('modal-delete')">
        No
      </button>
      <button class="btn btn-sm btn-dark" @click="deleteQuestion($route.params.slug)">
        Yes, delete it
      </button>
    </div>
  </b-modal>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'ModalDelete',

  data() {
    return {};
  },
  methods: {
    ...mapActions('Question', ['deleteQuestion']),
  },
};
</script>

<style lang="css" scoped></style>
