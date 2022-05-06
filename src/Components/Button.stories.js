import { useState } from "react";
import {
  PureButton,
  TextButton,
  IconButton,
  IconTextButton,
  ExtendButton,
} from "./Button";

export default {
  title: "main/Button",
};

export const pure_button = () => <PureButton>Next Step</PureButton>;

export const icon_button = () => (
  <IconButton icon="love-ui-heart-svgrepo-com" title="heart"></IconButton>
);

export const text_button = () => (
  <>
    <TextButton>text</TextButton>
    <TextButton>long text long text long text</TextButton>
    <TextButton style={{ width: 200 }}>long text with width 200px</TextButton>
  </>
);

export const icon_text_button = () => (
  <>
    <IconTextButton
      icon="love-ui-heart-svgrepo-com"
      iconProps={{
        style: {
          width: 20,
        },
      }}
    >
      text
    </IconTextButton>
    <IconTextButton
      icon="love-ui-heart-svgrepo-com"
      iconProps={{
        style: {
          width: 20,
        },
      }}
    >
      long text long text long text
    </IconTextButton>
    <IconTextButton
      icon="love-ui-heart-svgrepo-com"
      iconProps={{
        style: {
          width: 18,
        },
      }}
      style={{ width: 200 }}
    >
      long text with width 200px
    </IconTextButton>
  </>
);

export const extend_button = () => {
  const [isLike, setLike] = useState(false);
  const [isFavirite, setFavorite] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <ExtendButton
        icon="thumbsup-ui-like-svgrepo-com"
        text="Like"
        isActive={isLike}
        iconActiveColor="#143bbd"
        onClick={() => setLike(!isLike)}
      />
      <ExtendButton
        icon="love-ui-heart-svgrepo-com"
        text="Add to Faviorite"
        isActive={isFavirite}
        iconActiveColor="#f00"
        onClick={() => setFavorite(!isFavirite)}
      />
    </div>
  );
};
