import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Patients from '../views/Patients.vue';
import NewPrescription from '../views/NewPrescription.vue';
import PatientHistory from '../views/PatientHistory.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/patients',
      name: 'Patients',
      component: Patients
    },
    {
      path: '/prescription/new',
      name: 'NewPrescription',
      component: NewPrescription
    },
    {
      path: '/patient/:id/history',
      name: 'PatientHistory',
      component: PatientHistory
    }
  ]
});

export default router;