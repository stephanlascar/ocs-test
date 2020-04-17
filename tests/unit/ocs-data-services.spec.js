import axios from 'axios';
import ocsDataServices from "@/services/OCSDataServices";

jest.mock('axios');

describe('OCS Data Services', () => {

    it('should return orignal data if no errors', async () => {
        const data = {
            "template": "search",
            "parentalrating": 1,
            "title": "Recherche",
            "offset": 1,
            "limit": "none",
            "next": null,
            "previous": null,
            "total": 0,
            "count": 0,
            "filter": null,
            "sort": null,
            "contents": null
        }
        axios.get.mockImplementationOnce(() => Promise.resolve(data));

        await expect(ocsDataServices.search('test')).resolves.toEqual(data);
        expect(axios.get).toHaveBeenCalledWith(
            `http://localhost:8080/apps/v2/contents?search=title=test`,
        );
    });

    it('fetches erroneously data from an API', async () => {
    });

});

