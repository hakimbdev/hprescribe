<script setup>
import { usePatientStore } from '../stores/patients';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const store = usePatientStore();
const router = useRouter();

const prescription = ref({
  patientId: '',
  diagnosis: '',
  medications: [{ name: '', dosage: '', frequency: '', duration: '' }],
  instructions: '',
  nextVisit: '',
  status: 'active'
});

const addMedication = () => {
  prescription.value.medications.push({ name: '', dosage: '', frequency: '', duration: '' });
};

const removeMedication = (index) => {
  prescription.value.medications.splice(index, 1);
};

const savePrescription = () => {
  store.addPrescription({ ...prescription.value });
  router.push('/');
};
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <h1 class="text-3xl font-bold text-gray-900">New Prescription</h1>

    <form @submit.prevent="savePrescription" class="bg-white p-6 rounded-lg shadow space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700">Patient</label>
        <select v-model="prescription.patientId" required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          <option value="">Select Patient</option>
          <option v-for="patient in store.patients" :key="patient.id" :value="patient.id">
            {{ patient.firstName }} {{ patient.lastName }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Diagnosis</label>
        <textarea v-model="prescription.diagnosis" rows="2" required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
      </div>

      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-medium text-gray-900">Medications</h3>
          <button type="button" @click="addMedication"
                  class="text-blue-600 hover:text-blue-700">+ Add Medication</button>
        </div>

        <div v-for="(medication, index) in prescription.medications" :key="index"
             class="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
          <div>
            <label class="block text-sm font-medium text-gray-700">Medicine Name</label>
            <input v-model="medication.name" type="text" required
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Dosage</label>
            <input v-model="medication.dosage" type="text" required
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Frequency</label>
            <input v-model="medication.frequency" type="text" required
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Duration</label>
            <input v-model="medication.duration" type="text" required
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
          <button v-if="prescription.medications.length > 1" type="button"
                  @click="removeMedication(index)"
                  class="text-red-600 hover:text-red-700 text-sm">Remove</button>
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Special Instructions</label>
        <textarea v-model="prescription.instructions" rows="3"
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Next Visit</label>
        <input v-model="prescription.nextVisit" type="date"
               class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
      </div>

      <div class="flex justify-end space-x-3">
        <button type="button" @click="router.push('/')"
                class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
          Cancel
        </button>
        <button type="submit"
                class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Save Prescription
        </button>
      </div>
    </form>
  </div>
</template>