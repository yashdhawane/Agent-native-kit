"use client";

import { useState } from "react";
import { authClient } from "../lib/auth-client";
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";

type Props = Omit<ImageProps, "src"> & {
  srcLight: string;
  srcDark: string;
};

const ThemeImage = (props: Props) => {
  const { srcLight, srcDark, ...rest } = props;

  return (
    <>
      <Image {...rest} src={srcLight} className="imgLight" />
      <Image {...rest} src={srcDark} className="imgDark" />
    </>
  );
};

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    setMessage("Signing up...");

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    if (error) {
      setMessage(error?.message ?? "Sign up failed");
      return;
    }

    console.log("Sign up:", data);
    setMessage(`Signed up as ${email}`);
  };

  const handleSignIn = async () => {
    setMessage("Signing in...");

    const { data, error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      setMessage(error?.message ?? "Sign up failed");
      return;
    }

    console.log("Sign in:", data);
    setMessage(`Signed in as ${email}`);
  };

  const handleMe = async () => {
    const response = await fetch("/api/me", {
      credentials: "include",
    });

    const data = await response.json();

    console.log("API /api/me:", data);

    if (!response.ok) {
      setMessage(data.error?.message ?? "Protected API failed");
      return;
    }

    setMessage(`Protected API works for ${data.user.email}`);
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Auth Test</h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button onClick={handleSignUp}>Sign Up</button>

        <button onClick={handleSignIn}>Sign In</button>

        <button onClick={handleMe}>Test Protected API</button>

        <p>{message}</p>

        <ThemeImage
          className={styles.logo}
          srcLight="turborepo-dark.svg"
          srcDark="turborepo-light.svg"
          alt="Turborepo logo"
          width={180}
          height={38}
          priority
        />

        <Button appName="web" className={styles.secondary}>
          Open alert
        </Button>
      </main>
    </div>
  );
}