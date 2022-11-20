export interface NFTPropertiesType {
  value: string;
  trait_type: string;
}

export interface MetaDataType {
  name: string;
  external_url: string;
  description: string;
  attributes: NFTPropertiesType[];
}

export const initialMetaData = {
  name: "",
  external_url: "",
  description: "",
  attributes: [],
};
