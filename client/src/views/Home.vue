<template>
  <div class="home">
    <b-container>
      <b-row>
        <b-col
          cols="2"
          style="font-size:12px;"
          class="text-left vh-100 p-0 mt-5"
        >
          <div class="sidebar">
            <p>
              <b-button
                variant="link"
                class="text-left text-decoration-none m-0 p-0"
                style="font-size:14px;"
                :to="{ name: 'try list' }"
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
                to="/"
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
        <router-view></router-view>
      </b-row>
    </b-container>
  </div>
</template>

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
