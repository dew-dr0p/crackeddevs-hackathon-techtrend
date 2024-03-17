async function getJobs() {
    const res = await fetch(`https://api.crackeddevs.com/v1/get-jobs?limit=${30}&page=${155}`, {
        headers: {
            'api-key': '9803c851-b077-496e-b76b-0cda49d7724b'
        }
    })
    const jobs = await res.json()
    // jobs.forEach(job => {
    //     const jobKeys = Object.keys(job)
    //     console.log(jobKeys)
    // });
    // const firstJob = jobs[0]
    // const searchDescription = countOccurrences(firstJob.description, 'and')
    
    console.log(jobs)

    const jobUrls = []

    let technologiesCount = {}
    let jobTypeCount = {}

    const technologyListings = ['html', 'css', 'react', 'vue', 'angular', 'node', 'python', 'typescript', 'nextjs', 'javascript', 'java', 'csharp', 'php', 'go', 'rust', 'swift', 'kotlin', 'sql', 'mongodb', 'postgres', 'mysql', 'docker', 'kubernetes', 'aws', 'reactnative', 'flutter', 'django', 'spring', 'laravel', 'web3', 'c++', 'graphql', 'solidity', 'gcp']
    const jobListings = ['full_time', 'part_time', 'freelance', 'internship', 'co_founder']

    const technologies = []

    technologyListings.forEach(technology => {
        if (!technologiesCount[technology]) technologiesCount[technology] = 0
        jobs.forEach(job => {
            extractUrl(job, jobUrls)
            extractTechnologies(job, technologies)
            const searchDescription = countOccurrences(job.description, technology, true)
            const searchTechnologies = countOccurrences(job.technologies, technology, false)
    
            const totalCount = searchDescription + searchTechnologies
    
            technologiesCount[technology] += totalCount
        });
    })

    jobListings.forEach(jobType => {
        if (!jobTypeCount[jobType]) jobTypeCount[jobType] = 0
        jobs.forEach(job => {
            if (job.job_type == jobType) jobTypeCount[jobType]++
        })
    })

    // console.log(Object.keys(jobs[0]), technologiesCount, jobTypeCount, technologies, jobUrls)

    //console.log(jobs, firstJob, firstJob.description, searchDescription)
}

function countOccurrences(text, word, ifString) {
    let words
    if (ifString) {
        words = text.toLowerCase().split(" "); // Split the text into words
    } else {
        words = text
    }
    let count = 0;
    if (words !== null) {
        for (let i = 0; i < words.length; i++) {
            if (words[i] == word) {
                count++;
            }
        }
        return count;
    }
    return 0;
}

function extractTechnologies(job, technologiesArray) {
    if (job.technologies) {
        job.technologies.forEach((technology) => {
            if (!technologiesArray.includes(technology)) technologiesArray.push(technology)
        })
    }
}

function extractUrl(job, urlArray) {
    if (job.url && !urlArray.includes(job.url)) {
        urlArray.push(job.url)
    }
}

getJobs()