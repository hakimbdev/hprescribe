import { defineStore } from 'pinia';
import { ref } from 'vue';

export const usePatientStore = defineStore('patients', () => {
  const patients = ref([]);
  const prescriptions = ref([]);

  const addPatient = (patient) => {
    patients.value.push({
      id: Date.now().toString(),
      ...patient,
      createdAt: new Date()
    });
  };

  const addPrescription = (prescription) => {
    prescriptions.value.push({
      id: Date.now().toString(),
      ...prescription,
      createdAt: new Date()
    });
  };

  const getPatientPrescriptions = (patientId) => {
    return prescriptions.value.filter(p => p.patientId === patientId);
  };

  return {
    patients,
    prescriptions,
    addPatient,
    addPrescription,
    getPatientPrescriptions
  };
});