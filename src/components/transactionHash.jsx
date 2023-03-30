import { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  Heading,
  Container,
  CircularProgress,
  CircularProgressLabel,
  Box,
  Center,
  HStack,
  extendTheme,
  Text,
  Badge,
  Button,
  Tooltip,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import { alchemy } from "./home";
const { Utils } = require("alchemy-sdk");

export function TransactionHash() {
  const { id } = useParams();
  const [recentTransaction, setRecentTransactions] = useState();
  const [block, setBlock] = useState();
  const [value, setValue] = useState();
  useEffect(() => {
    const getTransaction = async () => {
      const recentTransaction = await alchemy.core.getTransactionReceipt(id);
      setRecentTransactions(recentTransaction);

      const block = await alchemy.core.getBlockWithTransactions(
        recentTransaction.blockNumber
      );
      setBlock(block);

      let value;
      for (let i = 0; i < block.transactions.length; i++) {
        if (recentTransaction.transactionHash === block.transactions[i].hash) {
          value = Utils.formatEther(block.transactions[i].value);
          setValue(value);
        }
      }
    };
    getTransaction();
  }, [id]);
  return (
    <Box backgroundColor={"gray.900"} color={"white"} h={window.innerHeight}>
      {!recentTransaction || !block ? (
        <Flex
          justifyContent="center"
          alignItems="center"
          h="100%"
          flexDirection="column"
        >
          <CircularProgress isIndeterminate color="green.300" size={"55px"} />
          <Text fontSize={"17px"}>Fetching data from Ethereum...</Text>
        </Flex>
      ) : (
        <Flex flexDirection="row" justifyContent={"start"} paddingTop={"3"}>
          <TableContainer overflowY="auto" maxHeight="630px">
            <Table variant="simple" size="lg" w={window.innerWidth}>
              <TableCaption
                placement="top"
                fontSize={"20px"}
                fontWeight={"bold"}
                borderTopRadius={"20px"}
                color={"whiteAlpha.900"}
              >
                #Transaction
              </TableCaption>
              <Tbody>
                <Tr>
                  <Td>Transaction Hash:</Td>
                  <Td>{id}</Td>
                </Tr>
                <Tr>
                  <Td>TimeStamp:</Td>
                  <Td>{block.timestamp}</Td>
                </Tr>
                <Tr>
                  <Td>From:</Td>
                  <Td>
                    <Text
                      as="u"
                      color={"teal.100"}
                      _hover={{
                        color: "teal.200",
                      }}
                    >
                      <Link to={`/address/${recentTransaction.from}`}>
                        {recentTransaction.from}
                      </Link>
                    </Text>
                  </Td>
                </Tr>
                <Tr>
                  <Td>To:</Td>
                  <Td>
                    <Text
                      as="u"
                      color={"teal.100"}
                      _hover={{
                        color: "teal.200",
                      }}
                    >
                      <Link to={`/address/${recentTransaction.to}`}>
                        {recentTransaction.to}
                      </Link>
                    </Text>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Gas Used:</Td>
                  <Td>{recentTransaction.gasUsed.toString()}</Td>
                </Tr>
                <Tr>
                  <Td>Gas Limit:</Td>
                  <Td>{block.gasLimit.toString()}</Td>
                </Tr>
                <Tr>
                  <Td>Value:</Td>
                  <Td>
                    <Badge>{value} ETH</Badge>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      )}
    </Box>
  );
}