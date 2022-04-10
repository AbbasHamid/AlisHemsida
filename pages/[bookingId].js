import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home(props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);


  if (typeof window !== "undefined") {
    if (!localStorage.getItem("inne")) {
      console.log(!localStorage.getItem("inne"));

      router.push("/login");
    }
  }


  const deleteBooking = async (bookingId) => {
    setDeleting(true);

    try {
      await fetch("/api/bookings/Bookings", {
        method: "DELETE",
        body: bookingId,
        contentType: "application/json",
      });

      // reset the deleting state
      setDeleting(false);

      return router.push("/my_bookings");
    } catch (error) {
      // stop deleting state
      return setDeleting(false);
    }
  };

  return (
    <div className="container page-body">
      <div className="card-body card w-50 ">
        <h5 className="booking-title">{props.bookingData.title}</h5>
        <p className="booking-text">Datum: {props.bookingData.date}</p>
        <p className="booking-text">Tid: {props.bookingData.time}</p>
        <p className="booking-text">Adress: {props.bookingData.adress}</p>
        <p className="booking-text">
          Beskrivning: {props.bookingData.description}
        </p>

        <button className="w-50 btn-danger btn mt-3" type="button"
          onClick={() => deleteBooking(props.bookingData.id)}>
          {deleting ? "Avbokar" : "Avboka"}
        </button>

      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://Abbas:1111@cluster0.mdcz3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();

  const bokningsCollection = db.collection("bookings");

  const allaId = await bokningsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: "blocking",
    paths: allaId.map((bokning) => ({
      params: { bookingId: bokning._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  // fetch data for a single meetup

  const bookingsId = context.params.bookingId;

  const client = await MongoClient.connect(
    "mongodb+srv://Abbas:1111@cluster0.mdcz3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();

  const bookingsCollection = db.collection("bookings");

  const selectedBooking = await bookingsCollection.findOne({
    _id: ObjectId(bookingsId),
  });

  client.close();

  return {
    props: {
      bookingData: {
        id: selectedBooking._id.toString(),
        title: selectedBooking.title,
        adress: selectedBooking.adress,
        description: selectedBooking.description,
        date: selectedBooking.date,
        time: selectedBooking.time,
      },
    },
  };
}
