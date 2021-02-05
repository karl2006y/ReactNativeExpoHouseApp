// api
import request from "./request";
export function getAllProduct() {
  return request({
    url: `datamanagement/`,
    method: "get",
  });
}
//admin

export function getAllProduct_id_admin(id) {
  return request({
    url: `admin/datamanagement/${id}`,
    method: "get",
  });
}

export function getAllProduct_admin() {
  return request({
    url: `admin/datamanagement/`,
    method: "get",
  });
}

export function createProduct(data) {
  return request({
    url: `admin/datamanagement/create`,
    method: "post",
    data: data,
  });
}

export function updateProduct(id, name) {
  return request({
    url: `admin/datamanagement/update/${id}`,
    method: "post",
    data: {
      name: name,
    },
  });
}
export function turnOnProduct(id) {
  return request({
    url: `admin/datamanagement/update/${id}`,
    method: "post",
    data: {
      status: 1,
    },
  });
}

export function turnOffProduct(id) {
  return request({
    url: `admin/datamanagement/update/${id}`,
    method: "post",
    data: {
      status: 0,
    },
  });
}

export function deleteProduct(id) {
  return request({
    url: `admin/datamanagement/delete/${id}`,
    method: "delete",
  });
}
