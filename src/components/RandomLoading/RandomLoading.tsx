import React from 'react';
import styles from './RandomLoading.module.css';

export default function RandomLoading() {
  const randomNumber = Math.floor(Math.random() * 10);
  console.log('Numero aleatorio: ', randomNumber);

  switch (randomNumber) {
    case 0:
      return <div className={styles.arcade}></div>;
    case 1:
      return <div className={styles.daynight}></div>;
    case 2:
      return <div className={styles.moon}></div>;
    case 3:
      return <div className={styles.sun}></div>;
    case 4:
      return <div className={styles.time}></div>;
    case 5:
      return <div className={styles.sausage}></div>;
    case 6:
      return <div className={styles.watermelon}></div>;
    case 7:
      return <div className={styles.milkshake}></div>;
    case 8:
      return <div className={styles.neutralEyes}></div>;
    case 9:
      return <div className={styles.angryEyes}></div>;
    case 10:
      return <div className={styles.crazyEyes}></div>;
    default:
      return <div className={styles.milkshake}></div>;
  }
}
