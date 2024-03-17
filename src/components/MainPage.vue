<script setup lang="ts">
import MainButton from './MainButton.vue';
import SkillDemand from './SkillDemand.vue';
import { ref } from 'vue'

const skillsSection = ref(null)

const features = [
    {
        icon: 'timeline',
        text: 'Skill Demand Over Time',
        subtext: 'Track the rise and fall of tech skills and identify the ones that are gaining the most momentum. Make informed decisions about your learning and career development by staying ahead of the curve.'
    },
    {
        icon: 'pin_drop',
        text: 'Location Hotspots',
        subtext: 'Explore thriving tech hubs and discover exciting locations. TechTrends helps you pinpoint the perfect place to match your career aspirations and lifestyle. From vibrant coastal scenes to bustling metropolises, find your ideal location.'
    },
    {
        icon: 'paid',
        text: 'Salary Trends',
        subtext: 'Negotiate with confidence by understanding salary trends for your target role and location. See how experience level and specific skillsets can influence compensation. TechTrends equips you with valuable data to back up your requests and secure a competitive salary package.'
    },
]
</script>

<template>
    <section class="container-base my-12 py-8 grid grid-cols-2 gap-12 items-center">
        <div class="grid gap-8 py-6 h-fit m-auto relative">
            <img src="/images/compass.jpg" alt="Image of a compass" class="absolute -z-10 w-12 -bottom-6 right-52 rotate-12 opacity-75">
            <h2 class="text-3xl leading-relaxed font-medium">Your <span class="text-secondary font-semibold text-4xl">Compass for Navigating</span> the Tech Job Market</h2>
            <!-- <p class="text-sm">Uncover in-demand skills and stay ahead of the curve. Discover emerging tech hubs and pinpoint the hottest job markets. Negotiate with confidence using data-driven salary trends. TechTrends empowers tech professionals, career advisors, and recruiters with the insights they need to navigate the dynamic tech job landscape.</p> -->
            <p class="text-sm">Uncover in-demand skills, discover job hubs, and negotiate with confidence. TechTrends empowers tech professionals to navigate the job market.</p>
            <MainButton :target-scroll="skillsSection" class="w-fit p-2 px-6" />
            <!-- <span class="text-primary font-thin">Tech<span class="text-secondary font-bold">Trends:</span></span> -->
        </div>
        <img src="/images/line-graph.jpg" alt="Image illustrating some graphs" class="rounded-lg shadow-lg">
    </section>
    <section class="grid gap-20 container-base my-20 py-20 bg-[#f7e3ff]">
        <div>
            <h2 class="text-primary font-medium text-2xl">Key <span class="font-semibold">Features</span></h2>
            <div class="h-1 w-20 bg-secondary mt-2.5"></div>
        </div>
        <div class="grid grid-flow-col gap-12">
            <div v-for="(feature, index) in features" :key="index" class="grid gap-4 text-sm h-fit">
                <span class="material-symbols-outlined text-primary bg-white rounded-full p-3 flex items-center w-12 h-12 shadow-md">
                    {{ feature.icon }}
                </span>
                <h5 class="text-xl font-medium text-primary mb-1">{{ feature.text }}</h5>
                <p>{{ feature.subtext }}</p>
            </div>
        </div>
        <MainButton :target-scroll="skillsSection" class="justify-self-center w-fit" />
    </section>
    <section ref="skillsSection" class="container-base my-8 justify-center text-center grid gap-20">
        <div class="grid w-fit text-center justify-self-center">
            <h2 class="text-primary font-medium text-2xl"><span class="font-semibold">Skill Demand</span> over Time</h2>
            <div class="h-1 w-32 bg-secondary mt-2.5 justify-self-center"></div>
        </div>
        <SkillDemand />
    </section>
</template>