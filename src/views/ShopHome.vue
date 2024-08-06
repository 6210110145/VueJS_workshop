<template>
  <div>
    <div class="d-flex flex-column justify-space-between align-center mt-3 mb-3">
    <h1> 
        สินค้าทั้งหมด
        <v-btn icon @click="goToCart">
          <v-icon>mdi-cart</v-icon>
        </v-btn>

        <v-btn v-if="token != ''" color="success" @click="newProduct()">Add Product</v-btn>
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
                    {{item.detail.color}} {{item.detail.type}} for {{item.detail.gender}}
                </v-card-subtitle>
                <v-card-text>
                    มีจำนวน: {{item.amount}}
                </v-card-text>
                    <v-card-actions>
                        <v-btn text color="info" @click.once="addCart(item)"> add cart </v-btn>
                        <v-btn text color="success" @click="editItem(item)"> edit </v-btn>
                    </v-card-actions>
            </v-card>
        </v-col>
    </v-row>

    <v-dialog
    v-model="dialogedit"
    max-width="500px">
        <v-card>
            <v-card-title>
            Add Product
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="2">
                    <v-text-field
                        name="code"
                        label="product_code"
                        id="product_code"
                        v-model="postdata.code"
                    ></v-text-field>
                    </v-col>
                    <v-col cols="10">
                        <v-text-field
                        name="product_name"
                        label="product_name"
                        id="product_name"
                        v-model="postdata.name"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-file-input
                        accept="image/*"
                        label="product_img"
                        ></v-file-input>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                        name="price"
                        label="price"
                        id="price"
                        v-model="postdata.price"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                        <v-text-field
                        name="amount"
                        label="amount"
                        id="amount"
                        v-model="postdata.amount"
                        ></v-text-field>
                    </v-col>
                    <v-col col="3">
                        <v-text-field
                        name="type"
                        label="type"
                        id="type"
                        v-model="postdata.detail.type"
                        ></v-text-field>
                    </v-col>
                    <v-col col="3">
                        <v-text-field
                        name="color"
                        label="color"
                        id="color"
                        v-model="postdata.detail.color"
                        ></v-text-field>
                    </v-col>
                    <v-col col="3">
                        <v-text-field
                        name="gender"
                        label="gender"
                        id="gender"
                        v-model="postdata.detail.gender"
                        ></v-text-field>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="closeItem()"> cancel </v-btn>
                <v-btn color="success" text @click="saveSelect()"> add </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <div v-if="Login">
        <shop-login-vue />
    </div>
  </div>
</template>

<script>
import ShopLoginVue from '@/components/ShopLogin.vue'
// import ShopLoginVue
export default {
    components: {
      ShopLoginVue
    },
    data() {
        return {
            dialogedit: false,
            product: [],
            order: [],
            token: '',
            Login: false,
            postdata: { // ชุดไว้ส่งข้อมูล
                product_code: '',
                product_name: '',
                product_img: '',
                price: 100,
                amount: 100,
                detail:{
                    type: '',
                    color: '',
                    gender: '',
                },
            },
            postdefault: { // ชุดไว้ล้างข้อมูล
                product_code: '',
                product_name: '',
                product_img: '',
                price: 100,
                amount: 100,
                detail:{
                    type: '',
                    color: '',
                    gender: '',
                },
            },
        }
    },
    created() {
      this.getData()
    },
    methods: {
        async getData() {
            try {
                const response = await this.axios.get("http://localhost:3000/products/");
                console.log(response)
                this.product = response.data.data.map((products) => ({
                    id: products._id,
                    code: products.product_code,
                    name: products.product_name,
                    price: products.price,
                    amount: products.amount,
                    detail: products.detail,
                    linkimg: `http://localhost:3000/images/${products.product_img}`,
                }));
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        },
        addCart(item) {
          if(!localStorage.getItem("token")) {
            this.Login = true
          }else {
            this.order.push(item.id);
            localStorage.setItem("order", this.order)
            // this.order.push(item)
            console.log(item.id)
          }
        },
        goToCart() {
          this.$router.push({ name: 'cart', state: { order: this.order } });
        },
        newProduct() {
          this.id = ''
          this.postdata = {...this.postdefault}
          this.dialogedit = true
        },
        saveSelect() {
            if(this.id != '') {
                this.savePutData()
            }else {
                this.savePostData()
            }
        },
        async savePostData() {
            try {
                const {data} = await this.axios.post('http://localhost:3000/products/', this.postdata, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                })
                console.log(data)
                this.getData()
                this.closeItem()
                alert('add product complete')
            }catch (err) {
                console.log(err)
                alert(err)
            }
        },
        async savePutData() {
            try {
                const {data} = await this.axios.put('http://localhost:3000/products/'+this.id, this.postdata, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                })
                console.log(data)
                alert('update complete')
                this.getData()
                this.closeItem()
            }catch (err) {
                console.log(err)
                alert(err)
            }
        },
        closeItem() {
            this.id = ''
            this.postdata = {...this.postdefault}
            this.dialogedit = false
            // this.dialogdelete = false
        },
        editItem(item) {
            this.id = item._id
            this.postdata = {...item}
            this.dialogedit = true
        },
    }
}
</script>

<style>

</style>