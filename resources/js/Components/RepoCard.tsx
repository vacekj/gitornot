import { Repository } from "@/Types";
import { Box, Button, Heading, HStack, Icon, Image, VStack } from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { BiBriefcase, BiMap, BiStar } from "react-icons/bi";
dayjs.extend(relativeTime);

export default function RepoCard(
  props: {
    repository: Repository;
    onAccept?: (repository: Repository) => any;
    onReject?: (repository: Repository) => any;
  },
) {
  return (
    <VStack spacing={8}>
      <VStack minW={"64"} rounded={"lg"} alignItems={"stretch"} shadow={"xl"} bg={"white"}>
        <Image roundedTop={"lg"} src={props.repository.owner.avatar_url} />
        <VStack p={4} alignItems={"start"}>
          <Heading fontSize={"xl"} fontWeight={"bold"}>{props.repository.name}</Heading>
          <HStack>
            <Icon as={BiStar} />
            <Box>{props.repository.stargazers_count} stars</Box>
          </HStack>
          <HStack>
            <Icon as={BiMap} />
            <Box>created {dayjs(props.repository.created_at).from(dayjs())}</Box>
          </HStack>
          <Box color={"gray"}>
            {props.repository.description}
          </Box>
        </VStack>
      </VStack>
      {props.onReject && props.onAccept && (
        <HStack rounded={"lg"} alignItems={"stretch"} shadow={"xl"} bg={"white"}>
          <Button onClick={() => props.onReject!(props.repository)} colorScheme={"red"}>rm -rf /</Button>
          <Button onClick={() => props.onAccept!(props.repository)} colorScheme={"green"}>git pull</Button>
        </HStack>
      )}
    </VStack>
  );
}
