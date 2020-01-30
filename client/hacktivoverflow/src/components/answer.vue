<template>
  <div class="animated fadeInDown">
    <answerform v-if="editAnswerForm" @close="editAnswerForm = false" :data="data"></answerform>
    <b-row>
      <b-col offset="1" class="titleAnswer">
        <h5>title: {{data.title}}</h5>
        <b-button size="sm" variant="outline-dark" id="editQuest" class="editAnswer" @click.prevent="editAnswerForm = true" v-if="iconDelete">Edit</b-button>
      </b-col>
    </b-row>
      <b-row>
          <b-col cols="1" class="total">
              <p @click.prevent="upAnswer"><i class="far fa-arrow-alt-circle-up star"></i></p>
              <p class="num animated fadeIn">{{data.upvotes.length - data.downvotes.length}}</p>
              <p @click.prevent="downAnswer"><i class="far fa-arrow-alt-circle-down star"></i></p>
          </b-col>
          <b-col cols="11" class="descriptionAnswer">
              <p v-html="data.description"></p>
          </b-col>
      </b-row>
      <hr>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import answerform from '../components/answerForm'
export default {
  components: {
    answerform
  },
  props: ['data'],
  data () {
    return {
      editAnswerForm: false
    }
  },
  methods: {
    async upAnswer () {
      if (this.$store.state.login === true) {
        let input = {
          id: this.data._id,
          route: this.$route.params.id
        }
        await this.$store.dispatch('upAnswer', input)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please Login First'
        })
      }
    },
    async downAnswer () {
      if (this.$store.state.login === true) {
        let input = {
          id: this.data._id,
          route: this.$route.params.id
        }
        await this.$store.dispatch('downAnswer', input)
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please Login First'
        })
      }
    }
  },
  computed: {
    iconDelete () {
      if (this.data.owner === this.$store.state.userId) {
        return true
      } else {
        return false
      }
    }
  }

}
</script>

<style>
.descriptionAnswer{
  background: rgb(219, 240, 236)
}

div.titleAnswer{
  padding: 0%;
}
.editAnswer{
  position: absolute;
  z-index: 1;
  right: 0%;
}

</style>
