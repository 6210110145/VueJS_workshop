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
                                label="username or email"
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
                    <v-btn text color="primary" @click="changePasswordComponent = true"> forgetpassword? </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="closeItem()"> cancel </v-btn>
                    <v-btn color="success" text @click="loginUser()"> login </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        
        <div v-if="changePasswordComponent">
            <shop-change-password-vue />
        </div>
  </div>
</template>

<script>
import ShopChangePasswordVue from './ShopChangePassword.vue'

export default {
    components: {
        ShopChangePasswordVue
    },
    data() {
        return {
            postdata: {
                username: '',
                password: '',
            },
            dialogLogin: true,
            changePasswordComponent: false,
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
                    this.error = false
                    localStorage.setItem("username", this.postdata.username)
                    this.$cookies.set("userID", res.data.data._id, "3600s")
                    this.$cookies.set("token", res.data.token, "3600s")
                    this.$cookies.set("role", res.data.data.role, "3600s")
                    alert(res.data.message)
                    window.location.reload()
                    this.closeItem()
                })
            }catch (err) {
                this.error = true
                this.errorMessage = err.response.data.message
                alert(err.response.data.message)
            }
        },
        closeItem() {
            this.id = ''
            this.dialogLogin = false
            this.error = false
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