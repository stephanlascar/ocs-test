import axios from "axios";

const ROOT_API = 'http://localhost:8080/apps/v2';

class OCSDataServices {

    search = async term => {
        return await axios.get(`${ROOT_API}/contents?search=title=${term}`);
    };

}

export default new OCSDataServices();
