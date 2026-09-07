import { useEffect, useState } from 'react'

type Job = {
  id: number
  title: string
  company: string
  location: string
  salary_min: number
  salary_max: number
}

function App() {
  const [jobs, setJobs] = useState<Job[]>([])

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/jobs`)
      .then((res) => res.json())
      .then((data) => setJobs(data.results))
  }, [])

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-medium mb-4">Job market analytics</h1>
      <ul className="space-y-3">
        {jobs.map((job) => (
          <li key={job.id} className="border rounded-lg p-4">
            <p className="font-medium">{job.title} — {job.company}</p>
            <p className="text-sm text-gray-500">
              {job.location} · ${job.salary_min.toLocaleString()}–${job.salary_max.toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App