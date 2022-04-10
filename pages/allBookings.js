import BookingCard from "../components/BookingCard";
import { MongoClient } from "mongodb";

function allBookings(props) {
  if (typeof window !== "undefined") {
    if (!localStorage.getItem("inne")) {
      console.log(!localStorage.getItem("inne"));

      router.push("/login");
    }
  }
  return (
    <div className="page-body user-card mt-5 mb-5">
      <div>
        <h4 className="mb-5">Alla Bokningar</h4>
        <div>
          {props.bookings.map((booking) => {
            return (
              <div>
                <BookingCard allBookings={props.bookings} booking={booking} cleaners={props.cleaners} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default allBookings;

export async function getServerSideProps() {
  // fetch data from an API
  const client = await MongoClient.connect(
    "mongodb+srv://Abbas:1111@cluster0.mdcz3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db();

  const booknigsCollection = db.collection("bookings");
  const userCollection = db.collection("users");

  const bookningar = await booknigsCollection.find({}).toArray();
  const allCleaners = await userCollection.find({ role: "Cleaner" }).toArray();

  client.close();

  return {
    props: {
      bookings: bookningar.map((meetup) => ({
        endTime: meetup.endTime,
        title: meetup.title,
        address: meetup.adress,
        description: meetup.description,
        date: meetup.date,
        time: meetup.time,
        userName: meetup.userName,
        cleaner: meetup.cleaner,
        id: meetup._id.toString(),
      })),
      cleaners: allCleaners.map((cleaner) => ({
        name: cleaner.name,
      })),
    },
  };
}
