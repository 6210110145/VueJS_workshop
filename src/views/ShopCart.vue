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
            <!-- <th class="text-left">
                price
            </th> -->
            <th class="text-left">
                amount
            </th>
            <th class="text-left">
                price
            </th>
            <th class="text-center">
                add
            </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(item, index) in order"
          :key="index"
        >
            <td>{{ item.product_name }}</td>
            <td>{{ amount }}</td>
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
        <body-1> ราคาทั้งหมด: {{total}} บาท</body-1>
    </div>

    <div class="d-flex flex-column justify-space-between text-right mt-3 mb-3 mr-10 ml-10">
        <v-btn color="success" @click="showOrder()"> ยืนยันออเดอร์ </v-btn>
    </div>

  </div>
</template>

<script>
export default {
    data() {
        return {
            // order: [{
            //     product_name: 'เสื้อยืดคอกลมสีขาว',
            //     amount: 1,
            //     price: 170
            // },{
            //     product_name: 'เสื้อยืดคอกลมสีดำ',
            //     amount: 1,
            //     price: 150
            // }
            // ],
            product: [],
            priceTotal: 0,
            order: [],
            id: [],
            amount: 1
        }
    },
    created() {
        this.getData()
    },
    computed: {
        // total() {
        //     for(let i=0; i < this.order.length; i++) {
        //         this.priceTotal += (this.order[i].price * this.order[i].amount)
        //     }
        //     return this.priceTotal
        // }
    },
    methods: {
        addProduct(item){
            for (let product of this.order) {
                if(item == product.product_name) {
                    this.amount += 1
                    console.log(this.order)
                }
            }
        },
        reduceProduct(item) {
            for (let product of this.order) {
                if(item == product.product_name) {
                    this.amount -= 1
                    if(product.amount < 0) {
                        this.amount = 0
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
        showOrder() {
            console.log(this.order)
        },
        getData() {
            this.id = localStorage.getItem("order")
            const splitArray = this.id.split(',');
            for(let i=0; i < splitArray.length; i++) {
                this.axios.get(`http://localhost:3000/products/${splitArray[i]}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }).then((response) => {
                    this.order.push(response.data.data)
                    console.log(this.order)
                })
                // console.log(splitArray[i])
            }
        }
        // total() {
            // return this.order.reduce((acc, item) => acc + item.price * item.amount, 0);
        //     for(let i=0; i < 2; i++) {
        //         this.priceTotal += (this.order[i].price * this.order[i].amount)
        //     }
        //     console.log(this.priceTotal)
        //     // return this.priceTotal
        // }
        // async getData() {
        //     try {
        //         const response = await this.axios.get("http://localhost:3000/orders/66a866e37af4f6ff5bc14056", {
        //             headers: {
        //                 Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmIkMTAkazU1WUdzcVdsei82aENiVU9USzFyLnZTZmJRelouSktVOHdSQU1VQzRNdmhJZVdQYi5UcG0iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjE5NjU5Nzd9.cI1D5-9Tk9vgje9GFwGlJ9SrnfKHZUCOErREDC-40ng`
        //             },
        //         });
        //         this.product = response.data.data.product
        //         this.priceTotal = response.data.data.priceTotal
        //         this.order = this.product.map((orders) => ({
        //             id: orders._id,
        //             name: orders.product_name,
        //             amount: orders.amount,
        //         }));
        //     } catch (error) {
        //         console.error("Error fetching products:", error);
        //     }
        // }
    }
}
</script>

<style>

</style>