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
          v-for="(item, index) in order"
          :key="index"
        >
            <td>{{ item.product_name }}</td>
            <td>{{ item.amount_order }}</td>
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
        <body-1> ราคาทั้งหมด: {{total()}} บาท</body-1>
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
            product: [],
            priceTotal: 0,
            order: [],
            id: [],
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
        addProduct(item){
            for (let product of this.order) {
                if(item == product.product_name) {
                    this.postdata.product.amount += 1
                }
            }
        },
        reduceProduct(item) {
            for (let product of this.order) {
                if(item == product.product_name) {
                    this.postdata.product.amount -= 1
                    if(this.postdata.product.amount < 0) {
                        this.postdata.product.amount = 0
                    }
                    console.log(this.order)
                }
            }
        },
        deleteProduct(item) {
            for (let i=0; i < this.order.length; i++)
                if (this.order[i].product_name == item) {
                    this.order.splice(i,1);
                    console.log(this.order)
                    break;
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
            }catch (err) {
                alert(err)
            }
        },
        async getData() {
            this.id = localStorage.getItem("order")
            const splitArray = this.id.split(',');
            for(let i=0; i < splitArray.length; i++) {
                await this.axios.get(`http://localhost:3000/products/${splitArray[i]}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }).then((response) => {
                    this.order.push(response.data.data)
                    console.log(this.order)
                })
            }
            this.postdata.product = await this.order.map((orders) => ({
                product_name: orders.product_name,
                amount: orders.amount_order
            }))
            console.log(this.postdata.product)
        },
        total() {
            return this.order.reduce((acc, item) => acc + item.price * item.amount_order, 0);
            // for(let i=0; i < 2; i++) {
            //    this.priceTotal += (this.order[i].price * this.order[i].amount)
            // }
            // console.log(this.priceTotal)
            // return this.priceTotal
        }
    }
}
</script>

<style>

</style>