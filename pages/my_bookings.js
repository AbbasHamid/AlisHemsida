import { MongoClient } from "mongodb";
import { useContext } from "react";
import { LoginContext } from "./login";
import { useRouter } from "next/router";
import styled from 'styled-components';


const DetailsLink = styled.a`
  color: black;
  text-decoration: none;

`

let currentAccount;

export default function tjanster(props) {
  const { inne, email, role, name } = useContext(LoginContext);
  const router = useRouter();
  currentAccount = email;

  if (typeof window !== "undefined") {
    if (!localStorage.getItem("inne")) {
      console.log(!localStorage.getItem("inne"));

      router.push("/login");
    }
  }

  let userBookings = [];

  if (typeof window !== "undefined") {
    userBookings =
      localStorage.getItem("role") == "Cleaner"
        ? props.bookings.filter(
            (booking) => booking.cleaner == localStorage.getItem("name")
          )
        : props.bookings.filter(
            (booking) => booking.userName === localStorage.getItem("email")
          );
  }
  return (
    <div className="page-body container">
      <div className="row">
        <h1>Dina bokningar</h1>
        {userBookings.map((booking) => {
          return (
            <div className="col-4 ml-2 mt-5">
              <div className="card">
                <div className="card-body row">
                  <h5 className="card-title">{booking.title}</h5>
                  <p className="card-text">Adress: {booking.address}</p>
                  <p className="card-text">Datum: {booking.date}</p>
                  <button className="w-50 btn-info btn mt-3" type="button">
                    <DetailsLink href={`/${booking.id}`} class="btn btn-primary w-25">
                      Detaljer
                    </DetailsLink>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://Abbas:1111@cluster0.mdcz3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();

  const booknigsCollection = db.collection("bookings");

  const bookningar = await booknigsCollection.find({}).toArray();

  client.close();

  return {
    props: {
      bookings: bookningar.map((meetup) => ({
        title: meetup.title,
        address: meetup.adress,
        description: meetup.description,
        date: meetup.date,
        cleaner: meetup.cleaner,
        userName: meetup.userName,
        id: meetup._id.toString(),
      })),
    },
  };
}
