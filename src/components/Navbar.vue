<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <nav class="bg-white shadow">
    <div class="container mx-auto px-4">
      <div class="flex justify-between h-16">
        <div class="flex">
          <div class="flex-shrink-0 flex items-center">
            <h1 class="text-xl font-bold text-blue-600">HealthPrescribe</h1>
          </div>
          <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
            <router-link to="/"
                        class="inline-flex items-center px-1 pt-1 border-b-2"
                        :class="[$route.path === '/' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700']">
              Dashboard
            </router-link>
            <router-link to="/patients"
                        class="inline-flex items-center px-1 pt-1 border-b-2"
                        :class="[$route.path === '/patients' ? 'border-blue-500 text-gray-900' : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700']">
              Patients
            </router-link>
          </div>
        </div>
        <div class="flex items-center">
          <button @click="router.push('/prescription/new')"
                  class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            New Prescription
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>