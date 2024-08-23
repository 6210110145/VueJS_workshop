<template>
    <div>
        <h1> Order Page </h1>

        <v-data-table
            :headers="headers"
            :items="orders"
            :items-per-page="5"
            class="elevation-1"     
        > 
            <!-- Custom cell with @click event for the username column -->
            <template v-slot:[`item.username`]="{ item }">
                <div @click="getOrder(item) ">
                    {{ item.username }}
                </div>
            </template>
            
            <template v-slot:[`item.product_name`]="{ item }">
                <div class="pre-line mb-2 mt-2">{{ item.product_name }}</div>
            </template>

            <template v-slot:[`item.amount`]="{ item }">
                <div class="pre-line mb-2 mt-2">{{ item.amount }}</div>
            </template>
        </v-data-table>

        <v-dialog
            v-model="dialogOrder"
            max-width="500px"
            transition="dialog-transition"
        >
            <v-card>
                <v-card-title primary-title>
                    ออเด๋อ
                </v-card-title>
                <v-card-actions>
                    <v-btn color="primary" @click="closeItem()"> close </v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="deleteOrder()"> delete </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            orders: [],
            order: {},
            headers: [
                { 
                    text: 'Name',
                    align: 'start',
                    sortable: false,
                    value: 'username'
                },
                {
                    text: 'Date',
                    value: 'createdAt'
                },
                {
                    text: 'Product',
                    value: 'product_name'
                },
                {
                    text: 'Amount',
                    value: 'amount'
                },
                {
                    text: 'Total (Bath)',
                    value: 'priceTotal'
                },
            ],
            dialogOrder: false,
        }
    },
    created() {
        this.getOrders()
    },
    methods: {
        async getOrders() {
            await this.axios.get("http://localhost:3000/orders/", {
                headers: {
                    Authorization: `Bearer ${this.$cookies.get("token")}`
                }
            }).then((res) => {
                this.orders = res.data.data.map((order) => {
                    let productName = order.product.map((p) => p.product_name).join("\n")
                    let amounts = order.product.map((p) => p.amount).join('\n')

                    return {
                        id: order._id,
                        username: order.username,
                        createdAt: order.created_at,
                        product_name: productName,
                        amount: amounts,
                        priceTotal: order.priceTotal
                    }      
                });            
            });
            // console.log(this.orders)
        },
        async getOrder(item) {
            console.log(item)
            try {
                await this.axios.get("http://localhost:3000/orders/" + item.id, {
                    headers: {
                        Authorization: `Bearer ${this.$cookies.get("token")}`
                    }
                }).then((res) => {
                    console.log(res.data.data)
                    this.order = item
                    this.dialogOrder = true
                })
            } catch (err) {
                alert(err.response.data.message)
            }
        },
        async deleteOrder() {
            await this.axios.delete("http://localhost:3000/orders/" + this.order.id, {
                headers: {
                    Authorization: `Bearer ${this.$cookies.get("token")}`
                }
            }).then((res) => {
                alert(res.data.message)
                this.closeItem()
                window.location.reload()
            });
        },
        closeItem() {
            this.dialogOrder = false
        },
    }
}
</script>

<style>
.pre-line {
    white-space: pre-line;
}
</style>