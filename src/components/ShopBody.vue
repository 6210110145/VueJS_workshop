<template>
  <div>
    <h1 class="d-flex flex-column justify-space-between align-center mt-3 mb-3"> สินค้าทั้งหมด </h1>
    <v-row>
        <v-col col="3" v-for="(item, index) in product" :key="index">
            <v-card
            width="350"
            class="ml-2">
                <v-img 
                src="https://static.independent.co.uk/2021/05/24/20/doge.jpg"
                width="350"
                height="300">
                </v-img>
                <v-card-title primary-title> 
                    xxx Bath
                </v-card-title>
                <v-card-title> 
                     {{item.name}}
                </v-card-title>
                <v-card-subtitle>
                    รายละเอียดสินค้า
                </v-card-subtitle>
                    <v-card-actions>
                        <v-btn
                        text
                        color="info"
                        >add cart</v-btn>
                    </v-card-actions>
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