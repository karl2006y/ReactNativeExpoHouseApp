import request from "./request";

export function getImage(url) {
  return request({
    url: `${url}`,
    method: "get",
  });
}
