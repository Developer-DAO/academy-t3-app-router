export const getMetaImageFromImgPath = (imgPath: string) => {
  switch (imgPath) {
    case "/track-intro-eth.png":
      return "a-developers-guide-to-ethereum.png";
    case "/track-arweave-101.png":
      return "/arweave-101/building-apps-on-arweave.png";
  }
};
