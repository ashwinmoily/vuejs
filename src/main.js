import Vue from 'vue'
import moment from 'moment'

import VueRouter from 'vue-router'
Vue.use(VueRouter)

import VueResource from 'vue-resource';
Vue.use(VueResource);




import App from './App.vue'

const AllPatients = require('./assets/js/components/all-patients.vue');
const CreatePatients = require('./assets/js/components/create-patients.vue');
const EditPatient = require('./assets/js/components/edit-patient.vue');
const DeletePatient = require('./assets/js/components/delete-patient.vue');




const routes = [
    {
        name: 'all_patients',
        path: '/',
        component: AllPatients
    },
    {
        name: 'create_patients',
        path: '/patients/create',
        component: CreatePatients
    },
    {
        name: 'edit_patients',
        path: '/patients/edit/:id',
        component: EditPatient
    },
    {
        name: 'delete_patients',
        path: '/patients/delete/:id',
        component: DeletePatient
    }
];



var router = new VueRouter({ routes: routes, mode: 'history' });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');


Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
});
