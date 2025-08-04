import React, { useEffect, useState } from "react";
import Mainpage from "./components/mainpage";
import Authpage from "./components/authPage";
import { supabase } from "./supabase";

const App = () => {
  const [session, setSession] = useState(null);

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    console.log(currentSession);
    setSession(currentSession.data.session);
  };

  useEffect(() => {
    fetchSession();

    const { data: sessionListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      sessionListener.subscription.unsubscribe();
    };
  }, []);

  return <>{session ? <Mainpage session={session} /> : <Authpage />}</>;
};

export default App;
