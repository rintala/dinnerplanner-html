cutOverflowingText = text => {
  if (text.length > 20) {
    return text.substr(0, 20) + "...";
  }
  return text;
};
