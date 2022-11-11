export interface CreateType {
  wallet: string | null;
  metaDataUrl: string;
  articleImgUrl: string;
  owner: number;
  articleName: string;
}

export interface DataType {
  nonce: number;
  from: string;
  to: string;
  data: string;
}
