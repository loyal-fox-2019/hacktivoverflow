<template>
  <div class="question">
      <div class="col-12 mx-auto pt-5">
          <div class="card mx-auto p-4">
              <div class="col-12">
                  <form>
                    <div class="form-group">
                        <input v-model="title" type="text" class="form-control" placeholder="What do you want to ask?">
                    </div>
                    <div class="text-left">
                        <wysiwyg v-model="content"/>
                    </div>
                    <div class="row">
                        <div class="col-6 mt-3">
                            <vue-tags-input
                                v-model="tag"
                                :tags="tags"
                                @tags-changed="newTags => tags = newTags"
                                class="input-tags"
                            ></vue-tags-input>
                        </div>
                        <div class="col-6 my-auto">
                            <div class="custom-file mt-3">
                                <input @change="imgDrop" type="file" class="custom-file-input" id="inputGroupFile01">
                                <label class="custom-file-label" for="inputGroupFile01">Insert picture here</label>
                            </div>
                        </div>
                    </div>
                    <button v-if="!edit" @click="submitQuestion" type="submit" class="btn btn-dark mt-3">Submit</button>
                    <button v-if="edit" @click="editQuestion" type="submit" class="btn btn-dark mt-3">Edit</button>
                    </form>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
export default {
    components : {
        VueTagsInput
    },
    data() {
        return {
            tag: '',
            tags: [],
            title : '',
            content : '',
            imgUrl : '',
        };
    },
    methods : {
        imgDrop(event){
            console.log('masuk imgdrop')
            console.log(event.target.files[0])
            this.imgUrl = event.target.files[0]
        },
        submitQuestion(){
            let formData = new FormData
            formData.append('title', this.title)
            formData.append('content', this.content)
            formData.append('file', this.imgUrl)
            formData.append('author', localStorage.user)
            this.tags.forEach(tag => {
                formData.append('tags[]', tag.text)
            });

            this.$store.dispatch('submitQuestion', formData)
        },
        editQuestion(){
            let formData = new FormData
            formData.append('title', this.title)
            formData.append('content', this.content)
            formData.append('file', this.imgUrl)
            formData.append('author', localStorage.user)
            this.tags.forEach(tag => {
                formData.append('tags[]', tag.text)
            });

            this.$store.dispatch('sendEditQuestion', formData)
        }
    },
    created(){
        if(this.$store.state.oneQuestion){
            this.title = this.$store.state.oneQuestion.title
            this.content = this.$store.state.oneQuestion.content
            this.tags = this.$store.state.oneQuestion.tags
            this.imgUrl = this.$store.state.oneQuestion.imgUrl
            this.edit = true
        }
    }
}
</script>

<style scoped>
.col-12{
    background-color: rgba(240, 240, 240, 0.075);
}

.input-tags{
    border: none;
}
</style>