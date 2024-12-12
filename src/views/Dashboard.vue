<script setup>
import { usePatientStore } from '../stores/patients';
import { computed } from 'vue';
import { format } from 'date-fns';

const store = usePatientStore();

const recentPrescriptions = computed(() => {
  return store.prescriptions
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 5);
});

const getPatientName = (patientId) => {
  const patient = store.patients.find(p => p.id === patientId);
  return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown Patient';
};
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-2">Total Patients</h2>
        <p class="text-3xl font-bold text-blue-600">{{ store.patients.length }}</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-2">Total Prescriptions</h2>
        <p class="text-3xl font-bold text-green-600">{{ store.prescriptions.length }}</p>
      </div>
      
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-2">Today's Prescriptions</h2>
        <p class="text-3xl font-bold text-purple-600">
          {{ store.prescriptions.filter(p => format(p.createdAt, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')).length }}
        </p>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow">
      <div class="p-6">
        <h2 class="text-xl font-semibold mb-4">Recent Prescriptions</h2>
        <div class="space-y-4">
          <div v-for="prescription in recentPrescriptions" :key="prescription.id"
               class="border-b pb-4 last:border-b-0 last:pb-0">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-medium text-gray-900">{{ getPatientName(prescription.patientId) }}</h3>
                <p class="text-sm text-gray-500">{{ format(prescription.createdAt, 'PPP') }}</p>
              </div>
              <span class="px-3 py-1 text-sm rounded-full"
                    :class="prescription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
                {{ prescription.status }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>