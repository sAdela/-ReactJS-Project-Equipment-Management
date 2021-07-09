import React, { useState } from "react";
import { Component } from "react";
import { useHistory } from "react-router-dom";
import { RecoilState, useRecoilState } from "recoil";
import { usersList } from '../Database/Database';
import { currentLoggedIn } from '../Database/Database';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './login.css';

const LoginComponent : React.FC = () =>  {
    
        const [users, setUsers] = useRecoilState(usersList);
        const [currentLoggedInUser, setCurrentLoggedIn] = useRecoilState(currentLoggedIn);
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [hasError, setHasError] = useState(false);

        const history = useHistory();

        const login = () => {

            const user = users.find((user) => user.username == username && user.password == password);
            if (user && user.isAdmin) 
            {
                setCurrentLoggedIn({ key: user.key, username: user.username, isAdmin: true });
                history.push("/admin");
            }
            else if (user && !user.isAdmin){
                setCurrentLoggedIn({ key: user.key, username: user.username, isAdmin: false });
                history.push("/common");
            }
            else
            {
                setHasError(true);
            }
        }

        return (<>
        <div className="login-form">    
            <form>
                <h4 className="modal-title">Login to Your Account</h4>
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div>
                
                <button type="button" className="btn btn-primary btn-block btn-lg" value="Login" onClick={login}>Sign in</button>              
            </form>
            <h4>{hasError && 'Invalid username or password'}</h4>			
        </div>
        </>
        );
}
export default LoginComponent;