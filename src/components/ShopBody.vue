<template>
  <div>
    <h1> สินค้าทั้งหมด </h1>
    <v-row>
        <v-col col="3" v-for="(item, index) in product" :key="index">
            <v-card width="350">
                <v-img 
                src="https://static.independent.co.uk/2021/05/24/20/doge.jpg"
                width="350"
                height="300"/>
                <v-card-title primary-title> 
                     {{item.name}}
                </v-card-title>
                    <!-- <v-card-actions>
                        <v-btn color="info" @click="displayAlertParam(item.name)">alert</v-btn>
                    </v-card-actions> -->
            </v-card>
        </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
    data() {
        return {
            product: [
                {name: "soap"},
                {name: "tooth"},
                {name: "xxx"},
                {name: "yyy"},
            ] 
        }
    }
}
</script>

<style>

</style>