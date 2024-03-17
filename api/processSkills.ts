import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';

const CACHE_FILE = '/tmp/job_data.json'; // Vercel serverless functions have writable /tmp 
const CACHE_DURATION = 60 * 60 * 1000; // Cache for 1 hour (in milliseconds)

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const jobs = await getCachedJobs() || (await fetch('http://localhost:3000/api/jobsData') && await getCachedJobs())

    console.log(jobs.length)

    const skillsData: any[] = []
    const currentDate = new Date().toISOString().slice(0,10)

    jobs.forEach(job => {
        const jobDate = job.created_at.slice(0,10)

        if (!skillsData.some(skillData => skillData.date === jobDate)) {
            skillsData.push({ date: jobDate, jobCount: 0, skills: [] })
        }

        const index = skillsData.findIndex(skillData => skillData.date === jobDate)

        job.technologies?.forEach(skill => {
            if (skillsData[index].skills.some(skillData => skillData.name === skill)) {
                skillsData[index].skills[skillsData[index].skills.findIndex(skillData => skillData.name === skill)].count += 1
            } else {
                skillsData[index].skills.push({ name: skill, count: 1 })
            }
        })

        skillsData[index].jobCount++
    })

    console.log((jobs.filter(job => job.technologies === null || job.technologies.length === 0)).length)
    console.log((jobs.filter(job => job.created_at === null)).length)


    return res.status(200).json({ skillsData, jobs })
}

const getCachedJobs = async () => {
    try {
        if (fs.existsSync(CACHE_FILE)) {
            const fileAge = Date.now() - fs.statSync(CACHE_FILE).mtimeMs;
            if (fileAge < CACHE_DURATION) {
                return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
            }
        }
    } catch (error) {
        console.error("Error reading cache:", error);
        return null;
    }
}