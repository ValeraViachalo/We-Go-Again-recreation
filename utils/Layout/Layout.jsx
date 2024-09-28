import React from 'react'
import styles from "./Layout.module.scss";
import Header from '../Header/Header';
import { Logo } from '../Logo/Logo';

export default function Layout({children}) {
  return (
    <div className={styles.layout}>
      <div className={styles.layout_elements}>
        <Header />
        <Logo />
        <p>
          A creative production studio founded by a former Olympian & an award‑winning director. We know sport.
        </p>
      </div>
      <div className={styles.page}>
        {children}
      </div>
    </div>
  )
}
