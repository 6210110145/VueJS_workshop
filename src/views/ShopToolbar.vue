<template>
  <div>
    <v-card
    color="grey lighten-4"
    flat
    tile >
        <v-toolbar
        height="70px"
        dense >
            <v-toolbar-title >
                <router-link to="/shop">
                    <v-btn
                    class="ma-2"
                    outlined
                    color="indigo">
                        Shop Store
                    </v-btn>
                </router-link>
                
            </v-toolbar-title>
            
            <!-- <v-spacer></v-spacer> -->

            <v-btn icon>
              <v-icon>mdi-account</v-icon>
            </v-btn>
            <div v-if="!this.$cookies.get('token')">
                <v-btn text @click="loginComponent = true">login</v-btn>
                <v-btn text @click="registerComponent = true">register</v-btn>
            </div>
            <div v-else>
                <v-btn text @click.once="navigateToProfile('/profile/'+user_id)"> profile </v-btn>
            </div>
            
            <div v-if="order">
                <v-badge right color="primary">
                    <router-link to="/cart">
                        <v-btn icon>
                            <v-icon>mdi-cart</v-icon>
                        </v-btn>
                    </router-link>
                </v-badge>
            </div>
            <div v-else>
                <router-link to="/cart">
                    <v-btn icon>
                        <v-icon>mdi-cart</v-icon>
                    </v-btn>
                </router-link>
            </div>
             
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
                    v-for="(item, index) in menu"
                    :key="index" >
                        <v-list-item-title v-if="headerToken">
                            <v-btn  text color="error" @click.once="logout('/')"> logout </v-btn>
                        </v-list-item-title>
                        <v-list-item-title v-else>
                            <v-btn  text color="success" @click="loginComponent = true"> login </v-btn>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-toolbar>
    </v-card>

    <div v-if="registerComponent">
        <shop-register-vue />
    </div>

    <div v-if="loginComponent">
        <shop-login-vue />
    </div>

    <v-main>
        <router-view/>
    </v-main>
  </div>
</template>

<script>
import ShopLoginVue from '@/components/ShopLogin.vue'
import ShopRegisterVue from '@/components/ShopRegister.vue'

export default {
    components: {
        ShopLoginVue,
        ShopRegisterVue,
    },
    data() {
        return {
            passwordData: {
                username: '',
                password: '',
            },
            user_id: '',
            order: [],
            menu: ['logout'],
            loginComponent: false,
            registerComponent: false,
            headerToken: '',      
        } 
    },
    created() {
        this.headerToken = this.$cookies.get("token")
        this.order = localStorage.getItem("order")
        this.user_id = this.$cookies.get("userID")
    },
    methods: {
        logout(route) {
            this.$cookies.remove("token")
            this.$cookies.remove("role")
            this.$cookies.remove("userID")
            localStorage.removeItem("username")
            // this.headerToken = this.$cookies.get("token")
            this.$router.push(route)
            location.reload()
        },
        navigateToProfile(route) {
            this.$router.push(route)
        }
    },
}
</script>

<style>

</style>