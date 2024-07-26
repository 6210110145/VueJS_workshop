<template>
  <div>
    <h1> APIcon</h1>
    <v-row>
        <v-col cols="12">
            <v-btn color="success" @click="newItem()">netItem</v-btn>
        </v-col>
    </v-row>
    <!-- <body-1> {{apidata}} </body-1> -->
    <v-row>
        <v-col col="3" v-for="(item, index) in apidata" :key="index">
            <v-card width="350">
                <v-img 
                src="https://static.independent.co.uk/2021/05/24/20/doge.jpg"
                width="350"
                height="300"/>
                <v-card-title primary-title> 
                    {{item.firstname}} {{item.surname}} 
                </v-card-title>
                    <v-card-actions>
                        <v-btn color="info" @click="editItem(item)">edit</v-btn>
                        <v-btn color="" text @click="deleteData(item)"> delete </v-btn>
                    </v-card-actions>
            </v-card>
        </v-col>

            <!-- <v-col cols='12'>
                <h1> {{token}} </h1>
                <v-text-field
                name="name"
                label="name"
                id="name"
                v-model="name">
                </v-text-field>

                <v-text-field
                name="token"
                label="token"
                id="token"
                v-model="token">
                </v-text-field>
                <v-btn color="info" @click="setToken(token)">alert</v-btn>
            </v-col>

            <v-col cols="12">
                <testpropsz :name="name" @displayAlert="displayAlert"/>
            </v-col> -->
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
                        <v-col cols="6">
                            <v-text-field
                                name="username"
                                label="username"
                                id="username"
                                v-model="postdata.username"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                name="password"
                                label="password"
                                id="password"
                                v-model="postdata.password"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                name="firstname"
                                label="firstname"
                                id="firstname"
                                v-model="postdata.firstname"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                name="surname"
                                label="surname"
                                id="surname"
                                v-model="postdata.surname"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                name="age"
                                label="age"
                                id="age"
                                v-model="postdata.age"
                            ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field
                                name="gender"
                                label="gender"
                                id="gender"
                                v-model="postdata.gender"
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="closeItem()"> cancel</v-btn>
                    <v-btn color="success" text @click="saveSelect()"> save </v-btn>
                    <!-- <v-btn color="" text @click="deleteData()"> delete </v-btn> -->
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
        v-model="dialogdelete"
        max-width="500px">
            <v-card>
                <v-card-title>
                    Sure?
                </v-card-title>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" text @click="closeItem()"> NO </v-btn>
                    <v-btn color="success" text @click="deleteData()"> YES </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
  </div>
</template>

<script>
export default {
    data() {
        return {
            dialogedit: false,
            dialogdelete: false,
            id: '',
            apidata: [],
            postdata: { // ชุดไว้ส่งข้อมูล
                username: '',
                password: '',
                firstname: '',
                surname: '',
                age: 20,
                gender: '',
                role: ''
            },
            postdefault: { // ชุดไว้ล้างข้อมูล
                username: '',
                password: '',
                firstname: '',
                surname: '',
                age: 20,
                gender: '',
                role: ''
            },
        }
    },
    created() {
        this.getData()
    },
    computed: {
        savemode() {
            return this.id == '' ? 'New User' : 'Edit User'
        }
    },
    methods: {
        saveSelect() {
            if(this.id != '') {
                this.savePutData()
                // alert('put')
            }else {
                this.savePostData()
                // alert('post')
            }
        },
        deleteSelect() {
            if (this.id) {
                this.dialogdelete = true
            }
        },
        newItem() {
            this.id = ''
            this.postdata = {...this.postdefault}
            this.dialogedit = true
        },
        editItem(item) {
            this.id = item._id
            this.postdata = {...item}
            this.dialogedit = true
        },
        deleteItem(item) {
            this.id = item._id
            this.postdata = {...item}
            this.dialogdelete = true
        },
        closeItem() {
            this.id = ''
            this.postdata = {...this.postdefault}
            this.dialogedit = false
            this.dialogdelete = false
        },
        getData() {
            this.axios.get('http://localhost:3000/users/', {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmIkMTAkazU1WUdzcVdsei82aENiVU9USzFyLnZTZmJRelouSktVOHdSQU1VQzRNdmhJZVdQYi5UcG0iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjE5NjU5Nzd9.cI1D5-9Tk9vgje9GFwGlJ9SrnfKHZUCOErREDC-40ng`
                },
            }).then((response) => {
                console.log(response.data)
                this.apidata = response.data.data // ทำให้เป็น array
            })
        },
        async savePostData() {
            try {
                const {data} = await this.axios.post('http://localhost:3000/users/register', this.postdata, {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmIkMTAkazU1WUdzcVdsei82aENiVU9USzFyLnZTZmJRelouSktVOHdSQU1VQzRNdmhJZVdQYi5UcG0iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjE5NjU5Nzd9.cI1D5-9Tk9vgje9GFwGlJ9SrnfKHZUCOErREDC-40ng`
                    },
                })
                console.log(data)
                alert('register complete')
                this.getData()
                this.closeItem()
            }catch (err) {
                console.log(err)
                alert(err)
            }
        },
        async savePutData() {
            try {
                const {data} = await this.axios.put('http://localhost:3000/users/'+this.id, this.postdata, {
                    headers: {
                        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmIkMTAkazU1WUdzcVdsei82aENiVU9USzFyLnZTZmJRelouSktVOHdSQU1VQzRNdmhJZVdQYi5UcG0iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjE5NjU5Nzd9.cI1D5-9Tk9vgje9GFwGlJ9SrnfKHZUCOErREDC-40ng`
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
        async deleteData(item) {
            if(confirm('delete ' + item.username)){
                try {
                    const {data} = await this.axios.delete('http://localhost:3000/users/'+item._id, {
                        headers: {
                            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiIkMmIkMTAkazU1WUdzcVdsei82aENiVU9USzFyLnZTZmJRelouSktVOHdSQU1VQzRNdmhJZVdQYi5UcG0iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjE5NjU5Nzd9.cI1D5-9Tk9vgje9GFwGlJ9SrnfKHZUCOErREDC-40ng`
                        },
                    })
                    console.log(data)
                    alert('delete complete')
                    this.closeItem()
                    this.getData()
                }catch (err) {
                    console.log(err)
                    alert(err)
                }
            }   
        },
    }
}
</script>

<style>

</style>