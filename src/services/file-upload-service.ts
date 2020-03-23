import BaseService from "./_base-service";

class FileUploadService extends BaseService {

  fileUpload(url: any, params: any) {
    return this.resource$.post<any>(url, params);
  }

  getFile(url: any) {
    return this.resource$.get<any>(url, {}, {
      Accept: 'image/webp,image/*,*/*;q=0.8',
      responseType: 'arraybuffer'
    });
  }


}
let fileUploadService = new FileUploadService();
export default fileUploadService;

