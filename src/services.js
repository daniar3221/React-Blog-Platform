export const registerUser = async (username, email, password) => {
  const res = await fetch(`https://blog.kata.academy/api/users`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          user: {
            username: username,
            email: email,
            password: password,
          },
        }),
      });
  const result = await res.json();
  return result;
};

export const createArticle = async (title, description, body, tagList, token) => {
  console.log(token);
  const res = await fetch(`https://blog.kata.academy/api/articles`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({
          article: {
            title: title,
            description: description,
            body: body,
            tagList: tagList,
          },
        }),
      });
  const result = await res.json();
  return result;
};


export const logInUser = async (email, password) => {
  const res = await fetch(`https://blog.kata.academy/api/users/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
          },
        }),
      });
  const result = await res.json();
  return result;
};


export const updateUserInfo = async (token, email, password, username, image) => {
  const bio = 'Hello, I\'m Paul';
  const res = await fetch(`https://blog.kata.academy/api/user`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
            username: username,
            bio: bio,
            image: image,
          },
        }),
      });
  const result = await res.json();
  return result;
};

export const updateArticle = async (title, description, body, tagList, token, slug) => {
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug.slice(1)}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({
          article: {
            title: title,
            description: description,
            body: body,
            tagList: tagList,
          },
        }),
      });
  const result = await res.json();
  return result;
};

export const deleteArticle = async (token, slug) => {
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Token ${token}`,
        },
      });
  return res;
};

export const likeArticle = async (token, slug) => {
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Token ${token}`,
        },
      });
  const result = await res.json();
  return result;
};

export const unLikeArticle = async (token, slug) => {
  const res = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          'Authorization': `Token ${token}`,
        },
      });
  const result = await res.json();
  return result;
};
