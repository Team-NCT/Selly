import { create as ipfsClient } from "ipfs-http-client";

interface AttributeType {
  trait_type: string;
  value: string;
}

//* FormEvent에서 필요한 정보들을 뽑아내는 함수
const getFormData = (event: React.FormEvent) => {
  const target = event.target as unknown as HTMLInputElement[];
  const image = target[0].files ? target[0].files[0] : "";
  const title = target[1].value;
  const description = target[2].value;
  const link = target[3].value;
  const properties = [].slice.call(document.getElementsByClassName("property"));
  const attributes: AttributeType[] = [];
  properties.map((property: HTMLElement) => {
    const propertyType = property.children[0].children[0] as HTMLElement;
    const propertyName = property.children[0].children[1] as HTMLElement;
    const attribute = { trait_type: propertyType.innerText, value: propertyName.innerText };
    attributes.push(attribute);
  });
  // console.log("image", image);
  // console.log("title", title);
  // console.log("description", description);
  // console.log("link", link);
  // console.log("attributes", attributes);
  return { image, title, description, link, attributes };
};

//* IPFS 키
const projectId = process.env.SELLY_INFURA_PROJECT_ID;
const projectSecret = process.env.SELLY_INFURA_API_KEY;
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

const createNFT = async (event: React.FormEvent) => {
  const { image, title, description, link, attributes } = getFormData(event);
  if (image === null) {
    return;
  }
  //* 이미지 IPFS에 업로드
  const imageIPFS = await client.add(image);
  const data = JSON.stringify({
    image: "https://skywalker.infura-ipfs.io/ipfs/" + imageIPFS.path,
    name: title,
    description: description,
    external_url: link,
    attributes: attributes,
  });
  const metadataIPFS = await client.add(data);
  const imageUrl = imageIPFS.path;
  const metadataUrl = metadataIPFS.path;
  return { imageUrl, metadataUrl, title };
};

export default createNFT;
