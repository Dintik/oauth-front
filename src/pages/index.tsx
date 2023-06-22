import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./page.module.scss";

export default function Home() {
  const router = useRouter();
  
  const [currentPage, setCurrentPage] = useState("");
  const [embedded, setEmbedded] = useState(false);
  const [iframeStyles, setIframeStyles]: any = useState(false);
  
  const { data: session } = useSession();

  useEffect(() => {
    const url = new URL(window.location.href);
    const baseUrl = `${url.origin}${url.pathname}`;
    setCurrentPage(baseUrl);
  }, [currentPage]);
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const parentUrlParam = urlParams.get("parentUrl");
    const embeddedParam = urlParams.get("embedded");

    setEmbedded(!!embeddedParam);

    if (session && parentUrlParam) {
      router.push(parentUrlParam);
    }
  }, [router, session]);

  useEffect(() => {
    const messageHandler = (event: any) => {
      const message = event.data;
      if (typeof message === "string" && message.startsWith("[iFrameSizer]message:")) {
        const messageJSON = message.slice("[iFrameSizer]message:".length);
        const data = JSON.parse(messageJSON);
        setIframeStyles(data.iframeStyles);
      }

      message.target === "frame-styles" && setIframeStyles(message.data);
    };

    window.addEventListener("message", messageHandler);

    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);

  useEffect(() => {
    const handleSendMessage = (data: any) => {
      window.parent.postMessage({data, target:"oauth-app"}, "*");
    };

    handleSendMessage(session?.user);
  }, [session]);

  return (
    <main
      className={styles.main}
      style={{ background: iframeStyles.background, color: iframeStyles.textColor }}
    >
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
            {embedded ?
              <a href={`${currentPage}?parentUrl=https://iframe-app-ivory.vercel.app`} target="_parent">
                Go to login
              </a>
            :
              <button onClick={() => signIn()}>Sign in</button>
            }
          </>
        }
      </div>
    </main>
  )
}