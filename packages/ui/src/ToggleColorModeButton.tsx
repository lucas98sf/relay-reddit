import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useColorMode, IconButton } from "@chakra-ui/react";

export function PostList() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      rounded="full"
      aria-label="Toggle dark mode"
      bgColor="transparent"
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      _hover={{
        bgColor: "transparent",
      }}
    />
  );
}
