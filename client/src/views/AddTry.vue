<template>
  <div class="login vh-100 d-flex justify-content-center align-items-center">
    <b-container class="h-75 d-flex justify-content-center align-items-center">
      <b-row class="w-100 justify-content-center">
        <b-col cols="8">
          <h2 class="text-left mb-4">Add a public try</h2>
          <add-edit-form></add-edit-form>
        </b-col>
        <b-col cols="3">
          <accordion-tips></accordion-tips>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import AddEditForm from "@/components/AddEditForm.vue";
import AccordionTips from "@/components/AccordionTips.vue";

export default {
  components: {
    AddEditForm,
    AccordionTips
  },
  data() {
    return {
      registerData: null,
      userState: null,
      dissmissableAlert: true
    };
  },
  watch: {
    $route(to) {
      this.userState = to.name;
    }
  }
};
</script>

<style scoped>
* {
  background-color: #eff0f1;
}
</style>
