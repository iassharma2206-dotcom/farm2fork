import { useState } from "react";
import { login, signup } from "../services/authService";

function Auth() {
  const [showAuth, setShowAuth] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("restaurant");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const data = await login({ email, password });
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("role", data.user.role);
        
        setTimeout(() => {
            window.location.href = `/${data.user.role}`;
          }, 400);
          
      } else {
        await signup({ name, email, password, role });
        alert("Signup successful. Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div style={styles.page}>
      {!showAuth ? (
        <div style={styles.hero}>
          <h1 style={styles.title}>Farm2Fork Hub</h1>
          <p style={styles.subtitle}>
            Connecting local farms with restaurants through a smart,
            transparent micro-supply chain.
          </p>

          <div style={styles.features}>
            <div>🌱 Hyper-local sourcing</div>
            <div>⚡ Real-time buy requests</div>
            <div>🤝 Direct farmer connections</div>
          </div>

          <button style={styles.getStarted} onClick={() => setShowAuth(true)}>
            Get Started
          </button>
        </div>
      ) : (
        <div style={styles.card}>
          <h2>{isLogin ? "Login" : "Create Account"}</h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            {!isLogin && (
              <input
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}

            <input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {!isLogin && (
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="restaurant">Restaurant</option>
                <option value="farmer">Farmer</option>
              </select>
            )}

            <button type="submit">
              {isLogin ? "Login" : "Signup"}
            </button>
          </form>

          <p style={{ marginTop: 10 }}>
            {isLogin ? "No account?" : "Already have an account?"}{" "}
            <span
              style={styles.switch}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Signup" : "Login"}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, #1f2933, #0b0f14)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    padding: 20,
  },
  hero: {
    maxWidth: 600,
    textAlign: "center",
  },
  title: {
    fontSize: "3rem",
    marginBottom: 10,
    background: "linear-gradient(90deg, #ff7a18, #ffb347)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  },
  subtitle: {
    fontSize: "1.1rem",
    opacity: 0.85,
  },
  features: {
    marginTop: 30,
    lineHeight: "2rem",
    opacity: 0.9,
  },
  getStarted: {
    marginTop: 40,
    padding: "14px 36px",
    fontSize: "1rem",
    borderRadius: 30,
    border: "none",
    cursor: "pointer",
    background: "linear-gradient(90deg, #ff7a18, #ff4d4d)",
    color: "#fff",
    boxShadow: "0 0 25px rgba(255,122,24,0.6)",
  },
  card: {
    background: "#111827",
    padding: 30,
    borderRadius: 12,
    width: 360,
    textAlign: "center",
    boxShadow: "0 0 30px rgba(0,0,0,0.6)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
    marginTop: 20,
  },
  switch: {
    color: "#ff7a18",
    cursor: "pointer",
    fontWeight: 500,
  },
};

export default Auth;


