<script setup>
import { usePatientStore } from '../stores/patients';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const store = usePatientStore();
const router = useRouter();

const newPatient = ref({
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  gender: '',
  contact: '',
  medicalHistory: ''
});

const showAddForm = ref(false);

const addNewPatient = () => {
  store.addPatient({ ...newPatient.value });
  newPatient.value = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    contact: '',
    medicalHistory: ''
  };
  showAddForm.value = false;
};

const viewHistory = (patientId) => {
  router.push(`/patient/${patientId}/history`);
};
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-gray-900">Patients</h1>
      <button @click="showAddForm = true"
              class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Add New Patient
      </button>
    </div>

    <!-- Add Patient Form -->
    <div v-if="showAddForm" class="bg-white p-6 rounded-lg shadow">
      <h2 class="text-xl font-semibold mb-4">Add New Patient</h2>
      <form @submit.prevent="addNewPatient" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">First Name</label>
            <input v-model="newPatient.firstName" type="text" required
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Last Name</label>
            <input v-model="newPatient.lastName" type="text" required
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input v-model="newPatient.dateOfBirth" type="date" required
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Gender</label>
            <select v-model="newPatient.gender" required
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Contact</label>
            <input v-model="newPatient.contact" type="tel" required
                   class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Medical History</label>
          <textarea v-model="newPatient.medicalHistory" rows="3"
                    class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"></textarea>
        </div>
        <div class="flex justify-end space-x-3">
          <button type="button" @click="showAddForm = false"
                  class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit"
                  class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            Save Patient
          </button>
        </div>
      </form>
    </div>

    <!-- Patients List -->
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="patient in store.patients" :key="patient.id">
            <td class="px-6 py-4 whitespace-nowrap">
              {{ patient.firstName }} {{ patient.lastName }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">{{ patient.dateOfBirth }}</td>
            <td class="px-6 py-4 whitespace-nowrap capitalize">{{ patient.gender }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ patient.contact }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-right">
              <button @click="viewHistory(patient.id)"
                      class="text-blue-600 hover:text-blue-900">View History</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>