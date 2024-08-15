<template>
  <div>
    <div class="d-flex flex-column justify-space-between align-center mt-3 mb-3">
        <h3>Yuedpao</h3>
    </div>

    <v-card
        class="mx-auto ml-3 mr-3"
        max-width="auto"
        outlined
    >
        <v-list-item three-line>
            

            <!-- <v-list-item-avatar
                tile
                size="80"
                color="grey"
            ></v-list-item-avatar> -->
            <v-list-item-title>
                <v-carousel
                height="300">
                    <v-carousel-item
                        v-for="(item, index) in productImage"
                        :key="index"
                        :src="item.linkimage"
                        reverse-transition="fade-transition"
                        transition="fade-transition"
                    ></v-carousel-item>
                </v-carousel>
                <v-list-item-content>

                <v-list-item-title class="text-h5 mb-1">
                    {{product.product_name}}
                </v-list-item-title>
                <v-list-item-subtitle>
                    {{product.detail.color}} {{product.detail.type}} for {{product.detail.gender}}
                </v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item-title>
        </v-list-item>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                class="mr-6"
                outlined
                rounded
                icon
            >
                <v-icon @click="addCart(product)">mdi-cart-arrow-down</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
    data() {
        return {
            product_id: 0,
            productResponse: [],
            productImage: [],
            product: [],
            order: '',
        }
    },
    created() {
        this.product_id = this.$route.params.id
        this.getProduct()
    },
    methods: {
        async getProduct() {
            this.productResponse = await this.axios.get("http://localhost:3000/products/"+this.product_id, {
                headers: {
                    Authorization: `Bearer ${this.$cookies.get("token")}`
                },
            });
            this.product = this.productResponse.data.data
            // console.log(this.product)
            this.productImage = this.product.product_img.map((item) => ({
                linkimage: `http://localhost:3000/${item.url}`,
                nameimage: item.name
            }))
            // console.log(this.productImage)
        },
        addCart(item) {
            this.order.push(item.id);
            localStorage.setItem("order", this.order)
        },
    }
}
</script>

<style>

</style>