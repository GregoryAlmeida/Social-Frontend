import { GET_POSTAGENS, Posts } from '@/api/api_user';
import React, { useContext, useEffect, useState } from 'react';
import styles from './Postagens.module.css';
import { Context } from '../Context/Context';
import Image from 'next/image';
import DefaultProfile from '../../../public/DefaultProfile.jpg'

export default function Postagens() {
  const [postagens, setPostagens] = useState<Posts[] | null>(null);
  const context = useContext(Context);

  useEffect(() => {
    const handlePostagens = async () => {
      const response = await GET_POSTAGENS();
      setPostagens(response);
    };
    handlePostagens();
  }, [context.state]);


  return (
    <section className={styles.section}>
      <span>
        <h1>Postagens</h1>
        <button onClick={() => context.setState((b) => !b)}>🔁Refresh</button>
      </span>
      <div>
        {postagens === null ? (
          <div style={{margin: 'auto'}}>Carregando...</div>
        ) : (
          postagens.map(({ Name, Message, Profile }) => (
            <span key={crypto.randomUUID()}>
            <Image 
              style={{borderRadius: '5px'}} 
              src={Profile === "" ? DefaultProfile : Profile } 
              width={50} 
              height={50} 
              alt='Profile Pic' 
            />
        <h3 style={{ color: 'cyan' }}>{Name}</h3>
              <p>{Message}</p>
            </span>
          ))
        )}
      </div>
    </section>
  );
}
