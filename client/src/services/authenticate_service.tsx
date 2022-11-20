import {CodeResponse} from "@react-oauth/google";

const AuthenticateService = {
    create: (token: CodeResponse) => {
        console.log("token", token);
        const api_url = 'http://localhost:8010/authenticate';
        fetch(api_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(token)
            })
            .then((response: Response) => response.json())
            .then((response: object) => {
                console.log('RESPONSE', response);
            })
    }
};

export default AuthenticateService;