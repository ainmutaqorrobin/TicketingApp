import Link from "next/link";
function Header({ currentUser }) {
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter(Boolean)
    .map(({ label, href }) => (
      <li key={href} className="nav-item">
        <Link href={href} key={href} className="nav-link">
          {label}
        </Link>
      </li>
    ));

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm py-3">
      <div className="container">
        {/* Brand Logo */}
        <Link href="/" className="navbar-brand fw-bold text-primary fs-4">
          <i className="bi bi-ticket-perforated-fill me-2"></i>Ticket4U
        </Link>

        {/* Toggler (for mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center gap-2">{links}</ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
