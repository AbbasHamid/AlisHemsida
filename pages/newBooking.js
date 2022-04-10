import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { LoginContext } from "../pages/login";

function newBooking() {
  const router = useRouter();
  const { inne, email } = useContext(LoginContext);

  let min = new Date().toLocaleDateString();

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("inne")) {
      console.log(!localStorage.getItem("inne"));

      router.push("/login");
    }
  }

  async function addBookingHandler(event) {
    event.preventDefault();

    let title = `${event.target.title.value}`;
    let adress = `${event.target.address.value}`;
    let date = `${event.target.date.value}`;
    let description = `${event.target.Beskrivning.value}`;
    let time = `${event.target.time.value}`;

    let data = {
      title: title,
      adress: adress,
      date: date,
      description: description,
      userName: localStorage.getItem("email"),
      time: time,
      endTime: "",
      cleaner: "",
    };

    const response = await fetch("/api/bookings/Bookings", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push("/my_bookings");
  }

  return (
    <section className="login-page page-body">
      <form onSubmit={addBookingHandler} className="login-form">
        <h1 className="mb-3">Ny bokning</h1>

        <section className="mb-3">
          <h5>Välj din städning </h5>
          <br />
          <select id="title">
            <option value="Basic städning">Basic städning</option>
            <option value="Topp städning">Topp städning</option>
            <option value="Diamant städning">Diamant städning</option>
            <option value="Fönster tvätt">Fönster tvätt</option>
          </select>
        </section>

        <section className="mb-4">
          <input id="address" type="text" placeholder=" " required></input>
          <label htmlFor="address">Adress</label>
        </section>

        <section className="mb-4">
          <input
            id="date"
            type="date"
            min={min}
            placeholder=" "
            required
          ></input>
          <label htmlFor="date">Datum</label>
        </section>

        <section className="mb-4">
          <input id="time" type="time" min="10:00" max="18:00" placeholder=" " required></input>
          <label htmlFor="time" >Välj tid mellan 10:00 och 18:00</label>
        </section>

        <section className="mb-4">
          <textarea
            id="Beskrivning"
            type="text"
            placeholder=" "
            rows="4"
            cols="50"
            required
          ></textarea>
          <label htmlFor="Beskrivning">Beskriv uppdraget</label>
        </section>

        <button className="w-100" type="submit">
          Boka
        </button>
      </form>
    </section>
  );
}

export default newBooking;
