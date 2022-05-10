import { action } from "@storybook/addon-actions";
import Calendar from "./Calendar";

export default {
  title: "main/Calendar",
};

export const calendar = () => {
  return <Calendar submit={action("submit")} close={action("close")} />;
};

export const min_date_max_date = () => {
  return (
    <>
      <div>2020/01/01 ~ 2023/12/31</div>
      <Calendar
        submit={action("submit")}
        close={action("close")}
        minDate="2020/01/01"
        maxDate="2023/12/31"
      />
    </>
  );
};

export const range = () => {
  return <Calendar isRange submit={action("submit")} />;
};
