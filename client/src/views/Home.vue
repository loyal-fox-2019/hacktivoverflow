<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link>
          <v-list-item-action class="text-center" style="width: 100%">
            <v-list-item-avatar class="mx-auto">
              <img src="https://randomuser.me/api/portraits/men/81.jpg">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Nama User</v-list-item-title>
              <v-list-item-subtitle>Apa gitu belum tahu</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item-action>
        </v-list-item>
        <v-divider></v-divider>
        <v-list-item link>
          <v-list-item-content>
              <v-list-item-title>Watched tags :</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
              <v-chip
                class="ma-2"
                color="pink"
                label
                text-color="white"
              >
                <v-icon left>mdi-label</v-icon>
                Javascript
              </v-chip>
            </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
              <v-chip
                class="ma-2"
                color="pink"
                label
                text-color="white"
              >
                <v-icon left>mdi-label</v-icon>
                Node
              </v-chip>
            </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
              <v-chip
                class="ma-2"
                color="pink"
                label
                text-color="white"
              >
                <v-icon left>mdi-label</v-icon>
                Vue
              </v-chip>
            </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <div class="pa-2">
          <v-btn block color="red" @click="logout">Logout</v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <v-app-bar app color="orange" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>HackOverflow</v-toolbar-title>
      <v-spacer />
      <v-btn
        style="top: 35px"
        absolute
        dark
        fab
        top
        right
        color="pink"
        v-if="!showAdd"
        @click="showAdd = true"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-btn
        v-if="showAdd"
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
        <add-question v-show="showAdd"/>
      </v-expand-transition>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
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
    showAdd: false
  }),
  methods: {
    logout () {
      this.$router.push('/login')
      localStorage.clear()
    }
  }
}
</script>
