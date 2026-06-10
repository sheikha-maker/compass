import dynamic from "next/dynamic"

// Sign-in form imports better-auth/react which calls useRef at module load
// time — crashing during server-side prerendering. ssr:false ensures the
// entire auth import chain never runs on the server.
const SignInForm = dynamic(() => import("./sign-in-form"), { ssr: false })

export default function SignInPage() {
  return <SignInForm />
}
