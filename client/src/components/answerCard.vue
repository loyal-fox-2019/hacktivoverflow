<template>
  <div class="body mt-5 p-5 text-left">
            <div class="row w-100">
                <div class="col-6">
                    <p class="pl-2 author">{{answer.author}} | {{answer.updatedAt | moment('from', 'now')}} </p>
                    <div class="row pl-4">
                        <p v-html="answer.content"></p>
                    </div>
                </div>
                <div class="col-6 text-right">
                    <h2><i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i></h2>
                    <h2 class="upvotes mr-1"> {{answer.upvotes.length - answer.downvotes.length}}</h2>
                    <h2><i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i></h2>
                </div>
            </div>
    </div>
</template>

<script>
export default {
    props : {
        answer : Object
    }
}
</script>

<style>
.body{
    height: 100%;
    box-shadow: 12px 12px 12px 0 rgb(0,0,0,.03), -12px -12px 12px 0 rgba(255,255,255,.7)
}

.answer-sign{
    height: 100%;
    box-shadow: 12px 12px 12px 0 rgb(0,0,0,.03), -12px -12px 12px 0 rgba(255,255,255,.7)
}

.author{
    color: grey;
}

img{
    max-height: 25vh ;
}

.fa:hover{
  cursor: pointer;
  color: rgb(95, 95, 95);
}
</style>