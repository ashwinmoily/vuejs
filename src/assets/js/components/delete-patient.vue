<template>
    <div id="delete-patient">
        <h1>Delete Patient {{ patient.name }}</h1>

        <p><router-link :to="{ name: 'all_patients' }">Return to patients</router-link></p>

        <notification v-bind:notifications="notifications"></notification>

        <form v-on:submit.prevent="deletePatient">
            <p><button class="btn btn-danger">Delete Patient</button></p>
        </form>
    </div>
</template>

<script>
    import Notification from './notifications.vue';

    export default{
        data(){
            return{
                patient:{},
                notifications:[]
            }
        },

        created: function(){
            this.getPatient();
        },

        methods: {
            getPatient: function()
            {
                this.$http.get('http://localhost:3000/api/patient/' + this.$route.params.id).then((response) => {
                    this.patient = response.body;
                }, (response) => {

                });
            },

            deletePatient: function()
            {
                this.$http.delete('http://localhost:3000/api/patients/' + this.$route.params.id, this.patient, {
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }).then((response) => {
                    this.$router.push({name: 'all_patients'})
                }, (response) => {
                    this.notifications.push({
                        type: 'danger',
                        message: 'Patient could not deleted'
                    });
                });
            }
        },

        components: {
            'notification' : Notification
        }
    }
</script>
