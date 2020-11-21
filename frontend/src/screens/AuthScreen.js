import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Spinner from '../components/Layout/Spinner'
import LoginScreen from './LoginScreen'
import RegisterScreen from './RegisterScreen'

const AuthScreen = ({ history, location }) => {

    const userLogin = useSelector(state => state.userLogin)
    const { loading: loginLoading, userInfo: loginUserInfo } = userLogin

    const userRegister = useSelector(state => state.userRegister)
    const { loading: registerLoading, userInfo: registerUserInfo } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'


    useEffect(() => {
        if (loginUserInfo || registerUserInfo) {
            history.push(redirect)
        }
    }, [history, loginUserInfo, registerUserInfo, redirect])

    return (
        <section className="container extend-height auth-forms general-form">

            { loginLoading || registerLoading ? (
                <Spinner />
            ) : (
                    <>
                        <LoginScreen />
                        <hr className="vertical" />
                        <RegisterScreen />
                    </>
                )}

        </section>
    )
}

export default AuthScreen
