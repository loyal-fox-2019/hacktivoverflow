<template>
  <div class="home">
    <b-container>
      <b-row>
        <b-col cols="2" style="font-size:12px;" class="text-left vh-100 p-0">
          <div class="sidebar ml-4">
            <p>
              <b-button
                variant="link"
                class="text-left text-decoration-none m-0 p-0"
                style="font-size:14px;"
              >
                Home
              </b-button>
            </p>
            <p>PUBLIC</p>
            <b-list-group>
              <b-button
                variant="link"
                squared
                style="font-size:14px;"
                class="text-left text-decoration-none"
                href="#"
                active
              >
                .catch(errorHandler)
              </b-button>
              <b-button
                variant="link"
                squared
                style="font-size:13px;"
                class="text-left text-decoration-none"
                href="#"
              >
                .catch(tags)
              </b-button>
              <b-button
                variant="link"
                squared
                style="font-size:13px;"
                class="text-left text-decoration-none"
                href="#"
              >
                .catch(users)
              </b-button>
            </b-list-group>
          </div>
        </b-col>
        <b-col
          cols="10"
          class="mt-5 pt-4"
          style="height: 2000px;border-left:2px solid lightgrey"
        >
          <b-row>
            <b-col class="text-left ml-3">
              <h2>All Catches</h2>
            </b-col>
            <b-col class="text-right">
              <b-button
                variant="primary"
                @click.prevent="askTry"
                style="font-size:13px;"
                class="p-2 shadow-sm"
              >
                Try Error
              </b-button>
            </b-col>
          </b-row>
          <b-row class="mt-4" style="border-bottom:2px solid lightgrey;">
            <b-col class="text-left text-dark ml-3">
              <span v-if="$store.state.questions.length > 1">tries</span>
              <span v-else-if="$store.state.questions.length === 1">try</span>
              <span v-else>All green, 0 Errors found</span>
            </b-col>
            <b-col>
              <b-button-group size="sm">
                <b-button
                  v-for="(btn, idx) in buttons"
                  :key="idx"
                  :pressed.sync="btn.state"
                  variant="outline-success"
                >
                  {{ btn.caption }}
                </b-button>
              </b-button-group>
              <p class="text-muted mt-2" style="font-size:11px;">
                Combined sort results are based on each sort category
              </p>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttons: [
        { caption: "Newest", state: true },
        { caption: "Votes", state: false },
        { caption: "Views", state: false },
        { caption: "Unanswered", state: false }
      ]
    };
  },
  methods: {
    askTry() {
      if (!this.isLogin) {
        this.$swal({
          title: "Error",
          text: "You must be logged in to ask question on ErrorHandler()",
          icon: "error",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ok, let me login"
        }).then(result => {
          if (result.value) {
            this.$router.push({ name: "login" });
          }
        });
      } else {
        this.$router.push({ name: "try" });
      }
    }
  },
  computed: {
    isLogin() {
      return this.$store.state.isLogin;
    }
  }
};
</script>

<style scoped>
.btn.text-left {
  color: grey;
}

.btn.text-left:hover {
  color: black;
}

.btn.text-left.active {
  color: black;
  border-right: 3px solid red;
  font-weight: bold;
}

.sidebar {
  margin-top: 5%;
  position: fixed;
}
</style>
