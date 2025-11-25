import "../css/signin.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

export default function Register() {

  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);
    // send data to /api/users/login
  }

  // const mutation = useMutation(function (loginData) {
  //   fetch("http://localhost:3000/api/users/login", {
  //     method: "POST",
  //     body: JSON.stringify(loginData),
  //     headers: { "Content-type": "application/json" },
  //   })
  //     .then((payload) => {
  //       payload.json();
  //     })
  //     .then((json) => console.log(json));
  // });

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
        {...register("firstName", { required: true })}
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
        {...register("lastName", { required: true })}
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
    </form>
  )
}
