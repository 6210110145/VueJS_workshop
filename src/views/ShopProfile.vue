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
                        <v-list-item-title>Name:</v-list-item-title>
                        <v-list-item-subtitle> {{ profile.firstname }} {{ profile.surname }} </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-content>
                        <v-list-item-title>Age:</v-list-item-title>
                        <v-list-item-subtitle> {{ profile.age }} </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                        <v-list-item-content>
                        <v-list-item-title>Gender:</v-list-item-title>
                        <v-list-item-subtitle> {{ profile.gender }} </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                    </v-list>
                </v-card-text>

                <v-card-actions>
                    <v-btn color="primary" @click="editProfileDialog = true">Edit Profile</v-btn>
                    <v-btn color="error" @click="logout">Logout</v-btn>
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
                <v-col cols="2">
                    <v-select
                        name="role"
                        id="role"
                        :items="roles"
                        label="Standard"
                        v-model="profile.role"
                    ></v-select>
                </v-col>
                <v-col cols="5">
                    <v-text-field
                        name="username"
                        label="username"
                        id="username"
                        v-model="profile.username"
                    ></v-text-field>
                </v-col>
                <v-col cols="5">
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
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
            <v-btn text color="error" @click="editProfileDialog = false"> cancel </v-btn>
        </v-card-actions>
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
            editProfileDialog: false
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
                alert(err)
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