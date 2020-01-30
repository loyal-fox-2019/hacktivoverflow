<template>
  <div>
    <b-button class="my-3" @click='moveTo("/post")' variant='info'>Post new question</b-button>
    <div class="row w-100">
      <div class='col-md-2 ml-3'>
        <b-form @submit.prevent='addTag'>
          <b-form-group label='Watched Tags'>
            <input class='w-100' style='font-size: 80%;' 
            type="text" placeholder="Press enter to add" v-model='tag'>
          </b-form-group>
        </b-form>
        <b-card v-if='tags.length > 0'>
          <b-card-text v-for='(tag, i) in tags' :key='i'>
            {{tag}} <span @click='removeTag(tag)'>X</span>
          </b-card-text>
        </b-card>
      </div>
      <QuestionCard class='col-md-8' v-for='question in questions' 
      :key='question._id' :question='question'/>
    </div>
  </div>
</template>

<script>
import QuestionCard from '../components/QuestionCard.vue'
export default {

  name: 'Home',
  components: {
    QuestionCard
  },
  data () {
    return {
      tag: ''
    }
  },
  methods: {
    moveTo(route){
      this.$router.push(route)
    },
    addTag(){
      if (this.tag != ''){
        this.$store.dispatch('ADD_USER_TAG', this.tag)
        this.tag = ''
      }
    },
    removeTag(tag){
      this.$store.dispatch('REMOVE_USER_TAG', tag)
    }
  },
  computed: {
    questions(){
      return this.$store.state.questions
    },
    tags(){
      return this.$store.state.watchedTags
    }
  },
  created(){
    this.$store.dispatch('GET_QUESTION')
  }
}
</script>

<style lang="css" scoped>
span{
  cursor: pointer;
}
</style>