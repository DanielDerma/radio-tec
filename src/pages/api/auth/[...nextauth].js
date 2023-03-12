import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
  providers: [
    // OAuth authentication providers...
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 4 * 60 * 60, // 4 hours
  },
  callbacks: {
    async signIn(user) {
      if (
        user?.account?.provider === 'google' &&
        user?.user?.email === process.env.AUTHOR_EMAIL
      ) {
        return true
      }
      return false
    },
  },
}

export default NextAuth(authOptions)
