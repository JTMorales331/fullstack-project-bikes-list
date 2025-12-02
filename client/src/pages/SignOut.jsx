import { signOut } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";

export default function SignOut() {
  const navigate = useNavigate();

  const handleSignOut = async (e) => {
    e.preventDefault();
    const isSignedOut = await signOut();

    if (isSignedOut) {
      navigate("/", );
    }
  };

  return (
    <form className="form-signin" onSubmit={handleSignOut}>
      <h1 className="h3 mb-3 font-weight-normal text-center">
        Log Out Confirmation
      </h1>

      <h2 className="h5 mb-5 font-weight-normal text-center">
        Are you sure you want to Log Out?
      </h2>

      <div
        className="d-flex flex-column flex-lg-row justify-content-between align-items-center"
        role="group"
      >
        <button
          className="btn btn-lg btn-primary w-100 w-lg-auto mb-3 mb-lg-0 mr-lg-3"
          type="submit"
        >
          Logout
        </button>
        <Link className="btn btn-lg btn-secondary w-100 w-lg-auto" to="/">
          Cancel
        </Link>
      </div>
    </form>
  );
}
