import { MongoClient } from "mongodb";
const ObjectId = require("mongodb").ObjectId;

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(
      "mongodb+srv://Abbas:1111@cluster0.mdcz3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
    const db = client.db();

    const bookingCollection = db.collection("bookings");
    const result = await bookingCollection.insertOne(data);
    client.close();

    res.status(201).json({ message: "Booking inserted!" });
    console.log(result);
  } else if (req.method === "GET") {
    // fetch data from an API
    const client = await MongoClient.connect(
      "mongodb+srv://Abbas:1111@cluster0.mdcz3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
    const db = client.db();

    const bookingCollection = db.collection("bookings");

    const bookings = await bookingCollection.find({
      userName: req.body.userName,
    });

    res.status(200).json({ success: true, data: bookings });

    client.close();
  } else if (req.method === "DELETE") {
    const client = await MongoClient.connect(
      "mongodb+srv://Abbas:1111@cluster0.mdcz3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
    const db = client.db();

    const bookingCollection = db.collection("bookings");

    const deleteBooking = await bookingCollection.deleteOne({
      _id: ObjectId(req.body),
    });

    res.status(200).json({ success: true, data: {} });

    client.close();
  } else if (req.method === "PUT") {
    try {
      const client = await MongoClient.connect(
        "mongodb+srv://Abbas:1111@cluster0.mdcz3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
      );
      const db = client.db();

      const bookingCollection = db.collection("bookings");
      const user = await bookingCollection.updateOne(
        {
          _id: ObjectId(req.body.id),
        },
        {
          $set: { cleaner: req.body.cleaner, endTime: req.body.endTime },
        }
      );

      if (!user) {
        return res.status(400).json({ success: false });
      }

      res.status(200).json({ success: true, data: user });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }
}

export default handler;
