<template>
    <div>
        <h1> Simple Page</h1>
        <h3 v-if="show"> {{name}} </h3>
        <v-btn color="success" @click="show = !show">switch</v-btn>
        <v-btn color="red" @click="displayAlert()">alert</v-btn>

        <v-row>
            <v-col col="3" v-for="(item, index) in imgset" :key="index">
                <v-card width="350">
                    <v-img :src="item.linkimg"
                    width="350"
                    height="300"/>
                    <v-card-title primary-title> {{item.name}} </v-card-title>
                    <v-card-actions>
                        <v-btn color="info" @click="displayAlertParam(item.name)">alert</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>

            <v-col cols='12'>
                <h1> {{token}} </h1>
                <v-text-field
                name="name"
                label="name"
                id="name"
                v-model="name">
                </v-text-field>

                <v-text-field
                name="token"
                label="token"
                id="token"
                v-model="token">
                </v-text-field>
                <v-btn color="info" @click="setToken(token)">alert</v-btn>
            </v-col>

            <v-col cols="12">
                <testpropsz :name="name" @displayAlert="displayAlert"/>
            </v-col>
        </v-row>
    </div>

    
</template>

<script>
import testpropsz from '../components/TestPropsz.vue';
import {EventBus} from '@/EventBus'
export default {
    components: {
        testpropsz
    },
    data() {
        return {
            token: '',
            name: 'teerapat photongkam',
            show: false,
            imgset: [
                {name: 'Doge',linkimg: 'https://static.independent.co.uk/2021/05/24/20/doge.jpg'},
                {name: 'Cool Doge',linkimg: require('../assets/dogecoin.jpeg.webp')}
            ]
        }
    },
    mounted() {
        EventBus.$on('callMain', this.displayAlert)
    },
    beforeDestroy() {
        EventBus.$off('callMain', this.displayAlert)
    },
    methods: {
        displayAlert() {
            ("Hello")
        },
        setToken(item) {
            localStorage.setItem("Token", item);
            localStorage.setItem("User", this.name);
            this.$cookies.set("token",item,"10s");
            alert('set token success')
        }
    }
}
</script>

<style>

</style>