import { create as ipfsClient } from "ipfs-http-client";

//* IPFS 키
const projectId = process.env.SETTINGS_INFURA_PROJECT_ID;
const projectSecret = process.env.SETTINGS_INFURA_API_KEY;
const auth = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

//* IPFS 호출
const client = ipfsClient({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

const uploadImage = async (image: File | null) => {
  if (image === null) {
    return "";
  }
  //* 이미지 IPFS에 업로드
  const imageIPFS = await client.add(image);

  return "https://skywalker.infura-ipfs.io/ipfs/" + imageIPFS.path;
};

export default uploadImage;
