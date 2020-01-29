<template>
  <div>
    <section id="card" :style="followed" class="mb-2">
      <div id="votes">
        <b-button
        @click="upvotes"
        variant="outline-primary" class="mb-2">
        <b-icon-chevron-up></b-icon-chevron-up>
        </b-button><br>
        <b-button
        @click="downvotes"
        variant="outline-primary">
        <b-icon-chevron-down></b-icon-chevron-down>
        </b-button>
      </div>
      <div id="detail" class="ml-4">
        <router-link :to="`/questions/${question._id}`">
          <h3 class="margin: 0; padding: 0;" @click="open(question._id)">
            <strong>{{question.title}}</strong>
          </h3>
        </router-link>
        <b-collapse :id="question._id" class="mt-2">
          <section id="main-content">
            <p v-html="question.description"></p>
          </section>
          <hr>
          <section id="comment">
            <!-- Create answer -->
            <b-form-input v-model="titleAnswer" placeholder="Title..."
            class="mb-2"
            ></b-form-input>
            <wysiwyg v-model="descriptionAnswer" id="w-answer"/>
            <div class="text-right mt-2">
              <b-button @click="publishAnswer"
              variant="outline-primary">Publish Answer</b-button>
            </div>
            <hr>
            <!-- List comment -->
            <h4 style="text-align: center;">Answer</h4>
            <b-card
            v-for="(question, i) in answers" :key="i"
            border-variant="dark"
            :header="question.userId.username" align="center">
              <h5>Title: {{question.title}}</h5>
              <b-card-text v-html="question.description"/>
              <div class="text-center">
                  <b-button variant="outline-primary"
                  @click="answerUp(question._id)"
                  ><b-icon-chevron-up class="answervote"/>
                  {{answersvotes(question.upvotes)}}</b-button>
                  <b-button @click="answerDown(question._id)"
                  variant="outline-primary">{{answersvotes(question.downvotes)}}
                  <b-icon-chevron-down class="answervote"/></b-button>
              </div>
            </b-card>
            <hr>
          </section>
        </b-collapse>
        Tags: <em>{{ getTags }}</em> <br>
        Upvotes: {{ getupvotes }}, <br>
        Downvotes: {{ getdownVotes }} <br>
        <strong>Asked by:</strong> {{ question.userId.username }}
      </div>
    </section>
  </div>
</template>

<script>
import axios from '../config/server';

export default {
  name: 'card',
  props: {
    question: {
      type: Object,
    },
  },
  data() {
    return {
      message: 'Hello world',
      titleAnswer: '',
      descriptionAnswer: '',
      followed: 'background-color: white;',
      answers: [],
    };
  },
  methods: {
    answersvotes(answer) {
      if (!answer) {
        return 0;
      }
      return answer;
    },
    async answerUp(id) {
      try {
        await axios.patch(`/answer/${id}/upvotes`, null, { headers: { token: localStorage.getItem('token') } });
        this.$swal('Thankyou for contibuting :)');
        this.getAnswers();
      } catch (err) {
        if (!err.response.data.errors.join(',')) {
          this.$swal('Oppss... something when wrong!');
        } else {
          this.$swal(err.response.data.errors.join(','));
        }
      }
    },
    async answerDown(id) {
      try {
        await axios.patch(`/answer/${id}/downvotes`, null, { headers: { token: localStorage.getItem('token') } });
        this.$swal('Thankyou for contibuting :)');
        this.getAnswers();
      } catch (err) {
        if (!err.response.data.errors.join(',')) {
          this.$swal('Oppss... something when wrong!');
        } else {
          this.$swal(err.response.data.errors.join(','));
        }
      }
    },
    async getAnswers() {
      try {
        const { _id } = this.question;
        const response = await axios
          .get(`/questions/${_id}/answer`);
        const { data } = response;
        this.answers = data;
      } catch (err) {
        this.$swal('Oppss... something went wrong');
      }
    },
    async publishAnswer() {
      if (!localStorage.getItem('token')) {
        this.$swal('You have to login');
      } else if (!this.titleAnswer || !this.descriptionAnswer) {
        this.$swal('Please fill title and description!');
      } else {
        try {
          const { _id } = this.question;
          const doc = {
            title: this.titleAnswer,
            description: this.descriptionAnswer,
          };
          await axios.post(`/questions/${_id}/answer`, doc, { headers: { token: localStorage.getItem('token') } });
          this.getAnswers();
          this.$swal('Answer posted!');
        } catch (err) {
          this.$swal('Oppss... something went wrong');
        }
      }
    },
    getVotes(value) {
      if (!value) {
        return 0;
      }
      return value;
    },
    open(value) {
      this.$root.$emit('bv::toggle::collapse', value);
    },
    // getTags(tags) {
    //   if (!tags) {
    //     return '';
    //   }
    //   return tags.join(',');
    // },
    async downvotes() {
      if (!this.$store.state.isLogged) {
        this.$swal('You have login');
      } else {
        const { _id } = this.question;
        try {
          await axios.patch(`/questions/${_id}/downvotes`, null, { headers: { token: localStorage.getItem('token') } });
          this.$store.dispatch('fetchData');
        } catch (err) {
          this.$swal(err.response.data.errors[0]);
        }
      }
    },
    async upvotes() {
      if (!this.$store.state.isLogged) {
        this.$swal('You have login');
      } else {
        const { _id } = this.question;
        try {
          await axios.patch(`/questions/${_id}/upvotes`, null, { headers: { token: localStorage.getItem('token') } });
          this.$store.dispatch('fetchData');
        } catch (err) {
          console.log(err.response);
          this.$swal(err.response.data.errors[0]);
        }
      }
    },
  },
  created() {
    this.getAnswers();
    let isFollowed = false;
    for (let i = 0; i < this.$store.state.tags.length; i += 1) {
      for (let j = 0; j < this.question.tags.length; j += 1) {
        if (this.$store.state.tags[i] === this.question.tags[j]) {
          isFollowed = true;
        }
      }
    }
    console.log(isFollowed);
    if (isFollowed) {
      this.followed = 'background-color: yellow;';
    }
  },
  computed: {
    getTags() {
      if (!this.question.tags) {
        return '';
      }
      return this.question.tags.join(',');
    },
    getdownVotes() {
      if (!this.question.downvotes) {
        return 0;
      }
      return this.question.downvotes;
    },
    getupvotes() {
      if (!this.question.upvotes) {
        return 0;
      }
      return this.question.upvotes;
    },
  },
};
</script>

<style scoped>
#card {
  display: inline-flex;
  width: 100%;
  border: 1px solid black;
  padding: 1em;
  border-radius: 1em;
  height: 20%;
}
#votes {
  margin-top: 2%
}
#w-answer {
  height: 30vh;
}
</style>
