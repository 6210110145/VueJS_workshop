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
                <h1> {{address}} </h1>
                <v-text-field
                name="address"
                label="address"
                id="address"
                v-model="address">
                </v-text-field>
                <v-btn color="info" @click="displayAlertParam(address)">alert</v-btn>
            </v-col>
        </v-row>
    </div>

    
</template>

<script>
export default {
    data() {
        return {
            address: 'default',
            name: 'teerapat photongkam',
            show: false,
            imgset: [
                {name: 'Doge',linkimg: 'https://static.independent.co.uk/2021/05/24/20/doge.jpg'},
                {name: 'Cool Doge',linkimg: require('../assets/dogecoin.jpeg.webp')}
            ]
        }
    },
    methods: {
        displayAlert() {
            alert("Hello")
        },
        displayAlertParam(item) {
            this.address
            alert(item)
        }
    }
}
</script>

<style>

</style>