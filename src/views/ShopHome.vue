<template>
  <div>
    <div class="d-flex flex-column justify-space-between align-center mt-3 mb-3">
        <h1> 
            สินค้าทั้งหมด
            <v-btn v-if="role == 'admin'" color="success" @click="newProduct()">Add Product</v-btn>  
        </h1>
        <p class="align-center mt-3 mb-3"> จำนวน {{product.length}} สินค้า</p>
    </div>

    <v-row>
        <v-col col="3" v-for="(item, index) in product" :key="index">
            <v-card
            width="350"
            class="ml-2">
                <v-img 
                :src="item.linkimage"
                width="350"
                height="300">
                </v-img>
                <v-card-title primary-title> 
                    {{item.price}} ฿
                </v-card-title>
                <v-card-title> 
                    {{item.product_name}}
                </v-card-title>
                <v-card-subtitle>
                    {{item.detail.color}} {{item.detail.type}} for {{item.detail.gender}}
                </v-card-subtitle>
                <v-card-text>
                    มีจำนวน: {{item.amount}}
                </v-card-text>
                    <v-card-actions>
                        <v-btn text color="info" @click.once="addCart(item)"> add cart </v-btn>
                        <div v-if="role == 'admin'">
                            <v-btn text color="success" @click="editItem(item)"> edit </v-btn>
                            <v-btn text color="error" @click="deleteItem(item)"> delete </v-btn>
                        </div>
                    </v-card-actions>
            </v-card>
        </v-col>
    </v-row>

    <v-dialog
    v-model="dialogedit"
    max-width="500px">
        <v-card>
            <v-card-title>
                {{savemode}}
            </v-card-title>
            <v-card-text>
                <v-row>
                    <v-col cols="2">
                    <v-text-field
                        name="product_code"
                        label="product_code"
                        id="product_code"
                        v-model="postdata.product_code"
                    ></v-text-field>
                    </v-col>
                    <v-col cols="10">
                        <v-text-field
                        name="product_name"
                        label="product_name"
                        id="product_name"
                        v-model="postdata.product_name"
                        ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-file-input
                        accept="image/*"
                        placeholder="Pick a photo"
                        label="product_img"
                        v-model="postdata.product_img"
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
                <v-btn color="success" text @click="saveSelect()"> select </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog
    v-model="dialogdelete"
    max-width="500px">
        <v-card>
            <v-card-title primary-title>
                Do you want Delete?
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="error" @click="closeItem()"> No </v-btn>
                <v-btn text color="success" @click="deleteData()"> Yes </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </div>
</template>

<script>
// import ShopLoginVue from '@/components/ShopLogin.vue'

export default {
    components: {
    //   ShopLoginVue
    },
    data() {
        return {
            id:'',
            dialogedit: false,
            dialogdelete: false,
            product: [],
            product_response: [],
            order: [],
            token: '',
            Login: false,
            postdata: { // ชุดไว้ส่งข้อมูล
                product_code: '',
                product_name: '',
                linkimage: '',
                product_img: '',
                price: 100,
                amount: 100,
                detail:{
                    type: '',
                    color: '',
                    gender: '',
                },
            },
            postdefault: { // ชุดข้อมูลว่าง เพื่อเพิ่มข้อมูลใหม่
                product_code: '',
                product_name: '',
                linkimage: '',
                product_img: '',
                price: 100,
                amount: 100,
                detail:{
                    type: '',
                    color: '',
                    gender: '',
                },
            },
            role: '',
        }
    },
    created() {
      this.getData()
      this.role = localStorage.getItem("role")
    },
    computed: {
        savemode() {
            return this.id == '' ? 'Add Product' : 'Edit Product'
        }
    },
    methods: {
        async getData() {
            try {
                this.product_response = await this.axios.get("http://localhost:3000/products/");
                this.product = this.product_response.data.data.map((products) => ({
                    id: products._id,
                    product_code: products.product_code,
                    product_name: products.product_name,
                    price: products.price,
                    amount: products.amount,
                    detail: products.detail,
                    linkimage: `http://localhost:3000/images/${products.product_img}`,
                    product_img: products.product_img,
                }));
                // this.role = localStorage.getItem("role")
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
            // console.log(item.id)
          }
        },
        newProduct() {
          this.id = ''
          this.postdata = {...this.postdefault}
          this.dialogedit = true
        },
        closeItem() {
            this.id = ''
            this.postdata = {...this.postdefault}
            this.dialogedit = false
            this.dialogdelete = false
        },
        editItem(item) {
            this.id = item.id
            this.postdata = {...item}
            this.dialogedit = true
        },
        deleteItem(item) {
            this.id = item.id
            this.postdata = {...item}
            this.dialogdelete = true
        },
        saveSelect() {
            if(this.id != '') {
                this.savePutData()
            }else {
                this.savePostData()
            }
        },
        async savePostData() {
            console.log(this.postdata)
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
                const {data} = await this.axios.put('http://localhost:3000/products/'+this.postdata.id, this.postdata, {
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
        async deleteData() {
            try {
                await this.axios.delete('http://localhost:3000/products/'+this.postdata.id, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }).then((response) => {
                    alert(response.data.message)
                    this.closeItem()
                    this.getData()
                })
            }catch (err) {
                alert(err)
            }
        }
    }
}
</script>

<style>

</style>