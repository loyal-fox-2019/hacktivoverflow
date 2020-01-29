<template>
  <div>
    <b-navbar type="light" variant="light" class="shadow-sm m-0 p-0">
      <b-container>
        <b-navbar-brand to="/">
          Error<span class="font-weight-bold text-success">Handler</span>()
        </b-navbar-brand>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item>
              <b-button size="sm" variant="outline-dark" class="mx-1">
                Login
              </b-button>
              <b-button size="sm" variant="primary" to="/register">
                Register
              </b-button>
            </b-nav-item>
            <!-- <b-nav-form>
            <b-form-input
              size="sm"
              class="mr-sm-2"
              placeholder="Search"
            ></b-form-input>
            <b-button size="sm" class="my-2 my-sm-0" type="submit"
              >Search</b-button
            >
          </b-nav-form> -->
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
nav {
  border-top: 3px solid red;
}
</style>
