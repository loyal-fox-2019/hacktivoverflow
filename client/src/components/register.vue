<template>
    <sui-container class="container">
        <logo/>
        <div id="login-form">
            <message :header="msgHeader" :message="msgMessage"
                     :visible="msgVisible" @dismiss="msgDismiss"/>
            <sui-icon name="user"/>
            REGISTER
            <sui-form class="form" @submit.prevent="register">
                <sui-form-field>
                    <label>Full Name</label>
                    <sui-input size="25" type="text"
                               placeholder="full name" class="input"
                               v-model="name" transparent
                               maxlength="30" required/>
                    <small>Max 30 Character</small>
                </sui-form-field>
                <sui-form-field>
                    <label>Email Address</label>
                    <sui-input size="25" type="text"
                               placeholder="email" class="input"
                               v-model="email" transparent
                               required/>
                    <small>we never share your email</small>
                </sui-form-field>
                <sui-form-field>
                    <label>Password</label>
                    <sui-input size="25" type="password"
                               placeholder="password" class="input"
                               v-model="password" transparent
                               required/>
                    <small>min 8 characters
                        <br>Password must contain at least 1 number, letters, symbol, Uppercase and lowercase</small>
                </sui-form-field>
                <sui-form-field align="center">
                    <sui-button basic>Sign Up
                        <sui-icon name="arrow right"/>
                    </sui-button>
                </sui-form-field>
            </sui-form>
        </div>
        <div id="label">
            Already have an account?
            <router-link to="/login">Login</router-link>
        </div>
    </sui-container>
</template>

<script>
    import message from "./message";
    import logo from "./logo";

    export default {
        name: "register",
        data() {
            return {
                name: null,
                email: null,
                password: null,
                msgHeader: "msgHeader",
                msgMessage: "msgMessage",
                msgVisible: false
            }
        },
        methods: {
            register() {
                this.$axios({
                    method: 'post',
                    url: '/users/register',
                    data: {
                        name: this.name,
                        email: this.email,
                        password: this.password
                    }
                }).then(response => {
                    console.log(response.data);
                    this.msgVisible = true;
                    this.msgHeader = "Success";
                    this.msgMessage = response.data.message
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