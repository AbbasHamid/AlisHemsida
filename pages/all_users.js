import UserCard from "../components/user-card";

export default function all_users({ data }) {
  if (typeof window !== "undefined") {
    if (!localStorage.getItem("inne")) {
      console.log(!localStorage.getItem("inne"));

      router.push("/login");
    }
  }

  return (
    <div className="page-body user-card mt-5 mb-5">
      <div>
        <h4 className="mb-5">Alla städarna</h4>
        <div>

          <div className="col-11">
            <div className="row">
              <h5 className="col-2">Förnamn:</h5>

              <h5 className="col-2">Efternamn:</h5>
              <h5 className="col-2">Adress:</h5>

              <h5 className="col-2">Cpr-nr:</h5>
              <h5 className="col-2">Role:</h5>
              <br /><br />
            </div>
          </div>

          {data.map((user) => {
            if (user.role == "Cleaner") {
              return <UserCard user={user} />;
            }
          })}
          <hr />
        </div>
      </div>

      <div>
        <h4 className="mb-5">Alla kunder</h4>
        <div>
          <div className="col-11">
            <div className="row">
              <h5 className="col-2">Förnamn:</h5>

              <h5 className="col-2">Efternamn:</h5>
              <h5 className="col-2">Adress:</h5>

              <h5 className="col-2">Cpr-nr:</h5>
              <h5 className="col-2">Role:</h5>
              <br /><br />
            </div>
          </div>

          {data.map((user) => {
            if (user.role == "Customer") {
              return <UserCard user={user} />;
            }
          })}
          <hr />
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/users");

  const { data } = await res.json();

  return {
    props: {
      data,
    },
  };
}
