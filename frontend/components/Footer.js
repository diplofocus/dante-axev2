const Footer = () => {
  return (
    <div className="flex justify-between m-6">
      <p className="text-xs font-semibold text-gray-600">Dante Axe Web Store</p>
      <div className="flex gap-3 ml-4">
        <a href="https://twitter.com/danteaxe" className="max-w-xs ml-4">
          <img src="/twitter.svg" alt="Twitter" />
        </a>
        <a href="https://www.facebook.com/DanteAxeClub/" className="ml-3">
          <img src="/facebook.svg" alt="Facebook" />
        </a>
        <a href="https://www.youtube.com/channel/UC95HhVrDqnFNFsJDT0Jn6-g" className="ml-3">
          <img src="/youtube.svg" alt="Facebook" />
        </a>
      </div>
    </div>
  );
};

export default Footer;
