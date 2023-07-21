export const capitalizeFirstLetter = (str) => {
  if (str) {
    const firstLetter = str.substring(0, 1).toUpperCase();
    const rest = str.substring(1).toLowerCase().replace("_", " ");
    return firstLetter + rest;
  }
  return "";
};

export const nomeCaptalizeFirstLetter = (str) => {
  if (str) {
    const arrayNome = str.split(" ");
    const novoArrayNome = [];
    arrayNome.map((n) => {
      if (
        n.toUpperCase() !== "DA" &&
        n.toUpperCase() !== "DE" &&
        n.toUpperCase() !== "DO" &&
        n.toUpperCase() !== "DAS" &&
        n.toUpperCase() !== "DOS"
      ) {
        novoArrayNome.push(capitalizeFirstLetter(n));
      } else {
        novoArrayNome.push(n.toLowerCase());
      }
    });
    const nomeUppercase = novoArrayNome.join(" ");
    return nomeUppercase;
  }
};
