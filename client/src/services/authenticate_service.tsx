import {CodeResponse} from "@react-oauth/google";

const AuthenticateService = {
    create: (token: CodeResponse) => {
        const api_url = 'http://localhost:8010/authenticate';
        return fetch(api_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(token)
            })
            .then((response: Response) => response.json())
    }
};

export default AuthenticateService;