import { useState } from 'react';
import { AcceptUser } from "../../../../requests/fetchPrivateProject";

const RequestsJoin = ({ id, requestsJoin }) => {
    const [acceptedUsers, setAcceptedUsers] = useState([]);

    const handleAccept = async (idUser) => {
        try {
            const response = await AcceptUser(id, idUser);
            if (response.status === 200) {
                setAcceptedUsers([...acceptedUsers, idUser]);
                console.error("User successfully accepted into the project!");
            } else {
                console.error("Error occurred while accepting the user into the project");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <>
            <p>
                Requests to join:{" "}
                {requestsJoin &&
                    requestsJoin.map((request, index) => (
                        <div key={index}>
                            <span>{request.username.join(", ")}</span>
                            <button
                                onClick={() => handleAccept(request.id)}
                                disabled={acceptedUsers.includes(request.id)}>
                                {acceptedUsers.includes(request.id) ? 'Accepted' : 'Accept'}
                            </button>
                        </div>
                    ))}
            </p>
        </>
    );
};


export default RequestsJoin;