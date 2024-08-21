<template>
  <div>
    <v-dialog
        v-model="dialogLogin"
        max-width="500px">
            <v-card>
                <v-card-title class="d-flex flex-column justify-space-between align-center mt-3 mb-3">
                    Login User
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                name="username"
                                label="username"
                                id="username"
                                :rules="[rules.required]"
                                v-model="postdata.username">
                            </v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.min]"
                                :type="show1 ? 'text' : 'password'"
                                name="password"
                                label="password"
                                id="password"
                                hint="At least 4 characters"
                                counter
                                v-model="postdata.password"
                                @click:append="show1 = !show1"
                                @keydown.enter.prevent="loginUser"
                                >
                            </v-text-field>
                            <p v-if="error" style="color:red"> {{ errorMessage }} </p>                         
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn text color="primary" @click="dialogEmail = true"> forgetpassword? </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="closeItem()"> cancel </v-btn>
                    <v-btn color="success" text @click="loginUser()"> login </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
        v-model="dialogEmail"
        max-width="500px"
        transition="dialog-transition">
            <v-card>
                <v-card-title primary-title>
                    Your E-mail
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12"> 
                            <v-text-field
                                :rules="[rules.required]"
                                name="email"
                                label="email"
                                id="email"
                                v-model="checkEmail"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn text color="error" @click="closeItem()"> cancel </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn text color="success" @click="sendOTP()"> sumbit </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
            v-model="dialogOtp"
            max-width="500px"
        >
            <div class="ma-auto position-relative">
                <v-otp-input
                    v-model="otp"
                    :disabled="loading"
                    @finish="checkOTP"
                ></v-otp-input>
                <v-overlay absolute :value="loading">
                    <v-progress-circular
                    indeterminate
                    color="primary"
                    ></v-progress-circular>
                </v-overlay>
            </div>
            <v-snackbar
                v-model="snackbar"
                :color="snackbarColor"
                :timeout="2000"
            >
                {{ text }}
            </v-snackbar>   
        </v-dialog>

        <v-dialog
            v-model="dialogForgetPassword"
            max-width="500px"
            transition="dialog-transition"
        >
            <v-card>
                <v-card-title class="d-flex flex-column justify-space-between align-center mt-3 mb-3">
                    Change Your Password
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.min]"
                                :type="show1 ? 'text' : 'password'"
                                name="password"
                                label="password"
                                id="password"
                                hint="At least 4 characters"
                                counter
                                v-model="postdata.password"
                                @click:append="show1 = !show1"
                                @keydown.enter.prevent="loginUser"
                                >
                            </v-text-field>
                            <p v-if="error" style="color:red"> {{ errorMessage }} </p>                         
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-btn text color="primary" @click="dialogEmail = true"> forgetpassword? </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="closeItem()"> cancel </v-btn>
                    <v-btn color="success" text @click="loginUser()"> login </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
  </div>
</template>

<script>
export default {
    // props: {
    //     dialogLogin: Boolean
    // },
    data() {
        return {
            postdata: {
                username: '',
                password: '',
            },
            checkEmail: '',
            passwordData: {
                username: '',
                password: '',
            },
            otpdata: {},
            loading: false,
            snackbar: false,
            snackbarColor: 'default',
            otp: '',
            text: '',
            dialogLogin: true,
            dialogEmail: false,
            dialogForgetPassword: false,
            dialogOtp: false,
            show1: false,
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 4 || 'Min 4 characters',
            },
            error: false,
            errorMessage: '',
            
        }
    },
    methods: {
        async loginUser() {
            try {
                await this.axios.post('http://localhost:3000/users/login', this.postdata)
                .then((res) => {
                    localStorage.setItem("username", this.postdata.username)
                    this.$cookies.set("userID", res.data.data._id, "3600s")
                    this.$cookies.set("token", res.data.token, "3600s")
                    this.$cookies.set("role", res.data.data.role, "3600s")
                    alert(res.data.message)
                    window.location.reload()
                    this.closeItem()
                })
            }catch (err) {
                console.log(err)
                alert(err)
            }
        },
        async sendOTP() {
            try {
                await this.axios.post("http://localhost:3000/users/otp", this.checkEmail)
                .then((res) => {
                    this.otpdata = res.data.data
                    this.dialogOtp = true
                })
            }catch (err) {
                console.log(err)
            }
        },
        async forgetPassword() {
            try {
                await this.axios.post("http://localhost:3000/users/password", this.passwordData)
                .then((res) => {
                    alert(res.data.message)
                    window.location.reload()
                    this.closeItem()
                })
            }catch (err){
                console.log(err)
                alert(err)
            }
        },
        async checkOTP (rsp) {
            this.loading = true
            // await this.axios.post("http://localhost:3000/users/check-otp/"+this.otpdata._id, rsp)
            setTimeout(() => {
                this.loading = false
                
                if (rsp == this.otpdata.otp) {
                    this.snackbarColor = 'success'
                    this.dialogForgetPassword = true
                }else{
                    this.snackbarColor = 'warning'
                } 
                this.text = `Processed OTP with "${rsp}" (${this.snackbarColor})`
                this.snackbar = true
            }, 3500)
        },
        closeItem() {
            this.id = ''
            this.dialogLogin = false
            this.error = false
            this.dialogForgetPassword = false
            this.$emit('closeComponent')
        },
    }
}
</script>

<style scoped>
.position-relative {
    position: relative;
}
</style>