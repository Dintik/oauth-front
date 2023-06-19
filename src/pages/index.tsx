import { useSession, signIn, signOut } from "next-auth/react"
import styles from './page.module.css'

export default function Home() {
  const { data: session } = useSession();

  const handleSignIn = () => {
    const signInWindow = window.open('/api/auth/signin?callbackUrl=https%3A%2F%2Foauth-front.vercel.app%2F', 'https%3A%2F%2Foauth-front.vercel.app%2F');
  
    // if (signInWindow !== null) {
    //   signIn(undefined, { callbackUrl: signInWindow.location.href });
    // }
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Get started by OAuth
        </p>

        {session ?
          <>
             <p>Signed in as {session.user?.email} <br/></p>
            <button onClick={() => signOut()}>Sign out</button>
          </>
        :
          <>
            <p>Not signed in <br/></p>
            <button onClick={handleSignIn}>Sign in</button>
          </>
        }
      </div>
    </main>
  )
}