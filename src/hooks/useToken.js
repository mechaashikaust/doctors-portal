import { useEffect, useState } from "react"

const useToken = user => {

    const [token, setToken] = useState('');

    useEffect(() => {

        const email = user?.user?.email;

        const currentUser = { email: email };

        if (email) {

            // {3} users set to the DB, can't login same email twice with 3 login methods (login, registratin, googlesignin)

            fetch(`http://localhost:5000/user/${email}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
                .then(res => res.json())
                .then(data => {
                    console.log('useToken', data);
                    const accessToken = data.token;
                    localStorage.setItem('accessToken', accessToken);
                    setToken(accessToken);
                })
        }


    }, [user]);
    return [token];
}

export default useToken;