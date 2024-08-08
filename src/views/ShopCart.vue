<template>
  <div>
    <div class="d-flex flex-column justify-space-between align-center mt-3 mb-3">
        <h1> Cart </h1>
    </div>
    
    <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
            <th class="text-left">
                Name
            </th>
            <th class="text-left">
                amount
            </th>
            <th class="text-left">
                price
            </th>
            <th class="text-center">
                action
            </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in postdata.product"
          :key="index"
        >
            <td>{{ item.product_name }}</td>
            <td>{{ item.amount }}</td>
            <td>{{ item.price }}</td>
            <td class="text-center"> 
                <v-btn text color="success" @click="addProduct(item.product_name)">+</v-btn> 
                <v-btn text color="error" @click="reduceProduct(item.product_name)">-</v-btn>
                <v-btn text color="error" @click="deleteProduct(item.product_name)">delete</v-btn>
            </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
    <div class="d-flex flex-column justify-space-between text-right mt-3 mb-3 mr-10">
        <p> ราคาทั้งหมด: {{total()}} บาท</p>
    </div>

    <div class="d-flex flex-column justify-space-between text-right mt-3 mb-3 mr-10 ml-10">
        <v-btn color="success" @click="postOrder()"> ยืนยันออเดอร์ </v-btn>
    </div>

  </div>
</template>

<script>
export default {
    data() {
        return {
            priceTotal: 0,
            order: [],
            product_id: [],
            postdata: {
                product: []
            }
        }
    },
    async created() {
        await this.getData()
    },
    computed: {
        // total() {
        //     for(let i=0; i < this.order.length; i++) {
        //         this.priceTotal += (this.product[i].price * this.postdata.product.amount)
        //     }
        //     return this.priceTotal
        // }
    },
    methods: {
        async getData() {
            this.product_id = localStorage.getItem("order")
            const splitArray = this.product_id.split(',');
            for(let i=0; i < splitArray.length; i++) {
                await this.axios.get(`http://localhost:3000/products/${splitArray[i]}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }).then((response) => {
                    this.order.push(response.data.data)
                })
            }
            this.postdata.product = await this.order.map((orders) => ({
                product_name: orders.product_name,
                price: orders.price,
                amount: 1
            }))
        },
        addProduct(item){
            for(let i=0; i<this.postdata.product.length; i++) {
                if(item == this.postdata.product[i].product_name) {
                    this.postdata.product[i].amount += 1
                }
                console.log(this.postdata.product[i])
            }
        },
        reduceProduct(item) {
            for(let i=0; i<this.postdata.product.length; i++) {
                if(item == this.postdata.product[i].product_name) {
                    this.postdata.product[i].amount -= 1
                    if(this.postdata.product[i].amount < 0) {
                        this.postdata.product[i].amount = 0
                    }
                    console.log(this.postdata.product[i])
                }
            }
        },
        deleteProduct(item) {
            for (let i=0; i < this.postdata.product.length; i++) {
                // const productIdArray = this.product_id.split(',');
                // if(this.order[i]._id == productIdArray) {
                //     localStorage.removeItem('order')
                // }
                if(this.postdata.product[i].product_name == item) {
                    this.postdata.product.splice(i,1);
                    console.log(this.postdata)
                    break
                }
            }
        },
        async postOrder() {
            console.log(this.postdata)
            try {
                await this.axios.post('http://localhost:3000/orders', this.postdata, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                })
                alert('order complete')
                this.postdata = ''
                this.order = []
                localStorage.removeItem('order')
            }catch (err) {
                alert(err)
            }
        },
        total() {
            return this.postdata.product.reduce((acc, item) => acc + item.price * item.amount, 0);
        }
    }
}
</script>

<style>

</style>