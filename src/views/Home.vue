<template>
  <!-- 
    min-h-[50vh]: minimum height of 50% viewport height
    md:min-h-[60vh]: minimum height of 60% viewport height on medium screens and up
    lg:min-h-[70vh]: minimum height of 70% viewport height on large screens and up
    flex: display: flex
    flex-col: flex-direction: column
    items-center: align-items: center
    justify-center: justify-content: center
    px-4: padding-left: 1rem, padding-right: 1rem
    safe-area-left: adds padding for mobile device notches/cutouts on left
    safe-area-right: adds padding for mobile device notches/cutouts on right
  -->
  <div class="min-h-[50vh] md:min-h-[60vh] lg:min-h-[70vh] flex flex-col items-center justify-center px-4 safe-area-left safe-area-right">
    <!-- 
      text-center: text-align: center
      mb-12: margin-bottom: 3rem (48px)
    -->
    <div class="text-center mb-12">
      <!-- 
        w-80: width: 20rem (320px)
        mx-auto: margin-left: auto, margin-right: auto (centers horizontally)
        mb-6: margin-bottom: 1.5rem (24px)
      -->
      <div class="w-80 mx-auto mb-6">
        <!-- 
          w-full: width: 100%
          h-auto: height: auto (maintains aspect ratio)
        -->
      </div>
      <!-- 
        text-lg: font-size: 1.125rem (18px)
        text-gray-600: color: rgb(75, 85, 99)
      -->
      <p class="text-lg text-gray-600">{{ appSubtitle }}</p>
    </div>

    <!-- 
      w-full: width: 100%
      max-w-xl: max-width: 36rem (576px)
      lg:max-w-3xl: max-width: 48rem (768px) on large screens
      xl:max-w-4xl: max-width: 56rem (896px) on extra-large screens
    -->
    <div class="w-full md:min-w-[1024px] md:max-w-[1024px] mx-auto">
      <!-- 
        mb-6: margin-bottom: 1.5rem (24px)
      -->
      

      <!-- 
        w-full: width: 100%
      -->
      

      <!-- 
        mt-6: margin-top: 1.5rem (24px)
        text-center: text-align: center
        text-red-600: color: rgb(220, 38, 38)
        bg-red-50: background-color: rgb(254, 242, 242)
        p-4: padding: 1rem (16px)
        rounded-xl: border-radius: 0.75rem (12px)
      -->
      <div v-if="error" class="mt-6 text-center text-red-600 bg-red-50 p-4 rounded-xl">
        {{ error }}
      </div>

      <!-- 
        mt-6: margin-top: 1.5rem (24px)
        space-y-4: adds margin-top of 1rem (16px) to all children except first
      -->
     
    </div>
  </div>
</template>

<style scoped>
body {
  background: #f9fafb;
}
</style>

<script setup>
import { ref, computed, onMounted, inject, watch } from 'vue'
import { useRoute } from 'vue-router'

// Get injected dependencies and router
const route = useRoute()
const textConfig = inject('textConfig')


// Props
const props = defineProps({
  
})

// Constants

const error = ref(null)

// Validation function

// Lifecycle hooks and initialization
onMounted(() => {

 
})


</script> 