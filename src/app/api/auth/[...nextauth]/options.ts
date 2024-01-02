import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "email:",
          type: "text",
          placeholder: "email...",
          required: true,
        },
        password: {
          label: "password:",
          type: "password",
          placeholder: "password...",
          required: true,
        },
      },
      async authorize(credentials) {
        try {
          const token = await _login({
            email: credentials?.email,
            password: credentials?.password,
          });
          const authUser = await _getOwnProfile(token);
          authUser.token = token;
          return authUser;
        } catch (error: any) {
          console.log("authorized fail");
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) token.role = user.role;
      if (user) token.token = user.token;
      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) session.user.role = token.role;
      if (session?.user) session.user.token = token.token;
      return session;
    },
  },
  session: {
    maxAge: 4 * 60 * 60, // 4 hours
  },
};

async function _login({ email, password }: any) {
  try {
    const response = await axios.post(process.env.BASE_URL_API + "/login", {
      email,
      password,
      device_name: "website",
    });

    const { status, message, data } = response.data;

    if (status == false) {
      throw new Error(message);
    }

    return data.access_token;
  } catch (error: any) {
    const { status, message } = error.response.data;
    if (status == false) {
      throw new Error(message);
    }

    throw error;
  }
}

async function _getOwnProfile(token: string) {
  try {
    const response = await axios.get(
      process.env.BASE_URL_API + "/logged-user",
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    const { status, message, data } = response.data;

    if (status == false) {
      throw new Error(message);
    }

    return data.logged_user;
  } catch (error: any) {
    const { status, message } = error.response.data;
    if (status == false) {
      throw new Error(message);
    }

    throw error;
  }
}
