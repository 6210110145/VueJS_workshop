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
                src="https://static.independent.co.uk/2021/05/24/20/doge.jpg"
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
import axios from 'axios'

export default {
    data() {
        return {
            product: [],
        }
    },
    methods: {
        // getData() {
        //     this.axios.get('http://localhost:3000/products/', {
        //         headers: {
        //             Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmIkMTAkazU1WUdzcVdsei82aENiVU9USzFyLnZTZmJRelouSktVOHdSQU1VQzRNdmhJZVdQYi5UcG0iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjE5NjU5Nzd9.cI1D5-9Tk9vgje9GFwGlJ9SrnfKHZUCOErREDC-40ng`
        //         },
        //     }).then((response) => {
        //         console.log(response.data)
        //         this.product = response.data.data // ทำให้เป็น array
        //         this.product_img = this.product.map((products) => ({
        //             linkimg: `http://localhost:3000/images/${products.product_img}`
        //         }));
        //     })
        // }
        async getdata() {
            try {
                const response = await axios.get("http://localhost:3000/users/", {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmIkMTAkazU1WUdzcVdsei82aENiVU9USzFyLnZTZmJRelouSktVOHdSQU1VQzRNdmhJZVdQYi5UcG0iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjE5NjU5Nzd9.cI1D5-9Tk9vgje9GFwGlJ9SrnfKHZUCOErREDC-40ng`
                    },
                });
                console.log(response)
                this.product = response.data.data.map((products) => ({
                    id: products._id,
                    name: products.product_name,
                    price: products.price,
                    linkimg: `http://http://localhost:3000/images/${products.product_img}`,
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