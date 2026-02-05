import { Backdrop, Box, CircularProgress, Typography } from '@material-ui/core';
import { useStyles } from './LoaderStyles';
import { useLoader } from './hooks/useLoader';

export interface LoaderProps {
  children?: React.ReactNode;
  topText?: string;
  bottomText?: string;
}

export const Loader = ({ children, topText, bottomText }: LoaderProps) => {
  const classes = useStyles();
  const { show, texts } = useLoader();

  const textRender = (text: string) =>
    text ? (
      <Box m={4}>
        <Typography variant="h5">{text}</Typography>
      </Box>
    ) : null;

  return (
    <Backdrop className={classes.backdrop} open={show}>
      {children ? (
        children
      ) : (
        <>
          {textRender(topText || texts.topText)}
          <CircularProgress color="inherit" size={56} />
          {textRender(bottomText || texts.bottomText)}
        </>
      )}{' '}
    </Backdrop>
  );
};
