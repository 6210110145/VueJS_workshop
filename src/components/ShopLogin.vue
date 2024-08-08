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
                                hint="At least 8 characters"
                                counter
                                v-model="postdata.password"
                                @click:append="show1 = !show1"
                                >
                            </v-text-field>                          
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
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
    data() {
        return {
            postdata: { // ชุดไว้ส่งข้อมูล
                username: '',
                password: '',
                firstname: '',
                surname: '',
                age: 20,
                gender: '',
                role: ''
            },
            dialogLogin: true,
            show1: false,
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 2 || 'Min 8 characters',
                emailMatch: () => (`The email and password you entered don't match`),
            },
        }
    },
    methods: {
        async loginUser() {
            try {
                await this.axios.post('http://localhost:3000/users/login', this.postdata, {
                }).then((res) => {
                    console.log(res.data.message)
                    localStorage.setItem("token", res.data.token)
                    localStorage.setItem("username", res.data.name)
                    alert(res.data.message)
                    this.closeItem()
                })
            }catch (err) {
                console.log(err)
                alert(err)
            }
        },
        closeItem() {
            this.id = ''
            this.dialogLogin = false
        },
    }
}
</script>

<style>

</style>