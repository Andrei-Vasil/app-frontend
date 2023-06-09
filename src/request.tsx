export async function sendRequest(language: string, no_of_requests: number, request: string | undefined, request_size: number | undefined): Promise<Response | undefined> {
    if (request !== undefined) {
        return await fetch(`http://localhost:5000/custom/${language}/${no_of_requests}`, {
            method: 'GET',
            body: JSON.stringify({
                'request': request
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
    }
    if (request_size !== undefined) {
        return await fetch(`http://localhost:5000/random/${language}/${no_of_requests}/${request_size}`, {    
            method: 'GET',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
    }
    return undefined
}