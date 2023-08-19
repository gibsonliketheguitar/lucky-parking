import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Template from "./template";
import Announcement from "@mui/icons-material/Announcement";

describe("Template & user press Template", () => {
  const user = userEvent.setup();
  beforeEach(async () => {
    render(
      <Template>
        <Announcement />
        <div>Template Title</div>
        <button>open modal</button>
        <button>Close modal</button>
      </Template>,
    );

    const openModal = screen.getByRole("button", { name: /open-modal/i });
    await user.click(openModal);
  });

  test("renders template icon", () => {
    expect(screen.getByTestId("AnnouncementIcon")).toBeInTheDocument();
  });

  test("renders title", () => {
    expect(screen.getByText("Template Title")).toBeInTheDocument();
  });

  test("renders submit button", () => {
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  test("clicking submit button closes modal", async () => {
    const submitBttn = screen.getByText("Submit");
    await user.click(submitBttn);
    expect(submitBttn).not.toBeInTheDocument();
  });

  test("renders close trigger button", () => {
    expect(
      screen.getByRole("button", { name: /close-modal/i }),
    ).toBeInTheDocument();
  });

  test("clicking close trigger button should close modal", async () => {
    const closeModal = screen.getByRole("button", { name: /close-modal/i });
    await user.click(closeModal);
    expect(closeModal).not.toBeInTheDocument();
  });
});
