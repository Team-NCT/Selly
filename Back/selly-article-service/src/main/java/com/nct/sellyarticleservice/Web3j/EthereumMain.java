package com.nct.sellyarticleservice.Web3j;

import lombok.RequiredArgsConstructor;
import org.web3j.abi.FunctionEncoder;
import org.web3j.protocol.Web3j;
import org.web3j.protocol.core.methods.request.Transaction;
import org.web3j.protocol.http.HttpService;


@RequiredArgsConstructor
public class EthereumMain {
  private Web3j web3j = Web3j.build(new HttpService("https://goerli.infura.io/v3/76a7efa215404c909e4cd5875a02148b"));
  private Integer ChainId = 5;
  private String from = "0x4863d935Ce84bafFb20C6739Ee404f4406CF2831";
  private String MyCountractAddress = "0x2e2EF323680Dd098C7015eb1699E320dDffd3c88";

  Transaction transaction = Transaction.createEthCallTransaction(from, MyCountractAddress, FunctionEncoder.encode())

}

