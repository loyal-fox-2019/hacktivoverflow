<template>
    <div class="qn-sum">
        <div class="card-header"  :class="isTagged ? 'tagged' : ''" style="border-radius: 15px;">
            <button class="btn btn-success" style="float:right!important;width:10%" @click="viewQuestion">View</button>
        <div class="card-body">
            <div class="stats">
                <div>{{question.upvotes.length - question.downvotes.length}}<br>upvotes</div>
                <div :class="question.hasAnswer ? 'has-answer' : ''">{{question.answers.length}}<br>answers</div>
            </div>
            
            <div class="content">
                <h5 class="card-title">{{question.title}}</h5>
                
                <p class="card-text">
                    {{strippedDesc}}
                </p>
                <div>
                    <button class="btn btn-outline-secondary tag-buttons" :class="userTags.includes(tag) ? 'matched-tag' : ''" v-for="tag in question.tags" :key="tag">{{tag}}</button>
                </div>
                <div style="float:right">
                    Asked by {{question.user.username}}
                    <h6 class="card-subtitle mb-2 text-muted" style="font-size:12px"><br>
                    <i>
                        Asked {{(new Date(question.createdAt)).toDateString()}}<br>
                        Last updated {{(new Date(question.updatedAt)).toDateString()}}
                    </i>
                </h6>
                </div>
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
        data() {
            return {
                strippedDesc: this.question.description.replace(/<\/?[^>]+>/ig, " ").substr(0,200)+(this.question.description.replace(/<\/?[^>]+>/ig, " ").length > 200 ? "..." : ""),
                isTagged: false
            }
        },
        computed: {
            userTags() {
                return this.$store.state.myTags
            }
        },
        methods: {
            viewQuestion() {
                this.$router.push({path: `/question/${this.question._id}`})
            }
        },
        created() {
            for(let i=0;i<this.question.tags.length;i++)
            {
                if(this.userTags.includes(this.question.tags[i]))
                {
                    this.isTagged = true;
                    break;
                }
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
    justify-content: flex-start;
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
.has-answer {
    background: lightgreen;
}
.tag-buttons {
    font-size: 10px;
    padding: 3px;
    margin: 3px
}
.matched-tag {
    background-color: cornflowerblue;
    color: white
}
.tagged {
    background-color: lightsalmon
}
</style>