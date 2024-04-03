import React from 'react'

function AuthContext() {
  return (
    <AuthContext.Provider value={{
      isAuthenticated: false,
      user: null,
      login: login,
      logout: logout,
      register: register,
      forgotPassword: forgotPassword,
      resetPassword: resetPassword
    }}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext