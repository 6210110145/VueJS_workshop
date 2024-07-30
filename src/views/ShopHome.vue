<template>
  <div>
    <div class="d-flex flex-column justify-space-between align-center mt-3 mb-3">
    <h1> 
        สินค้าทั้งหมด 
    </h1>
    <body-1> จำนวน 5 สินค้า</body-1>
    </div>
    <v-row>
        <v-col col="3" v-for="(item, index) in product" :key="index">
            <v-card
            width="350"
            class="ml-2">
                <v-img 
                :src="item.linkimg"
                width="350"
                height="300">
                </v-img>
                <v-card-title primary-title> 
                    {{item.price}} ฿
                </v-card-title>
                <v-card-title> 
                    {{item.name}}
                </v-card-title>
                <v-card-subtitle>
                    
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
// import axios from 'axios'

export default {
    data() {
        return {
            product: [],
        }
    },
    created() {
      this.getData()
    },
    methods: {
        async getData() {
            try {
                const response = await this.axios.get("http://localhost:3000/products/", {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmIkMTAkazU1WUdzcVdsei82aENiVU9USzFyLnZTZmJRelouSktVOHdSQU1VQzRNdmhJZVdQYi5UcG0iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjE5NjU5Nzd9.cI1D5-9Tk9vgje9GFwGlJ9SrnfKHZUCOErREDC-40ng`
                    },
                });
                console.log(response)
                this.product = response.data.data.map((products) => ({
                    id: products._id,
                    name: products.product_name,
                    price: products.price,
                    linkimg: `http://localhost:3000/images/${products.product_img}`,
                }));
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
    }
}
</script>

<style>

</style>