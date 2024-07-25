<template>
    <div class="d-flex flex-column justify-space-between align-center">
        <h1> Grade Page </h1>

        <v-form ref="form"
        v-model="valid"
        lazy-validation >
            <v-text-field
            v-model="subject"
            :rules="subjectRule"
            label="subject"
            required>
            </v-text-field>

            <v-text-field
            v-model="score"
            :rules="scoreRules"
            label="score"
            required>
            </v-text-field>

            <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="displayGrade(score); validate();">
                submit
            </v-btn>

            <v-btn
            color="error"
            class="mr-4"
            @click="reset">
                Reset
            </v-btn>

        </v-form>
        <div v-if="show" class="mt-5 d-flex flex-column justify-space-between align-center">
            <h3> Subject: {{subject}} </h3>
            <body-1> Grade: {{grade}} </body-1>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            valid: true,
            subject: '',
            subjectRule: [
                v => !!v || 'Subject is required',
            ],
            score: '',
            scoreRules: [
                v => !!v || 'Score is required',
            ],
            grade: '',
            show: false
        }
    },
    methods: {
        displayGrade(score) {
            if(!score) {
                this.grade = ''
            }else if(score > 100 || score < 0) {
                alert('score must be 0-100')
                this.show = false
            }else if(score >= 80) {
                this.grade = 'A'
                this.show = true
            }else if(score >= 70) {
                this.grade = 'B'
                this.show = true
            }else if(score >= 60) {
                this.grade = 'C'
                this.show = true
            }else if(score >= 50) {
                this.grade = 'D'
                this.show = true
            }else if(score >= 0) {
                this.grade = 'F'
                this.show = true
            }else {
                alert('score must be Number type')
                this.show = false
            }
        },
        reset () {
            this.show = false
            this.$refs.form.reset()
        },
        validate () {
            this.$refs.form.validate()
        },
    }
}
</script>

<style>
.background{
    background-color: #b0bec5
}
</style>