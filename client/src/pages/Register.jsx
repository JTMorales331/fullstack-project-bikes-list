import "../css/signin.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);
    mutation.mutate(data);
  }

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (responseBody) => {
      console.log("Register success!", responseBody);

      // token is now available
      navigate("/");
    },
    onError: (err) => {
      console.error("Register Error: ", err.message);
    },
  });

  return (
    // first name, last name, email, and password
    <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="h3 mb-3 font-weight-normal text-center">Register</h1>

      <div className="mb-3">
        <label htmlFor="inputFirstName" className="">
          First Name
        </label>
        <input
          type="text"
          id="inputFirstName"
          className="form-control"
          placeholder="First Name"
          autoFocus
          {...register("first_name", { required: "First Name is required" })}
        />
        {errors.first_name && (
          <div className="text-danger">{errors.first_name.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="inputLastName" className="">
          Last Name
        </label>
        <input
          type="text"
          id="inputLastName"
          className="form-control"
          placeholder="Last Name"
          autoFocus
          {...register("last_name", { required: "Last Name is required" })}
        />
        {errors.last_name && (
          <div className="text-danger">{errors.last_name.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="inputEmail" className="">
          Email address
        </label>
        <input
          type="text"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          autoFocus
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <div className="text-danger">{errors.email.message}</div>
        )}
      </div>

      <div className="mb-3">
        <label htmlFor="inputPassword" className="">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control mb-0"
          placeholder="password"
          autoFocus
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <div className="text-danger">{errors.password.message}</div>
        )}
      </div>

      <button className="btn btn-lg btn-primary btn-block mt-5" type="submit">
        Register
      </button>
      {mutation.isError && (
        <p className="mt-1 text-danger">Invalid Register. Please try again</p>
      )}
    </form>
  );
}
