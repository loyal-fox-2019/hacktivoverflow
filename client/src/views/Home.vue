<template>
    <div style="padding:2%">
        <!-- <h1>@views/home.vue</h1> -->

            <div  :class="kelas">
                <h1>lalalla</h1>
            </div>
        
        <div class="container">
            <div class="row">
                <div class="col-2">
                    <div id="userDiv">
                        <img src="https://www.harmony.gov.au/Documents/resources/hw-web-banner-vertical-orange.jpg" alt="" style="width:100%; height:auto">
                        <p><b>buat pasang banner iklan nih</b></p>
                        <p><b>biar dapet banyak duit</b> </p>

                    </div>
                </div>

                <div class="col-10">
                    <div id="questionDiv">
                        <!-- console.log("TCL: access_token", {{access_token}}) -->
                        <div v-for="question in questionData" :key="question">
                            <CardSimple :question="question"/>
                        </div>
                        
                    </div>
                </div>

            </div>
        </div>

        <!-- {{ questionData }} -->

        


        


    </div>
</template>

<script>
import CardSimple from '@/components/CardSimple'
import { mapGetters } from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
    components:{
        CardSimple
    },
    data(){
        return{
            votes:100,
            kelas:'blueDiv'
        }
    },
    methods:{
        
        isLoginCheck()
          {
              Swal.fire('JALAN NIH ISLOGINCHECK')
          }

    },
    created(){
        this.$store.dispatch('fetchQuestionData')
        // this.isLoginCheck()
    },
    computed:{
        ...mapGetters([
            'access_token',
            'questionData'
        ])
    }




}
</script>

<style scoped>

#questionDiv{
    margin-top:1%
}

.redDiv{
    border: solid red 2px
}

.blueDiv{
    border: solid 2px blue;
}


</style>