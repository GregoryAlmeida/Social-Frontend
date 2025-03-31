'use client'
import { getCookies } from "@/actions/getCookies"
import { GET_USER_BY_ID, User } from "@/api/api_user"
import Image from "next/image"
import DefaultProfile from '../../../public/DefaultProfile.jpg'
import { useEffect, useState } from "react"
import styles from './conta.module.css'

export default function ContaPage() {
    const [user, setUser] = useState<User | null>(null)
 
    useEffect(() => {
        const handleData = async() => {
            const id = await getCookies('token')
            const data = await GET_USER_BY_ID(id)
            setUser(data)
        }
        handleData()
    }, [])

    const handleClick = async(route: string) => {
        console.log(route)
    }

    return (
        <section className={styles.section}>
            <div className={styles.divImage}>
                <Image src={DefaultProfile} width={100} height={100} alt="Profile Pic" />
                <button onClick={() => handleClick('profile')}>Trocar</button>
            </div>
            <div className={styles.divInfo}>
                <ul>
                    <li>Id: {user?.Id}</li>
                    <li>Nome: {user?.Name} <button onClick={() => handleClick('name')}>🖊</button></li>
                    <li>Email: {user?.Email} <button onClick={() => handleClick('email')}>🖊</button></li>
                    <li>Sobre: {user?.About} <button onClick={() => handleClick('about')}>🖊</button></li>
                    <li>Senha: {user?.Password} <button onClick={() => handleClick('password')}>🖊</button></li>
                </ul>
            </div>
        </section>
    )
}