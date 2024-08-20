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
            <v-list-item-title>
                <v-carousel
                height="300">
                    <v-carousel-item
                        v-for="(item, index) in productImage"
                        :key="index"
                        :src="item.linkimage"
                        reverse-transition="fade-transition"
                        transition="fade-transition"
                        @click="openDialog(item)"
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
            <div v-if="role == 'admin'">
                <v-btn text color="primary" @click="dialogAddImage = true"> add image </v-btn>
            </div>
            <v-spacer></v-spacer>
            <v-btn
                class="mr-6"
                outlined
                rounded
                icon
            >
                <v-icon @click.once="addCart(product)">mdi-cart-arrow-down</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>

    <v-dialog v-model="dialogImage" max-width="600px">
      <v-card>
        <v-card-text>
            <v-img :src="selectImage.linkimage"></v-img>
        </v-card-text>
        <v-card-actions>
            <v-btn color="error" @click="deleteImage(selectImage)">delete</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="dialogImage = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
        v-model="dialogAddImage"
        max-width="500px"
    >
        <v-card>
        <v-card-text>
            <p> Add Image Here </p>
            <v-file-input
            show-size
            prepend-icon="mdi-camera"
            name="newImage"
            id="newImage"
            accept="image/*"
            placeholder="Pick a photo"
            label="newImage"
            v-model="newImage"
            ></v-file-input>
        </v-card-text>
        <v-card-actions>
            <v-btn color="success" @click="addImage()"> add </v-btn>
            <v-btn color="error" @click="dialogAddImage = false"> close </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
    data() {
        return {
            role: '',
            username: '',
            product_id: 0,
            productResponse: [],
            productImage: [],
            product: [],
            order: [],           
            dialogImage: false,
            dialogAddImage: false,
            selectImage: {},
            newImage: '',
        }
    },
    created() {
        this.role = this.$cookies.get("role")
        this.username = localStorage.getItem("username")
        this.product_id = this.$route.params.id
        this.getProduct()

        if(localStorage.getItem("order")) {
            let _id = localStorage.getItem("order")
            this.order = _id.split(',');
        }
    },
    methods: {
        async getProduct() {
            this.productResponse = await this.axios.get("http://localhost:3000/products/"+this.product_id, {
                headers: {
                    Authorization: `Bearer ${this.$cookies.get("token")}`
                },
            });
            this.product = this.productResponse.data.data
            this.productImage = this.product.product_img.map((item) => ({
                linkimage: `http://localhost:3000/${item.url}`,
                name: item.name,
                _id: item._id,
            }))
        },
        addCart(item) {
            this.order.push(item._id);
            console.log(this.order)
            localStorage.setItem("order", this.order)
        },
        openDialog(item){
            this.dialogImage = true
            this.selectImage = item
        },
        async deleteImage(item) {
            try {
                await this.axios.put('http://localhost:3000/products/image/'+this.product._id, item, {
                    headers: {
                        Authorization: `Bearer ${this.$cookies.get("token")}`
                    },
                }).then((response) => {
                    alert(response.data.message)
                    this.getProduct()
                    window.location.reload()
                })
            }catch (err) {
                alert(err)
            }
        },
        async addImage() {
            if(this.newImage) {
                const formData = new FormData()
                // formData.append('username', this.username)
                formData.append('product_img', this.newImage)

                try {
                    await this.axios.put('http://localhost:3000/products/images/'+this.product._id, formData, {
                        headers: {
                            Authorization: `Bearer ${this.$cookies.get("token")}`
                        }
                    }).then((response) => {
                        console.log(response.data.data)
                        alert(response.data.message)
                        this.getProduct()
                        location.reload()
                    })
                }catch(err) {
                    alert(err.message)
                    console.log(err)
                }
            }else {
                alert('insert image')
            }
        }
    }
}
</script>

<style>

</style>