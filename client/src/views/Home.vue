<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list v-if="$store.state.isLogin">
        <v-list-item>
          <v-list-item-action class="text-center" style="width: 100%">
            <v-list-item-avatar class="mx-auto">
              <img :src="$store.state.user.profile_pic">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{$store.state.user.username}}</v-list-item-title>
              <!-- <v-list-item-subtitle>Apa gitu belum tahu</v-list-item-subtitle> -->
            </v-list-item-content>
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item>
          <v-list-item-action class="text-center" style="width: 100%">
            <!-- <v-list-item-avatar class="mx-auto">
              <img :src="$store.state.user.profile_pic">
            </v-list-item-avatar> -->
            <v-list-item-content>
              <v-list-item-title>Add to watched tags: </v-list-item-title>
              <!-- <v-list-item-subtitle>Apa gitu belum tahu</v-list-item-subtitle> -->
              <v-form id="form-tags" style="width: 100%; padding: 1em" @submit.prevent="addTags" class="d-flex flex-column justify-center align-center">
                <v-alert type="error" v-for="(error, i) in tagerrors" :key="i">
                  {{error}}
                </v-alert>
                <div class="d-flex flex-column justify-center" style="width: 95%">
                  <v-text-field v-model="tags" label="Tags (separated by space)"></v-text-field>
                </div>
                <div style="position: relative">
                  <v-btn color="success" class="my-5" style="position: relative; right:0" type="submit" form="form-tags">Add tags</v-btn>
                </div>
              </v-form>
            </v-list-item-content>
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link>
          <v-list-item-content>
              <v-list-item-title>Watched tags :</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item link v-for="(tag, i) in $store.state.user.tags" :key="i">
          <v-list-item-content style="position: relative">
              <v-chip
                color="green"
                label
                text-color="white"
              >
                <v-icon left>mdi-label</v-icon>
                <span class="mr-5">
                {{tag}}
                </span>
                <a style="position: absolute; right: 1em; z-index: 9" @click="remove(tag)"><v-icon>mdi-delete</v-icon></a>
              </v-chip>
            </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append v-if="$store.state.isLogin">
        <div class="pa-2">
          <v-btn block color="red" @click="logout">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="orange" dark style="z-index: 999">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title><a @click="toHome" style="display: flex; justify-content: center"><b>HackOverflow</b></a></v-toolbar-title>
      <v-spacer />
      <v-btn color="green" @click="toLogin" v-if="!$store.state.isLogin">Login</v-btn>
      <v-btn
        style="top: 35px"
        absolute
        dark
        fab
        top
        right
        color="pink"
        v-if="!showAdd && $store.state.isLogin"
        @click="showAdd = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        v-if="showAdd && $store.state.isLogin"
        @click="showAdd = false"
        style="top: 35px"
        absolute
        dark
        fab
        top
        right
        color="pink"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-expand-transition>
        <add-question v-show="showAdd" @hide-form="showAdd = false"/>
      </v-expand-transition>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import axios from '../config/api'
import AddQuestion from '../components/AddQuestion'
export default {
  name: 'Home',
  props: {
    source: String
  },
  components: {
    AddQuestion
  },
  data: () => ({
    drawer: null,
    showAdd: false,
    tagerrors: [],
    tags: ''
  }),
  methods: {
    remove (payload) {
      axios({
        method: 'patch',
        url: `/users/removeTag`,
        data: {
          tag: payload
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: 'Remove tag success',
            showConfirmButton: false,
            timer: 1500
          })
          this.tags = ''
          this.$store.dispatch('fetchUser')
        })
        .catch(err => {
          this.tagerrors = err.response.data.message
        })
    },
    addTags () {
      this.tagerrors = []
      axios({
        method: 'patch',
        url: `/users/addTags`,
        data: {
          tags: this.tags.split(' ')
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          this.$swal({
            position: 'top-end',
            icon: 'success',
            title: 'Add tag success',
            showConfirmButton: false,
            timer: 1500
          })
          this.tags = ''
          this.$store.dispatch('fetchUser')
        })
        .catch(err => {
          this.tagerrors = err.response.data.message
        })
    },
    toHome () {
      this.$store.dispatch('fetchQuestions')
      this.$router.currentRoute.name !== 'questions' && this.$router.replace({ name: 'questions' })
    },
    toLogin () {
      this.$router.push('/login')
    },
    logout () {
      this.$store.commit('SET_LOGOUT')
      this.$store.commit('CLEAR_USER')
      this.$router.push('/login')
      this.$gAuth.signOut()
      localStorage.clear()
    }
  },
  created () {
    this.$store.commit('FETCH_QUESTIONS', [])
    this.$store.dispatch('fetchQuestions')
  }
}
</script>
