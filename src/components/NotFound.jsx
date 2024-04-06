import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      There's nothing here!
      <br />
      <Link to="/">Back to Home</Link>
    </div>
  );
};

export default NotFound;