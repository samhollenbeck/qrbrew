import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { pool } from '@/lib/db/db'

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username:',
          type: 'text',
        },
        password: {
          label: 'Password:',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials) return null

        const res = await pool.query('SELECT * FROM users WHERE username = $1', [
          credentials.username,
        ])
        const user = res.rows[0]

        if (user && (await bcrypt.compare(credentials.password, user.passwordhashed))) {
          // Remove password before returning user object

          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { passwordhashed: _, ...safeUser } = user
          return safeUser
        }
        return null
      },
    }),
  ],
}
