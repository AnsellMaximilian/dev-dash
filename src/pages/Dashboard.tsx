import { Button } from "@progress/kendo-react-buttons";
import notFoundImg from "../assets/not-found.svg";

export default function Dashboard() {
  return (
    <div>
      <div className="d-flex flex-column align-items-center py-5 px-4">
        <img
          src={notFoundImg}
          className="mw-100 d-block mx-auto"
          alt="Not found image"
          style={{ width: 400 }}
        />
        <p className="text-center h4 mt-3">
          You haven't submitted your API key yet.
        </p>
        <p className="text-center">
          You can start tracking your account once you've submitted an API key
          from your DEV account.
        </p>
        <Button type="button" className="btn-primary my-1">
          Submit One
        </Button>
      </div>
    </div>
  );
}
