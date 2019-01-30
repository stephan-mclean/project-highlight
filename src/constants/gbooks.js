export const GBOOKS_API_BASE_URL = "https://www.googleapis.com/books/v1/";
export const GBOOKS_VOLUME_PATH = "volumes";
export const searchAuthorParam = author => (author ? `inauthor:${author}` : "");
export const searchTitleParam = title => (title ? `intitle:${title}` : "");
export const searchISBNParam = isbn => (isbn ? `isbn:${isbn}` : "");
