import './auth.css';
import React from 'react';
import { faUser, faKey } from "@fortawesome/free-solid-svg-icons";
import Input from "../../components/general/Input";
import Button from "../../components/general/Button";


export default function Login(username, password, setUsername, setPassword) {
    return (
        <div className="loginpage">
            <h1>Sign in with your account</h1>
            <Input
                type="text"
                icon={faUser}
                label="Username:"
                value={username}
                className="input username"
                setValue={setUsername}
            />
            <Input
                type="password"
                icon={faKey}
                label={"Password: "}
                value={password}
                className="input password"
                setValue={setPassword}
            />
            <Button text="Sign In" className="button" icon={faKey} type="submit" />
        </div>
    );
};
