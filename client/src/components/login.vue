<template>
    <sui-container class="container">
        <logo/>
        <div id="login-form">
            <message :header="msgHeader" :message="msgMessage"
                     :visible="msgVisible" @dismiss="msgDismiss"/>
            <sui-icon name="lock"/>
            LOGIN
            <sui-form class="form" @submit.prevent="login">
                <sui-form-field>
                    <sui-input size="25"
                               type="text"
                               placeholder="email"
                               class="input"
                               v-model="email"
                               transparent
                               required/>
                    <small>This is email you used to register</small>
                </sui-form-field>
                <sui-form-field>
                    <sui-input size="25"
                               type="password"
                               placeholder="password"
                               class="input"
                               v-model="password"
                               required
                               transparent/>
                </sui-form-field>
                <sui-divider />
                <small>Confirmation code for new user</small>
                <sui-form-field>
                    <sui-input size="25"
                               type="text"
                               placeholder="confirmation code"
                               class="input"
                               v-model="confirmationCode"
                               transparent/>
                </sui-form-field>
                <sui-form-field align="center">
                    <sui-button basic>Sign In
                        <sui-icon name="arrow right"/>
                    </sui-button>
                    or
                    <router-link to="/register">Reset Password</router-link>
                </sui-form-field>
            </sui-form>
        </div>
        <div id="label">
            <router-link to="/register">Register</router-link>
            for a new account
        </div>
    </sui-container>
</template>

<script>
    import message from "./message";
    import router from "../router";
    import logo from "./logo";

    export default {
        name: "login",
        data() {
            return {
                email: null,
                password: null,
                confirmationCode: null,
                msgHeader: "msgHeader",
                msgMessage: "msgMessage",
                msgVisible: false
            }
        },
        methods: {
            login() {
                this.$axios({
                    method: 'post',
                    url: '/users/login',
                    data: {
                        email: this.email,
                        password: this.password,
                        confirmationCode: this.confirmationCode
                    }
                }).then(response => {
                    console.log(response.data);
                    this.msgVisible = true;
                    this.msgHeader = "Success";
                    this.msgMessage = response.data.message;
                    this.$cookies.set('token', response.data.token);
                    router.push("/");
                }).catch(err => {
                    console.log(err.response.data.error);
                    this.msgVisible = true;
                    this.msgHeader = "Error";
                    this.msgMessage = err.response.data.error;
                })
            },
            msgDismiss() {
                this.msgVisible = false
            }
        },
        components: {
            message,
            logo
        }
    }
</script>

<style scoped>
    #login-form {
        border: lightgray solid 1px;
        padding: 25px;
        margin: 0 0 10px 0;
    }

    .container {
        width: 25%;
        top: 10%;
        left: 50%;
        transform: translate(-50%);
        position: absolute;
    }

    .input {
        background-color: #f1f2f6 !important;
        padding: 7px 15px;
        border: #dfe4ea 1px solid;
        margin: 5px 0px;
    }

    #label {
        text-align: center;
    }

    .form {
        margin: 20px 0 0 0;
    }
</style>