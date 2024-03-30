import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DatePicker from "./date-picker";

describe("Date Input", () => {
  const user = userEvent.setup();

  beforeEach(async () => {
    render(
      <div>
        <DatePicker onDateRangeValueChange={(value) => console.log(JSON.stringify(value))} />
        <button data-testid="outside-event-listener">Exit calendar</button>
      </div>,
    );

    const openCalendarModal = screen.getByRole("button", { name: /open-calendar-modal/i });
    await user.click(openCalendarModal);
  });

  test("renders Calendar component when clicking date input component", () => {
    expect(screen.getByTestId("date-range-calendar")).toBeInTheDocument();
  });
});
