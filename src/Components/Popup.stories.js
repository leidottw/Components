import { Popup, Header, Body, Footer } from "./Popup";
import { TextButton } from "./Button";
import { action } from "@storybook/addon-actions";

export default {
  title: "main/Popup",
};

const submitHandler = action("submit");
const closeHandler = action("close");

export const popup = () => (
  <Popup style={{ width: 500, height: 400 }}>
    <Header
      icon="settings-gear-setting-svgrepo-com"
      text="Settings"
      closeHandler={closeHandler}
    ></Header>
    <Body>
      abc def ghi jkl mno pqr stu vwx yz abc def ghi jkl mno pqr stu vwx yz abc
      def ghi jkl mno pqr stu vwx yz abc def ghi jkl mno pqr stu vwx yz abc def
      ghi jkl mno pqr stu vwx yz abc def ghi jkl mno pqr stu vwx yz abc def ghi
      jkl mno pqr stu vwx yz abc def ghi jkl mno pqr stu vwx yz abc def ghi jkl
      mno pqr stu vwx yz abc def ghi jkl mno pqr stu vwx yz abc def ghi jkl mno
      pqr stu vwx yz abc def ghi jkl mno pqr stu vwx yz abc def ghi jkl mno pqr
      stu vwx yz abc def ghi jkl mno pqr stu vwx yz abc def ghi jkl mno pqr stu
      vwx yz abc def ghi jkl mno pqr stu vwx yz abc def ghi jkl mno pqr stu vwx
      yz abc def ghi jkl mno pqr stu vwx yz abc def ghi jkl mno pqr stu vwx yz
      abc def ghi jkl mno pqr stu vwx yz abc def ghi jkl mno pqr stu vwx yz abc
      def ghi jkl mno pqr stu vwx yz abc def ghi jkl mno pqr stu vwx yz abc def
      ghi jkl mno pqr stu vwx yz abc def ghi jkl mno pqr stu vwx yz abc def ghi
      jkl mno pqr stu vwx yz abc def ghi jkl mno pqr stu vwx yz abc def ghi jkl
      mno pqr stu vwx yz
    </Body>
    <Footer
      style={{
        display: "flex",
        alignItems: "center",
        justifyContents: "center",
      }}
    >
      <TextButton onClick={submitHandler}>OK</TextButton>
      <TextButton onClick={closeHandler}>Cancel</TextButton>
    </Footer>
  </Popup>
);
