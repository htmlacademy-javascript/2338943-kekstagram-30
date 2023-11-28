const getPictures = (onSuccess, onError) => fetch(
  'https://30.javascript.pages.academy/kekstagram/data',
)
  .then((responce) => {
    if (!responce.ok) {
      throw new Error();
    }
    return responce.json();
  })
  .then((data) => {
    onSuccess(data);
  })
  .catch(() => {
    onError();
  });

export {getPictures};
