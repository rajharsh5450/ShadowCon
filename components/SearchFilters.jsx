import React, { useEffect, useState } from "react";
import {
  Flex,
  Select,
  Box,
  Text,
  Input,
  Spinner,
  Icon,
  Button,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MdCancel, MdQueryBuilder } from "react-icons/md";
import Image from "next/image";

import { filterData, getFilterValues } from "../utils/filterData";
import { baseUrl, fetchApi } from "../utils/fetchApi";
import noresult from "../assets/no-results.png";

const SearchFilters = () => {
  const [filters, setFilters] = useState(filterData);
  const [searchVal, setSearchVal] = useState("");
  const [locData, setLocData] = useState();
  const [showLoc, setShowLoc] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await fetchApi(
        `${baseUrl}/auto-complete?query=${searchVal}`
      );
      setIsLoading(false);
      setLocData(data?.hits);
    };

    fetchData();
  }, [searchVal]);

  const searchProperties = (filterValues) => {
    const path = router.pathname;
    const { query } = router;

    const values = getFilterValues(filterValues);

    values.forEach((item) => {
      if (item.value && filterValues?.[item.name])
        query[item.name] = item.value;
    });

    router.push({ pathname: path, query: query });
  };

  return (
    <Flex bg="gray.100" p="4" justifyContent={"center"} flexWrap="wrap">
      {filters.map((filter) => (
        <Box key={filter.queryName}>
          <Select
            placeholder={filter.placeholder}
            w="fit-content"
            p="2"
            onChange={(e) =>
              searchProperties({ [filter.queryName]: e.target.value })
            }
          >
            {filter?.items?.map((item) => (
              <option value={item.value} key={item.value}>
                {item.name}
              </option>
            ))}
          </Select>
        </Box>
      ))}

      <Flex flexDirection="column">
        <Button
          onClick={() => setShowLoc(!showLoc)}
          border="1px"
          borderColor="gray.200"
          marginTop="2"
        >
          Search By Location
        </Button>
        {showLoc && (
          <Flex flexDirection="column" position="relative" paddingTop="2">
            <Input
              placeholder="Search"
              value={searchVal}
              w="300px"
              focusBorderColor="gray.300"
              onChange={(e) => setSearchVal(e.target.value)}
            />
            {searchVal !== "" && (
              <Icon
                as={MdCancel}
                position="absolute"
                cursor="pointer"
                right="5"
                top="5"
                zIndex="100"
                onClick={() => setSearchVal("")}
              />
            )}
            {isLoading && <Spinner margin="auto" marginTop="3" />}
            {showLoc && (
              <Box height="300px" overflow="auto">
                {locData?.map((loc) => (
                  <Box
                    key={loc.id}
                    onClick={() => {
                      searchProperties({
                        locationExternalIDs: loc.externalID,
                      });
                      setShowLoc(false);
                      setSearchVal(loc.name);
                    }}
                  >
                    <Text
                      cursor="pointer"
                      bg="gray.200"
                      p="2"
                      borderBottom="1px"
                      borderColor="gray.100"
                    >
                      {loc.name}
                    </Text>
                  </Box>
                ))}
                {!isLoading && !locData?.length && (
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    flexDir="column"
                    marginTop="5"
                    marginBottom="5"
                  >
                    <Image src={noresult} width={"200"} height={"200"} />
                    <Text fontSize="xl" marginTop="3">
                      Waiting to search!
                    </Text>
                  </Flex>
                )}
              </Box>
            )}
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default SearchFilters;
