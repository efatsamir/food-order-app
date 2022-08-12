import React, { Fragment } from 'react';
import styles from './Header.module.css';
import mealsImage from '../../assets/meals6.jpg';
import HeaderCartBtn from './HeaderCartBtn';

const Header = ({ showCartHandler }) => {
    return (
        <Fragment>
            <header className={styles.header}>
                <h1>ReactMeals</h1>
                <HeaderCartBtn  onClick={showCartHandler}/>
            </header>
            <div className={styles['main-image']}>
                <img src={mealsImage} alt="mealsImage" />
            </div>
        </Fragment>
    )
}

export default Header
