import Image from 'next/image';
import LOGO from '../../public/logo-sgo.jpg';
import styles from './page.module.css';
import Link from 'next/link';
import RandomLoading from '@/components/RandomLoading/RandomLoading';

export default function Home() {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <div>
          <Image src={LOGO} width={50} height={50} alt="Logo" />
        </div>
        <div>
          <Link href="/login">
            <button>Logar</button>
          </Link>
          <Link href="/cadastrar">
            <button>Cadastrar</button>
          </Link>
        </div>
      </header>
      <section className={styles.section}>
        <h1>Welcome to</h1>
        <h1>Social Go!</h1>
        <RandomLoading />
        <h2>Improve your experience!</h2>
      </section>
    </main>
  );
}
