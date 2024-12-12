<script setup>
import { usePatientStore } from '../stores/patients';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { format } from 'date-fns';

const store = usePatientStore();
const route = useRoute();

const patientId = route.params.id;

const patient = computed(() => 
  store.patients.find(p => p.id === patientId)
);

const prescriptions = computed(() => 
  store.getPatientPrescriptions(patientId)
    .sort((a, b) => b.createdAt - a.createdAt)
);
</script>

<template>
  <div class="space-y-6">
    <div v-if="patient" class="bg-white p-6 rounded-lg shadow">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">
        {{ patient.firstName }} {{ patient.lastName }}
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <span class="font-medium text-gray-500">Date of Birth:</span>
          <span class="ml-2">{{ patient.dateOfBirth }}</span>
        </div>
        <div>
          <span class="font-medium text-gray-500">Gender:</span>
          <span class="ml-2 capitalize">{{ patient.gender }}</span>
        </div>
        <div>
          <span class="font-medium text-gray-500">Contact:</span>
          <span class="ml-2">{{ patient.contact }}</span>
        </div>
      </div>
      <div class="mt-4">
        <span class="font-medium text-gray-500">Medical History:</span>
        <p class="mt-1">{{ patient.medicalHistory || 'No medical history recorded' }}</p>
      </div>
    </div>

    <div class="bg-white rounded-lg shadow">
      <div class="p-6">
        <h2 class="text-xl font-semibold mb-4">Prescription History</h2>
        <div class="space-y-6">
          <div v-for="prescription in prescriptions" :key="prescription.id"
               class="border-b pb-6 last:border-b-0 last:pb-0">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="font-medium text-gray-900">
                  Prescribed on {{ format(prescription.createdAt, 'PPP') }}
                </h3>
                <p class="text-sm text-gray-500">Next visit: {{ prescription.nextVisit || 'Not specified' }}</p>
              </div>
              <span class="px-3 py-1 text-sm rounded-full"
                    :class="prescription.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'">
                {{ prescription.status }}
              </span>
            </div>

            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-gray-700">Diagnosis</h4>
                <p class="mt-1">{{ prescription.diagnosis }}</p>
              </div>

              <div>
                <h4 class="text-sm font-medium text-gray-700">Medications</h4>
                <div class="mt-2 space-y-2">
                  <div v-for="(medication, index) in prescription.medications" :key="index"
                       class="bg-gray-50 p-3 rounded-md">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-2">
                      <div>
                        <span class="text-sm text-gray-500">Medicine:</span>
                        <span class="ml-1 font-medium">{{ medication.name }}</span>
                      </div>
                      <div>
                        <span class="text-sm text-gray-500">Dosage:</span>
                        <span class="ml-1">{{ medication.dosage }}</span>
                      </div>
                      <div>
                        <span class="text-sm text-gray-500">Frequency:</span>
                        <span class="ml-1">{{ medication.frequency }}</span>
                      </div>
                      <div>
                        <span class="text-sm text-gray-500">Duration:</span>
                        <span class="ml-1">{{ medication.duration }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="prescription.instructions">
                <h4 class="text-sm font-medium text-gray-700">Special Instructions</h4>
                <p class="mt-1">{{ prescription.instructions }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>