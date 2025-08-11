function Header({ currentUser }) {
  return currentUser ? <h1>Welcome {currentUser.email}</h1> : null;
}

export default Header;
