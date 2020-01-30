<template>
  <div class="ask">
    <div class="container">
      <div class="row justify-content-center mt-5">
        <div class="col-10">
          <div class="form p-4 shadow rounded">
            <form>
                <div class="form-group">
                    <label>Title</label>
                    <p class="description">Be spesific and imagine you're asking a question to another person</p>
                    <input type="text" class="form-control" placeholder="e.g. Is there an R function for finding the index of an element in a vector?">
                </div>
                <div class="form-group">
                    <label>Body</label>
                    <p class="description">Include all the information someone would need to answer your question</p>
                    <textarea rows="3" class="form-control"></textarea>
                </div>
                <div class="form-group">
                    <label>Tags</label>
                    <p class="description">Add up to 5 tags describe what your question is about</p>
                    <input type="text" class="form-control" placeholder="e.g. (excel android sql)">
                </div>
                <button type="submit" class="btn btn-primary">Reviw your question</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style scoped>
label {
  font-weight: 700;
  margin-bottom: 0;
}
.btn-primary {
  background-color: #0095ff;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.4);
  margin-top: 1rem;
}
.description {
  margin-bottom: .3rem;
  color: #61737c;
  font-size: 12px;
}
</style>
