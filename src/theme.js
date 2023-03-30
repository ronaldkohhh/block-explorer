import { extendTheme } from "@chakra-ui/react";

const config = {
    initalColorMode: "light",
    useSystemColorMode: true,
};

const theme = extendTheme({ config });

export default theme;