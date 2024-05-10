const RequestsJoin = ({requestsJoin}) => {
    return (
        <>
            <p>Requests to join: {requestsJoin && requestsJoin.join(", ")}</p> 
        </>
    )
}


export default RequestsJoin;