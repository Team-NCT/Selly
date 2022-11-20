const getNFTData = async (metaDataUrl: string) => {
  const response = await fetch(metaDataUrl);
  const metaData = await response.json();
  return metaData;
};

export default getNFTData;
