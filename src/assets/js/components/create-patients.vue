<template>
    <div id="create-patient">
        <h1>Create patient</h1>

        <p><router-link :to="{ name: 'all_patients' }">Return to patients</router-link></p>

        <notification v-bind:notifications="notifications"></notification>

        <form v-on:submit.prevent="addpatient">
            <div class="form-group">
                <label name="patient_id">ID</label>
                <input type="text" class="form-control" disabled v-model="patient.id" id="patient_id">
            </div>

            <div class="form-group">
                <label name="patient_name">Name</label>
                <input type="text" class="form-control" v-model="patient.name" id="patient_name" required>
            </div>

            <div class="form-group">
                <label name="patient_age">Age</label>
                <input type="text" class="form-control" v-model="patient.age" id="patient_age" required>
            </div>

            <div class="form-group">
                <label name="patient_sex">Sex</label>
                <input type="text" class="form-control" v-model="patient.sex" id="patient_sex" required>
            </div>
            <div class="form-group">
                <label name="patient_ethnicity">Ethnicity</label>
                <input type="text" class="form-control" v-model="patient.ethnicity" id="patient_ethnicity" required>
            </div>
            <div class="form-group">
                <label name="patient_race">Race</label>
                <input type="text" class="form-control" v-model="patient.race" id="patient_race" required>
            </div>
            <div class="form-group">
                <label name="patient_dob">Date of Birth</label>
                <input type="text" class="form-control" v-model="patient.dob" id="patient_dob" required>
            </div>
            <div class="form-group">
                <label name="patient_contact_person_name">Contact Person Name</label>
                <input type="text" class="form-control" v-model="patient.contact_person_name" id="patient_contact_person_name" required>
            </div>
            <div class="form-group">
                <label name="patient_contact_person_phone">Contact Person Phone</label>
                <input type="text" class="form-control" v-model="patient.contact_person_phone" id="patient_contact_person_phone" required>
            </div>
            <div class="form-group">
                <label name="patient_mrn">MRN</label>
                <input type="text" class="form-control" v-model="patient.mrn" id="patient_mrn" required>
            </div>
            <div class="form-group">
                <label name="patient_phone">Phone</label>
                <input type="text" class="form-control" v-model="patient.phone" id="patient_phone" required>
            </div>
            <div class="form-group">
                <label name="patient_marital_address">Address</label>
                <input type="text" class="form-control" v-model="patient.address" id="patient_address" required>
            </div>
            <div class="form-group">
                <label name="patient_communication">Communication</label>
                <input type="text" class="form-control" v-model="patient.communication" id="patient_communication" required>
            </div>
            <div class="form-group">
                <label name="patient_marital_status">Marital Status</label>
                <input type="text" class="form-control" v-model="patient.marital_status" id="patient_marital_status" required>
            </div>

            <div class="form-group">
                <button class="btn btn-primary">Create</button>
            </div>
        </form>
    </div>
</template>

<script>
    import Notification from './notifications.vue';
    import axios from 'axios';


    export default{
        data(){
            return{
                patient:{},
                notifications:[]
            }
        },

        methods: {
            addpatient: function()
            {
                // Validation
                var age = parseFloat(this.patient.age);
                if(isNaN(age))
                {
                    this.notifications.push({
                        type: 'danger',
                        message: 'Age must be a number'
                    });
                    return false;
                } else {
                    this.patient.age = this.patient.age;
                }
                  this.patient.profile_img = "";
                  var qs = require('qs');
                axios.post('http://localhost:3000/api/patients', qs.stringify(this.patient),
                      ).then((response) => {
                    this.notifications.push({
                        type: 'success',
                        message: 'patient created successfully'
                    });
                }, (response) => {
                    this.notifications.push({
                        type: 'error',
                        message: 'patient not created'
                    });
                });
            }
        },

        components: {
            'notification' : Notification
        }
    }
</script>
