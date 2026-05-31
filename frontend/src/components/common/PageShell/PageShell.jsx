const PageShell = ({ title, subtitle, children }) => (
  <div className="page-shell">
    <h1>{title}</h1>
    {subtitle ? <p className="muted">{subtitle}</p> : null}
    <div className="section">{children}</div>
  </div>
);

export default PageShell;
