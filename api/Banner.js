// api
import request from "./request";
export function getAllBanner() {
  return request({
    url: `/banners/`,
    method: "get",
  });
}
export function getAllBanner_admin() {
  return request({
    url: `admin/banners/`,
    method: "get",
  });
}

export function turnOnBanner(id) {
  return request({
    url: `admin/banners/update/${id}`,
    method: "post",
    data: {
      status: 1,
    },
  });
}
export function turnOffBanner(id) {
  return request({
    url: `admin/banners/update/${id}`,
    method: "post",
    data: {
      status: 0,
    },
  });
}

export function deleteBanner(id) {
  return request({
    url: `admin/banners/delete/${id}`,
    method: "delete",
  });
}

export function createBanner(data) {
  return request({
    url: `admin/banners/create`,
    method: "post",
    data: data,
  });
}
