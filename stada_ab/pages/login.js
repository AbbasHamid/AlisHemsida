import { useRouter } from "next/router";
import { useState, createContext, useMemo } from "react";

let inne = false;
let email = "";
function login({ data }) {
  const router = useRouter();

  const verifyUser = async (event) => {
    event.preventDefault();

    email = `${event.target.username.value}`;
    let password = `${event.target.password.value}`;

    data.map((user) => {
      if (user.email == email) {
        console.log(password, user.password);

        if (user.password == password) {
          console.log("success");
          inne = true;
          router.push("/");
        }
      }
    });
  };

  return (
    <section className="login-page page-body">
      <form onSubmit={verifyUser} className="login-form">
        <h1 className="mb-3">Logga In</h1>
        <section className="mb-3">
          <input id="username" type="text" placeholder=" " required></input>
          <label htmlFor="username">Email</label>
        </section>

        <section className="mb-4">
          <input id="password" type="password" placeholder=" " required></input>
          <label htmlFor="password">Lösenord</label>
        </section>
        <button className="w-100" type="submit">
          Login
        </button>
      </form>
    </section>
  );
}

export default login;

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/users");
  const { data } = await res.json();

  return {
    props: {
      data,
    },
  };
}

export const LoginContext = createContext();
export const StateProvider = ({ children }) => {
  return (
    <LoginContext.Provider value={{ inne, email }}>
      {children}
    </LoginContext.Provider>
  );
};
