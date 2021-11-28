import { useState } from "react";
import { useHistory } from "react-router";
import { SignUpForm } from "../../components";
import { ICredentials, IUser } from "../../interfaces";
import { signUp } from "../../requests";
import { bg } from "../../assets/images";


import styles from './SignUp.module.css';

interface SignUpProps {
  onSignUp: (user: IUser) => void;
}

export function SignUp(props: SignUpProps) {
  const [error, setError] = useState(false);

  const history = useHistory();

  async function signUpAndRedirect(credentials: ICredentials) {
    try {
      const user = await signUp(credentials);
      props.onSignUp(user);
      history.push('/');
    } catch (error) {
      console.log(error);
      setError(true);
    }
  }

  return (
    <div style={{ backgroundImage: bg }} className={`${styles.container} box`}>
      <SignUpForm error={error} type="signup" onSubmit={signUpAndRedirect} />
    </div>
  );
}