import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <nav
        className="navbar navbar-top navbar-default bg-celeste-argentina"
        role="navigation"
      >
        <div className="container">
          <div>
            <div className="navbar-header">
              <a
                className="navbar-brand"
                href="/"
                aria-label="Argentina.gob.ar Presidencia de la Nación"
              >
                <img
                  alt="Argentina.gob.ar"
                  src="/img/logo-mini-des.svg"
                  height={55}
                />

                <img
                  alt="CAI"
                  src="/img/CAI.svg"
                  height={40}
                />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header
