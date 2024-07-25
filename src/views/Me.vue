<template>
  <div class="d-flex flex-column justify-space-between align-center mt-2">
    <h1> Teerapat Photongkam </h1>
    <h3> ธีรภัทร เปาะทองคำ </h3>
    <!-- <v-card class="mx-auto">
        <v-img src="../assets/1.jpg"
        width="250"
        height="300"/>
    </v-card> -->

    <v-card
    class="mx-auto"
    max-width="410" >
        <v-card
        dark
        flat>
            <v-img 
            src="../assets/me.jpg" 
            max-height="500"
            contain>
                <v-container class="fill-height">
                    <v-row align="center">
                    </v-row>
                </v-container>
            </v-img>
        </v-card>

        <v-card-text class="py-0">
            <!-- <div class="font-weight-bold ml-3 mb-2 mt-2">
                รายละเอียด
            </div> -->
            <v-card-actions>
                <v-btn
                color="teal lighten-3"
                text >
                    รายละเอียด
                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                icon
                @click="show = !show" >
                    <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
                </v-btn>
            </v-card-actions>

            <v-expand-transition>
                <div v-show="show">
                    <v-divider></v-divider>

                    <v-timeline
                    align-top
                    dense >
                        <v-timeline-item
                        color="teal lighten-3"
                        small >
                            <v-row class="pt-1">
                                <v-col cols="4">
                                    <strong>ชื่อเล่น: </strong>
                                </v-col>

                                <v-col>
                                    <strong> เจมส์ </strong>
                                    <!-- <div class="text-caption">
                                        Mobile App
                                    </div> -->
                                </v-col>
                            </v-row>
                        </v-timeline-item>

                        <v-timeline-item
                        color="teal lighten-3"
                        small >
                            <v-row class="pt-1">
                                <v-col cols="4">
                                    <strong>วันเกิด: </strong>
                                </v-col>

                                <v-col>
                                    <strong> 1 กุมภาพันธ์ 2543 </strong>
                                </v-col>
                            </v-row>
                        </v-timeline-item>

                        <v-timeline-item
                        color="teal lighten-3"
                        small >
                            <v-row class="pt-1">
                                <v-col cols="4">
                                    <strong>จบจาก:</strong>
                                </v-col>

                                <v-col>
                                    <strong> มหาวิทยาลัยสงขลานครินทร์ </strong>
                                    <div class="text-caption mb-2">
                                        คณะวิศวกรรมศาสตร์ สาขาคอมพิวเตอร์
                                    </div>
                                    <v-avatar>
                                        <v-img src = "https://www.posn.or.th/wp-content/uploads/2019/01/psu-logo.png" />                              
                                    </v-avatar>
                                    
                                    <v-avatar>
                                        <v-img src = "https://www.eng.psu.ac.th/images/site/about/about-1.jpg" />
                                    </v-avatar>
                                </v-col>
                            </v-row>
                        </v-timeline-item>

                        <v-timeline-item
                        color="teal lighten-3"
                        small >
                            <v-row class="pt-1">
                                <v-col cols="4">
                                    <strong>งานอดิเรก: </strong>
                                </v-col>

                                <v-col>
                                    <div><strong>ดูหนัง</strong></div>
                                    <div><strong>ตีแบดมินตัน</strong></div>
                                    <strong>วิ่งออกกำลังกาย</strong>
                                </v-col>
                            </v-row>
                        </v-timeline-item>

                        <v-timeline-item
                        color="teal lighten-3"
                        icon="mdi-thumb-up"
                        icon-color="white"
                        small >
                            <v-row class="pt-1">
                                <v-col cols="4">
                                    <strong>สิ่งที่ชอบ: </strong>
                                    <!-- <v-btn
                                    class="ma-2"
                                    text
                                    icon
                                    color="blue lighten-2">
                                        <v-icon>mdi-thumb-up</v-icon>
                                    </v-btn> -->
                                </v-col>

                                <v-col>
                                    <strong>ภาพยนตร์</strong>
                                    <div><strong>ฟุตบอล</strong></div>
                                    <strong>ชาบู</strong>
                                </v-col>
                            </v-row>
                        </v-timeline-item>
                    
                        <v-timeline-item
                        color="teal lighten-3"
                        icon="mdi-thumb-down" 
                        small>
                            <v-row class="pt-1">
                                <v-col cols="4">
                                    <strong>สิ่งที่ไม่ชอบ:</strong>
                                    <!-- <v-btn
                                    class="ma-2"
                                    text
                                    icon
                                    color="red lighten-2">
                                        <v-icon></v-icon>
                                    </v-btn> -->
                                </v-col>
                                <v-col>
                                    <div><strong>รถติด</strong></div>
                                    <strong>ฝุ่น</strong>
                                </v-col>
                            </v-row>
                        </v-timeline-item>

                        <v-timeline-item
                        color="teal lighten-3"
                        small >
                            <v-row class="pt-1">
                                <v-col cols="4">
                                    <strong>จุดแข็ง:</strong>
                                </v-col>
                                <v-col>
                                    <div><strong>มีความอดทน</strong></div>
                                    <strong>เรียนรู้เร็ว</strong>
                                </v-col>
                            </v-row>
                        </v-timeline-item>    
                    </v-timeline>
                </div>
            </v-expand-transition>
        </v-card-text>
    </v-card>
    <!-- <ImgCard/> -->
  </div>
</template>

<script>
// import ImgCard from '@/components/ImgCard.vue'
export default {
    // components: {
    //     ImgCard
    // }
    data: () => ({
        show: false,
    }),
}
</script>

<style>

</style>