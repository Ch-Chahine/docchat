import { useState } from 'react';

function RegisterForm({ onLoggedIn, disabled }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();                      // stop the page reloading
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',                // send/receive the session cookie
      body: JSON.stringify({ email, name, password }),
    });
    const data = await res.json();
    if (data.error) setError(data.error);
    else onLoggedIn(data);                   // tell the app we're in
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name <input value={name} onChange={(e) => setName(e.target.value)} disabled={disabled} /></label>
      <label>Email <input value={email} onChange={(e) => setEmail(e.target.value)} disabled={disabled} /></label>
      <label>Password <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} disabled={disabled} /></label>
      <button disabled={disabled}>Create account</button>
      {error && <p role="alert">{error}</p>}  {/* role=alert = screen readers announce it */}
      {disabled && <p role="note">Sign-up is disabled for this educational demo — new accounts can't be created on the live site. Use an account made during development.</p>}
    </form>
  );
}
export default RegisterForm;
