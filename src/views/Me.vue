<template>
  <div class="d-flex flex-column justify-space-between align-center">
    <h1> Teerapat Photongkam</h1>
    <!-- <v-card class="mx-auto">
        <v-img src="../assets/1.jpg"
        width="250"
        height="300"/>
    </v-card> -->

    <v-card
    class="mx-auto"
    max-width="450"
    >
        <v-card
        dark
        flat
        >
            <v-img 
            src="../assets/me.jpg" 
            height="400">
                <v-container class="fill-height">
                <v-row align="center">
                </v-row>
                </v-container>
            </v-img>
        </v-card>
        <v-card-text class="py-0">
            <v-timeline
            align-top
            dense >
                <v-timeline-item
                color="teal lighten-3"
                small >
                    <v-row class="pt-1">
                        <v-col cols="3">
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
                        <v-col cols="3">
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
                                <v-img src="https://www.eng.psu.ac.th/images/site/about/about-1.jpg" />
                            </v-avatar>

                            <!-- <v-avatar>
                                <v-img
                                src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale"
                                ></v-img>
                            </v-avatar> -->
                        </v-col>
                    </v-row>
                </v-timeline-item>

                <v-timeline-item
                color="teal lighten-3"
                small >
                    <v-row class="pt-1">
                        <v-col cols="3">
                            <strong>สิ่งที่ชอบ: </strong>
                        </v-col>

                        <v-col>
                            <strong>ภาพยนตร์</strong>
                            <strong>ฟุตบอล</strong>
                            <strong>ชาบู</strong>
                        </v-col>
                    </v-row>
                </v-timeline-item>

                <v-timeline-item
                color="teal lighten-3"
                small >
                    <v-row class="pt-1">
                        <v-col cols="3">
                            <strong>สิ่งที่ไม่ชอบ:</strong>
                        </v-col>
                        <v-col>
                            <strong>ความไม่ตรงต่อเวลา</strong>
                            <strong>ฝุ่น</strong>
                            <!-- <div class="text-caption">
                                Web App
                            </div> -->
                        </v-col>
                    </v-row>
                </v-timeline-item>

                <v-timeline-item
                color="teal lighten-3"
                small >
                    <v-row class="pt-1">
                        <v-col cols="3">
                            <strong>Soft skill:</strong>
                        </v-col>
                        <v-col>
                            <strong></strong>
                            <!-- <div class="text-caption">
                                Web App
                            </div> -->
                        </v-col>
                    </v-row>
                </v-timeline-item>
            </v-timeline>
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
}
</script>

<style>

</style>