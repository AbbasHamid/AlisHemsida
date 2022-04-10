import { useRouter } from "next/router";
import { useState, createContext, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";

let inne = false;
let email = "";
let role = "";
let name = "";
function login({ data }) {
  const router = useRouter();

  const verifyUser = async (event) => {
    event.preventDefault();

    email = `${event.target.username.value}`;
    let password = `${event.target.password.value}`;

    let userNameChech = data.filter((user) => user.email === email);
    if (userNameChech.length === 1) {
      let passwordCheck = data.filter(
        (user) => user.password === password && user.email === email
      );

      if (passwordCheck.length === 1) {
        role = passwordCheck[0].role;
        name = passwordCheck[0].name;
        inne = true;
        localStorage.setItem("inne", true);
        localStorage.setItem("email", `${event.target.username.value}`);
        localStorage.setItem("role", passwordCheck[0].role);
        localStorage.setItem("name", passwordCheck[0].name);
        router.push("/");
      } else {
        toast.error(" fel lösenord");
      }
    } else {
      toast.error("fel namn");
    }
  };

  return (
    <section className="login-page">
      <ToastContainer />
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
    <LoginContext.Provider value={{ inne, email, role, name }}>
      {children}
    </LoginContext.Provider>
  );
};
