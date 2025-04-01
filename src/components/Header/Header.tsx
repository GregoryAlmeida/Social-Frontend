import Image from 'next/image'
import styles from './Header.module.css'
import Link from 'next/link'
import LOGO from '../../../public/logo-sgo.jpg';
import { Logout } from '@/actions/Logout';
import DefaultProfile from '../../../public/DefaultProfile.jpg'


export default function Header(name: {name: string}) {
    return           <header className={styles.header}>
    <div>
      <Link href='/home'>
        <Image src={LOGO} width={50} height={50} alt="LOGO" />
      </Link>
    </div>
    <div>
      <Link href="/conta">
        <Image src={DefaultProfile} width={50} height={50} alt='Profile Pic' />
        <button>{name.name}</button>
      </Link>
      <button onClick={Logout}>Logout</button>
    </div>
  </header>

}