import { Avatar, Box, Flex, Text, Spacer } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import { GoVerified } from "react-icons/go";
import millify from "millify";

import { fetchApi, baseUrl } from "../../utils/fetchApi";
import ImageScrollBar from "../../components/ImageScrollBar";

const PropertyDetails = ({
  propertyDetails: {
    price,
    rooms,
    rentFrequency,
    title,
    baths,
    area,
    agency,
    isVerified,
    description,
    type,
    purpose,
    furnishingStatus,
    amenities,
    photos,
  },
}) => (
  <Box maxWidth={"1000px"} margin="auto" p="4">
    {photos && <ImageScrollBar data={photos} />}

    <Box w="full" p="6">
      <Flex
        paddingTop={"2"}
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Flex alignItems={"center"}>
          <Box paddingRight={"3"} color="green.400">
            {isVerified && <GoVerified />}
          </Box>

          <Text fontWeight={"bold"} fontSize="lg">
            AED {millify(price)}
            {rentFrequency && `/${rentFrequency}`}
          </Text>
        </Flex>

        <Box>
          <Avatar size="sm" src={agency?.logo?.url} />
        </Box>
      </Flex>

      <Flex
        alignItems={"center"}
        p="1"
        justifyContent={"space-between"}
        w="250px"
        color="blue.400"
      >
        {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft{" "}
        <BsGridFill />
      </Flex>

      <Box marginTop={"2"}>
        <Text fontSize={"lg"} fontWeight="bold" marginBottom={"2 "}>
          {title}
        </Text>

        <Text lineHeight={"2"} color="gray.600">
          {description}
        </Text>
      </Box>

      <Flex
        flexWrap={"wrap"}
        textTransform="uppercase" 
        justifyContent={"space-between"}
      >
        <Flex
          justifyContent={"space-between"}
          w="400px"
          borderBottom={"1px"}
          borderColor="gray.100"
          p="5"
          bg={"gray.100"}
          marginBottom="2"
          borderRadius={"10"}
        >
          <Text>Type</Text>
          <Text fontWeight={"bold"}>{type}</Text>
        </Flex>

        <Flex
          justifyContent={"space-between"}
          w="400px"
          borderBottom={"1px"}
          borderColor="gray.100"
          p="5"
          bg={"gray.100"}
          marginBottom="2"
          borderRadius={"10"}
        >
          <Text>Purpose</Text>
          <Text fontWeight={"bold"}>{purpose}</Text>
        </Flex>

        {furnishingStatus && (
          <Flex
            justifyContent={"space-between"}
            w="400px"
            borderBottom={"1px"}
            borderColor="gray.100"
            p="5"
            bg={"gray.100"}
            borderRadius={"10"}
          >
            <Text>Furnishing Status</Text>
            <Text fontWeight={"bold"}>{furnishingStatus}</Text>
          </Flex>
        )}
      </Flex>

      <Box>
        {amenities.length > 0 && (
          <Text fontSize={"2xl"} fontWeight="black" marginTop={"5"}>
            Amenities
          </Text>
        )}

        <Flex flexWrap={"wrap"}>
          {amenities.map((item) =>
            item.amenities.map((amenity) => (
              <Text
                key={amenity.text}
                fontWeight="bold"
                fontSize={"l"}
                color="blue.400"
                p="2"
                m="1"
                bg="gray.200"
                borderRadius={"8"}
              >
                {amenity.text}
              </Text>
            ))
          )}
        </Flex>
      </Box>
    </Box>
  </Box>
);

export default PropertyDetails;

export const getServerSideProps = async ({ params: { id } }) => {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`);

  return {
    props: { propertyDetails: data },
  };
};
