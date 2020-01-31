<template>
  <div>
    <div v-if="question.author">
      <TitlePage :title="question.title" :btnUpdate="true">
        <div class="border-bottom">
          <span style="font-size:12px;">
            <font class="text-muted">Asked</font>: {{ question.created_at }}
          </span>
          <span style="font-size:12px;">
            <font class="text-muted">Viewed</font>: {{ question.views }} times
          </span>
        </div>
      </TitlePage>
      <div class="row mt-3">
        <div class="col-9">
          <div class="row">
            <div class="col-1" style="font-size: 2rem">
              <Vote :vote="totalVote" :isVote="isVote" />
            </div>
            <div class="col-11">
              <Content :content="question.content" :tags="question.tags" />
              <div class="mt-3">
                <span
                  class="float-left"
                  style="font-size:12px; cursor: pointer"
                  v-if="userLogin === question.author.email"
                >
                  <router-link
                    :to="{ name: 'updateQuestion', params: { slug: question.slug } }"
                    class="text-muted"
                    >edit</router-link
                  >
                  <font class="text-muted ml-2" @click="$bvModal.show('modal-delete')">delete</font>
                </span>
                <span class="float-right" style="font-size:12px;">
                  <font class="text-muted">Author</font>: {{ question.author.fullname }}
                </span>
              </div>
            </div>
          </div>
          <div class="subheader mt-3">
            <h2 style="font-size: 18px;">{{ totalAnswer }} Answers</h2>
            <hr />
          </div>
          <template v-if="totalAnswer">
            <div class="row" v-for="answer in question.answers" :key="answer._id">
              <div class="col-1" style="font-size: 2rem">
                <!-- <Vote :vote="0" /> -->
              </div>
              <div class="col-11">
                <Content :content="answer.content" />
                <div class="mt-3">
                  <span
                    class="float-left"
                    style="font-size:12px; cursor: pointer"
                    v-if="userLogin === answer.author.email"
                  >
                    <font class="text-muted" @click="preGetComment(answer._id)">edit</font>
                  </span>
                  <span class="float-right" style="font-size:12px;">
                    <font class="text-muted">Answered by</font>: {{ answer.author.fullname }}
                  </span>
                </div>
              </div>
              <div class="col-12">
                <hr />
              </div>
            </div>
          </template>
          <template v-if="$store.state.isLogin">
            <div class="subheader mt-3">
              <h2 style="font-size: 18px;">Your answer</h2>
              <hr />
            </div>
            <div>
              <CommentEditor :questionId="question._id" />
            </div>
          </template>
        </div>
        <div class="col-3"></div>
      </div>
      <ModalDelete />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import TitlePage from '@/components/TitlePage.vue';
import Vote from '@/components/questions/Vote.vue';
import Content from '@/components/questions/Content.vue';
import CommentEditor from '@/components/questions/CommentEditor.vue';
import ModalDelete from '@/components/questions/ModalDelete.vue';

export default {
  name: 'QuestionDetail',
  components: {
    TitlePage,
    Vote,
    Content,
    CommentEditor,
    ModalDelete,
  },
  data() {
    return {
      userLogin: localStorage.getItem('stuckoverlow.email'),
    };
  },
  computed: {
    ...mapState('Question', ['question']),
    totalVote() {
      if (this.question.upvote) {
        if (this.question.upvote.length >= this.question.downvote.length) {
          return this.question.upvote.length;
        }
      }
      if (this.question.downvote) {
        return this.question.downvote.length * -1;
      }
      return 0;
    },
    totalAnswer() {
      if (this.question.answers) {
        return this.question.answers.length;
      }
      return 0;
    },
    isVote() {
      const { upvote } = this.question;
      const { downvote } = this.question;
      if (upvote) {
        for (let i = 0; i < upvote.length; i += 1) {
          if (upvote[i].email === localStorage.getItem('stuckoverlow.email')) {
            return 'up';
          }
        }
      }

      if (downvote) {
        for (let i = 0; i < downvote.length; i += 1) {
          if (downvote[i].email === localStorage.getItem('stuckoverlow.email')) {
            return 'down';
          }
        }
      }
      return false;
    },
  },
  methods: {
    ...mapActions('Question', ['getQuestion', 'updateViews']),
    ...mapActions('Comment', ['getComment']),
    ...mapMutations('Comment', ['SET_ISUPDATE']),
    preGetComment(id) {
      this.getComment({
        questionId: this.question._id,
        _id: id,
      });
      this.SET_ISUPDATE(true);
      this.scroll();
    },
    scroll() {
      window.scrollBy(0, 9999999);
    },
  },
  created() {
    const { slug } = this.$route.params;
    this.getQuestion(`slug/${slug}`);
    this.updateViews(slug);
  },
};
</script>

<style lang="css" scoped></style>
