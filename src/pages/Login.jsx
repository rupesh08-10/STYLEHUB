import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isLogin) {
      alert("Login successful!");
    } else {
      alert("Account created successfully!");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-container">

        <h1>
          STYLEHUB
        </h1>

        <h2>
          {isLogin ? "Welcome Back" : "Create Account"}
        </h2>

        <p>
          {isLogin
            ? "Login to continue shopping."
            : "Create your STYLEHUB account."}
        </p>

        <form onSubmit={handleSubmit}>

          {!isLogin && (
            <>
              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </>
          )}

          <label>
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="auth-button"
          >
            {isLogin ? "LOGIN" : "CREATE ACCOUNT"}
          </button>

        </form>

        <div className="auth-switch">

          <p>
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? "Create Account"
              : "Login"}
          </button>

        </div>

        <Link to="/">
          Back to Home
        </Link>

      </div>

    </div>
  );
}

export default Login;