<template>
    <div id="all-patients">
        <h1>All patients</h1>

        <p><router-link :to="{ name: 'create_patients' }" class="btn btn-primary">Create patients</router-link></p>

        <div class="form-group">
            <input type="text" name="search" v-model="patientsearch" placeholder="Search patients" class="form-control" v-on:keyup="searchpatients">
        </div>

        <table class="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Age</td>
                <td>Sex</td>
                <td>Ethnicity</td>
                <td>Race</td>
                <td>Date of Birth</td>
                <td>Contact Person Name</td>
                <td>Contact Person Phone</td>
                <td>Mrn</td>
                <td>Phone</td>
                <td>Communication</td>
                <td>Marital Status</td>
                <td>Actions</td>

            </tr>
            </thead>

            <tbody>
                <tr v-for="patients in patients">
                    <td>{{ patients.id }}</td>
                    <td>{{ patients.name }}</td>
                    <td>{{ patients.age }}</td>
                    <td>{{ patients.sex }}</td>
                    <td>{{ patients.ethnicity }}</td>
                    <td>{{ patients.race }}</td>
                    <td>{{ patients.dob | formatDate }}</td>
                    <td>{{ patients.contact_person_name }}</td>
                    <td>{{ patients.contact_person_phone }}</td>
                    <td>{{ patients.mrn }}</td>
                    <td>{{ patients.phone }}</td>
                    <td>{{ patients.communication }}</td>
                    <td>{{ patients.marital_status }}</td>
                    <td><img :src="liveImg(patients.id)"></td>
                    <td>
                        <router-link :to="{name: 'edit_patients', params: { id: patients.id }}" class="btn btn-primary">Edit</router-link>
                        <router-link :to="{name: 'delete_patients', params: { id: patients.id }}" class="btn btn-danger">Delete</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

    export default{
        data(){
            return{
                patients: [],
                originalpatients: [],
                patientsearch: ''
            }
        },
        created: function()
        {
            this.fetchpatientsData();
        },

        methods: {
        liveImg: function($id) {
          for(var i = 0; i < this.patients.length; i++)
          {
              if(this.patients[i].id == $id)
              {
                return `${this.patients[i].profile_img}`

              }
          }



         },
            fetchpatientsData: function()
            {
                this.$http.get('http://localhost:3000/api/patients').then((response) => {
                    this.patients = response.body.data;
                    this.originalpatients = this.patients;
                }, (response) => {

                });
            },





            searchpatients: function()
            {
              console.log(this.patientsearch.length)
                console.log(this.patientsearch.length *1 > 3)
              if(this.patientsearch.length  > 3){
                console.log("Inside if condition")
              var qs = require('qs');
              this.$http.get('http://localhost:3000/api/patients/search/?q='+this.patientsearch).then((response) => {
                  this.patients = response.body.data;
                  this.originalpatients = this.patients;
              }, (response) => {

              });

              }
              else {
            this.fetchpatientsData();
              }
            }
        }
    }
</script>
