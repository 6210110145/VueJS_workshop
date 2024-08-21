<template>
  <div>
    <div class="d-flex flex-column justify-space-between align-center mt-3 mb-3">
        <h1> Profile </h1>
    </div>

    <v-container class="fill-height" fluid>    
        <v-row justify="center">
            <v-col cols="12" sm="8" md="6" lg="4">
                <v-card class="mx-auto">
                <v-card-title>
                    <v-avatar size="80">
                    <v-img src="https://static.vecteezy.com/system/resources/previews/004/819/327/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg" alt="Profile Picture"></v-img>
                    </v-avatar>
                    <div class="text-center ml-15">
                        <h2>{{ profile.username }}</h2>
                        <p class="grey--text">{{ profile.role }}</p>
                    </div>
                </v-card-title>

                <v-card-text>
                    <v-list dense>
                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Name: {{ profile.firstname }} {{ profile.surname }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Age: {{ profile.age }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-content>
                            <v-list-item-title>Gender: {{ profile.gender }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    </v-list>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="primary" @click="editProfileDialog = true">Edit Profile</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="passwordChangeDialog = true">change password</v-btn>
                </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
  </v-container>

    <v-dialog
        v-model="editProfileDialog"
        max-width="500px"
    >
        <v-card>
            <v-card-title primary-title>
                Edit Profile
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-text-field
                            name="username"
                            label="username"
                            id="username"
                            v-model="profile.username"
                        ></v-text-field>
                    </v-col>
                    <!-- <v-col cols="6">
                        <v-text-field
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]"
                            :type="show1 ? 'text' : 'password'"
                            name="password"
                            label="password"
                            id="password"
                            hint="At least 8 characters"
                            counter
                            v-model="profile.password"
                            @click:append="show1 = !show1"
                        ></v-text-field>
                    </v-col> -->
                    <v-col cols="12">
                        <v-text-field
                            name="firstname"
                            label="firstname"
                            id="firstname"
                            v-model="profile.firstname"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field
                            name="surname"
                            label="surname"
                            id="surname"
                            v-model="profile.surname"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                            name="age"
                            label="age"
                            id="age"
                            v-model="profile.age"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-text-field
                            name="gender"
                            label="gender"
                            id="gender"
                            v-model="profile.gender"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="4">
                        <v-autocomplete
                            v-model="profile.role"
                            :items="roles"
                            dense
                            filled
                            label="roles"
                        ></v-autocomplete>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn text color="success" @click="editProfile()"> edit </v-btn>
                <v-spacer></v-spacer>
                <v-btn text color="error" @click="editProfileDialog = false"> cancel </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog
        v-model="passwordChangeDialog"
    >
        <v-card>
            <v-card-title primary-title>
                Change Password
            </v-card-title>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
    data() {
        return {
            user_id: '',
            profile: {},
            show1: false,
            roles: ['admin', 'user'],
            // rules: {
            //     required: value => !!value || 'Required.',
            //     min: v => v.length >= 2 || 'Min 8 characters',
            //     emailMatch: () => (`The email and password you entered don't match`),
            // },
            editProfileDialog: false,
            passwordChangeDialog: false,
        }
    },
    created() {
        this.user_id = this.$route.params.id
        this.getProfile()
    },
    methods: {
        getProfile() {
            try {
                this.axios.get("http://localhost:3000/users/"+this.user_id, {
                    headers: {
                        Authorization: `Bearer ${this.$cookies.get("token")}`
                    }
                }).then((res) => {
                    this.profile = res.data.data
                })
            }catch(err) {
                alert(err.response.data.message)
            }
        },
        editProfile() {
            try {
                this.axios.put("http://localhost:3000/users/"+this.profile._id, this.profile, {
                    headers: {
                        Authorization: `Bearer ${this.$cookies.get("token")}`
                    }
                }).then((res) => {
                    console.log(res.data.data)
                    this.editProfileDialog = false
                    alert(res.data.message)
                })
            }catch (err) {
                alert(err.response.data.message)
            }
        }
    }
}
</script>

<style>
    .fill-height {
        height: 50vh;
    }
    .v-card {
        padding: 20px;
    }
</style>