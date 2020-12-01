import { get, post, postRequest, uploadFileRequest, getRequest, putRequest, deleteRequest } from 'api/utils'

export function getProjNumAndAmound() {
  const url = 'http://192.168.2.136:8080/jeecg-boot/tanghe/resourceProject/count/projNumAndAmound'
  return get(url, {})
}