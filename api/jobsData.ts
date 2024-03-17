import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';

const CACHE_FILE = '/tmp/job_data.json'; // Vercel serverless functions have writable /tmp 
const CACHE_DURATION = 60 * 60 * 1000; // Cache for 1 hour (in milliseconds)

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'GET') {
        return res.status(405).send('Invalid request method')
    }

    try {
        let currentPage = 1
        let hasMoreData = true
        let totalJobs: any[] = []

        // for (let i = 0; i <= 100; i++) {
        //     totalJobs.push(...(await fetchJobs(i)))
        // }

        while (hasMoreData) {
            const jobs = await fetchJobs(currentPage)

            if (jobs.length === 0) {
                hasMoreData = false
            } else {
                totalJobs = totalJobs.concat(jobs)
                currentPage++
            }
        }

        console.log(totalJobs.length)

        storeJobs(totalJobs)

        return res.status(200).json({ message: 'Jobs fetched and cached successfully' })
    } catch (error) {
        console.error('Error: ', error)
        return res.status(500).send('Internal server error')
    }
}

const fetchJobs = async (page: number) => {
    const res = await fetch(`https://api.crackeddevs.com/v1/get-jobs?limit=${30}&page=${page}`, {
        headers: {
            'api-key': '9803c851-b077-496e-b76b-0cda49d7724b'
        }
    })

    if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
    }

    return res.json()
}

const storeJobs = (jobs: any) => {
    fs.writeFileSync(CACHE_FILE, JSON.stringify(jobs));
}