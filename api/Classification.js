// api
import request from "./request";
export function getAllClassification() {
  return request({
    url: `datamanagement/classification/`,
    method: "get",
  });
}
//admin
export function getAllClassification_admin() {
  return request({
    url: `admin/datamanagement/classification/`,
    method: "get",
  });
}

export function createClassification(name) {
  return request({
    url: `admin/datamanagement/classification/create`,
    method: "post",
    data: {
      name: name,
    },
  });
}

export function updateClassification(id, name) {
  return request({
    url: `admin/datamanagement/classification/update/${id}`,
    method: "put",
    data: {
      name: name,
    },
  });
}
export function turnOnClassification(id) {
  return request({
    url: `admin/datamanagement/classification/update/${id}`,
    method: "put",
    data: {
      status: 1,
    },
  });
}

export function turnOffClassification(id) {
  return request({
    url: `admin/datamanagement/classification/update/${id}`,
    method: "put",
    data: {
      status: 0,
    },
  });
}

export function deleteClassification(id) {
  return request({
    url: `admin/datamanagement/classification/delete/${id}`,
    method: "delete",
  });
}
