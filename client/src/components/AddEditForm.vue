<template>
  <div>
    <b-form @submit.prevent="save">
      <b-card class="mb-2 shadow-sm text-left" style="font-size:14px;">
        <b-card-text class="text-left">
          <b-form-group
            class="font-weight-bold"
            id="input-title"
            label="Title"
            description="Be specific and imagine you’re asking a question to another person"
            label-for="title"
          >
            <b-form-input
              id="title"
              v-model="form.title"
              type="text"
              required
              placeholder="e.g. Why connecting to mongodb atlas using hotspot is not working?"
            ></b-form-input>
          </b-form-group>

          <div class="font-weight-bold mb-1">
            Body
          </div>
          <vue-editor v-model="form.body" />
          <span class="text-muted font-weight-light" style="font-size:12px;">
            Include all the information someone would need to answer your
            question
          </span>
          <hr />
          <b-form-group
            id="input-tags"
            label="Tags"
            description="Add tags to describe what your question is about, separated by comma with no space"
            label-for="tags"
            class="mt-4 font-weight-bold"
          >
            <b-form-input
              id="tags"
              v-model="form.tags"
              type="text"
              placeholder="e.g. javascript,node.js,express,bcrypt,jwt,mongoose,mongodb"
            ></b-form-input>
          </b-form-group>
        </b-card-text>
      </b-card>
      <div class="text-left mt-4">
        <b-button type="submit" variant="info" size="sm" class="shadow-sm">
          catch(this.error)
        </b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
// import axios from "axios";
// import Swal from "sweetalert2";
import { VueEditor } from "vue2-editor";

// const Toast = Swal.mixin({
//   toast: true,
//   position: "top-end",
//   showConfirmButton: false,
//   timer: 3000,
//   timerProgressBar: true,
//   onOpen: toast => {
//     toast.addEventListener("mouseenter", Swal.stopTimer);
//     toast.addEventListener("mouseleave", Swal.resumeTimer);
//   }
// });

export default {
  components: {
    VueEditor
  },
  data() {
    return {
      form: {
        title: null,
        body: null,
        tags: null
      }
    };
  },
  methods: {
    save() {
      console.log(this.form);
    }
  }
};
</script>

<style scoped>
input::placeholder {
  font-size: 12px;
}
</style>
