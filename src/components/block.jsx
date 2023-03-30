import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { alchemy } from "./home";
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
} from "@chakra-ui/react";

import { Link } from "react-router-dom";

export function Block() {
  const { id } = useParams();
  const [block, setBlock] = useState();

  useEffect(() => {
    const getBlock = async () => {
      const block = await alchemy.core.getBlock(Number(id));
      setBlock(block);
    };
    getBlock();
    console.log(block);
  }, [id]);
  return (
    <Box backgroundColor={"gray.900"} color={"white"} h={window.innerHeight}>
      {!block ? (
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
          <TableContainer>
            <Table variant="simple" size={"lg"} w={window.innerWidth}>
              <TableCaption
                placement="top"
                fontSize={"20px"}
                fontWeight={"bold"}
                borderTopRadius={"20px"}
                color={"whiteAlpha.900"}
              >
                #Block {id}
              </TableCaption>

              <Tbody>
                <Tr>
                  <Td>Gas Limit:</Td>
                  <Td>{block.gasLimit.toString()}</Td>
                </Tr>
                <Tr>
                  <Td>Gas Used:</Td>
                  <Td>{block.gasUsed.toString()}</Td>
                </Tr>
                <Tr>
                  <Td>Hash:</Td>
                  <Td>{block.hash}</Td>
                </Tr>
                <Tr>
                  <Td>Miner:</Td>
                  <Td>
                    <Text
                      as="u"
                      color={"teal.100"}
                      _hover={{
                        color: "teal.200",
                      }}
                    >
                      <Link to={`/address/${block.miner}`}>{block.miner}</Link>
                    </Text>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Block Height:</Td>
                  <Td>{id}</Td>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </Flex>
      )}
    </Box>
  );
}