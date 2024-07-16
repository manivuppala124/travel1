import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        
        axios.post('http://localhost:3001/login', {email, password})
        .then(result => {
            console.log(result);
            if(result.data === "Success"){
                console.log("Login Success");
                alert('Login successful!');
                navigate('/home');
            } else {
                alert('Incorrect password! Please try again.');
            }
        })
        .catch(err => console.log(err));
    }

    const handleSkip = () => {
        navigate('/home');
    }

    return (
        <div>
            <div className="d-flex justify-content-center align-items-center text-center vh-100" style={{backgroundImage: "url('https://png.pngtree.com/thumb_back/fh260/background/20231001/pngtree-exploring-the-world-a-travel-plan-with-suitcase-image_13573801.png')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
                <div className="bg-white p-3 rounded" style={{width: '40%', opacity: 0.9}}>
                    <h2 className='mb-3 text-primary'>Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                <strong>Email Id</strong>
                            </label>
                            <input 
                                type="email" 
                                placeholder="Enter Email"
                                className="form-control" 
                                id="exampleInputEmail1" 
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            /> 
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="exampleInputPassword1" className="form-label">
                                <strong>Password</strong>
                            </label>
                            <input 
                                type="password" 
                                placeholder="Enter Password"
                                className="form-control" 
                                id="exampleInputPassword1" 
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary me-2">Login</button>
                        <button type="button" className="btn btn-primary" onClick={handleSkip}>Skip</button>
                    </form>
                    <p className='container my-2'>Don&apos;t have an account?</p>
                    <Link to='/register' className="btn btn-secondary">Register</Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
