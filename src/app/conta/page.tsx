'use client'
import { getCookies } from "@/actions/getCookies"
import { GET_USER_BY_EMAIL, GET_USER_BY_ID, UPDATE_USER_DATA, User } from "@/api/api_user"
import Image from "next/image"
import DefaultProfile from '../../../public/DefaultProfile.jpg'
import { ChangeEvent, useEffect, useState } from "react"
import styles from './conta.module.css'
import Header from "@/components/Header/Header"
import RandomLoading from "@/components/RandomLoading/RandomLoading"
import Input from "@/components/Input/Input"

export default function ContaPage() {
    const [user, setUser] = useState<User | null>(null)
    const [display, setDisplay] = useState('none')
    const [route, setRoute] = useState('')
    const [newValue, setValue] = useState('')
    const [err, setErr] = useState<null | string>(null)

 
    useEffect(() => {
        const handleData = async() => {
            const id = await getCookies('token')
            const data = await GET_USER_BY_ID(id)
            setUser(data)
        }
        handleData()
    }, [])
    if (user === null) return


    const handleClick = async(route: string) => {
        setRoute(route)
        setDisplay('flex')
    }

    const handleChangeImg = ({target}: ChangeEvent<HTMLInputElement>) => {
        if (target.files) {
            setValue(URL.createObjectURL(target.files[0]))
        }
    }

    const handleChange = async() => {

        switch(route) {
            case 'Name':
                user.Name = newValue
                break
            case 'Email':
                const response = await GET_USER_BY_EMAIL(newValue)
                if (response) {
                    user.Email = newValue
                } else {
                    setErr('Email já em uso!')
                    return
                }
                break
            case 'Password':
                user.Password = newValue
                break
            case 'Profile':
                user.Profile = newValue
                break
            case 'About':
                user.About = newValue
                break
        }
        const response = await UPDATE_USER_DATA(user.Id, user)
        console.log(response)
        setDisplay('none')
    }


    return (
        <>
            {user === null ? 
                <div style={{minHeight: '80vh', display: 'flex'}}>
                    <RandomLoading />
                </div>
                : 
                <section className={styles.section}>
                    <Header user={user} />
                    <span style={{display: display}}>
                        {route != 'Profile' ? <Input 
                            onChange={({target}) => setValue(target.value)} 
                            label={`Novo(a) ${route}`} 
                            htmlfor={route} type='text'
                        /> : 
                            <>
                                <Input label="Escolher foto" htmlfor="Profile" type="file" onChange={handleChangeImg} />
                                {newValue && <Image src={newValue} alt="" width={100} height={100} />}
                            </>
                        }
                        <button disabled={err != null ? true : false} onClick={handleChange}>Enviar</button>
                        {err && <p style={{color: 'red'}}>{err}</p>}
                    </span>
                    <div className={styles.divImage}>
                            <Image src={user.Profile === '' ? DefaultProfile : user.Profile} width={100} height={100} alt="Profile Pic" />
                            <button onClick={() => handleClick('Profile')}>Trocar</button>
                    </div>
                    <div className={styles.divInfo}>
                        <ul>
                            <li>Id: {user.Id}</li>
                            <li><button onClick={() => handleClick('Name')}>🖊</button> Nome: {user.Name} </li>
                            <li><button onClick={() => handleClick('Email')}>🖊</button> Email: {user.Email} </li>
                            <li><button onClick={() => handleClick('About')}>🖊</button> Sobre: {user.About} </li>
                            <li><button onClick={() => handleClick('Password')}>🖊</button> Senha: {user.Password} </li>
                        </ul>
                    </div>
                </section>
            }
        </>
    )
}