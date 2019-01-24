import { GET_ENTRIES } from "./types";

const mockEntry = {
  bookTitle: "Book Title",
  page: 323,
  createdDate: "01/01/2019",
  passage: {
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur a fermentum tellus. Sed tincidunt pretium eros in tempor. In commodo tellus sed augue laoreet, ut vestibulum nibh rutrum. Vivamus risus nisi, pharetra et tristique in, porta sit amet lorem. Mauris nunc sapien, finibus eu euismod et, tincidunt in leo. Ut accumsan felis eget dolor mattis placerat."
  },
  notes:
    "Aliquam erat volutpat. Donec dui tellus, congue at placerat at, sollicitudin eget lorem. Proin sit amet nibh ultricies, suscipit nibh nec, fermentum odio. Suspendisse quam nibh, ullamcorper sit amet ullamcorper a, dictum ut nibh. Phasellus sed purus nec urna mollis maximus."
};

const mockEntries = [mockEntry];

export const getEntries = () => dispatch => {
  dispatch({
    type: GET_ENTRIES,
    payload: mockEntries
  });
};
