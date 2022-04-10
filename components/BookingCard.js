import { toast } from "react-toastify";

function Booking({ booking, cleaners, allBookings }) {
 

  async function addCleanerHandler(event) {
    event.preventDefault();

    allBookings.map(bookingHandler => {
      if(bookingHandler.endTime != "" && bookingHandler.cleaner != "" && event.target.cleaner.value == bookingHandler.cleaner){
        if(parseFloat(booking.time) <= parseFloat(bookingHandler.time) && parseFloat(event.target.endTime.value) >= parseFloat(bookingHandler.endTime)){
          console.log("Städare är redan bokad!");
          toast.error("Städare är redan bokad!");
         
        }
      }
    })

    let id = `${booking.id}`;
    let cleaner = `${event.target.cleaner.value}`;
    let endTime = `${event.target.endTime.value}`;

    let data = {
      id: id,
      cleaner: cleaner,
      endTime: endTime,
    };

    const response = await fetch("/api/bookings/Bookings", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  return (
    <div className="row user-card">
      <div className="col-10">
        <div className="row">
          <h6 className="col-3">{booking.title}</h6>
          <h6 className="col-2">{booking.date}</h6>
          <h6 className="col-2">{booking.time}</h6>
          <h6 className="col-3">{booking.address}</h6>
        </div>
      </div>

      <div className="col-2 ">
        <div className="row ">
          <form onSubmit={addCleanerHandler}>
            <select id="cleaner" className=" col-12  btn-danger ">
              <option>
                {booking.cleaner == "" ? "Välj Städare" : booking.cleaner}
              </option>

              {cleaners.map((cleaner) => {
                return <option value={cleaner.name}>{cleaner.name}</option>;
              })}
            </select>
            {booking.endTime == "" ? <input id="endTime" type="time"></input> : <h6>Slut tid: {booking.endTime}</h6>}  
            <button type="submit">submit</button>
          </form>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Booking;
