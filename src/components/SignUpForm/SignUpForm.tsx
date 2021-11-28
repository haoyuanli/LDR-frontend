import { useState } from "react";
import { ISignUp } from "../../interfaces";
import { bg } from "../../assets/images";
import styles from './SignUpForm.module.css';

interface SignUpFormProps {
  type: 'signup'|'login';
  error: boolean;
  onSubmit: (credentials: ISignUp) => void;
}

export function SignUpForm(props: SignUpFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [preferred_name, setName] = useState('');
  const [partner_name, setPartnerName] = useState('');
  const [relationship_start_date, setDate] = useState('');

  const word = props.type === 'signup' ? 'Sign up' : 'Log in';

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Clear form
    setEmail('');
    setPassword('');
    setName('');
    setPartnerName('');
    setDate('');

    props.onSubmit({ email, password, preferred_name, partner_name, relationship_start_date});
  }

  return (
    <div style={{backgroundImage: bg}}>
      <h1 className={styles.title}>{word}</h1>
      {
        props.error && (
          <div className={styles.error}>
            {props.type === 'login' ? 'Authentication failed.' : 'Registration failed.'}
          </div>
        )
      }
      <form onSubmit={onSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input required type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Password</label>
          <input required type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="name">Preferred Name</label>
          <input required type="string" name="name" value={preferred_name} onChange={e => setName(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="partnerName">Partner Name</label>
          <input required type="string" name="partnerName" value={partner_name} onChange={e => setPartnerName(e.target.value)} />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="startDate">Relationship Start Date</label>
          <input required type="date" name="date" value={relationship_start_date} onChange={e => setDate(e.target.value)} />
        </div>
        <div>
          <input type="submit" value={word} className={`${styles.btn} btn btnPrimary`} />
        </div>
      </form>
      <div className={styles.separator}>
      </div>
      <div>
        <form action="/login" method="get">
          <input type="submit" value={`Already have an account? Log in.`} className={`${styles.btn} btn`} />
        </form>
      </div>
      <div>
        <form action="/" method="get">
          <input style={{ marginTop: "20px" }} type="submit" value={`Return to homepage`} className={`${styles.btn} btn`} />
        </form>
      </div>
    </div>
  )
}