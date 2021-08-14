import React from 'react';

/*
    React.createContext() creates React context object.
    React context is for application wide state management.
    Here 'AuthContext' is not a component, but which holds components.

    There are 2 steps once a React Context is created  -
    1. Provide using 'Provider'
    2. Listen using 'Consumer' or using React Hook
*/
const AuthContext = React.createContext({ isLoggedIn: false });

export default AuthContext;
