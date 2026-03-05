export const formatEventDescription = (text: string) => {
  if (!text) return "";

  return (
    text
      // headers
      .replace(
        /^### (.*$)/gim,
        "<h3 class='font-semibold text-lg mt-1 mb-1'>$1</h3>",
      )
      // bold
      .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")

      // italic
      .replace(/\*(.*?)\*/gim, "<em>$1</em>")

      // links [text](url)
      .replace(
        /\[(.*?)\]\((.*?)\)/gim,
        "<a href='$2' target='_blank' class='text-blue-500 underline'>$1</a>",
      )

      .replace(/\n/g, "<br />")
  );
};
