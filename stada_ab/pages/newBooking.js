import { useRouter } from "next/router";
import { useContext } from "react";
import { LoginContext } from "../pages/login";

function newBooking() {
  const router = useRouter();
  const { inne, email } = useContext(LoginContext);

  if (!inne) {
    router.push("/login");
  }

  async function addBookingHandler(event) {
    event.preventDefault();

    let title = `${event.target.title.value}`;
    let adress = `${event.target.address.value}`;
    let date = `${event.target.date.value}`;
    let description = `${event.target.Beskrivning.value}`;

    let data = {
      title: title,
      adress: adress,
      date: date,
      description: description,
      userName: email,
    };

    const response = await fetch("/api/bookings/Bookings", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    router.push("/");
  }

  return (
    <section className="login-page page-body">
      <form onSubmit={addBookingHandler} className="login-form">
        <h1 className="mb-3">Ny bokning</h1>

        <section className="mb-3">
          <input id="title" type="text" placeholder=" " required></input>
          <label htmlFor="title">Titel</label>
        </section>

        <section className="mb-4">
          <input id="address" type="text" placeholder=" " required></input>
          <label htmlFor="address">Adress</label>
        </section>

        <section className="mb-4">
          <input id="date" type="date" placeholder=" " required></input>
          <label htmlFor="date">Datum</label>
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