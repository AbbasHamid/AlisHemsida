import { MongoClient, ObjectId } from "mongodb";
import Link from "next/link";

export default function Home(props) {
  return (
    <div class="card w-50">
      <div class="card-body">
        <h5 class="card-title">{props.bookingData.title}</h5>
        <p class="card-text">Datum: {props.bookingData.date}</p>
        <p class="card-text">Adress: {props.bookingData.adress}</p>
        <p class="card-text">Beskrivning: {props.bookingData.description}</p>
        <Link href="#" class="btn btn-primary">
          Edit or delete
        </Link>
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
      },
    },
  };
}
