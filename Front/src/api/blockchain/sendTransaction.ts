import Web3 from "web3";
import { SignedTransactionType, PayableSignedTransactionType } from "@/types/transaction.types";
const web3 = new Web3(window.ethereum);

export const sendTransaction = async (response: SignedTransactionType) => {
  const payalod = {
    nonce: response.nonce,
    to: response.to,
    from: response.from,
    data: response.data,
  };

  const res = await web3.eth.sendTransaction(payalod);
  return res;
};

export const sendPayableTransaction = async (response: PayableSignedTransactionType) => {
  const payalod = {
    nonce: response.nonce,
    to: response.to,
    from: response.from,
    data: response.data,
    value: response.value,
  };

  const res = await web3.eth.sendTransaction(payalod);
  return res;
};
