import './App.css';
import { useState } from 'react';

function App() {

    const [user, setUser] = useState(null);

    function getUserData() {
        fetch('/api/me', {
            credentials: 'include'
        })
            .then(res => res.json())
            .then(data => setUser(data.data))
            .catch(error => console.error(error))
    }

    return (
        <>

            <div className="container">
                <h4>Sign Up</h4>
                <form className="form" onSubmit={e => signUp(e)}>
                    <input type="text" name="username" placeholder="Username" />
                    <input type="password" name="password" placeholder="Password" />
                    <button>Sign Up</button>
                </form>
            </div>

            <div className="container">
                <h4>Login</h4>
                <form className="form" onSubmit={e => login(e)}>
                    <input type="text" name="username" placeholder="Username" />
                    <input type="password" name="password" placeholder="Password" />
                    <button>Login</button>
                </form>
            </div>

            <div className="container">
                <button onClick={getUserData}>Get My Data</button>
                {
                    user && <div>
                        <p>{user.username || user.message}</p>
                        {
                            user.items.map(item => { return <p key={item}>{item}</p> })
                        }
                    </div>
                }
            </div>

            <div className="container">
                <form className="form" onSubmit={e => addItem(e)}>
                    <input type='text' placeholder='Item' name='item' />
                    <button>Add Item</button>
                </form>
            </div>

        </>
    )
}

export default App

function signUp(e) {

    e.preventDefault();

    const payload = {
        username: e.target.username.value,
        password: e.target.password.value
    };

    fetch('/api/sign-up', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(res => alert(res.message))
        .catch(error => console.error(error));
}

function login(e) {

    e.preventDefault();

    const payload = {
        username: e.target.username.value,
        password: e.target.password.value
    };

    fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(res => alert(res.message))
        .catch(error => console.error(error));
}


function addItem(e) {

    e.preventDefault();

    const payload = {
        item: e.target.item.value
    };

    console.table(payload)

    fetch('/api/add-item', {
        method: 'PATCH',
        credentials: 'include',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'application/json' }
    })
        .then(res => res.json())
        .then(res => alert(res.message))
        .catch(error => console.error(error));
}