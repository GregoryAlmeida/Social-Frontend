'use client';
import Input from '@/components/Input/Input';
import Link from 'next/link';
import style from './login.module.css';
import { FormEvent, useState } from 'react';
import { USER_LOGIN } from '@/api/api_user';
import RandomLoading from '@/components/RandomLoading/RandomLoading';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false)

  const handleClick = async (e: FormEvent) => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      setLoading(true)
      setErr('Preencha os campos corretamente!');
      return;
    }
    try {
      await USER_LOGIN(email, password);
      setErr('Usuário ou Senha Incorretos!');
      setLoading(false)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className={style.main}>
      <h1>Login</h1>
      <form className={style.form}>
        <Input
          label="Email"
          htmlfor="email"
          type="text"
          value={email}
          onChange={({ target }) => setEmail(target.value)}
        />
        <Input
          label="Senha"
          htmlfor="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        <button onClick={handleClick}>Logar</button>
        {err && <p style={{ color: 'red' }}>{err}</p>}
        <p>
          Não possui conta ainda? Clique <Link href="/cadastrar">Aqui!</Link>{' '}
          para cadastrar!
        </p>
        {loading && <RandomLoading />}
      </form>
    </main>
  );
}
