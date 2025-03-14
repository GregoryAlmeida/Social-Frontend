'use client';
import Input from '@/components/Input/Input';
import Link from 'next/link';
import styles from './cadastrar.module.css';
import { FormEvent, useState } from 'react';
import { GET_USER_BY_EMAIL, USER_CADASTRO } from '@/api/api_user';

export default function CadastrarPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [err, setErr] = useState('');

  const handleClick = async (e: FormEvent) => {
    e.preventDefault();
    if (
      username.trim() === '' ||
      email.trim() === '' ||
      password.trim() === '' ||
      confirmPass.trim() === ''
    ) {
      setErr('Preencha os dados corretamente!');
      return;
    }

    if (password != confirmPass) {
      setErr('As senhas não conferem!');
      return;
    }

    try {
      const response = await GET_USER_BY_EMAIL(email);
      if (response) {
        await USER_CADASTRO(crypto.randomUUID(), username, email, password);
        setErr('');
      } else {
        setErr('Email já existe!');
        return;
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className={styles.main}>
      <h1>Cadastro</h1>
      <form className={styles.form}>
        <Input
          label="Nome"
          htmlfor="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
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
        <Input
          label="Confirmar senha"
          htmlfor="confirmpass"
          type="password"
          value={confirmPass}
          onChange={({ target }) => setConfirmPass(target.value)}
        />
        <button onClick={handleClick}>Cadastrar</button>
        {err && <p style={{ color: 'red' }}>{err}</p>}
        <p>
          Já possui conta? Clique <Link href="/login">Aqui!</Link> para acessar
          sua conta!
        </p>
      </form>
    </main>
  );
}
