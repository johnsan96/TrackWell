import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import "../App.css"

export function Test() {
    const [users, setUsers] = useState<any>([]); // State für die Benutzerdaten

    useEffect(() => {
        async function getData() {
            const querySnapshot = await getDocs(collection(db, "users"));
            const usersData = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsers(usersData); // Setzen der Benutzerdaten in den State
            console.log(JSON.stringify(usersData))
        }

        getData();
    }, []);

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map((user:any) => (
                    <li key={user.id}>
                        <strong>ID:</strong> {user.id} <br />
                        <strong>Data:</strong> {JSON.stringify(user)}
                    </li>
                ))}
            </ul>
        </div>
    );
}
