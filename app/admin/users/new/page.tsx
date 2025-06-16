'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { registerUser } from '@/lib/db/actions/auth'

export default function NewUserPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    startTransition(async () => {
      await registerUser(username, password)
      router.push('/admin/users')
    })
  }

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">New User</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
        <div>
          <label className="block mb-1 font-medium" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            className="border p-2 w-full rounded"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="border p-2 w-full rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={isPending}
        >
          {isPending ? 'Registering...' : 'Register'}
        </button>
      </form>
    </main>
  )
}
