import { ComponentProps } from 'react';
import styles from './Input.module.css';

type InputProps = ComponentProps<'input'> & {
  label: string;
  htmlfor: string;
};

export default function Input({ label, htmlfor, ...opt }: InputProps) {
  return (
    <div className={styles.div}>
      <label htmlFor={htmlfor}>{label}</label>
      <input id={htmlfor} {...opt} />
    </div>
  );
}
