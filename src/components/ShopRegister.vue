<template>
    <div>
        <v-dialog
        v-model="dialogRegister"
        max-width="500px">
            <v-card>
                <v-alert
                v-if="error"
                type="error"
                transition="fade-transition"
                v-model="alertVisible"
                >
                    {{ errorMessage }}
                </v-alert>

                <v-card-title class="d-flex flex-column justify-space-between align-center mt-3 mb-3">
                    Register User
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
                                :rules="[rules.required]"
                                name="username"
                                label="username"
                                id="username"
                                v-model="postdata.username"
                            ></v-text-field>
                        </v-col>                   
                        <v-col cols="6">
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
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                :rules="[rules.required]"
                                name="email"
                                label="email"
                                id="email"
                                v-model="postdata.email"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                :rules="[rules.required]"
                                name="firstname"
                                label="firstname"
                                id="firstname"
                                v-model="postdata.firstname"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                :rules="[rules.required]"
                                name="surname"
                                label="surname"
                                id="surname"
                                v-model="postdata.surname"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field
                                name="age"
                                label="age"
                                id="age"
                                v-model="postdata.age"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-text-field
                                name="gender"
                                label="gender"
                                id="gender"
                                v-model="postdata.gender"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="4">
                            <v-autocomplete                               
                                :items="items"
                                dense
                                filled
                                label="roles"
                                v-model="postdata.role"
                            ></v-autocomplete>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="closeItem()"> cancel</v-btn>
                    <v-btn color="success" text @click="registerUser()"> submit </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogRegister: true,
            postdata: {
                username: '',
                email: '',
                password: '',
                firstname: '',
                surname: '',
                age: 0,
                gender: '',
                role: ''
            },
            showPassword: false,
            items: ['admin', 'user'],
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 4 || 'Min 4 characters',
                emailMatch: () => (`The email and password you entered don't match`),
            },
            show1: false,
            errorMessage: '',
            error: false,
            alertVisible: true,
        }
    },
    methods: {
        closeItem() {
            this.id = ''
            this.dialogRegister = false
            this.error = false
        },
        async registerUser() {
            try {
                await this.axios.post('http://localhost:3000/users/register', this.postdata)
                .then((res) => {
                    alert(res.data.message)
                    this.closeItem()
                });            
            }catch (err) {
                this.error = true
                this.errorMessage = err.response.data || "An unexpected error occurred."
                console.log(err.response.data)
            }
        },
    },
    computed: {
        messages () {
            return this.showPassword ? ['Password'] : undefined
        },
    },
}
</script>

<style>

</style>