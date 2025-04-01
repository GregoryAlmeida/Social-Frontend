'use client';
import { getCookies } from '@/actions/getCookies';
import { useContext, useEffect, useState } from 'react';
import styles from './home.module.css';
import { GET_USER_BY_ID, POST_POSTAGENS, User } from '@/api/api_user';
import Input from '@/components/Input/Input';
import Postagens from '@/components/Postagens/Postagens';
import { Context } from '@/components/Context/Context';
import Header from '@/components/Header/Header';
import RandomLoading from '@/components/RandomLoading/RandomLoading';

export default function HomePage() {
  const [userData, setUserData] = useState<User | null>(null);
  const [post, setPost] = useState('');
  const [err, setErr] = useState('');
  const context = useContext(Context);

  useEffect(() => {
    async function handleCookies() {
      const response = await getCookies('token');
      if (typeof response === 'string') {
        try {
          const data = await GET_USER_BY_ID(response);
          setUserData(data);
        } catch (err) {
          console.log(err);
        }
      }
    }
    handleCookies();
  }, []);

  const handleClick = async () => {
    if (post.trim() === '') {
      setErr('Digite algo para postar');
      return;
    }

    try {
      if (typeof userData?.Name != 'string') return;
      await POST_POSTAGENS(userData.Name, post, userData.Profile);
      setErr('');
      setPost('');
      context.setState((b) => !b);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <main className={styles.main}>
      {userData === null ? (
        <div style={{minHeight: '80vh', display: 'flex'}}><RandomLoading /></div>
      ) : (
        <>
        <Header user={userData} />
          <section className={styles.section}>
            <h1>Bem vindo {userData.Name}</h1>
            <div className={styles.post}>
              <Input
                label="Como você está se sentindo hoje?"
                htmlfor="post"
                value={post}
                onChange={({ target }) => setPost(target.value)}
              />
              <button className={styles.button} onClick={handleClick}>
                Postar
              </button>
              {err && <p style={{ color: '#74b9ff' }}>{err}</p>}
            </div>
            <Postagens />
          </section>
        </>
      )}
    </main>
  );
}
