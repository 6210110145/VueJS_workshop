<template>
  <div>
    <v-card
    color="grey lighten-4"
    flat
    tile >
        <v-toolbar
        height="70px"
        dense >
          
            <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

            <v-toolbar-title v-toolbar-title>Shop Store</v-toolbar-title>
            
            <!-- <v-spacer></v-spacer> -->

            <v-text-field
            class="mx-8"
            flat
            hide-details
            label="Search"
            prepend-inner-icon="mdi-magnify"
            solo-inverted >
            </v-text-field>

            <v-btn icon>
              <v-icon>mdi-account</v-icon>
            </v-btn>

            <v-btn text ="mr-2" @click="editLogin()">login</v-btn>
            <v-btn text @click="editRegister()">register</v-btn>

            <router-link to="/cart">
                <v-btn icon>
                    <v-icon>mdi-cart</v-icon>
                </v-btn>
            </router-link>  

            <v-menu 
            offset-y
            open-on-hover
             >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on" >
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                    v-for="(item, index) in items"
                    :key="index" >
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-toolbar>
    </v-card>

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

        <v-dialog
        v-model="dialogRegister"
        max-width="500px">
            <v-card>
                <v-card-title class="d-flex flex-column justify-space-between align-center mt-3 mb-3">
                    Register User
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field
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
                                hint="At least 8 characters"
                                counter
                                v-model="postdata.password"
                                @click:append="show1 = !show1"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                name="firstname"
                                label="firstname"
                                id="firstname"
                                v-model="postdata.firstname"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
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
                                v-model="postdata.role"
                                :items="items"
                                dense
                                filled
                                label="roles"
                            ></v-autocomplete>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="closeItem()"> cancel</v-btn>
                    <v-btn color="success" text @click="registerUser()()"> submit </v-btn>
                    <!-- <v-btn color="" text @click="deleteData()"> delete </v-btn> -->
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
            postdefault: { // ชุดไว้ล้างข้อมูล
                username: '',
                password: '',
                firstname: '',
                surname: '',
                age: 20,
                gender: '',
                role: ''
            },
            id: '',
            items: ['admin', 'user'],
            show1: false,
            dialogLogin: false,
            dialogRegister: false,
            showPassword: false,
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
                emailMatch: () => (`The email and password you entered don't match`),
            }
        } 
    },
    methods: {
        closeItem() {
            this.id = ''
            this.dialogLogin = false
            this.dialogRegister = false
        },
        editLogin() {
            this.dialogLogin = true
        },
        editRegister() {
            this.dialogRegister = true
        },
        async loginUser() {
            try {
                const {data} = await this.axios.post('http://localhost:3000/users/login', this.postdata, {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmIkMTAkazU1WUdzcVdsei82aENiVU9USzFyLnZTZmJRelouSktVOHdSQU1VQzRNdmhJZVdQYi5UcG0iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjE5NjU5Nzd9.cI1D5-9Tk9vgje9GFwGlJ9SrnfKHZUCOErREDC-40ng`
                    },
                })
                console.log(data)
                alert('register complete')
                this.closeItem()
            }catch (err) {
                console.log(err)
                alert(err)
            }
        },
        async registerUser() {
            try {
                const {data} = await this.axios.post('http://localhost:3000/users/register', this.postdata, {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmIkMTAkazU1WUdzcVdsei82aENiVU9USzFyLnZTZmJRelouSktVOHdSQU1VQzRNdmhJZVdQYi5UcG0iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjE5NjU5Nzd9.cI1D5-9Tk9vgje9GFwGlJ9SrnfKHZUCOErREDC-40ng`
                    },
                })
                console.log(data)
                alert('register complete')
                // this.getData()
                this.closeItem()
            }catch (err) {
                alert(err)
            }
        }
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