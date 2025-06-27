const fetchEndpoint = (url, options) => {
    return fetch(url, options).then((response) => response.json());
};

const fetchDefinedEndpoint = (endpoint,body) =>{
    return fetchEndpoint(endpoint.url,
        {
            method: endpoint.method,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
}

export default fetchDefinedEndpoint;
