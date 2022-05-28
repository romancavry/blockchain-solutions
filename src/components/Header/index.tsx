import React from 'react'
import styles from './styles.module.scss'
import { useLocation, useNavigate } from 'react-router-dom'
import cn from 'classnames'

export const Header = () => {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <ul className={styles.nav_list}>
            <li className={styles.nav_item}>
              <button
                className={cn(styles.nav_button, location.pathname === '/' && styles.nav_button_active)}
                onClick={() => navigate('/')}
              >
                HOME
              </button>
            </li>
            <li className={styles.nav_item}>
              <button
                className={cn(styles.nav_button, location.pathname === '/my' && styles.nav_button_active)}
                onClick={() => navigate('/my')}
              >
                MY
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}