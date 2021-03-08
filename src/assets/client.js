
class UserClient{

    constructor(){

    }

    static async list(){
        let url = `${API_URL}v1/users?role=U`;
        let response = Axios.get(url);
        return response;
    }
}
