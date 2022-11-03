import { NFTOwnerProps } from "../NFTOwner/NFTOwner.types";
import { NFTDetailsProps } from "../NFTDetails/NFTDetails.types";
import { NFTPropertiesProps } from "../NFTProperties/NFTProperties.types";
import { NFTDescriptionProps } from "../NFTDescription/NFTDescription.types";

export type NFTDetailDescriptionProps = NFTOwnerProps &
  NFTDetailsProps &
  NFTPropertiesProps &
  NFTDescriptionProps;
