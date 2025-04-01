import React from 'react';
import styles from './RandomLoading.module.css';

export default function RandomLoading() {
  const randomNumber = Math.floor(Math.random() * 10);

  switch (randomNumber) {
    case 0:
      return <div style={{margin: "auto"}} className={styles.arcade}></div>;
    case 1:
      return <div style={{margin: "auto"}} className={styles.daynight}></div>;
    case 2:
      return <div style={{margin: "auto"}} className={styles.moon}></div>;
    case 3:
      return <div style={{margin: "auto"}} className={styles.sun}></div>;
    case 4:
      return <div style={{margin: "auto"}} className={styles.time}></div>;
    case 5:
      return <div style={{margin: "auto"}} className={styles.sausage}></div>;
    case 6:
      return <div style={{margin: "auto"}} className={styles.watermelon}></div>;
    case 7:
      return <div style={{margin: "auto"}} className={styles.milkshake}></div>;
    case 8:
      return <div style={{margin: "auto"}} className={styles.neutralEyes}></div>;
    case 9:
      return <div style={{margin: "auto"}} className={styles.angryEyes}></div>;
    case 10:
      return <div style={{margin: "auto"}} className={styles.crazyEyes}></div>;
    default:
      return <div style={{margin: "auto"}} className={styles.milkshake}></div>;
  }
}
