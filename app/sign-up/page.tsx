import dynamic from "next/dynamic"

// Sign-up form imports better-auth/react which calls useRef at module load
// time — crashing during server-side prerendering. ssr:false ensures the
// entire auth import chain never runs on the server.
const SignUpForm = dynamic(() => import("./sign-up-form"), { ssr: false })

export default function SignUpPage() {
  return <SignUpForm />
}
