<template>
    <div class="question-detail">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="main-bar border-left p-3">
                        <div class="grid border-bottom pb-3">
                            <span class="headline">Maven dependencies are failing with a 501 error</span>
                            <router-link to="/ask" class="btn btn-primary float-right">Ask Questions</router-link>
                        </div>
                        <div class="row post-layout mt-3">
                            <div class="col-2 post-layout-left">
                                <div class="voting-container">
                                    <div class="vote-up">
                                        <i class="fas fa-caret-up"></i>
                                    </div>
                                    <div class="vote-count">
                                        <span class="total">80</span>
                                    </div>
                                    <div class="vote-down">
                                        <i class="fas fa-caret-down"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-10 post-layout-right pt-2">
                                <div class="post-text">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                </div>
                                <div class="tags">
                                    <span class="badge badge-secondary">phyton</span>
                                    <span class="badge badge-secondary">arrays</span>
                                    <span class="badge badge-secondary">list</span>
                                </div>
                            </div>
                        </div>
                        <div class="answers-headers border-bottom pb-3">
                            <p class="answer-count">19 Answers</p>
                        </div>
                        <!-- loop answers -->
                        <div class="row post-layout mt-3">
                            <div class="col-2 post-layout-left">
                                <div class="voting-container">
                                    <div class="vote-up">
                                        <i class="fas fa-caret-up"></i>
                                    </div>
                                    <div class="vote-count">
                                        <span class="total">80</span>
                                    </div>
                                    <div class="vote-down">
                                        <i class="fas fa-caret-down"></i>
                                    </div>
                                </div>
                            </div>
                            <div class="col-10 post-layout-right pt-2">
                                <div class="post-text">
                                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                </div>
                                <div class="tags">
                                    <span class="badge badge-secondary">phyton</span>
                                    <span class="badge badge-secondary">arrays</span>
                                    <span class="badge badge-secondary">list</span>
                                </div>
                                <div class="created">
                                    <div class="by-user">
                                        <p class="date">Answered by<span class="name"> Johny Bravo</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- end of loop answers -->
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
.main-bar {
  min-height: 40rem;
}
.headline {
  font-weight: 400;
  font-size: 2.07692308rem;
}
.btn-primary {
  background-color: #0095ff;
  box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.4);
}
.btn {
  padding: .6rem;
  border: 1pz solid transparent;
}
.tags {
  margin-top: .2rem;
}
.tags .badge {
  margin-left: .5rem;
}
.badge {
  padding: .4em .5em;
}
.badge-secondary {
  color: #39739d;
  background-color: #e1ecf4;
  border-color: #e1ecf4;
}
.voting-container {
    position: relative;
    min-height: 150px;
}
.voting-container .vote-up i {
    position: absolute;
    font-size: 64px;
    color: #848d95;
    top: 0;
    left: 55px;
}
.vote-count .total {
    position: absolute;
    font-size: 32px;
    color: #6a737c;
    top: 50px;
    left: 55px;
}
.voting-container .vote-down i {
    position: absolute;
    font-size: 64px;
    color: #848d95;
    bottom: 5px;
    left: 55px;
}
.answers-headers .answer-count {
    font-weight: 500;
    color: #3c4146;
    font-size: 18px;
    margin-bottom: 0;
}
.by-user .date {
  margin-bottom: 0;
  margin-top: 1rem;
  font-size: 12px;
  color: #9199a1;
}
.by-user .name {
  color: #0077cc;
}
</style>
