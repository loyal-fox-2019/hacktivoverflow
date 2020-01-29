<template>
    <div class="qn-sum">
        <div class="card-header">
            <button class="btn btn-success" style="float:right!important;width:10%" @click="viewQuestion">View</button>
        <div class="card-body">
            <div class="stats">
                <div>{{question.upvotes.length}}<br>upvotes</div>
                <div>{{question.answers.length}}<br>answers</div>
            </div>
            
            <div class="content">
                <h5 class="card-title">{{question.title}}</h5>
                <h6 class="card-subtitle mb-2 text-muted"><i>Asked {{(new Date(question.createdAt)).toDateString()}}</i></h6>
                <p class="card-text">
                    {{question.description}}
                </p>
                <div style="float:right">Asked by {{question.user.username}}</div>
            </div>
            
        </div>
        </div>
        
    </div>
</template>

<script>
    export default {
        name: "questionSummary",
        props: {
            question: Object
        },
        methods: {
            viewQuestion() {
                this.$router.push({path: `/question/${this.question._id}`})
            }
        }
    }
</script>

<style scoped>
.qn-sum {
    width: 50vw;
}
.card-body {
    display: flex;
    width: 85%
}
.stats, .content {
    padding-right: 15px;
}
.stats {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
}
.stats > div {
    border: 1px solid black;
    border-radius: 5px;
    padding: 5px;
}
.content {
    width: 80%;
}
</style>