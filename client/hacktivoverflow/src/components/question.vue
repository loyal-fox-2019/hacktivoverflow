<template>
  <b-row class="animated fadeInDown">
      <b-col cols="2" class="box">
        <br>
          <p style="text-align: center;">{{votes}}</p>
          <p style="text-align: center;"> Votes</p>
      </b-col>
      <b-col cols="10">
        <router-link :to="'/detail/' + data._id" class="detail">
          <b-row>
              Question: {{data.title}}
          </b-row>
          <b-row>
          </b-row>
          <b-row>
              <span v-for="(tag, i) in data.tag" :key="i">
                <router-link :to="'/tag/' + tag">
                  <b-button pill variant="info">{{tag}}</b-button>
                </router-link>
              </span>
          </b-row>
          <b-row class="asker">
              asked {{new Date(data.created).toDateString()}} by {{data.owner.firstName}}
          </b-row>
          <hr>
          <br>
        </router-link>
      </b-col>
  </b-row>
</template>

<script>
export default {
  props: ['data'],
  computed: {
    votes () {
      let up = this.data.upvotes.length
      let down = this.data.downvotes.length
      let sum = Number(up) - Number(down)
      return sum
    }
  },
  methods: {
  }
}
</script>

<style>
.asker{
  position: relative;
  float: right;
}

.detail{
  text-decoration: none;
  color: black
}

.fa-trash{
  font-size: 20px;
  cursor: pointer;
}

.fa-trash:hover{
  color: red;
  transform: scale(1.2);
  transition: 500ms
}

.box{
  font-size: 20px;
}

</style>
