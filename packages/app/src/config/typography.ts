const liverpoolTypography = ["Roboto Flex Variable", "sans-serif"].join(",");
const suburbiaTypography = ["DAZN Oscine"].join(",");
const fallbackTypography = [
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
].join(",");

export const fontFamily = {
    suburbia: suburbiaTypography,
    liverpool: liverpoolTypography,
    fallback: fallbackTypography,
};

export {
    liverpoolTypography,
    suburbiaTypography,
    fallbackTypography,
};