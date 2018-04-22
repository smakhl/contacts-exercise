import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default ({ currentUser }) => {
    return (
        <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <Link to="/" className="navbar-brand">Контакты</Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#contactsNavBar" aria-controls="contactsNavBar"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="contactsNavBar">
                <div className="navbar-nav mr-auto">
                    <NavLink className="nav-item nav-link" exact activeClassName="active" to={'/'}>Главная</NavLink>
                    <NavLink className="nav-item nav-link" activeClassName="active" to={'/contact/add'}>Добавить контакт</NavLink>
                </div>
                {currentUser && <span className="navbar-text">Пользователь: {currentUser}</span>}
            </div>

        </nav>)
}