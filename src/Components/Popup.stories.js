import { Popup, Header, Body, Footer } from "./Popup";
import { TextButton } from "./Button";
import { action } from "@storybook/addon-actions";
import draggableHOC from "./draggableHOC";
import { PromiseWrapper } from "./ModalManager";
import { memo } from "react";

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

const DraggablePopup = draggableHOC(Popup);

export const draggable = () => (
  <DraggablePopup
    style={{
      width: 500,
      height: 400,
      position: "absolute",
      top: 40,
      left: 40,
    }}
  >
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
  </DraggablePopup>
);

const PromisePopup = memo(({ msg, submitHandler, closeHandler }) => (
  <DraggablePopup
    style={{
      position: "fixed",
      top: 100,
      left: 100,
    }}
  >
    <Header text="Promise popup" closeHandler={closeHandler}></Header>
    <Body>{msg}</Body>
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
  </DraggablePopup>
));

const PromiseWrappedPromisePopup = PromiseWrapper(PromisePopup);

const PromiseWrappedPromisePopupWithID = PromiseWrapper(
  PromisePopup,
  "assign ID to prevent launch multiple instances"
);

export const promise_based_popup = () => (
  <>
    <TextButton
      onClick={() => {
        PromiseWrappedPromisePopup({
          msg: "This popup can launch multiple instances.",
        })
          .then(submitHandler)
          .catch(closeHandler);
      }}
    >
      Launch Popup
    </TextButton>
    <TextButton
      onClick={() => {
        PromiseWrappedPromisePopupWithID({
          msg: "This popup can only launch once.",
        })
          .then(submitHandler)
          .catch(closeHandler);
      }}
    >
      Launch Popup with ID
    </TextButton>
  </>
);
