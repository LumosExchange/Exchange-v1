const checkLogin = async (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
};

const logout = async (req, res) => {
  req.session.destroy();
  req.session = null;
  res.send("User logged out");
};

module.exports = { checkLogin, logout };
