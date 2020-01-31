<template>
  <div class="px-3 py-3 bg bg-white rounded shadow-lg">
      <div class="flex">
          <div class="text-center">
            <label for="tag" class="uppercase text-xs text-gray-600 my-auto mx-2">tag</label>
            <input v-model="tag" id="tag" class="border border-gray-300 rounded shadow w-1/2" type="text">
            <button @click="addTag" class="trans text-sm text-white bg bg-blue-500 rounded border-t-2 border-blue-300 px-1 mx-2 hover:bg-blue-600">Add</button>
            <button v-if="!edit" @click="edit=true" class="trans text-sm text-white bg bg-blue-500 rounded border-t-2 border-blue-300 px-1 hover:bg-blue-600">Edit</button>
            <button v-else @click="edit=false" class="trans text-sm text-white bg bg-blue-500 rounded border-t-2 border-blue-300 px-1 hover:bg-blue-600">Cancel</button>
          </div>
      </div>
      <div v-if="tags.length > 0" class="flex mt-2">
        <div v-for="(tag,i) in tags" :key="i" class="trans mx-1 flex bg bg-gray-400 px-1 rounded cursor-pointer hover:bg-gray-500">
            <p @click="getTagged(tag)" class="text-xs px-2 py-1 rounded text-gray-700">
                {{tag}}
            </p>
            <p @click="deleteTag(tag)" v-if="edit" class="trans my-auto text-xs bg bg-gray-300 h-5 text-white px-2 rounded-full cursor-pointer hover:bg-red-700">x</p>
        </div>
      </div>
  </div>
</template>

<script>
import axios from '../helpers/axios'
import { mapActions, mapMutations } from 'vuex'
export default {
    data() {
        return {
            edit: false,
            tag: ''
        }
    },
    created() {
        this.getTags()
    },
    computed: {
        tags() {
            return this.$store.state.user.tags
        }
    },
    methods: {
        ...mapActions('user',['getTags']),
        ...mapActions('question',['getTaggedQuestions']),
        ...mapMutations('user',['ADD_TAG','REMOVE_TAG']),
        getTagged(tag) {
            this.getTaggedQuestions(tag)
        },
        addTag() {
            axios({
                method: 'put',
                url: '/user/tag',
                data: {
                    tag: this.tag
                },
                headers: {token: localStorage.getItem('token')}
            })
                .then( () => {
                    this.$swal.fire({
                        icon: 'success',
                        title: "Tag added",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.ADD_TAG(this.tag)
                    this.tag = ''
                })
                .catch( err => {
                    this.$swal.fire({
                        icon: 'error',
                        title: err.response.data.errors,
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
        },
        deleteTag(tag) {
            axios({
                method: 'delete',
                url: '/user/tag',
                data: {
                    tag
                },
                headers: {token: localStorage.getItem('token')}
            })
                .then( () => {
                    this.$swal.fire({
                        icon: 'success',
                        title: "Tag deleted",
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.REMOVE_TAG(tag)
                })
                .catch( err => {
                    this.$swal.fire({
                        icon: 'error',
                        title: err.response.data.errors,
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
        }
    }
}
</script>

<style>

</style>