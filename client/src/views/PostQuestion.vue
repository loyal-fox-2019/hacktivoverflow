<template>
  <div class="post-question">
    <div class="content p-4">
      <h3 class="mb-4">Ask a public question</h3>
      <div class="row">
        <div class="col-md-8">
          <PostQuestion></PostQuestion>
        </div>
        <div class="col-md">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span><strong> Step 1: Draft your question</strong></span>
            </div>
            <div>
              <p>
                The community is here to help you with specific coding,
                algorithm, or language problems.
              </p>
              <p>
                Avoid asking opinion-based questions.
              </p>
              <h5><strong> Summarize the problem</strong></h5>
              <ul>
                <li>Include details about your goal</li>
                <li>Describe expected and actual results</li>
                <li>Include any error messages</li>
              </ul>
              <h5><strong>Describe what you've tried</strong></h5>
              <p>
                Show what you’ve tried and tell us what you found (on this site
                or elsewhere) and why it didn’t meet your needs. You can get
                better answers when you provide research.
              </p>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostQuestion from '../components/FormQuestion'
export default {
  components: {
    PostQuestion
  },
  created() {
    if (!localStorage.getItem('token')) {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
.post-question {
  background-color: #eff0f1;
}
.content {
  width: 95%;
  display: block;
  margin: auto;
  min-height: 94vh;
  background-color: #eff0f1;
}
</style>
