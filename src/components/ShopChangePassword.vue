<template>
    <div>
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
                                v-model="checkEmail.email"
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
            transition="dialog-transition"
        >
            <v-card>
                <v-card-title primary-title>
                    OTP
                </v-card-title>
                <v-card-text>
                    <div class="ma-auto position-relative">
                        <v-otp-input
                            v-model="otp.otp"
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
                </v-card-text>
            </v-card>
            
            <v-snackbar
                v-model="snackbar"
                :color="snackbarColor"
                :timeout="2000"
            >
                {{ text }}
            </v-snackbar>   
        </v-dialog>

         <v-dialog
            v-model="dialogChangePassword"
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
                                v-model="passwordData.password"
                                @click:append="show1 = !show1"
                                @keydown.enter.prevent="loginUser"
                                >
                            </v-text-field>
                            <p v-if="error" style="color:red"> {{ errorMessage }} </p>                         
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="closeItem()"> cancel </v-btn>
                    <v-btn color="success" text @click="changePassword()"> confirm </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogEmail: true,
            dialogOtp: false,
            dialogChangePassword: false,
            error: false,
            errorMessage: '',
            checkEmail: {
                email: '',
            },
            passwordData: {
                password: '',
            },
            otpdata: {},
            otp: {
                otp: '',
            },

            loading: false,
            snackbar: false,
            snackbarColor: 'default',
            text: '',
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 4 || 'Min 4 characters',
            },
            show1: false,
        }
    },
    methods: {
        closeItem() {
            this.dialogEmail = false
            this.error = false
            this.dialogChangePassword = false
        },
        async sendOTP() {
            try {
                await this.axios.post("http://localhost:3000/users/otp", this.checkEmail)
                .then((res) => {
                    this.error = false
                    this.otpdata = res.data.data
                    this.dialogEmail = false 
                    this.dialogOtp = true
                })
            }catch (err) {
                alert(err.response.data.message)
                console.log(err)
            }
        },
        async checkOTP() {
            this.loading = true         
           
            setTimeout(async () => {
                this.loading = false 
                try {
                    await this.axios.post("http://localhost:3000/users/check-otp/"+this.otpdata._id, this.otp)
                    .then(() => {
                        // console.log(res.data.data)
                        this.error = false
                        this.snackbarColor = 'success'
                        this.dialogChangePassword = true
                        this.text = `Processed OTP with "${this.otp.otp}" (${this.snackbarColor})`
                    });
                }catch (err) {
                    console.log(err)
                    this.snackbarColor = 'warning'
                    this.text = `Processed OTP with "${this.otp.otp}" (${this.snackbarColor})`
                    this.snackbar = true
                    alert(err.response.data)
                }
            }, 3500);
        },
        async changePassword() {
            try {
                await this.axios.put("http://localhost:3000/users/newpassword/"+this.otpdata._id, this.passwordData)
                .then((res) => {
                    this.error = false
                    alert(res.data.message)
                    window.location.reload()
                    this.closeItem()
                })
            }catch (err){
                console.log(err)
                this.error = true
                this.errorMessage = err.response.data.message
                alert(err.response.data.message)
            }
        },
    }
}
</script>

<style>

</style>