import { useSession, signIn, signOut } from "next-auth/react"
import styles from './page.module.css'

export default function Home() {
  const { data: session } = useSession()
  if(session) {
    return <>
      Signed in as {session.user?.email} <br/>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by OAuth
        </p>
        <p>Not signed in <br/></p>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    </main>
  )
}