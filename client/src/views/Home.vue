<template>
  <div class="container">
      <h3>All Questions</h3>
      <div class="row">
          <div class="col-md-3">
              <h6>jumla pertanyaan</h6>
          </div>
          <div class="col-md">
                <b-button-group>
                    <b-button>Newest</b-button>
                    <b-button>Oldest</b-button>
                    <b-button>Unanswered</b-button>
                    <b-button>Popular</b-button>
                </b-button-group>
          </div>
      </div>
      <div>
        <b-card no-body class="overflow-hidden" style="max-width: 100%;" align="left">
          <b-row no-gutters>
            <b-col md="2">
              <h6>upvote downvote</h6>
            </b-col>
            <b-col md="10">
              <b-card-body title="Horizontal Card">
                <b-card-text>
                  This is a wider card with supporting text as a natural lead-in to additional content.
                  This content is a little bit longer.
                </b-card-text>
              </b-card-body>
            </b-col>
          </b-row>
        </b-card>
      </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  }
}
</script>
