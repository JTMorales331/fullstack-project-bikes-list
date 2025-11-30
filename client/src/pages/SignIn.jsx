import "../css/signin.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser } from "../services/authService";
import { useEffect } from "react";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const lastPage = location;

  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data) {
    console.log(data);

    // run const mutation
    mutation.mutate(data);
  }

  useEffect(() => {
    console.log({ lastPage });
  }, [lastPage]);

  // send data to /api/users/login
  const mutation = useMutation({
    mutationFn: loginUser,
    // .then((json) => console.log(json));
    onSuccess: (responseBody) => {
      console.log("Login success!", responseBody);
      sessionStorage.setItem("res-dedaci", true);
      // token is now available
      navigate("/");
    },
    onError: (err) => {
      console.error("Login Error: ", err.message);
    },
  });

  return (
    <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>

      <div className="mb-3">
        <label htmlFor="inputEmail" className="form-label">
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

      <div className="">
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <div className="text-danger">{errors.password.message}</div>
        )}
      </div>

      <button className="btn btn-lg btn-primary btn-block mt-5" type="submit">
        Sign in
      </button>

      {mutation.isError && (
        <p className="mt-1 text-danger">Invalid Login. Please try again</p>
      )}
    </form>
  );
};

export default SignIn;
