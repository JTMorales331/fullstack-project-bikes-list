import "../css/signin.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"

const SignIn = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    console.log(data);

    // run const mutation
    mutation.mutate(data);
  }

  // send data to /api/users/login
  const mutation = useMutation({
    mutationFn: async (loginData) => {
      const res = await fetch("http://localhost:3000/api/users/login", {
        credentials: 'include',
        method: "POST",
        body: JSON.stringify(loginData),
        headers: { "Content-type": "application/json" },
      });

      console.log(res);

      if(!res.ok) throw new Error("Login unsuccessful");
      return await res.json();
      // .then((json) => console.log(json));
    },
    onSuccess: (responseBody) => {
      console.log('Login success!', responseBody)

      // token is now available
      navigate('/');
    },
    onError: (err) => {
      console.error("Login Error: ", err.message);
    }
  });

  return (
    <form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>

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
        Sign in
      </button>

      { 
        mutation.isError && (
          <p className="mt-1 text-danger">Invalid Login. Please try again</p>
        )
      }
    </form>
  );
};

export default SignIn;
