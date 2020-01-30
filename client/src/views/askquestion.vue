<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" >
      <b-form-group
        id="input-group-1"
        label="Question Title"
        label-for="input-1"
        description="Give descriptive title to your question"
      >
        <b-form-input
          id="input-1"
          v-model="title"
          type="text"
          required
          placeholder="Enter Title"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your Question:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="description"
          required
          placeholder="Enter question"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Tags:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="tags"
          placeholder="Enter tags"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
    name: 'askquestion',
    data(){
        return{
            title: '',
            description: '',
            tags: ''
        }
    },
    methods:{
        onSubmit(){},
        onReset(){}
    }
}
</script>

<style>

</style>