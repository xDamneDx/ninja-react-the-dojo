import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

// Styles:
import "./Signup.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailError, setThumbnailError] = useState(null);
  const { signup, isPending, error } = useSignup();

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];

    if (!selected) {
      setThumbnailError("Please select a file");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
      return;
    }
    if (selected.size > 100000) {
      setThumbnailError("Image file size must be less then 100kb");
      return;
    }
    setThumbnailError(null);
    setThumbnail(selected);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  return (
    <div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign up</h2>
        <label>
          <span>Email:</span>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            name={password}
          />
        </label>
        <label>
          <span>Display Name:</span>
          <input
            type="text"
            required
            onChange={(e) => setDisplayName(e.target.value)}
            name={displayName}
          />
        </label>
        <label>
          <span>Profile Thumbnail:</span>
          <input type="file" required onChange={handleFileChange} />
          {thumbnailError && <div className="error">{thumbnailError}</div>}
        </label>
        {!isPending && <button className="btn">Sign up</button>}
        {isPending && (
          <button className="btn" disabled>
            Loading
          </button>
        )}
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
