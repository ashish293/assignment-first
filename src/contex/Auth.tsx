import {createContext} from 'react';

const AuthContext = createContext(null);
const AuthProvider = AuthContext.Provider;
const AuthConsumer = AuthContext.Consumer;
export {AuthProvider, AuthConsumer, AuthContext};
