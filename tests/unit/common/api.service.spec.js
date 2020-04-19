import axios from 'axios';
import ApiService from "@/common/api.service";

jest.mock('axios');

describe('OCS Data Services', () => {

    beforeEach(() => {
        ApiService.init();
    });

    it('search title should return original data if no errors', async () => {
        const data = {
            "contents": null
        }
        axios.get.mockImplementationOnce(() => Promise.resolve(data));

        await expect(ApiService.search('test')).resolves.toEqual(data);
        expect(axios.get).toHaveBeenCalledWith(`contents?search=title=test`);
    });

    it('search title should throw error if something weird happen', async () => {
        axios.get.mockRejectedValueOnce(new Error());

        await expect(ApiService.search('test')).rejects.toMatchObject(Error(`ApiService Error`));
    });

    it('get a program should return original data if no errors', async () => {
        const data = {
            "contents": null
        }
        axios.get.mockImplementationOnce(() => Promise.resolve(data));

        await expect(ApiService.getProgramme('test')).resolves.toEqual(data);
        expect(axios.get).toHaveBeenCalledWith(`details/programme/test`);
    });

    it('get a program should throw error if something weird happen', async () => {
        axios.get.mockRejectedValueOnce(new Error());

        await expect(ApiService.getProgramme('test')).rejects.toMatchObject(Error(`ApiService Error`));
    });

    it('get a tv show should return original data if no errors', async () => {
        const data = {
            "contents": null
        }
        axios.get.mockImplementationOnce(() => Promise.resolve(data));

        await expect(ApiService.getSerie('test')).resolves.toEqual(data);
        expect(axios.get).toHaveBeenCalledWith(`details/serie/test`);
    });

    it('get a tv show should throw error if something weird happen', async () => {
        axios.get.mockRejectedValueOnce(new Error());

        await expect(ApiService.getSerie('test')).rejects.toMatchObject(Error(`ApiService Error`));
    });

});

