import "../css/signin.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
    mutation.mutate(data);
  }

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (responseBody) => {
      console.log('Register success!', responseBody)

      // token is now available
      navigate('/');
    },
    onError: (err) => {
      console.error("Register Error: ", err.message);
    }
  });

  return (
    // first name, last name, email, and password
    <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="h3 mb-3 font-weight-normal text-center">Register</h1>

      <label htmlFor="inputFirstName" className="sr-only">
        First Name
      </label>
      <input
        type="text"
        id="inputFirstName"
        className="form-control"
        placeholder="First Name"
        autoFocus
        {...register("first_name", { required: true })}
      />

      <label htmlFor="inputLastName" className="sr-only">
        Last Name
      </label>
      <input
        type="text"
        id="inputLastName"
        className="form-control"
        placeholder="Last Name"
        autoFocus
        {...register("last_name", { required: true })}
      />

      <label htmlFor="inputEmail" className="sr-only">
        Email address
      </label>
      <input
        type="text"
        id="inputEmail"
        className="form-control"
        placeholder="Email address"
        autoFocus
        {...register("email", { required: true })}
      />

      <label htmlFor="inputPassword" className="sr-only">
        Password
      </label>
      <input
        type="password"
        id="inputPassword"
        className="form-control"
        placeholder="Password"
        {...register("password", { required: true })}
      />

      <button className="btn btn-lg btn-primary btn-block" type="submit">
        Register
      </button>
      { 
        mutation.isError && (
          <p className="mt-1 text-danger">Invalid Register. Please try again</p>
        )
      }
    </form>
  )
}
